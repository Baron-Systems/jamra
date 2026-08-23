import { RESTAURANT_CONFIG } from "../config/restaurant";

interface Props {
  area: string;
  details: string;
  onAreaChange: (area: string) => void;
  onDetailsChange: (details: string) => void;
  areaError?: string;
  detailsError?: string;
}

export function AddressForm({
  area,
  details,
  onAreaChange,
  onDetailsChange,
  areaError,
  detailsError,
}: Props) {
  return (
    <div className="space-y-3 animate-fade-in">
      <div>
        <label className="mb-1.5 block text-sm font-bold text-gray-300">
          منطقة التوصيل
        </label>
        <select
          value={area}
          onChange={(e) => onAreaChange(e.target.value)}
          className={`w-full rounded-xl bg-charcoal-600 px-4 py-3 text-white outline-none ring-1 transition-colors ${
            areaError
              ? "ring-fire-red"
              : "ring-charcoal-500 focus:ring-fire-orange"
          }`}
        >
          <option value="">اختر المنطقة</option>
          {RESTAURANT_CONFIG.deliveryAreas.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        {areaError && (
          <p className="mt-1.5 text-xs text-fire-red">{areaError}</p>
        )}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-bold text-gray-300">
          تفاصيل العنوان
        </label>
        <input
          type="text"
          value={details}
          onChange={(e) => onDetailsChange(e.target.value)}
          placeholder="مثال: قرب مسجد ... / بجانب محل ... / المنزل رقم ..."
          className={`w-full rounded-xl bg-charcoal-600 px-4 py-3 text-white placeholder-gray-500 outline-none ring-1 transition-colors ${
            detailsError
              ? "ring-fire-red"
              : "ring-charcoal-500 focus:ring-fire-orange"
          }`}
        />
        {detailsError && (
          <p className="mt-1.5 text-xs text-fire-red">{detailsError}</p>
        )}
      </div>
    </div>
  );
}
