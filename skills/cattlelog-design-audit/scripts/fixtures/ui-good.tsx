import { Check } from 'lucide-react';

export function Good() {
  return (
    <div className="flex items-center gap-2">
      <Check size={16} strokeWidth={2} className="shrink-0" aria-hidden="true" />
      <button className="rounded-button bg-blue-700 px-4 text-black-0">Save</button>
    </div>
  );
}
export const Card = () => <div className="rounded-lg border-hairline border-black-200 bg-black-0 p-4">ok</div>;
