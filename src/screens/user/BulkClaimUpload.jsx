// import React, { useState, useRef } from 'react';
// import { T } from '../../tokens';
// import Button from '../../components/UI/Button';
// import Badge from '../../components/UI/Badge';


// export default function BulkClaimUpload() {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [done, setDone] = useState(false);
//   const [dragging, setDragging] = useState(false);
//   const inputRef = useRef();

//   const template = [
//     'Policy Number', 'Claimant Name', 'Relationship', 'Contact Mobile',
//     'Benefit Category', 'Incident Date', 'Facility Name', 'Claim Amount (PKR)', 'Description',
//   ];

//   const handleFile = (f) => {
//     setFile(f);
//     setDone(false);
//     setProgress(0);
//   };

//   const handleUpload = () => {
//     if (!file) return;
//     setUploading(true);
//     let p = 0;
//     const timer = setInterval(() => {
//       p += Math.floor(Math.random() * 12) + 5;
//       if (p >= 100) {
//         clearInterval(timer);
//         p = 100;
//         setProgress(100);
//         setUploading(false);
//         setDone(true);
//       } else {
//         setProgress(p);
//       }
//     }, 300);
//   };

//   return (
//     <div style={{ maxWidth: 720, margin: '0 auto', animation: 'fadeIn 0.3s ease' }}>
//       <div style={{ marginBottom: '28px' }}>
//         <h1 style={{ fontSize: '22px', fontWeight: 800, color: T.primaryNavy, marginBottom: '6px' }}>
//           Bulk Claim Upload — Telco Agent Portal
//         </h1>
//         <p style={{ fontSize: '14px', color: T.textMuted }}>
//           Upload batch claim intimations in CSV format. Maximum 500 records per batch.
//         </p>
//       </div>

//       {/* Instructions Card */}
//       <div style={{
//         background: T.cardSurface, border: `1px solid ${T.borderLight}`,
//         borderRadius: '12px', padding: '20px 24px', marginBottom: '20px',
//         boxShadow: 'var(--shadow-card)',
//       }}>
//         <h3 style={{ fontSize: '14px', fontWeight: 700, color: T.primaryNavy, marginBottom: '14px' }}>
//           📋 Required CSV Columns
//         </h3>
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
//           {template.map((col, i) => (
//             <span key={i} style={{
//               background: '#eff6ff', color: T.stateBlue,
//               border: '1px solid #bfdbfe',
//               borderRadius: '6px', padding: '4px 10px',
//               fontSize: '12px', fontWeight: 600,
//             }}>{col}</span>
//           ))}
//         </div>
//         <Button variant="secondary" size="sm">
//           ⬇️ Download Template CSV
//         </Button>
//       </div>

//       {/* Drop Zone */}
//       <div style={{
//         background: T.cardSurface, border: `1px solid ${T.borderLight}`,
//         borderRadius: '12px', padding: '24px', marginBottom: '20px',
//         boxShadow: 'var(--shadow-card)',
//       }}>
//         <div
//           onDragOver={e => { e.preventDefault(); setDragging(true); }}
//           onDragLeave={() => setDragging(false)}
//           onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
//           onClick={() => inputRef.current.click()}
//           style={{
//             border: `2px dashed ${dragging ? T.stateBlue : file ? T.commitGreen : T.borderDefault}`,
//             borderRadius: '10px', padding: '40px 20px',
//             textAlign: 'center', cursor: 'pointer',
//             background: dragging ? '#eff6ff' : file ? '#f0fdf4' : '#fafbfc',
//             transition: 'all 0.2s ease',
//           }}
//         >
//           <input ref={inputRef} type="file" accept=".csv" onChange={e => handleFile(e.target.files[0])} style={{ display: 'none' }} />
//           <div style={{ fontSize: '42px', marginBottom: '12px' }}>
//             {file ? '📊' : dragging ? '📂' : '📁'}
//           </div>
//           {file ? (
//             <>
//               <div style={{ fontWeight: 700, fontSize: '15px', color: T.commitGreen }}>{file.name}</div>
//               <div style={{ fontSize: '12px', color: T.textMuted, marginTop: '4px' }}>
//                 {(file.size / 1024).toFixed(1)} KB · Click to replace
//               </div>
//             </>
//           ) : (
//             <>
//               <div style={{ fontWeight: 600, fontSize: '14px', color: T.textPrimary }}>
//                 {dragging ? 'Drop CSV file here' : 'Drag & drop your CSV batch file here'}
//               </div>
//               <div style={{ fontSize: '12px', color: T.textMuted, marginTop: '6px' }}>
//                 Only .csv files accepted · Max 500 records
//               </div>
//             </>
//           )}
//         </div>

//         {/* Upload Progress */}
//         {(uploading || done) && (
//           <div style={{ marginTop: '18px', animation: 'fadeIn 0.3s ease' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
//               <span style={{ fontSize: '13px', fontWeight: 600, color: T.textPrimary }}>
//                 {done ? '✅ Upload Complete' : '⏳ Uploading & Validating...'}
//               </span>
//               <span style={{ fontSize: '13px', fontWeight: 700, color: done ? T.commitGreen : T.primaryNavy }}>
//                 {progress}%
//               </span>
//             </div>
//             <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
//               <div style={{
//                 height: '100%',
//                 width: `${progress}%`,
//                 background: done
//                   ? `linear-gradient(90deg, ${T.commitGreen}, #00c968)`
//                   : `linear-gradient(90deg, ${T.primaryNavy}, ${T.stateBlue})`,
//                 borderRadius: '4px',
//                 transition: 'width 0.3s ease',
//               }} />
//             </div>
//           </div>
//         )}

//         {/* Done Result */}
//         {done && (
//           <div style={{
//             marginTop: '18px', padding: '14px',
//             background: '#f0fdf4', border: '1px solid #bbf7d0',
//             borderRadius: '8px', animation: 'fadeIn 0.3s ease',
//           }}>
//             <div style={{ fontWeight: 700, fontSize: '14px', color: T.commitGreen, marginBottom: '8px' }}>
//               Batch Processed Successfully
//             </div>
//             <div style={{ display: 'flex', gap: '20px' }}>
//               {[
//                 { label: 'Total Records', value: '250', color: T.primaryNavy },
//                 { label: 'Valid', value: '240', color: T.commitGreen },
//                 { label: 'Exceptions', value: '10', color: T.error, badge: true },
//               ].map(s => (
//                 <div key={s.label}>
//                   <div style={{ fontSize: '22px', fontWeight: 800, color: s.color }}>{s.value}</div>
//                   <div style={{ fontSize: '12px', color: T.textMuted }}>{s.label}</div>
//                 </div>
//               ))}
//             </div>
//             <div style={{ marginTop: '12px', fontSize: '13px', color: T.error }}>
//               ⚠️ 10 exceptions found — visit the <strong>Bulk Exception Workbench</strong> to resolve.
//             </div>
//           </div>
//         )}
//       </div>

//       {!done && (
//         <Button variant="primary" fullWidth onClick={handleUpload} disabled={!file || uploading} loading={uploading} style={{ height: '48px' }}>
//           🚀 Upload & Process Batch
//         </Button>
//       )}
//     </div>
//   );
// }


// import React, { useState, useRef } from 'react';
// import { T } from '../../tokens';
// import Button from '../../components/UI/Button';
// import Badge from '../../components/UI/Badge';
// import Modal from '../../components/UI/Modal';

// /* ============================================================================
//    MOCK DATA — represents what the CSV rows resolve to once matched against
//    member/policy records in the backend. Each claim carries the full trail
//    of checks a real adjudication engine would run, so we can visualise it.
//    ============================================================================ */

// const STATUS_META = {
//   valid:      { label: 'Valid',                   emoji: '🟢', badge: 'Approved' },
//   partial:    { label: 'Partially Covered',       emoji: '🟡', badge: 'Action Required' },
//   review:     { label: 'Needs Review',            emoji: '🟠', badge: 'Pending' },
//   rejected:   { label: 'Rejected',                emoji: '🔴', badge: 'Rejected' },
//   preauth:    { label: 'Pending Pre-Authorization', emoji: '🔵', badge: 'In Review' },
// };

