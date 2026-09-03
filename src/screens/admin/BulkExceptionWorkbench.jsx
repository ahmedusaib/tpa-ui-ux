// import React, { useState } from 'react';
// import { T } from '../../tokens';
// import Button from '../../components/UI/Button';
// import Badge from '../../components/UI/Badge';
// import Modal from '../../components/UI/Modal';
// import KPICard from '../../components/UI/KPICard';

// const EXCEPTION_ROWS = [
//   { row: 1,  policyId: 'AL-TPA-XXXX-???', subscriber: 'Muhammad Ali',   amount: 'PKR 12,000', error: 'Invalid Policy ID',     errorDetail: 'Policy number format is invalid' },
//   { row: 2,  policyId: 'AL-TPA-2024-09921', subscriber: 'Farrukh Nabi',  amount: 'PKR 8,500',  error: 'Unreadable Document',  errorDetail: 'Attached image is too blurry to OCR' },
//   { row: 5,  policyId: 'AL-TPA-2022-33400', subscriber: 'Sana Mirza',    amount: 'PKR 55,000', error: 'Duplicate Claim',      errorDetail: 'Claim CLM-2026-22810 already filed for same incident date' },
//   { row: 8,  policyId: 'AL-TPA-2025-10120', subscriber: 'Ali Raza',      amount: 'PKR 3,200',  error: 'Invalid Policy ID',    errorDetail: 'Policy not found in core system' },
//   { row: 11, policyId: 'AL-TPA-2023-77800', subscriber: 'Hira Baig',     amount: 'PKR 28,000', error: 'Unreadable Document',  errorDetail: 'PDF appears corrupted — re-upload required' },
//   { row: 14, policyId: 'AL-TPA-2024-55210', subscriber: 'Kashif Latif',  amount: 'PKR 9,400',  error: 'Duplicate Claim',      errorDetail: 'Same subscriber, same date, same amount — suspected fraud flag' },
//   { row: 17, policyId: 'AL-TPA-2021-04400', subscriber: 'Zara Fatima',   amount: 'PKR 17,700', error: 'Invalid Policy ID',    errorDetail: 'Policy expired on 01 Jan 2026' },
//   { row: 22, policyId: 'AL-TPA-2026-10934', subscriber: 'Imran Siddiq',  amount: 'PKR 6,000',  error: 'Unreadable Document',  errorDetail: 'CNIC scan not visible — low contrast' },
//   { row: 28, policyId: 'AL-TPA-2023-88200', subscriber: 'Nadia Khan',    amount: 'PKR 42,500', error: 'Duplicate Claim',      errorDetail: 'Claim within 30-day waiting period' },
//   { row: 30, policyId: 'AL-TPA-XXXX-???',  subscriber: 'Tariq Mehmood', amount: 'PKR 14,000', error: 'Invalid Policy ID',    errorDetail: 'Policy ID missing required TPA prefix' },
// ];

// const IcoBatch = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
//   </svg>
// );
// const IcoValid = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.commitGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
//   </svg>
// );
// const IcoError = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.error} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
//   </svg>
// );
// const IcoWrench = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.goldAccent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
//   </svg>
// );

// export default function BulkExceptionWorkbench() {
//   const [fixModal, setFixModal] = useState(null); // row index
//   const [resolved, setResolved] = useState([]);
//   const [editValues, setEditValues] = useState({});

//   const openFix = (row) => {
//     setEditValues({
//       policyId: row.policyId,
//       subscriber: row.subscriber,
//       amount: row.amount,
//     });
//     setFixModal(row.row);
//   };

//   const handleResolve = () => {
//     setResolved(prev => [...prev, fixModal]);
//     setFixModal(null);
//   };

//   const exceptionRow = EXCEPTION_ROWS.find(r => r.row === fixModal);

//   return (
//     <div style={{ animation: 'fadeIn 0.3s ease' }}>
//       {/* Header */}
//       <div style={{ marginBottom: '22px' }}>
//         <h1 style={{ fontSize: '22px', fontWeight: 800, color: T.primaryNavy, marginBottom: '4px' }}>
//           Bulk Intimation Exception Workbench
//         </h1>
//         <p style={{ fontSize: '13px', color: T.textMuted }}>
//           Resolve corrupted or invalid records from the batch upload before re-submitting to the claims queue.
//         </p>
//       </div>

