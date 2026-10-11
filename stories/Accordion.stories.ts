import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/auto.js';

type AccordionArgs = { allowMultiple: boolean };
const meta = {
  title: 'Components/Accordion',
  tags: ['autodocs'],
  render: (args: AccordionArgs) => html`
    <rainbow-accordion ?allow-multiple=${args.allowMultiple} style="max-width:42rem">
      <details open><summary>Native HTML foundation</summary><p>Accordion disclosure items use native details and summary elements.</p></details>
      <details><summary>Keyboard support</summary><p>Browsers provide expected keyboard behavior for summary disclosure controls.</p></details>
      <details><summary>Single or multiple open</summary><p>Change the Allow multiple control to change the group behavior.</p></details>
    </rainbow-accordion>
  `,
  argTypes: { allowMultiple: { control: 'boolean', name: 'Allow multiple open items' } },
  args: { allowMultiple: false },
  parameters: { docs: { description: { component: 'The accordion intentionally wraps native details/summary elements instead of reimplementing disclosure semantics.' } } },
} satisfies Meta<AccordionArgs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
