import React, { useEffect } from 'react';
import { T } from '../../tokens';

export default function Modal({ open, onClose, title, children, width = '560px', noPadding = false }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(11,24,35,0.55)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: T.cardSurface,
          borderRadius: '14px',
          width,
          maxWidth: 'calc(100vw - 40px)',
          maxHeight: '90vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-modal)',
          animation: 'scaleIn 0.22s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* Header */}
        {title && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 24px',
            borderBottom: `1px solid ${T.borderLight}`,
            flexShrink: 0,
          }}>
            <span style={{ fontWeight: 700, fontSize: '16px', color: T.textPrimary }}>{title}</span>
            {onClose && (
              <button
                onClick={onClose}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: T.textMuted, fontSize: '20px', lineHeight: 1,
                  padding: '2px 6px', borderRadius: '6px',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.target.style.background = T.pageCanvas}
                onMouseLeave={e => e.target.style.background = 'none'}
              >×</button>
            )}
          </div>
        )}
        {/* Body */}
        <div style={{
          overflowY: 'auto',
          padding: noPadding ? 0 : '24px',
          flex: 1,
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}
