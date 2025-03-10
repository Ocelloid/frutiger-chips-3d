"use client";
import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import type { Mesh, Euler, EulerOrder } from "three";
import { Vector3 } from "three";
import { easing } from "maath";

export default function Chip({
  rotation,
  position,
  scale,
}: {
  rotation?:
    | Euler
    | [x: number, y: number, z: number, order?: EulerOrder | undefined];
  position?: Vector3 | [x: number, y: number, z: number];
  scale?: Vector3 | [x: number, y: number, z: number];
}) {
  const chipRef = useRef<Mesh>();
  const [hovered, setHovered] = useState(false);
  const { nodes } = useGLTF("/models/ЧИПС1.glb");
  const chipMesh = nodes.Box014! as Mesh;

  useFrame((state, delta) => {
    if (chipRef.current && hovered) {
      easing.dampE(
        chipRef.current.rotation,
        [Math.PI * state.pointer.y, -Math.PI * state.pointer.x, 0],
        0.1,
        delta * 0.1,
      );
    }
  });

  return (
    <Float>
      <mesh
        scale={scale ?? new Vector3(0.01, 0.009, 0.0075)}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        geometry={chipMesh.geometry}
        position={position}
        rotation={rotation}
        ref={chipRef}
      >
        <MeshTransmissionMaterial
          thickness={1}
          roughness={0}
          transmission={1}
          ior={1}
          chromaticAberration={0.2}
          backside={false}
        />
      </mesh>
    </Float>
  );
}

useGLTF.preload("/models/ЧИПС1.glb");
