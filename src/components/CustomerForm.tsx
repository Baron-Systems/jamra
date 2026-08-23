interface Props {
  name: string;
  phone: string;
  onNameChange: (name: string) => void;
  onPhoneChange: (phone: string) => void;
  nameError?: string;
  phoneError?: string;
}

export function CustomerForm({
  name,
  phone,
  onNameChange,
  onPhoneChange,
  nameError,
  phoneError,
}: Props) {
  return (
    <div className="space-y-3">
      <div>
        <label className="mb-1.5 block text-sm font-bold text-gray-300">
          الاسم
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="اسمك الكامل"
          className={`w-full rounded-xl bg-charcoal-600 px-4 py-3 text-white placeholder-gray-500 outline-none ring-1 transition-colors ${
            nameError
              ? "ring-fire-red"
              : "ring-charcoal-500 focus:ring-fire-orange"
          }`}
        />
        {nameError && (
          <p className="mt-1.5 text-xs text-fire-red">{nameError}</p>
        )}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-bold text-gray-300">
          رقم الهاتف
        </label>
        <input
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="05XXXXXXXX"
          className={`w-full rounded-xl bg-charcoal-600 px-4 py-3 text-white placeholder-gray-500 outline-none ring-1 transition-colors ${
            phoneError
              ? "ring-fire-red"
              : "ring-charcoal-500 focus:ring-fire-orange"
          }`}
        />
        {phoneError && (
          <p className="mt-1.5 text-xs text-fire-red">{phoneError}</p>
        )}
      </div>
    </div>
  );
}
