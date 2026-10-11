import { defineRainbowButton, RainbowButton } from './button.js';
import { defineRainbowTabs, RainbowTabs } from './tabs.js';
import { defineRainbowAccordion, RainbowAccordion } from './accordion.js';
import { defineRainbowAlert, RainbowAlert } from './alert.js';
import { defineRainbowCheckbox, RainbowCheckbox } from './checkbox.js';
import { defineRainbowDialog, RainbowDialog } from './dialog.js';
import { defineRainbowField, RainbowField } from './field.js';
import { defineRainbowForm, RainbowForm } from './form.js';
import { defineRainbowInput, RainbowInput } from './input.js';
import { defineRainbowPopover, RainbowPopover } from './popover.js';
import { defineRainbowMenu, RainbowMenu } from './menu.js';
import { defineRainbowDropdown, RainbowDropdown } from './dropdown.js';
import { defineRainbowContextMenu, RainbowContextMenu } from './context-menu.js';
import { defineRainbowTooltip, RainbowTooltip } from './tooltip.js';
import { defineRainbowRadio, RainbowRadio } from './radio.js';
import { defineRainbowRadioGroup, RainbowRadioGroup } from './radio-group.js';
import { defineRainbowSelect, RainbowSelect } from './select.js';
import { defineRainbowSwitch, RainbowSwitch } from './switch.js';
import { defineRainbowTextarea, RainbowTextarea } from './textarea.js';

export { RainbowButton, defineRainbowButton } from './button.js';
export { RainbowTabs, defineRainbowTabs } from './tabs.js';
export type { RainbowTabsActivation, RainbowTabsOrientation } from './tabs.js';
export { RainbowAccordion, defineRainbowAccordion } from './accordion.js';
export { RainbowAlert, defineRainbowAlert } from './alert.js';
export type { RainbowAlertLive, RainbowAlertVariant } from './alert.js';
export type { RainbowButtonSize, RainbowButtonType, RainbowButtonVariant } from './button.js';
export { RainbowCheckbox, defineRainbowCheckbox } from './checkbox.js';
export { RainbowDialog, defineRainbowDialog } from './dialog.js';
export { RainbowField, defineRainbowField } from './field.js';
export { RainbowForm, defineRainbowForm } from './form.js';
export { RainbowInput, defineRainbowInput } from './input.js';
export { RainbowPopover, defineRainbowPopover } from './popover.js';
export { RainbowMenu, defineRainbowMenu } from './menu.js';
export { RainbowDropdown, defineRainbowDropdown } from './dropdown.js';
export { RainbowContextMenu, defineRainbowContextMenu } from './context-menu.js';
export { RainbowTooltip, defineRainbowTooltip } from './tooltip.js';
export { RainbowRadio, defineRainbowRadio } from './radio.js';
export { RainbowRadioGroup, defineRainbowRadioGroup } from './radio-group.js';
export { RainbowSelect, defineRainbowSelect } from './select.js';
export { RainbowSwitch, defineRainbowSwitch } from './switch.js';
export { RainbowTextarea, defineRainbowTextarea } from './textarea.js';

/** Map Rainbow custom-element tag names to their concrete public TypeScript APIs. */
declare global {
  interface HTMLElementTagNameMap {
    'rainbow-accordion': RainbowAccordion;
    'rainbow-alert': RainbowAlert;
    'rainbow-button': RainbowButton;
    'rainbow-checkbox': RainbowCheckbox;
    'rainbow-context-menu': RainbowContextMenu;
    'rainbow-dialog': RainbowDialog;
    'rainbow-dropdown': RainbowDropdown;
    'rainbow-field': RainbowField;
    'rainbow-form': RainbowForm;
    'rainbow-input': RainbowInput;
    'rainbow-menu': RainbowMenu;
    'rainbow-popover': RainbowPopover;
    'rainbow-radio': RainbowRadio;
    'rainbow-radio-group': RainbowRadioGroup;
    'rainbow-select': RainbowSelect;
    'rainbow-switch': RainbowSwitch;
    'rainbow-tabs': RainbowTabs;
    'rainbow-textarea': RainbowTextarea;
    'rainbow-tooltip': RainbowTooltip;
  }
}

export function defineRainbowComponents(): void {
  defineRainbowButton(); defineRainbowTabs(); defineRainbowAccordion(); defineRainbowAlert(); defineRainbowCheckbox(); defineRainbowDialog(); defineRainbowField(); defineRainbowForm();
  defineRainbowInput(); defineRainbowPopover(); defineRainbowMenu(); defineRainbowDropdown(); defineRainbowContextMenu(); defineRainbowRadio(); defineRainbowRadioGroup(); defineRainbowSelect();
  defineRainbowSwitch(); defineRainbowTextarea(); defineRainbowTooltip();
}
