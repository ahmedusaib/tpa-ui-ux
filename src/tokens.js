// Adamjee Life V1.0 — Design Tokens (JS constants)
// export const T = {
//   primaryNavy:    '#0f4c7a',
//   stateBlue:      '#1b75bb',
//   darkSurface1:   '#0b2b3d',
//   darkSurface2:   '#0f3a52',
//   goldAccent:     '#cd924e',
//   commitGreen:    '#00a651',
//   pageCanvas:     '#f4f8fb',
//   cardSurface:    '#ffffff',
//   error:          '#b42318',
//   errorBg:        '#fef2f0',

//   textPrimary:    '#1a2533',
//   textSecondary:  '#4a5568',
//   textMuted:      '#718096',
//   borderDefault:  '#c5cad0',
//   borderLight:    '#e2e8f0',

//   // Status chip colors
//   status: {
//     inReview:   { bg: '#eff6ff', text: '#1b75bb', border: '#bfdbfe' },
//     approved:   { bg: '#f0fdf4', text: '#00a651', border: '#bbf7d0' },
//     actionReq:  { bg: '#fff7ed', text: '#cd924e', border: '#fed7aa' },
//     rejected:   { bg: '#fef2f0', text: '#b42318', border: '#fecaca' },
//     pending:    { bg: '#faf5ff', text: '#7c3aed', border: '#ddd6fe' },
//     processing: { bg: '#f0f9ff', text: '#0369a1', border: '#bae6fd' },
//   },

//   // Risk badge colors
//   risk: {
//     low:    { bg: '#f0fdf4', text: '#00a651', border: '#bbf7d0' },
//     medium: { bg: '#fff7ed', text: '#cd924e', border: '#fed7aa' },
//     high:   { bg: '#fef2f0', text: '#b42318', border: '#fecaca' },
//   },
// };

// export default T;
// EFU Life — Retail Design System
// Design tokens v1.0 · matches DESIGN-SYSTEM.md / tokens.json exactly
// Consume these tokens only. Do not hard-code hex values in components.

