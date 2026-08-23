import { Plus, Minus } from "lucide-react";
import type { MenuItem } from "../types/menu";
import { formatPriceOrNull } from "../lib/currency";
import { ImageWithSkeleton } from "./ImageWithSkeleton";

interface Props {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  onPickVariant?: () => void;
}

export function ProductCard({
  item,
  quantity,
  onAdd,
  onIncrement,
  onDecrement,
  onPickVariant,
}: Props) {
  const hasPrice = item.price !== null;
  const hasVariants = !!item.variants?.length;

  return (
    <div className="flex gap-3 rounded-2xl bg-charcoal-700 p-3 ring-1 ring-charcoal-500 transition-shadow hover:ring-fire-orange/40">
      {/* Image */}
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-white">
        <ImageWithSkeleton
          src={item.image}
          alt={item.name}
          className="h-24 w-24"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-white">{item.name}</h3>
          {item.description && (
            <p className="mt-0.5 text-xs text-gray-400 line-clamp-2">
              {item.description}
            </p>
          )}
          <p className="mt-1 text-lg font-bold text-fire-gold">
            {formatPriceOrNull(item.price)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end">
          {!hasPrice ? (
            <span className="rounded-full bg-charcoal-500 px-3 py-1.5 text-xs text-gray-400">
              غير متاح حالياً
            </span>
          ) : quantity > 0 && !hasVariants ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onDecrement}
                aria-label="إنقاص"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal-500 text-white transition-transform active:scale-90"
              >
                <Minus size={16} />
              </button>
              <span className="min-w-[24px] text-center font-bold text-white">
                {quantity}
              </span>
              <button
                onClick={onIncrement}
                aria-label="زيادة"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-fire-orange text-white transition-transform active:scale-90"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : quantity > 0 && hasVariants ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onDecrement}
                aria-label="إنقاص"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal-500 text-white transition-transform active:scale-90"
              >
                <Minus size={16} />
              </button>
              <span className="min-w-[24px] text-center font-bold text-white">
                {quantity}
              </span>
              <button
                onClick={onPickVariant}
                aria-label="زيادة"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-fire-orange text-white transition-transform active:scale-90"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={hasVariants ? onPickVariant : onAdd}
              aria-label={`إضافة ${item.name}`}
              className="flex items-center gap-1 rounded-full bg-fire-orange px-4 py-2 text-sm font-bold text-white transition-transform active:scale-95"
            >
              <Plus size={16} />
              إضافة
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
