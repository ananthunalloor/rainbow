import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '../src/components/button.js';

type ButtonArgs = {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  size: 'small' | 'medium' | 'large';
  type: 'button' | 'submit' | 'reset';
  disabled: boolean;
  label: string;
};

const meta = {
  title: 'Components/Button',
  tags: ['autodocs'],
  render: (args: ButtonArgs) => html`<rainbow-button variant=${args.variant} size=${args.size} type=${args.type} ?disabled=${args.disabled}>${args.label}</rainbow-button>`,
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: { variant: 'primary', size: 'medium', type: 'button', disabled: false, label: 'Rainbow button' },
} satisfies Meta<ButtonArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Variants: Story = {
  render: () => html`<div style="display:flex;gap:1rem;flex-wrap:wrap"><rainbow-button>Primary</rainbow-button><rainbow-button variant="secondary">Secondary</rainbow-button><rainbow-button variant="ghost">Ghost</rainbow-button><rainbow-button variant="danger">Danger</rainbow-button></div>`,
};
