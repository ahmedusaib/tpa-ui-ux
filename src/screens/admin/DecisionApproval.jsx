// import React, { useState } from 'react';
// import { T } from '../../tokens';
// import Button from '../../components/UI/Button';
// import Badge from '../../components/UI/Badge';
// import Modal from '../../components/UI/Modal';

// // ── SVG Icon set (no emojis) ──────────────────────────────────────────────────
// const Ico = {
//   Doc: ({ color = 'currentColor' }) => (
//     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
//     </svg>
//   ),
//   Robot: ({ color = 'currentColor' }) => (
//     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
//     </svg>
//   ),
//   User: ({ color = 'currentColor' }) => (
//     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
//     </svg>
//   ),
//   Check: ({ color = 'currentColor' }) => (
//     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//       <polyline points="20 6 9 17 4 12"/>
//     </svg>
//   ),
//   Payout: ({ color = 'currentColor' }) => (
//     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
//     </svg>
//   ),
//   FileLink: ({ color = 'currentColor' }) => (
//     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
//     </svg>
//   ),
//   CircleCheck: ({ color = 'currentColor' }) => (
//     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
//     </svg>
//   ),
//   X: ({ color = 'currentColor' }) => (
//     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//       <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
//     </svg>
//   ),
// };

// // ── Workflow steps ────────────────────────────────────────────────────────────
// // currentStep = index of the ACTIVE step (0-based)
// const WORKFLOW_STEPS = [
//   { label: 'Claim Submitted',   sub: 'Subscriber Portal',     Icon: Ico.Doc,    color: T.stateBlue  },
//   { label: 'AI Assessment',     sub: 'Auto-adjudication',      Icon: Ico.Robot,  color: T.stateBlue  },
//   { label: 'Maker Review',      sub: 'Assessor Decision',      Icon: Ico.User,   color: T.primaryNavy},
//   { label: 'Checker Sign-off',  sub: 'Senior Authorization',   Icon: Ico.Check,  color: T.goldAccent, active: true },
//   { label: 'Payout Execution',  sub: 'Finance Disbursement',   Icon: Ico.Payout, color: T.commitGreen},
// ];
// const CURRENT_STEP_IDX = 3; // "Checker Sign-off" is where we are

// // ── Data ─────────────────────────────────────────────────────────────────────
// const PENDING_APPROVALS = [
//   {
//     id: 'CLM-2026-48821', type: 'Hospitalization', subscriber: 'Jawad Saleem',
//     amount: 45000, deductible: 4500, payable: 40500,
//     assessor: 'Ahmed Malik', makerDate: '02 Sep 2026, 09:14',
//     riskLevel: 'Low Risk', status: 'Awaiting Checker',
//     docs: ['hospital_bill_AKU.pdf', 'discharge_summary.pdf', 'cnic_copy.jpg'],
//   },
//   {
//     id: 'CLM-2026-31100', type: 'Disability', subscriber: 'Usama Tariq',
//     amount: 120000, deductible: 0, payable: 120000,
//     assessor: 'Sara Khan', makerDate: '01 Sep 2026, 14:32',
//     riskLevel: 'Medium Risk', status: 'Awaiting Checker',
//     docs: ['disability_cert.pdf', 'doctor_report.pdf'],
//   },
// ];

// export default function DecisionApproval() {
//   const [selected, setSelected]         = useState(null);
//   const [checkerNotes, setCheckerNotes] = useState('');
//   const [approvedIds, setApprovedIds]   = useState([]);
//   const [showModal, setShowModal]       = useState(false);
//   const [modalAction, setModalAction]   = useState('');

//   const claim   = PENDING_APPROVALS.find(c => c.id === selected);
//   const pending = PENDING_APPROVALS.filter(c => !approvedIds.includes(c.id));

//   const handleAction = (action) => { setModalAction(action); setShowModal(true); };
//   const confirmAction = () => {
//     if (modalAction === 'Approve') setApprovedIds(prev => [...prev, selected]);
//     setShowModal(false);
//     setSelected(null);
//   };

//   return (
//     <div style={{ animation: 'fadeIn 0.3s ease' }}>

//       {/* Page Title */}
//       <div style={{ marginBottom: '22px' }}>
//         <h1 style={{ fontSize: '22px', fontWeight: 800, color: T.primaryNavy, marginBottom: '4px' }}>
//           Decision & Approval Workstation
//         </h1>
//         <p style={{ fontSize: '13px', color: T.textMuted }}>
//           Maker-Checker sign-off workflow. Claims approved by Maker require Checker authorization before payout.
//         </p>
//       </div>

