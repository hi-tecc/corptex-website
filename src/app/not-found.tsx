import Link from "next/link";

import { LogoMark } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-svh place-items-center bg-ink px-5 text-center text-white">
      <div>
        <LogoMark className="mx-auto size-16 text-hivis" />
        <p className="mt-8 text-8xl font-black tracking-tight text-hivis">404</p>
        <h1 className="mt-4 text-3xl font-extrabold">Deze pagina bestaat niet (meer).</h1>
        <Link
          href="/"
          className="mt-10 inline-flex rounded-full bg-hivis px-7 py-4 font-semibold text-ink transition-colors hover:bg-white"
        >
          Terug naar de homepage
        </Link>
      </div>
    </main>
  );
}
