import React, { useState } from 'react';
import { T } from '../../tokens';

export default function TopBar({ role, onRoleSwitch, activeScreen }) {
  const [hoverUser, setHoverUser] = useState(false);
  const [hoverAdmin, setHoverAdmin] = useState(false);

  const screenLabels = {
    'single-claim':   'Single Claim Intimation',
    'track-claims':   'Track My Claims',
    'bulk-upload':    'Bulk Claim Upload',
    'work-queue':     'Claims Work Queue',
    'assessment':     'Assessment & AI Extraction',
    'decision':       'Decision & Approval Workstation',
    'bulk-exception': 'Bulk Intimation Exception Workbench',
    'audit-history':  'Claims Audit & History',
  };

  return (
    <header style={{
      height: 'var(--topbar-height)',
      background: T.cardSurface,
      borderBottom: `1px solid ${T.borderLight}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      flexShrink: 0,
      boxShadow: '0 1px 4px rgba(15,24,31,0.05)',
      zIndex: 100,
      position: 'relative',
    }}>
      {/* Left: Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: T.textMuted, fontWeight: 500 }}>
          Digital Protection & Insurance Distribution Platform
        </span>
        <span style={{ color: T.borderDefault }}>›</span>
        <span style={{ fontSize: '13px', color: T.primaryNavy, fontWeight: 700 }}>
          Claims Processing
        </span>
        {activeScreen && (
          <>
            <span style={{ color: T.borderDefault }}>›</span>
            <span style={{ fontSize: '13px', color: T.textSecondary, fontWeight: 500 }}>
              {screenLabels[activeScreen] || activeScreen}
            </span>
          </>
        )}
      </div>

      {/* Right: Role Switcher + Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Role Switcher */}
        <div style={{
          display: 'flex',
          background: T.pageCanvas,
          border: `1px solid ${T.borderLight}`,
          borderRadius: '10px',
          padding: '3px',
          gap: '3px',
        }}>
          {/* User Tab */}
          <button
            id="role-switcher-user"
            onClick={() => onRoleSwitch('user')}
            onMouseEnter={() => setHoverUser(true)}
            onMouseLeave={() => setHoverUser(false)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              height: '34px', padding: '0 14px',
              borderRadius: '8px', border: 'none',
              fontFamily: 'var(--font-family)',
              fontSize: '13px', fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: role === 'user'
                ? T.primaryNavy
                : hoverUser ? '#e8edf2' : 'transparent',
              color: role === 'user' ? '#fff' : T.textSecondary,
              boxShadow: role === 'user' ? '0 2px 8px rgba(15,76,122,0.25)' : 'none',
            }}
          >
            <span>👤</span> User Portal
          </button>

          {/* Admin Tab */}
          <button
            id="role-switcher-admin"
            onClick={() => onRoleSwitch('admin')}
            onMouseEnter={() => setHoverAdmin(true)}
            onMouseLeave={() => setHoverAdmin(false)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              height: '34px', padding: '0 14px',
              borderRadius: '8px', border: 'none',
              fontFamily: 'var(--font-family)',
              fontSize: '13px', fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: role === 'admin'
                ? T.primaryNavy
                : hoverAdmin ? '#e8edf2' : 'transparent',
              color: role === 'admin' ? '#fff' : T.textSecondary,
              boxShadow: role === 'admin' ? '0 2px 8px rgba(15,76,122,0.25)' : 'none',
            }}
          >
            <span>🏢</span> Admin ERP
          </button>
        </div>

        {/* Notification Bell */}
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <span style={{ fontSize: '20px' }}>🔔</span>
          <span style={{
            position: 'absolute', top: -3, right: -3,
            width: 16, height: 16,
            background: T.error, color: '#fff',
            fontSize: '9px', fontWeight: 700,
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid #fff',
          }}>3</span>
        </div>

        {/* Avatar */}
        <div style={{
          width: 36, height: 36,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${T.primaryNavy}, ${T.stateBlue})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: '13px', color: '#fff',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(15,76,122,0.3)',
        }}>
          {role === 'admin' ? 'AM' : 'JD'}
        </div>
      </div>
    </header>
  );
}
