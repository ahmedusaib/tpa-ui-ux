import React, { useState } from 'react';
import { T } from '../../tokens';
import Badge from '../../components/UI/Badge';
import Button from '../../components/UI/Button';

const AUDIT_RECORDS = [
  { id: 'CLM-2026-48821', subscriber: 'Jawad Saleem',  type: 'Hospitalization',   amount: 'PKR 45,000',   status: 'In Review',      updated: '02 Sep 2026, 09:30', actor: 'Ahmed Malik (Assessor)', action: 'AI Extraction Completed' },
  { id: 'CLM-2026-31204', subscriber: 'Jawad Saleem',  type: 'Device Protection', amount: 'PKR 18,500',   status: 'Approved',       updated: '17 Jul 2026, 14:10', actor: 'Sara Khan (Checker)',    action: 'Payout Authorized' },
  { id: 'CLM-2026-39901', subscriber: 'Fatima Noor',   type: 'Accidental Death',  amount: 'PKR 500,000',  status: 'Action Required',updated: '31 Aug 2026, 11:05', actor: 'System',                 action: 'Missing Document Alert Sent' },
  { id: 'CLM-2026-31100', subscriber: 'Usama Tariq',   type: 'Disability',        amount: 'PKR 120,000',  status: 'In Review',      updated: '01 Sep 2026, 16:20', actor: 'Sara Khan (Assessor)',   action: 'Referred to Senior Assessor' },
  { id: 'CLM-2025-90412', subscriber: 'Jawad Saleem',  type: 'Disability',        amount: 'PKR 120,000',  status: 'Rejected',       updated: '18 Dec 2025, 10:45', actor: 'Zara Ali (Checker)',     action: 'Rejection Confirmed — Pre-existing' },
  { id: 'CLM-2026-22003', subscriber: 'Rehan Javed',   type: 'Accidental Death',  amount: 'PKR 500,000',  status: 'In Review',      updated: '01 Sep 2026, 08:00', actor: 'System (Auto-assign)',   action: 'Assigned to Work Queue' },
];

// SVG icon nodes per event type (no emojis)
const EventIconSVG = ({ type, color }) => {
  const icons = {
    ai: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    system: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M21 12h-2M5 12H3M18.66 18.66l-1.41-1.41M6.75 6.75L5.34 5.34M12 21v-2M12 5V3"/>
      </svg>
    ),
    submit: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
    check: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    search: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  };
  return icons[type] || icons.check;
};

const TIMELINE_EVENTS = [
  { time: '09:30', actor: 'Ahmed Malik', role: 'Assessor',   action: 'Completed AI extraction — Low Risk flagged',                   iconType: 'ai',     color: T.stateBlue },
  { time: '09:15', actor: 'System',      role: 'Automated',  action: 'Claim routed to Assessment queue (priority 1)',                 iconType: 'system', color: T.textMuted },
  { time: '08:52', actor: 'Jawad Saleem',role: 'Subscriber', action: 'Claim submitted via portal — 3 documents attached',            iconType: 'submit', color: T.primaryNavy },
  { time: '08:50', actor: 'System',      role: 'Automated',  action: 'Real-time validation passed — All 4 checks green',             iconType: 'check',  color: T.commitGreen },
  { time: '08:49', actor: 'Jawad Saleem',role: 'Subscriber', action: 'Policy lookup performed — Policy AL-TPA-2024-08842 verified',  iconType: 'search', color: T.primaryNavy },
];

// KPI stats derived from audit records
const kpiData = [
  { label: 'Total Logged',   value: AUDIT_RECORDS.length, trendText: 'all records', trendIcon: null, trendColor: T.textMuted },
  { label: 'In Review',      value: AUDIT_RECORDS.filter(r => r.status === 'In Review').length,      trendText: 'active', trendIcon: '→', trendColor: T.stateBlue },
  { label: 'Approved',       value: AUDIT_RECORDS.filter(r => r.status === 'Approved').length,       trendText: 'closed', trendIcon: '↑', trendColor: T.commitGreen },
  { label: 'Action / Rejected', value: AUDIT_RECORDS.filter(r => r.status === 'Action Required' || r.status === 'Rejected').length, trendText: 'needs review', trendIcon: '!', trendColor: T.goldAccent },
];

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