//       {/* ── KPI Cards matching reference ── */}
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
//         <KPICard icon={<IcoBatch />}  label="Total Uploaded" sublabel="Batch Total"  value={250}             trendText="batch total" trendUp={null} />
//         <KPICard icon={<IcoValid />}  label="Valid Records"  sublabel="Ready"        value={240}             trendText="ready"       trendUp={true} />
//         <KPICard icon={<IcoError />}  label="Exceptions"     sublabel="Needs Review" value={10}              trendText="needs review"trendUp={false} />
//         <KPICard icon={<IcoWrench />} label="Resolved"       sublabel="Fixed"        value={resolved.length} trendText="fixed"       trendUp={resolved.length > 0 ? true : null} />
//       </div>

//       {/* Progress Bar */}
//       {resolved.length > 0 && (
//         <div style={{ marginBottom: '18px', animation: 'fadeIn 0.3s ease' }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
//             <span style={{ fontSize: '12px', fontWeight: 600, color: T.textPrimary }}>
//               Exception Resolution Progress
//             </span>
//             <span style={{ fontSize: '12px', fontWeight: 700, color: T.commitGreen }}>
//               {resolved.length}/10 resolved
//             </span>
//           </div>
//           <div style={{ height: '7px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
//             <div style={{
//               height: '100%', width: `${(resolved.length / 10) * 100}%`,
//               background: `linear-gradient(90deg, ${T.commitGreen}, #00c968)`,
//               borderRadius: '4px', transition: 'width 0.5s ease',
//             }} />
//           </div>
//         </div>
//       )}

//       {/* Exception Table */}
//       <div style={{
//         background: T.cardSurface, border: `1px solid ${T.borderLight}`,
//         borderRadius: '12px', overflow: 'hidden',
//         boxShadow: 'var(--shadow-card)',
//       }}>
//         {/* Table Header */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: '60px 1fr 1.2fr 0.8fr 1.2fr 1.4fr 1fr',
//           padding: '0 16px', height: '42px',
//           background: T.pageCanvas,
//           borderBottom: `1px solid ${T.borderLight}`,
//           alignItems: 'center', gap: '12px',
//         }}>
//           {['Row #', 'Policy ID', 'Subscriber', 'Amount', 'Error Type', 'Error Detail', 'Action'].map(h => (
//             <span key={h} style={{ fontSize: '11px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
//               {h}
//             </span>
//           ))}
//         </div>

//         {/* Rows */}
//         {EXCEPTION_ROWS.map((row, i) => {
//           const isResolved = resolved.includes(row.row);
//           return (
//             <div
//               key={row.row}
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: '60px 1fr 1.2fr 0.8fr 1.2fr 1.4fr 1fr',
//                 padding: '0 16px', height: '52px',
//                 alignItems: 'center', gap: '12px',
//                 borderBottom: i < EXCEPTION_ROWS.length - 1 ? `1px solid ${T.borderLight}` : 'none',
//                 background: isResolved ? '#f0fdf4' : 'transparent',
//                 opacity: isResolved ? 0.65 : 1,
//                 transition: 'all 0.25s ease',
//                 animation: `fadeIn 0.3s ease ${i * 0.05}s both`,
//               }}
//             >
//               <span style={{ fontSize: '12px', fontWeight: 700, color: T.textMuted }}>#{row.row}</span>
//               <span style={{
//                 fontSize: '12px', fontWeight: 600,
//                 color: row.policyId.includes('???') ? T.error : T.textPrimary,
//                 fontFamily: 'monospace',
//               }}>{row.policyId}</span>
//               <span style={{ fontSize: '13px', fontWeight: 500, color: T.textPrimary }}>{row.subscriber}</span>
//               <span style={{ fontSize: '13px', fontWeight: 700, color: T.primaryNavy }}>{row.amount}</span>
//               <Badge status={row.error} size="sm" />
//               <span style={{ fontSize: '11px', color: T.textMuted, lineHeight: 1.3 }}>{row.errorDetail}</span>
//               {isResolved ? (
//                 <span style={{ fontSize: '12px', fontWeight: 700, color: T.commitGreen }}>Resolved</span>
//               ) : (
//                 <Button
//                   id={`fix-btn-row-${row.row}`}
//                   variant="stateBlue"
//                   size="sm"
//                   onClick={() => openFix(row)}
//                 >
//                   Fix & Resubmit
//                 </Button>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* All resolved banner */}
//       {resolved.length === EXCEPTION_ROWS.length && (
//         <div style={{
//           marginTop: '20px', padding: '18px 24px',
//           background: '#f0fdf4', border: `1px solid ${T.commitGreen}`,
//           borderRadius: '12px', textAlign: 'center',
//           animation: 'fadeIn 0.4s ease',
//         }}>
//           <div style={{ fontWeight: 700, fontSize: '16px', color: T.commitGreen }}>All exceptions resolved!</div>
//           <div style={{ fontSize: '13px', color: T.textMuted, marginTop: '4px' }}>
//             10 records corrected and re-submitted to the Claims Work Queue.
//           </div>
//         </div>
//       )}

