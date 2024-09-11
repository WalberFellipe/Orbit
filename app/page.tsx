import Link from "next/link";
import Particles from "./components/particles";

export default function Home() {
  return (
    <div className="bg-gradient-to-t from-slate-900 via-indigo-950 to-slate-900 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center ">
        <Particles
          className="absolute inset-0 z-0 animate-fade-in pointer-events-none"
          quantity={500}
        />
        <Link
          href="/solar-system"
          className="text-lg text-white hover:underline hover:scale-110 transition-transform duration-1000 ease-in-out"
        >
          Explore o Sistema Solar
        </Link>
        <Link
          href="/"
          className="text-lg text-white hover:underline hover:scale-110 transition-transform duration-1000 ease-in-out"
        >
          Quiz
        </Link>
      </main>
    </div>
  );
}
