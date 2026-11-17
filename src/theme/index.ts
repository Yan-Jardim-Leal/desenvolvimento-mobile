export const colors = {
  brandDark: '#134A27',
  primary: '#1F6B3A',
  successSurface: '#E6F4EA',
  background: '#F5F3EC',
  card: '#FFFFFF',
  border: '#E4E1D6',
  earthSurface: '#EFE6D8',
  earth: '#8A6A45',
  text: '#17261C',
  muted: '#6C7A70',
  warning: '#B7791F',
  warningSurface: '#FDF1DC',
  info: '#2F6DB5',
  infoSurface: '#E3EEFB',
  danger: '#C0392B',
  white: '#FFFFFF',
  scanner: '#0F1A13',
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };

export const radius = { sm: 8, md: 12, lg: 16, pill: 999 };

export const fontSize = { xs: 11, sm: 13, md: 15, lg: 18, xl: 24, xxl: 30 };

export type Tone = 'success' | 'warning' | 'info' | 'neutral' | 'earth';

export const tones: Record<Tone, { background: string; foreground: string }> = {
  success: { background: colors.successSurface, foreground: colors.primary },
  warning: { background: colors.warningSurface, foreground: colors.warning },
  info: { background: colors.infoSurface, foreground: colors.info },
  neutral: { background: colors.background, foreground: colors.muted },
  earth: { background: colors.earthSurface, foreground: colors.earth },
};
