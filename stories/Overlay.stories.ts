import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta = { title: 'Overlays/Workshop', render: () => html`
  <div style="display:flex;gap:1rem;align-items:flex-start;min-height:16rem">
    <rainbow-popover label="Open popover"><p>Popover content</p></rainbow-popover>
    <rainbow-menu label="Actions">
      <button role="menuitem">Edit</button><button role="menuitem">Delete</button>
    </rainbow-menu>
    <rainbow-tooltip content="Rainbow tooltip"><button>Hover or focus</button></rainbow-tooltip>
    <rainbow-button @click=${() => document.querySelector('rainbow-dialog')?.show()}>Open dialog</rainbow-button>
    <rainbow-dialog label="Rainbow dialog"><p>Dialog content with native focus and Escape behavior.</p></rainbow-dialog>
  </div>`, tags: ['autodocs'] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