export const T = {
  // ---------- 1. BRAND ----------
  // Navy is the action colour (buttons, links, key figures).
  // Blue is hover / focus / active-state and the accent rule.
  // Gold is reserved: counts, "popular" flags, premium framing. Never a CTA.
  primaryNavy:      '#0f4c7a', // primary action, headings on light
  navyDeep:         '#0b2b3d', // dark canvas (scanner, media)
  navyRaised:       '#0f3a52', // raised block on dark canvas
  stateBlue:        '#1b75bb', // hover, focus border, active rule
  blueTint:         '#eaf3fa', // avatar / icon pad, soft info fill
  blueTintAlt:      '#eef4f8', // active row in a step list
  blueOnDark:       '#a9c6dd', // secondary text on navyDeep

  goldAccent:       '#cd924e', // badge fill, ornamental border
  goldStrong:       '#b07f38', // gold text where fill is too light
  goldTint:         '#f7eddf', // "Popular" chip fill
  goldBorder:       '#e3cba4', // "Popular" chip border
  goldInk:          '#8a5f1b', // text on goldTint (4.86:1)

  // ---------- 2. INK (text) ----------
  textStrong:       '#0f181f', // headings, values          17.9:1 on white
  textPrimary:      '#0f181f', // alias kept for existing components
  textBody:         '#43535f', // dense list copy            7.95:1
  textSecondary:    '#43535f', // alias kept for existing components
  textMuted:        '#5b6b78', // secondary copy, labels     5.50:1
  textSubtle:       '#7d8b96', // eyebrows, meta             3.50:1 — 14px+/700 only
  textFaint:        '#9aa5ac', // placeholder                2.51:1 — non-text only
  textDisabled:     '#a3aeb8', // pending step label         2.26:1 — non-text only
  textInverse:      '#ffffff',

  // ---------- 3. SURFACE ----------
  pageCanvas:       '#f4f8fb',
  cardSurface:      '#ffffff',
  surfaceRaised:    '#f9fbfc', // nested row inside a card
  surfaceRaisedAlt: '#fbfdfe', // top of a subtle vertical wash
  surfaceInset:     '#eef2f5', // segmented-control track, footers
  surfaceInsetAlt:  '#e3e9ee', // progress track
  surfaceInsetDeep: '#e8edf1', // filled skeleton / meter fill

  // ---------- 4. BORDER ----------
  borderDefault:    '#c5cad0', // card + input outline, 1px
  borderLight:      '#e5e9ec', // dividers, section rules (was #e2e8f0)
  borderQuiet:      '#dde4ea', // neutral chip outline
  borderStrong:     '#b6c6d2', // emphasised outline
  borderFocus:      '#1b75bb',

  // ---------- 5. STATUS ----------
  // Success has two identities on purpose: -Ink for text/icons on light,
  // -Action for the pay/confirm button (filled green control).
  successInk:       '#0a7a52', // tick icons, "covered" text  5.36:1
  successTint:      '#e7f5ee', // success icon pad, banner fill
  commitGreen:      '#00a651', // filled confirm/pay button
  successActionHover: '#00b85b',

  error:            '#b42318', // error text, error outline   6.57:1
  dangerSolid:      '#b3261e', // filled fail marker
  errorBg:          '#fdecea', // fail icon pad
  dangerTintRow:    '#fdefed', // failed row background
  dangerIcon:       '#a6402f', // icon stroke on danger tint

  // ---------- 6. ALPHA / OVERLAY ----------
  alphaFocus:       'rgba(4, 61, 91, .15)',
  alphaScrim:       'rgba(4, 24, 37, .55)',
  alphaShadowModal: 'rgba(4, 24, 37, .40)',
  alphaOnDark08:    'rgba(255, 255, 255, .10)',
  alphaOnDark12:    'rgba(255, 255, 255, .12)',
  alphaOnDark24:    'rgba(255, 255, 255, .24)',
  alphaOnDark30:    'rgba(255, 255, 255, .30)',

  // ---------- 7. TYPOGRAPHY ----------
  fontSans:   "'Plus Jakarta Sans', 'Noto Naskh Arabic', system-ui, sans-serif",
  fontArabic: "'Noto Naskh Arabic', 'Plus Jakarta Sans', serif",

  text: {
    display: '30px', h1: '28px', h2: '24px', h3: '21px', h4: '19px', h5: '16px',
    lead: '15px', body: '14px', bodySm: '13.5px', base: '13px', sm: '12.5px',
    xs: '12px', xxs: '11.5px', xxxs: '11px', micro: '10px', nano: '9.5px',
  },
  weight: { regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800 },
  leading: { tight: 1.15, snug: 1.3, normal: 1.45, relaxed: 1.55, loose: 1.6 },
  tracking: { tight: '-0.3px', wide: '0.4px', wider: '0.6px' },

  // ---------- 8. SPACE (4px base, 2px sub-step) ----------
  space: {
    1: '2px', 2: '4px', 3: '6px', 4: '8px', 5: '10px', 6: '12px',
    7: '16px', 8: '20px', 9: '24px', 10: '28px', 11: '34px', 12: '40px', 13: '60px',
  },

  // ---------- 9. RADIUS ----------
  radius: {
    xs: '3px', sm: '5px', md: '8px', lg: '9px', xl: '10px',
    xxl: '12px', xxxl: '16px', full: '999px',
  },

  // ---------- 10. CONTROL SIZE ----------
  control: {
    sm: '30px', chip: '32px', md: '42px', lg: '44px',
    xl: '46px', xxl: '48px', headerHeight: '74px', containerMax: '1400px',
  },

  // ---------- 11. ELEVATION ----------
  shadow: {
    focus:   '0 0 0 3px rgba(4, 61, 91, .15)',
    hover:   '0 4px 14px rgba(15, 24, 31, .06)',
    raised:  '0 8px 18px rgba(4, 61, 91, .18)',
    fab:     '0 8px 18px rgba(4, 61, 91, .35)',
    popover: '0 16px 34px rgba(4, 61, 91, .28)',
    modal:   '0 24px 60px rgba(4, 24, 37, .40)',
    glowGold:'0 0 18px 4px rgba(205, 146, 78, .55)',
  },

  // ---------- 12. MOTION ----------
  duration: { fast: '150ms', base: '220ms', slow: '300ms', progress: '520ms' },
  easing: { standard: 'ease', progress: 'cubic-bezier(.3,.8,.3,1)', pop: 'cubic-bezier(.3,1.4,.5,1)' },

  // ---------- Status chip / risk badge groups (kept for existing Badge.jsx) ----------
  status: {
    inReview:   { bg: '#eaf3fa', text: '#1b75bb', border: '#d5e0e8' },
    approved:   { bg: '#e7f5ee', text: '#0a7a52', border: '#bbf7d0' },
    actionReq:  { bg: '#f7eddf', text: '#8a5f1b', border: '#e3cba4' },
    rejected:   { bg: '#fdecea', text: '#b42318', border: '#fecaca' },
    pending:    { bg: '#faf5ff', text: '#7c3aed', border: '#ddd6fe' },
    processing: { bg: '#eaf3fa', text: '#1b75bb', border: '#d5e0e8' },
  },
  risk: {
    low:    { bg: '#e7f5ee', text: '#0a7a52', border: '#bbf7d0' },
    medium: { bg: '#f7eddf', text: '#8a5f1b', border: '#e3cba4' },
    high:   { bg: '#fdecea', text: '#b42318', border: '#fecaca' },
  },
};

export default T;