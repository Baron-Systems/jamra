export function formatPrice(price: number): string {
  return `${price} ₪`;
}

export function formatPriceOrNull(price: number | null): string {
  if (price === null) return "—";
  return formatPrice(price);
}
