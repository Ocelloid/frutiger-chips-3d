"use client";
import { Canvas } from "@react-three/fiber";
import Chip from "./_models/Chip";
import { PointLight } from "three";
import Space from "./_models/Space";

export default function HomePage() {
  const sun = new PointLight("white", 1000);
  sun.position.set(-4, 3, -4);

  const light = new PointLight("lightpink", 300);
  light.position.set(-5, 5, 5);

  const backlight1 = new PointLight("orangered", 100);
  backlight1.position.set(10, 5, -15);
  const backlight2 = new PointLight("orangered", 100);
  backlight2.position.set(15, -10, -20);

  return (
    <main className="flex h-full min-h-dvh flex-col">
      <Canvas
        style={{
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
        onCreated={({ camera, scene }) => {
          camera.add(sun);
          camera.add(light);
          camera.add(backlight1);
          camera.add(backlight2);
          scene.add(camera);
        }}
      >
        <Space />
        <Chip
          position={[4, -1, -3 * Math.random()]}
          rotation={[0, 0, Math.PI * Math.random()]}
        />
        <Chip
          position={[2, 1, -1 * Math.random()]}
          rotation={[0, 0, Math.PI * Math.random()]}
        />
        <Chip
          position={[0, -2, -3 * Math.random()]}
          rotation={[0, 0, Math.PI * Math.random()]}
        />
        <Chip
          position={[-2, 1, -1 * Math.random()]}
          rotation={[0, 0, Math.PI * Math.random()]}
        />
        <Chip
          position={[-4, -1, -3 * Math.random()]}
          rotation={[0, 0, Math.PI * Math.random()]}
        />
      </Canvas>
    </main>
  );
}
