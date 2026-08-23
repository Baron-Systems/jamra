import { Facebook } from "lucide-react";
import { RESTAURANT_CONFIG } from "../config/restaurant";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-charcoal-600 bg-charcoal-800 px-4 py-8 text-center">
      <h3 className="text-lg font-bold text-fire-gold">
        {RESTAURANT_CONFIG.name}
      </h3>
      <p className="mt-1 text-sm text-gray-400">
        {RESTAURANT_CONFIG.address}
      </p>
      <div className="mt-4 flex items-center justify-center gap-3">
        <a
          href={RESTAURANT_CONFIG.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal-600 text-gray-300 transition-colors hover:bg-fire-orange hover:text-white"
        >
          <Facebook size={18} />
        </a>
        <a
          href={RESTAURANT_CONFIG.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal-600 text-gray-300 transition-colors hover:bg-fire-orange hover:text-white"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
        </a>
      </div>
      <p className="mt-4 text-xs text-gray-500">
        جميع الحقوق محفوظة © {RESTAURANT_CONFIG.name}
      </p>
    </footer>
  );
}