export default function ClaimsAuditHistory() {
  const [search, setSearch]           = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedClaim, setSelectedClaim] = useState('CLM-2026-48821');

  const filtered = AUDIT_RECORDS.filter(r => {
    const matchSearch = !search ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.subscriber.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || r.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>

      {/* Page Header */}
      <div style={{ marginBottom: '22px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: T.primaryNavy, marginBottom: '4px' }}>
          Claims Audit & History
        </h1>
        <p style={{ fontSize: '13px', color: T.textMuted }}>
          Complete audit trail and timeline view for all claims activity. Immutable logs for compliance.
        </p>
      </div>

      {/* KPI Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {kpiData.map(kpi => (
          <div key={kpi.label} style={{
            background: T.cardSurface, border: `1px solid ${T.borderLight}`,
            borderRadius: '16px', padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            display: 'flex', flexDirection: 'column', gap: '8px',
          }}>
            <div style={{ fontSize: '32px', fontWeight: 800, color: T.textPrimary, lineHeight: 1 }}>{kpi.value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              {kpi.trendIcon ? (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '2px',
                  fontSize: '11px', fontWeight: 700, color: kpi.trendColor,
                  background: `${kpi.trendColor}18`, padding: '4px 6px', borderRadius: '6px',
                }}>
                  {kpi.trendIcon} {kpi.trendText}
                </span>
              ) : (
                <span style={{ fontSize: '12px', color: T.textMuted }}>{kpi.trendText}</span>
              )}
            </div>
            <div style={{ fontSize: '13px', color: T.textSecondary, fontWeight: 500, marginTop: '2px' }}>{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Split Pane */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>

        {/* Left: Search & Table */}
        <div>
          {/* Search & Filter Bar */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <span style={{
                position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                color: T.textMuted, display: 'flex', alignItems: 'center',
              }}>
                <SearchIcon />
              </span>
              <input
                id="audit-search"
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by Claim ID or subscriber..."
                style={{
                  width: '100%', height: '42px', padding: '0 14px 0 36px',
                  border: `1px solid ${T.borderDefault}`, borderRadius: '8px',
                  fontFamily: 'var(--font-family)', fontSize: '13px', outline: 'none',
                }}
              />
            </div>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              style={{
                height: '42px', padding: '0 12px', borderRadius: '8px',
                border: `1px solid ${T.borderDefault}`,
                fontFamily: 'var(--font-family)', fontSize: '13px',
                background: T.cardSurface, outline: 'none', cursor: 'pointer',
              }}
            >
              {['All', 'In Review', 'Approved', 'Action Required', 'Rejected'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div style={{
            background: T.cardSurface, border: `1px solid ${T.borderLight}`,
            borderRadius: '12px', overflow: 'hidden',
            boxShadow: 'var(--shadow-card)',
          }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1.1fr 1fr 0.7fr 0.9fr',
              padding: '0 14px', height: '40px',
              background: T.pageCanvas, borderBottom: `1px solid ${T.borderLight}`,
              alignItems: 'center', gap: '10px',
            }}>
              {['Claim ID', 'Subscriber', 'Status', 'Last Action'].map(h => (
                <span key={h} style={{ fontSize: '11px', fontWeight: 600, color: T.textMuted }}>{h}</span>
              ))}
            </div>
            {filtered.map((r, i) => (
              <div
                key={r.id}
                onClick={() => setSelectedClaim(r.id)}
                style={{
                  display: 'grid', gridTemplateColumns: '1.1fr 1fr 0.7fr 0.9fr',
                  padding: '0 14px', height: '52px',
                  alignItems: 'center', gap: '10px',
                  borderBottom: i < filtered.length - 1 ? `1px solid ${T.borderLight}` : 'none',
                  background: selectedClaim === r.id ? '#eff6ff' : 'transparent',
                  cursor: 'pointer', transition: 'background 0.15s',
                  animation: `fadeIn 0.25s ease ${i * 0.04}s both`,
                }}
                onMouseEnter={e => { if (selectedClaim !== r.id) e.currentTarget.style.background = T.pageCanvas; }}
                onMouseLeave={e => { if (selectedClaim !== r.id) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ fontWeight: 700, fontSize: '12px', color: T.primaryNavy }}>{r.id}</span>
                <span style={{ fontSize: '12px', color: T.textPrimary }}>{r.subscriber}</span>
                <Badge status={r.status} size="sm" />
                <span style={{ fontSize: '11px', color: T.textMuted, lineHeight: 1.3 }}>
                  {r.action.length > 25 ? r.action.substring(0, 25) + '...' : r.action}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Timeline */}
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          {selectedClaim && (
            <>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontWeight: 700, fontSize: '14px', color: T.primaryNavy }}>
                  Event Timeline — {selectedClaim}
                </div>
                <div style={{ fontSize: '12px', color: T.textMuted }}>02 Sep 2026 · Jawad Saleem · Hospitalization</div>
              </div>

              <div style={{
                background: T.cardSurface, border: `1px solid ${T.borderLight}`,
                borderRadius: '12px', padding: '20px',
                boxShadow: 'var(--shadow-card)',
              }}>
                {TIMELINE_EVENTS.map((ev, i) => {
                  const isFirst    = i === 0;  // most recent = highlighted
                  const dotColor   = isFirst ? ev.color : ev.color;
                  const lineColor  = isFirst ? ev.color : T.borderLight; // line leading away from the first event

                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex', gap: '14px',
                        paddingBottom: i < TIMELINE_EVENTS.length - 1 ? '20px' : 0,
                        position: 'relative',
                        animation: `fadeIn 0.3s ease ${i * 0.1}s both`,
                      }}
                    >
                      {/* Connector Line — colored for completed events going DOWN */}
                      {i < TIMELINE_EVENTS.length - 1 && (
                        <div style={{
                          position: 'absolute', left: '15px', top: '34px',
                          width: '2px', height: 'calc(100% - 14px)',
                          background: ev.color !== T.textMuted ? `${ev.color}50` : T.borderLight,
                          transition: 'background 0.3s ease',
                        }} />
                      )}

                      {/* SVG Icon Circle */}
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                        background: ev.color === T.textMuted ? '#f1f5f9' : `${ev.color}15`,
                        border: `2px solid ${ev.color === T.textMuted ? T.borderDefault : ev.color}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        position: 'relative', zIndex: 1,
                        boxShadow: i === 0 ? `0 0 0 4px ${ev.color}20` : 'none',
                      }}>
                        <EventIconSVG type={ev.iconType} color={ev.color === T.textMuted ? T.textMuted : ev.color} />
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1, paddingTop: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                          <span style={{ fontWeight: 700, fontSize: '13px', color: T.textPrimary }}>{ev.actor}</span>
                          <span style={{ fontSize: '11px', color: T.textMuted, fontFamily: 'monospace' }}>{ev.time}</span>
                        </div>
                        <div style={{ fontSize: '11px', color: T.textMuted, marginBottom: '3px' }}>{ev.role}</div>
                        <div style={{ fontSize: '13px', color: T.textSecondary }}>{ev.action}</div>
                      </div>
                    </div>
                  );
                })}

                {/* Export */}
                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: `1px solid ${T.borderLight}` }}>
                  <button
                    style={{
                      width: '100%', height: '36px', borderRadius: '8px',
                      border: `1px solid ${T.borderDefault}`, background: T.cardSurface,
                      fontFamily: 'var(--font-family)', fontSize: '13px', fontWeight: 600,
                      color: T.textSecondary, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = T.pageCanvas; }}
                    onMouseLeave={e => { e.currentTarget.style.background = T.cardSurface; }}
                  >
                    <DownloadIcon /> Export Audit Trail (PDF)
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
