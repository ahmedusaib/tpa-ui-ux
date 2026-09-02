import React, { useState, useEffect } from 'react';
import { T } from '../../tokens';
import Badge from '../../components/UI/Badge';
import Button from '../../components/UI/Button';

const WORK_QUEUE = [
  { id: 'CLM-2026-48821', type: 'Hospitalization',  subscriber: 'Jawad Saleem',     amount: 'PKR 45,000',  risk: 'Low Risk',    slaHours: 2,  priority: 1, status: 'In Review',      assignee: 'Ahmed Malik' },
  { id: 'CLM-2026-39901', type: 'Accidental Death', subscriber: 'Fatima Noor',      amount: 'PKR 500,000', risk: 'High Risk',   slaHours: 0,  priority: 1, status: 'Action Required',assignee: 'Unassigned' },
  { id: 'CLM-2026-35612', type: 'Device Protection',subscriber: 'Bilal Ahmed',      amount: 'PKR 22,000',  risk: 'Low Risk',    slaHours: 18, priority: 2, status: 'In Review',      assignee: 'Sara Khan' },
  { id: 'CLM-2026-31100', type: 'Disability',       subscriber: 'Usama Tariq',      amount: 'PKR 120,000', risk: 'Medium Risk', slaHours: 5,  priority: 2, status: 'In Review',      assignee: 'Ahmed Malik' },
  { id: 'CLM-2026-28844', type: 'Hospitalization',  subscriber: 'Ayesha Siddiqui',  amount: 'PKR 78,000',  risk: 'Low Risk',    slaHours: 24, priority: 3, status: 'Pending',        assignee: 'Unassigned' },
  { id: 'CLM-2026-22003', type: 'Accidental Death', subscriber: 'Rehan Javed',      amount: 'PKR 500,000', risk: 'High Risk',   slaHours: 1,  priority: 1, status: 'In Review',      assignee: 'Sara Khan' },
  { id: 'CLM-2026-18200', type: 'Hospitalization',  subscriber: 'Zainab Mirza',     amount: 'PKR 33,500',  risk: 'Low Risk',    slaHours: 48, priority: 3, status: 'In Review',      assignee: 'Unassigned' },
];

function SLATimer({ hours }) {
  const isBreach = hours <= 0;
  const isCritical = hours > 0 && hours <= 3;
  const color = isBreach ? T.error : isCritical ? T.goldAccent : T.commitGreen;

  return (
    <span style={{
      fontFamily: 'monospace', fontWeight: 700, fontSize: '13px',
      color,
      animation: isBreach ? 'slaFlash 1s ease infinite' : 'none',
    }}>
      {isBreach ? '🔴 BREACH' : isCritical ? `⚠️ ${hours}h left` : `✅ ${hours}h left`}
    </span>
  );
}

