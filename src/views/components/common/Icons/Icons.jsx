/** Ícones SVG inline (herdam a cor do texto via currentColor). */
const base = {
  width: '1em',
  height: '1em',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
};

export const ChevronLeftIcon = (props) => (
  <svg {...base} {...props}>
    <path d="m15 5-7 7 7 7" />
  </svg>
);

export const ChevronDownIcon = (props) => (
  <svg {...base} {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const CopyIcon = (props) => (
  <svg {...base} strokeWidth={2} {...props}>
    <rect x="9" y="9" width="11" height="11" rx="2.2" />
    <path d="M5 15V6.2A2.2 2.2 0 0 1 7.2 4H16" />
  </svg>
);

export const UploadIcon = (props) => (
  <svg {...base} strokeWidth={2.6} {...props}>
    <path d="M12 16V4" />
    <path d="m6.5 9.5 5.5-5.5 5.5 5.5" />
    <path d="M5 20h14" />
  </svg>
);

export const CheckIcon = (props) => (
  <svg {...base} strokeWidth={3} {...props}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
