// import React, { useState } from 'react';
// import { T } from '../../tokens';
// import Badge from '../../components/UI/Badge';
// import KPICard from '../../components/UI/KPICard';

// const WORK_QUEUE = [
//   { id: 'CLM-2026-48821', type: 'Hospitalization',  subscriber: 'Jawad Saleem',     amount: 'PKR 45,000',  risk: 'Low Risk',    slaHours: 2,  priority: 1, status: 'In Review',       assignee: 'Ahmed Malik' },
//   { id: 'CLM-2026-39901', type: 'Accidental Death', subscriber: 'Fatima Noor',      amount: 'PKR 500,000', risk: 'High Risk',   slaHours: 0,  priority: 1, status: 'Action Required', assignee: 'Unassigned' },
//   { id: 'CLM-2026-35612', type: 'Device Protection',subscriber: 'Bilal Ahmed',      amount: 'PKR 22,000',  risk: 'Low Risk',    slaHours: 18, priority: 2, status: 'In Review',       assignee: 'Sara Khan' },
//   { id: 'CLM-2026-31100', type: 'Disability',       subscriber: 'Usama Tariq',      amount: 'PKR 120,000', risk: 'Medium Risk', slaHours: 5,  priority: 2, status: 'In Review',       assignee: 'Ahmed Malik' },
//   { id: 'CLM-2026-28844', type: 'Hospitalization',  subscriber: 'Ayesha Siddiqui',  amount: 'PKR 78,000',  risk: 'Low Risk',    slaHours: 24, priority: 3, status: 'Pending',         assignee: 'Unassigned' },
//   { id: 'CLM-2026-22003', type: 'Accidental Death', subscriber: 'Rehan Javed',      amount: 'PKR 500,000', risk: 'High Risk',   slaHours: 1,  priority: 1, status: 'In Review',       assignee: 'Sara Khan' },
//   { id: 'CLM-2026-18200', type: 'Hospitalization',  subscriber: 'Zainab Mirza',     amount: 'PKR 33,500',  risk: 'Low Risk',    slaHours: 48, priority: 3, status: 'In Review',       assignee: 'Unassigned' },
// ];

// // ── SVG Icons ─────────────────────────────────────────────────────────────────
// const IcoQueue = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
//     <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
//   </svg>
// );
// const IcoBreach = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.error} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
//   </svg>
// );
// const IcoCritical = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.goldAccent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
//     <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
//   </svg>
// );
// const IcoUser = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
//   </svg>
// );

// function SLATimer({ hours }) {
//   const isBreach   = hours <= 0;
//   const isCritical = hours > 0 && hours <= 3;
//   const color = isBreach ? T.error : isCritical ? T.goldAccent : T.commitGreen;
//   return (
//     <span style={{
//       fontFamily: 'monospace', fontWeight: 700, fontSize: '12px', color,
//       animation: isBreach ? 'slaFlash 1s ease infinite' : 'none',
//       background: `${color}15`, padding: '4px 8px', borderRadius: '4px',
//     }}>
//       {isBreach ? 'BREACH' : `${hours}h left`}
//     </span>
//   );
// }

// function Avatar({ name }) {
//   const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2);
//   const hash     = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
//   const colors   = ['#f87171', '#60a5fa', '#34d399', '#a78bfa', '#fb923c'];
//   return (
//     <div style={{
//       width: 32, height: 32, borderRadius: '50%',
//       background: colors[hash % colors.length], color: '#fff',
//       display: 'flex', alignItems: 'center', justifyContent: 'center',
//       fontSize: '12px', fontWeight: 700,
//     }}>
//       {initials}
//     </div>
//   );
// }

// export default function ClaimsWorkQueue({ onNavigate }) {
//   const [selected, setSelected] = useState(null);
//   const [activeTab, setActiveTab] = useState('All');
//   const [search, setSearch]       = useState('');

//   const counts = {
//     total:     WORK_QUEUE.length,
//     breach:    WORK_QUEUE.filter(c => c.slaHours <= 0).length,
//     critical:  WORK_QUEUE.filter(c => c.slaHours > 0 && c.slaHours <= 3).length,
//     unassigned:WORK_QUEUE.filter(c => c.assignee === 'Unassigned').length,
//   };

//   const tabs = ['All', 'Unassigned', 'Action Required', 'In Review'];

//   const filtered = WORK_QUEUE.filter(c => {
//     if (activeTab === 'Unassigned'      && c.assignee !== 'Unassigned')        return false;
//     if (activeTab === 'Action Required' && c.status   !== 'Action Required')   return false;
//     if (activeTab === 'In Review'       && c.status   !== 'In Review')         return false;
//     if (search) {
//       const q = search.toLowerCase();
//       return c.id.toLowerCase().includes(q) || c.subscriber.toLowerCase().includes(q);
//     }
//     return true;
//   });

