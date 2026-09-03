import React from 'react';
import { T } from '../../tokens';
import efuLogo from '../../assets/efu-logo.png';

// Clean SVG icon components — no emojis
const Icons = {
  // User nav
  ClaimForm: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  Track: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  BulkUpload: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
    </svg>
  ),
  // Admin nav
  Queue: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  ),
  Assessment: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  Decision: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  BulkException: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  Audit: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  // Section labels
  Building: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  User: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
};

const USER_NAV = [
  { id: 'single-claim', label: 'Single Claim Intimation', Icon: Icons.ClaimForm },
  { id: 'track-claims', label: 'Track Claims',            Icon: Icons.Track },
  { id: 'bulk-upload',  label: 'Bulk Claim Upload',       Icon: Icons.BulkUpload },
];

const ADMIN_NAV = [
  { id: 'work-queue',     label: 'Claims Work Queue',          Icon: Icons.Queue },
  { id: 'assessment',     label: 'Assessment & AI Extraction', Icon: Icons.Assessment },
  { id: 'decision',       label: 'Decision & Approval',        Icon: Icons.Decision },
  { id: 'bulk-exception', label: 'Bulk Exception Workbench',   Icon: Icons.BulkException },
  { id: 'audit-history',  label: 'Claims Audit & History',     Icon: Icons.Audit },
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* EFU Life logo image */}
          <img
            src={efuLogo}
            alt="EFU Life Logo"
            style={{
              width: 40, height: 40, borderRadius: '8px',
              objectFit: 'contain', flexShrink: 0,
              background: '#c0392b',
            }}
          />
          <div>
            <div style={{ fontWeight: 800, fontSize: '13px', color: '#fff', lineHeight: 1.2 }}>EFU Life</div>
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
        display: 'flex', alignItems: 'center', gap: '6px',
      }}>
        {role === 'admin'
          ? <><Icons.Building /> Admin — Claims Module</>
          : <><Icons.User /> Subscriber Portal</>
        }
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: '0 10px' }}>
        {navItems.map((item) => {
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={item.label}
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
              <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, opacity: isActive ? 1 : 0.75 }}>
                <item.Icon />
              </span>
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