// function buildClaims() {
//   const rows = [
//     {
//       id: 'CLM-2026-0001', policyNumber: 'EFU-TPA-2026-0041', member: 'Ali Khan', relationship: 'Self',
//       benefitType: 'Hospitalization', settlementType: 'Reimbursement', hospital: 'Aga Khan University Hospital',
//       claimAmount: 120000, annualLimit: 500000, previouslyUtilized: 150000,
//       policyActive: true, coveragePeriodOk: true, memberOnPolicy: true, hospitalPanel: true,
//       documentsRequired: ['Hospital Bill', 'Discharge Summary', "Doctor's Prescription", 'Medical Reports', 'CNIC / Member ID', 'Payment Receipt'],
//       documentsReceived: ['Hospital Bill', 'Discharge Summary', "Doctor's Prescription", 'Medical Reports', 'CNIC / Member ID', 'Payment Receipt'],
//       duplicate: false,
//     },
//     {
//       id: 'CLM-2026-0002', policyNumber: 'EFU-TPA-2026-0058', member: 'Sara Ali', relationship: 'Spouse',
//       benefitType: 'Hospitalization', settlementType: 'Reimbursement', hospital: 'South City Hospital',
//       claimAmount: 250000, annualLimit: 500000, previouslyUtilized: 400000,
//       policyActive: true, coveragePeriodOk: true, memberOnPolicy: true, hospitalPanel: true,
//       documentsRequired: ['Hospital Bill', 'Discharge Summary', "Doctor's Prescription", 'Medical Reports', 'CNIC / Member ID', 'Payment Receipt'],
//       documentsReceived: ['Hospital Bill', 'Discharge Summary', "Doctor's Prescription", 'Medical Reports', 'CNIC / Member ID', 'Payment Receipt'],
//       duplicate: false,
//     },
//     {
//       id: 'CLM-2026-0003', policyNumber: 'EFU-TPA-2026-0072', member: 'Ahmed Raza', relationship: 'Self',
//       benefitType: 'Treatment / OPD', settlementType: 'Reimbursement', hospital: 'City Clinic',
//       claimAmount: 15000, annualLimit: 50000, previouslyUtilized: 20000,
//       policyActive: true, coveragePeriodOk: true, memberOnPolicy: true, hospitalPanel: true,
//       documentsRequired: ["Doctor's Prescription", 'Consultation / Treatment Bill', 'Payment Receipt', 'CNIC / Member ID'],
//       documentsReceived: ["Doctor's Prescription", 'Payment Receipt', 'CNIC / Member ID'],
//       duplicate: false,
//     },
//     {
//       id: 'CLM-2026-0004', policyNumber: 'EFU-TPA-2026-0041', member: 'Zain Khan', relationship: 'Child',
//       benefitType: 'Hospitalization', settlementType: 'Cashless', hospital: 'Al-Shifa Trust Clinic',
//       claimAmount: 50000, annualLimit: 500000, previouslyUtilized: 0,
//       policyActive: true, coveragePeriodOk: true, memberOnPolicy: false, hospitalPanel: false,
//       documentsRequired: ['Admission / Pre-Authorization Request', "Doctor's Prescription / Medical Report"],
//       documentsReceived: [],
//       duplicate: false,
//     },
//     {
//       id: 'CLM-2026-0005', policyNumber: 'EFU-TPA-2026-0093', member: 'Hina Sheikh', relationship: 'Self',
//       benefitType: 'Hospitalization', settlementType: 'Cashless', hospital: 'Liaquat National Hospital',
//       claimAmount: 150000, annualLimit: 400000, previouslyUtilized: 100000,
//       policyActive: true, coveragePeriodOk: true, memberOnPolicy: true, hospitalPanel: true,
//       documentsRequired: ['Admission / Pre-Authorization Request', "Doctor's Prescription / Medical Report"],
//       documentsReceived: ['Admission / Pre-Authorization Request', "Doctor's Prescription / Medical Report"],
//       duplicate: false,
//     },
//     {
//       id: 'CLM-2026-0006', policyNumber: 'EFU-TPA-2025-0011', member: 'Bilal Ahmed', relationship: 'Self',
//       benefitType: 'Hospitalization', settlementType: 'Reimbursement', hospital: 'Doctors Hospital',
//       claimAmount: 80000, annualLimit: 500000, previouslyUtilized: 0,
//       policyActive: false, coveragePeriodOk: false, memberOnPolicy: true, hospitalPanel: true,
//       documentsRequired: ['Hospital Bill', 'Discharge Summary', "Doctor's Prescription", 'Medical Reports', 'CNIC / Member ID', 'Payment Receipt'],
//       documentsReceived: ['Hospital Bill', 'Discharge Summary'],
//       duplicate: false,
//     },
//     {
//       id: 'CLM-2026-0007', policyNumber: 'EFU-TPA-2026-0058', member: 'Sara Ali', relationship: 'Spouse',
//       benefitType: 'Hospitalization', settlementType: 'Reimbursement', hospital: 'South City Hospital',
//       claimAmount: 250000, annualLimit: 500000, previouslyUtilized: 400000,
//       policyActive: true, coveragePeriodOk: true, memberOnPolicy: true, hospitalPanel: true,
//       documentsRequired: ['Hospital Bill', 'Discharge Summary', "Doctor's Prescription", 'Medical Reports', 'CNIC / Member ID', 'Payment Receipt'],
//       documentsReceived: ['Hospital Bill', 'Discharge Summary', "Doctor's Prescription", 'Medical Reports', 'CNIC / Member ID', 'Payment Receipt'],
//       duplicate: true, // same policy+member+amount as CLM-0002 → duplicate submission
//     },
//     {
//       id: 'CLM-2026-0008', policyNumber: 'EFU-TPA-2026-0104', member: 'Nida Farooq', relationship: 'Self',
//       benefitType: 'Treatment / OPD', settlementType: 'Cashless', hospital: 'Shifa International Hospital',
//       claimAmount: 8000, annualLimit: 50000, previouslyUtilized: 10000,
//       policyActive: true, coveragePeriodOk: true, memberOnPolicy: true, hospitalPanel: true,
//       documentsRequired: ["Doctor's Prescription", 'Medical Report / Investigation Report'],
//       documentsReceived: ["Doctor's Prescription", 'Medical Report / Investigation Report'],
//       duplicate: false,
//     },
//     {
//       id: 'CLM-2026-0009', policyNumber: 'EFU-TPA-2026-0130', member: 'Usman Tariq', relationship: 'Self',
//       benefitType: 'Hospitalization', settlementType: 'Reimbursement', hospital: 'Hameed Latif Hospital',
//       claimAmount: 300000, annualLimit: 500000, previouslyUtilized: 0,
//       policyActive: true, coveragePeriodOk: true, memberOnPolicy: true, hospitalPanel: true,
//       documentsRequired: ['Hospital Bill', 'Discharge Summary', "Doctor's Prescription", 'Medical Reports', 'CNIC / Member ID', 'Payment Receipt'],
//       documentsReceived: ['Hospital Bill', 'Discharge Summary', "Doctor's Prescription", 'Medical Reports', 'CNIC / Member ID', 'Payment Receipt'],
//       duplicate: false,
//     },
//     {
//       id: 'CLM-2026-0010', policyNumber: 'INVALID-9999', member: 'Kamran Ilyas', relationship: 'Self',
//       benefitType: 'Hospitalization', settlementType: 'Reimbursement', hospital: 'Ittefaq Hospital',
//       claimAmount: 60000, annualLimit: 0, previouslyUtilized: 0,
//       policyActive: false, coveragePeriodOk: false, memberOnPolicy: false, hospitalPanel: false,
//       policyExists: false,
//       documentsRequired: ['Hospital Bill', 'Discharge Summary'],
//       documentsReceived: [],
//       duplicate: false,
//     },
//   ];

//   return rows.map(r => {
//     const policyExists = r.policyExists !== false;
//     const remainingBefore = Math.max(r.annualLimit - r.previouslyUtilized, 0);
//     const coveredAmount = Math.min(remainingBefore, r.claimAmount);
//     const excessAmount = Math.max(r.claimAmount - remainingBefore, 0);

//     const docsMissing = r.documentsRequired.filter(d => !r.documentsReceived.includes(d));
//     const documentsOk = docsMissing.length === 0;

//     // ---- determine final status by priority (hard fails first) ----
//     let status;
//     const reasons = [];

