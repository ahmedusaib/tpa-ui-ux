import React, { useState } from 'react';
import { T } from '../../tokens';
import Badge from '../../components/UI/Badge';
import Button from '../../components/UI/Button';
import KPICard from '../../components/UI/KPICard';

const AUDIT_RECORDS = [
  { id: 'CLM-2026-48821', subscriber: 'Jawad Saleem',  type: 'Hospitalization',   amount: 'PKR 45,000',   status: 'In Review',      updated: '02 Sep 2026, 09:30', actor: 'Ahmed Malik (Assessor)', action: 'AI Extraction Completed' },
  { id: 'CLM-2026-31204', subscriber: 'Jawad Saleem',  type: 'Device Protection', amount: 'PKR 18,500',   status: 'Approved',       updated: '17 Jul 2026, 14:10', actor: 'Sara Khan (Checker)',    action: 'Payout Authorized' },
  { id: 'CLM-2026-39901', subscriber: 'Fatima Noor',   type: 'Accidental Death',  amount: 'PKR 500,000',  status: 'Action Required',updated: '31 Aug 2026, 11:05', actor: 'System',                 action: 'Missing Document Alert Sent' },
  { id: 'CLM-2026-31100', subscriber: 'Usama Tariq',   type: 'Disability',        amount: 'PKR 120,000',  status: 'In Review',      updated: '01 Sep 2026, 16:20', actor: 'Sara Khan (Assessor)',   action: 'Referred to Senior Assessor' },
  { id: 'CLM-2025-90412', subscriber: 'Jawad Saleem',  type: 'Disability',        amount: 'PKR 120,000',  status: 'Rejected',       updated: '18 Dec 2025, 10:45', actor: 'Zara Ali (Checker)',     action: 'Rejection Confirmed — Pre-existing' },
  { id: 'CLM-2026-22003', subscriber: 'Rehan Javed',   type: 'Accidental Death',  amount: 'PKR 500,000',  status: 'In Review',      updated: '01 Sep 2026, 08:00', actor: 'System (Auto-assign)',   action: 'Assigned to Work Queue' },
];

const EventIconSVG = ({ type, color }) => {
  const icons = {
    ai:     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    system: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M21 12h-2M5 12H3M18.66 18.66l-1.41-1.41M6.75 6.75L5.34 5.34M12 21v-2M12 5V3"/></svg>,
    submit: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    check:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    search: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  };
  return icons[type] || icons.check;
};

const TIMELINE_EVENTS = [
  { time: '09:30', actor: 'Ahmed Malik', role: 'Assessor',   action: 'Completed AI extraction — Low Risk flagged',                  iconType: 'ai',     color: T.stateBlue },
  { time: '09:15', actor: 'System',      role: 'Automated',  action: 'Claim routed to Assessment queue (priority 1)',                iconType: 'system', color: T.textMuted },
  { time: '08:52', actor: 'Jawad Saleem',role: 'Subscriber', action: 'Claim submitted via portal — 3 documents attached',           iconType: 'submit', color: T.primaryNavy },
  { time: '08:50', actor: 'System',      role: 'Automated',  action: 'Real-time validation passed — All 4 checks green',            iconType: 'check',  color: T.commitGreen },
  { time: '08:49', actor: 'Jawad Saleem',role: 'Subscriber', action: 'Policy lookup performed — Policy AL-TPA-2024-08842 verified', iconType: 'search', color: T.primaryNavy },
];

