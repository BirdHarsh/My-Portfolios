"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, useProgress, Html } from "@react-three/drei";
import Model from "./Model";
import styles from "./Scene.module.css"; // Import styles

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(1)}% loaded</Html>;
}

export default function Scene() {
  return (
    <div className={styles.canvasContainer}>
      <Canvas
        gl={{ antialias: true }}
        dpr={[1, 2]}
        camera={{ position: [0, 2, 5], fov: 40 }}
        className={styles.fullSizeCanvas}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />

        {/* Enable rotation, zoom, and pan */}
        <OrbitControls enableZoom enableRotate enablePan />

        <Suspense fallback={<Loader />}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
}