//   return (
//     <div style={{ animation: 'fadeIn 0.3s ease' }}>

//       {/* Page Title */}
//       <div style={{ marginBottom: '24px' }}>
//         <h1 style={{ fontSize: '22px', fontWeight: 800, color: T.primaryNavy, marginBottom: '4px' }}>Claims Work Queue</h1>
//         <p style={{ fontSize: '13px', color: T.textMuted }}>
//           Prioritized queue sorted by SLA urgency and risk score. {counts.breach} SLA breach{counts.breach !== 1 ? 'es' : ''} active.
//         </p>
//       </div>

//       {/* ── KPI Cards ── */}
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
//         <KPICard icon={<IcoQueue />}    label="Total in Queue" sublabel="Live"      value={counts.total}      trendText="+8.4%"  trendUp={true}  />
//         <KPICard icon={<IcoBreach />}   label="SLA Breached"   sublabel="Active"    value={counts.breach}     trendText="1 breach" trendUp={false} />
//         <KPICard icon={<IcoCritical />} label="Critical"       sublabel="≤ 3h left" value={counts.critical}   trendText="+2 today" trendUp={false} />
//         <KPICard icon={<IcoUser />}     label="Unassigned"     sublabel="Pending"   value={counts.unassigned} trendText="-5%"    trendUp={true}  />
//       </div>

//       {/* ── Table Section ── */}
//       <div style={{
//         background: T.cardSurface, border: `1px solid ${T.borderLight}`,
//         borderRadius: '16px', overflow: 'hidden',
//         boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
//       }}>
//         {/* Table Controls */}
//         <div style={{
//           display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//           padding: '20px 24px', borderBottom: `1px solid ${T.borderLight}`,
//         }}>
//           <h2 style={{ fontSize: '17px', fontWeight: 700, color: T.textPrimary, margin: 0 }}>All Claims</h2>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//             <div style={{ position: 'relative' }}>
//               <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: T.textMuted, display: 'flex' }}>
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
//                 </svg>
//               </span>
//               <input
//                 type="text" placeholder="Search claims, subscribers..."
//                 value={search} onChange={e => setSearch(e.target.value)}
//                 style={{
//                   height: '36px', width: '240px', padding: '0 16px 0 36px',
//                   borderRadius: '8px', border: `1px solid ${T.borderLight}`,
//                   background: T.pageCanvas, fontSize: '13px', outline: 'none',
//                   fontFamily: 'var(--font-family)',
//                 }}
//               />
//             </div>
//             <div style={{ display: 'flex', background: T.pageCanvas, padding: '4px', borderRadius: '10px' }}>
//               {tabs.map(tab => (
//                 <button key={tab} onClick={() => setActiveTab(tab)} style={{
//                   padding: '6px 14px', borderRadius: '6px',
//                   fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer',
//                   background: activeTab === tab ? '#fff' : 'transparent',
//                   color: activeTab === tab ? T.primaryNavy : T.textSecondary,
//                   boxShadow: activeTab === tab ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
//                   transition: 'all 0.2s ease', fontFamily: 'var(--font-family)',
//                 }}>{tab}</button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Table Header */}
//         <div style={{
//           display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr 1fr 0.5fr',
//           padding: '0 24px', height: '42px',
//           borderBottom: `1px solid ${T.borderLight}`, alignItems: 'center', gap: '16px',
//         }}>
//           {['Claim ID', 'Subscriber', 'Amount', 'Status', 'SLA Status', 'Assignee', 'Action'].map(h => (
//             <span key={h} style={{ fontSize: '11px', fontWeight: 600, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</span>
//           ))}
//         </div>

