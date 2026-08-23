import { Flame } from "lucide-react";

export function Header() {
  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-30 bg-charcoal-800/90 backdrop-blur-md border-b border-charcoal-600">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <img
            src={`${import.meta.env.BASE_URL}logo.jpg`}
            alt="شعار شاورما جمرة"
            className="h-9 w-9 rounded-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <span className="text-lg font-bold text-fire-gold">
            شاورما جمرة
          </span>
        </div>
        <button
          onClick={scrollToMenu}
          className="flex items-center gap-1.5 rounded-full bg-fire-orange px-4 py-2 text-sm font-bold text-white transition-transform active:scale-95"
        >
          <Flame size={16} />
          اطلب الآن
        </button>
      </div>
    </header>
  );
}
