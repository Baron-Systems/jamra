import type { OrderType, CustomerInfo, DeliveryAddress } from "../types/order";

export interface ValidationErrors {
  cart?: string;
  name?: string;
  phone?: string;
  orderType?: string;
  area?: string;
  addressDetails?: string;
}

export function validateOrder(params: {
  cartLength: number;
  orderType: OrderType | null;
  customer: CustomerInfo;
  address: DeliveryAddress;
}): ValidationErrors {
  const errors: ValidationErrors = {};
  const { cartLength, orderType, customer, address } = params;

  if (cartLength === 0) {
    errors.cart = "السلة فارغة، اختر وجبتك من المنيو";
  }

  if (!customer.name.trim()) {
    errors.name = "الرجاء إدخال الاسم";
  }

  if (!customer.phone.trim()) {
    errors.phone = "الرجاء إدخال رقم الهاتف";
  } else if (customer.phone.replace(/[\s-]/g, "").length < 7) {
    errors.phone = "رقم الهاتف غير صحيح";
  }

  if (!orderType) {
    errors.orderType = "اختر طريقة الاستلام";
  }

  if (orderType === "delivery") {
    if (!address.area) {
      errors.area = "اختر منطقة التوصيل";
    }
    if (!address.details.trim()) {
      errors.addressDetails = "أدخل تفاصيل العنوان";
    }
  }

  return errors;
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.values(errors).some((v) => v !== undefined && v !== "");
}
