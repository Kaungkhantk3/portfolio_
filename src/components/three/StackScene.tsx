import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { createRoot, extend, useFrame } from "@react-three/fiber";
import {
  BoxGeometry,
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  Vector3,
  type OrthographicCamera,
} from "three";
import { handoffEnabled, handoffState } from "../../lib/handoff";
import { PLATE, PLATE_EDGE, plateFaces } from "../../lib/plates";
import { STACK_PHASE, STACK_TILT, stackProgress } from "../../lib/stackProgress";

// Register only the three.js classes the JSX below uses (<group>, <mesh>,
// <lineSegments>, <lineBasicMaterial>). R3F's <Canvas> registers the entire
// THREE namespace, which defeats tree-shaking, so the scene is mounted through
// createRoot() instead (see StackScene at the bottom).
extend({ Group, Mesh, LineSegments, LineBasicMaterial });

/* The SVG fallback is a 2:1 "isometric" drawing, which is exactly an
   orthographic camera at 45° azimuth and 30° elevation. World units = SVG
   units, so at rest the 3D plates land on the same pixels as the SVG. */
const ELEVATION = Math.PI / 6;
const COS = Math.cos(ELEVATION);
const SIDE = PLATE.W * Math.SQRT2;
const THICK = PLATE.T / COS;
const CAM_DIST = 1000;
const camPos = (elevation: number): [number, number, number] => [
  CAM_DIST * Math.cos(elevation) * Math.SQRT1_2,
  CAM_DIST * Math.sin(elevation),
  CAM_DIST * Math.cos(elevation) * Math.SQRT1_2,
];
const CAM_POS = camPos(ELEVATION);
// World distance between plates at rest (48 SVG units on screen at 30°).
const REST_STEP = (PLATE.CY[1] - PLATE.CY[0]) / COS;
// World y of each plate's centre, from the SVG top-face centre.
const PLATE_Y = PLATE.CY.map((cy) => -(cy - PLATE.VIEW_H / 2) / COS - THICK / 2);

// Top face corners as (x, z) signs: far, right, near, left on screen.
const FACE_CORNERS = [
  [-1, -1],
  [1, -1],
  [1, 1],
  [-1, 1],
];

const IDLE_ROT = (6 * Math.PI) / 180; // slow Y sway
const PARALLAX = (8 * Math.PI) / 180; // ±8° toward the cursor
const FLOAT_PX = 6;

type SceneProps = {
  /** The box the SVG occupies; the canvas is larger (bleed) but scales to this. */
  boxRef: RefObject<HTMLDivElement | null>;
  /** Desktop label <li>s, moved each frame to stay attached to their plate. */
  labelRefs: RefObject<(HTMLLIElement | null)[]>;
  onReady: (ready: boolean) => void;
};

