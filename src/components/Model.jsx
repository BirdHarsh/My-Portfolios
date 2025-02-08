"use client"; // Mark as Client Component

import { useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

useGLTF.preload("/cypher.glb");

export default function Model() {
  const { scene } = useGLTF("/cypher.glb");

  // State to track the mouse position
  const [mousePos, setMousePos] = useState([0, 0]);

  // Handle mouse movement and update the state
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Normalize mouse position to [-1, 1] range
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePos([x, y]);
    };

    // Listen to mousemove event
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Use `useFrame` to update the head bone's rotation
  useFrame(() => {
    const headBone = scene.getObjectByName("Head"); // Replace with actual bone name if different
    if (headBone) {
      // Map mouse position to a rotation for the head
      const [mouseX, mouseY] = mousePos;
      headBone.rotation.y = mouseX * Math.PI / 4;  // Adjust rotation factor as needed
      headBone.rotation.x = -mouseY * Math.PI / 4; // Adjust rotation factor as needed
    }
  });

  return (
    <group>
      <primitive object={scene} scale={3} position={[0, -3.5, 0]} />
    </group>
  );
}
