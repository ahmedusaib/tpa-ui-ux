import React from 'react';
import { T } from '../../tokens';

const variants = {
  primary: {
    background: T.primaryNavy,
    color: '#fff',
    border: 'none',
    hoverBg: '#0d4269',
  },
  secondary: {
    background: '#fff',
    color: T.primaryNavy,
    border: `1px solid ${T.borderDefault}`,
    hoverBg: T.pageCanvas,
  },
  commit: {
    background: T.commitGreen,
    color: '#fff',
    border: 'none',
    hoverBg: '#008f46',
  },
  danger: {
    background: T.error,
    color: '#fff',
    border: 'none',
    hoverBg: '#9b1e14',
  },
  ghost: {
    background: 'transparent',
    color: T.primaryNavy,
    border: `1px solid ${T.primaryNavy}`,
    hoverBg: '#e8f0f8',
  },
  stateBlue: {
    background: T.stateBlue,
    color: '#fff',
    border: 'none',
    hoverBg: '#1664a3',
  },
};

export default function Button({
  variant = 'primary',
  size = 'default',
  children,
  onClick,
  disabled = false,
  fullWidth = false,
  icon = null,
  style = {},
  type = 'button',
  loading = false,
}) {
  const v = variants[variant] || variants.primary;
  const height = size === 'sm' ? '36px' : size === 'lg' ? '48px' : '44px';
  const fontSize = size === 'sm' ? '13px' : '14px';
  const px = size === 'sm' ? '14px' : '20px';

  const [hovered, setHovered] = React.useState(false);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        height,
        padding: `0 ${px}`,
        fontSize,
        fontWeight: 600,
        fontFamily: 'var(--font-family)',
        borderRadius: 'var(--radius-button)',
        border: v.border || 'none',
        background: hovered && !disabled ? v.hoverBg : v.background,
        color: v.color,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        transition: 'background 0.18s ease, box-shadow 0.18s ease, transform 0.12s ease',
        transform: hovered && !disabled ? 'translateY(-1px)' : 'none',
        boxShadow: hovered && !disabled && !['ghost', 'secondary'].includes(variant)
          ? '0 4px 14px rgba(15,24,31,0.18)' : 'none',
        width: fullWidth ? '100%' : 'auto',
        whiteSpace: 'nowrap',
        letterSpacing: '0.01em',
        ...style,
      }}
    >
      {loading ? (
        <span style={{
          width: 16, height: 16,
          border: `2px solid rgba(255,255,255,0.3)`,
          borderTop: '2px solid #fff',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          display: 'inline-block',
        }} />
      ) : icon}
      {children}
    </button>
  );
}
