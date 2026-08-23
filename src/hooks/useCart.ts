import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { CartItem } from "../types/order";
import { findCartItem } from "../lib/cart";

const CART_KEY = "jamra-cart";

export function useCart() {
  const [cart, setCart] = useLocalStorage<CartItem[]>(CART_KEY, []);

  const addToCart = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) => {
      setCart((prev) => {
        const existing = findCartItem(prev, item.id, item.variant?.id);
        if (existing) {
          return prev.map((ci) =>
            ci.id === item.id && ci.variant?.id === item.variant?.id
              ? { ...ci, quantity: ci.quantity + quantity }
              : ci
          );
        }
        return [...prev, { ...item, quantity }];
      });
    },
    [setCart]
  );

  const increment = useCallback(
    (id: string, variantId?: string) => {
      setCart((prev) =>
        prev.map((ci) =>
          ci.id === id && ci.variant?.id === variantId
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        )
      );
    },
    [setCart]
  );

  const decrement = useCallback(
    (id: string, variantId?: string) => {
      setCart((prev) =>
        prev
          .map((ci) =>
            ci.id === id && ci.variant?.id === variantId
              ? { ...ci, quantity: ci.quantity - 1 }
              : ci
          )
          .filter((ci) => ci.quantity > 0)
      );
    },
    [setCart]
  );

  const removeItem = useCallback(
    (id: string, variantId?: string) => {
      setCart((prev) =>
        prev.filter(
          (ci) => !(ci.id === id && ci.variant?.id === variantId)
        )
      );
    },
    [setCart]
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  const getQuantity = useCallback(
    (id: string, variantId?: string) => {
      const item = findCartItem(cart, id, variantId);
      return item?.quantity ?? 0;
    },
    [cart]
  );

  return {
    cart,
    addToCart,
    increment,
    decrement,
    removeItem,
    clearCart,
    getQuantity,
  };
}
