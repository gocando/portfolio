import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion, useScroll, useSpring } from "framer-motion";

/** ===== Star geometry ===== */
function Starfield({ count = 2200 }) {
  const meshRef = useRef<THREE.Points>(null!);
  const matRef = useRef<THREE.PointsMaterial>(null!);
  const [targetRot, setTargetRot] = useState({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = THREE.MathUtils.randFloat(60, 180);
      const t = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const p = THREE.MathUtils.randFloat(0, Math.PI);
      pos[i * 3] = r * Math.sin(p) * Math.cos(t);
      pos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      pos[i * 3 + 2] = r * Math.cos(p);
    }
    return pos;
  }, [count]);

  // soft round sprite texture
  const sprite = useMemo(() => {
    const s = 64;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.5, "rgba(255,255,255,0.6)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(s/2, s/2, s/2, 0, Math.PI*2); ctx.fill();
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useFrame(({ camera, pointer }, d) => {
    const m = meshRef.current;
    if (!m) return;

    // smooth rotate and pointer parallax
    m.rotation.y += d * 0.02 + (targetRot.y - m.rotation.y) * 0.08;
    m.rotation.x += d * 0.01 + (targetRot.x - m.rotation.x) * 0.08;

    camera.position.x += (((pointer.x ?? 0) * 2) - camera.position.x) * 0.05;
    camera.position.y += (((-(pointer.y ?? 0)) * 1.5) - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    // a subtle size/opacity pulse tied to pointer
    const mat = matRef.current;
    if (mat) {
      const pulse = (Math.abs(pointer.x ?? 0) + Math.abs(pointer.y ?? 0)) * 0.1;
      mat.size = THREE.MathUtils.lerp(mat.size, 1.1 + pulse, 0.1);
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.9, 0.1);
    }
  });

  return (
    <group
      onPointerMove={(e) => {
        const x = (e.pointer.x as number) ?? 0;
        const y = (e.pointer.y as number) ?? 0;
        setTargetRot({ x: y * 0.35, y: -x * 0.55 });
      }}
    >
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={matRef}
          size={1.1}
          sizeAttenuation
          map={sprite}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          color={"#cfeaff"}
          opacity={0.9}
        />
      </points>
    </group>
  );
}

/** ===== Background with scroll-driven zoom ===== */
export default function StarBack({ visible }: { visible: boolean }) {
  // 0 → 1 as you scroll document
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 22 });

  // target camera Z based on scroll (feel free to tweak numbers)
  const targetZ = useRef(120);
  useEffect(() => {
    const unsub = smooth.on("change", (v) => {
      // at top: ~120 (closer/zoomed in). further down: ~180 (zoom out)
      targetZ.current = 120 + v * 60;
    });
    return () => unsub();
  }, [smooth]);

  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-0 -z-10"
    >
      <Canvas
        camera={{ position: [0, 0, 120] }}
        onCreated={({ gl }) => gl.setClearColor("#0a0e12")}
      >
        {/* continuously lerp camera z toward the target computed from scroll */}
        <ZoomController targetZ={targetZ} />
        <ambientLight intensity={0.4} />
        <Starfield />
      </Canvas>

      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.55)_72%,rgba(0,0,0,0.85))]" />
    </motion.div>
  );
}

/** helper: lerp camera z to targetZ each frame */
function ZoomController({ targetZ }: { targetZ: React.MutableRefObject<number> }) {
  useFrame(({ camera }) => {
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ.current, 0.08);
  });
  return null;
}
