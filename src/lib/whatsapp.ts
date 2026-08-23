import type { CartItem, OrderType, CustomerInfo, DeliveryAddress } from "../types/order";
import { calculateOrderTotals } from "./orderTotals";
import { RESTAURANT_CONFIG } from "../config/restaurant";
import { formatPrice } from "./currency";

export interface OrderPayload {
  cart: CartItem[];
  orderType: OrderType;
  customer: CustomerInfo;
  address: DeliveryAddress | null;
  notes: string;
}

export function generateWhatsAppMessage(order: OrderPayload): string {
  const { cart, orderType, customer, address, notes } = order;
  const { subtotal, deliveryFee, finalTotal } = calculateOrderTotals(
    cart,
    orderType
  );

  const lines: string[] = [];

  lines.push(`🔥 *شاورما جمرة - طلب جديد*`);
  lines.push("");
  lines.push(`👤 الاسم: ${customer.name}`);
  lines.push(`📞 الهاتف: ${customer.phone}`);
  lines.push(
    `🛵 نوع الطلب: ${orderType === "delivery" ? "توصيل" : "استلام من المطعم"}`
  );
  lines.push("");

  if (orderType === "delivery" && address) {
    lines.push(`📍 المنطقة: ${address.area}`);
    lines.push(`🏠 العنوان: ${address.details}`);
    lines.push("");
  }

  lines.push(`📝 *تفاصيل الطلب:*`);
  cart.forEach((item, idx) => {
    const variantText = item.variant ? ` (${item.variant.name})` : "";
    const lineTotal = item.unitPrice * item.quantity;
    lines.push(
      `${idx + 1}. ${item.name}${variantText} ×${item.quantity} = ${formatPrice(
        lineTotal
      )}`
    );
  });
  lines.push("");

  if (notes.trim()) {
    lines.push(`🗒️ ملاحظات: ${notes.trim()}`);
    lines.push("");
  }

  lines.push(`💰 مجموع الأصناف: ${formatPrice(subtotal)}`);

  if (orderType === "delivery") {
    lines.push(`🚚 توصيل: ${formatPrice(deliveryFee)}`);
  }

  lines.push(`✅ *المجموع النهائي: ${formatPrice(finalTotal)}*`);

  return lines.join("\n");
}

export function sendWhatsAppOrder(order: OrderPayload): void {
  const message = generateWhatsAppMessage(order);
  const url = `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.location.href = url;
}