//         {/* Rows */}
//         {filtered.map((claim, i) => (
//           <div
//             key={claim.id}
//             style={{
//               display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr 1fr 0.5fr',
//               padding: '0 24px', height: '64px', alignItems: 'center', gap: '16px',
//               borderBottom: i < filtered.length - 1 ? `1px solid ${T.borderLight}` : 'none',
//               background: selected === claim.id ? '#f8fafc' : 'transparent',
//               cursor: 'pointer', transition: 'background 0.15s',
//               animation: `fadeIn 0.3s ease ${i * 0.04}s both`,
//             }}
//             onMouseEnter={e => { if (selected !== claim.id) e.currentTarget.style.background = '#f8fafc'; }}
//             onMouseLeave={e => { if (selected !== claim.id) e.currentTarget.style.background = 'transparent'; }}
//             onClick={() => { setSelected(claim.id); onNavigate('assessment'); }}
//           >
//             <div>
//               <div style={{ fontWeight: 600, fontSize: '13px', color: T.textPrimary }}>{claim.id}</div>
//               <div style={{ fontSize: '11px', color: T.textMuted }}>{claim.type}</div>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//               <Avatar name={claim.subscriber} />
//               <div>
//                 <div style={{ fontSize: '13px', fontWeight: 600, color: T.textPrimary }}>{claim.subscriber}</div>
//                 <div style={{ fontSize: '11px', color: T.textMuted }}>{claim.subscriber.toLowerCase().replace(' ', '.')}@adamjee.com</div>
//               </div>
//             </div>
//             <span style={{ fontSize: '13px', fontWeight: 600, color: T.textPrimary }}>{claim.amount}</span>
//             <Badge status={claim.status} size="sm" />
//             <SLATimer hours={claim.slaHours} />
//             <span style={{ fontSize: '13px', fontWeight: 500, color: claim.assignee === 'Unassigned' ? T.textMuted : T.textPrimary, fontStyle: claim.assignee === 'Unassigned' ? 'italic' : 'normal' }}>
//               {claim.assignee}
//             </span>
//             <div style={{ display: 'flex', justifyContent: 'flex-start', color: T.textMuted, fontSize: '18px', fontWeight: 'bold', paddingLeft: '8px' }}>
//               <span style={{ cursor: 'pointer', letterSpacing: '1px' }}>···</span>
//             </div>
//           </div>
//         ))}

//         {filtered.length === 0 && (
//           <div style={{ padding: '40px', textAlign: 'center', color: T.textMuted, fontSize: '14px' }}>
//             No claims found matching the criteria.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { T } from '../../tokens';
import Badge from '../../components/UI/Badge';
import KPICard from '../../components/UI/KPICard';

const WORK_QUEUE = [
  { id: 'CLM-2026-48821', member: 'Jawad Saleem',    policy: 'EFU-POL-88213', benefit: 'IPD', settlement: 'Cashless',      provider: 'Aga Khan University Hospital', amount: 'PKR 45,000',  priority: 'Normal', status: 'Pending Assessment',        slaHours: 2,  assignee: 'Ahmed Malik' },
  { id: 'CLM-2026-39901', member: 'Fatima Noor',     policy: 'EFU-POL-91027', benefit: 'IPD', settlement: 'Reimbursement', provider: 'Liaquat National Hospital',    amount: 'PKR 500,000', priority: 'High',   status: 'Action Required',           slaHours: 0,  assignee: 'Unassigned' },
  { id: 'CLM-2026-35612', member: 'Bilal Ahmed',     policy: 'EFU-POL-77410', benefit: 'OPD', settlement: 'Reimbursement', provider: 'City Medical Centre',           amount: 'PKR 22,000',  priority: 'Normal', status: 'In Review',                 slaHours: 18, assignee: 'Sara Khan' },
  { id: 'CLM-2026-31100', member: 'Usama Tariq',     policy: 'EFU-POL-55210', benefit: 'IPD', settlement: 'Reimbursement', provider: 'South City Hospital',           amount: 'PKR 120,000', priority: 'High',   status: 'Awaiting Checker',          slaHours: 5,  assignee: 'Ahmed Malik' },
  { id: 'CLM-2026-28844', member: 'Ayesha Siddiqui', policy: 'EFU-POL-10934', benefit: 'IPD', settlement: 'Reimbursement', provider: "Doctors Hospital, Lahore",      amount: 'PKR 78,000',  priority: 'Normal', status: 'Awaiting Checker',          slaHours: 24, assignee: 'Sara Khan' },
  { id: 'CLM-2026-22003', member: 'Rehan Javed',     policy: 'EFU-POL-33400', benefit: 'IPD', settlement: 'Cashless',      provider: 'Hameed Latif Hospital',         amount: 'PKR 250,000', priority: 'High',   status: 'Pending Pre-Authorization', slaHours: 1,  assignee: 'Unassigned' },
  { id: 'CLM-2026-18200', member: 'Zainab Mirza',    policy: 'EFU-POL-04400', benefit: 'OPD', settlement: 'Cashless',      provider: 'Shifa International Hospital',  amount: 'PKR 15,000',  priority: 'Normal', status: 'Pending Assessment',        slaHours: 48, assignee: 'Unassigned' },
  { id: 'CLM-2026-12987', member: 'Hina Sheikh',     policy: 'EFU-POL-09112', benefit: 'IPD', settlement: 'Reimbursement', provider: 'Liaquat National Hospital',     amount: 'PKR 62,000',  priority: 'Normal', status: 'Approved',                  slaHours: 40, assignee: 'Sara Khan' },
];

