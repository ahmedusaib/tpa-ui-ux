import React from 'react';
import { T } from '../../tokens';

const USER_NAV = [
  { id: 'single-claim',  label: 'Single Claim Intimation', icon: '📝' },
  { id: 'track-claims',  label: 'Track Claims',            icon: '🔍' },
  { id: 'bulk-upload',   label: 'Bulk Claim Upload',       icon: '📦' },
];

const ADMIN_NAV = [
  { id: 'work-queue',       label: 'Claims Work Queue',            icon: '📋' },
  { id: 'assessment',       label: 'Assessment & AI Extraction',   icon: '🤖' },
  { id: 'decision',         label: 'Decision & Approval',          icon: '✅' },
  { id: 'bulk-exception',   label: 'Bulk Exception Workbench',     icon: '⚠️' },
  { id: 'audit-history',    label: 'Claims Audit & History',       icon: '📊' },
];

export default function Sidebar({ role, activeScreen, onNavigate }) {
  const navItems = role === 'admin' ? ADMIN_NAV : USER_NAV;

  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      height: '100%',
      background: T.primaryNavy,
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      overflowY: 'auto',
      overflowX: 'hidden',
    }}>
      {/* Logo */}
      <div style={{
        padding: '22px 20px 18px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: '9px',
            background: 'linear-gradient(135deg, #cd924e, #e8b07a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', fontWeight: 800, color: '#fff',
            flexShrink: 0,
          }}>A</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '13px', color: '#fff', lineHeight: 1.2 }}>Adamjee Life</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>ERP Platform</div>
          </div>
        </div>
      </div>

      {/* Role Label */}
      <div style={{
        padding: '14px 20px 10px',
        fontSize: '10px', fontWeight: 700,
        color: 'rgba(255,255,255,0.45)',
        textTransform: 'uppercase', letterSpacing: '0.08em',
      }}>
        {role === 'admin' ? '🏢 Admin — Claims Module' : '👤 Subscriber Portal'}
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: '0 10px' }}>
        {navItems.map((item) => {
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                width: '100%',
                height: '44px',
                padding: '0 12px',
                marginBottom: '3px',
                borderRadius: '9px',
                border: 'none',
                background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.65)',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 500,
                fontFamily: 'var(--font-family)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
                borderLeft: isActive ? `3px solid ${T.stateBlue}` : '3px solid transparent',
              }}
              onMouseEnter={e => {
                if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              }}
              onMouseLeave={e => {
                if (!isActive) e.currentTarget.style.background = 'transparent';
              }}
            >
              <span style={{ fontSize: '16px', flexShrink: 0 }}>{item.icon}</span>
              <span style={{ lineHeight: 1.3, flex: 1 }}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Info */}
      <div style={{
        padding: '14px 20px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        fontSize: '11px',
        color: 'rgba(255,255,255,0.4)',
      }}>
        Claims Module v1.0 · Team 4
      </div>
    </aside>
  );
}
