import type { CartItem, OrderType, OrderTotals } from "../types/order";
import { RESTAURANT_CONFIG } from "../config/restaurant";

export function calculateOrderTotals(
  cart: CartItem[],
  orderType: OrderType | null
): OrderTotals {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const deliveryFee =
    orderType === "delivery" ? RESTAURANT_CONFIG.deliveryFee : 0;
  const finalTotal = subtotal + deliveryFee;
  return { subtotal, deliveryFee, finalTotal };
}

export function getCartItemCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}
