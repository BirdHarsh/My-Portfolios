"use client";

import dynamic from "next/dynamic";
import styles from "./Home.module.css"; // Import CSS Module

// Dynamically import the Scene component with SSR disabled
const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.sceneWrapper}>
        <Scene />
      </div>
    </main>
  );
}
