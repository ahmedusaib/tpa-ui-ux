import React, { useState, useRef, useEffect } from 'react';
import { T } from '../../tokens';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import CrossModulePanel from '../../components/shared/CrossModulePanel';
import Modal from '../../components/UI/Modal';

const EXTRACTED_FIELDS = [
  { key: 'hospitalName',   label: 'Hospital Name',         value: 'Aga Khan University Hospital', confidence: 98 },
  { key: 'patientName',    label: 'Patient Name',           value: 'Jawad Saleem', confidence: 99 },
  { key: 'admissionDate',  label: 'Admission Date',         value: '22 Aug 2026', confidence: 97 },
  { key: 'dischargeDate',  label: 'Discharge Date',         value: '25 Aug 2026', confidence: 97 },
  { key: 'diagnosis',      label: 'Diagnosis / ICD-10',     value: 'Acute Appendicitis (K35.8)', confidence: 91 },
  { key: 'totalBill',      label: 'Total Bill Amount',      value: 'PKR 45,000', confidence: 95 },
  { key: 'doctorName',     label: 'Attending Physician',    value: 'Dr. Farrukh Raheem', confidence: 88 },
  { key: 'cnicNumber',     label: 'CNIC on Document',       value: '42101-XXXXXXX-X', confidence: 94 },
];

const BOUNDING_BOXES = [
  { top: '8%',  left: '8%',  width: '60%', height: '7%',  label: 'Hospital Header' },
  { top: '22%', left: '8%',  width: '40%', height: '6%',  label: 'Patient Name' },
  { top: '31%', left: '8%',  width: '50%', height: '5%',  label: 'Admission/Discharge' },
  { top: '42%', left: '8%',  width: '70%', height: '5%',  label: 'Diagnosis' },
  { top: '56%', left: '8%',  width: '55%', height: '6%',  label: 'Total Bill' },
  { top: '70%', left: '8%',  width: '45%', height: '5%',  label: 'Doctor Signature' },
];