//       {/* Fix Modal */}
//       <Modal
//         open={!!fixModal}
//         onClose={() => setFixModal(null)}
//         title={`Fix Exception — Row #${fixModal}`}
//         width="520px"
//       >
//         {exceptionRow && (
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
//             {/* Error Info */}
//             <div style={{
//               padding: '12px 14px', background: T.errorBg,
//               border: `1px solid #fecaca`, borderRadius: '8px',
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
//                 <Badge status={exceptionRow.error} />
//               </div>
//               <div style={{ fontSize: '13px', color: T.error }}>{exceptionRow.errorDetail}</div>
//             </div>

//             {/* Editable Fields */}
//             {[
//               { label: 'Policy ID', key: 'policyId', placeholder: 'e.g. AL-TPA-2024-XXXXX' },
//               { label: 'Subscriber Name', key: 'subscriber', placeholder: 'Full name' },
//               { label: 'Claim Amount', key: 'amount', placeholder: 'e.g. PKR 12,000' },
//             ].map(field => (
//               <div key={field.key}>
//                 <label style={{ fontSize: '13px', fontWeight: 600, color: T.textPrimary, display: 'block', marginBottom: '5px' }}>
//                   {field.label}
//                 </label>
//                 <input
//                   type="text"
//                   value={editValues[field.key] || ''}
//                   onChange={e => setEditValues(prev => ({ ...prev, [field.key]: e.target.value }))}
//                   placeholder={field.placeholder}
//                   style={{
//                     width: '100%', height: '42px', padding: '0 14px',
//                     border: `1px solid ${T.borderDefault}`, borderRadius: '8px',
//                     fontFamily: 'var(--font-family)', fontSize: '14px', outline: 'none',
//                   }}
//                   onFocus={e => e.target.style.borderColor = T.stateBlue}
//                   onBlur={e => e.target.style.borderColor = T.borderDefault}
//                 />
//               </div>
//             ))}

//             <div style={{
//               padding: '12px 14px', background: '#eff6ff',
//               border: '1px solid #bfdbfe', borderRadius: '8px',
//               fontSize: '13px', color: T.stateBlue,
//             }}>
//               After correction, this record will be re-validated and added to the Claims Work Queue.
//             </div>

//             <div style={{ display: 'flex', gap: '10px' }}>
//               <Button variant="secondary" fullWidth onClick={() => setFixModal(null)}>Cancel</Button>
//               <Button variant="primary" fullWidth onClick={handleResolve}>
//                 Correct & Re-submit
//               </Button>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { T } from '../../tokens';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import Modal from '../../components/UI/Modal';
import KPICard from '../../components/UI/KPICard';

