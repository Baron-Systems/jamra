import { Facebook } from "lucide-react";
import { RESTAURANT_CONFIG } from "../config/restaurant";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-charcoal-700 to-charcoal-900 px-4 pb-10 pt-8 text-center">
      {/* Glow effect */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-fire-orange/25 blur-3xl" />

      <div className="relative mx-auto flex max-w-md flex-col items-center">
        <img
          src={`${import.meta.env.BASE_URL}logo.jpg`}
          alt="شعار شاورما جمرة"
          className="h-28 w-28 rounded-full object-cover ring-2 ring-fire-gold/50 shadow-lg shadow-fire-orange/20"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.style.display = "none";
          }}
        />

        <h1 className="mt-4 text-3xl font-bold text-fire-gold">
          {RESTAURANT_CONFIG.name}
        </h1>

        <p className="mt-2 text-lg text-white">
          شاورما عالفحم... النكهة بتحكي لحالها 🔥
        </p>

        <p className="mt-1 text-sm text-gray-400">
          {RESTAURANT_CONFIG.address}
        </p>

        <div className="mt-4 flex items-center gap-3">
          <a
            href={RESTAURANT_CONFIG.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal-600 text-gray-300 transition-colors hover:bg-fire-orange hover:text-white"
          >
            <Facebook size={20} />
          </a>
          <a
            href={RESTAURANT_CONFIG.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal-600 text-gray-300 transition-colors hover:bg-fire-orange hover:text-white"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