//     if (!policyExists) {
//       status = 'rejected'; reasons.push('Policy number does not exist in system');
//     } else if (!r.policyActive || !r.coveragePeriodOk) {
//       status = 'rejected'; reasons.push('Policy inactive / incident date outside coverage period');
//     } else if (!r.memberOnPolicy) {
//       status = 'review'; reasons.push(`${r.relationship} is not a registered dependent on this policy`);
//     } else if (r.duplicate) {
//       status = 'rejected'; reasons.push('Duplicate of a previously submitted claim (same policy, member & amount)');
//     } else if (r.settlementType === 'Cashless' && !r.hospitalPanel) {
//       status = 'review'; reasons.push('Facility is not an EFU Life panel/network provider — cashless not available');
//     } else if (!documentsOk) {
//       status = 'review'; reasons.push(`Missing required document(s): ${docsMissing.join(', ')}`);
//     } else if (excessAmount > 0) {
//       status = 'partial'; reasons.push(`Claim exceeds remaining ${r.benefitType} coverage by PKR ${excessAmount.toLocaleString()}`);
//     } else if (r.settlementType === 'Cashless') {
//       status = 'preauth'; reasons.push('Cashless claim queued for pre-authorization approval');
//     } else {
//       status = 'valid'; reasons.push('All checks passed — within coverage, documents complete');
//     }

//     return { ...r, policyExists, remainingBefore, coveredAmount, excessAmount, docsMissing, documentsOk, status, reasons };
//   });
// }

// const PIPELINE_STAGES = [
//   { key: 'csv',      label: 'Reading & validating CSV structure' },
//   { key: 'member',   label: 'Matching members & policies' },
//   { key: 'coverage', label: 'Checking benefit eligibility & coverage' },
//   { key: 'provider',  label: 'Validating hospital / provider eligibility' },
//   { key: 'documents', label: 'Checking required documents' },
//   { key: 'finalize',  label: 'Finalizing claim decisions' },
// ];

// function money(n) {
//   return `PKR ${n.toLocaleString()}`;
// }

// export default function BulkClaimUpload() {
//   const [file, setFile] = useState(null);
//   const [dragging, setDragging] = useState(false);
//   const inputRef = useRef();

//   const [phase, setPhase] = useState('idle'); // idle | uploading | pipeline | results
//   const [stageIndex, setStageIndex] = useState(-1);
//   const [stageDone, setStageDone] = useState([]);
//   const [claims, setClaims] = useState([]);
//   const [selectedClaim, setSelectedClaim] = useState(null);
//   const [totalRecords, setTotalRecords] = useState(487);

//   const template = [
//     'Policy Number', 'Claimant Name', 'Relationship', 'Contact Mobile', 'Benefit Type',
//     'Settlement Type', 'Incident / Admission Date', 'Facility Name', 'Claim Amount (PKR)', 'Description',
//   ];

//   const handleFile = (f) => {
//     setFile(f);
//     setPhase('idle');
//     setStageIndex(-1);
//     setStageDone([]);
//   };

//   const runPipeline = () => {
//     if (!file) return;
//     setPhase('uploading');
//     setStageIndex(-1);
//     setStageDone([]);

//     const generated = buildClaims();
//     setClaims(generated);

//     // brief "uploading" beat, then step through pipeline stages
//     setTimeout(() => {
//       setPhase('pipeline');
//       PIPELINE_STAGES.forEach((_, i) => {
//         setTimeout(() => {
//           setStageIndex(i);
//           setTimeout(() => {
//             setStageDone(prev => [...prev, i]);
//             if (i === PIPELINE_STAGES.length - 1) {
//               setTimeout(() => setPhase('results'), 700);
//             }
//           }, 900);
//         }, i * 1100);
//       });
//     }, 700);
//   };

//   const reset = () => {
//     setFile(null); setPhase('idle'); setStageIndex(-1); setStageDone([]); setClaims([]);
//   };

//   const counts = STATUS_META && claims.length ? Object.keys(STATUS_META).reduce((acc, k) => {
//     acc[k] = claims.filter(c => c.status === k).length;
//     return acc;
//   }, {}) : {};

//   // Simulated per-stage progress counts, scaled against the declared batch size
//   const stageProgress = (i) => {
//     if (i > stageIndex) return 0;
//     if (i < stageIndex || stageDone.includes(i)) return totalRecords;
//     // currently running stage — show a partial, slightly-less-than-total count
//     return Math.floor(totalRecords * 0.78);
//   };

//   return (
//     <div style={{ maxWidth: 860, margin: '0 auto', animation: 'fadeIn 0.3s ease' }}>
//       <div style={{ marginBottom: '28px' }}>
//         <h1 style={{ fontSize: '22px', fontWeight: 800, color: T.primaryNavy, marginBottom: '6px' }}>
//           Bulk Claim Upload — Hospital / Telco Agent Portal
//         </h1>
//         <p style={{ fontSize: '14px', color: T.textMuted }}>
//           Upload batch claim intimations in CSV format. Maximum 500 records per batch.
//         </p>
//       </div>

//       {phase === 'idle' && (
//         <>
//           {/* Instructions Card */}
//           <div style={{
//             background: T.cardSurface, border: `1px solid ${T.borderLight}`,
//             borderRadius: '12px', padding: '20px 24px', marginBottom: '20px',
//             boxShadow: 'var(--shadow-card)',
//           }}>
//             <h3 style={{ fontSize: '14px', fontWeight: 700, color: T.primaryNavy, marginBottom: '14px' }}>
//               📋 Required CSV Columns
//             </h3>
//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
//               {template.map((col, i) => (
//                 <span key={i} style={{
//                   background: '#eff6ff', color: T.stateBlue,
//                   border: '1px solid #bfdbfe',
//                   borderRadius: '6px', padding: '4px 10px',
//                   fontSize: '12px', fontWeight: 600,
//                 }}>{col}</span>
//               ))}
//             </div>
//             <Button variant="secondary" size="sm">
//               ⬇️ Download Template CSV
//             </Button>
//           </div>

//           {/* Drop Zone */}
//           <div style={{
//             background: T.cardSurface, border: `1px solid ${T.borderLight}`,
//             borderRadius: '12px', padding: '24px', marginBottom: '20px',
//             boxShadow: 'var(--shadow-card)',
//           }}>
//             <div
//               onDragOver={e => { e.preventDefault(); setDragging(true); }}
//               onDragLeave={() => setDragging(false)}
//               onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
//               onClick={() => inputRef.current.click()}
//               style={{
//                 border: `2px dashed ${dragging ? T.stateBlue : file ? T.commitGreen : T.borderDefault}`,
//                 borderRadius: '10px', padding: '40px 20px',
//                 textAlign: 'center', cursor: 'pointer',
//                 background: dragging ? '#eff6ff' : file ? '#f0fdf4' : '#fafbfc',
//                 transition: 'all 0.2s ease',
//               }}
//             >
//               <input ref={inputRef} type="file" accept=".csv" onChange={e => handleFile(e.target.files[0])} style={{ display: 'none' }} />
//               <div style={{ fontSize: '42px', marginBottom: '12px' }}>
//                 {file ? '📊' : dragging ? '📂' : '📁'}
//               </div>
//               {file ? (
//                 <>
//                   <div style={{ fontWeight: 700, fontSize: '15px', color: T.commitGreen }}>{file.name}</div>
//                   <div style={{ fontSize: '12px', color: T.textMuted, marginTop: '4px' }}>
//                     {(file.size / 1024).toFixed(1)} KB · Click to replace
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div style={{ fontWeight: 600, fontSize: '14px', color: T.textPrimary }}>
//                     {dragging ? 'Drop CSV file here' : 'Drag & drop your CSV batch file here'}
//                   </div>
//                   <div style={{ fontSize: '12px', color: T.textMuted, marginTop: '6px' }}>
//                     Only .csv files accepted · Max 500 records
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>

//           <Button variant="primary" fullWidth onClick={runPipeline} disabled={!file} style={{ height: '48px' }}>
//             🚀 Upload & Process Batch
//           </Button>
//         </>
//       )}

//       {/* ── UPLOADING BEAT ── */}
//       {phase === 'uploading' && (
//         <div style={{
//           background: T.cardSurface, border: `1px solid ${T.borderLight}`,
//           borderRadius: '12px', padding: '40px 24px', textAlign: 'center',
//           boxShadow: 'var(--shadow-card)', animation: 'fadeIn 0.3s ease',
//         }}>
//           <div style={{
//             width: 40, height: 40, margin: '0 auto 16px',
//             border: `3px solid ${T.borderLight}`, borderTop: `3px solid ${T.stateBlue}`,
//             borderRadius: '50%', animation: 'spin 0.8s linear infinite',
//           }} />
//           <div style={{ fontWeight: 700, fontSize: '15px', color: T.textPrimary }}>
//             Uploading {file?.name}...
//           </div>
//           <div style={{ fontSize: '13px', color: T.textMuted, marginTop: '4px' }}>
//             Reading {totalRecords} claim records from CSV
//           </div>
//         </div>
//       )}