// Exception categories per spec: Data Validation, Eligibility, Document, Duplicate/Risk
const EXCEPTION_ROWS = [
  { row: 1,  policyId: 'EFU-POL-XXXXX', member: 'Muhammad Ali',   amount: 'PKR 12,000', category: 'data',       error: 'Invalid Policy Number', errorDetail: 'Policy number format is invalid' },
  { row: 2,  policyId: 'EFU-POL-09921', member: 'Farrukh Nabi',   amount: 'PKR 8,500',  category: 'document',   error: 'Unreadable Document',   errorDetail: 'Attached image is too blurry to OCR' },
  { row: 5,  policyId: 'EFU-POL-33400', member: 'Sana Mirza',     amount: 'PKR 55,000', category: 'duplicate',  error: 'Possible Duplicate',    errorDetail: 'Matches existing claim CLM-2026-22810 — same date & amount' },
  { row: 8,  policyId: 'EFU-POL-10120', member: 'Ali Raza',       amount: 'PKR 3,200',  category: 'data',       error: 'Invalid Policy Number', errorDetail: 'Policy not found in core system' },
  { row: 11, policyId: 'EFU-POL-77800', member: 'Hira Baig',      amount: 'PKR 28,000', category: 'document',   error: 'Corrupted File',        errorDetail: 'PDF appears corrupted — re-upload required' },
  { row: 14, policyId: 'EFU-POL-55210', member: 'Kashif Latif',   amount: 'PKR 9,400',  category: 'duplicate',  error: 'Potential Anomaly',     errorDetail: 'Same subscriber, same date, same amount — suspected fraud flag' },
  { row: 17, policyId: 'EFU-POL-04400', member: 'Zara Fatima',    amount: 'PKR 17,700', category: 'eligibility',error: 'Policy Expired',        errorDetail: 'Policy expired on 01 Jan 2026' },
  { row: 22, policyId: 'EFU-POL-10934', member: 'Imran Siddiq',   amount: 'PKR 6,000',  category: 'document',   error: 'Unreadable Document',   errorDetail: 'CNIC scan not visible — low contrast' },
  { row: 28, policyId: 'EFU-POL-88200', member: 'Nadia Khan',     amount: 'PKR 42,500', category: 'eligibility',error: 'Member Not Covered',    errorDetail: 'Claimant is not a registered dependent on this policy' },
  { row: 30, policyId: 'EFU-POL-XXXXX', member: 'Tariq Mehmood',  amount: 'PKR 14,000', category: 'data',       error: 'Missing Policy Number', errorDetail: 'Policy Number field was left blank in the CSV row' },
];

const CATEGORY_ACTION = {
  data:        { label: 'Search & Correct',      icon: '🔍' },
  eligibility: { label: 'Review Eligibility',     icon: '📋' },
  document:    { label: 'Request Replacement',    icon: '📎' },
  duplicate:   { label: 'Compare & Resolve',      icon: '⚖️' },
};

const IcoBatch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
  </svg>
);
const IcoValid = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.commitGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const IcoError = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.error} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);
const IcoWrench = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.goldAccent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);

// Mock "found policy" for the search/correct flow
const MATCHED_POLICY = { number: 'EFU-POL-09921', member: 'Farrukh Nabi', status: 'Active' };
// Mock existing claim for duplicate comparison
const EXISTING_CLAIM = { id: 'CLM-2026-22810', member: 'Sana Mirza', date: '22 Aug 2026', amount: 'PKR 55,000', provider: 'Aga Khan University Hospital' };

