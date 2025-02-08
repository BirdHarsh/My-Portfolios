"use client"; // Mark as Client Component

import { useRef, useState, useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

useGLTF.preload("/cypher.glb");

export default function Model() {
  const { scene } = useGLTF("/cypher.glb");
  const texture = useTexture("/texture1.png"); // Load texture
  const { camera } = useThree();
  const progress = useRef(0); // Animation progress

  // Mouse Position State
  const [mousePos, setMousePos] = useState([0, 0]);

  // Define a curved path using Bezier curve control points
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-5, 5, 10), // Start (left, high, far)
    new THREE.Vector3(0, 6, 6),   // Midpoint (center, high, mid)
    new THREE.Vector3(5, 2, 0),   // End (right, low, close)
  ]);

  // Apply texture to the model
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture; // Apply texture
        child.material.needsUpdate = true; // Refresh material
      }
    });
  }, [scene, texture]);

  // Handle mouse movement to track cursor
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1; // Normalize X
      const y = -(event.clientY / window.innerHeight) * 2 + 1; // Normalize Y
      setMousePos([x, y]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Animate camera movement along curve & head following mouse
  useFrame(() => {
    // Move camera along curved path
    if (progress.current < 1) {
      progress.current += 0.01; // Adjust speed
      const point = curve.getPoint(progress.current);
      camera.position.copy(point);
      camera.lookAt(0, 0, 0);
    }

    // Rotate head based on mouse movement
    const headBone = scene.getObjectByName("Head"); // Ensure this matches your GLTF hierarchy
    if (headBone) {
      const [mouseX, mouseY] = mousePos;
      headBone.rotation.y = mouseX * Math.PI / 4;  // Adjust rotation factor
      headBone.rotation.x = -mouseY * Math.PI / 4; // Adjust rotation factor
    }
  });

  return <primitive object={scene} scale={1}  position={[0, -1, 0]} rotation={[0, 0, 0]} />;
}