//       {/* ── Maker-Checker Workflow Timeline ─────────────────────────────────── */}
//       <div style={{
//         background: T.cardSurface, border: `1px solid ${T.borderLight}`,
//         borderRadius: '14px', padding: '20px 28px', marginBottom: '24px',
//         boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
//         overflowX: 'auto',
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           {WORKFLOW_STEPS.map((step, i) => {
//             const isDone   = i <= CURRENT_STEP_IDX;
//             const isActive = i === CURRENT_STEP_IDX;
//             const stepColor = isDone ? step.color : T.borderDefault;
//             const lineColor = i < CURRENT_STEP_IDX ? WORKFLOW_STEPS[i].color : T.borderLight;

//             return (
//               <React.Fragment key={step.label}>
//                 {/* Step Node */}
//                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '110px' }}>
//                   <div style={{
//                     width: 42, height: 42, borderRadius: '50%',
//                     background: isDone ? `${stepColor}18` : '#f1f5f9',
//                     border: `2px solid ${stepColor}`,
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                     marginBottom: '10px',
//                     boxShadow: isActive ? `0 0 0 6px ${stepColor}22` : 'none',
//                     transition: 'all 0.3s ease',
//                   }}>
//                     <step.Icon color={isDone ? step.color : T.borderDefault} />
//                   </div>
//                   <div style={{
//                     fontWeight: isActive ? 700 : isDone ? 600 : 400,
//                     fontSize: '12px',
//                     color: isDone ? step.color : T.textMuted,
//                     textAlign: 'center', lineHeight: 1.3,
//                   }}>
//                     {step.label}
//                   </div>
//                   <div style={{ fontSize: '10px', color: T.textMuted, textAlign: 'center', marginTop: '2px' }}>
//                     {step.sub}
//                   </div>
//                 </div>

//                 {/* Connector */}
//                 {i < WORKFLOW_STEPS.length - 1 && (
//                   <div style={{
//                     flex: 1, height: '2px',
//                     background: lineColor,
//                     margin: '0 4px 30px',
//                     transition: 'background 0.4s ease',
//                   }} />
//                 )}
//               </React.Fragment>
//             );
//           })}
//         </div>
//       </div>

//       {/* ── Pending Queue + Detail Panel ─────────────────────────────────────── */}
//       <div style={{ display: 'grid', gridTemplateColumns: pending.length && selected ? '1fr 1.1fr' : '1fr', gap: '16px' }}>

//         {/* Left: Pending Cards */}
//         <div>
//           <h3 style={{ fontSize: '14px', fontWeight: 700, color: T.primaryNavy, marginBottom: '12px' }}>
//             Pending Checker Authorization ({pending.length})
//           </h3>

//           {pending.length === 0 ? (
//             <div style={{
//               textAlign: 'center', padding: '40px',
//               background: T.cardSurface, borderRadius: '12px',
//               border: `1px solid ${T.borderLight}`,
//               display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
//             }}>
//               <div style={{
//                 width: 48, height: 48, borderRadius: '50%',
//                 background: `${T.commitGreen}15`,
//                 border: `2px solid ${T.commitGreen}`,
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//               }}>
//                 <Ico.Check color={T.commitGreen} />
//               </div>
//               <span style={{ fontSize: '14px', color: T.textMuted, fontWeight: 500 }}>
//                 All items signed off — queue is clear!
//               </span>
//             </div>
//           ) : (
//             pending.map((c, i) => (
//               <div
//                 key={c.id}
//                 onClick={() => setSelected(selected === c.id ? null : c.id)}
//                 style={{
//                   background: T.cardSurface,
//                   border: `1px solid ${selected === c.id ? T.primaryNavy : T.borderLight}`,
//                   borderRadius: '12px', padding: '16px',
//                   marginBottom: '10px', cursor: 'pointer',
//                   boxShadow: selected === c.id ? '0 0 0 3px rgba(15,76,122,0.1)' : '0 2px 8px rgba(0,0,0,0.02)',
//                   transition: 'all 0.18s ease',
//                   animation: `fadeIn 0.3s ease ${i * 0.1}s both`,
//                 }}
//                 onMouseEnter={e => { if (selected !== c.id) e.currentTarget.style.borderColor = T.borderDefault; }}
//                 onMouseLeave={e => { if (selected !== c.id) e.currentTarget.style.borderColor = T.borderLight; }}
//               >
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
//                   <div>
//                     <div style={{ fontWeight: 700, fontSize: '14px', color: T.primaryNavy }}>{c.id}</div>
//                     <div style={{ fontSize: '12px', color: T.textMuted, marginTop: '2px' }}>{c.type} · {c.subscriber}</div>
//                   </div>
//                   <Badge status={c.riskLevel} />
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <div>
//                     <div style={{ fontSize: '18px', fontWeight: 800, color: T.primaryNavy }}>
//                       PKR {c.payable.toLocaleString()}
//                     </div>
//                     <div style={{ fontSize: '11px', color: T.textMuted }}>
//                       Maker: {c.assessor} · {c.makerDate}
//                     </div>
//                   </div>
//                   <span style={{
//                     fontSize: '11px', fontWeight: 700,
//                     background: '#fff7ed', color: T.goldAccent,
//                     border: `1px solid #fed7aa`,
//                     padding: '4px 10px', borderRadius: '6px',
//                   }}>
//                     Awaiting Checker
//                   </span>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Right: Detail Panel */}
//         {selected && claim && (
//           <div style={{ animation: 'fadeIn 0.25s ease' }}>
//             <h3 style={{ fontSize: '14px', fontWeight: 700, color: T.primaryNavy, marginBottom: '12px' }}>
//               Checker Review — {selected}
//             </h3>
//             <div style={{
//               background: T.cardSurface, border: `1px solid ${T.borderLight}`,
//               borderRadius: '12px', padding: '20px',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
//             }}>
//               {/* Data Grid */}
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
//                 {[
//                   ['Subscriber',       claim.subscriber],
//                   ['Claim Type',       claim.type],
//                   ['Original Amount',  `PKR ${claim.amount.toLocaleString()}`],
//                   ['Deductible',       `PKR ${claim.deductible.toLocaleString()}`],
//                   ['Net Payable',      `PKR ${claim.payable.toLocaleString()}`],
//                   ['Assessed by',      claim.assessor],
//                 ].map(([l, v]) => (
//                   <div key={l} style={{ background: T.pageCanvas, borderRadius: '8px', padding: '10px 12px' }}>
//                     <div style={{ fontSize: '11px', color: T.textMuted, marginBottom: '2px' }}>{l}</div>
//                     <div style={{ fontSize: '13px', fontWeight: 700, color: T.textPrimary }}>{v}</div>
//                   </div>
//                 ))}
//               </div>

//               {/* Documents */}
//               <div style={{ marginBottom: '16px' }}>
//                 <div style={{ fontSize: '11px', fontWeight: 700, color: T.textMuted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
//                   Attached Documents
//                 </div>
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                   {claim.docs.map(doc => (
//                     <div key={doc} style={{
//                       display: 'flex', alignItems: 'center', gap: '8px',
//                       padding: '8px 12px', background: T.pageCanvas,
//                       borderRadius: '6px', fontSize: '12px',
//                     }}>
//                       <Ico.FileLink color={T.stateBlue} />
//                       <span style={{ color: T.stateBlue, fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>
//                         {doc}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Checker Notes */}
//               <div style={{ marginBottom: '16px' }}>
//                 <label style={{ fontSize: '12px', fontWeight: 600, color: T.textPrimary, display: 'block', marginBottom: '6px' }}>
//                   Checker Notes (Optional)
//                 </label>
//                 <textarea
//                   id="checker-notes"
//                   value={checkerNotes}
//                   onChange={e => setCheckerNotes(e.target.value)}
//                   placeholder="Add your authorization notes..."
//                   rows={3}
//                   style={{
//                     width: '100%', padding: '10px 12px',
//                     border: `1px solid ${T.borderDefault}`, borderRadius: '8px',
//                     fontFamily: 'var(--font-family)', fontSize: '13px',
//                     resize: 'none', outline: 'none',
//                   }}
//                 />
//               </div>

//               {/* Action Buttons */}
//               <div style={{ display: 'flex', gap: '10px' }}>
//                 <Button variant="commit" fullWidth onClick={() => handleAction('Approve')}>
//                   <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
//                     <Ico.CircleCheck color="#fff" /> Authorize & Initiate Payout
//                   </span>
//                 </Button>
//                 <Button variant="danger" fullWidth onClick={() => handleAction('Reject')}>
//                   <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
//                     <Ico.X color="#fff" /> Override Reject
//                   </span>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Confirmation Modal */}
//       <Modal open={showModal} onClose={() => setShowModal(false)} title={`Confirm ${modalAction}`} width="420px">
//         <p style={{ fontSize: '14px', color: T.textSecondary, marginBottom: '20px' }}>
//           {modalAction === 'Approve'
//             ? `You are authorizing payout of PKR ${claim?.payable?.toLocaleString()} for claim ${selected}. This action is irreversible.`
//             : `You are overriding the Maker's decision and rejecting claim ${selected}. A reason will be logged.`
//           }
//         </p>
//         <div style={{ display: 'flex', gap: '10px' }}>
//           <Button variant="secondary" fullWidth onClick={() => setShowModal(false)}>Cancel</Button>
//           <Button variant={modalAction === 'Approve' ? 'commit' : 'danger'} fullWidth onClick={confirmAction}>
//             <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
//               {modalAction === 'Approve'
//                 ? <><Ico.CircleCheck color="#fff" /> Confirm Authorization</>
//                 : <><Ico.X color="#fff" /> Confirm Rejection</>
//               }
//             </span>
//           </Button>
//         </div>
//       </Modal>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { T } from '../../tokens';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import Modal from '../../components/UI/Modal';

// ── SVG Icon set (no emojis) ──────────────────────────────────────────────────
const Ico = {
  Doc: ({ color = 'currentColor' }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
    </svg>
  ),
  Robot: ({ color = 'currentColor' }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  User: ({ color = 'currentColor' }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Check: ({ color = 'currentColor' }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Payout: ({ color = 'currentColor' }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  ),
  FileLink: ({ color = 'currentColor' }) => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
    </svg>
  ),
  CircleCheck: ({ color = 'currentColor' }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  X: ({ color = 'currentColor' }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
};

// ── Workflow steps ────────────────────────────────────────────────────────────
// currentStep = index of the ACTIVE step (0-based)
const WORKFLOW_STEPS = [
  { label: 'Claim Submitted',              sub: 'Hospital / Subscriber Portal',  Icon: Ico.Doc,    color: T.stateBlue  },
  { label: 'Automated Validation & AI',    sub: 'Team 1 + Team 2 + AI Assist',   Icon: Ico.Robot,  color: T.stateBlue  },
  { label: 'Maker Assessment',             sub: 'Assessor Decision',             Icon: Ico.User,   color: T.primaryNavy},
  { label: 'Checker Authorization',        sub: 'Senior Sign-off',               Icon: Ico.Check,  color: T.goldAccent, active: true },
  { label: 'Settlement Handoff',           sub: 'To Team 3 — Disbursement',      Icon: Ico.Payout, color: T.commitGreen},
];
const CURRENT_STEP_IDX = 3; // "Checker Authorization" is where we are

// ── Data ─────────────────────────────────────────────────────────────────────
const PENDING_APPROVALS = [
  {
    id: 'CLM-2026-48821', type: 'IPD', subscriber: 'Jawad Saleem', policy: 'EFU-POL-88213',
    amount: 45000, deductible: 4500, payable: 40500,
    assessor: 'Ahmed Malik', makerDate: '02 Sep 2026, 09:14',
    riskLevel: 'Low Risk', status: 'Awaiting Checker',
    docs: ['final_hospital_bill.pdf', 'discharge_summary.pdf', 'cnic_copy.jpg'],
  },
  {
    id: 'CLM-2026-31100', type: 'IPD', subscriber: 'Usama Tariq', policy: 'EFU-POL-55210',
    amount: 120000, deductible: 0, payable: 120000,
    assessor: 'Sara Khan', makerDate: '01 Sep 2026, 14:32',
    riskLevel: 'Medium Risk', status: 'Awaiting Checker',
    docs: ['final_hospital_bill.pdf', 'doctor_report.pdf'],
  },
];

export default function DecisionApproval() {
  const [selected, setSelected]         = useState(null);
  const [checkerNotes, setCheckerNotes] = useState('');
  const [approvedIds, setApprovedIds]   = useState([]);
  const [showModal, setShowModal]       = useState(false);
  const [modalAction, setModalAction]   = useState('');

  const claim   = PENDING_APPROVALS.find(c => c.id === selected);
  const pending = PENDING_APPROVALS.filter(c => !approvedIds.includes(c.id));

  const handleAction = (action) => { setModalAction(action); setShowModal(true); };
  const confirmAction = () => {
    if (modalAction === 'Approve') setApprovedIds(prev => [...prev, selected]);
    setShowModal(false);
    setSelected(null);
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>

      {/* Page Title */}
      <div style={{ marginBottom: '22px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: T.primaryNavy, marginBottom: '4px' }}>
          Decision & Approval Workstation
        </h1>
        <p style={{ fontSize: '13px', color: T.textMuted }}>
          Maker-Checker sign-off workflow. Claims approved by Maker require Checker authorization before settlement handoff to Team 3.
        </p>
      </div>

      {/* ── Maker-Checker Workflow Timeline ─────────────────────────────────── */}
      <div style={{
        background: T.cardSurface, border: `1px solid ${T.borderLight}`,
        borderRadius: '14px', padding: '20px 28px', marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        overflowX: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {WORKFLOW_STEPS.map((step, i) => {
            const isDone   = i <= CURRENT_STEP_IDX;
            const isActive = i === CURRENT_STEP_IDX;
            const stepColor = isDone ? step.color : T.borderDefault;
            const lineColor = i < CURRENT_STEP_IDX ? WORKFLOW_STEPS[i].color : T.borderLight;

            return (
              <React.Fragment key={step.label}>
                {/* Step Node */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '110px' }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%',
                    background: isDone ? `${stepColor}18` : '#f1f5f9',
                    border: `2px solid ${stepColor}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '10px',
                    boxShadow: isActive ? `0 0 0 6px ${stepColor}22` : 'none',
                    transition: 'all 0.3s ease',
                  }}>
                    <step.Icon color={isDone ? step.color : T.borderDefault} />
                  </div>
                  <div style={{
                    fontWeight: isActive ? 700 : isDone ? 600 : 400,
                    fontSize: '12px',
                    color: isDone ? step.color : T.textMuted,
                    textAlign: 'center', lineHeight: 1.3,
                  }}>
                    {step.label}
                  </div>
                  <div style={{ fontSize: '10px', color: T.textMuted, textAlign: 'center', marginTop: '2px' }}>
                    {step.sub}
                  </div>
                </div>

                {/* Connector */}
                {i < WORKFLOW_STEPS.length - 1 && (
                  <div style={{
                    flex: 1, height: '2px',
                    background: lineColor,
                    margin: '0 4px 30px',
                    transition: 'background 0.4s ease',
                  }} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── Pending Queue + Detail Panel ─────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: pending.length && selected ? '1fr 1.1fr' : '1fr', gap: '16px' }}>

        {/* Left: Pending Cards */}
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: T.primaryNavy, marginBottom: '12px' }}>
            Pending Checker Authorization ({pending.length})
          </h3>

          {pending.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '40px',
              background: T.cardSurface, borderRadius: '12px',
              border: `1px solid ${T.borderLight}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: `${T.commitGreen}15`,
                border: `2px solid ${T.commitGreen}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Ico.Check color={T.commitGreen} />
              </div>
              <span style={{ fontSize: '14px', color: T.textMuted, fontWeight: 500 }}>
                All items signed off — queue is clear!
              </span>
            </div>
          ) : (
            pending.map((c, i) => (
              <div
                key={c.id}
                onClick={() => setSelected(selected === c.id ? null : c.id)}
                style={{
                  background: T.cardSurface,
                  border: `1px solid ${selected === c.id ? T.primaryNavy : T.borderLight}`,
                  borderRadius: '12px', padding: '16px',
                  marginBottom: '10px', cursor: 'pointer',
                  boxShadow: selected === c.id ? '0 0 0 3px rgba(15,76,122,0.1)' : '0 2px 8px rgba(0,0,0,0.02)',
                  transition: 'all 0.18s ease',
                  animation: `fadeIn 0.3s ease ${i * 0.1}s both`,
                }}
                onMouseEnter={e => { if (selected !== c.id) e.currentTarget.style.borderColor = T.borderDefault; }}
                onMouseLeave={e => { if (selected !== c.id) e.currentTarget.style.borderColor = T.borderLight; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: T.primaryNavy }}>{c.id}</div>
                    <div style={{ fontSize: '12px', color: T.textMuted, marginTop: '2px' }}>{c.type} · {c.subscriber}</div>
                  </div>
                  <Badge status={c.riskLevel} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: T.primaryNavy }}>
                      PKR {c.payable.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '11px', color: T.textMuted }}>
                      Maker: {c.assessor} · {c.makerDate}
                    </div>
                  </div>
                  <span style={{
                    fontSize: '11px', fontWeight: 700,
                    background: '#fff7ed', color: T.goldAccent,
                    border: `1px solid #fed7aa`,
                    padding: '4px 10px', borderRadius: '6px',
                  }}>
                    Awaiting Checker
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right: Detail Panel */}
        {selected && claim && (
          <div style={{ animation: 'fadeIn 0.25s ease' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: T.primaryNavy, marginBottom: '12px' }}>
              Checker Review — {selected}
            </h3>
            <div style={{
              background: T.cardSurface, border: `1px solid ${T.borderLight}`,
              borderRadius: '12px', padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            }}>
              {/* Data Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                {[
                  ['Subscriber',       claim.subscriber],
                  ['Claim Type',       claim.type],
                  ['Original Amount',  `PKR ${claim.amount.toLocaleString()}`],
                  ['Deductible',       `PKR ${claim.deductible.toLocaleString()}`],
                  ['Net Payable',      `PKR ${claim.payable.toLocaleString()}`],
                  ['Assessed by',      claim.assessor],
                ].map(([l, v]) => (
                  <div key={l} style={{ background: T.pageCanvas, borderRadius: '8px', padding: '10px 12px' }}>
                    <div style={{ fontSize: '11px', color: T.textMuted, marginBottom: '2px' }}>{l}</div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: T.textPrimary }}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Documents */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: T.textMuted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Attached Documents
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {claim.docs.map(doc => (
                    <div key={doc} style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '8px 12px', background: T.pageCanvas,
                      borderRadius: '6px', fontSize: '12px',
                    }}>
                      <Ico.FileLink color={T.stateBlue} />
                      <span style={{ color: T.stateBlue, fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>
                        {doc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checker Notes */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: T.textPrimary, display: 'block', marginBottom: '6px' }}>
                  Checker Notes (Optional)
                </label>
                <textarea
                  id="checker-notes"
                  value={checkerNotes}
                  onChange={e => setCheckerNotes(e.target.value)}
                  placeholder="Add your authorization notes..."
                  rows={3}
                  style={{
                    width: '100%', padding: '10px 12px',
                    border: `1px solid ${T.borderDefault}`, borderRadius: '8px',
                    fontFamily: 'var(--font-family)', fontSize: '13px',
                    resize: 'none', outline: 'none',
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Button variant="commit" fullWidth onClick={() => handleAction('Approve')}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <Ico.CircleCheck color="#fff" /> Authorize & Hand Off to Settlement
                  </span>
                </Button>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button variant="secondary" fullWidth onClick={() => handleAction('Return')}>
                    ↩ Return to Maker
                  </Button>
                  <Button variant="danger" fullWidth onClick={() => handleAction('Reject')}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <Ico.X color="#fff" /> Override Reject
                    </span>
                  </Button>
                </div>
                {modalAction === '' && null}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title={`Confirm ${modalAction === 'Return' ? 'Return to Maker' : modalAction}`} width="420px">
        {modalAction === 'Return' && (
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: T.textPrimary, display: 'block', marginBottom: '6px' }}>
              Reason for Return <span style={{ color: T.error }}>*</span>
            </label>
            <textarea
              value={checkerNotes} onChange={e => setCheckerNotes(e.target.value)}
              placeholder="e.g. Please review co-pay calculation."
              rows={3}
              style={{ width: '100%', padding: '10px 12px', border: `1px solid ${T.borderDefault}`, borderRadius: '8px', fontFamily: 'var(--font-family)', fontSize: '13px', resize: 'none', outline: 'none' }}
            />
          </div>
        )}
        <p style={{ fontSize: '14px', color: T.textSecondary, marginBottom: '20px' }}>
          {modalAction === 'Approve'
            ? `You are authorizing claim ${selected} for PKR ${claim?.payable?.toLocaleString()} and handing it off to Team 3 for settlement. This action is irreversible.`
            : modalAction === 'Return'
            ? `Claim ${selected} will be sent back to the Maker for re-assessment. Status will change to "Returned to Maker".`
            : `You are overriding the Maker's decision and rejecting claim ${selected}. A reason will be logged.`
          }
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="secondary" fullWidth onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant={modalAction === 'Approve' ? 'commit' : modalAction === 'Return' ? 'secondary' : 'danger'} fullWidth onClick={confirmAction}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              {modalAction === 'Approve'
                ? <><Ico.CircleCheck color="#fff" /> Confirm Authorization</>
                : modalAction === 'Return'
                ? <>Confirm Return</>
                : <><Ico.X color="#fff" /> Confirm Rejection</>
              }
            </span>
          </Button>
        </div>
      </Modal>
    </div>
  );
}