// Adamjee Life V1.0 — Design Tokens (JS constants)
export const T = {
  primaryNavy:    '#0f4c7a',
  stateBlue:      '#1b75bb',
  darkSurface1:   '#0b2b3d',
  darkSurface2:   '#0f3a52',
  goldAccent:     '#cd924e',
  commitGreen:    '#00a651',
  pageCanvas:     '#f4f8fb',
  cardSurface:    '#ffffff',
  error:          '#b42318',
  errorBg:        '#fef2f0',

  textPrimary:    '#1a2533',
  textSecondary:  '#4a5568',
  textMuted:      '#718096',
  borderDefault:  '#c5cad0',
  borderLight:    '#e2e8f0',

  // Status chip colors
  status: {
    inReview:   { bg: '#eff6ff', text: '#1b75bb', border: '#bfdbfe' },
    approved:   { bg: '#f0fdf4', text: '#00a651', border: '#bbf7d0' },
    actionReq:  { bg: '#fff7ed', text: '#cd924e', border: '#fed7aa' },
    rejected:   { bg: '#fef2f0', text: '#b42318', border: '#fecaca' },
    pending:    { bg: '#faf5ff', text: '#7c3aed', border: '#ddd6fe' },
    processing: { bg: '#f0f9ff', text: '#0369a1', border: '#bae6fd' },
  },

  // Risk badge colors
  risk: {
    low:    { bg: '#f0fdf4', text: '#00a651', border: '#bbf7d0' },
    medium: { bg: '#fff7ed', text: '#cd924e', border: '#fed7aa' },
    high:   { bg: '#fef2f0', text: '#b42318', border: '#fecaca' },
  },
};

export default T;
