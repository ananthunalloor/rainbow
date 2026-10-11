import { html, css } from 'lit';
import { RainbowElement } from '../core/rainbow-element.js';
import { RainbowOverlayController } from '../core/overlay.js';

export class RainbowPopover extends RainbowElement {
  static override properties = { open: { type: Boolean, reflect: true }, label: { reflect: true } };
  static override styles = css`:host{position:relative;display:inline-block;color:var(--rainbow-color-text,#0f172a)}button{font:inherit}.panel{position:absolute;z-index:1000;inset-block-start:calc(100% + .5rem);inset-inline-start:0;min-inline-size:12rem;padding:.75rem;border:1px solid var(--rainbow-color-border,#cbd5e1);border-radius:var(--rainbow-radius-md,.5rem);background:var(--rainbow-color-surface,#fff);box-shadow:var(--rainbow-shadow-md)}`;
  open=false; label='Open';
  private controller = new RainbowOverlayController(this);
  connectedCallback(): void { super.connectedCallback(); this.controller.onEscape = () => this.hide(); this.controller.onOutside = () => this.hide(); }
  disconnectedCallback(): void { this.controller.deactivate(false); super.disconnectedCallback(); }
  protected override render(){return html`<button part="trigger" aria-haspopup="dialog" aria-expanded=${this.open?'true':'false'} @click=${this.toggle}><slot name="trigger">${this.label}</slot></button>${this.open?html`<div class="panel" role="dialog"><slot></slot></div>`:''}`;}
  show():void{if(this.open)return;this.open=true;this.controller.activate();this.dispatchRainbowEvent('rainbow-open');}
  hide():void{if(!this.open)return;this.open=false;this.controller.deactivate();this.dispatchRainbowEvent('rainbow-close');}
  private toggle=():void=>{this.open?this.hide():this.show();};
}
export function defineRainbowPopover():void{if(!customElements.get('rainbow-popover'))customElements.define('rainbow-popover',RainbowPopover);}
