"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Chip from "./models/Chip";
import { PointLight } from "three";
import Space from "./models/Space";

export default function HomePage() {
  const sun = new PointLight("white", 100);
  sun.position.set(-4, 3, -4);

  const light = new PointLight("lightpink", 30);
  light.position.set(-5, 5, 5);

  const backlight1 = new PointLight("orangered", 10);
  backlight1.position.set(10, 5, -15);
  const backlight2 = new PointLight("orangered", 10);
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
        <OrbitControls />
        <Space />
        <Chip />
      </Canvas>
    </main>
  );
}
