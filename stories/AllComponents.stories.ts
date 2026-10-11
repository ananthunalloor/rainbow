import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';


const meta = {
  title: 'Rainbow / All Components',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A live catalogue of every currently implemented Rainbow element. Use the component stories in the sidebar for property controls and isolated examples.',
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
  render: () => {
    const tags = [
      'rainbow-accordion', 'rainbow-alert', 'rainbow-button', 'rainbow-checkbox', 'rainbow-context-menu', 'rainbow-dialog',
      'rainbow-dropdown', 'rainbow-field', 'rainbow-form', 'rainbow-input', 'rainbow-menu',
      'rainbow-popover', 'rainbow-radio', 'rainbow-radio-group', 'rainbow-select',
      'rainbow-switch', 'rainbow-tabs', 'rainbow-textarea', 'rainbow-tooltip',
    ];
    const missing = tags.filter((tag) => !customElements.get(tag));
    return html`
    <section style="display:grid;gap:2rem;max-width:64rem;color:var(--rainbow-color-text)">
      <header>
        <h1 style="margin:0">Rainbow component gallery</h1>
        <p>Live component examples. Switch Light/Dark/System using the Storybook toolbar.</p>
        <p role="status" style="padding:.5rem .75rem;border:1px solid var(--rainbow-color-border);border-radius:.5rem">
          ${missing.length === 0
            ? `All ${tags.length} custom elements are registered.`
            : `Missing registrations: ${missing.join(', ')}. Check the browser console and Storybook preview entrypoint.`}
        </p>
      </header>

      <article style="display:grid;gap:1rem">
        <h2>Buttons</h2>
        <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:center">
          <rainbow-button>Primary</rainbow-button>
          <rainbow-button variant="secondary">Secondary</rainbow-button>
          <rainbow-button variant="ghost">Ghost</rainbow-button>
          <rainbow-button variant="danger">Danger</rainbow-button>
          <rainbow-button size="small">Small</rainbow-button>
          <rainbow-button size="large">Large</rainbow-button>
          <rainbow-button disabled>Disabled</rainbow-button>
        </div>
      </article>

      <article style="display:grid;gap:1rem;max-width:36rem">
        <h2>Form controls</h2>
        <rainbow-input label="Name" name="name" placeholder="Jane Doe" description="Your display name."></rainbow-input>
        <rainbow-input label="Email" name="email" type="email" placeholder="you@example.com" required></rainbow-input>
        <rainbow-textarea label="Message" name="message" rows="3" placeholder="Write something..."></rainbow-textarea>
        <rainbow-select label="Framework" name="framework">
          <option value="">Choose a framework</option>
          <option value="react">React</option>
          <option value="vue">Vue</option>
          <option value="django">Django + HTMX</option>
        </rainbow-select>
        <rainbow-checkbox label="Subscribe to updates" name="updates" value="yes"></rainbow-checkbox>
        <rainbow-switch label="Enable notifications" name="notifications" value="yes"></rainbow-switch>
        <rainbow-radio-group label="Preferred theme" name="theme-choice" value="system" orientation="horizontal">
          <rainbow-radio value="light" label="Light"></rainbow-radio>
          <rainbow-radio value="dark" label="Dark"></rainbow-radio>
          <rainbow-radio value="system" label="System"></rainbow-radio>
        </rainbow-radio-group>
        <rainbow-field label="Account" description="A reusable field wrapper.">
          <rainbow-input name="account" placeholder="account@example.com"></rainbow-input>
        </rainbow-field>
        <rainbow-form>
          <rainbow-button type="submit">Submit form</rainbow-button>
        </rainbow-form>
      </article>

      <article style="display:grid;gap:1rem;max-width:42rem">
        <h2>Tabs and disclosure</h2>
        <rainbow-tabs label="Example sections">
          <button slot="tab">Overview</button>
          <button slot="tab">Details</button>
          <button slot="tab">Accessibility</button>
          <section slot="panel"><p>Rainbow tabs use slotted light-DOM buttons and panels.</p></section>
          <section slot="panel"><p>Use Arrow keys, Home, and End to move between tabs.</p></section>
          <section slot="panel"><p>ARIA relationships and panel visibility are managed by the component.</p></section>
        </rainbow-tabs>
        <rainbow-accordion>
          <details open><summary>Native disclosure</summary><p>Built on details and summary for robust keyboard support.</p></details>
          <details><summary>Single-open behavior</summary><p>By default, opening one item closes the previously open item. Add allow-multiple to permit multiple open sections.</p></details>
        </rainbow-accordion>
      </article>

      <article style="display:grid;gap:1rem;max-width:42rem">
        <h2>Alerts and status messages</h2>
        <rainbow-alert variant="info" live="polite"><span slot="title">Information</span>Changes are saved automatically.</rainbow-alert>
        <rainbow-alert variant="success" live="polite"><span slot="title">Success</span>Your settings have been updated.</rainbow-alert>
        <rainbow-alert variant="warning" live="polite" dismissible><span slot="title">Attention</span>Some settings need review.</rainbow-alert>
        <rainbow-alert variant="danger" live="assertive"><span slot="title">Error</span>Your request could not be completed.</rainbow-alert>
      </article>

      <article style="display:grid;gap:1rem;align-items:start">
        <h2>Overlays and interactions</h2>
        <p>Overlays that are normally closed include a trigger below; dialogs are intentionally hidden until opened.</p>
        <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:flex-start">
          <rainbow-popover label="Open popover"><p style="margin:0">Popover content is visible when opened.</p></rainbow-popover>
          <rainbow-menu label="Actions"><button role="menuitem">Edit</button><button role="menuitem">Delete</button></rainbow-menu>
          <rainbow-dropdown label="Dropdown actions"><button role="menuitem">Rename</button><button role="menuitem">Archive</button></rainbow-dropdown>
          <rainbow-tooltip content="Tooltip text"><button>Hover or focus</button></rainbow-tooltip>
          <rainbow-button @click=${(event: Event) => {
            const section = (event.currentTarget as HTMLElement).closest('section');
            const dialog = section?.querySelector('rainbow-dialog') as (HTMLElement & { show: () => void }) | null;
            dialog?.show();
          }}>Open dialog</rainbow-button>
        </div>
        <rainbow-context-menu style="padding:1rem;border:1px dashed var(--rainbow-color-border);border-radius:.5rem">
          <span>Right-click this area for context actions.</span>
          <button slot="item" role="menuitem">Copy</button>
          <button slot="item" role="menuitem">Inspect</button>
        </rainbow-context-menu>
        <rainbow-dialog label="Rainbow dialog">
          <p>This native dialog is rendered after clicking Open dialog.</p>
          <rainbow-button @click=${(event: Event) => {
            const dialog = (event.currentTarget as HTMLElement).closest('rainbow-dialog') as (HTMLElement & { close: () => void }) | null;
            dialog?.close();
          }}>Close dialog</rainbow-button>
        </rainbow-dialog>
      </article>
    </section>
  `;
  },
};
