import React, { useState } from 'react';
import { T } from '../../tokens';
import Badge from '../../components/UI/Badge';
import Button from '../../components/UI/Button';

const AUDIT_RECORDS = [
  { id: 'CLM-2026-48821', subscriber: 'Jawad Saleem',     type: 'Hospitalization',  amount: 'PKR 45,000',  status: 'In Review',       updated: '02 Sep 2026, 09:30', actor: 'Ahmed Malik (Assessor)',  action: 'AI Extraction Completed' },
  { id: 'CLM-2026-31204', subscriber: 'Jawad Saleem',     type: 'Device Protection', amount: 'PKR 18,500', status: 'Approved',         updated: '17 Jul 2026, 14:10', actor: 'Sara Khan (Checker)',     action: 'Payout Authorized' },
  { id: 'CLM-2026-39901', subscriber: 'Fatima Noor',      type: 'Accidental Death',  amount: 'PKR 500,000',status: 'Action Required',  updated: '31 Aug 2026, 11:05', actor: 'System',                  action: 'Missing Document Alert Sent' },
  { id: 'CLM-2026-31100', subscriber: 'Usama Tariq',      type: 'Disability',        amount: 'PKR 120,000',status: 'In Review',        updated: '01 Sep 2026, 16:20', actor: 'Sara Khan (Assessor)',    action: 'Referred to Senior Assessor' },
  { id: 'CLM-2025-90412', subscriber: 'Jawad Saleem',     type: 'Disability',        amount: 'PKR 120,000',status: 'Rejected',         updated: '18 Dec 2025, 10:45', actor: 'Zara Ali (Checker)',      action: 'Rejection Confirmed — Pre-existing' },
  { id: 'CLM-2026-22003', subscriber: 'Rehan Javed',      type: 'Accidental Death',  amount: 'PKR 500,000',status: 'In Review',        updated: '01 Sep 2026, 08:00', actor: 'System (Auto-assign)',    action: 'Assigned to Work Queue' },
];

const TIMELINE_EVENTS = [
  { time: '09:30', actor: 'Ahmed Malik', role: 'Assessor', action: 'Completed AI extraction — Low Risk flagged', icon: '🤖', color: T.stateBlue },
  { time: '09:15', actor: 'System',      role: 'Automated', action: 'Claim routed to Assessment queue (priority 1)', icon: '⚙️', color: T.textMuted },
  { time: '08:52', actor: 'Jawad Saleem',role: 'Subscriber', action: 'Claim submitted via portal — 3 documents attached', icon: '📝', color: T.primaryNavy },
  { time: '08:50', actor: 'System',      role: 'Automated', action: 'Real-time validation passed — All 4 checks green', icon: '✅', color: T.commitGreen },
  { time: '08:49', actor: 'Jawad Saleem',role: 'Subscriber', action: 'Policy lookup performed — Policy AL-TPA-2024-08842 verified', icon: '🔍', color: T.primaryNavy },
];

export default function ClaimsAuditHistory() {
  const [search, setSearch] = useState('');
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
      <div style={{ marginBottom: '22px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: T.primaryNavy, marginBottom: '4px' }}>
          Claims Audit & History
        </h1>
        <p style={{ fontSize: '13px', color: T.textMuted }}>
          Complete audit trail and timeline view for all claims activity. Immutable logs for compliance.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>
        {/* Left: Search & Table */}
        <div>
          {/* Search & Filter Bar */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <span style={{
                position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                color: T.textMuted, fontSize: '14px',
              }}>🔍</span>
              <input
                id="audit-search"
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by Claim ID or subscriber..."
                style={{
                  width: '100%', height: '42px', padding: '0 14px 0 38px',
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
                <span key={h} style={{ fontSize: '11px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</span>
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
        <div style={{ animation: 'slideInRight 0.3s ease' }}>
          {selectedClaim && (
            <>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontWeight: 700, fontSize: '14px', color: T.primaryNavy }}>
                  Timeline — {selectedClaim}
                </div>
                <div style={{ fontSize: '12px', color: T.textMuted }}>02 Sep 2026 · Jawad Saleem · Hospitalization</div>
              </div>

              <div style={{
                background: T.cardSurface, border: `1px solid ${T.borderLight}`,
                borderRadius: '12px', padding: '20px',
                boxShadow: 'var(--shadow-card)',
              }}>
                {TIMELINE_EVENTS.map((ev, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex', gap: '14px',
                      paddingBottom: i < TIMELINE_EVENTS.length - 1 ? '20px' : 0,
                      position: 'relative',
                      animation: `fadeIn 0.3s ease ${i * 0.1}s both`,
                    }}
                  >
                    {/* Connector Line */}
                    {i < TIMELINE_EVENTS.length - 1 && (
                      <div style={{
                        position: 'absolute', left: '15px', top: '34px',
                        width: '2px', height: 'calc(100% - 14px)',
                        background: T.borderLight,
                      }} />
                    )}
                    {/* Icon */}
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                      background: ev.color === T.textMuted ? '#e2e8f0' : `${ev.color}18`,
                      border: `2px solid ${ev.color === T.textMuted ? '#c5cad0' : ev.color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '14px', position: 'relative', zIndex: 1,
                    }}>
                      {ev.icon}
                    </div>
                    {/* Content */}
                    <div style={{ flex: 1, paddingTop: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                        <span style={{ fontWeight: 700, fontSize: '13px', color: T.textPrimary }}>
                          {ev.actor}
                        </span>
                        <span style={{ fontSize: '11px', color: T.textMuted, fontFamily: 'monospace' }}>
                          {ev.time}
                        </span>
                      </div>
                      <div style={{ fontSize: '11px', color: T.textMuted, marginBottom: '3px' }}>
                        {ev.role}
                      </div>
                      <div style={{ fontSize: '13px', color: T.textSecondary }}>
                        {ev.action}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Export Button */}
                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: `1px solid ${T.borderLight}` }}>
                  <Button variant="secondary" fullWidth size="sm">
                    📥 Export Audit Trail (PDF)
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
