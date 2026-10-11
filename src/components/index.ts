import { defineRainbowButton, RainbowButton } from './button.js';
import { defineRainbowCheckbox, RainbowCheckbox } from './checkbox.js';
import { defineRainbowInput, RainbowInput } from './input.js';
import { defineRainbowSelect, RainbowSelect } from './select.js';
import { defineRainbowTextarea, RainbowTextarea } from './textarea.js';

export { RainbowButton, defineRainbowButton } from './button.js';
export type { RainbowButtonSize, RainbowButtonType, RainbowButtonVariant } from './button.js';
export { RainbowCheckbox, defineRainbowCheckbox } from './checkbox.js';
export { RainbowInput, defineRainbowInput } from './input.js';
export { RainbowSelect, defineRainbowSelect } from './select.js';
export { RainbowTextarea, defineRainbowTextarea } from './textarea.js';

export function defineRainbowComponents(): void {
  defineRainbowButton();
  defineRainbowCheckbox();
  defineRainbowInput();
  defineRainbowSelect();
  defineRainbowTextarea();
}