//       {/* ── PIPELINE PROCESSING ── */}
//       {phase === 'pipeline' && (
//         <div style={{
//           background: T.cardSurface, border: `1px solid ${T.borderLight}`,
//           borderRadius: '14px', padding: '28px', boxShadow: 'var(--shadow-card)',
//           animation: 'scaleIn 0.22s ease',
//         }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
//             <h2 style={{ fontSize: '16px', fontWeight: 700, color: T.primaryNavy }}>
//               Batch #BATCH-2026-0098
//             </h2>
//             <span style={{ fontSize: '13px', fontWeight: 700, color: T.stateBlue }}>
//               {Math.round(((stageDone.length) / PIPELINE_STAGES.length) * 100)}%
//             </span>
//           </div>
//           <p style={{ fontSize: '13px', color: T.textMuted, marginBottom: '22px' }}>
//             Processing {totalRecords} claims through the adjudication pipeline...
//           </p>

//           {/* Overall progress bar */}
//           <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden', marginBottom: '26px' }}>
//             <div style={{
//               height: '100%',
//               width: `${(stageDone.length / PIPELINE_STAGES.length) * 100}%`,
//               background: `linear-gradient(90deg, ${T.primaryNavy}, ${T.stateBlue})`,
//               borderRadius: '3px', transition: 'width 0.6s ease',
//             }} />
//           </div>

//           {/* Stage checklist */}
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//             {PIPELINE_STAGES.map((s, i) => {
//               const isDone = stageDone.includes(i);
//               const isRunning = i === stageIndex && !isDone;
//               const isPending = i > stageIndex;
//               const count = stageProgress(i);
//               return (
//                 <div key={s.key} style={{
//                   display: 'flex', alignItems: 'center', gap: '14px',
//                   opacity: isPending ? 0.4 : 1, transition: 'opacity 0.3s ease',
//                 }}>
//                   <div style={{
//                     width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                     background: isDone ? T.commitGreen : isRunning ? '#eff6ff' : '#f4f8fb',
//                     border: isDone ? 'none' : isRunning ? `2px solid ${T.stateBlue}` : `2px solid ${T.borderLight}`,
//                   }}>
//                     {isDone ? (
//                       <span style={{ color: '#fff', fontSize: '13px' }}>✓</span>
//                     ) : isRunning ? (
//                       <span style={{
//                         display: 'block', width: 13, height: 13,
//                         border: `2px solid ${T.stateBlue}`, borderTop: '2px solid transparent',
//                         borderRadius: '50%', animation: 'spin 0.8s linear infinite',
//                       }} />
//                     ) : (
//                       <span style={{ fontSize: '11px', color: T.textMuted, fontWeight: 600 }}>{i + 1}</span>
//                     )}
//                   </div>
//                   <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <span style={{
//                       fontSize: '13.5px', fontWeight: isDone || isRunning ? 600 : 500,
//                       color: isDone ? T.commitGreen : isRunning ? T.primaryNavy : T.textMuted,
//                     }}>
//                       {s.label}
//                     </span>
//                     {(isDone || isRunning) && (
//                       <span style={{ fontSize: '12px', fontWeight: 700, color: isDone ? T.commitGreen : T.stateBlue }}>
//                         {isDone ? totalRecords : count} / {totalRecords}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* ── RESULTS ── */}
//       {phase === 'results' && (
//         <div style={{ animation: 'fadeIn 0.35s ease' }}>
//           <div style={{
//             background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px',
//             padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: T.commitGreen, fontWeight: 600,
//           }}>
//             ✅ Batch #BATCH-2026-0098 processed — {claims.length} of {totalRecords} sample rows shown below for demonstration.
//           </div>

//           {/* KPI summary */}
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '22px' }}>
//             {Object.entries(STATUS_META).map(([key, meta]) => (
//               <div key={key} style={{
//                 background: T.cardSurface, border: `1px solid ${T.borderLight}`,
//                 borderRadius: '12px', padding: '14px', textAlign: 'center',
//                 boxShadow: 'var(--shadow-card)',
//               }}>
//                 <div style={{ fontSize: '20px', marginBottom: '4px' }}>{meta.emoji}</div>
//                 <div style={{ fontSize: '22px', fontWeight: 800, color: T.textPrimary }}>{counts[key] || 0}</div>
//                 <div style={{ fontSize: '11px', color: T.textMuted, fontWeight: 600, marginTop: '2px' }}>{meta.label}</div>
//               </div>
//             ))}
//           </div>

//           {/* Results table */}
//           <div style={{
//             background: T.cardSurface, border: `1px solid ${T.borderLight}`,
//             borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-card)', marginBottom: '20px',
//           }}>
//             <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
//               <thead>
//                 <tr style={{ background: T.pageCanvas, borderBottom: `1px solid ${T.borderLight}` }}>
//                   {['Claim', 'Member', 'Relationship', 'Benefit', 'Amount', 'Coverage Left', 'Documents', 'Status'].map(h => (
//                     <th key={h} style={{ textAlign: 'left', padding: '10px 14px', fontSize: '11px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
//                       {h}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {claims.map(c => {
//                   const meta = STATUS_META[c.status];
//                   return (
//                     <tr
//                       key={c.id}
//                       onClick={() => setSelectedClaim(c)}
//                       style={{ borderBottom: `1px solid ${T.borderLight}`, cursor: 'pointer', transition: 'background 0.15s' }}
//                       onMouseEnter={e => e.currentTarget.style.background = T.pageCanvas}
//                       onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
//                     >
//                       <td style={{ padding: '10px 14px', fontWeight: 700, color: T.primaryNavy }}>{c.id}</td>
//                       <td style={{ padding: '10px 14px', color: T.textPrimary }}>{c.member}</td>
//                       <td style={{ padding: '10px 14px', color: T.textMuted }}>{c.relationship}</td>
//                       <td style={{ padding: '10px 14px', color: T.textMuted }}>{c.benefitType}</td>
//                       <td style={{ padding: '10px 14px', color: T.textPrimary }}>{money(c.claimAmount)}</td>
//                       <td style={{ padding: '10px 14px', color: T.textMuted }}>
//                         {c.policyExists ? money(c.remainingBefore) : '—'}
//                       </td>
//                       <td style={{ padding: '10px 14px' }}>
//                         {c.documentsOk
//                           ? <span style={{ color: T.commitGreen, fontWeight: 600 }}>Complete</span>
//                           : <span style={{ color: T.error, fontWeight: 600 }}>{c.docsMissing.length} missing</span>}
//                       </td>
//                       <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
//                         {meta.emoji} {meta.label}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           <div style={{ display: 'flex', gap: '12px' }}>
//             <Button variant="secondary" onClick={reset}>← Upload Another Batch</Button>
//             <Button variant="primary">Go to Bulk Exception Workbench →</Button>
//           </div>
//         </div>
//       )}

//       {/* ── CLAIM DETAIL MODAL ── */}
//       <Modal open={!!selectedClaim} onClose={() => setSelectedClaim(null)} title={selectedClaim ? `Claim Validation — ${selectedClaim.id}` : ''} width="600px">
//         {selectedClaim && (() => {
//           const c = selectedClaim;
//           const meta = STATUS_META[c.status];
//           const checks = [
//             { label: 'Policy Verification', ok: c.policyExists },
//             { label: 'Member Verification', ok: c.policyExists && c.memberOnPolicy },
//             { label: 'Policy Active / Coverage Period', ok: c.policyExists && c.policyActive && c.coveragePeriodOk },
//             { label: 'Benefit Covered', ok: c.policyExists && c.memberOnPolicy },
//             { label: 'Hospital / Provider Eligibility', ok: c.settlementType === 'Reimbursement' || c.hospitalPanel },
//             { label: 'Coverage Available', ok: c.excessAmount === 0, warn: c.excessAmount > 0 },
//             { label: 'Document Validation', ok: c.documentsOk },
//             { label: 'Duplicate Check', ok: !c.duplicate },
//           ];
//           return (
//             <div>
//               <div style={{
//                 display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px',
//                 padding: '10px 14px', borderRadius: '8px', background: T.pageCanvas,
//               }}>
//                 <span style={{ fontSize: '18px' }}>{meta.emoji}</span>
//                 <Badge status={meta.badge} />
//                 <span style={{ fontSize: '13px', color: T.textMuted, marginLeft: 'auto' }}>
//                   {c.member} · {c.relationship} · {c.policyNumber}
//                 </span>
//               </div>

