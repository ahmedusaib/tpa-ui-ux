import React from 'react';
import { T } from '../../tokens';

/**
 * KPICard — Adamjee Life Admin Design System
 *
 * Props:
 *  icon        — React node (SVG element)
 *  label       — Primary label text  (e.g. "Total in Queue")
 *  sublabel    — Dot-separated context (e.g. "Live")  → shown as "LABEL · SUBLABEL"
 *  value       — Main metric value (number or string)
 *  trendText   — e.g. "+8.4%" or "1 breach"
 *  trendUp     — true = green ↑ pill, false = red ↓ pill, null = neutral grey
 *  onClick     — optional click handler (shows → arrow as clickable)
 */
export default function KPICard({ icon, label, sublabel, value, trendText, trendUp = null, onClick }) {
  const trendColor =
    trendUp === null  ? T.textMuted  :
    trendUp === true  ? T.commitGreen :
    T.error;

  const trendBg =
    trendUp === null  ? '#f1f5f9' :
    trendUp === true  ? `${T.commitGreen}18` :
    `${T.error}12`;

  const trendArrow = trendUp === true ? '↑' : trendUp === false ? '↓' : null;

  return (
    <div
      onClick={onClick}
      style={{
        background: T.cardSurface,
        border: `1px solid ${T.borderLight}`,
        borderRadius: '16px',
        padding: '18px 20px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.18s, transform 0.15s',
        userSelect: 'none',
      }}
      onMouseEnter={e => {
        if (!onClick) return;
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={e => {
        if (!onClick) return;
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
        e.currentTarget.style.transform = 'none';
      }}
    >
      {/* ── Top row: icon + trend pill ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
        {/* Icon box */}
        <div style={{
          width: 38, height: 38, borderRadius: '10px',
          background: '#f1f5f9',
          border: `1px solid ${T.borderLight}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {icon}
        </div>

        {/* Trend pill */}
        {trendText && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '3px',
            fontSize: '11px', fontWeight: 700, color: trendColor,
            background: trendBg,
            padding: '4px 8px', borderRadius: '20px',
            border: `1px solid ${trendColor}22`,
            letterSpacing: '0.01em',
          }}>
            {trendArrow && <span style={{ fontSize: '10px' }}>{trendArrow}</span>}
            {trendText}
          </span>
        )}
      </div>

      {/* ── Label row ── */}
      <div style={{
        fontSize: '10px', fontWeight: 700,
        color: T.textMuted,
        textTransform: 'uppercase', letterSpacing: '0.07em',
        marginBottom: '6px',
      }}>
        {label}{sublabel ? ` · ${sublabel}` : ''}
      </div>

      {/* ── Value + arrow row ── */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{
          fontSize: '30px', fontWeight: 800,
          color: T.textPrimary,
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}>
          {value}
        </div>

        {onClick && (
          <span style={{
            fontSize: '18px', color: T.textMuted,
            lineHeight: 1, paddingBottom: '2px',
            transition: 'color 0.15s',
          }}>
            →
          </span>
        )}
      </div>
    </div>
  );
}