const BENEFIT_TYPES = ['IPD', 'OPD'];
const SETTLEMENT_TYPES = ['Cashless', 'Reimbursement'];
const STATUSES = ['Pending Pre-Authorization', 'Pending Assessment', 'In Review', 'Action Required', 'Awaiting Checker', 'Approved', 'Rejected', 'Referred'];
const ASSIGNEES = ['Ahmed Malik', 'Sara Khan', 'Unassigned'];

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const IcoQueue = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);
const IcoPreAuth = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.stateBlue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IcoAssessment = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const IcoAction = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.goldAccent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const IcoChecker = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.commitGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

function SLATimer({ hours }) {
  const isBreach   = hours <= 0;
  const isCritical = hours > 0 && hours <= 3;
  const color = isBreach ? T.error : isCritical ? T.goldAccent : T.commitGreen;
  return (
    <span style={{
      fontFamily: 'monospace', fontWeight: 700, fontSize: '11.5px', color,
      animation: isBreach ? 'slaFlash 1s ease infinite' : 'none',
      background: `${color}15`, padding: '3px 7px', borderRadius: '4px',
    }}>
      {isBreach ? 'BREACH' : `${hours}h left`}
    </span>
  );
}

function Avatar({ name }) {
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2);
  const hash     = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const colors   = ['#f87171', '#60a5fa', '#34d399', '#a78bfa', '#fb923c'];
  return (
    <div style={{
      width: 30, height: 30, borderRadius: '50%',
      background: colors[hash % colors.length], color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '11px', fontWeight: 700, flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

function FilterSelect({ value, onChange, options, placeholder }) {
  return (
    <select
      value={value} onChange={e => onChange(e.target.value)}
      style={{
        height: '34px', padding: '0 8px', borderRadius: '8px',
        border: `1px solid ${T.borderLight}`, background: T.pageCanvas,
        fontSize: '12px', fontWeight: 600, color: T.textPrimary,
        outline: 'none', fontFamily: 'var(--font-family)', cursor: 'pointer',
      }}
    >
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

export default function ClaimsWorkQueue({ onNavigate }) {
  const [selected, setSelected] = useState(null);
  const [search, setSearch]     = useState('');
  const [benefitFilter, setBenefitFilter]       = useState('');
  const [settlementFilter, setSettlementFilter] = useState('');
  const [statusFilter, setStatusFilter]         = useState('');
  const [assigneeFilter, setAssigneeFilter]     = useState('');

  const counts = {
    requiringAction:  WORK_QUEUE.filter(c => ['Action Required', 'Pending Assessment', 'Pending Pre-Authorization', 'Awaiting Checker'].includes(c.status)).length,
    preAuth:          WORK_QUEUE.filter(c => c.status === 'Pending Pre-Authorization').length,
    pendingAssessment:WORK_QUEUE.filter(c => c.status === 'Pending Assessment').length,
    actionRequired:   WORK_QUEUE.filter(c => c.status === 'Action Required').length,
    awaitingChecker:  WORK_QUEUE.filter(c => c.status === 'Awaiting Checker').length,
  };

  const filtered = WORK_QUEUE.filter(c => {
    if (benefitFilter && c.benefit !== benefitFilter) return false;
    if (settlementFilter && c.settlement !== settlementFilter) return false;
    if (statusFilter && c.status !== statusFilter) return false;
    if (assigneeFilter && c.assignee !== assigneeFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return c.id.toLowerCase().includes(q) || c.member.toLowerCase().includes(q) || c.policy.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>

      {/* Page Title */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: T.primaryNavy, marginBottom: '4px' }}>Claims Work Queue</h1>
        <p style={{ fontSize: '13px', color: T.textMuted }}>
          EFU Life Health Claims (IPD / OPD) requiring assessor or checker action across pre-authorization and reimbursement pathways.
        </p>
      </div>

      {/* ── KPI Cards (work-requiring-attention, not approved/rejected totals) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', marginBottom: '28px' }}>
        <KPICard icon={<IcoQueue />}      label="Claims Requiring Action"   value={counts.requiringAction} />
        <KPICard icon={<IcoPreAuth />}    label="Pending Pre-Authorization" value={counts.preAuth} />
        <KPICard icon={<IcoAssessment />} label="Pending Assessment"       value={counts.pendingAssessment} />
        <KPICard icon={<IcoAction />}     label="Action Required"          value={counts.actionRequired} />
        <KPICard icon={<IcoChecker />}    label="Awaiting Checker"         value={counts.awaitingChecker} />
      </div>

      {/* ── Table Section ── */}
      <div style={{
        background: T.cardSurface, border: `1px solid ${T.borderLight}`,
        borderRadius: '16px', overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
      }}>
        {/* Table Controls / Filters */}
        <div style={{
          display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between', gap: '10px',
          padding: '18px 24px', borderBottom: `1px solid ${T.borderLight}`,
        }}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: T.textPrimary, margin: 0 }}>All Claims</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: T.textMuted, display: 'flex' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </span>
              <input
                type="text" placeholder="Claim ID, member, policy..."
                value={search} onChange={e => setSearch(e.target.value)}
                style={{
                  height: '34px', width: '210px', padding: '0 14px 0 34px',
                  borderRadius: '8px', border: `1px solid ${T.borderLight}`,
                  background: T.pageCanvas, fontSize: '12.5px', outline: 'none',
                  fontFamily: 'var(--font-family)',
                }}
              />
            </div>
            <FilterSelect value={benefitFilter} onChange={setBenefitFilter} options={BENEFIT_TYPES} placeholder="Benefit" />
            <FilterSelect value={settlementFilter} onChange={setSettlementFilter} options={SETTLEMENT_TYPES} placeholder="Settlement" />
            <FilterSelect value={statusFilter} onChange={setStatusFilter} options={STATUSES} placeholder="Status" />
            <FilterSelect value={assigneeFilter} onChange={setAssigneeFilter} options={ASSIGNEES} placeholder="Assignee" />
          </div>
        </div>

        {/* Table Header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.2fr 0.6fr 1fr 1.3fr 0.9fr 0.7fr 1.3fr 0.8fr 0.5fr',
          padding: '0 24px', height: '42px',
          borderBottom: `1px solid ${T.borderLight}`, alignItems: 'center', gap: '10px',
        }}>
          {['Claim', 'Member', 'Benefit', 'Settlement', 'Provider', 'Amount', 'Priority', 'Status', 'SLA', ''].map(h => (
            <span key={h} style={{ fontSize: '10.5px', fontWeight: 600, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</span>
          ))}
        </div>

        {/* Rows */}
        {filtered.map((claim, i) => (
          <div
            key={claim.id}
            style={{
              display: 'grid', gridTemplateColumns: '1fr 1.2fr 0.6fr 1fr 1.3fr 0.9fr 0.7fr 1.3fr 0.8fr 0.5fr',
              padding: '0 24px', height: '62px', alignItems: 'center', gap: '10px',
              borderBottom: i < filtered.length - 1 ? `1px solid ${T.borderLight}` : 'none',
              background: selected === claim.id ? '#f8fafc' : 'transparent',
              cursor: 'pointer', transition: 'background 0.15s',
              animation: `fadeIn 0.3s ease ${i * 0.04}s both`,
            }}
            onMouseEnter={e => { if (selected !== claim.id) e.currentTarget.style.background = '#f8fafc'; }}
            onMouseLeave={e => { if (selected !== claim.id) e.currentTarget.style.background = 'transparent'; }}
            onClick={() => { setSelected(claim.id); onNavigate('assessment'); }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: '13px', color: T.textPrimary }}>{claim.id}</div>
              <div style={{ fontSize: '10.5px', color: T.textMuted }}>{claim.policy}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Avatar name={claim.member} />
              <div style={{ fontSize: '12.5px', fontWeight: 600, color: T.textPrimary }}>{claim.member}</div>
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: T.primaryNavy }}>{claim.benefit}</span>
            <span style={{
              fontSize: '11.5px', fontWeight: 700,
              color: claim.settlement === 'Cashless' ? T.stateBlue : T.goldAccent,
            }}>
              {claim.settlement}
            </span>
            <span style={{ fontSize: '12px', color: T.textSecondary }}>{claim.provider}</span>
            <span style={{ fontSize: '12.5px', fontWeight: 600, color: T.textPrimary }}>{claim.amount}</span>
            <span style={{
              fontSize: '11.5px', fontWeight: 700,
              color: claim.priority === 'High' ? T.error : T.textMuted,
            }}>
              {claim.priority}
            </span>
            <Badge status={['Pending Pre-Authorization', 'Pending Assessment', 'Awaiting Checker'].includes(claim.status) ? 'Pending' : claim.status} size="sm" />
            <SLATimer hours={claim.slaHours} />
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: T.stateBlue }}>View</span>
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