//               {/* Checks */}
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
//                 {checks.map(ch => (
//                   <div key={ch.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
//                     <span style={{ color: T.textPrimary }}>{ch.label}</span>
//                     <span style={{ fontWeight: 700, color: ch.ok ? T.commitGreen : ch.warn ? T.goldAccent || '#cd924e' : T.error }}>
//                       {ch.ok ? '✓' : ch.warn ? '⚠' : '✗'}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               {/* Coverage calculation */}
//               {c.policyExists && (
//                 <div style={{
//                   border: `1px solid ${T.borderLight}`, borderRadius: '10px', padding: '16px', marginBottom: '18px',
//                 }}>
//                   <div style={{ fontSize: '12px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
//                     Coverage Calculation — {c.benefitType}
//                   </div>
//                   {[
//                     ['Annual Limit', money(c.annualLimit)],
//                     ['Previously Utilized', money(c.previouslyUtilized)],
//                     ['Remaining Coverage', money(c.remainingBefore)],
//                     ['Claim Amount', money(c.claimAmount)],
//                   ].map(([l, v]) => (
//                     <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '4px 0', color: T.textSecondary }}>
//                       <span>{l}</span><span style={{ fontWeight: 600, color: T.textPrimary }}>{v}</span>
//                     </div>
//                   ))}
//                   <div style={{ borderTop: `1px solid ${T.borderLight}`, marginTop: '8px', paddingTop: '8px' }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700 }}>
//                       <span style={{ color: T.commitGreen }}>Covered Amount</span>
//                       <span style={{ color: T.commitGreen }}>{money(c.coveredAmount)}</span>
//                     </div>
//                     {c.excessAmount > 0 && (
//                       <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, marginTop: '4px' }}>
//                         <span style={{ color: T.error }}>Excess Amount</span>
//                         <span style={{ color: T.error }}>{money(c.excessAmount)}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Documents */}
//               <div style={{ marginBottom: '18px' }}>
//                 <div style={{ fontSize: '12px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
//                   Documents
//                 </div>
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
//                   {c.documentsRequired.map(d => (
//                     <div key={d} style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px', color: c.documentsReceived.includes(d) ? T.textPrimary : T.error }}>
//                       <span>{c.documentsReceived.includes(d) ? '✓' : '✗'}</span> {d}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Reasons / recommendation */}
//               <div style={{
//                 padding: '12px 14px', borderRadius: '8px',
//                 background: c.status === 'valid' ? '#f0fdf4' : c.status === 'rejected' ? T.errorBg : '#fff7ed',
//                 border: `1px solid ${c.status === 'valid' ? '#bbf7d0' : c.status === 'rejected' ? '#fecaca' : '#fed7aa'}`,
//               }}>
//                 <div style={{ fontSize: '12px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
//                   Recommendation
//                 </div>
//                 {c.reasons.map((r, i) => (
//                   <div key={i} style={{ fontSize: '13px', color: T.textPrimary, marginBottom: '2px' }}>• {r}</div>
//                 ))}
//               </div>
//             </div>
//           );
//         })()}
//       </Modal>
//     </div>
//   );
// }


import React, { useState, useRef } from 'react';
import { T } from '../../tokens';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import Modal from '../../components/UI/Modal';

/* ============================================================================
   MOCK DATA — represents what the CSV rows resolve to once matched against
   member/policy records in the backend. Each claim carries the full trail
   of checks a real adjudication engine would run, so we can visualise it.
   ============================================================================ */

const STATUS_META = {
  valid:      { label: 'Valid',                   emoji: '🟢', badge: 'Approved' },
  partial:    { label: 'Partially Covered',       emoji: '🟡', badge: 'Action Required' },
  review:     { label: 'Needs Review',            emoji: '🟠', badge: 'Pending' },
  rejected:   { label: 'Rejected',                emoji: '🔴', badge: 'Rejected' },
  preauth:    { label: 'Pending Pre-Authorization', emoji: '🔵', badge: 'In Review' },
};

