export type RainbowPlacement =
  | 'bottom-start'
  | 'bottom-end'
  | 'top-start'
  | 'top-end'
  | 'right-start'
  | 'right-end'
  | 'left-start'
  | 'left-end';

export type RainbowDirection = 'ltr' | 'rtl' | 'auto';

export interface RainbowPositionOptions {
  /** Preferred side and alignment. Start/end are logical for top/bottom placements. */
  placement?: RainbowPlacement;
  /** Gap between the anchor and the floating element, in CSS pixels. */
  offset?: number;
  /** Minimum viewport distance, in CSS pixels. */
  viewportPadding?: number;
  /** Optional pointer anchor. Both x and y must be provided to use it. */
  x?: number;
  y?: number;
  /** Controls logical start/end placement. Defaults to the anchor's computed direction. */
  direction?: RainbowDirection;
}

interface Coordinates {
  x: number;
  y: number;
}

function oppositeSide(placement: RainbowPlacement): RainbowPlacement {
  const opposite: Record<RainbowPlacement, RainbowPlacement> = {
    'bottom-start': 'top-start',
    'bottom-end': 'top-end',
    'top-start': 'bottom-start',
    'top-end': 'bottom-end',
    'right-start': 'left-start',
    'right-end': 'left-end',
    'left-start': 'right-start',
    'left-end': 'right-end',
  };
  return opposite[placement];
}

function oppositeAlignment(placement: RainbowPlacement): RainbowPlacement {
  const opposite: Record<RainbowPlacement, RainbowPlacement> = {
    'bottom-start': 'bottom-end',
    'bottom-end': 'bottom-start',
    'top-start': 'top-end',
    'top-end': 'top-start',
    'right-start': 'right-end',
    'right-end': 'right-start',
    'left-start': 'left-end',
    'left-end': 'left-start',
  };
  return opposite[placement];
}

function getCoordinates(
  anchor: DOMRect,
  floatingWidth: number,
  floatingHeight: number,
  placement: RainbowPlacement,
  offset: number,
  direction: 'ltr' | 'rtl',
): Coordinates {
  const logicalStartOnRight = direction === 'rtl';

  if (placement.startsWith('bottom')) {
    return {
      x: placement.endsWith('start')
        ? logicalStartOnRight ? anchor.right - floatingWidth : anchor.left
        : logicalStartOnRight ? anchor.left : anchor.right - floatingWidth,
      y: anchor.bottom + offset,
    };
  }

  if (placement.startsWith('top')) {
    return {
      x: placement.endsWith('start')
        ? logicalStartOnRight ? anchor.right - floatingWidth : anchor.left
        : logicalStartOnRight ? anchor.left : anchor.right - floatingWidth,
      y: anchor.top - floatingHeight - offset,
    };
  }

  return {
    x: placement.startsWith('right') ? anchor.right + offset : anchor.left - floatingWidth - offset,
    y: placement.endsWith('start') ? anchor.top : anchor.bottom - floatingHeight,
  };
}

function overflowScore(
  point: Coordinates,
  width: number,
  height: number,
  viewportWidth: number,
  viewportHeight: number,
  padding: number,
): number {
  return (
    Math.max(0, padding - point.x) +
    Math.max(0, padding - point.y) +
    Math.max(0, point.x + width - (viewportWidth - padding)) +
    Math.max(0, point.y + height - (viewportHeight - padding))
  );
}

/**
 * Positions a floating element against an anchor (or pointer coordinate), preferring the requested
 * placement, flipping to the opposite side when space is constrained, and finally shifting inside
 * the viewport. Uses fixed positioning so document and scroll-container offsets are not mixed.
 */
export function positionRainbowFloatingElement(
  anchor: HTMLElement,
  floating: HTMLElement,
  options: RainbowPositionOptions = {},
): void {
  const placement = options.placement ?? 'bottom-start';
  const offset = Math.max(0, options.offset ?? 6);
  const padding = Math.max(0, options.viewportPadding ?? 8);
  const anchorRect = options.x !== undefined && options.y !== undefined
    ? new DOMRect(options.x, options.y, 0, 0)
    : anchor.getBoundingClientRect();
  const floatingRect = floating.getBoundingClientRect();
  const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
  const viewportHeight = document.documentElement.clientHeight || window.innerHeight;
  const requestedDirection = options.direction ?? 'auto';
  const direction = requestedDirection === 'auto'
    ? getComputedStyle(anchor).direction === 'rtl' ? 'rtl' : 'ltr'
    : requestedDirection;
  const candidates: RainbowPlacement[] = [
    placement,
    oppositeSide(placement),
    oppositeAlignment(placement),
    oppositeSide(oppositeAlignment(placement)),
  ];

  let best = getCoordinates(anchorRect, floatingRect.width, floatingRect.height, placement, offset, direction);
  let bestScore = overflowScore(best, floatingRect.width, floatingRect.height, viewportWidth, viewportHeight, padding);

  for (const candidate of candidates.slice(1)) {
    const point = getCoordinates(anchorRect, floatingRect.width, floatingRect.height, candidate, offset, direction);
    const score = overflowScore(point, floatingRect.width, floatingRect.height, viewportWidth, viewportHeight, padding);
    if (score < bestScore) {
      best = point;
      bestScore = score;
    }
    if (bestScore === 0) break;
  }

  const maxX = Math.max(padding, viewportWidth - floatingRect.width - padding);
  const maxY = Math.max(padding, viewportHeight - floatingRect.height - padding);
  const x = Math.max(padding, Math.min(best.x, maxX));
  const y = Math.max(padding, Math.min(best.y, maxY));

  floating.style.position = 'fixed';
  floating.style.inset = 'auto';
  floating.style.left = `${Math.round(x)}px`;
  floating.style.top = `${Math.round(y)}px`;
}

/** Repositions while viewport or scrolling changes. Call the returned cleanup when the panel closes. */
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
