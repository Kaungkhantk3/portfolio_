import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ── lat/lon → 3D vector ── */
function latLonToVec3(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

/* ── Arc between two points on sphere ── */
function makeArc(
  from: THREE.Vector3,
  to: THREE.Vector3,
  segments = 60,
): THREE.Line {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const v = new THREE.Vector3().lerpVectors(from, to, t).normalize();
    const h = 1 + 0.32 * Math.sin(Math.PI * t);
    points.push(v.multiplyScalar(h));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  const mat = new THREE.LineBasicMaterial({
    color: 0x6366f1,
    transparent: true,
    opacity: 0.22,
  });
  return new THREE.Line(geo, mat);
}

const CITIES = [
  { name: "Bangkok", lat: 13.7563, lon: 100.5018, main: true },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503, main: false },
  { name: "Singapore", lat: 1.3521, lon: 103.8198, main: false },
  { name: "London", lat: 51.5074, lon: -0.1278, main: false },
  { name: "New York", lat: 40.7128, lon: -74.006, main: false },
  { name: "Sydney", lat: -33.8688, lon: 151.2093, main: false },
  { name: "Berlin", lat: 52.52, lon: 13.405, main: false },
  { name: "Dubai", lat: 25.2048, lon: 55.2708, main: false },
  { name: "Seoul", lat: 37.5665, lon: 126.978, main: false },
  { name: "Mumbai", lat: 19.076, lon: 72.8777, main: false },
];

const ARC_TARGETS = [
  "Tokyo",
  "Singapore",
  "London",
  "New York",
  "Sydney",
  "Berlin",
];

