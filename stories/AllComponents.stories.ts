import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '../src/auto.js';

const meta = { title: 'Rainbow / All Components', tags: ['autodocs'] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
  render: () => html`
    <section style="display:grid;gap:2rem;max-width:64rem">
      <header><h1 style="margin:0">Rainbow component gallery</h1><p>Every currently implemented component, with real controls and form behavior.</p></header>
      <article><h2>Buttons</h2><div style="display:flex;gap:1rem;flex-wrap:wrap"><rainbow-button>Primary</rainbow-button><rainbow-button variant="secondary">Secondary</rainbow-button><rainbow-button variant="ghost">Ghost</rainbow-button><rainbow-button variant="danger">Danger</rainbow-button></div></article>
      <article style="display:grid;gap:1rem;max-width:36rem"><h2>Forms</h2><rainbow-input label="Name" placeholder="Jane Doe"></rainbow-input><rainbow-textarea label="Message" placeholder="Write something..."></rainbow-textarea><rainbow-select label="Framework"><option value="react">React</option><option value="vue">Vue</option><option value="django">Django + HTMX</option></rainbow-select><rainbow-checkbox label="Subscribe to updates"></rainbow-checkbox></article>
      <article><h2>Interaction primitives</h2><div style="display:grid;gap:1rem;max-width:36rem">
        <rainbow-switch label="Enable notifications"></rainbow-switch>
        <rainbow-radio-group label="Theme" value="system" orientation="horizontal">
          <rainbow-radio value="light" label="Light"></rainbow-radio>
          <rainbow-radio value="dark" label="Dark"></rainbow-radio>
          <rainbow-radio value="system" label="System"></rainbow-radio>
        </rainbow-radio-group>
        <rainbow-field label="Account" description="A reusable field wrapper."><rainbow-input name="account"></rainbow-input></rainbow-field>
        <rainbow-popover label="Open popover"><p>Popover content.</p></rainbow-popover>
      </div></article>
    </section>
  `,
};
