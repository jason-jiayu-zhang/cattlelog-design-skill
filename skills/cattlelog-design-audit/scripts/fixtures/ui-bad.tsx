import { Sparkles, Star, Check } from 'lucide-react';

export function Bad() {
  return (
    <div className="flex items-center gap-2">
      <Sparkles size={16} strokeWidth={2} />
      <Star size={20} strokeWidth={1.5} />
      <Check size={24} />
      <button className="flex-1 rounded-button bg-blue-700 text-black-0">🔥 Hot</button>
      <div className="will-change-transform">x</div>
    </div>
  );
}
export const Cards = () => (
  <>
    <div className="rounded-lg border border-black-200 bg-black-0 p-4">1px card</div>
    <div className="rounded-lg border-hairline border-black-200 bg-surface-1 p-4">border on colored</div>
  </>
);
