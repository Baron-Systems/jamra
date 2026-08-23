import { useState, useEffect } from "react";
import { Utensils, CupSoda } from "lucide-react";
import type { Category } from "../types/menu";

interface Props {
  categories: { id: Category; label: string }[];
}

export function CategoryTabs({ categories }: Props) {
  const [active, setActive] = useState<Category>(categories[0]?.id ?? "meals");

  useEffect(() => {
    const handleScroll = () => {
      let current: Category = categories[0]?.id ?? "meals";
      for (const cat of categories) {
        const el = document.getElementById(`section-${cat.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = cat.id;
          }
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories]);

  const handleClick = (id: Category) => {
    document.getElementById(`section-${id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const icons: Record<Category, typeof Utensils> = {
    meals: Utensils,
    drinks: CupSoda,
  };

  return (
    <div className="sticky top-[57px] z-20 bg-charcoal-800/90 backdrop-blur-md border-b border-charcoal-600">
      <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-2.5">
        {categories.map((cat) => {
          const Icon = icons[cat.id];
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-all ${
                isActive
                  ? "bg-fire-orange text-white"
                  : "bg-charcoal-700 text-gray-400"
              }`}
            >
              <Icon size={16} />
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