function buildClaims() {
  const rows = [
    {
      id: 'CLM-2026-0001', policyNumber: 'EFU-TPA-2026-0041', member: 'Ali Khan', relationship: 'Self',
      benefitType: 'Hospitalization', settlementType: 'Reimbursement', hospital: 'Aga Khan University Hospital',
      claimAmount: 120000, annualLimit: 500000, previouslyUtilized: 150000,
      policyActive: true, coveragePeriodOk: true, memberOnPolicy: true, hospitalPanel: true,
      documentsRequired: ['Hospital Bill', 'Discharge Summary', "Doctor's Prescription", 'Medical Reports', 'CNIC / Member ID', 'Payment Receipt'],
      documentsReceived: ['Hospital Bill', 'Discharge Summary', "Doctor's Prescription", 'Medical Reports', 'CNIC / Member ID', 'Payment Receipt'],
      duplicate: false,
      ocrBillAmount: 118500, ocrDiagnosis: 'Acute appendicitis', claimDiagnosis: 'Appendicitis surgery',
    },
    {
      id: 'CLM-2026-0002', policyNumber: 'EFU-TPA-2026-0058', member: 'Sara Ali', relationship: 'Spouse',
      benefitType: 'Hospitalization', settlementType: 'Reimbursement', hospital: 'South City Hospital',
      claimAmount: 250000, annualLimit: 500000, previouslyUtilized: 400000,
      policyActive: true, coveragePeriodOk: true, memberOnPolicy: true, hospitalPanel: true,
      documentsRequired: ['Hospital Bill', 'Discharge Summary', "Doctor's Prescription", 'Medical Reports', 'CNIC / Member ID', 'Payment Receipt'],
      documentsReceived: ['Hospital Bill', 'Discharge Summary', "Doctor's Prescription", 'Medical Reports', 'CNIC / Member ID', 'Payment Receipt'],
      duplicate: false,
      ocrBillAmount: 250000, ocrDiagnosis: 'Cholecystectomy (gallbladder removal)', claimDiagnosis: 'Gallbladder surgery',
    },
    {
      id: 'CLM-2026-0003', policyNumber: 'EFU-TPA-2026-0072', member: 'Ahmed Raza', relationship: 'Self',
      benefitType: 'Treatment / OPD', settlementType: 'Reimbursement', hospital: 'City Clinic',
      claimAmount: 15000, annualLimit: 50000, previouslyUtilized: 20000,
      policyActive: true, coveragePeriodOk: true, memberOnPolicy: true, hospitalPanel: true,
      documentsRequired: ["Doctor's Prescription", 'Consultation / Treatment Bill', 'Payment Receipt', 'CNIC / Member ID'],
      documentsReceived: ["Doctor's Prescription", 'Payment Receipt', 'CNIC / Member ID'],
      duplicate: false,
      ocrBillAmount: null, ocrDiagnosis: null, claimDiagnosis: 'Dengue fever treatment',
    },
    {
      id: 'CLM-2026-0004', policyNumber: 'EFU-TPA-2026-0041', member: 'Zain Khan', relationship: 'Child',
      benefitType: 'Hospitalization', settlementType: 'Cashless', hospital: 'Al-Shifa Trust Clinic',
      claimAmount: 50000, annualLimit: 500000, previouslyUtilized: 0,
      policyActive: true, coveragePeriodOk: true, memberOnPolicy: false, hospitalPanel: false,
      documentsRequired: ['Admission / Pre-Authorization Request', "Doctor's Prescription / Medical Report"],
      documentsReceived: [],
      duplicate: false,
      ocrBillAmount: null, ocrDiagnosis: null, claimDiagnosis: 'Fracture treatment',
    },
    {
      id: 'CLM-2026-0005', policyNumber: 'EFU-TPA-2026-0093', member: 'Hina Sheikh', relationship: 'Self',
      benefitType: 'Hospitalization', settlementType: 'Cashless', hospital: 'Liaquat National Hospital',
      claimAmount: 150000, annualLimit: 400000, previouslyUtilized: 100000,
      policyActive: true, coveragePeriodOk: true, memberOnPolicy: true, hospitalPanel: true,
      documentsRequired: ['Admission / Pre-Authorization Request', "Doctor's Prescription / Medical Report"],
      documentsReceived: ['Admission / Pre-Authorization Request', "Doctor's Prescription / Medical Report"],
      duplicate: false,
      ocrBillAmount: null, ocrDiagnosis: 'Dengue fever with warning signs', claimDiagnosis: 'Dengue fever',
    },
    {
      id: 'CLM-2026-0006', policyNumber: 'EFU-TPA-2025-0011', member: 'Bilal Ahmed', relationship: 'Self',
      benefitType: 'Hospitalization', settlementType: 'Reimbursement', hospital: 'Doctors Hospital',
      claimAmount: 80000, annualLimit: 500000, previouslyUtilized: 0,
      policyActive: false, coveragePeriodOk: false, memberOnPolicy: true, hospitalPanel: true,
      documentsRequired: ['Hospital Bill', 'Discharge Summary', "Doctor's Prescription", 'Medical Reports', 'CNIC / Member ID', 'Payment Receipt'],
      documentsReceived: ['Hospital Bill', 'Discharge Summary'],
      duplicate: false,
    },
    {
      id: 'CLM-2026-0007', policyNumber: 'EFU-TPA-2026-0058', member: 'Sara Ali', relationship: 'Spouse',
      benefitType: 'Hospitalization', settlementType: 'Reimbursement', hospital: 'South City Hospital',
      claimAmount: 250000, annualLimit: 500000, previouslyUtilized: 400000,
      policyActive: true, coveragePeriodOk: true, memberOnPolicy: true, hospitalPanel: true,
      documentsRequired: ['Hospital Bill', 'Discharge Summary', "Doctor's Prescription", 'Medical Reports', 'CNIC / Member ID', 'Payment Receipt'],
      documentsReceived: ['Hospital Bill', 'Discharge Summary', "Doctor's Prescription", 'Medical Reports', 'CNIC / Member ID', 'Payment Receipt'],
      duplicate: true, // same policy+member+amount as CLM-0002 → duplicate submission
    },
    {
      id: 'CLM-2026-0008', policyNumber: 'EFU-TPA-2026-0104', member: 'Nida Farooq', relationship: 'Self',
      benefitType: 'Treatment / OPD', settlementType: 'Cashless', hospital: 'Shifa International Hospital',
      claimAmount: 8000, annualLimit: 50000, previouslyUtilized: 10000,
      policyActive: true, coveragePeriodOk: true, memberOnPolicy: true, hospitalPanel: true,
      documentsRequired: ["Doctor's Prescription", 'Medical Report / Investigation Report'],
      documentsReceived: ["Doctor's Prescription", 'Medical Report / Investigation Report'],
      duplicate: false,
    },
    {
      id: 'CLM-2026-0009', policyNumber: 'EFU-TPA-2026-0130', member: 'Usman Tariq', relationship: 'Self',
      benefitType: 'Hospitalization', settlementType: 'Reimbursement', hospital: 'Hameed Latif Hospital',
      claimAmount: 300000, annualLimit: 500000, previouslyUtilized: 0,
      policyActive: true, coveragePeriodOk: true, memberOnPolicy: true, hospitalPanel: true,
      documentsRequired: ['Hospital Bill', 'Discharge Summary', "Doctor's Prescription", 'Medical Reports', 'CNIC / Member ID', 'Payment Receipt'],
      documentsReceived: ['Hospital Bill', 'Discharge Summary', "Doctor's Prescription", 'Medical Reports', 'CNIC / Member ID', 'Payment Receipt'],
      duplicate: false,
    },
    {
      id: 'CLM-2026-0010', policyNumber: 'INVALID-9999', member: 'Kamran Ilyas', relationship: 'Self',
      benefitType: 'Hospitalization', settlementType: 'Reimbursement', hospital: 'Ittefaq Hospital',
      claimAmount: 60000, annualLimit: 0, previouslyUtilized: 0,
      policyActive: false, coveragePeriodOk: false, memberOnPolicy: false, hospitalPanel: false,
      policyExists: false,
      documentsRequired: ['Hospital Bill', 'Discharge Summary'],
      documentsReceived: [],
      duplicate: false,
    },
  ];

  return rows.map(r => {
    const policyExists = r.policyExists !== false;
    const remainingBefore = Math.max(r.annualLimit - r.previouslyUtilized, 0);
    const coveredAmount = Math.min(remainingBefore, r.claimAmount);
    const excessAmount = Math.max(r.claimAmount - remainingBefore, 0);

    const docsMissing = r.documentsRequired.filter(d => !r.documentsReceived.includes(d));
    const documentsOk = docsMissing.length === 0;

    // ---- AI document triage: OCR amount vs claimed amount, diagnosis consistency ----
    const ocrAmountDiscrepancy = r.ocrBillAmount != null && Math.abs(r.ocrBillAmount - r.claimAmount);
    const hasAmountDiscrepancy = ocrAmountDiscrepancy && ocrAmountDiscrepancy > 500;
    const diagnosisLooksConsistent = !r.ocrDiagnosis || !r.claimDiagnosis
      ? true
      : r.ocrDiagnosis.toLowerCase().includes(r.claimDiagnosis.split(' ')[0].toLowerCase())
        || r.claimDiagnosis.toLowerCase().includes(r.ocrDiagnosis.split(' ')[0].toLowerCase());
    const aiFlag = hasAmountDiscrepancy || !diagnosisLooksConsistent;

    // ---- determine final status by priority (hard fails first) ----
    let status;
    const reasons = [];

    if (!policyExists) {
      status = 'rejected'; reasons.push('Policy number does not exist in system');
    } else if (!r.policyActive || !r.coveragePeriodOk) {
      status = 'rejected'; reasons.push('Policy inactive / incident date outside coverage period');
    } else if (!r.memberOnPolicy) {
      status = 'review'; reasons.push(`${r.relationship} is not a registered dependent on this policy`);
    } else if (r.duplicate) {
      status = 'rejected'; reasons.push('Duplicate of a previously submitted claim (same policy, member & amount)');
    } else if (r.settlementType === 'Cashless' && !r.hospitalPanel) {
      status = 'review'; reasons.push('Facility is not an EFU Life panel/network provider — cashless not available');
    } else if (!documentsOk) {
      status = 'review'; reasons.push(`Missing required document(s): ${docsMissing.join(', ')}`);
    } else if (hasAmountDiscrepancy) {
      status = 'review'; reasons.push(`AI triage flagged an amount mismatch: OCR-extracted bill is PKR ${r.ocrBillAmount.toLocaleString()} vs claimed PKR ${r.claimAmount.toLocaleString()}`);
    } else if (excessAmount > 0) {
      status = 'partial'; reasons.push(`Claim exceeds remaining ${r.benefitType} coverage by PKR ${excessAmount.toLocaleString()}`);
    } else if (r.settlementType === 'Cashless') {
      status = 'preauth'; reasons.push('Cashless claim queued for pre-authorization approval');
    } else {
      status = 'valid'; reasons.push('All checks passed — within coverage, documents complete, AI triage consistent');
    }

    return { ...r, policyExists, remainingBefore, coveredAmount, excessAmount, docsMissing, documentsOk, aiFlag, hasAmountDiscrepancy, diagnosisLooksConsistent, status, reasons };
  });
}

const PIPELINE_STAGES = [
  { key: 'csv',      label: 'Reading & validating CSV structure' },
  { key: 'member',   label: 'Matching members & policies' },
  { key: 'coverage', label: 'Checking benefit eligibility & coverage' },
  { key: 'provider',  label: 'Validating hospital / provider eligibility' },
  { key: 'documents', label: 'Checking required documents' },
  { key: 'ai',        label: 'AI document triage — OCR & consistency check' },
  { key: 'finalize',  label: 'Finalizing claim decisions' },
];

function money(n) {
  return `PKR ${n.toLocaleString()}`;
}

