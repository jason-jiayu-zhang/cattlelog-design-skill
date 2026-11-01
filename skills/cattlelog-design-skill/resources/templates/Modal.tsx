// Cattlelog Modal template (DESIGN.md Section 8 + Section 3). Uses the native <dialog>:
// showModal() gives focus trapping, inert background, Esc to close and focus restoration to the trigger.
// Native dialogs render in the browser top layer, so they ignore z-index (Section 9 is satisfied).
import { useEffect, useId, useRef, type ReactNode } from 'react';

const sizes = { sm: 'max-w-[360px]', md: 'max-w-[480px]', lg: 'max-w-[640px]' } as const;

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  size?: keyof typeof sizes;
  children: ReactNode;
}

export function Modal({ open, onClose, title, size = 'md', children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-modal="true"
      aria-labelledby={titleId}
      onClose={onClose}
      // Backdrop: black-1000 at 25%. Container: black-0, 16px radius, 24px padding.
      // Motion (DESIGN §4.3): add a 200ms ease-out opacity/scale enter and 150ms ease-in exit.
      className={`w-full rounded-xl bg-black-0 p-6 text-black-1000 backdrop:bg-black-1000/25 ${sizes[size]}`}
    >
      <h2 id={titleId} className="text-2xl font-bold">
        {title}
      </h2>
      {children}
    </dialog>
  );
}
