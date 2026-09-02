import React, { useState, useEffect } from 'react';
import { T } from '../../tokens';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import Modal from '../../components/UI/Modal';
import StepWizard from '../../components/UI/StepWizard';
import FileDropZone from '../../components/UI/FileDropZone';

const STEPS = ['Policy Details', 'Incident Info', 'Documents'];

const VALIDATION_STEPS = [
  { label: 'Verifying Policy Status & Active Coverage...',      delay: 0 },
  { label: 'Validating Selected Benefit & Claim Limits...',     delay: 900 },
  { label: 'Scanning Attached Documents & Extracting Data...',  delay: 1850 },
  { label: 'Checking Waiting Periods & Pre-existing Exclusions...', delay: 2800 },
];

function InputField({ label, id, type = 'text', value, onChange, placeholder, required, options }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label htmlFor={id} style={{
        fontSize: '13px', fontWeight: 600, color: T.textPrimary,
      }}>
        {label} {required && <span style={{ color: T.error }}>*</span>}
      </label>
      {options ? (
        <select
          id={id}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            height: '42px', padding: '0 12px',
            border: `1px solid ${focused ? T.stateBlue : T.borderDefault}`,
            borderRadius: '8px', fontSize: '14px',
            fontFamily: 'var(--font-family)', fontWeight: 500,
            color: T.textPrimary, background: T.cardSurface,
            boxShadow: focused ? 'var(--shadow-focus)' : 'none',
            outline: 'none', transition: 'all 0.18s ease',
          }}
        >
          <option value="">— Select —</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            height: '42px', padding: '0 14px',
            border: `1px solid ${focused ? T.stateBlue : T.borderDefault}`,
            borderRadius: '8px', fontSize: '14px',
            fontFamily: 'var(--font-family)', fontWeight: 500,
            color: T.textPrimary, background: T.cardSurface,
            boxShadow: focused ? 'var(--shadow-focus)' : 'none',
            outline: 'none', transition: 'all 0.18s ease',
          }}
        />
      )}
    </div>
  );
}

