export const rainbowTokens = {
  color: {
    primary: 'var(--rainbow-color-primary)',
    primaryContrast: 'var(--rainbow-color-primary-contrast)',
    secondary: 'var(--rainbow-color-secondary)',
    secondaryContrast: 'var(--rainbow-color-secondary-contrast)',
    background: 'var(--rainbow-color-background)',
    surface: 'var(--rainbow-color-surface)',
    surfaceRaised: 'var(--rainbow-color-surface-raised)',
    text: 'var(--rainbow-color-text)',
    textMuted: 'var(--rainbow-color-text-muted)',
    border: 'var(--rainbow-color-border)',
    focusRing: 'var(--rainbow-color-focus-ring)',
    success: 'var(--rainbow-color-success)',
    warning: 'var(--rainbow-color-warning)',
    danger: 'var(--rainbow-color-danger)',
    dangerContrast: 'var(--rainbow-color-danger-contrast)',
    info: 'var(--rainbow-color-info)',
  },
  space: {
    xs: 'var(--rainbow-space-xs)',
    sm: 'var(--rainbow-space-sm)',
    md: 'var(--rainbow-space-md)',
    lg: 'var(--rainbow-space-lg)',
    xl: 'var(--rainbow-space-xl)',
  },
  radius: {
    sm: 'var(--rainbow-radius-sm)',
    md: 'var(--rainbow-radius-md)',
    lg: 'var(--rainbow-radius-lg)',
    pill: 'var(--rainbow-radius-pill)',
  },
  typography: {
    fontFamily: 'var(--rainbow-font-family)',
    fontSizeSm: 'var(--rainbow-font-size-sm)',
    fontSizeMd: 'var(--rainbow-font-size-md)',
    fontSizeLg: 'var(--rainbow-font-size-lg)',
    lineHeight: 'var(--rainbow-line-height)',
  },
  motion: {
    durationFast: 'var(--rainbow-motion-duration-fast)',
    durationNormal: 'var(--rainbow-motion-duration-normal)',
    easingStandard: 'var(--rainbow-motion-easing-standard)',
  },
} as const;

export type RainbowTokens = typeof rainbowTokens;
