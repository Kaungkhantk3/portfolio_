import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  BoxGeometry,
  EdgesGeometry,
  MeshBasicMaterial,
  Vector3,
  type Group,
  type OrthographicCamera,
} from "three";
import { PLATE, PLATE_EDGE, plateFaces } from "../../lib/plates";

/* The SVG fallback is a 2:1 "isometric" drawing, which is exactly an
   orthographic camera at 45° azimuth and 30° elevation. World units = SVG
   units, so at rest the 3D plates land on the same pixels as the SVG. */
const ELEVATION = Math.PI / 6;
const COS = Math.cos(ELEVATION);
const SIDE = PLATE.W * Math.SQRT2;
const THICK = PLATE.T / COS;
const CAM_DIST = 1000;
const CAM_POS: [number, number, number] = [
  CAM_DIST * COS * Math.SQRT1_2,
  CAM_DIST * Math.sin(ELEVATION),
  CAM_DIST * COS * Math.SQRT1_2,
];
// World y of each plate's centre, from the SVG top-face centre.
const PLATE_Y = PLATE.CY.map((cy) => -(cy - PLATE.VIEW_H / 2) / COS - THICK / 2);

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
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frames = useRef(0);

  const { geometry, edges, materials, anchor } = useMemo(() => {
    const geometry = new BoxGeometry(SIDE, THICK, SIDE);
    return {
      geometry,
      edges: new EdgesGeometry(geometry),
      // BoxGeometry face order: +x, -x, +y, -y, +z, -z.
      // From this camera +x is the screen-right side and +z the screen-left side.
      // polygonOffset pushes faces back a hair so the edge lines never z-fight.
      materials: plateFaces.map(({ top, left, right }) =>
        [right, right, top, top, left, left].map(
          (color) =>
            new MeshBasicMaterial({
              color,
              polygonOffset: true,
              polygonOffsetFactor: 1,
              polygonOffsetUnits: 1,
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
    camera.updateMatrixWorld();

    // Lerp toward the cursor target (frame-rate independent, never snaps).
    const k = 1 - Math.exp(-Math.min(delta, 0.1) * 5);
    current.current.x += (target.current.x - current.current.x) * k;
    current.current.y += (target.current.y - current.current.y) * k;

    const t = state.clock.elapsedTime;
    g.rotation.y = Math.sin(t * 0.35) * IDLE_ROT + current.current.x * PARALLAX;
    g.rotation.x = current.current.y * PARALLAX;
    g.position.y = (Math.sin(t * 0.9) * FLOAT_PX) / (zoom * COS);
    g.updateMatrixWorld();

    // Keep each label's leader line on its plate's right-hand corner.
    const { width, height } = state.size;
    labelRefs.current.forEach((el, i) => {
      if (!el) return;
      anchor.set(SIDE / 2, PLATE_Y[i], -SIDE / 2).applyMatrix4(g.matrixWorld).project(camera);
      const x = (anchor.x * 0.5 + 0.5) * width - (width - boxW) / 2;
      const y = (-anchor.y * 0.5 + 0.5) * height - (height - boxH) / 2;
      const dx = x - (PLATE.CX + PLATE.W) * zoom;
      const dy = y - (PLATE.CY[i] + PLATE.T / 2) * zoom;
      el.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`;
    });

    // Report ready once a real frame is on screen, so the SVG can fade out.
    if (frames.current < 2 && ++frames.current === 2) onReady(true);
  });

  return (
    <group ref={group}>
      {PLATE_Y.map((y, i) => (
        <group key={i} position={[0, y, 0]}>
          <mesh geometry={geometry} material={materials[i]} />
          <lineSegments geometry={edges}>
            <lineBasicMaterial color={PLATE_EDGE} />
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