// KPI icon SVGs
const IcoTotal = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
  </svg>
);
const IcoInReview = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.stateBlue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);
const IcoApproved = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.commitGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const IcoFlag = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.goldAccent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
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
  const [search, setSearch]               = useState('');
  const [filterStatus, setFilterStatus]   = useState('All');
  const [selectedClaim, setSelectedClaim] = useState('CLM-2026-48821');

  const filtered = AUDIT_RECORDS.filter(r => {
    const matchSearch = !search || r.id.toLowerCase().includes(search.toLowerCase()) || r.subscriber.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || r.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = {
    total:    AUDIT_RECORDS.length,
    inReview: AUDIT_RECORDS.filter(r => r.status === 'In Review').length,
    approved: AUDIT_RECORDS.filter(r => r.status === 'Approved').length,
    flagged:  AUDIT_RECORDS.filter(r => r.status === 'Action Required' || r.status === 'Rejected').length,
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>

      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: T.primaryNavy, marginBottom: '4px' }}>
          Claims Audit & History
        </h1>
        <p style={{ fontSize: '13px', color: T.textMuted }}>
          Complete audit trail and timeline view for all claims activity. Immutable logs for compliance.
        </p>
      </div>

      {/* ── KPI Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <KPICard icon={<IcoTotal />}    label="Total Logged"  sublabel="All Records" value={counts.total}    trendText="all time"    trendUp={null} />
        <KPICard icon={<IcoInReview />} label="In Review"     sublabel="Active"      value={counts.inReview} trendText="active"      trendUp={true}  />
        <KPICard icon={<IcoApproved />} label="Approved"      sublabel="Closed"      value={counts.approved} trendText="disbursed"   trendUp={true}  />
        <KPICard icon={<IcoFlag />}     label="Flagged"       sublabel="Needs Review"value={counts.flagged}  trendText="action req." trendUp={false} />
      </div>

      {/* ── Split Pane ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>

        {/* Left: Search & Table */}
        <div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: T.textMuted, display: 'flex' }}>
                <SearchIcon />
              </span>
              <input
                id="audit-search" type="text" value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by Claim ID or subscriber..."
                style={{
                  width: '100%', height: '40px', padding: '0 14px 0 36px',
                  border: `1px solid ${T.borderLight}`, borderRadius: '8px',
                  fontFamily: 'var(--font-family)', fontSize: '13px', outline: 'none',
                  background: T.cardSurface,
                }}
              />
            </div>
            <select
              value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
              style={{
                height: '40px', padding: '0 12px', borderRadius: '8px',
                border: `1px solid ${T.borderLight}`,
                fontFamily: 'var(--font-family)', fontSize: '13px',
                background: T.cardSurface, outline: 'none', cursor: 'pointer',
              }}
            >
              {['All', 'In Review', 'Approved', 'Action Required', 'Rejected'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div style={{
            background: T.cardSurface, border: `1px solid ${T.borderLight}`,
            borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1.1fr 1fr 0.7fr 0.9fr',
              padding: '0 14px', height: '40px',
              background: T.pageCanvas, borderBottom: `1px solid ${T.borderLight}`,
              alignItems: 'center', gap: '10px',
            }}>
              {['Claim ID', 'Subscriber', 'Status', 'Last Action'].map(h => (
                <span key={h} style={{ fontSize: '11px', fontWeight: 600, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</span>
              ))}
            </div>
            {filtered.map((r, i) => (
              <div key={r.id} onClick={() => setSelectedClaim(r.id)}
                style={{
                  display: 'grid', gridTemplateColumns: '1.1fr 1fr 0.7fr 0.9fr',
                  padding: '0 14px', height: '52px', alignItems: 'center', gap: '10px',
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
                <span style={{ fontSize: '11px', color: T.textMuted }}>
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
                <div style={{ fontWeight: 700, fontSize: '14px', color: T.primaryNavy }}>Event Timeline — {selectedClaim}</div>
                <div style={{ fontSize: '12px', color: T.textMuted }}>02 Sep 2026 · Jawad Saleem · Hospitalization</div>
              </div>
              <div style={{
                background: T.cardSurface, border: `1px solid ${T.borderLight}`,
                borderRadius: '12px', padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              }}>
                {TIMELINE_EVENTS.map((ev, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: '14px',
                    paddingBottom: i < TIMELINE_EVENTS.length - 1 ? '20px' : 0,
                    position: 'relative',
                    animation: `fadeIn 0.3s ease ${i * 0.1}s both`,
                  }}>
                    {i < TIMELINE_EVENTS.length - 1 && (
                      <div style={{
                        position: 'absolute', left: '15px', top: '34px',
                        width: '2px', height: 'calc(100% - 14px)',
                        background: ev.color !== T.textMuted ? `${ev.color}50` : T.borderLight,
                      }} />
                    )}
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                      background: ev.color === T.textMuted ? '#f1f5f9' : `${ev.color}15`,
                      border: `2px solid ${ev.color === T.textMuted ? T.borderDefault : ev.color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      position: 'relative', zIndex: 1,
                      boxShadow: i === 0 ? `0 0 0 4px ${ev.color}20` : 'none',
                    }}>
                      <EventIconSVG type={ev.iconType} color={ev.color} />
                    </div>
                    <div style={{ flex: 1, paddingTop: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                        <span style={{ fontWeight: 700, fontSize: '13px', color: T.textPrimary }}>{ev.actor}</span>
                        <span style={{ fontSize: '11px', color: T.textMuted, fontFamily: 'monospace' }}>{ev.time}</span>
                      </div>
                      <div style={{ fontSize: '11px', color: T.textMuted, marginBottom: '3px' }}>{ev.role}</div>
                      <div style={{ fontSize: '13px', color: T.textSecondary }}>{ev.action}</div>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: `1px solid ${T.borderLight}` }}>
                  <button style={{
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