export default function SingleClaimIntimation({ onNavigate }) {
  const [step, setStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [files, setFiles] = useState([]);
  const [agreed, setAgreed] = useState(false);
  const [lookupDone, setLookupDone] = useState(false);
  const [lookupLoading, setLookupLoading] = useState(false);

  // Step 1
  const [policyNum, setPolicyNum] = useState('');
  const [claimantName, setClaimantName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [contactMobile, setContactMobile] = useState('');

  // Step 2
  const [benefitCategory, setBenefitCategory] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [facilityName, setFacilityName] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleLookup = () => {
    if (!policyNum) return;
    setLookupLoading(true);
    setTimeout(() => {
      setClaimantName('Jawad Saleem');
      setContactMobile('0312-4567890');
      setLookupDone(true);
      setLookupLoading(false);
    }, 1200);
  };

  const handleSubmit = () => {
    setShowModal(true);
    setCheckedItems([]);
    setIsComplete(false);

    // Staggered checklist reveals
    VALIDATION_STEPS.forEach(({ delay }, i) => {
      setTimeout(() => {
        setCheckedItems(prev => [...prev, i]);
        if (i === VALIDATION_STEPS.length - 1) {
          setTimeout(() => setIsComplete(true), 900);
        }
      }, delay + 600);
    });
  };

  const handleSuccessClose = () => {
    setShowModal(false);
    onNavigate('track-claims');
  };

  const canProceed1 = policyNum && claimantName && relationship && contactMobile;
  const canProceed2 = benefitCategory && incidentDate && facilityName && claimAmount;
  const canSubmit = agreed;

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', animation: 'fadeIn 0.3s ease' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: T.primaryNavy, marginBottom: '6px' }}>
          New Claim Intimation
        </h1>
        <p style={{ fontSize: '14px', color: T.textMuted }}>
          Submit a new claim against your active Adamjee Life policy. All fields marked * are required.
        </p>
      </div>

      {/* Wizard */}
      <StepWizard steps={STEPS} currentStep={step} />

      {/* Card */}
      <div style={{
        background: T.cardSurface,
        border: `1px solid ${T.borderLight}`,
        borderRadius: '14px',
        padding: '28px',
        boxShadow: 'var(--shadow-card)',
        animation: 'scaleIn 0.22s ease',
      }}>

        {/* ── STEP 1: Policy Details ── */}
        {step === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: T.textPrimary, marginBottom: '4px' }}>
              Step 1 — Policy Details
            </h2>

            {/* Policy Lookup Row */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <InputField
                  id="policy-number"
                  label="Policy / Mobile Number"
                  value={policyNum}
                  onChange={setPolicyNum}
                  placeholder="e.g. AL-TPA-2024-08842 or 03XX-XXXXXXX"
                  required
                />
              </div>
              <Button
                variant="secondary"
                onClick={handleLookup}
                loading={lookupLoading}
                disabled={!policyNum}
                style={{ height: '42px', borderRadius: '8px', flexShrink: 0 }}
              >
                🔍 Lookup
              </Button>
            </div>

            {lookupDone && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '12px 14px',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '8px',
                animation: 'fadeIn 0.3s ease',
              }}>
                <span style={{ fontSize: '18px' }}>✅</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: T.commitGreen }}>
                    Policy Found — AL-TPA-2024-08842
                  </div>
                  <div style={{ fontSize: '12px', color: T.textMuted }}>
                    Subscriber: Jawad Saleem · Status: Active · Coverage: Family Takaful
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <InputField id="claimant-name" label="Claimant Name" value={claimantName}
                onChange={setClaimantName} placeholder="Full name as per CNIC" required />
              <InputField id="relationship" label="Relationship" value={relationship}
                onChange={setRelationship} required
                options={['Self', 'Spouse', 'Child', 'Parent']} />
            </div>
            <InputField id="contact-mobile" label="Contact Mobile" type="tel" value={contactMobile}
              onChange={setContactMobile} placeholder="03XX-XXXXXXX" required />
          </div>
        )}

        {/* ── STEP 2: Incident Info ── */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: T.textPrimary, marginBottom: '4px' }}>
              Step 2 — Incident Information
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <InputField id="benefit-category" label="Benefit Category" value={benefitCategory}
                onChange={setBenefitCategory} required
                options={['Hospitalization', 'Accidental Death', 'Disability', 'Device Protection']} />
              <InputField id="incident-date" label="Incident / Admission Date" type="date"
                value={incidentDate} onChange={setIncidentDate} required />
            </div>
            <InputField id="facility-name" label="Facility / Hospital Name" value={facilityName}
              onChange={setFacilityName} placeholder="e.g. Aga Khan University Hospital" required />
            <InputField id="claim-amount" label="Estimated Claim Amount (PKR)" type="number"
              value={claimAmount} onChange={setClaimAmount} placeholder="e.g. 45000" required />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="description" style={{ fontSize: '13px', fontWeight: 600, color: T.textPrimary }}>
                Incident Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Briefly describe the incident, diagnosis, and treatment received..."
                rows={4}
                style={{
                  padding: '12px 14px',
                  border: `1px solid ${T.borderDefault}`,
                  borderRadius: '8px', fontSize: '14px',
                  fontFamily: 'var(--font-family)', fontWeight: 500,
                  color: T.textPrimary, resize: 'vertical',
                  outline: 'none', transition: 'border 0.18s',
                }}
                onFocus={e => e.target.style.borderColor = T.stateBlue}
                onBlur={e => e.target.style.borderColor = T.borderDefault}
              />
            </div>
          </div>
        )}

        {/* ── STEP 3: Documents ── */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: T.textPrimary, marginBottom: '4px' }}>
              Step 3 — Supporting Documents
            </h2>
            <div style={{
              padding: '12px 14px',
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '8px',
              fontSize: '13px', color: '#1e40af',
            }}>
              📋 Please upload: Hospital Bill, Discharge Summary, CNIC Copy, Doctor's Prescription.
              Accepted formats: PDF, JPG, PNG (Max 10 MB each).
            </div>
            <FileDropZone files={files} onFilesChange={setFiles} />
            {/* Declaration */}
            <label style={{
              display: 'flex', alignItems: 'flex-start', gap: '12px',
              cursor: 'pointer', padding: '14px',
              background: T.pageCanvas, borderRadius: '8px',
              border: `1px solid ${agreed ? T.commitGreen : T.borderLight}`,
              transition: 'border 0.2s',
            }}>
              <input
                id="declaration-checkbox"
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: T.primaryNavy, flexShrink: 0 }}
              />
              <span style={{ fontSize: '13px', color: T.textSecondary, lineHeight: 1.5 }}>
                I hereby declare that all information provided is true and correct to the best of my knowledge.
                I understand that any false or misleading statement may result in the rejection of this claim.
              </span>
            </label>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: '28px', paddingTop: '20px',
          borderTop: `1px solid ${T.borderLight}`,
        }}>
          <Button
            variant="secondary"
            onClick={() => setStep(s => s - 1)}
            disabled={step === 0}
          >
            ← Back
          </Button>

          {step < 2 ? (
            <Button
              variant="primary"
              onClick={() => setStep(s => s + 1)}
              disabled={step === 0 ? !canProceed1 : !canProceed2}
            >
              Continue →
            </Button>
          ) : (
            <Button
              variant="commit"
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              🚀 Submit Claim
            </Button>
          )}
        </div>
      </div>

      {/* ── VALIDATION MODAL ── */}
      <Modal
        open={showModal}
        onClose={isComplete ? handleSuccessClose : null}
        title={isComplete ? null : '🔄 Real-Time Claim Validation'}
        width="520px"
      >
        {!isComplete ? (
          <div>
            <p style={{ fontSize: '13px', color: T.textMuted, marginBottom: '24px' }}>
              Our system is validating your claim in real time. Please wait...
            </p>

            {/* Progress Bar */}
            <div style={{
              height: '4px', background: '#e2e8f0', borderRadius: '2px', marginBottom: '24px', overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                background: `linear-gradient(90deg, ${T.primaryNavy}, ${T.stateBlue})`,
                borderRadius: '2px',
                width: checkedItems.length === 0 ? '5%' :
                  `${(checkedItems.length / VALIDATION_STEPS.length) * 100}%`,
                transition: 'width 0.8s ease',
              }} />
            </div>

            {/* Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {VALIDATION_STEPS.map((vs, i) => {
                const isDone = checkedItems.includes(i);
                const isRunning = checkedItems.length === i;
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '14px',
                      opacity: isDone || isRunning ? 1 : 0.35,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    {/* Icon */}
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isDone ? T.commitGreen : isRunning ? '#eff6ff' : '#f4f8fb',
                      border: isDone ? 'none' : isRunning ? `2px solid ${T.stateBlue}` : `2px solid ${T.borderLight}`,
                    }}>
                      {isDone ? (
                        <span style={{ color: '#fff', fontSize: '14px', animation: 'tickIn 0.35s ease' }}>✓</span>
                      ) : isRunning ? (
                        <span style={{
                          display: 'block', width: 14, height: 14,
                          border: `2px solid ${T.stateBlue}`, borderTop: '2px solid transparent',
                          borderRadius: '50%', animation: 'spin 0.8s linear infinite',
                        }} />
                      ) : (
                        <span style={{ fontSize: '12px', color: T.textMuted, fontWeight: 600 }}>{i + 1}</span>
                      )}
                    </div>
                    <span style={{
                      fontSize: '14px', fontWeight: isDone ? 600 : 500,
                      color: isDone ? T.commitGreen : isRunning ? T.primaryNavy : T.textMuted,
                      transition: 'color 0.3s',
                    }}>
                      {isDone ? `✓ ${vs.label.replace('...', '')}` : vs.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Success State */
          <div style={{
            textAlign: 'center', padding: '20px 0',
            animation: 'fadeIn 0.4s ease',
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'linear-gradient(135deg, #00a651, #00c968)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '32px',
              boxShadow: '0 8px 28px rgba(0,166,81,0.35)',
              animation: 'successBounce 0.5s ease',
            }}>
              ✓
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: T.primaryNavy, marginBottom: '8px' }}>
              Claim Submitted Successfully!
            </h3>
            <p style={{ fontSize: '14px', color: T.textMuted, marginBottom: '6px' }}>
              Reference No: <strong style={{ color: T.primaryNavy }}>CLM-2026-{Math.floor(Math.random() * 90000 + 10000)}</strong>
            </p>
            <p style={{ fontSize: '13px', color: T.textMuted, marginBottom: '28px' }}>
              Your claim is now <Badge status="In Review" /> and has been assigned to an assessor.
              You will be notified via SMS & email.
            </p>
            <Button variant="primary" fullWidth onClick={handleSuccessClose}>
              View My Claims →
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