export default function BulkClaimUpload() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const [phase, setPhase] = useState('idle'); // idle | uploading | pipeline | results
  const [stageIndex, setStageIndex] = useState(-1);
  const [stageDone, setStageDone] = useState([]);
  const [claims, setClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [totalRecords, setTotalRecords] = useState(487);
  const [showAllRows, setShowAllRows] = useState(false);

  const template = [
    'Policy Number', 'Claimant Name', 'Relationship', 'Contact Mobile', 'Benefit Type',
    'Settlement Type', 'Incident / Admission Date', 'Facility Name', 'Claim Amount (PKR)', 'Description',
  ];

  const handleFile = (f) => {
    setFile(f);
    setPhase('idle');
    setStageIndex(-1);
    setStageDone([]);
  };

  const runPipeline = () => {
    if (!file) return;
    setPhase('uploading');
    setStageIndex(-1);
    setStageDone([]);

    const generated = buildClaims();
    setClaims(generated);

    // brief "uploading" beat, then step through pipeline stages
    setTimeout(() => {
      setPhase('pipeline');
      PIPELINE_STAGES.forEach((_, i) => {
        setTimeout(() => {
          setStageIndex(i);
          setTimeout(() => {
            setStageDone(prev => [...prev, i]);
            if (i === PIPELINE_STAGES.length - 1) {
              setTimeout(() => setPhase('results'), 700);
            }
          }, 900);
        }, i * 1100);
      });
    }, 700);
  };

  const reset = () => {
    setFile(null); setPhase('idle'); setStageIndex(-1); setStageDone([]); setClaims([]); setShowAllRows(false);
  };

  const counts = STATUS_META && claims.length ? Object.keys(STATUS_META).reduce((acc, k) => {
    acc[k] = claims.filter(c => c.status === k).length;
    return acc;
  }, {}) : {};

  // Simulated per-stage progress counts, scaled against the declared batch size
  const stageProgress = (i) => {
    if (i > stageIndex) return 0;
    if (i < stageIndex || stageDone.includes(i)) return totalRecords;
    // currently running stage — show a partial, slightly-less-than-total count
    return Math.floor(totalRecords * 0.78);
  };

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', animation: 'fadeIn 0.3s ease' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: T.primaryNavy, marginBottom: '6px' }}>
          Bulk Claim Upload — Hospital / Telco Agent Portal
        </h1>
        <p style={{ fontSize: '14px', color: T.textMuted }}>
          Upload batch claim intimations in CSV format. Maximum 500 records per batch.
        </p>
      </div>

      {phase === 'idle' && (
        <>
          {/* Instructions Card */}
          <div style={{
            background: T.cardSurface, border: `1px solid ${T.borderLight}`,
            borderRadius: '12px', padding: '20px 24px', marginBottom: '20px',
            boxShadow: 'var(--shadow-card)',
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: T.primaryNavy, marginBottom: '14px' }}>
              📋 Required CSV Columns
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              {template.map((col, i) => (
                <span key={i} style={{
                  background: '#eff6ff', color: T.stateBlue,
                  border: '1px solid #bfdbfe',
                  borderRadius: '6px', padding: '4px 10px',
                  fontSize: '12px', fontWeight: 600,
                }}>{col}</span>
              ))}
            </div>
            <Button variant="secondary" size="sm">
              ⬇️ Download Template CSV
            </Button>
          </div>

          {/* Drop Zone */}
          <div style={{
            background: T.cardSurface, border: `1px solid ${T.borderLight}`,
            borderRadius: '12px', padding: '24px', marginBottom: '20px',
            boxShadow: 'var(--shadow-card)',
          }}>
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
              onClick={() => inputRef.current.click()}
              style={{
                border: `2px dashed ${dragging ? T.stateBlue : file ? T.commitGreen : T.borderDefault}`,
                borderRadius: '10px', padding: '40px 20px',
                textAlign: 'center', cursor: 'pointer',
                background: dragging ? '#eff6ff' : file ? '#f0fdf4' : '#fafbfc',
                transition: 'all 0.2s ease',
              }}
            >
              <input ref={inputRef} type="file" accept=".csv" onChange={e => handleFile(e.target.files[0])} style={{ display: 'none' }} />
              <div style={{ fontSize: '42px', marginBottom: '12px' }}>
                {file ? '📊' : dragging ? '📂' : '📁'}
              </div>
              {file ? (
                <>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: T.commitGreen }}>{file.name}</div>
                  <div style={{ fontSize: '12px', color: T.textMuted, marginTop: '4px' }}>
                    {(file.size / 1024).toFixed(1)} KB · Click to replace
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: T.textPrimary }}>
                    {dragging ? 'Drop CSV file here' : 'Drag & drop your CSV batch file here'}
                  </div>
                  <div style={{ fontSize: '12px', color: T.textMuted, marginTop: '6px' }}>
                    Only .csv files accepted · Max 500 records
                  </div>
                </>
              )}
            </div>
          </div>

          <Button variant="primary" fullWidth onClick={runPipeline} disabled={!file} style={{ height: '48px' }}>
            🚀 Upload & Process Batch
          </Button>
        </>
      )}

      {/* ── UPLOADING BEAT ── */}
      {phase === 'uploading' && (
        <div style={{
          background: T.cardSurface, border: `1px solid ${T.borderLight}`,
          borderRadius: '12px', padding: '40px 24px', textAlign: 'center',
          boxShadow: 'var(--shadow-card)', animation: 'fadeIn 0.3s ease',
        }}>
          <div style={{
            width: 40, height: 40, margin: '0 auto 16px',
            border: `3px solid ${T.borderLight}`, borderTop: `3px solid ${T.stateBlue}`,
            borderRadius: '50%', animation: 'spin 0.8s linear infinite',
          }} />
          <div style={{ fontWeight: 700, fontSize: '15px', color: T.textPrimary }}>
            Uploading {file?.name}...
          </div>
          <div style={{ fontSize: '13px', color: T.textMuted, marginTop: '4px' }}>
            Reading {totalRecords} claim records from CSV
          </div>
        </div>
      )}

      {/* ── PIPELINE PROCESSING ── */}
      {phase === 'pipeline' && (
        <div style={{
          background: T.cardSurface, border: `1px solid ${T.borderLight}`,
          borderRadius: '14px', padding: '28px', boxShadow: 'var(--shadow-card)',
          animation: 'scaleIn 0.22s ease',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: T.primaryNavy }}>
              Batch #BATCH-2026-0098
            </h2>
            <span style={{ fontSize: '13px', fontWeight: 700, color: T.stateBlue }}>
              {Math.round(((stageDone.length) / PIPELINE_STAGES.length) * 100)}%
            </span>
          </div>
          <p style={{ fontSize: '13px', color: T.textMuted, marginBottom: '22px' }}>
            Processing {totalRecords} claims through the adjudication pipeline...
          </p>

          {/* Overall progress bar */}
          <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden', marginBottom: '26px' }}>
            <div style={{
              height: '100%',
              width: `${(stageDone.length / PIPELINE_STAGES.length) * 100}%`,
              background: `linear-gradient(90deg, ${T.primaryNavy}, ${T.stateBlue})`,
              borderRadius: '3px', transition: 'width 0.6s ease',
            }} />
          </div>

          {/* Stage checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {PIPELINE_STAGES.map((s, i) => {
              const isDone = stageDone.includes(i);
              const isRunning = i === stageIndex && !isDone;
              const isPending = i > stageIndex;
              const count = stageProgress(i);
              return (
                <div key={s.key} style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  opacity: isPending ? 0.4 : 1, transition: 'opacity 0.3s ease',
                }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isDone ? T.commitGreen : isRunning ? '#eff6ff' : '#f4f8fb',
                    border: isDone ? 'none' : isRunning ? `2px solid ${T.stateBlue}` : `2px solid ${T.borderLight}`,
                  }}>
                    {isDone ? (
                      <span style={{ color: '#fff', fontSize: '13px' }}>✓</span>
                    ) : isRunning ? (
                      <span style={{
                        display: 'block', width: 13, height: 13,
                        border: `2px solid ${T.stateBlue}`, borderTop: '2px solid transparent',
                        borderRadius: '50%', animation: 'spin 0.8s linear infinite',
                      }} />
                    ) : (
                      <span style={{ fontSize: '11px', color: T.textMuted, fontWeight: 600 }}>{i + 1}</span>
                    )}
                  </div>
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '13.5px', fontWeight: isDone || isRunning ? 600 : 500,
                      color: isDone ? T.commitGreen : isRunning ? T.primaryNavy : T.textMuted,
                    }}>
                      {s.label}
                    </span>
                    {(isDone || isRunning) && (
                      <span style={{ fontSize: '12px', fontWeight: 700, color: isDone ? T.commitGreen : T.stateBlue }}>
                        {isDone ? totalRecords : count} / {totalRecords}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── RESULTS ── */}
      {phase === 'results' && (
        <div style={{ animation: 'fadeIn 0.35s ease' }}>
          <div style={{
            background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px',
            padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: T.commitGreen, fontWeight: 600,
          }}>
            ✅ Batch #BATCH-2026-0098 processed — {claims.length} of {totalRecords} sample rows shown below for demonstration.
          </div>

          {/* KPI summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '22px' }}>
            {Object.entries(STATUS_META).map(([key, meta]) => (
              <div key={key} style={{
                background: T.cardSurface, border: `1px solid ${T.borderLight}`,
                borderRadius: '12px', padding: '14px', textAlign: 'center',
                boxShadow: 'var(--shadow-card)',
              }}>
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>{meta.emoji}</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: T.textPrimary }}>{counts[key] || 0}</div>
                <div style={{ fontSize: '11px', color: T.textMuted, fontWeight: 600, marginTop: '2px' }}>{meta.label}</div>
              </div>
            ))}
          </div>

          {/* Results table */}
          <div style={{
            background: T.cardSurface, border: `1px solid ${T.borderLight}`,
            borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-card)', marginBottom: '20px',
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: T.pageCanvas, borderBottom: `1px solid ${T.borderLight}` }}>
                  {['Claim', 'Member', 'Relationship', 'Benefit', 'Amount', 'Coverage Left', 'Documents', 'Status'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 14px', fontSize: '11px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(showAllRows ? claims : claims.slice(0, 6)).map(c => {
                  const meta = STATUS_META[c.status];
                  return (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedClaim(c)}
                      style={{ borderBottom: `1px solid ${T.borderLight}`, cursor: 'pointer', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = T.pageCanvas}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '10px 14px', fontWeight: 700, color: T.primaryNavy }}>{c.id}</td>
                      <td style={{ padding: '10px 14px', color: T.textPrimary }}>{c.member}</td>
                      <td style={{ padding: '10px 14px', color: T.textMuted }}>{c.relationship}</td>
                      <td style={{ padding: '10px 14px', color: T.textMuted }}>{c.benefitType}</td>
                      <td style={{ padding: '10px 14px', color: T.textPrimary }}>{money(c.claimAmount)}</td>
                      <td style={{ padding: '10px 14px', color: T.textMuted }}>
                        {c.policyExists ? money(c.remainingBefore) : '—'}
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        {c.documentsOk
                          ? <span style={{ color: T.commitGreen, fontWeight: 600 }}>Complete</span>
                          : <span style={{ color: T.error, fontWeight: 600 }}>{c.docsMissing.length} missing</span>}
                      </td>
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                        {meta.emoji} {meta.label}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {!showAllRows && claims.length > 6 && (
            <div style={{ textAlign: 'center', padding: '10px 0 20px' }}>
              <button
                onClick={() => setShowAllRows(true)}
                style={{
                  background: 'none', border: 'none', color: T.stateBlue,
                  fontWeight: 700, fontSize: '13px', cursor: 'pointer',
                }}
              >
                View all {claims.length} claims in this sample ↓
              </button>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary" onClick={reset}>← Upload Another Batch</Button>
          </div>
          <p style={{ fontSize: '12px', color: T.textMuted, marginTop: '10px' }}>
            Claims flagged 🟠 Needs Review or 🟡 Partially Covered are routed to the assessment team for manual handling.
            Your hospital/agent view only shows submission status — detailed adjudication happens on the claims team side.
          </p>
        </div>
      )}

      {/* ── CLAIM DETAIL MODAL ── */}
      <Modal open={!!selectedClaim} onClose={() => setSelectedClaim(null)} title={selectedClaim ? `Claim Validation — ${selectedClaim.id}` : ''} width="600px">
        {selectedClaim && (() => {
          const c = selectedClaim;
          const meta = STATUS_META[c.status];
          const checks = [
            { label: 'Policy Verification', ok: c.policyExists },
            { label: 'Member Verification', ok: c.policyExists && c.memberOnPolicy },
            { label: 'Policy Active / Coverage Period', ok: c.policyExists && c.policyActive && c.coveragePeriodOk },
            { label: 'Benefit Covered', ok: c.policyExists && c.memberOnPolicy },
            { label: 'Hospital / Provider Eligibility', ok: c.settlementType === 'Reimbursement' || c.hospitalPanel },
            { label: 'Coverage Available', ok: c.excessAmount === 0, warn: c.excessAmount > 0 },
            { label: 'Document Validation', ok: c.documentsOk },
            { label: 'Duplicate Check', ok: !c.duplicate },
          ];
          return (
            <div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px',
                padding: '10px 14px', borderRadius: '8px', background: T.pageCanvas,
              }}>
                <span style={{ fontSize: '18px' }}>{meta.emoji}</span>
                <Badge status={meta.badge} />
                <span style={{ fontSize: '13px', color: T.textMuted, marginLeft: 'auto' }}>
                  {c.member} · {c.relationship} · {c.policyNumber}
                </span>
              </div>

              {/* Checks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                {checks.map(ch => (
                  <div key={ch.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                    <span style={{ color: T.textPrimary }}>{ch.label}</span>
                    <span style={{ fontWeight: 700, color: ch.ok ? T.commitGreen : ch.warn ? T.goldAccent || '#cd924e' : T.error }}>
                      {ch.ok ? '✓' : ch.warn ? '⚠' : '✗'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coverage calculation */}
              {c.policyExists && (
                <div style={{
                  border: `1px solid ${T.borderLight}`, borderRadius: '10px', padding: '16px', marginBottom: '18px',
                }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                    Coverage Calculation — {c.benefitType}
                  </div>
                  {[
                    ['Annual Limit', money(c.annualLimit)],
                    ['Previously Utilized', money(c.previouslyUtilized)],
                    ['Remaining Coverage', money(c.remainingBefore)],
                    ['Claim Amount', money(c.claimAmount)],
                  ].map(([l, v]) => (
                    <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '4px 0', color: T.textSecondary }}>
                      <span>{l}</span><span style={{ fontWeight: 600, color: T.textPrimary }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: `1px solid ${T.borderLight}`, marginTop: '8px', paddingTop: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700 }}>
                      <span style={{ color: T.commitGreen }}>Covered Amount</span>
                      <span style={{ color: T.commitGreen }}>{money(c.coveredAmount)}</span>
                    </div>
                    {c.excessAmount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, marginTop: '4px' }}>
                        <span style={{ color: T.error }}>Excess Amount</span>
                        <span style={{ color: T.error }}>{money(c.excessAmount)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Documents */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Documents
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {c.documentsRequired.map(d => (
                    <div key={d} style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px', color: c.documentsReceived.includes(d) ? T.textPrimary : T.error }}>
                      <span>{c.documentsReceived.includes(d) ? '✓' : '✗'}</span> {d}
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Document Intelligence */}
              {(c.ocrBillAmount != null || c.ocrDiagnosis) && (
                <div style={{
                  border: `1px solid ${c.hasAmountDiscrepancy || !c.diagnosisLooksConsistent ? '#fed7aa' : T.borderLight}`,
                  background: c.hasAmountDiscrepancy || !c.diagnosisLooksConsistent ? '#fff7ed' : T.pageCanvas,
                  borderRadius: '10px', padding: '16px', marginBottom: '18px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                    🤖 AI Document Intelligence — OCR & Consistency Check
                  </div>
                  {c.ocrBillAmount != null && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '4px 0' }}>
                      <span style={{ color: T.textSecondary }}>OCR-Extracted Bill Amount</span>
                      <span style={{ fontWeight: 700, color: c.hasAmountDiscrepancy ? T.error : T.textPrimary }}>
                        {money(c.ocrBillAmount)} {c.hasAmountDiscrepancy && `(⚠ vs claimed ${money(c.claimAmount)})`}
                      </span>
                    </div>
                  )}
                  {c.ocrDiagnosis && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '4px 0' }}>
                      <span style={{ color: T.textSecondary }}>Extracted Diagnosis</span>
                      <span style={{ fontWeight: 600, color: T.textPrimary, textAlign: 'right', maxWidth: '60%' }}>{c.ocrDiagnosis}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '4px 0' }}>
                    <span style={{ color: T.textSecondary }}>Diagnosis ↔ Claim Description</span>
                    <span style={{ fontWeight: 700, color: c.diagnosisLooksConsistent ? T.commitGreen : T.error }}>
                      {c.diagnosisLooksConsistent ? '✓ Consistent' : '⚠ Needs review'}
                    </span>
                  </div>
                </div>
              )}

              {/* Reasons / recommendation */}
              <div style={{
                padding: '12px 14px', borderRadius: '8px',
                background: c.status === 'valid' ? '#f0fdf4' : c.status === 'rejected' ? T.errorBg : '#fff7ed',
                border: `1px solid ${c.status === 'valid' ? '#bbf7d0' : c.status === 'rejected' ? '#fecaca' : '#fed7aa'}`,
              }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Recommendation
                </div>
                {c.reasons.map((r, i) => (
                  <div key={i} style={{ fontSize: '13px', color: T.textPrimary, marginBottom: '2px' }}>• {r}</div>
                ))}
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}