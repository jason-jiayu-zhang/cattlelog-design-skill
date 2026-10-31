// Cattlelog Button template (DESIGN.md Section 11). Adapt imports/paths to the repo's conventions.
// Assumes the Tailwind theme maps design.md tokens (colors, `rounded-button` = 10px, spacing scale).
import { forwardRef, type ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary';

const base = [
  // Shape: 40px tall (44px on mobile), 10px radius, Body Regular.
  'inline-flex h-10 items-center justify-center gap-2 rounded-button px-4 text-base font-normal max-md:h-11',
  // Motion: color/transform only, never transition-all (DESIGN §4.3). Press is faster than hover.
  'transition-[background-color,border-color,color,transform] duration-200 ease-in-out',
  'active:scale-[0.98] active:duration-75 active:ease-out motion-reduce:transition-none',
  // Focus: custom :focus-visible ring (DESIGN §3), no bare outline-none.
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500',
  // Disabled: no hover/active styling.
  'disabled:pointer-events-none disabled:cursor-not-allowed',
].join(' ');

const variants: Record<Variant, string> = {
  primary:
    'bg-blue-700 text-black-0 hover:bg-blue-800 active:bg-blue-900 disabled:bg-black-200 disabled:text-black-400',
  secondary:
    'border border-blue-700 bg-black-0 text-blue-700 hover:bg-blue-50 active:bg-blue-200 disabled:border-black-200 disabled:text-black-400',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', className = '', type = 'button', ...props },
  ref,
) {
  return <button ref={ref} type={type} className={`${base} ${variants[variant]} ${className}`} {...props} />;
});
