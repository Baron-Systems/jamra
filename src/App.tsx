import { useState, useCallback } from "react";
import { Send } from "lucide-react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { CategoryTabs } from "./components/CategoryTabs";
import { MenuSection } from "./components/MenuSection";
import { CartButton } from "./components/CartButton";
import { CartSheet } from "./components/CartSheet";
import { OrderTypeSelector } from "./components/OrderTypeSelector";
import { AddressForm } from "./components/AddressForm";
import { CustomerForm } from "./components/CustomerForm";
import { Footer } from "./components/Footer";
import { Toast } from "./components/Toast";
import { VariantPicker } from "./components/VariantPicker";
import { useCart } from "./hooks/useCart";
import { MENU_ITEMS } from "./data/menu";
import { calculateOrderTotals } from "./lib/orderTotals";
import { validateOrder, hasErrors, type ValidationErrors } from "./lib/validation";
import { sendWhatsAppOrder } from "./lib/whatsapp";
import type { MenuItem, Variant, Category } from "./types/menu";
import type { OrderType } from "./types/order";

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "meals", label: "الوجبات" },
  { id: "drinks", label: "المشروبات" },
];

export default function App() {
  const {
    cart,
    addToCart,
    increment,
    decrement,
    removeItem,
    getQuantity,
  } = useCart();

  const [cartOpen, setCartOpen] = useState(false);
  const [variantPicker, setVariantPicker] = useState<MenuItem | null>(null);
  const [toast, setToast] = useState(false);

  // Order form state (not persisted)
  const [orderType, setOrderType] = useState<OrderType | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryArea, setDeliveryArea] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});

  const showToast = useCallback(() => {
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  }, []);

  const handleAddItem = useCallback(
    (item: MenuItem) => {
      if (item.price === null) return;
      addToCart({
        id: item.id,
        name: item.name,
        unitPrice: item.price,
      });
      showToast();
    },
    [addToCart, showToast]
  );

  const handlePickVariant = useCallback((item: MenuItem) => {
    setVariantPicker(item);
  }, []);

  const handleSelectVariant = useCallback(
    (variant: Variant) => {
      if (!variantPicker) return;
      addToCart({
        id: variantPicker.id,
        name: variantPicker.name,
        variant: { id: variant.id, name: variant.name },
        unitPrice: variant.price,
      });
      setVariantPicker(null);
      showToast();
    },
    [variantPicker, addToCart, showToast]
  );

  // Clean address when switching to takeaway
  const handleOrderTypeChange = useCallback((type: OrderType) => {
    setOrderType(type);
    if (type === "takeaway") {
      setDeliveryArea("");
      setAddressDetails("");
    }
    setErrors((prev) => ({ ...prev, orderType: undefined, area: undefined, addressDetails: undefined }));
  }, []);

  const { subtotal } = calculateOrderTotals(cart, orderType);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmitOrder = useCallback(() => {
    const newErrors = validateOrder({
      cartLength: cart.length,
      orderType,
      customer: { name: customerName, phone: customerPhone },
      address: { area: deliveryArea, details: addressDetails },
    });
    setErrors(newErrors);

    if (hasErrors(newErrors)) return;

    sendWhatsAppOrder({
      cart,
      orderType: orderType!,
      customer: { name: customerName, phone: customerPhone },
      address:
        orderType === "delivery"
          ? { area: deliveryArea, details: addressDetails }
          : null,
      notes,
    });
  }, [
    cart,
    orderType,
    customerName,
    customerPhone,
    deliveryArea,
    addressDetails,
    notes,
  ]);

  // Group menu items by category
  const itemsByCategory = (cat: Category) =>
    MENU_ITEMS.filter((item) => item.category === cat);

  return (
    <div className="min-h-screen bg-charcoal-800 pb-20">
      <Header />
      <Hero />

      <div id="menu">
        <CategoryTabs categories={CATEGORIES} />

        <div className="mx-auto max-w-5xl px-4">
          {CATEGORIES.map((cat) => (
            <MenuSection
              key={cat.id}
              category={cat.id}
              label={cat.label}
              items={itemsByCategory(cat.id)}
              getQuantity={getQuantity}
              onAdd={handleAddItem}
              onIncrement={increment}
              onDecrement={decrement}
              onPickVariant={handlePickVariant}
            />
          ))}
        </div>
      </div>

      <Footer />

      {/* Cart Button */}
      <CartButton
        cartCount={cartCount}
        subtotal={subtotal}
        onClick={() => setCartOpen(true)}
      />

      {/* Toast */}
      <Toast message="تمت الإضافة للطلب 🔥" visible={toast} />

      {/* Variant Picker */}
      {variantPicker && (
        <VariantPicker
          item={variantPicker}
          onClose={() => setVariantPicker(null)}
          onSelect={handleSelectVariant}
        />
      )}

      {/* Cart Sheet */}
      <CartSheet
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onIncrement={increment}
        onDecrement={decrement}
        onRemove={removeItem}
        onBrowse={() => setCartOpen(false)}
      >
        {/* Checkout form inside cart sheet */}
        <div className="space-y-4 pb-4">
          {/* Notes */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-gray-300">
              ملاحظات على الطلب (اختياري)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="مثال: بدون بصل، زيادة صوص..."
              className="w-full rounded-xl bg-charcoal-600 px-4 py-3 text-white placeholder-gray-500 outline-none ring-1 ring-charcoal-500 focus:ring-fire-orange"
            />
          </div>

          {/* Order Type */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-gray-300">
              طريقة الاستلام
            </label>
            <OrderTypeSelector
              value={orderType}
              onChange={handleOrderTypeChange}
              error={errors.orderType}
            />
          </div>

          {/* Address (delivery only) */}
          {orderType === "delivery" && (
            <AddressForm
              area={deliveryArea}
              details={addressDetails}
              onAreaChange={setDeliveryArea}
              onDetailsChange={setAddressDetails}
              areaError={errors.area}
              detailsError={errors.addressDetails}
            />
          )}

          {/* Customer info */}
          <CustomerForm
            name={customerName}
            phone={customerPhone}
            onNameChange={setCustomerName}
            onPhoneChange={setCustomerPhone}
            nameError={errors.name}
            phoneError={errors.phone}
          />

          {/* Submit */}
          <button
            onClick={handleSubmitOrder}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-fire-whatsapp px-5 py-4 text-lg font-bold text-white shadow-lg shadow-fire-whatsapp/30 transition-transform active:scale-[0.98]"
          >
            <Send size={20} />
            إرسال الطلب عبر واتساب
          </button>

          {errors.cart && (
            <p className="text-center text-xs text-fire-red">{errors.cart}</p>
          )}
        </div>
      </CartSheet>
    </div>
  );
}
