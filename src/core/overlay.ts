export type RainbowOverlayKind = 'dialog' | 'popover' | 'menu' | 'tooltip';

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

interface OverlayRegistration {
  controller: RainbowOverlayController;
  kind: RainbowOverlayKind;
}

class RainbowOverlayManager {
  private readonly stack: OverlayRegistration[] = [];
  private listening = false;

  private readonly keydown = (event: KeyboardEvent): void => {
    this.top?.controller.handleKeydown(event);
  };

  private readonly pointerdown = (event: PointerEvent): void => {
    this.top?.controller.handlePointerdown(event);
  };

  register(controller: RainbowOverlayController, kind: RainbowOverlayKind): void {
    this.unregister(controller);
    this.stack.push({ controller, kind });
    this.startListening();
  }

  unregister(controller: RainbowOverlayController): void {
    const index = this.stack.findIndex((entry) => entry.controller === controller);
    if (index >= 0) this.stack.splice(index, 1);
    if (this.stack.length === 0) this.stopListening();
  }

  private startListening(): void {
    if (this.listening) return;
    this.listening = true;
    document.addEventListener('keydown', this.keydown, true);
    document.addEventListener('pointerdown', this.pointerdown, true);
  }

  private stopListening(): void {
    if (!this.listening) return;
    this.listening = false;
    document.removeEventListener('keydown', this.keydown, true);
    document.removeEventListener('pointerdown', this.pointerdown, true);
  }

  private get top(): OverlayRegistration | undefined {
    return this.stack.at(-1);
  }
}

const overlayManager = new RainbowOverlayManager();

export class RainbowOverlayController {
  private restoreTarget: HTMLElement | null = null;
  private active = false;

  constructor(
    private readonly host: HTMLElement,
    private readonly kind: RainbowOverlayKind = 'popover',
  ) {}

  onEscape?: (event: KeyboardEvent) => void;
  onOutside?: (event: PointerEvent) => void;

  activate(): void {
    if (this.active) return;
    this.active = true;
    this.restoreTarget = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    overlayManager.register(this, this.kind);
  }

  deactivate(restoreFocus = true): void {
    if (!this.active) return;
    this.active = false;
    overlayManager.unregister(this);
    if (restoreFocus) this.restoreTarget?.focus({ preventScroll: true });
    this.restoreTarget = null;
  }

  focusFirst(root: ParentNode): void {
    root.querySelector<HTMLElement>(FOCUSABLE)?.focus({ preventScroll: true });
  }

  focusables(root: ParentNode): HTMLElement[] {
    return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (element) => !element.hasAttribute('disabled') && !element.hidden,
    );
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.defaultPrevented) return;
    if (event.key === 'Escape') {
      this.onEscape?.(event);
    }
  }

  handlePointerdown(event: PointerEvent): void {
    if (event.composedPath().includes(this.host)) return;
    this.onOutside?.(event);
  }
}
