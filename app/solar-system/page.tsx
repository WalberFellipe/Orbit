"use client";
import { useEffect, useRef, useState } from "react";
import Particles from "@/app/components/particles";
import sunPng from "@/assets/sun.png";
import earthPng from "@/assets/earth.png";
import venusPng from "@/assets/venus.png";
import marsPng from "@/assets/mars.png";

interface Planet {
  name: string;
  radius: number;
  orbitRadius: number;
  speed: number;
  angle: number;
  image?: HTMLImageElement;
  color?: string;
  description?: string;
}

const planetsData: Planet[] = [
  {
    name: "Mercúrio",
    radius: 10,
    orbitRadius: 200,
    speed: 0.001,
    angle: 0,
    color: "gray",
    description: "Pequeno planeta, sem atmosfera significativa.",
  },
  {
    name: "Vênus",
    radius: 15,
    orbitRadius: 260,
    speed: 0.0008,
    angle: 0,
    description: "Planeta quente e coberto de nuvens.",
  },
  {
    name: "Terra",
    radius: 20,
    orbitRadius: 320,
    speed: 0.0006,
    angle: 0,
    description: "População: 8 bilhões de humanos.",
  },
  {
    name: "Marte",
    radius: 18,
    orbitRadius: 380,
    speed: 0.0005,
    angle: 0,
    description: "Conhecido como o planeta vermelho.",
  },
];

const SolarSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [clickedPlanet, setClickedPlanet] = useState<Planet | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const planetsRef = useRef<Planet[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const sunImage = new Image();
    const earthImage = new Image();
    const venusImage = new Image();
    const marsImage = new Image();
    sunImage.src = sunPng.src;
    earthImage.src = earthPng.src;
    venusImage.src = venusPng.src;
    marsImage.src = marsPng.src;

    sunImage.onload = () => {
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        planetsRef.current = planetsData.map((planet) => {
          if (planet.name === "Terra") planet.image = earthImage;
          if (planet.name === "Vênus") planet.image = venusImage;
          if (planet.name === "Marte") planet.image = marsImage;
          return planet;
        });

        const drawSun = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(sunImage, centerX - 50, centerY - 50, 150, 150);
        };

        const drawPlanets = () => {
          planetsRef.current.forEach((planet) => {
            planet.angle += planet.speed;
            const x = centerX + planet.orbitRadius * Math.cos(planet.angle);
            const y = centerY + planet.orbitRadius * Math.sin(planet.angle);

            if (planet.image) {
              ctx.drawImage(
                planet.image,
                x - planet.radius,
                y - planet.radius,
                planet.radius * 5,
                planet.radius * 5
              );
            } else {
              ctx.beginPath();
              ctx.arc(x, y, planet.radius, 0, Math.PI * 2, false);
              ctx.fillStyle = planet.color || "gray";
              ctx.fill();
            }
          });
        };

        const animate = () => {
          drawSun();
          drawPlanets();
          requestAnimationFrame(animate);
        };

        const handleClick = (event: MouseEvent) => {
          if (!ctx || !canvas) return;
          const rect = canvas.getBoundingClientRect();

          const scaleX = canvas.width / rect.width;
          const scaleY = canvas.height / rect.height;

          const mouseX = (event.clientX - rect.left) * scaleX;
          const mouseY = (event.clientY - rect.top) * scaleY;

          const clicked = planetsRef.current.find((planet) => {
            const x = centerX + planet.orbitRadius * Math.cos(planet.angle);
            const y = centerY + planet.orbitRadius * Math.sin(planet.angle);
            const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
            return distance < planet.radius * 5; // Aumenta a área clicável para melhorar a precisão
          });

          setClickedPlanet(clicked || null); // Define o planeta clicado para exibir o tooltip
        };

        canvas.addEventListener("click", handleClick);
        animate();
      }
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const randomPlanet =
        planetsData[Math.floor(Math.random() * planetsData.length)];
      setSelectedPlanet(randomPlanet);
      setShowModal(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const checkAnswer = () => {
    if (
      userAnswer.trim().toLowerCase() === selectedPlanet?.name.toLowerCase()
    ) {
      setFeedback("Correto");
    } else {
      setFeedback(`Incorreto. A resposta correta é: ${selectedPlanet?.name}`);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFeedback(null);
  };

  return (
    <div className="bg-gradient-to-t from-slate-900 via-indigo-950 to-slate-900 min-h-screen flex flex-col items-center justify-center relative">
      <Particles
        className="absolute inset-0 z-0 animate-fade-in pointer-events-none"
        quantity={100}
      />
      <h1 className="text-white text-3xl font-bold mb-4">
        Orbit: A Space Journey
      </h1>
      <canvas ref={canvasRef} width="1000" height="1000" />
      {/* Modal de Pergunta */}
      {showModal && selectedPlanet && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <button
              className="block bg-red-500 text-white px-2 py-1 rounded"
              onClick={closeModal}
            >
              Fechar
            </button>
            <h2 className="text-2xl text-black mb-4">
              Qual planeta é descrito abaixo?
            </h2>
            <p className="text-lg mb-4 italic text-black">
              {selectedPlanet.description}
            </p>
            <input
              type="text"
              className="border p-2 w-full mb-4 text-black"
              placeholder="Digite sua resposta"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
            <button
              className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-700"
              onClick={checkAnswer}
            >
              Enviar
            </button>

            {feedback && (
              <p
                className={`mt-4 ${
                  feedback.startsWith("Correto")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {feedback}
              </p>
            )}
          </div>
        </div>
      )}

      {clickedPlanet && (
        <div
          className="absolute bg-white text-black p-2 rounded shadow"
          style={{
            top: "90%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <strong>{clickedPlanet.name}</strong>
          <p>{clickedPlanet.description}</p>
        </div>
      )}
    </div>
  );
};

export default SolarSystem;