export default function BulkExceptionWorkbench() {
  const [drawerRow, setDrawerRow] = useState(null);
  const [resolved, setResolved] = useState([]);
  const [policySearch, setPolicySearch] = useState('');
  const [policyFound, setPolicyFound] = useState(false);
  const [policyConfirmed, setPolicyConfirmed] = useState(false);

  const openDrawer = (row) => {
    setDrawerRow(row.row);
    setPolicySearch('');
    setPolicyFound(false);
    setPolicyConfirmed(false);
  };

  const resolve = () => { setResolved(prev => [...prev, drawerRow]); setDrawerRow(null); };

  const exceptionRow = EXCEPTION_ROWS.find(r => r.row === drawerRow);

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      {/* Header */}
      <div style={{ marginBottom: '22px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: T.primaryNavy, marginBottom: '4px' }}>
          Bulk Exception Workbench
        </h1>
        <p style={{ fontSize: '13px', color: T.textMuted }}>
          Resolve exceptions from the batch upload before records re-enter the Claims Work Queue.
        </p>
      </div>

      {/* ── KPI Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <KPICard icon={<IcoBatch />}  label="Total Uploaded" value={250} />
        <KPICard icon={<IcoValid />}  label="Valid Records"  value={240} />
        <KPICard icon={<IcoError />}  label="Exceptions"     value={10} />
        <KPICard icon={<IcoWrench />} label="Resolved"       value={resolved.length} />
      </div>

      {/* Progress Bar */}
      {resolved.length > 0 && (
        <div style={{ marginBottom: '18px', animation: 'fadeIn 0.3s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: T.textPrimary }}>Exception Resolution Progress</span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: T.commitGreen }}>{resolved.length}/10 resolved</span>
          </div>
          <div style={{ height: '7px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(resolved.length / 10) * 100}%`, background: `linear-gradient(90deg, ${T.commitGreen}, #00c968)`, borderRadius: '4px', transition: 'width 0.5s ease' }} />
          </div>
        </div>
      )}

      {/* Exception Table */}
      <div style={{ background: T.cardSurface, border: `1px solid ${T.borderLight}`, borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr 1.1fr 0.8fr 1.2fr 1.5fr 1.1fr', padding: '0 16px', height: '42px', background: T.pageCanvas, borderBottom: `1px solid ${T.borderLight}`, alignItems: 'center', gap: '12px' }}>
          {['Row #', 'Policy Number', 'Member', 'Amount', 'Exception', 'Detail', 'Action'].map(h => (
            <span key={h} style={{ fontSize: '11px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</span>
          ))}
        </div>

        {EXCEPTION_ROWS.map((row, i) => {
          const isResolved = resolved.includes(row.row);
          const action = CATEGORY_ACTION[row.category];
          return (
            <div key={row.row} style={{
              display: 'grid', gridTemplateColumns: '50px 1fr 1.1fr 0.8fr 1.2fr 1.5fr 1.1fr',
              padding: '0 16px', height: '54px', alignItems: 'center', gap: '12px',
              borderBottom: i < EXCEPTION_ROWS.length - 1 ? `1px solid ${T.borderLight}` : 'none',
              background: isResolved ? '#f0fdf4' : 'transparent', opacity: isResolved ? 0.6 : 1,
              transition: 'all 0.25s ease', animation: `fadeIn 0.3s ease ${i * 0.05}s both`,
            }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: T.textMuted }}>#{row.row}</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: row.policyId.includes('XXXXX') ? T.error : T.textPrimary, fontFamily: 'monospace' }}>{row.policyId}</span>
              <span style={{ fontSize: '13px', fontWeight: 500, color: T.textPrimary }}>{row.member}</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: T.primaryNavy }}>{row.amount}</span>
              <Badge status={row.error} size="sm" />
              <span style={{ fontSize: '11px', color: T.textMuted, lineHeight: 1.3 }}>{row.errorDetail}</span>
              {isResolved ? (
                <span style={{ fontSize: '12px', fontWeight: 700, color: T.commitGreen }}>✓ Resolved</span>
              ) : (
                <Button variant="stateBlue" size="sm" onClick={() => openDrawer(row)}>
                  {action.icon} {action.label}
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {resolved.length === EXCEPTION_ROWS.length && (
        <div style={{ marginTop: '20px', padding: '18px 24px', background: '#f0fdf4', border: `1px solid ${T.commitGreen}`, borderRadius: '12px', textAlign: 'center', animation: 'fadeIn 0.4s ease' }}>
          <div style={{ fontWeight: 700, fontSize: '16px', color: T.commitGreen }}>All exceptions resolved!</div>
          <div style={{ fontSize: '13px', color: T.textMuted, marginTop: '4px' }}>10 records revalidated and sent to the Claims Work Queue.</div>
        </div>
      )}

      {/* Resolution Drawer — behaviour depends on exception category */}
      <Modal open={!!drawerRow} onClose={() => setDrawerRow(null)} title={exceptionRow ? exceptionRow.error : ''} width="540px">
        {exceptionRow && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '12px 14px', background: T.errorBg, border: '1px solid #fecaca', borderRadius: '8px' }}>
              <div style={{ fontSize: '13px', color: T.error }}>{exceptionRow.errorDetail}</div>
            </div>

            {/* ── DATA VALIDATION: Search / Correct Policy ── */}
            {exceptionRow.category === 'data' && (
              <>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: T.textPrimary, display: 'block', marginBottom: '6px' }}>
                    Submitted Policy ID
                  </label>
                  <div style={{ fontFamily: 'monospace', fontSize: '13px', color: T.error, padding: '10px 14px', background: T.pageCanvas, borderRadius: '8px' }}>
                    {exceptionRow.policyId}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: T.textPrimary, display: 'block', marginBottom: '6px' }}>
                    Search Policy (by member name or policy number)
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text" value={policySearch} onChange={e => setPolicySearch(e.target.value)}
                      placeholder={`e.g. ${exceptionRow.member}`}
                      style={{ flex: 1, height: '42px', padding: '0 14px', border: `1px solid ${T.borderDefault}`, borderRadius: '8px', fontFamily: 'var(--font-family)', fontSize: '14px', outline: 'none' }}
                    />
                    <Button variant="secondary" onClick={() => setPolicyFound(true)} disabled={!policySearch}>Search</Button>
                  </div>
                </div>
                {policyFound && (
                  <div style={{ padding: '12px 14px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', animation: 'fadeIn 0.3s ease' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: T.commitGreen }}>Match found — {MATCHED_POLICY.number}</div>
                    <div style={{ fontSize: '12px', color: T.textMuted }}>Member: {MATCHED_POLICY.member} · Status: {MATCHED_POLICY.status}</div>
                    <label style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12.5px', color: T.textPrimary, marginTop: '8px', cursor: 'pointer' }}>
                      <input type="checkbox" checked={policyConfirmed} onChange={e => setPolicyConfirmed(e.target.checked)} /> Confirm this is the correct policy
                    </label>
                  </div>
                )}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button variant="secondary" fullWidth onClick={() => setDrawerRow(null)}>Cancel</Button>
                  <Button variant="primary" fullWidth disabled={!policyConfirmed} onClick={resolve}>Confirm Policy → Revalidate</Button>
                </div>
              </>
            )}

            {/* ── ELIGIBILITY: Review ── */}
            {exceptionRow.category === 'eligibility' && (
              <>
                <div style={{ fontSize: '13px', color: T.textSecondary, lineHeight: 1.6 }}>
                  This claim failed an eligibility check sourced from Team 1 (benefit rules) and Team 2 (policy/member data).
                  Review the underlying record before deciding how to proceed — this is not an automatic rejection.
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button variant="secondary" fullWidth onClick={() => setDrawerRow(null)}>Cancel</Button>
                  <Button variant="danger" fullWidth onClick={resolve}>Confirm Not Eligible → Reject</Button>
                </div>
              </>
            )}

            {/* ── DOCUMENT: Request replacement / re-upload ── */}
            {exceptionRow.category === 'document' && (
              <>
                <div style={{ fontSize: '13px', color: T.textSecondary, lineHeight: 1.6 }}>
                  A request will be sent back to the originating hospital/agent asking them to
                  {exceptionRow.error === 'Corrupted File' ? ' re-upload the corrupted file.' : ' resubmit a clearer copy of the document.'}
                  {' '}Claim status will show <strong>Action Required</strong> (not Rejected) until resolved.
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button variant="secondary" fullWidth onClick={() => setDrawerRow(null)}>Cancel</Button>
                  <Button variant="primary" fullWidth onClick={resolve}>Send Document Request</Button>
                </div>
              </>
            )}

            {/* ── DUPLICATE / RISK: Compare ── */}
            {exceptionRow.category === 'duplicate' && (
              <>
                <div style={{ border: `1px solid ${T.borderLight}`, borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '8px 12px', background: T.pageCanvas, fontSize: '11px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase' }}>
                    <span>Field</span><span>Bulk Claim</span><span>Existing Claim</span>
                  </div>
                  {[
                    ['Member', exceptionRow.member, EXISTING_CLAIM.member],
                    ['Amount', exceptionRow.amount, EXISTING_CLAIM.amount],
                    ['Provider', 'Aga Khan University Hospital', EXISTING_CLAIM.provider],
                  ].map(([label, a, b]) => (
                    <div key={label} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '8px 12px', fontSize: '12.5px', borderTop: `1px solid ${T.borderLight}` }}>
                      <span style={{ color: T.textMuted }}>{label}</span>
                      <span style={{ fontWeight: 600, color: a === b ? T.commitGreen : T.textPrimary }}>{a}</span>
                      <span style={{ fontWeight: 600, color: T.textPrimary }}>{b}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: '12px', color: T.textMuted }}>Existing claim: <strong style={{ color: T.primaryNavy }}>{EXISTING_CLAIM.id}</strong> · {EXISTING_CLAIM.date}</div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button variant="secondary" fullWidth onClick={resolve}>Not Duplicate → Send to Assessment</Button>
                  <Button variant="danger" fullWidth onClick={resolve}>Confirm Duplicate → Reject</Button>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}