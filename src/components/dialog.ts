import { css, html } from 'lit';
import { RainbowElement } from '../core/rainbow-element.js';
import { RainbowOverlayController } from '../core/overlay.js';

export class RainbowDialog extends RainbowElement {
  static override properties = { open: { type: Boolean, reflect: true }, modal: { type: Boolean, reflect: true }, label: { reflect: true } };
  static override styles = css`:host{display:contents}dialog{border:0;border-radius:var(--rainbow-radius-lg,.75rem);padding:0;max-inline-size:min(90vw,40rem);inline-size:100%;background:var(--rainbow-color-surface,#fff);color:var(--rainbow-color-text,#0f172a);box-shadow:var(--rainbow-shadow-md,0 8px 24px rgb(15 23 42/.12))}dialog::backdrop{background:rgb(2 6 23/.55)}.surface{padding:1.25rem}.title{font-size:1.25rem;font-weight:700;margin:0 0 .75rem}`;
  open = false; modal = true; label = '';
  private controller = new RainbowOverlayController(this);
  connectedCallback(): void { super.connectedCallback(); this.controller.onEscape = () => this.close(); }
  disconnectedCallback(): void { this.controller.deactivate(false); super.disconnectedCallback(); }
  protected override render() { return html`<dialog aria-label=${this.label || undefined} @close=${this.onClose} @cancel=${this.onCancel}><div class="surface"><h2 class="title">${this.label}</h2><slot></slot></div></dialog>`; }
  show(): void { const dialog=this.shadowRoot?.querySelector('dialog'); if (!dialog || this.open) return; this.controller.activate(); this.modal ? dialog.showModal() : dialog.show(); this.open=true; queueMicrotask(() => this.controller.focusFirst(dialog)); this.dispatchRainbowEvent('rainbow-open'); }
  close(returnValue=''): void { const dialog=this.shadowRoot?.querySelector('dialog'); if (!dialog || !this.open) return; dialog.close(returnValue); }
  private onClose = (): void => { this.open=false; this.controller.deactivate(); this.dispatchRainbowEvent('rainbow-close'); };
  private onCancel = (event: Event): void => { if (!this.dispatchRainbowEvent('rainbow-cancel', undefined, {cancelable:true})) event.preventDefault(); };
}
export function defineRainbowDialog(): void { if (!customElements.get('rainbow-dialog')) customElements.define('rainbow-dialog', RainbowDialog); }
