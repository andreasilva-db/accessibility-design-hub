/**
 * Accessibility helpers for the Accessibility Design Hub.
 */

/**
 * Returns true if the user prefers reduced motion (e.g. prefers-reduced-motion: reduce).
 * Use this to disable or shorten animations in JavaScript.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  return query.matches;
}

/**
 * Focus trap placeholder. For modals/dialogs, implement with focus-trap-react
 * or similar to keep focus within the container and cycle on Tab.
 */
export function createFocusTrap(_element: HTMLElement | null): { activate: () => void; deactivate: () => void } {
  return {
    activate: () => {},
    deactivate: () => {},
  };
}
