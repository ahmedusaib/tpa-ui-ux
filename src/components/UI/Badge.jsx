import React from 'react';
import { T } from '../../tokens';

export default function Badge({ status, children, size = 'default', style = {} }) {
  const presets = {
    'In Review':       T.status.inReview,
    'Approved':        T.status.approved,
    'Action Required': T.status.actionReq,
    'Rejected':        T.status.rejected,
    'Pending':         T.status.pending,
    'Processing':      T.status.processing,
    'Low Risk':        T.risk.low,
    'Medium Risk':     T.risk.medium,
    'High Risk':       T.risk.high,
    'Invalid Policy ID':     { bg: '#fef2f0', text: '#b42318', border: '#fecaca' },
    'Unreadable Document':   { bg: '#fff7ed', text: '#cd924e', border: '#fed7aa' },
    'Duplicate Claim':       { bg: '#faf5ff', text: '#7c3aed', border: '#ddd6fe' },
    'Active':          { bg: '#f0fdf4', text: '#00a651', border: '#bbf7d0' },
    'Settled':         { bg: '#f0fdf4', text: '#00a651', border: '#bbf7d0' },
    'Lapsed':          { bg: '#fef2f0', text: '#b42318', border: '#fecaca' },
  };

  const colors = (status && presets[status]) || { bg: '#f4f8fb', text: '#4a5568', border: '#c5cad0' };
  const height = size === 'sm' ? '24px' : '32px';
  const fontSize = size === 'sm' ? '11px' : '12px';

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      height,
      padding: '0 10px',
      fontSize,
      fontWeight: 600,
      fontFamily: 'var(--font-family)',
      borderRadius: '6px',
      background: colors.bg,
      color: colors.text,
      border: `1px solid ${colors.border}`,
      letterSpacing: '0.02em',
      whiteSpace: 'nowrap',
      ...style,
    }}>
      {children || status}
    </span>
  );
}
