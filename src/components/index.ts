import { defineRainbowButton, RainbowButton } from './button.js';
import { defineRainbowCheckbox, RainbowCheckbox } from './checkbox.js';
import { defineRainbowDialog, RainbowDialog } from './dialog.js';
import { defineRainbowField, RainbowField } from './field.js';
import { defineRainbowForm, RainbowForm } from './form.js';
import { defineRainbowInput, RainbowInput } from './input.js';
import { defineRainbowPopover, RainbowPopover } from './popover.js';
import { defineRainbowRadio, RainbowRadio } from './radio.js';
import { defineRainbowRadioGroup, RainbowRadioGroup } from './radio-group.js';
import { defineRainbowSelect, RainbowSelect } from './select.js';
import { defineRainbowSwitch, RainbowSwitch } from './switch.js';
import { defineRainbowTextarea, RainbowTextarea } from './textarea.js';

export { RainbowButton, defineRainbowButton } from './button.js';
export type { RainbowButtonSize, RainbowButtonType, RainbowButtonVariant } from './button.js';
export { RainbowCheckbox, defineRainbowCheckbox } from './checkbox.js';
export { RainbowDialog, defineRainbowDialog } from './dialog.js';
export { RainbowField, defineRainbowField } from './field.js';
export { RainbowForm, defineRainbowForm } from './form.js';
export { RainbowInput, defineRainbowInput } from './input.js';
export { RainbowPopover, defineRainbowPopover } from './popover.js';
export { RainbowRadio, defineRainbowRadio } from './radio.js';
export { RainbowRadioGroup, defineRainbowRadioGroup } from './radio-group.js';
export { RainbowSelect, defineRainbowSelect } from './select.js';
export { RainbowSwitch, defineRainbowSwitch } from './switch.js';
export { RainbowTextarea, defineRainbowTextarea } from './textarea.js';

export function defineRainbowComponents(): void {
  defineRainbowButton(); defineRainbowCheckbox(); defineRainbowDialog(); defineRainbowField(); defineRainbowForm();
  defineRainbowInput(); defineRainbowPopover(); defineRainbowRadio(); defineRainbowRadioGroup(); defineRainbowSelect();
  defineRainbowSwitch(); defineRainbowTextarea();
}
