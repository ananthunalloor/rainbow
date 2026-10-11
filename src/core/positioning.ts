export type RainbowPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'right-start' | 'left-start';

export interface RainbowPositionOptions {
  placement?: RainbowPlacement;
  offset?: number;
  viewportPadding?: number;
  x?: number;
  y?: number;
}

/** Positions a floating element against an anchor (or a pointer coordinate), flipping and shifting within the viewport. */
export function positionRainbowFloatingElement(
  anchor: HTMLElement,
  floating: HTMLElement,
  options: RainbowPositionOptions = {},
): void {
  const placement = options.placement ?? 'bottom-start';
  const offset = options.offset ?? 6;
  const padding = options.viewportPadding ?? 8;
  const anchorRect = options.x !== undefined && options.y !== undefined
    ? new DOMRect(options.x, options.y, 0, 0)
    : anchor.getBoundingClientRect();
  const floatingRect = floating.getBoundingClientRect();
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;
  let x = anchorRect.left;
  let y = anchorRect.bottom + offset;

  if (placement.endsWith('end')) x = anchorRect.right - floatingRect.width;
  if (placement.startsWith('top')) y = anchorRect.top - floatingRect.height - offset;
  if (placement.startsWith('right')) {
    x = anchorRect.right + offset;
    y = anchorRect.top;
  }
  if (placement.startsWith('left')) {
    x = anchorRect.left - floatingRect.width - offset;
    y = anchorRect.top;
  }

  const verticalOverflow = y + floatingRect.height > vh - padding;
  if (verticalOverflow && placement.startsWith('bottom') && anchorRect.top - floatingRect.height - offset >= padding) {
    y = anchorRect.top - floatingRect.height - offset;
  } else if (y < padding && placement.startsWith('top') && anchorRect.bottom + floatingRect.height + offset <= vh - padding) {
    y = anchorRect.bottom + offset;
  }
  const horizontalOverflow = x + floatingRect.width > vw - padding;
  if (horizontalOverflow && (placement === 'bottom-start' || placement === 'top-start')) x = anchorRect.right - floatingRect.width;
  else if (x < padding && (placement === 'bottom-end' || placement === 'top-end')) x = anchorRect.left;
  x = Math.max(padding, Math.min(x, vw - floatingRect.width - padding));
  y = Math.max(padding, Math.min(y, vh - floatingRect.height - padding));

  floating.style.position = 'fixed';
  floating.style.inset = 'auto';
  floating.style.left = `${Math.round(x)}px`;
  floating.style.top = `${Math.round(y)}px`;
}

/** Repositions while the viewport or scrollable ancestors change. Call the returned cleanup on close. */
export function observeRainbowPosition(
  anchor: HTMLElement,
  floating: HTMLElement,
  update: () => void,
): () => void {
  const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update);
  resizeObserver?.observe(anchor);
  resizeObserver?.observe(floating);
  window.addEventListener('resize', update, { passive: true });
  document.addEventListener('scroll', update, { capture: true, passive: true });
  return () => {
    resizeObserver?.disconnect();
    window.removeEventListener('resize', update);
    document.removeEventListener('scroll', update, true);
  };
}
