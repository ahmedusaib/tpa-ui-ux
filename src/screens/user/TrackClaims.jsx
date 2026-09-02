import React, { useState } from 'react';
import { T } from '../../tokens';
import Badge from '../../components/UI/Badge';
import Button from '../../components/UI/Button';

const SAMPLE_CLAIMS = [
  {
    id: 'CLM-2026-48821',
    type: 'Hospitalization',
    facility: 'Aga Khan University Hospital',
    date: '22 Aug 2026',
    amount: 'PKR 45,000',
    status: 'In Review',
    assignedTo: 'Assessor: Ahmed Malik',
    lastUpdate: '2 hours ago',
    progress: 65,
  },
  {
    id: 'CLM-2026-31204',
    type: 'Device Protection',
    facility: 'OnlineShield Partner — Karachi',
    date: '14 Jul 2026',
    amount: 'PKR 18,500',
    status: 'Approved',
    assignedTo: 'Processed & Disbursed',
    lastUpdate: '3 days ago',
    progress: 100,
    payoutDate: '16 Jul 2026',
  },
  {
    id: 'CLM-2026-19900',
    type: 'Accidental Death',
    facility: 'Jinnah Hospital Lahore',
    date: '01 Jun 2026',
    amount: 'PKR 500,000',
    status: 'Action Required',
    assignedTo: 'Missing: Legal Heir Certificate',
    lastUpdate: '1 day ago',
    progress: 40,
  },
  {
    id: 'CLM-2025-90412',
    type: 'Disability',
    facility: 'CMH Rawalpindi',
    date: '12 Nov 2025',
    amount: 'PKR 120,000',
    status: 'Rejected',
    assignedTo: 'Reason: Pre-existing condition',
    lastUpdate: '5 months ago',
    progress: 100,
  },
];

const progressColor = (status) => {
  if (status === 'Approved') return T.commitGreen;
  if (status === 'Rejected') return T.error;
  if (status === 'Action Required') return T.goldAccent;
  return T.stateBlue;
};

export default function TrackClaims({ onNavigate }) {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'In Review', 'Approved', 'Action Required', 'Rejected'];

  const filtered = filter === 'All' ? SAMPLE_CLAIMS : SAMPLE_CLAIMS.filter(c => c.status === filter);

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '24px',
      }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: T.primaryNavy, marginBottom: '4px' }}>
            My Claims
          </h1>
          <p style={{ fontSize: '14px', color: T.textMuted }}>
            Track the status and history of all your submitted claims.
          </p>
        </div>
        <Button variant="primary" onClick={() => onNavigate('single-claim')}>
          + New Claim
        </Button>
      </div>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
        {[
          { label: 'Total Claims', value: 4, icon: '📋', color: T.primaryNavy },
          { label: 'In Review', value: 1, icon: '🔄', color: T.stateBlue },
          { label: 'Approved', value: 1, icon: '✅', color: T.commitGreen },
          { label: 'Action Required', value: 1, icon: '⚠️', color: T.goldAccent },
        ].map(stat => (
          <div key={stat.label} style={{
            background: T.cardSurface,
            border: `1px solid ${T.borderLight}`,
            borderRadius: '12px',
            padding: '16px 18px',
            boxShadow: 'var(--shadow-card)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '20px' }}>{stat.icon}</span>
              <span style={{ fontSize: '12px', color: T.textMuted, fontWeight: 500 }}>{stat.label}</span>
            </div>
            <div style={{
              fontSize: '28px', fontWeight: 800, color: stat.color,
              animation: 'countUp 0.4s ease',
            }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex', gap: '8px', marginBottom: '18px', flexWrap: 'wrap',
      }}>
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              height: '32px', padding: '0 14px',
              borderRadius: '6px', border: `1px solid ${filter === f ? T.primaryNavy : T.borderLight}`,
              background: filter === f ? T.primaryNavy : T.cardSurface,
              color: filter === f ? '#fff' : T.textSecondary,
              fontSize: '12px', fontWeight: 600,
              fontFamily: 'var(--font-family)',
              cursor: 'pointer', transition: 'all 0.15s ease',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Claims Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filtered.map((claim, i) => (
          <div
            key={claim.id}
            style={{
              background: T.cardSurface,
              border: `1px solid ${T.borderLight}`,
              borderRadius: '12px',
              padding: '20px 22px',
              boxShadow: 'var(--shadow-card)',
              animation: `fadeIn 0.3s ease ${i * 0.07}s both`,
              transition: 'box-shadow 0.2s, transform 0.15s',
              cursor: 'default',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'var(--shadow-card)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '15px', color: T.primaryNavy }}>{claim.id}</span>
                  <Badge status={claim.status} />
                </div>
                <div style={{ fontSize: '13px', color: T.textSecondary }}>
                  {claim.type} · {claim.facility}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 800, fontSize: '16px', color: T.primaryNavy }}>{claim.amount}</div>
                <div style={{ fontSize: '11px', color: T.textMuted }}>Claim Amount</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontSize: '11px', color: T.textMuted }}>{claim.assignedTo}</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: progressColor(claim.status) }}>
                  {claim.progress}%
                </span>
              </div>
              <div style={{ height: '5px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${claim.progress}%`,
                  background: progressColor(claim.status),
                  borderRadius: '3px',
                  transition: 'width 1s ease',
                }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: T.textMuted }}>
                📅 Submitted: {claim.date} · Updated: {claim.lastUpdate}
              </span>
              {claim.status === 'Action Required' && (
                <Button variant="danger" size="sm">Upload Missing Docs</Button>
              )}
              {claim.status === 'Approved' && (
                <span style={{ fontSize: '12px', fontWeight: 600, color: T.commitGreen }}>
                  ✅ Payout: {claim.payoutDate}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
