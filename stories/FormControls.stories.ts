import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import '../src/components/checkbox.js';
import '../src/components/input.js';
import '../src/components/select.js';
import '../src/components/textarea.js';

type InputArgs = { label: string; value: string; placeholder: string; required: boolean; disabled: boolean; error: string };
const inputMeta = {
  title: 'Components/Input', tags: ['autodocs'],
  render: (args: InputArgs) => html`<rainbow-input label=${args.label} .value=${args.value} placeholder=${args.placeholder} ?required=${args.required} ?disabled=${args.disabled} error=${args.error}></rainbow-input>`,
  argTypes: { label: { control: 'text' }, value: { control: 'text' }, placeholder: { control: 'text' }, required: { control: 'boolean' }, disabled: { control: 'boolean' }, error: { control: 'text' } },
  args: { label: 'Email', value: '', placeholder: 'you@example.com', required: true, disabled: false, error: '' },
} satisfies Meta<InputArgs>;
export default inputMeta;
type Story = StoryObj<typeof inputMeta>;
export const Playground: Story = {};

export const AllControls: Story = {
  name: 'Form controls',
  render: () => html`
    <form style="display:grid;gap:1.25rem;max-width:32rem" @submit=${(event: Event) => event.preventDefault()}>
      <rainbow-input name="email" label="Email" type="email" placeholder="you@example.com" required description="We'll never share your email."></rainbow-input>
      <rainbow-textarea name="message" label="Message" rows="5" placeholder="Tell us what you need..."></rainbow-textarea>
      <rainbow-select name="framework" label="Framework" required description="Choose your primary integration target.">
        <option value="">Choose one</option><option value="react">React</option><option value="vue">Vue</option><option value="svelte">Svelte</option><option value="django">Django + HTMX</option>
      </rainbow-select>
      <rainbow-checkbox name="terms" value="accepted" label="I agree to the terms" required description="Required before submitting."></rainbow-checkbox>
      <rainbow-button type="submit">Submit</rainbow-button>
    </form>
  `,
};