export default function ClaimsWorkQueue({ onNavigate }) {
  const [selected, setSelected] = useState(null);
  const [sortBy, setSortBy] = useState('priority');

  const sorted = [...WORK_QUEUE].sort((a, b) => {
    if (sortBy === 'priority') return a.priority - b.priority;
    if (sortBy === 'sla') return a.slaHours - b.slaHours;
    if (sortBy === 'amount') return parseInt(b.amount.replace(/\D/g, '')) - parseInt(a.amount.replace(/\D/g, ''));
    return 0;
  });

  const counts = {
    total: WORK_QUEUE.length,
    breach: WORK_QUEUE.filter(c => c.slaHours <= 0).length,
    critical: WORK_QUEUE.filter(c => c.slaHours > 0 && c.slaHours <= 3).length,
    unassigned: WORK_QUEUE.filter(c => c.assignee === 'Unassigned').length,
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: T.primaryNavy, marginBottom: '4px' }}>
            Claims Work Queue
          </h1>
          <p style={{ fontSize: '13px', color: T.textMuted }}>
            Prioritized queue sorted by SLA urgency and risk score. {counts.breach} SLA breach{counts.breach !== 1 ? 'es' : ''} active.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{
              height: '36px', padding: '0 12px', borderRadius: '8px',
              border: `1px solid ${T.borderDefault}`,
              fontFamily: 'var(--font-family)', fontSize: '13px', fontWeight: 500,
              background: T.cardSurface, cursor: 'pointer', outline: 'none',
            }}
          >
            <option value="priority">Sort: Priority</option>
            <option value="sla">Sort: SLA Remaining</option>
            <option value="amount">Sort: Claim Amount</option>
          </select>
        </div>
      </div>

      {/* Summary KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
        {[
          { label: 'Total in Queue', value: counts.total, icon: '📋', color: T.primaryNavy, bg: '#eff6ff' },
          { label: 'SLA Breached', value: counts.breach, icon: '🔴', color: T.error, bg: T.errorBg },
          { label: 'Critical (≤3h)', value: counts.critical, icon: '⚠️', color: T.goldAccent, bg: '#fff7ed' },
          { label: 'Unassigned', value: counts.unassigned, icon: '👤', color: '#7c3aed', bg: '#faf5ff' },
        ].map(kpi => (
          <div key={kpi.label} style={{
            background: T.cardSurface, border: `1px solid ${T.borderLight}`,
            borderRadius: '10px', padding: '14px 16px',
            borderLeft: `4px solid ${kpi.color}`,
            boxShadow: 'var(--shadow-card)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <span style={{ fontSize: '16px' }}>{kpi.icon}</span>
              <span style={{ fontSize: '11px', color: T.textMuted, fontWeight: 500 }}>{kpi.label}</span>
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: kpi.color }}>{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Data Table */}
      <div style={{
        background: T.cardSurface, border: `1px solid ${T.borderLight}`,
        borderRadius: '12px', overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
      }}>
        {/* Table Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr 1.2fr 0.8fr 0.8fr 1fr 0.8fr 1fr',
          padding: '0 16px', height: '42px',
          background: T.pageCanvas,
          borderBottom: `1px solid ${T.borderLight}`,
          alignItems: 'center',
          gap: '12px',
        }}>
          {['Claim ID', 'Type', 'Subscriber', 'Amount', 'Risk', 'SLA Status', 'Assignee', 'Action'].map(h => (
            <span key={h} style={{
              fontSize: '11px', fontWeight: 700, color: T.textMuted,
              textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>{h}</span>
          ))}
        </div>

        {/* Rows */}
        {sorted.map((claim, i) => (
          <div
            key={claim.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr 1.2fr 0.8fr 0.8fr 1fr 0.8fr 1fr',
              padding: '0 16px', height: '52px',
              alignItems: 'center', gap: '12px',
              borderBottom: i < sorted.length - 1 ? `1px solid ${T.borderLight}` : 'none',
              background: selected === claim.id ? '#eff6ff' : 'transparent',
              cursor: 'pointer',
              transition: 'background 0.15s',
              animation: `fadeIn 0.3s ease ${i * 0.04}s both`,
            }}
            onMouseEnter={e => { if (selected !== claim.id) e.currentTarget.style.background = T.pageCanvas; }}
            onMouseLeave={e => { if (selected !== claim.id) e.currentTarget.style.background = 'transparent'; }}
            onClick={() => setSelected(claim.id)}
          >
            <span style={{ fontWeight: 700, fontSize: '13px', color: T.primaryNavy }}>{claim.id}</span>
            <span style={{ fontSize: '12px', color: T.textSecondary }}>{claim.type}</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: T.textPrimary }}>{claim.subscriber}</span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: T.primaryNavy }}>{claim.amount}</span>
            <Badge status={claim.risk} size="sm" />
            <SLATimer hours={claim.slaHours} />
            <span style={{
              fontSize: '12px', fontWeight: 500,
              color: claim.assignee === 'Unassigned' ? T.error : T.textSecondary,
            }}>
              {claim.assignee}
            </span>
            <Button
              variant="stateBlue"
              size="sm"
              onClick={(e) => { e.stopPropagation(); onNavigate('assessment'); }}
            >
              Open →
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
