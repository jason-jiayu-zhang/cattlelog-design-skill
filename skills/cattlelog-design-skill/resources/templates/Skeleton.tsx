// Cattlelog Skeleton template (DESIGN.md Section 4.4 and 5). Adapt imports/paths to the repo's conventions.
// Assumes the Tailwind theme maps design.md tokens. `rounded` must resolve to 4px (the skeleton radius).
import type { CSSProperties, ReactNode } from 'react';

/** One placeholder block. Size it to the real content it stands for (same width, same height),
 *  so nothing moves when the content arrives. Text lines are 16px tall, headings 32px,
 *  the last line of a paragraph 70-80% wide. */
export function Skeleton({ className = '', index = 0 }: { className?: string; index?: number }) {
  // Stagger list items 75ms apart, first 5 only (DESIGN §4.3).
  const style: CSSProperties = { animationDelay: `${Math.min(index, 4) * 75}ms` };
  return (
    <div
      aria-hidden="true"
      style={style}
      // Pulse is the only looping animation allowed besides Cory. It stops under reduced motion
      // and stays a static black-200 block.
      className={`rounded bg-black-200 animate-pulse motion-reduce:animate-none ${className}`}
    />
  );
}

/** Puts the skeleton and the real content in the SAME grid cell, so the placeholder fades out
 *  exactly where the content fades in. Only data should sit inside; keep headings, labels and
 *  chrome that are known up front OUTSIDE it and render them for real from the first frame.
 *
 *  <Loadable loading={isLoading} skeleton={<Skeleton className="h-4 w-24" />}>
 *    {course.title}
 *  </Loadable>
 */
export function Loadable({
  loading,
  skeleton,
  children,
  className = '',
}: {
  loading: boolean;
  skeleton: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid ${className}`} aria-busy={loading}>
      {/* Content layer: in 300ms ease-out. aria-hidden while loading so screen readers skip empties. */}
      <div
        aria-hidden={loading}
        className={`col-start-1 row-start-1 transition-opacity motion-reduce:transition-none ${
          loading ? 'opacity-0 duration-150 ease-in' : 'opacity-100 duration-300 ease-out'
        }`}
      >
        {children}
      </div>
      {/* Skeleton layer: out in 150ms ease-in, then removed from the tab/AT tree. */}
      <div
        aria-hidden="true"
        className={`col-start-1 row-start-1 transition-opacity motion-reduce:transition-none ${
          loading ? 'opacity-100 duration-300 ease-out' : 'pointer-events-none opacity-0 duration-150 ease-in'
        }`}
      >
        {skeleton}
      </div>
      {/* One polite announcement for the whole region, not one per block. */}
      {loading && (
        <span role="status" className="sr-only">
          Loading
        </span>
      )}
    </div>
  );
}
