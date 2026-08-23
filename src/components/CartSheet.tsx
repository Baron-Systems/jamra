import { X, Plus, Minus, Trash2 } from "lucide-react";
import type { CartItem } from "../types/order";
import { formatPrice } from "../lib/currency";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import { EmptyCart } from "./EmptyCart";

interface Props {
  open: boolean;
  cart: CartItem[];
  onClose: () => void;
  onIncrement: (id: string, variantId?: string) => void;
  onDecrement: (id: string, variantId?: string) => void;
  onRemove: (id: string, variantId?: string) => void;
  onBrowse: () => void;
  children?: React.ReactNode;
}

export function CartSheet({
  open,
  cart,
  onClose,
  onIncrement,
  onDecrement,
  onRemove,
  onBrowse,
  children,
}: Props) {
  useLockBodyScroll(open);

  if (!open) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/60 animate-fade-in"
        onClick={onClose}
      />
      <div className="relative flex max-h-[90vh] w-full max-w-md animate-slide-up flex-col rounded-t-3xl bg-charcoal-800 safe-bottom">
        {/* Handle */}
        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-charcoal-500" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3">
          <h2 className="text-lg font-bold text-white">طلبك</h2>
          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal-500 text-gray-400"
          >
            <X size={18} />
          </button>
        </div>

        {cart.length === 0 ? (
          <EmptyCart onBrowse={onBrowse} />
        ) : (
          <>
            {/* Cart items */}
            <div className="flex-1 overflow-y-auto px-5 pb-4">
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.variant?.id ?? ""}`}
                    className="flex items-center gap-3 rounded-xl bg-charcoal-600 p-3"
                  >
                    <div className="flex-1">
                      <p className="font-bold text-white">{item.name}</p>
                      {item.variant && (
                        <p className="text-xs text-fire-gold">
                          {item.variant.name}
                        </p>
                      )}
                      <p className="mt-0.5 text-xs text-gray-400">
                        {formatPrice(item.unitPrice)} للوحدة
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          onDecrement(item.id, item.variant?.id)
                        }
                        aria-label="إنقاص"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-charcoal-500 text-white active:scale-90"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="min-w-[20px] text-center font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onIncrement(item.id, item.variant?.id)
                        }
                        aria-label="زيادة"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-fire-orange text-white active:scale-90"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="font-bold text-fire-gold">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                      <button
                        onClick={() => onRemove(item.id, item.variant?.id)}
                        aria-label="حذف"
                        className="text-gray-500 hover:text-fire-red"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-charcoal-600 px-5 pt-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-gray-400">المجموع</span>
                <span className="text-lg font-bold text-white">
                  {formatPrice(subtotal)}
                </span>
              </div>
              {children}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
