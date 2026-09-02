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
    currentStage: 2, // 0-indexed: 0=Submitted,1=Validated,2=Assessment,3=Decision,4=Payout
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
    currentStage: 4,
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
    currentStage: 1,
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
    currentStage: 3,
  },
];

const STAGES = ['Submitted', 'Validated', 'Assessment', 'Decision', 'Payout'];

const stageColor = (status) => {
  if (status === 'Approved') return T.commitGreen;
  if (status === 'Rejected') return T.error;
  if (status === 'Action Required') return T.goldAccent;
  return T.stateBlue;
};

export default function TrackClaims({ onNavigate }) {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'In Review', 'Approved', 'Action Required', 'Rejected'];
  const filtered = filter === 'All' ? SAMPLE_CLAIMS : SAMPLE_CLAIMS.filter(c => c.status === filter);

  const counts = {
    total:    SAMPLE_CLAIMS.length,
    inReview: SAMPLE_CLAIMS.filter(c => c.status === 'In Review').length,
    approved: SAMPLE_CLAIMS.filter(c => c.status === 'Approved').length,
    action:   SAMPLE_CLAIMS.filter(c => c.status === 'Action Required').length,
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: T.primaryNavy, marginBottom: '4px' }}>My Claims</h1>
          <p style={{ fontSize: '14px', color: T.textMuted }}>Track the status and history of all your submitted claims.</p>
        </div>
        <Button variant="primary" onClick={() => onNavigate('single-claim')}>+ New Claim</Button>
      </div>

      {/* KPI Cards — WorkQueue style */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {[
          { label: 'Total Claims',    value: counts.total,    trendText: 'all time',     trendIcon: null,  trendColor: T.textMuted,  color: T.primaryNavy },
          { label: 'In Review',       value: counts.inReview, trendText: 'active',       trendIcon: '→',   trendColor: T.stateBlue,  color: T.stateBlue },
          { label: 'Approved',        value: counts.approved, trendText: 'disbursed',    trendIcon: '↑',   trendColor: T.commitGreen,color: T.commitGreen },
          { label: 'Action Required', value: counts.action,   trendText: 'needs docs',   trendIcon: '!',   trendColor: T.goldAccent, color: T.goldAccent },
        ].map(kpi => (
          <div key={kpi.label} style={{
            background: T.cardSurface, border: `1px solid ${T.borderLight}`,
            borderRadius: '16px', padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            display: 'flex', flexDirection: 'column', gap: '8px',
          }}>
            <div style={{ fontSize: '32px', fontWeight: 800, color: T.textPrimary, lineHeight: 1 }}>{kpi.value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              {kpi.trendIcon && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '2px',
                  fontSize: '11px', fontWeight: 700, color: kpi.trendColor,
                  background: `${kpi.trendColor}18`, padding: '4px 6px', borderRadius: '6px',
                }}>
                  {kpi.trendIcon} {kpi.trendText}
                </span>
              )}
              {!kpi.trendIcon && (
                <span style={{ fontSize: '12px', color: T.textMuted }}>{kpi.trendText}</span>
              )}
            </div>
            <div style={{ fontSize: '13px', color: T.textSecondary, fontWeight: 500, marginTop: '2px' }}>{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', flexWrap: 'wrap' }}>
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
          >{f}</button>
        ))}
      </div>

      {/* Claims Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filtered.map((claim, i) => {
          const activeColor = stageColor(claim.status);
          return (
            <div
              key={claim.id}
              style={{
                background: T.cardSurface,
                border: `1px solid ${T.borderLight}`,
                borderRadius: '14px',
                padding: '20px 24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                animation: `fadeIn 0.3s ease ${i * 0.07}s both`,
                transition: 'box-shadow 0.2s, transform 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              {/* Card Top Row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
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

              {/* Stage Progress Timeline */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {STAGES.map((stage, idx) => {
                    const isDone    = idx <= claim.currentStage;
                    const isActive  = idx === claim.currentStage;
                    const dotColor  = isDone ? activeColor : T.borderDefault;
                    const lineColor = idx < claim.currentStage ? activeColor : T.borderLight;

                    return (
                      <React.Fragment key={stage}>
                        {/* Node */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                          <div style={{
                            width: isActive ? 14 : 10,
                            height: isActive ? 14 : 10,
                            borderRadius: '50%',
                            background: isDone ? dotColor : T.cardSurface,
                            border: `2px solid ${dotColor}`,
                            boxShadow: isActive ? `0 0 0 4px ${activeColor}28` : 'none',
                            transition: 'all 0.3s ease',
                          }} />
                          <span style={{
                            fontSize: '10px', marginTop: '6px',
                            color: isDone ? activeColor : T.textMuted,
                            fontWeight: isActive ? 700 : isDone ? 600 : 400,
                            whiteSpace: 'nowrap',
                          }}>{stage}</span>
                        </div>

                        {/* Connector line between nodes */}
                        {idx < STAGES.length - 1 && (
                          <div style={{
                            flex: 1,
                            height: '2px',
                            marginBottom: '14px', // align with dots not labels
                            background: lineColor,
                            transition: 'background 0.5s ease',
                          }} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Card Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: T.textMuted }}>
                  Submitted: {claim.date} · Updated: {claim.lastUpdate}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '12px', color: T.textSecondary }}>{claim.assignedTo}</span>
                  {claim.status === 'Action Required' && (
                    <Button variant="danger" size="sm">Upload Missing Docs</Button>
                  )}
                  {claim.status === 'Approved' && (
                    <span style={{ fontSize: '12px', fontWeight: 700, color: T.commitGreen }}>
                      Payout: {claim.payoutDate}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
