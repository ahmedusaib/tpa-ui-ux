import React, { useState, useEffect } from 'react';
import { T } from '../../tokens';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import Modal from '../../components/UI/Modal';
import StepWizard from '../../components/UI/StepWizard';
import FileDropZone from '../../components/UI/FileDropZone';

// Clean SVG Icon System (No emojis)
const Icons = {
  Search: ({ color = T.primaryNavy, size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  CheckCircle: ({ color = T.commitGreen, size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  FileText: ({ color = T.primaryNavy, size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  Send: ({ color = "currentColor", size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Banknote: ({ color = T.primaryNavy, size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  ),
};

const STEPS = ['Policy Details', 'Treatment Info', 'Documents'];

const VALIDATION_STEPS = [
  { label: 'Verifying Policy Status & Active Coverage...',          delay: 0 },
  { label: 'Validating Selected Treatment & Claim Eligibility...',   delay: 900 },
  { label: 'Scanning Attached Documents & Extracting Data...',      delay: 1850 },
  { label: 'Checking Waiting Periods & Pre-existing Exclusions...', delay: 2800 },
];

function InputField({ label, id, type = 'text', value, onChange, placeholder, required, options, disabled, style = {} }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', ...style }}>
      <label htmlFor={id} style={{ fontSize: '13px', fontWeight: 600, color: T.textPrimary }}>
        {label} {required && <span style={{ color: T.error }}>*</span>}
      </label>
      {options ? (
        <select
          id={id}
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            height: '42px', padding: '0 12px',
            border: `1px solid ${focused ? T.stateBlue : T.borderDefault}`,
            borderRadius: '8px', fontSize: '14px',
            fontFamily: 'var(--font-family)', fontWeight: 500,
            color: T.textPrimary, background: disabled ? '#f1f5f9' : T.cardSurface,
            boxShadow: focused ? '0 0 0 3px rgba(27,117,187,0.15)' : 'none',
            outline: 'none', transition: 'all 0.18s ease', cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          <option value="">— Select —</option>
          {options.map(o => <option key={typeof o === 'string' ? o : o.value} value={typeof o === 'string' ? o : o.value}>
            {typeof o === 'string' ? o : o.label}
          </option>)}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            height: '42px', padding: '0 14px',
            border: `1px solid ${focused ? T.stateBlue : T.borderDefault}`,
            borderRadius: '8px', fontSize: '14px',
            fontFamily: 'var(--font-family)', fontWeight: 500,
            color: T.textPrimary, background: disabled ? '#f1f5f9' : T.cardSurface,
            boxShadow: focused ? '0 0 0 3px rgba(27,117,187,0.15)' : 'none',
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

  // Step 1: Policy Details
  const [policyNum, setPolicyNum] = useState('');
  const [claimantName, setClaimantName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [contactMobile, setContactMobile] = useState('');

  // Step 2: Core Treatment Selection Controls
  const [coverageType, setCoverageType] = useState('Reimbursement');
  const [treatmentType, setTreatmentType] = useState('OPD');

  // Step 2: Shared & Dynamic Treatment Info State
  const [facilityName, setFacilityName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [description, setDescription] = useState('');

  // OPD Specific State
  const [opdCategory, setOpdCategory] = useState('');

  // IPD Specific State
  const [admissionDate, setAdmissionDate] = useState('');
  const [lengthOfStay, setLengthOfStay] = useState('');
  const [roomType, setRoomType] = useState('');
  const [icdCode, setIcdCode] = useState('');
  const [isMlc, setIsMlc] = useState(false);

  // IPD Cost Breakdown
  const [roomRent, setRoomRent] = useState('');
  const [icuFees, setIcuFees] = useState('');
  const [surgeonCharges, setSurgeonCharges] = useState('');
  const [pharmacyCost, setPharmacyCost] = useState('');

  useEffect(() => {
    if (treatmentType === 'IPD') {
      const total = (Number(roomRent) || 0) + (Number(icuFees) || 0) + (Number(surgeonCharges) || 0) + (Number(pharmacyCost) || 0);
      if (total > 0) {
        setClaimAmount(String(total));
      }
    }
  }, [roomRent, icuFees, surgeonCharges, pharmacyCost, treatmentType]);

  const handleTreatmentTypeChange = (newType) => {
    if (newType === treatmentType) return;
    setTreatmentType(newType);

    if (newType === 'OPD') {
      setAdmissionDate('');
      setLengthOfStay('');
      setRoomType('');
      setIcdCode('');
      setIsMlc(false);
      setRoomRent('');
      setIcuFees('');
      setSurgeonCharges('');
      setPharmacyCost('');
    } else {
      setOpdCategory('');
    }
  };

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
  
  const canProceed2 = treatmentType === 'OPD'
    ? (claimantName && policyNum && facilityName && doctorName && diagnosis && opdCategory && claimAmount)
    : (claimantName && policyNum && facilityName && doctorName && admissionDate && lengthOfStay && roomType && diagnosis && claimAmount);

  const canSubmit = agreed && files.length > 0;

  const getRequiredDocumentsList = () => {
    if (treatmentType === 'OPD') {
      return [
        { title: "Doctor's Official Prescription / Clinical Notes", required: true },
        { title: "Itemized OPD Bill / Paid Receipt", required: true },
        { title: "Diagnostic & Lab Test Reports", required: false },
        { title: "Pharmacy Invoices / Cash Memos", required: false },
        { title: "Patient CNIC / Photo ID Copy", required: true },
      ];
    } else {
      const docs = [
        { title: "Pre-Authorization Form / Admission Request", required: coverageType === 'Cashless' },
        { title: "Initial Doctor's Consultation Notes & Emergency Sheet", required: true },
        { title: "Final Itemized Hospital Bill with Breakup", required: true },
        { title: "Complete Discharge Summary / Discharge Card", required: true },
        { title: "Diagnostic, Pathology & Radiology Reports", required: true },
        { title: "Pharmacy Invoices & Implant Records", required: true },
      ];
      if (isMlc) {
        docs.push({ title: "Medico-Legal Case (MLC) / FIR Police Copy", required: true });
      }
      docs.push({ title: "Patient CNIC / Photo ID & Insurance Card Copy", required: true });
      return docs;
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', animation: 'fadeIn 0.3s ease', fontFamily: 'var(--font-family)' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: T.primaryNavy, marginBottom: '4px' }}>
          New Claim Intimation
        </h1>
        <p style={{ fontSize: '13px', color: T.textMuted }}>
          Submit a new claim against your active Adamjee Life policy. All fields marked * are required.
        </p>
      </div>

      <StepWizard steps={STEPS} currentStep={step} />

      <div style={{
        background: T.cardSurface,
        border: `1px solid ${T.borderLight}`,
        borderRadius: '14px',
        padding: '28px',
        boxShadow: 'var(--shadow-card)',
        animation: 'scaleIn 0.22s ease',
      }}>

        {/* ── STEP 1: POLICY DETAILS ── */}
        {step === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: T.primaryNavy, marginBottom: '4px' }}>
              Step 1 — Policy Details
            </h2>

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
                icon={<Icons.Search color={T.primaryNavy} size={14} />}
                style={{ height: '42px', borderRadius: '8px', flexShrink: 0 }}
              >
                Lookup Policy
              </Button>
            </div>

            {lookupDone && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '12px 16px',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '8px',
                animation: 'fadeIn 0.3s ease',
              }}>
                <Icons.CheckCircle color={T.commitGreen} size={20} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: T.commitGreen }}>
                    Policy Verified — AL-TPA-2024-08842
                  </div>
                  <div style={{ fontSize: '12px', color: T.textMuted }}>
                    Subscriber: Jawad Saleem · Status: Active · Coverage: Family Health Takaful
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <InputField
                id="claimant-name"
                label="Patient / Claimant Name"
                value={claimantName}
                onChange={setClaimantName}
                placeholder="Full name as per CNIC"
                required
              />
              <InputField
                id="relationship"
                label="Relationship to Policyholder"
                value={relationship}
                onChange={setRelationship}
                required
                options={['Self', 'Spouse', 'Child', 'Parent']}
              />
            </div>

            <InputField
              id="contact-mobile"
              label="Contact Mobile Number"
              type="tel"
              value={contactMobile}
              onChange={setContactMobile}
              placeholder="03XX-XXXXXXX"
              required
            />
          </div>
        )}

        {/* ── STEP 2: TREATMENT INFO ── */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: T.primaryNavy, margin: 0 }}>
                Step 2 — Treatment Information
              </h2>
              <Badge status={treatmentType === 'OPD' ? 'In Review' : 'Processing'}>
                {treatmentType} Claim Mode
              </Badge>
            </div>

            <div style={{
              background: '#f8fafc',
              border: `1px solid ${T.borderLight}`,
              borderRadius: '10px',
              padding: '16px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: T.textPrimary, display: 'block', marginBottom: '8px' }}>
                  Coverage Type <span style={{ color: T.error }}>*</span>
                </label>
                <div style={{ display: 'flex', background: '#e2e8f0', padding: '3px', borderRadius: '8px' }}>
                  {['Cashless', 'Reimbursement'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setCoverageType(type)}
                      style={{
                        flex: 1, height: '36px', border: 'none', borderRadius: '6px',
                        fontSize: '13px', fontWeight: coverageType === type ? 700 : 500,
                        background: coverageType === type ? T.primaryNavy : 'transparent',
                        color: coverageType === type ? '#ffffff' : T.textSecondary,
                        cursor: 'pointer', transition: 'all 0.18s ease',
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: T.textPrimary, display: 'block', marginBottom: '8px' }}>
                  Treatment Type <span style={{ color: T.error }}>*</span>
                </label>
                <div style={{ display: 'flex', background: '#e2e8f0', padding: '3px', borderRadius: '8px' }}>
                  {[
                    { id: 'OPD', label: 'OPD (Outpatient)' },
                    { id: 'IPD', label: 'IPD (Inpatient)' },
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleTreatmentTypeChange(item.id)}
                      style={{
                        flex: 1, height: '36px', border: 'none', borderRadius: '6px',
                        fontSize: '12px', fontWeight: treatmentType === item.id ? 700 : 500,
                        background: treatmentType === item.id ? T.stateBlue : 'transparent',
                        color: treatmentType === item.id ? '#ffffff' : T.textSecondary,
                        cursor: 'pointer', transition: 'all 0.18s ease',
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px',
              padding: '12px 14px', background: T.pageCanvas, borderRadius: '8px', border: `1px solid ${T.borderLight}`,
            }}>
              <div>
                <span style={{ fontSize: '11px', color: T.textMuted, display: 'block' }}>Patient Name</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: T.textPrimary }}>
                  {claimantName || 'Jawad Saleem'}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: T.textMuted, display: 'block' }}>Policy / Member ID</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: T.primaryNavy, fontFamily: 'monospace' }}>
                  {policyNum || 'AL-TPA-2024-08842'}
                </span>
              </div>
            </div>

            {treatmentType === 'OPD' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeIn 0.25s ease' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <InputField
                    id="opd-hospital"
                    label="Hospital Name / Clinic"
                    value={facilityName}
                    onChange={setFacilityName}
                    placeholder="e.g. Aga Khan Executive Clinic"
                    required
                  />
                  <InputField
                    id="opd-doctor"
                    label="Doctor Name & Registration No."
                    value={doctorName}
                    onChange={setDoctorName}
                    placeholder="e.g. Dr. Ahmed Khan (PMC-44810)"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <InputField
                    id="opd-category"
                    label="OPD Category"
                    value={opdCategory}
                    onChange={setOpdCategory}
                    required
                    options={[
                      { value: 'Consultation', label: 'Consultation Fee' },
                      { value: 'Lab / Diagnostics', label: 'Lab / Diagnostics & Imaging' },
                      { value: 'Pharmacy', label: 'Pharmacy & Prescribed Medicines' },
                    ]}
                  />
                  <InputField
                    id="opd-claim-amount"
                    label="Total Claim Amount (PKR)"
                    type="number"
                    value={claimAmount}
                    onChange={setClaimAmount}
                    placeholder="e.g. 12500"
                    required
                  />
                </div>

                <InputField
                  id="opd-diagnosis"
                  label="Provisional Diagnosis"
                  value={diagnosis}
                  onChange={setDiagnosis}
                  placeholder="e.g. Acute Typhoid Fever & Gastroenteritis"
                  required
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="description" style={{ fontSize: '13px', fontWeight: 600, color: T.textPrimary }}>
                    Treatment & Consultation Summary
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Provide details about symptoms, prescriptions, or advice provided by the doctor..."
                    rows={3}
                    style={{
                      padding: '10px 14px',
                      border: `1px solid ${T.borderDefault}`,
                      borderRadius: '8px', fontSize: '14px',
                      fontFamily: 'var(--font-family)', fontWeight: 500,
                      color: T.textPrimary, resize: 'vertical', outline: 'none',
                    }}
                    onFocus={e => e.target.style.borderColor = T.stateBlue}
                    onBlur={e => e.target.style.borderColor = T.borderDefault}
                  />
                </div>
              </div>
            )}

            {treatmentType === 'IPD' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeIn 0.25s ease' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <InputField
                    id="ipd-hospital"
                    label="Hospital Name & Branch"
                    value={facilityName}
                    onChange={setFacilityName}
                    placeholder="e.g. South City Hospital, Karachi"
                    required
                  />
                  <InputField
                    id="ipd-doctor"
                    label="Doctor / Surgeon Name & Reg. No."
                    value={doctorName}
                    onChange={setDoctorName}
                    placeholder="e.g. Dr. Farhan Qureshi (PMC-12904)"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                  <InputField
                    id="ipd-admission-date"
                    label="Admission Date"
                    type="date"
                    value={admissionDate}
                    onChange={setAdmissionDate}
                    required
                  />
                  <InputField
                    id="ipd-length-stay"
                    label="Length of Stay (Days)"
                    type="number"
                    value={lengthOfStay}
                    onChange={setLengthOfStay}
                    placeholder="e.g. 3"
                    required
                  />
                  <InputField
                    id="ipd-room-type"
                    label="Ward / Room Category"
                    value={roomType}
                    onChange={setRoomType}
                    required
                    options={['General Ward', 'Semi-Private Room', 'Private Room', 'ICU / CCU']}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '14px' }}>
                  <InputField
                    id="ipd-diagnosis"
                    label="Provisional / Final Diagnosis"
                    value={diagnosis}
                    onChange={setDiagnosis}
                    placeholder="e.g. Acute Appendicitis with Peritonitis"
                    required
                  />
                  <InputField
                    id="ipd-icd-code"
                    label="ICD-10 / CPT Codes"
                    value={icdCode}
                    onChange={setIcdCode}
                    placeholder="e.g. K35.80 / 44970"
                  />
                </div>

                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 14px', background: isMlc ? T.errorBg : T.pageCanvas,
                  border: `1px solid ${isMlc ? '#fecaca' : T.borderLight}`, borderRadius: '8px',
                }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: isMlc ? T.error : T.textPrimary }}>
                      Is this a Medico-Legal Case (MLC) / Emergency Trauma?
                    </div>
                    <div style={{ fontSize: '11px', color: T.textMuted }}>
                      If checked, police FIR / MLC copy will be required in Step 3 Documents.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isMlc}
                    onChange={e => setIsMlc(e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: T.error }}
                  />
                </div>

                <div style={{
                  background: '#f8fafc', border: `1px solid ${T.borderLight}`,
                  borderRadius: '10px', padding: '16px', marginTop: '4px',
                }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: T.primaryNavy, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Icons.Banknote color={T.primaryNavy} size={16} />
                    <span>Estimated IPD Cost Breakdown (PKR)</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <InputField
                      id="cost-room"
                      label="Room Rent / Charges"
                      type="number"
                      value={roomRent}
                      onChange={setRoomRent}
                      placeholder="e.g. 25000"
                    />
                    <InputField
                      id="cost-icu"
                      label="ICU / CCU Charges"
                      type="number"
                      value={icuFees}
                      onChange={setIcuFees}
                      placeholder="e.g. 0"
                    />
                    <InputField
                      id="cost-surgeon"
                      label="Surgeon & OT Charges"
                      type="number"
                      value={surgeonCharges}
                      onChange={setSurgeonCharges}
                      placeholder="e.g. 45000"
                    />
                    <InputField
                      id="cost-pharmacy"
                      label="Pharmacy & Consumables"
                      type="number"
                      value={pharmacyCost}
                      onChange={setPharmacyCost}
                      placeholder="e.g. 15000"
                    />
                  </div>

                  <InputField
                    id="total-claim-amount"
                    label="Total Claim / Estimated Amount (PKR)"
                    type="number"
                    value={claimAmount}
                    onChange={setClaimAmount}
                    placeholder="Total claim amount"
                    required
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 3: DYNAMIC DOCUMENTS STAGE ── */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: T.primaryNavy, margin: 0 }}>
                Step 3 — Supporting Documents
              </h2>
              <Badge status={treatmentType === 'OPD' ? 'In Review' : 'Processing'}>
                {treatmentType} Checklist ({getRequiredDocumentsList().filter(d => d.required).length} Required)
              </Badge>
            </div>

            <div style={{
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '10px',
              padding: '16px',
            }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: T.primaryNavy, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icons.FileText color={T.primaryNavy} size={16} />
                <span>Required Document Checklist for {treatmentType} ({coverageType})</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {getRequiredDocumentsList().map((doc, idx) => (
                  <div key={idx} style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    fontSize: '12px', color: T.textPrimary, background: '#ffffff',
                    padding: '8px 10px', borderRadius: '6px', border: '1px solid #dbeafe',
                  }}>
                    <span style={{ color: doc.required ? T.error : T.stateBlue, fontWeight: 700 }}>
                      {doc.required ? '•' : '◦'}
                    </span>
                    <span style={{ fontWeight: doc.required ? 600 : 400, color: doc.required ? T.textPrimary : T.textMuted }}>
                      {doc.title} {doc.required && <strong style={{ color: T.error }}>*</strong>}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <FileDropZone files={files} onFilesChange={setFiles} />

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
                I hereby declare that all information provided for this <strong>{treatmentType} ({coverageType})</strong> claim is accurate.
                I understand that submitting incomplete or fraudulent medical records may lead to claim rejection.
              </span>
            </label>
          </div>
        )}

        {/* Navigation Control Buttons */}
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
              Continue to {step === 0 ? 'Treatment Info' : 'Documents'} →
            </Button>
          ) : (
            <Button
              variant="commit"
              onClick={handleSubmit}
              disabled={!canSubmit}
              icon={<Icons.Send color="#fff" size={16} />}
            >
              Submit {treatmentType} Claim
            </Button>
          )}
        </div>
      </div>

      {/* ── REAL-TIME CLAIM VALIDATION MODAL ── */}
      <Modal
        open={showModal}
        onClose={isComplete ? handleSuccessClose : null}
        title={isComplete ? null : 'Real-Time Claim Validation'}
        width="520px"
      >
        {!isComplete ? (
          <div>
            <p style={{ fontSize: '13px', color: T.textMuted, marginBottom: '24px' }}>
              Validating {treatmentType} claim intimation against Adamjee Life PAS policy terms...
            </p>

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
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isDone ? T.commitGreen : isRunning ? '#eff6ff' : '#f4f8fb',
                      border: isDone ? 'none' : isRunning ? `2px solid ${T.stateBlue}` : `2px solid ${T.borderLight}`,
                    }}>
                      {isDone ? (
                        <Icons.CheckCircle color="#fff" size={16} />
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
                      {vs.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0', animation: 'fadeIn 0.4s ease' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'linear-gradient(135deg, #00a651, #00c968)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 8px 28px rgba(0,166,81,0.35)',
              animation: 'successBounce 0.5s ease',
            }}>
              <Icons.CheckCircle color="#fff" size={32} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: T.primaryNavy, marginBottom: '8px' }}>
              {treatmentType} Claim Intimated Successfully!
            </h3>
            <p style={{ fontSize: '14px', color: T.textMuted, marginBottom: '6px' }}>
              Reference No: <strong style={{ color: T.primaryNavy }}>CLM-2026-{Math.floor(Math.random() * 90000 + 10000)}</strong>
            </p>
            <p style={{ fontSize: '13px', color: T.textMuted, marginBottom: '28px' }}>
              Your {treatmentType} ({coverageType}) claim has been assigned to an assessor for review.
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