function ConfidenceBar({ score }) {
  const color = score >= 95 ? T.commitGreen : score >= 85 ? T.goldAccent : T.error;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ flex: 1, height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${score}%`,
          background: color, borderRadius: '2px',
          transition: 'width 0.8s ease',
        }} />
      </div>
      <span style={{ fontSize: '11px', fontWeight: 700, color, minWidth: '32px' }}>{score}%</span>
    </div>
  );
}

export default function AssessmentWorkbench() {
  const [scanning, setScanning]           = useState(false);
  const [scanDone, setScanDone]           = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [boxes, setBoxes]                 = useState([]);
  const [scanLineY, setScanLineY]         = useState(0);
  const [approvedAmount, setApprovedAmount] = useState('40500');
  const [deductible, setDeductible]       = useState('4500');
  const [reasonCode, setReasonCode]       = useState('');
  const [notes, setNotes]                 = useState('');
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [decision, setDecision]           = useState(null);
  const animRef = useRef();
  const startRef = useRef();

  const handleRunOCR = () => {
    if (scanning) return;
    setScanning(true);
    setScanDone(false);
    setRevealedCount(0);
    setBoxes([]);
    setScanLineY(0);

    const duration = 2400;
    startRef.current = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      setScanLineY(progress * 90);

      // Reveal bounding boxes progressively
      const toReveal = Math.floor(progress * BOUNDING_BOXES.length);
      setBoxes(BOUNDING_BOXES.slice(0, toReveal));

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setScanning(false);
        setScanDone(true);
        // Reveal fields one by one
        EXTRACTED_FIELDS.forEach((_, i) => {
          setTimeout(() => setRevealedCount(i + 1), i * 200);
        });
      }
    };
    animRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  const handleDecision = (d) => {
    setDecision(d);
    if (d === 'Approve') setShowApproveModal(true);
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: T.primaryNavy, marginBottom: '4px' }}>
          Assessment & AI Extraction Workbench
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '13px', color: T.textMuted }}>Claim: CLM-2026-48821</span>
          <Badge status="In Review" />
          <Badge status="Low Risk" />
          <span style={{ fontSize: '13px', color: T.textMuted }}>· Subscriber: Jawad Saleem · Hospitalization</span>
        </div>
      </div>

      {/* Split Pane */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', height: 'calc(100vh - 230px)' }}>

        {/* ── LEFT: Document Viewer ── */}
        <div style={{
          background: T.darkSurface1,
          borderRadius: '14px',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
        }}>
          {/* Viewer Toolbar */}
          <div style={{
            height: '44px', background: T.darkSurface2,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 16px', borderBottom: '1px solid rgba(255,255,255,0.1)',
            flexShrink: 0,
          }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>
              📄 hospital_bill_AKU.pdf
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>, title: 'Zoom/Search' },
                { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>, title: 'Download Document' },
                { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>, title: 'Print Document' }
              ].map((item, idx) => (
                <button key={idx} title={item.title} style={{
                  background: 'rgba(255,255,255,0.1)', border: 'none',
                  borderRadius: '6px', width: 30, height: 30,
                  cursor: 'pointer', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >{item.icon}</button>
              ))}
            </div>
          </div>

          {/* Document Canvas */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden', padding: '12px' }}>
            {/* Simulated Document */}
            <div style={{
              background: '#fff', borderRadius: '6px',
              height: '100%', position: 'relative', overflow: 'hidden',
              padding: '20px',
            }}>
              {/* Document Text Simulation */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ height: '22px', background: '#0f4c7a', borderRadius: '3px', width: '70%', marginBottom: '6px' }} />
                <div style={{ height: '12px', background: '#e2e8f0', borderRadius: '2px', width: '50%' }} />
              </div>
              <div style={{ height: '1px', background: '#e2e8f0', marginBottom: '14px' }} />
              {[['Patient Name', 'Jawad Saleem'], ['CNIC', '42101-XXXXXXX-X'], ['DOB', '15 March 1988']].map(([l,v]) => (
                <div key={l} style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                  <div style={{ height: '10px', background: '#c5cad0', borderRadius: '2px', width: '100px' }} />
                  <div style={{ height: '10px', background: '#1a2533', borderRadius: '2px', width: '130px' }} />
                </div>
              ))}
              <div style={{ height: '1px', background: '#e2e8f0', margin: '14px 0' }} />
              <div style={{ height: '14px', background: '#0f4c7a', borderRadius: '2px', width: '45%', marginBottom: '10px', opacity: 0.7 }} />
              {[120, 90, 110, 70, 80].map((w, i) => (
                <div key={i} style={{ height: '9px', background: '#e2e8f0', borderRadius: '2px', width: `${w}px`, marginBottom: '6px' }} />
              ))}
              <div style={{ marginTop: '16px' }}>
                <div style={{ height: '12px', background: '#e2e8f0', borderRadius: '2px', width: '60%', marginBottom: '6px' }} />
                <div style={{ height: '18px', background: '#00a651', borderRadius: '3px', width: '45%' }} />
              </div>
              <div style={{ marginTop: '20px', height: '1px', background: '#e2e8f0' }} />
              <div style={{ height: '12px', background: '#c5cad0', borderRadius: '2px', width: '30%', marginTop: '10px' }} />
              <div style={{ height: '40px', background: '#f4f8fb', borderRadius: '4px', width: '50%', marginTop: '6px' }} />

              {/* Scan Line */}
              {scanning && (
                <div style={{
                  position: 'absolute', left: 0, right: 0,
                  top: `${scanLineY}%`,
                  height: '2px',
                  background: `linear-gradient(90deg, transparent, ${T.stateBlue}, ${T.stateBlue}, transparent)`,
                  boxShadow: `0 0 12px ${T.stateBlue}`,
                  pointerEvents: 'none',
                  transition: 'top 0.05s linear',
                }} />
              )}

              {/* Bounding Boxes */}
              {boxes.map((box, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: box.top, left: box.left,
                    width: box.width, height: box.height,
                    border: `2px solid ${T.stateBlue}`,
                    borderRadius: '3px',
                    background: 'rgba(27,117,187,0.08)',
                    animation: 'boxReveal 0.3s ease',
                    pointerEvents: 'none',
                  }}
                >
                  <span style={{
                    position: 'absolute', top: -18, left: 0,
                    fontSize: '9px', fontWeight: 700, color: T.stateBlue,
                    background: '#fff', padding: '1px 4px', borderRadius: '3px',
                    border: `1px solid ${T.stateBlue}`,
                    whiteSpace: 'nowrap',
                  }}>{box.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Run OCR Button */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
            <Button
              id="run-ocr-btn"
              variant="primary"
              fullWidth
              onClick={handleRunOCR}
              loading={scanning}
              style={{ height: '44px', background: 'linear-gradient(135deg, #1b75bb, #0f4c7a)' }}
            >
              {scanning ? '🤖 Scanning Document...' : scanDone ? '🔄 Re-run AI Extract' : '🤖 Run AI Extract & Adjudicate'}
            </Button>
          </div>
        </div>

        {/* ── RIGHT: Extraction & Controls ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', paddingRight: '2px' }}>

          {/* AI Risk Badge */}
          {scanDone && (
            <div style={{
              padding: '12px 16px',
              background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
              border: `1px solid ${T.commitGreen}`,
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              animation: 'fadeIn 0.4s ease',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '22px' }}>🤖</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: T.commitGreen }}>
                    Low Risk — Auto-Approve Suggested
                  </div>
                  <div style={{ fontSize: '12px', color: T.textMuted }}>
                    No anomalies detected · All documents verified · Policy active
                  </div>
                </div>
              </div>
              <Badge status="Low Risk" />
            </div>
          )}

          {/* Extracted Fields */}
          <div style={{
            background: T.cardSurface, border: `1px solid ${T.borderLight}`,
            borderRadius: '12px', overflow: 'hidden',
            boxShadow: 'var(--shadow-card)',
          }}>
            <div style={{
              padding: '12px 16px', background: T.pageCanvas,
              borderBottom: `1px solid ${T.borderLight}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontWeight: 700, fontSize: '13px', color: T.primaryNavy }}>
                🔍 AI Extracted Fields
              </span>
              {scanDone && (
                <span style={{
                  fontSize: '11px', background: '#f0fdf4', color: T.commitGreen,
                  border: '1px solid #bbf7d0', padding: '2px 8px', borderRadius: '4px', fontWeight: 600,
                }}>
                  {revealedCount}/{EXTRACTED_FIELDS.length} extracted
                </span>
              )}
            </div>
            <div style={{ padding: '8px 16px 12px' }}>
              {!scanDone ? (
                <div style={{
                  textAlign: 'center', padding: '24px 0',
                  color: T.textMuted, fontSize: '13px',
                }}>
                  Click "Run AI Extract & Adjudicate" to begin extraction
                </div>
              ) : (
                EXTRACTED_FIELDS.slice(0, revealedCount).map((field, i) => (
                  <div
                    key={field.key}
                    style={{
                      padding: '9px 0',
                      borderBottom: i < revealedCount - 1 ? `1px solid ${T.borderLight}` : 'none',
                      animation: 'fadeIn 0.3s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '12px', color: T.textMuted, fontWeight: 500 }}>{field.label}</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: T.textPrimary }}>{field.value}</span>
                    </div>
                    <ConfidenceBar score={field.confidence} />
                  </div>
                ))
              )}
            </div>
          </div>

          {scanDone && (
            <>
              {/* Cross-Module Lookups */}
              <CrossModulePanel />

              {/* Adjudication Controls */}
              <div style={{
                background: T.cardSurface, border: `1px solid ${T.borderLight}`,
                borderRadius: '12px', padding: '16px',
                boxShadow: 'var(--shadow-card)',
              }}>
            <h3 style={{ fontWeight: 700, fontSize: '14px', color: T.primaryNavy, marginBottom: '14px' }}>
              ⚖️ Adjudication Controls
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              {[
                { label: 'Approved Payable Amount (PKR)', id: 'approved-amount', value: approvedAmount, setter: setApprovedAmount },
                { label: 'Deductible Applied (PKR)', id: 'deductible', value: deductible, setter: setDeductible },
              ].map(f => (
                <div key={f.id}>
                  <label htmlFor={f.id} style={{ fontSize: '12px', fontWeight: 600, color: T.textPrimary, display: 'block', marginBottom: '5px' }}>
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    type="number"
                    value={f.value}
                    onChange={e => f.setter(e.target.value)}
                    style={{
                      width: '100%', height: '40px', padding: '0 12px',
                      border: `1px solid ${T.borderDefault}`, borderRadius: '8px',
                      fontFamily: 'var(--font-family)', fontSize: '14px', fontWeight: 700,
                      color: T.primaryNavy, outline: 'none',
                    }}
                  />
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: T.textPrimary, display: 'block', marginBottom: '5px' }}>
                  Reason Code
                </label>
                <select
                  id="reason-code"
                  value={reasonCode}
                  onChange={e => setReasonCode(e.target.value)}
                  style={{
                    width: '100%', height: '40px', padding: '0 10px',
                    border: `1px solid ${T.borderDefault}`, borderRadius: '8px',
                    fontFamily: 'var(--font-family)', fontSize: '13px', fontWeight: 500,
                    background: T.cardSurface, outline: 'none',
                  }}
                >
                  <option value="">— Select Reason Code —</option>
                  <option value="HOSP-STD">HOSP-STD: Standard Hospitalization</option>
                  <option value="DEDUCT-10">DEDUCT-10: 10% Co-pay Applied</option>
                  <option value="PREEX-EXCL">PREEX-EXCL: Pre-existing Exclusion</option>
                  <option value="DUP-CLM">DUP-CLM: Duplicate Claim</option>
                  <option value="INSUF-DOC">INSUF-DOC: Insufficient Documentation</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: T.textPrimary, display: 'block', marginBottom: '5px' }}>
                  Assessor Notes
                </label>
                <textarea
                  id="assessor-notes"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Add internal notes..."
                  rows={1}
                  style={{
                    width: '100%', padding: '8px 12px',
                    border: `1px solid ${T.borderDefault}`, borderRadius: '8px',
                    fontFamily: 'var(--font-family)', fontSize: '13px', fontWeight: 500,
                    resize: 'none', outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* Decision Buttons */}
            <div style={{ display: 'flex', gap: '10px', paddingTop: '12px', borderTop: `1px solid ${T.borderLight}` }}>
              <Button
                id="btn-approve"
                variant="commit"
                onClick={() => handleDecision('Approve')}
                style={{ flex: 1 }}
              >
                ✅ Approve
              </Button>
              <Button
                id="btn-reject"
                variant="danger"
                onClick={() => handleDecision('Reject')}
                style={{ flex: 1 }}
              >
                ❌ Reject
              </Button>
              <Button
                id="btn-refer"
                variant="ghost"
                onClick={() => handleDecision('Refer')}
                style={{ flex: 1 }}
              >
                📤 Refer
              </Button>
            </div>

            {decision && decision !== 'Approve' && (
              <div style={{
                marginTop: '12px', padding: '10px 14px',
                background: decision === 'Reject' ? T.errorBg : '#eff6ff',
                border: `1px solid ${decision === 'Reject' ? '#fecaca' : '#bfdbfe'}`,
                borderRadius: '8px', fontSize: '13px',
                color: decision === 'Reject' ? T.error : T.stateBlue,
                fontWeight: 600, animation: 'fadeIn 0.25s ease',
              }}>
                {decision === 'Reject' ? '❌ Claim marked for Rejection — Maker-Checker approval required.' : '📤 Claim referred for senior review.'}
              </div>
            )}
          </div>
          </>
          )}
        </div>
      </div>

      {/* Approve Confirmation Modal */}
      <Modal open={showApproveModal} onClose={() => setShowApproveModal(false)} title="Confirm Claim Approval" width="480px">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            padding: '14px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px',
          }}>
            <div style={{ fontWeight: 700, color: T.commitGreen, marginBottom: '6px' }}>Approval Summary</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: T.textMuted }}>Claim ID</span>
                <span style={{ fontWeight: 600 }}>CLM-2026-48821</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: T.textMuted }}>Approved Amount</span>
                <span style={{ fontWeight: 700, color: T.primaryNavy }}>PKR {Number(approvedAmount).toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: T.textMuted }}>Deductible</span>
                <span style={{ fontWeight: 600 }}>PKR {Number(deductible).toLocaleString()}</span>
              </div>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: T.textMuted }}>
            This action will forward to Checker for final sign-off before payout initiation.
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button variant="secondary" fullWidth onClick={() => setShowApproveModal(false)}>Cancel</Button>
            <Button variant="commit" fullWidth onClick={() => setShowApproveModal(false)}>
              ✅ Confirm & Forward to Checker
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
