import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const componentTags = [
  'rainbow-accordion',
  'rainbow-alert',
  'rainbow-button',
  'rainbow-checkbox',
  'rainbow-context-menu',
  'rainbow-dialog',
  'rainbow-dropdown',
  'rainbow-field',
  'rainbow-form',
  'rainbow-input',
  'rainbow-menu',
  'rainbow-popover',
  'rainbow-radio',
  'rainbow-radio-group',
  'rainbow-select',
  'rainbow-switch',
  'rainbow-tabs',
  'rainbow-textarea',
  'rainbow-tooltip',
] as const;

const requiredThemeTokens = [
  '--rainbow-color-background',
  '--rainbow-color-primary',
  '--rainbow-color-text',
] as const;

const meta = {
  title: 'Rainbow / Diagnostics',
  parameters: {
    docs: {
      description: {
        component:
          'Runtime smoke check for custom-element registration and global theme token setup. Open this story first when a canvas appears blank or components are unstyled.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Runtime: Story = {
  render: () => {
    const missingTags = componentTags.filter((tag) => !customElements.get(tag));
    const styles = getComputedStyle(document.documentElement);
    const missingTokens = requiredThemeTokens.filter(
      (token) => !styles.getPropertyValue(token).trim(),
    );
    const healthy = missingTags.length === 0 && missingTokens.length === 0;

    return html`
      <section style="max-width: 48rem; display: grid; gap: 1rem; color: var(--rainbow-color-text)">
        <h1 style="margin: 0">Rainbow runtime diagnostics</h1>
        <p
          role="status"
          aria-live="polite"
          data-state=${healthy ? 'ok' : 'error'}
          style="padding: .75rem 1rem; border: 1px solid var(--rainbow-color-border); border-radius: .5rem"
        >
          ${healthy
            ? 'PASS — all 19 custom elements are registered and the core theme tokens are available.'
            : 'FAIL — Rainbow initialization is incomplete. Review the checks below.'}
        </p>

        <section>
          <h2>Custom element registration</h2>
          <ul>
            ${componentTags.map((tag) => {
              const registered = Boolean(customElements.get(tag));
              return html`<li>
                <code>${tag}</code> — ${registered ? 'registered' : 'MISSING'}
              </li>`;
            })}
          </ul>
        </section>

        <section>
          <h2>Theme variables</h2>
          <ul>
            ${requiredThemeTokens.map((token) => {
              const value = styles.getPropertyValue(token).trim();
              return html`<li>
                <code>${token}</code> — ${value || 'MISSING'}
              </li>`;
            })}
          </ul>
        </section>

        <section>
          <h2>Rendered component smoke test</h2>
          <rainbow-button>Primary action</rainbow-button>
          <p>If the component is registered, the action above should render with Rainbow button styling.</p>
        </section>

        ${missingTags.length || missingTokens.length
          ? html`<details open>
              <summary>Suggested checks</summary>
              <p>Inspect the first preview-console error, then check the Storybook preview initialization and class-field configuration.</p>
            </details>`
          : ''}
      </section>
    `;
  },
};
