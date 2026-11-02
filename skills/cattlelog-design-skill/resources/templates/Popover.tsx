// Cattlelog Popover template (DESIGN.md Section 12). Requires `@floating-ui/react`.
// Portaled to document.body, flips/shifts with a 16px viewport margin, traps focus, restores focus
// to the trigger on close, closes on Escape / outside click. Tooltips follow the same portal rule
// but are non-interactive (role="tooltip", aria-describedby) and must not contain links or buttons.
import { useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';

export interface PopoverProps {
  /** Visible trigger content. Icon-only triggers must pass `triggerLabel`. */
  trigger: ReactNode;
  triggerLabel?: string;
  children: ReactNode;
}

export function Popover({ trigger, triggerLabel, children }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-start',
    middleware: [offset(8), flip({ padding: 16 }), shift({ padding: 16 })],
    whileElementsMounted: autoUpdate,
  });
  // useRole({ role: 'dialog' }) sets role="dialog" on the popover and aria-haspopup/expanded on the trigger.
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context, { role: 'dialog' }),
  ]);

  return (
    <>
      <button
        type="button"
        ref={refs.setReference}
        aria-label={triggerLabel}
        className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
        {...getReferenceProps()}
      >
        {trigger}
      </button>
      {open &&
        createPortal(
          <FloatingFocusManager context={context}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              // z-100 = dropdowns/popovers layer. shadow-strong + 12px radius + p-4 per DESIGN §12.
              // Motion (DESIGN §4.3): 150ms ease-out opacity + scale(0.95 -> 1), origin at the anchor.
              className="z-[100] rounded-lg border-hairline border-black-200 bg-black-0 p-4 shadow-strong"
              {...getFloatingProps()}
            >
              {children}
            </div>
          </FloatingFocusManager>,
          document.body,
        )}
    </>
  );
}
