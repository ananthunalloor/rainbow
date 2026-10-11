import { LitElement } from 'lit';

export type RainbowEventDetail = Record<string, unknown> | undefined;

/** Base class shared by Rainbow custom elements. */
export abstract class RainbowElement extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    mode: 'open',
    delegatesFocus: true,
  };

  protected dispatchRainbowEvent<T extends RainbowEventDetail>(
    type: string,
    detail?: T,
    options: Omit<CustomEventInit<T>, 'detail'> = {},
  ): boolean {
    return this.dispatchEvent(
      new CustomEvent(type, {
        bubbles: true,
        composed: true,
        cancelable: false,
        ...options,
        detail,
      }),
    );
  }

  protected get firstFocusableElement(): HTMLElement | null {
    return this.shadowRoot?.querySelector<HTMLElement>(
      'button, input, textarea, select, [href], [tabindex]:not([tabindex="-1"])',
    ) ?? null;
  }
}
