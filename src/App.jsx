import React, { useState, useEffect } from 'react';
import { T } from './tokens';

// Shell
import TopBar  from './components/Shell/TopBar';
import Sidebar from './components/Shell/Sidebar';

// User Screens
import SingleClaimIntimation from './screens/user/SingleClaimIntimation';
import TrackClaims           from './screens/user/TrackClaims';
import BulkClaimUpload       from './screens/user/BulkClaimUpload';

// Admin Screens
import ClaimsWorkQueue          from './screens/admin/ClaimsWorkQueue';
import AssessmentWorkbench      from './screens/admin/AssessmentWorkbench';
import DecisionApproval         from './screens/admin/DecisionApproval';
import ClaimsAuditHistory       from './screens/admin/ClaimsAuditHistory';

// User Screens (moved from admin)
import BulkExceptionWorkbench   from './screens/user/BulkExceptionWorkbench';

const DEFAULT_SCREEN = {
  user:  'single-claim',
  admin: 'work-queue',
};

export default function App() {
  const [role, setRole]           = useState('user');
  const [screen, setScreen]       = useState('single-claim');
  const [prevRole, setPrevRole]   = useState(null);
  const [animKey, setAnimKey]     = useState(0);

  const handleRoleSwitch = (newRole) => {
    if (newRole === role) return;
    setPrevRole(role);
    setRole(newRole);
    setScreen(DEFAULT_SCREEN[newRole]);
    setAnimKey(k => k + 1);
  };

  const handleNavigate = (newScreen, targetRole) => {
    if (targetRole && targetRole !== role) {
      setRole(targetRole);
    }
    setScreen(newScreen);
    setAnimKey(k => k + 1);
  };

  const renderScreen = () => {
    if (role === 'user') {
      switch (screen) {
        case 'single-claim':    return <SingleClaimIntimation onNavigate={handleNavigate} />;
        case 'track-claims':    return <TrackClaims           onNavigate={handleNavigate} />;
        case 'bulk-upload':     return <BulkClaimUpload onNavigate={handleNavigate} onRoleSwitch={handleRoleSwitch} />;
        case 'bulk-exception':  return <BulkExceptionWorkbench />;
        default:                return <SingleClaimIntimation onNavigate={handleNavigate} />;
      }
    } else {
      switch (screen) {
        case 'work-queue':    return <ClaimsWorkQueue   onNavigate={handleNavigate} />;
        case 'assessment':   return <AssessmentWorkbench />;
        case 'decision':     return <DecisionApproval />;
        case 'audit-history':return <ClaimsAuditHistory />;
        default:             return <ClaimsWorkQueue   onNavigate={handleNavigate} />;
      }
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: T.pageCanvas,
      overflow: 'hidden',
    }}>
      {/* Top Bar */}
      <TopBar role={role} onRoleSwitch={handleRoleSwitch} activeScreen={screen} />

      {/* Body: Sidebar + Main Canvas */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <Sidebar role={role} activeScreen={screen} onNavigate={handleNavigate} />

        {/* Main Canvas */}
        <main
          key={`${role}-${screen}-${animKey}`}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: role === 'admin' ? '24px' : '32px 40px',
            animation: 'fadeIn 0.28s ease',
          }}
        >
          {renderScreen()}
        </main>
      </div>
    </div>
  );
}