export default function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const mount = mountRef.current;
    const pin = pinRef.current;
    if (!canvas || !mount || !pin) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.set(0, 0, 2.8);

    const R = 1.0;

    /* ── Globe core ── */
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(R, 64, 64),
      new THREE.MeshPhongMaterial({
        color: 0x0d0d2b,
        emissive: 0x050518,
        shininess: 8,
        transparent: true,
        opacity: 0.95,
      }),
    );

    /* ── Wireframe grid ── */
    const wire = new THREE.Mesh(
      new THREE.SphereGeometry(R + 0.001, 36, 36),
      new THREE.MeshBasicMaterial({
        color: 0x2a2a6a,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      }),
    );

    /* ── Atmosphere layers ── */
    const atm1 = new THREE.Mesh(
      new THREE.SphereGeometry(R * 1.15, 64, 64),
      new THREE.MeshBasicMaterial({
        color: 0x4f46e5,
        transparent: true,
        opacity: 0.07,
        side: THREE.BackSide,
      }),
    );
    const atm2 = new THREE.Mesh(
      new THREE.SphereGeometry(R * 1.28, 64, 64),
      new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.03,
        side: THREE.BackSide,
      }),
    );

    /* ── Pivot group (rotates everything together) ── */
    const pivot = new THREE.Group();
    pivot.add(globe, wire, atm1, atm2);
    pivot.rotation.y = -Math.PI * 0.3;
    scene.add(pivot);

    /* ── City dots ── */
    CITIES.forEach((city) => {
      const pos = latLonToVec3(city.lat, city.lon, R + 0.012);
      const size = city.main ? 0.028 : 0.014;
      const col = city.main ? 0xa5b4fc : 0x4f46e5;
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(size, 12, 12),
        new THREE.MeshBasicMaterial({ color: col }),
      );
      dot.position.copy(pos);
      pivot.add(dot);

      if (city.main) {
        [
          { inner: 0.042, outer: 0.055, opacity: 0.55 },
          { inner: 0.068, outer: 0.076, opacity: 0.22 },
        ].forEach(({ inner, outer, opacity }) => {
          const ring = new THREE.Mesh(
            new THREE.RingGeometry(inner, outer, 32),
            new THREE.MeshBasicMaterial({
              color: 0x818cf8,
              transparent: true,
              opacity,
              side: THREE.DoubleSide,
            }),
          );
          ring.position.copy(pos);
          ring.lookAt(new THREE.Vector3(0, 0, 0));
          pivot.add(ring);
        });
      }
    });

    /* ── Arc lines from Bangkok ── */
    const bkkPos = latLonToVec3(13.7563, 100.5018, R);
    CITIES.filter((c) => ARC_TARGETS.includes(c.name)).forEach((c) => {
      pivot.add(makeArc(bkkPos, latLonToVec3(c.lat, c.lon, R)));
    });

    /* ── Ambient star field ── */
    const starCount = 200;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 7,
      );
      if (v.length() < 1.6)
        v.normalize().multiplyScalar(1.6 + Math.random() * 0.5);
      starPos[i * 3] = v.x;
      starPos[i * 3 + 1] = v.y;
      starPos[i * 3 + 2] = v.z;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    scene.add(
      new THREE.Points(
        starGeo,
        new THREE.PointsMaterial({
          color: 0x818cf8,
          size: 0.012,
          transparent: true,
          opacity: 0.5,
        }),
      ),
    );

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const dLight = new THREE.DirectionalLight(0xa5b4fc, 1.2);
    dLight.position.set(3, 2, 2);
    scene.add(dLight);
    const pLight = new THREE.PointLight(0x6366f1, 1.0, 8);
    pLight.position.set(-2, -1, -1);
    scene.add(pLight);

    /* ── Drag rotation ── */
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let rotVel = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => {
      isDragging = false;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      rotVel.y = (e.clientX - prevMouse.x) * 0.008;
      rotVel.x = (e.clientY - prevMouse.y) * 0.008;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onTouchStart = (e: TouchEvent) => {
      isDragging = true;
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDragging = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      rotVel.y = (e.touches[0].clientX - prevMouse.x) * 0.008;
      rotVel.x = (e.touches[0].clientY - prevMouse.y) * 0.008;
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    mount.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    mount.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    /* ── Bangkok tooltip projection ── */
    const bkk3D = latLonToVec3(13.7563, 100.5018, R + 0.012);

    function projectToScreen(pos: THREE.Vector3) {
      // Use live dimensions — fall back to initial W/H if ref somehow null
      const w = mountRef.current?.clientWidth ?? W;
      const h = mountRef.current?.clientHeight ?? H;
      const v = pos.clone().applyMatrix4(pivot.matrixWorld);
      v.project(camera);
      return { x: (v.x * 0.5 + 0.5) * w, y: (-v.y * 0.5 + 0.5) * h, z: v.z };
    }

    /* ── Resize handler ── */
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    /* ── Animation loop ── */
    let animId: number;
    function animate() {
      animId = requestAnimationFrame(animate);

      if (!isDragging) {
        rotVel.y *= 0.92;
        rotVel.x *= 0.92;
        pivot.rotation.y += 0.0015 + rotVel.y;
      } else {
        pivot.rotation.y += rotVel.y;
        pivot.rotation.x += rotVel.x;
        pivot.rotation.x = Math.max(
          -Math.PI / 3,
          Math.min(Math.PI / 3, pivot.rotation.x),
        );
      }

      pivot.updateMatrixWorld();
      const sp = projectToScreen(bkk3D);
      if (pin) {
        if (sp.z < 1) {
          pin.style.display = "flex";
          pin.style.left = `${sp.x}px`;
          pin.style.top = `${sp.y}px`;
          pin.style.transform = "translate(-50%, -100%)";
        } else {
          pin.style.display = "none";
        }
      }

      renderer.render(scene, camera);
    }
    animate();

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      mount.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative h-full w-full cursor-grab active:cursor-grabbing"
      style={{ position: "relative" }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />

      {/* Bangkok tooltip pin */}
      <div
        ref={pinRef}
        style={{
          display: "none",
          position: "absolute",
          flexDirection: "column",
          alignItems: "center",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: "rgba(6,6,18,0.85)",
            border: "1px solid rgba(129,140,248,0.3)",
            borderRadius: "10px",
            padding: "6px 12px",
            backdropFilter: "blur(12px)",
            whiteSpace: "nowrap",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "#a5b4fc",
              margin: 0,
            }}
          >
            Bangkok, Thailand
          </p>
          <p
            style={{
              fontSize: "10px",
              color: "rgba(255,255,255,0.45)",
              margin: "2px 0 0",
            }}
          >
            Based here · Open to remote
          </p>
        </div>
        <div
          style={{
            width: "1px",
            height: "12px",
            background: "rgba(129,140,248,0.4)",
          }}
        />
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#818cf8",
            boxShadow: "0 0 8px rgba(129,140,248,0.8)",
          }}
        />
      </div>

      {/* Hint */}
      <p
        className="absolute bottom-3 right-4 text-[11px] pointer-events-none select-none"
        style={{ color: "rgba(255,255,255,0.2)" }}
      >
        Drag to rotate
      </p>
    </div>
  );
}
