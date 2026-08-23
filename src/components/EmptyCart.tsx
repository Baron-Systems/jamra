import { Flame } from "lucide-react";

interface Props {
  onBrowse: () => void;
}

export function EmptyCart({ onBrowse }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-charcoal-600">
        <Flame size={36} className="text-fire-orange" />
      </div>
      <p className="mt-4 text-lg font-bold text-white">
        لسا ما اخترت إشي 🔥
      </p>
      <p className="mt-1 text-sm text-gray-400">
        اختار وجبتك من المنيو
      </p>
      <button
        onClick={onBrowse}
        className="mt-4 rounded-full bg-fire-orange px-5 py-2.5 text-sm font-bold text-white transition-transform active:scale-95"
      >
        تصفح المنيو
      </button>
    </div>
  );
}
