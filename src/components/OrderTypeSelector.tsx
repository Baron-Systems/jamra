import { Truck, Store } from "lucide-react";
import type { OrderType } from "../types/order";

interface Props {
  value: OrderType | null;
  onChange: (type: OrderType) => void;
  error?: string;
}

export function OrderTypeSelector({ value, onChange, error }: Props) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onChange("delivery")}
          className={`flex flex-col items-center gap-2 rounded-xl p-4 transition-all ${
            value === "delivery"
              ? "bg-fire-orange text-white ring-2 ring-fire-gold"
              : "bg-charcoal-600 text-gray-300"
          }`}
        >
          <Truck size={24} />
          <span className="font-bold">🚚 توصيل</span>
        </button>
        <button
          onClick={() => onChange("takeaway")}
          className={`flex flex-col items-center gap-2 rounded-xl p-4 transition-all ${
            value === "takeaway"
              ? "bg-fire-orange text-white ring-2 ring-fire-gold"
              : "bg-charcoal-600 text-gray-300"
          }`}
        >
          <Store size={24} />
          <span className="font-bold">🛍️ استلام</span>
        </button>
      </div>
      {error && <p className="mt-1.5 text-xs text-fire-red">{error}</p>}
    </div>
  );
}
