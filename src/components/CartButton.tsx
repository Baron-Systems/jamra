import { ShoppingBag } from "lucide-react";
import { formatPrice } from "../lib/currency";
import { calculateOrderTotals, getCartItemCount } from "../lib/orderTotals";

interface Props {
  cartCount: number;
  subtotal: number;
  onClick: () => void;
}

export function CartButton({ cartCount, subtotal, onClick }: Props) {
  if (cartCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 safe-bottom">
      <div className="mx-auto max-w-md px-4 pb-3">
        <button
          onClick={onClick}
          className="flex w-full items-center justify-between rounded-2xl bg-fire-orange px-5 py-3.5 text-white shadow-lg shadow-fire-orange/30 transition-transform active:scale-[0.98]"
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <ShoppingBag size={22} />
              <span className="absolute -top-2 -left-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-fire-orange">
                {cartCount}
              </span>
            </div>
            <span className="font-bold">عرض الطلب</span>
          </div>
          <span className="font-bold">{formatPrice(subtotal)}</span>
        </button>
      </div>
    </div>
  );
}

// Helper export for convenience
export { calculateOrderTotals, getCartItemCount };
