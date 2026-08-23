interface Props {
  message: string;
  visible: boolean;
}

export function Toast({ message, visible }: Props) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 animate-fade-in">
      <div className="rounded-full bg-charcoal-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg ring-1 ring-fire-orange/40">
        {message}
      </div>
    </div>
  );
}
