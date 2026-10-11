import type { RainbowButton } from './components/button.js';
import type { RainbowCheckbox } from './components/checkbox.js';
import type { RainbowInput } from './components/input.js';
import type { RainbowSelect } from './components/select.js';
import type { RainbowTextarea } from './components/textarea.js';

declare global {
  interface HTMLElementTagNameMap {
    'rainbow-button': RainbowButton;
    'rainbow-checkbox': RainbowCheckbox;
    'rainbow-input': RainbowInput;
    'rainbow-select': RainbowSelect;
    'rainbow-textarea': RainbowTextarea;
  }

  interface GlobalEventHandlersEventMap {
    'rainbow-activate': CustomEvent<RainbowActivateDetail>;
    'rainbow-input': CustomEvent<RainbowValueDetail>;
    'rainbow-change': CustomEvent<RainbowValueDetail>;
  }
}

export interface RainbowActivateDetail {
  readonly originalEvent: MouseEvent;
  readonly type: 'button' | 'submit' | 'reset';
}

export interface RainbowValueDetail {
  readonly value: string;
}

export {};
