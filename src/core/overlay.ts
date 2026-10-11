export type RainbowOverlayKind = 'dialog' | 'popover' | 'menu' | 'tooltip';

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export class RainbowOverlayController {
  private restoreTarget: HTMLElement | null = null;
  private readonly keydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') this.onEscape?.(event);
  };
  private readonly pointerdown = (event: PointerEvent): void => {
    if (this.host && event.composedPath().includes(this.host)) return;
    this.onOutside?.(event);
  };

  constructor(private readonly host: HTMLElement) {}
  onEscape?: (event: KeyboardEvent) => void;
  onOutside?: (event: PointerEvent) => void;

  activate(): void {
    this.restoreTarget = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.addEventListener('keydown', this.keydown, true);
    document.addEventListener('pointerdown', this.pointerdown, true);
  }

  deactivate(restoreFocus = true): void {
    document.removeEventListener('keydown', this.keydown, true);
    document.removeEventListener('pointerdown', this.pointerdown, true);
    if (restoreFocus) this.restoreTarget?.focus({ preventScroll: true });
    this.restoreTarget = null;
  }

  focusFirst(root: ParentNode): void {
    root.querySelector<HTMLElement>(FOCUSABLE)?.focus({ preventScroll: true });
  }
}