function Plates({ boxRef, labelRefs, onReady }: SceneProps) {
  const group = useRef<Group>(null);
  const plates = useRef<(Group | null)[]>([]);
  const lastExplode = useRef(-1);
  const lastOpacity = useRef(1);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frames = useRef(0);
  const time = useRef(0);

  const { geometry, edges, materials, anchor } = useMemo(() => {
    const fades = handoffEnabled();
    const geometry = new BoxGeometry(SIDE, THICK, SIDE);
    return {
      geometry,
      edges: new EdgesGeometry(geometry),
      // BoxGeometry face order: +x, -x, +y, -y, +z, -z.
      // From this camera +x is the screen-right side and +z the screen-left side.
      // polygonOffset pushes faces back a hair so the edge lines never z-fight.
      // With the handoff on, the top plate fades out mid-scroll. Its materials
      // are transparent from the start: switching `transparent` later makes
      // three.js rebuild the shaders, a ~0.8s freeze in the middle of a scroll.
      materials: plateFaces.map(({ top, left, right }, i) =>
        [right, right, top, top, left, left].map(
          (color) =>
            new MeshBasicMaterial({
              color,
              polygonOffset: true,
              polygonOffsetFactor: 1,
              polygonOffsetUnits: 1,
              transparent: fades && i === 0,
            }),
        ),
      ),
      anchor: new Vector3(),
    };
  }, []);

  useEffect(
    () => () => {
      geometry.dispose();
      edges.dispose();
      materials.flat().forEach((m) => m.dispose());
    },
    [geometry, edges, materials],
  );

  // Cursor parallax target. Mouse / trackpad only: never on touch devices.
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Hand the labels back to their CSS positions when the scene goes away.
  useEffect(() => {
    const labels = labelRefs.current;
    return () => {
      labels.forEach((el) => {
        if (el) el.style.transform = "";
      });
      onReady(false);
    };
  }, [labelRefs, onReady]);

  useFrame((state, delta) => {
    const g = group.current;
    const box = boxRef.current;
    if (!g || !box) return;

    // Scale so 1 world unit = 1 SVG unit at the SVG's current rendered size.
    const boxW = box.clientWidth;
    const boxH = box.clientHeight;
    const zoom = boxW / PLATE.VIEW_W;
    const camera = state.camera as OrthographicCamera;
    if (camera.zoom !== zoom) {
      camera.zoom = zoom;
      camera.updateProjectionMatrix();
    }

    // 01 Stack timeline, phase 1 (0 → 0.25 of its progress): the plates spread
    // apart and the camera drops 10°. Read from the shared object every frame;
    // nothing here goes through React.
    const explode = Math.min(Math.max(stackProgress.current / STACK_PHASE.explodeEnd, 0), 1);
    const elevation = ELEVATION - explode * STACK_TILT;
    const cos = Math.cos(elevation);
    const step = REST_STEP + ((stackProgress.stepWorld || REST_STEP) - REST_STEP) * explode;
    if (explode !== lastExplode.current) {
      lastExplode.current = explode;
      camera.position.set(...camPos(elevation));
      camera.lookAt(0, 0, 0);
    }
    plates.current.forEach((plate, i) => {
      if (plate) plate.position.y = PLATE_Y[1] + (1 - i) * step;
    });
    camera.updateMatrixWorld();

    // Lerp toward the cursor target (frame-rate independent, never snaps).
    const k = 1 - Math.exp(-Math.min(delta, 0.1) * 5);
    current.current.x += (target.current.x - current.current.x) * k;
    current.current.y += (target.current.y - current.current.y) * k;

    // Own running time rather than state.clock: THREE.Clock is deprecated
    // (r183). R3F still constructs one internally, which is where the console
    // warning comes from.
    // const t = state.clock.elapsedTime;
    time.current += Math.min(delta, 0.1);
    const t = time.current;
    g.rotation.y = Math.sin(t * 0.35) * IDLE_ROT + current.current.x * PARALLAX;
    g.rotation.x = current.current.y * PARALLAX;
    g.position.y = (Math.sin(t * 0.9) * FLOAT_PX) / (zoom * cos);
    g.updateMatrixWorld();

    // Keep each label's leader line on its plate's right-hand corner.
    const { width, height } = state.size;
    labelRefs.current.forEach((el, i) => {
      if (!el) return;
      anchor.set(SIDE / 2, PLATE_Y[1] + (1 - i) * step, -SIDE / 2).applyMatrix4(g.matrixWorld).project(camera);
      const x = (anchor.x * 0.5 + 0.5) * width - (width - boxW) / 2;
      const y = (-anchor.y * 0.5 + 0.5) * height - (height - boxH) / 2;
      const dx = x - (PLATE.CX + PLATE.W) * zoom;
      const dy = y - (PLATE.CY[i] + PLATE.T / 2) * zoom;
      el.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`;
    });

    // Plate → card handoff (only while its overlay is mounted): publish where
    // the top plate's top face is on screen, and fade that plate as the ghost
    // takes over.
    if (handoffState.active) {
      const rect = state.gl.domElement.getBoundingClientRect();
      const top = PLATE_Y[1] + step + THICK / 2;
      FACE_CORNERS.forEach(([sx, sz], k) => {
        anchor.set((sx * SIDE) / 2, top, (sz * SIDE) / 2).applyMatrix4(g.matrixWorld).project(camera);
        handoffState.quad[k * 2] = rect.left + (anchor.x * 0.5 + 0.5) * rect.width;
        handoffState.quad[k * 2 + 1] = rect.top + (-anchor.y * 0.5 + 0.5) * rect.height;
      });
    }
    const opacity = handoffState.active ? handoffState.plateOpacity : 1;
    if (opacity !== lastOpacity.current) {
      lastOpacity.current = opacity;
      const plate = plates.current[0];
      plate?.traverse((child) => {
        const material = (child as Mesh).material;
        if (!material) return;
        // Opacity only: a uniform, no shader rebuild.
        for (const m of Array.isArray(material) ? material : [material]) m.opacity = opacity;
      });
      if (plate) plate.visible = opacity > 0;
    }

    // Report ready once a real frame is on screen, so the SVG can fade out.
    if (frames.current < 2 && ++frames.current === 2) onReady(true);
  });

  const fadesTop = handoffEnabled();

  return (
    <group ref={group}>
      {PLATE_Y.map((y, i) => (
        <group
          key={i}
          position={[0, y, 0]}
          ref={(el) => {
            plates.current[i] = el;
          }}
        >
          <mesh geometry={geometry} material={materials[i]} />
          <lineSegments geometry={edges}>
            <lineBasicMaterial color={PLATE_EDGE} transparent={fadesTop && i === 0} />
          </lineSegments>
        </group>
      ))}
    </group>
  );
}

/** Rendering stops when the stage is offscreen or the tab is hidden. */
function useStageActive(boxRef: RefObject<HTMLDivElement | null>) {
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const root = boxRef.current?.closest("[data-stage-root]") ?? boxRef.current;
    if (!root) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(root);

    const onVisibility = () => setTabVisible(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [boxRef]);

  return inView && tabVisible;
}

type SceneStore = ReturnType<ReturnType<typeof createRoot>["render"]>;

/* Step 3 version, using <Canvas> (pulls in all of three.js):

export default function StackScene(props: SceneProps) {
  const active = useStageActive(props.boxRef);

  return (
    <Canvas
      orthographic
      flat // no tone mapping: plate colours must match the SVG exactly
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: CAM_POS, near: 1, far: CAM_DIST * 3 }}
      data-frameloop={active ? "always" : "never"}
    >
      <Plates {...props} />
    </Canvas>
  );
}
*/

export default function StackScene({ boxRef, labelRefs, onReady }: SceneProps) {
  const active = useStageActive(boxRef);
  const hostRef = useRef<HTMLDivElement>(null);
  const storeRef = useRef<SceneStore | null>(null);
  const activeRef = useRef(active);

  // Pause / resume rendering.
  useEffect(() => {
    activeRef.current = active;
    const state = storeRef.current?.getState();
    if (!state) return;
    state.setFrameloop(active ? "always" : "never");
    if (active) state.invalidate();
  }, [active]);

  // Own canvas + R3F root. A fresh <canvas> per mount keeps StrictMode and HMR
  // from ever reusing a WebGL context that is being torn down.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "display:block;width:100%;height:100%";
    host.appendChild(canvas);

    const root = createRoot(canvas);
    let cancelled = false;

    root
      .configure({
        orthographic: true,
        flat: true, // no tone mapping: plate colours must match the SVG exactly
        dpr: [1, 1.5],
        frameloop: activeRef.current ? "always" : "never",
        gl: { antialias: true, alpha: true, powerPreference: "high-performance" },
        camera: { position: CAM_POS, near: 1, far: CAM_DIST * 3 },
        size: { width: host.clientWidth, height: host.clientHeight, top: 0, left: 0 },
      })
      .then(() => {
        if (cancelled) return;
        storeRef.current = root.render(
          <Plates boxRef={boxRef} labelRefs={labelRefs} onReady={onReady} />,
        );
      })
      // No WebGL (blocked, unsupported, context limit): stay on the SVG stack,
      // which spreads with the same timeline.
      .catch(() => {});

    const resize = new ResizeObserver(() => {
      storeRef.current?.getState().setSize(host.clientWidth, host.clientHeight, 0, 0);
    });
    resize.observe(host);

    return () => {
      cancelled = true;
      resize.disconnect();
      storeRef.current = null;
      root.unmount();
      canvas.remove();
    };
  }, [boxRef, labelRefs, onReady]);

  return (
    <div
      ref={hostRef}
      className="h-full w-full"
      data-frameloop={active ? "always" : "never"}
    />
  );
}
