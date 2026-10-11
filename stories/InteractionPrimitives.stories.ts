import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/auto.js';

const meta = { title: 'Rainbow / Interaction Primitives', tags: ['autodocs'] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => html`
    <div style="display:grid;gap:2rem;max-width:48rem">
      <rainbow-field label="Account" description="Fields can compose Rainbow controls.">
        <rainbow-input name="account" placeholder="account@example.com"></rainbow-input>
      </rainbow-field>
      <rainbow-switch label="Enable notifications"></rainbow-switch>
      <rainbow-radio-group label="Theme" value="system" orientation="horizontal">
        <rainbow-radio value="light" label="Light"></rainbow-radio>
        <rainbow-radio value="dark" label="Dark"></rainbow-radio>
        <rainbow-radio value="system" label="System"></rainbow-radio>
      </rainbow-radio-group>
      <div style="display:flex;gap:1rem;flex-wrap:wrap">
        <rainbow-button @click=${(event: Event) => (event.currentTarget as HTMLElement).parentElement?.querySelector<HTMLElement>('rainbow-dialog') && (event.currentTarget as HTMLElement).parentElement?.querySelector<{show:()=>void}>('rainbow-dialog')?.show()}>Open dialog</rainbow-button>
        <rainbow-dialog label="Rainbow dialog">
          <p>Dialog content lives in the component's accessible surface.</p>
          <rainbow-button @click=${(event: Event) => ((event.currentTarget as HTMLElement).closest('rainbow-dialog') as unknown as { close: () => void } | null)?.close()}>Close</rainbow-button>
        </rainbow-dialog>
        <rainbow-popover label="More actions"><p>Popover content.</p></rainbow-popover>
      </div>
    </div>
  `,
};
