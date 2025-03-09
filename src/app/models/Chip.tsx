"use client";
import React from "react";
import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import type { Mesh } from "three";
import { useControls, folder } from "leva";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Chip() {
  const chipRef = useRef<Mesh>();
  const { nodes } = useGLTF("/models/ЧИПС1.glb");
  const chipMesh = nodes.Box014! as Mesh;
  const materialProps = useControls({
    thickness: { value: 0.2, min: 0, max: 1, step: 0.05 },
    roughness: { value: 0.5, min: 0, max: 1, step: 0.05 },
    transmission: { value: 1, min: 0, max: 1, step: 0.05 },
    ior: { value: 1.5, min: 0, max: 3, step: 0.05 },
    chromaticAbberation: { value: 0.5, min: 0, max: 1, step: 0.05 },
    backside: { value: true },
  });
  const rotateControls = useControls({
    rotation: folder({
      x: { value: 0, min: 0, max: 1, step: 0.05 },
      y: { value: 0.2, min: 0, max: 1, step: 0.05 },
      z: { value: 0, min: 0, max: 1, step: 0.05 },
    }),
  });
  useFrame((_state, delta) => {
    if (!chipRef.current) return;
    chipRef.current.rotation.x += delta * rotateControls.x;
    chipRef.current.rotation.y += delta * rotateControls.y;
    chipRef.current.rotation.z += delta * rotateControls.z;
  });
  return (
    <mesh
      ref={chipRef}
      scale={[0.01, 0.009, 0.0075]}
      geometry={chipMesh.geometry}
    >
      <MeshTransmissionMaterial {...materialProps} />
    </mesh>
  );
}

useGLTF.preload("/models/ЧИПС1.glb");
