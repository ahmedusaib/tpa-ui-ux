import React, { useState } from 'react';
import { T } from '../../tokens';
import Badge from '../../components/UI/Badge';

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
      fontFamily: 'monospace', fontWeight: 700, fontSize: '12px',
      color,
      animation: isBreach ? 'slaFlash 1s ease infinite' : 'none',
      background: `${color}15`,
      padding: '4px 8px',
      borderRadius: '4px',
    }}>
      {isBreach ? 'BREACH' : `${hours}h left`}
    </span>
  );
}

function Avatar({ name }) {
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2);
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colors = ['#f87171', '#60a5fa', '#34d399', '#a78bfa', '#fb923c'];
  const bgColor = colors[hash % colors.length];

  return (
    <div style={{
      width: '32px', height: '32px', borderRadius: '50%',
      background: bgColor, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '12px', fontWeight: 700,
      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)'
    }}>
      {initials}
    </div>
  );
}

export default function ClaimsWorkQueue({ onNavigate }) {
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  const counts = {
    total: WORK_QUEUE.length,
    breach: WORK_QUEUE.filter(c => c.slaHours <= 0).length,
    critical: WORK_QUEUE.filter(c => c.slaHours > 0 && c.slaHours <= 3).length,
    unassigned: WORK_QUEUE.filter(c => c.assignee === 'Unassigned').length,
  };

  const tabs = ['All', 'Unassigned', 'Action Required', 'In Review'];

  const filtered = WORK_QUEUE.filter(c => {
    if (activeTab === 'Unassigned' && c.assignee !== 'Unassigned') return false;
    if (activeTab === 'Action Required' && c.status !== 'Action Required') return false;
    if (activeTab === 'In Review' && c.status !== 'In Review') return false;
    
    if (search) {
      const q = search.toLowerCase();
      return c.id.toLowerCase().includes(q) || c.subscriber.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      
      {/* KPI Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Total in Queue', value: counts.total, trendText: '+8.4%', trendIcon: '↑', trendColor: T.commitGreen, vs: 'vs yesterday' },
          { label: 'SLA Breached', value: counts.breach, trendText: '-2%', trendIcon: '↓', trendColor: T.commitGreen, vs: 'needs action' },
          { label: 'Critical (≤3h)', value: counts.critical, trendText: '+11%', trendIcon: '↑', trendColor: T.error, vs: 'vs yesterday' },
          { label: 'Unassigned', value: counts.unassigned, trendText: '-5%', trendIcon: '↓', trendColor: T.commitGreen, vs: 'vs yesterday' },
        ].map(kpi => (
          <div key={kpi.label} style={{
            background: T.cardSurface, border: `1px solid ${T.borderLight}`,
            borderRadius: '16px', padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            display: 'flex', flexDirection: 'column', gap: '8px'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 800, color: T.textPrimary, lineHeight: 1 }}>{kpi.value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '2px',
                fontSize: '11px', fontWeight: 700, color: kpi.trendColor,
                background: `${kpi.trendColor}15`, padding: '4px 6px', borderRadius: '6px'
              }}>
                <span style={{ fontSize: '12px' }}>{kpi.trendIcon}</span> {kpi.trendText}
              </span>
              <span style={{ fontSize: '12px', color: T.textMuted }}>{kpi.vs}</span>
            </div>
            <div style={{ fontSize: '13px', color: T.textSecondary, fontWeight: 500, marginTop: '2px' }}>{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div style={{
        background: T.cardSurface, border: `1px solid ${T.borderLight}`,
        borderRadius: '16px', overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
      }}>
        {/* Table Controls */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px', borderBottom: `1px solid ${T.borderLight}`
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: T.textPrimary, margin: 0 }}>All Claims</h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Search Bar */}
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: T.textMuted, fontSize: '14px' }}>🔍</span>
              <input
                type="text"
                placeholder="Search claims, subscribers..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  height: '36px', width: '240px', padding: '0 16px 0 36px',
                  borderRadius: '8px', border: `1px solid ${T.borderLight}`,
                  background: T.pageCanvas, fontSize: '13px', outline: 'none'
                }}
              />
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', background: T.pageCanvas, padding: '4px', borderRadius: '10px' }}>
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '6px 14px', borderRadius: '6px',
                    fontSize: '13px', fontWeight: 600,
                    border: 'none', cursor: 'pointer',
                    background: activeTab === tab ? '#fff' : 'transparent',
                    color: activeTab === tab ? T.primaryNavy : T.textSecondary,
                    boxShadow: activeTab === tab ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr 1fr 0.5fr',
          padding: '0 24px', height: '48px',
          background: T.cardSurface,
          borderBottom: `1px solid ${T.borderLight}`,
          alignItems: 'center',
          gap: '16px',
        }}>
          {['Claim ID', 'Subscriber', 'Amount', 'Status', 'SLA Status', 'Assignee', 'Action'].map(h => (
            <span key={h} style={{
              fontSize: '12px', fontWeight: 600, color: T.textMuted,
            }}>{h}</span>
          ))}
        </div>

        {/* Rows */}
        {filtered.map((claim, i) => (
          <div
            key={claim.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr 1fr 0.5fr',
              padding: '0 24px', height: '64px',
              alignItems: 'center', gap: '16px',
              borderBottom: i < filtered.length - 1 ? `1px solid ${T.borderLight}` : 'none',
              background: selected === claim.id ? '#f8fafc' : 'transparent',
              cursor: 'pointer',
              transition: 'background 0.15s',
              animation: `fadeIn 0.3s ease ${i * 0.04}s both`,
            }}
            onMouseEnter={e => { if (selected !== claim.id) e.currentTarget.style.background = '#f8fafc'; }}
            onMouseLeave={e => { if (selected !== claim.id) e.currentTarget.style.background = 'transparent'; }}
            onClick={() => { setSelected(claim.id); onNavigate('assessment'); }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: '13px', color: T.textPrimary }}>{claim.id}</div>
              <div style={{ fontSize: '12px', color: T.textMuted }}>{claim.type}</div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Avatar name={claim.subscriber} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: T.textPrimary }}>{claim.subscriber}</div>
                <div style={{ fontSize: '12px', color: T.textMuted }}>{claim.subscriber.toLowerCase().replace(' ', '.')}@example.com</div>
              </div>
            </div>

            <span style={{ fontSize: '13px', fontWeight: 600, color: T.textPrimary }}>{claim.amount}</span>
            
            <div>
              <Badge status={claim.status} size="sm" />
            </div>

            <div>
              <SLATimer hours={claim.slaHours} />
            </div>

            <span style={{
              fontSize: '13px', fontWeight: 500,
              color: claim.assignee === 'Unassigned' ? T.textMuted : T.textPrimary,
              fontStyle: claim.assignee === 'Unassigned' ? 'italic' : 'normal'
            }}>
              {claim.assignee}
            </span>
            
            <div style={{ display: 'flex', justifyContent: 'flex-start', color: T.textMuted, fontSize: '18px', fontWeight: 'bold', paddingLeft: '8px' }}>
              <span style={{ cursor: 'pointer' }}>···</span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: T.textMuted, fontSize: '14px' }}>
            No claims found matching the criteria.
          </div>
        )}
      </div>
    </div>
  );
}
