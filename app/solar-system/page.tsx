"use client";
import { useEffect, useRef } from "react";

const SolarSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const sun = {
        x: centerX,
        y: centerY,
        radius: 50,
        color: "yellow",
      };

      const planets = [
        {
          name: "Mercúrio",
          radius: 10,
          orbitRadius: 80,
          speed: 0.04,
          angle: 0,
          color: "gray",
        },
        {
          name: "Vênus",
          radius: 15,
          orbitRadius: 120,
          speed: 0.03,
          angle: 0,
          color: "orange",
        },
        {
          name: "Terra",
          radius: 20,
          orbitRadius: 160,
          speed: 0.02,
          angle: 0,
          color: "blue",
        },
        {
          name: "Marte",
          radius: 18,
          orbitRadius: 200,
          speed: 0.01,
          angle: 0,
          color: "red",
        },
      ];

      const drawSun = () => {
        ctx.beginPath();
        ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = sun.color;
        ctx.fill();
      };

      const drawPlanets = () => {
        planets.forEach((planet) => {
          planet.angle += planet.speed;
          const x = centerX + planet.orbitRadius * Math.cos(planet.angle);
          const y = centerY + planet.orbitRadius * Math.sin(planet.angle);
          ctx.beginPath();
          ctx.arc(x, y, planet.radius, 0, Math.PI * 2, false);
          ctx.fillStyle = planet.color;
          ctx.fill();
        });
      };

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSun();
        drawPlanets();
        requestAnimationFrame(animate);
      };

      animate();
    }
  }, []);

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <h1 className="text-white text-3xl font-bold mb-4">
        Simulador de Sistema Solar
      </h1>
      <canvas
        ref={canvasRef}
        width="800"
        height="800"
        className="border-4 border-white"
      />
    </div>
  );
};

export default SolarSystem;
