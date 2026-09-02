import React from 'react';
import { T } from '../../tokens';

const crossModuleData = {
  team1: [
    { label: 'Benefit Cap (Hospitalization)', value: 'PKR 500,000 / year' },
    { label: 'Annual Balance Remaining', value: 'PKR 455,000' },
    { label: 'Device Protection Cap', value: 'PKR 80,000' },
    { label: 'Waiting Period (Pre-existing)', value: '12 months — Elapsed ✓' },
    { label: 'Co-pay / Deductible', value: '10% (Min PKR 2,000)' },
  ],
  team2: [
    { label: 'Policy Status', value: 'Active', highlight: true },
    { label: 'Policy Number', value: 'AL-TPA-2024-08842' },
    { label: 'Effective Date', value: '01 March 2024' },
    { label: 'Renewal Date', value: '28 February 2027' },
    { label: 'Covered Dependents', value: 'Spouse + 2 Children' },
    { label: 'Subscriber ID', value: '03XX-XXXX-1234' },
  ],
  team3: [
    { label: 'Premium Payment Status', value: 'Settled / Up-to-Date', highlight: true },
    { label: 'Last Premium Date', value: '01 August 2026' },
    { label: 'Outstanding Balance', value: 'PKR 0.00' },
    { label: 'Payment Method', value: 'Direct Debit — Telco Bundle' },
  ],
};

function DataRow({ label, value, highlight }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      padding: '7px 0',
      borderBottom: `1px solid ${T.borderLight}`,
      gap: '12px',
    }}>
      <span style={{ fontSize: '12px', color: T.textMuted, flex: 1 }}>{label}</span>
      <span style={{
        fontSize: '12px', fontWeight: 600,
        color: highlight ? T.commitGreen : T.textPrimary,
        textAlign: 'right', flex: 1,
      }}>{value}</span>
    </div>
  );
}

function Section({ title, source, items }) {
  return (
    <div style={{
      background: T.cardSurface,
      border: `1px solid ${T.borderLight}`,
      borderRadius: '10px',
      marginBottom: '10px',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '10px 14px',
        background: T.pageCanvas,
        borderBottom: `1px solid ${T.borderLight}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontWeight: 700, fontSize: '12px', color: T.primaryNavy }}>{title}</span>
        <span style={{
          fontSize: '10px', fontWeight: 600, color: T.textMuted,
          background: '#e8edf2', padding: '2px 8px', borderRadius: '4px',
        }}>READ-ONLY · {source}</span>
      </div>
      <div style={{ padding: '4px 14px 8px' }}>
        {items.map((item, i) => (
          <DataRow key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

export default function CrossModulePanel() {
  return (
    <div>
      <Section
        title="📦 Product Rules & Benefit Limits"
        source="Team 1"
        items={crossModuleData.team1}
      />
      <Section
        title="📋 Policy Lifecycle & Coverage"
        source="Team 2"
        items={crossModuleData.team2}
      />
      <Section
        title="💳 Finance & Premium Status"
        source="Team 3"
        items={crossModuleData.team3}
      />
    </div>
  );
}
