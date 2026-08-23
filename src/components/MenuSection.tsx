import type { MenuItem, Category } from "../types/menu";
import { ProductCard } from "./ProductCard";

interface Props {
  category: Category;
  label: string;
  items: MenuItem[];
  getQuantity: (id: string, variantId?: string) => number;
  onAdd: (item: MenuItem) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string, variantId?: string) => void;
  onPickVariant: (item: MenuItem) => void;
}

export function MenuSection({
  category,
  label,
  items,
  getQuantity,
  onAdd,
  onIncrement,
  onDecrement,
  onPickVariant,
}: Props) {
  return (
    <section id={`section-${category}`} className="scroll-mt-[110px]">
      <h2 className="mb-3 mt-6 text-xl font-bold text-fire-gold">{label}</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            quantity={getQuantity(item.id)}
            onAdd={() => onAdd(item)}
            onIncrement={() => onIncrement(item.id)}
            onDecrement={() => onDecrement(item.id)}
            onPickVariant={() => onPickVariant(item)}
          />
        ))}
      </div>
    </section>
  );
}
