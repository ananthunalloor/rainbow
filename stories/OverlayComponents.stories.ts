import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/auto.js';

type OverlayArgs = { label: string; placement: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' };
const meta = {
  title: 'Components/Overlay controls',
  tags: ['autodocs'],
  render: (args: OverlayArgs) => html`
    <div style="display:grid;gap:2rem;align-items:start;min-height:18rem;max-width:48rem">
      <p>Use the dropdown and context-menu triggers to exercise open, keyboard, outside-click, and focus behavior.</p>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:flex-start">
        <rainbow-dropdown label=${args.label} placement=${args.placement}>
          <button role="menuitem">Rename</button>
          <button role="menuitem">Duplicate</button>
          <button role="menuitem">Archive</button>
        </rainbow-dropdown>
        <rainbow-popover label="Help"><p>This is a popover panel.</p></rainbow-popover>
        <rainbow-menu label="More actions"><button role="menuitem">Edit</button><button role="menuitem">Delete</button></rainbow-menu>
        <rainbow-tooltip content="Tooltip content"><button>Hover or focus</button></rainbow-tooltip>
        <rainbow-button @click=${(event: Event) => {
          const dialog = (event.currentTarget as HTMLElement).parentElement?.querySelector('rainbow-dialog') as (HTMLElement & { show: () => void }) | null;
          dialog?.show();
        }}>Open dialog</rainbow-button>
        <rainbow-dialog label="Dialog example"><p>Dialog content.</p><rainbow-button @click=${(event: Event) => {
          const dialog = (event.currentTarget as HTMLElement).closest('rainbow-dialog') as (HTMLElement & { close: () => void }) | null;
          dialog?.close();
        }}>Close</rainbow-button></rainbow-dialog>
      </div>
      <rainbow-context-menu style="padding:1.5rem;border:1px dashed #94a3b8;border-radius:.5rem">
        Right-click inside this box to open its context menu.
        <button slot="item" role="menuitem">Copy</button>
        <button slot="item" role="menuitem">Inspect</button>
      </rainbow-context-menu>
    </div>
  `,
  argTypes: {
    label: { control: 'text', description: 'Accessible label and trigger text for the dropdown.' },
    placement: { control: 'select', options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'] },
  },
  args: { label: 'Dropdown actions', placement: 'bottom-start' },
} satisfies Meta<OverlayArgs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
