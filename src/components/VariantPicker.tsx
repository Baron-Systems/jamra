import { X } from "lucide-react";
import type { MenuItem, Variant } from "../types/menu";
import { formatPrice } from "../lib/currency";

interface Props {
  item: MenuItem;
  onClose: () => void;
  onSelect: (variant: Variant) => void;
}

export function VariantPicker({ item, onClose, onSelect }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/60 animate-fade-in"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md animate-slide-up rounded-t-3xl bg-charcoal-700 p-5 safe-bottom">
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-charcoal-400" />
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">اختر النوع</h3>
          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal-500 text-gray-400"
          >
            <X size={18} />
          </button>
        </div>
        <p className="mb-3 text-sm text-gray-400">{item.name}</p>
        <div className="space-y-2">
          {item.variants?.map((v) => (
            <button
              key={v.id}
              onClick={() => onSelect(v)}
              className="flex w-full items-center justify-between rounded-xl bg-charcoal-600 px-4 py-3.5 text-white transition-colors hover:bg-fire-orange"
            >
              <span className="font-bold">{v.name}</span>
              <span className="font-bold text-fire-gold">
                {formatPrice(v.price)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
