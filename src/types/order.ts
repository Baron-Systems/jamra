export type OrderType = "delivery" | "takeaway";

export interface CartItem {
  id: string;
  name: string;
  variant?: { id: string; name: string };
  quantity: number;
  unitPrice: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
}

export interface DeliveryAddress {
  area: string;
  details: string;
}

export interface OrderState {
  cart: CartItem[];
  orderType: OrderType | null;
  customer: CustomerInfo;
  address: DeliveryAddress;
  notes: string;
}

export interface OrderTotals {
  subtotal: number;
  deliveryFee: number;
  finalTotal: number;
}
