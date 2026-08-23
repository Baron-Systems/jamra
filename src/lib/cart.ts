import type { CartItem } from "../types/order";

export interface CartLine {
  item: CartItem;
  lineTotal: number;
}

export function getCartLines(cart: CartItem[]): CartLine[] {
  return cart.map((item) => ({
    item,
    lineTotal: item.unitPrice * item.quantity,
  }));
}

export function findCartItem(
  cart: CartItem[],
  id: string,
  variantId?: string
): CartItem | undefined {
  return cart.find(
    (item) => item.id === id && item.variant?.id === variantId
  );
}
