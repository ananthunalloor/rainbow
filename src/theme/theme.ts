export type RainbowThemeMode = 'light' | 'dark' | 'system';

export const RAINBOW_THEME_ATTRIBUTE = 'data-rainbow-theme';
export const RAINBOW_THEME_STYLE_ID = 'rainbow-theme-styles';

export const RAINBOW_THEME_CSS = `
:root {
  --rainbow-color-violet-500: #8b5cf6;
  --rainbow-color-violet-600: #7c3aed;
  --rainbow-color-violet-700: #6d28d9;
  --rainbow-color-violet-800: #5b21b6;
  --rainbow-color-sky-600: #0284c7;
  --rainbow-color-sky-700: #0369a1;
  --rainbow-color-sky-800: #075985;
  --rainbow-color-slate-50: #f8fafc;
  --rainbow-color-slate-300: #cbd5e1;
  --rainbow-color-slate-400: #94a3b8;
  --rainbow-color-slate-600: #475569;
  --rainbow-color-slate-950: #020617;
  --rainbow-color-emerald-600: #059669;
  --rainbow-color-amber-600: #d97706;
  --rainbow-color-red-600: #dc2626;
}

:root,
[data-rainbow-theme='light'] {
  color-scheme: light;

  --rainbow-color-primary: var(--rainbow-color-violet-600);
  --rainbow-color-primary-hover: var(--rainbow-color-violet-700);
  --rainbow-color-primary-active: var(--rainbow-color-violet-800);
  --rainbow-color-primary-contrast: #ffffff;
  --rainbow-color-secondary: var(--rainbow-color-sky-600);
  --rainbow-color-secondary-hover: var(--rainbow-color-sky-700);
  --rainbow-color-secondary-active: var(--rainbow-color-sky-800);
  --rainbow-color-secondary-contrast: #ffffff;
  --rainbow-color-background: var(--rainbow-color-slate-50);
  --rainbow-color-surface: #ffffff;
  --rainbow-color-surface-raised: #ffffff;
  --rainbow-color-text: var(--rainbow-color-slate-950);
  --rainbow-color-text-muted: var(--rainbow-color-slate-600);
  --rainbow-color-border: var(--rainbow-color-slate-300);
  --rainbow-color-border-strong: var(--rainbow-color-slate-400);
  --rainbow-color-focus-ring: var(--rainbow-color-violet-600);
  --rainbow-color-success: var(--rainbow-color-emerald-600);
  --rainbow-color-warning: var(--rainbow-color-amber-600);
  --rainbow-color-danger: var(--rainbow-color-red-600);
  --rainbow-color-danger-contrast: #ffffff;
  --rainbow-color-info: var(--rainbow-color-sky-600);

  --rainbow-space-xs: 0.25rem;
  --rainbow-space-sm: 0.5rem;
  --rainbow-space-md: 0.75rem;
  --rainbow-space-lg: 1rem;
  --rainbow-space-xl: 1.5rem;

  --rainbow-radius-sm: 0.375rem;
  --rainbow-radius-md: 0.5rem;
  --rainbow-radius-lg: 0.75rem;
  --rainbow-radius-pill: 9999px;

  --rainbow-font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --rainbow-font-size-sm: 0.875rem;
  --rainbow-font-size-md: 1rem;
  --rainbow-font-size-lg: 1.125rem;
  --rainbow-line-height: 1.5;

  --rainbow-motion-duration-fast: 120ms;
  --rainbow-motion-duration-normal: 180ms;
  --rainbow-motion-easing-standard: cubic-bezier(0.2, 0, 0, 1);

  --rainbow-shadow-sm: 0 1px 2px rgb(15 23 42 / 0.08);
  --rainbow-shadow-md: 0 8px 24px rgb(15 23 42 / 0.12);
}

[data-rainbow-theme='dark'] {
  color-scheme: dark;
  --rainbow-color-primary: #a78bfa;
  --rainbow-color-primary-hover: #c4b5fd;
  --rainbow-color-primary-active: #8b5cf6;
  --rainbow-color-primary-contrast: #1e1b4b;
  --rainbow-color-secondary: #38bdf8;
  --rainbow-color-secondary-hover: #7dd3fc;
  --rainbow-color-secondary-active: #0ea5e9;
  --rainbow-color-secondary-contrast: #082f49;
  --rainbow-color-background: #020617;
  --rainbow-color-surface: #0f172a;
  --rainbow-color-surface-raised: #1e293b;
  --rainbow-color-text: #f8fafc;
  --rainbow-color-text-muted: #cbd5e1;
  --rainbow-color-border: #334155;
  --rainbow-color-border-strong: #475569;
  --rainbow-color-focus-ring: #c4b5fd;
  --rainbow-color-success: #34d399;
  --rainbow-color-warning: #fbbf24;
  --rainbow-color-danger: #fb7185;
  --rainbow-color-danger-contrast: #1f2937;
  --rainbow-color-info: #38bdf8;
  --rainbow-shadow-sm: 0 1px 2px rgb(0 0 0 / 0.25);
  --rainbow-shadow-md: 0 8px 24px rgb(0 0 0 / 0.32);
}

[data-rainbow-theme='system'] {
  color-scheme: light dark;
}

@media (prefers-color-scheme: dark) {
  [data-rainbow-theme='system'] {
    --rainbow-color-primary: #a78bfa;
    --rainbow-color-primary-hover: #c4b5fd;
    --rainbow-color-primary-active: #8b5cf6;
    --rainbow-color-primary-contrast: #1e1b4b;
    --rainbow-color-secondary: #38bdf8;
    --rainbow-color-secondary-hover: #7dd3fc;
    --rainbow-color-secondary-active: #0ea5e9;
    --rainbow-color-secondary-contrast: #082f49;
    --rainbow-color-background: #020617;
    --rainbow-color-surface: #0f172a;
    --rainbow-color-surface-raised: #1e293b;
    --rainbow-color-text: #f8fafc;
    --rainbow-color-text-muted: #cbd5e1;
    --rainbow-color-border: #334155;
    --rainbow-color-border-strong: #475569;
    --rainbow-color-focus-ring: #c4b5fd;
    --rainbow-color-success: #34d399;
    --rainbow-color-warning: #fbbf24;
    --rainbow-color-danger: #fb7185;
    --rainbow-color-danger-contrast: #1f2937;
    --rainbow-color-info: #38bdf8;
    --rainbow-shadow-sm: 0 1px 2px rgb(0 0 0 / 0.25);
    --rainbow-shadow-md: 0 8px 24px rgb(0 0 0 / 0.32);
  }
}


@media (prefers-reduced-motion: reduce) {
  :root,
  [data-rainbow-theme] {
    --rainbow-motion-duration-fast: 0ms;
    --rainbow-motion-duration-normal: 0ms;
  }
}

@media (forced-colors: active) {
  :root,
  [data-rainbow-theme] {
    --rainbow-color-focus-ring: Highlight;
    --rainbow-color-border: CanvasText;
  }
}
`;

export function setRainbowTheme(
  mode: RainbowThemeMode,
  target: HTMLElement = document.documentElement,
): void {
  target.setAttribute(RAINBOW_THEME_ATTRIBUTE, mode);
}

export function installRainbowTheme(
  documentRef: Document = document,
  mode: RainbowThemeMode = 'system',
): HTMLStyleElement {
  const existing = documentRef.getElementById(RAINBOW_THEME_STYLE_ID);
  const style = existing instanceof HTMLStyleElement ? existing : documentRef.createElement('style');

  style.id = RAINBOW_THEME_STYLE_ID;
  style.textContent = RAINBOW_THEME_CSS;

  if (!existing) {
    documentRef.head.append(style);
  }

  setRainbowTheme(mode, documentRef.documentElement);
  return style;
}
