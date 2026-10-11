import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../src/auto.js';

type TabsArgs = {
  label: string;
  orientation: 'horizontal' | 'vertical';
  activation: 'automatic' | 'manual';
  selectedIndex: number;
};

const tabsMeta = {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  render: (args: TabsArgs) => html`
    <div style="max-width:42rem">
      <rainbow-tabs label=${args.label} orientation=${args.orientation} activation=${args.activation} .selectedIndex=${args.selectedIndex}>
        <button slot="tab">Overview</button>
        <button slot="tab">API</button>
        <button slot="tab">Accessibility</button>
        <section slot="panel"><h3>Overview</h3><p>Framework-independent tabs using Custom Elements and light-DOM content.</p></section>
        <section slot="panel"><h3>API</h3><p>Configure label, orientation, activation, and selectedIndex as properties or attributes.</p></section>
        <section slot="panel"><h3>Accessibility</h3><p>Try Arrow keys, Home, and End. Manual activation requires Enter or Space to select the focused tab.</p></section>
      </rainbow-tabs>
    </div>
  `,
  argTypes: {
    label: { control: 'text' },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    activation: { control: 'inline-radio', options: ['automatic', 'manual'] },
    selectedIndex: { control: { type: 'number', min: 0, max: 2, step: 1 } },
  },
  args: { label: 'Documentation sections', orientation: 'horizontal', activation: 'automatic', selectedIndex: 0 },
} satisfies Meta<TabsArgs>;
export default tabsMeta;
type TabsStory = StoryObj<typeof tabsMeta>;
export const Playground: TabsStory = {};
