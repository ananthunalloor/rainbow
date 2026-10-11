import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/auto.js';

type AlertArgs = {
  variant: 'info' | 'success' | 'warning' | 'danger';
  dismissible: boolean;
  live: 'polite' | 'assertive' | 'off';
  title: string;
  message: string;
};

const meta = {
  title: 'Components/Alert',
  tags: ['autodocs'],
  render: (args: AlertArgs) => html`
    <div style="display:grid;gap:1rem;max-width:44rem">
      <rainbow-alert variant=${args.variant} ?dismissible=${args.dismissible} live=${args.live}>
        <span slot="title">${args.title}</span>${args.message}
      </rainbow-alert>
      <p style="font-size:.875rem">Live region mode: ${args.live}. Dismissal fires <code>rainbow-dismiss</code>.</p>
    </div>
  `,
  argTypes: {
    variant: { control: 'inline-radio', options: ['info', 'success', 'warning', 'danger'] },
    dismissible: { control: 'boolean' },
    live: { control: 'inline-radio', options: ['polite', 'assertive', 'off'] },
    title: { control: 'text' },
    message: { control: 'text' },
  },
  args: { variant: 'info', dismissible: true, live: 'polite', title: 'Heads up', message: 'This message can be customized from the Storybook controls.' },
} satisfies Meta<AlertArgs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};

export const Variants: Story = {
  render: () => html`
    <div style="display:grid;gap:1rem;max-width:44rem">
      <rainbow-alert variant="info"><span slot="title">Information</span>Additional context for the current task.</rainbow-alert>
      <rainbow-alert variant="success"><span slot="title">Success</span>The operation completed successfully.</rainbow-alert>
      <rainbow-alert variant="warning" dismissible><span slot="title">Warning</span>Review these settings before continuing.</rainbow-alert>
      <rainbow-alert variant="danger" live="assertive"><span slot="title">Error</span>The operation could not be completed.</rainbow-alert>
    </div>
  `,
};
