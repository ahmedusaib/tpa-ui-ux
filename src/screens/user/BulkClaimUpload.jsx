import React, { useState, useEffect, useRef } from 'react';
import { T } from '../../tokens';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import Modal from '../../components/UI/Modal';

// Clean SVG Icon System (No emojis)
const Icons = {
  Spinner: ({ color = T.primaryNavy, size = 14 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ animation: 'spin 0.8s linear infinite', flexShrink: 0 }}
    >
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </svg>
  ),
  CheckCircle: ({ color = T.commitGreen, size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  AlertTriangle: ({ color = T.error, size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Eye: ({ color = T.textMuted, size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  FileText: ({ color = T.primaryNavy, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  UploadCloud: ({ color = T.primaryNavy, size = 42 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 16l-4-4-4 4" />
      <path d="M12 12v9" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  ),
  Rocket: ({ color = "currentColor", size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71.79-1.81.79-1.81l-1.98-1.98s-1.1.08-1.81.79z" />
      <path d="M15 8s-4-4-9 1l8 8c5-5 1-9 1-9z" />
      <line x1="13" y1="11" x2="17" y2="7" />
    </svg>
  ),
  Play: ({ color = "currentColor", size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  Pause: ({ color = "currentColor", size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  ),
  ArrowRight: ({ color = "currentColor", size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  RotateCcw: ({ color = "currentColor", size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  ),
  Search: ({ color = T.textMuted, size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
};

// Known 10 exception rows matching Admin BulkExceptionWorkbench
const SPECIFIC_EXCEPTIONS = {
  1:  { policyId: 'AL-TPA-XXXX-???', subscriber: 'Muhammad Ali',  amount: 'PKR 12,000', error: 'Invalid Policy ID',    detail: 'Policy number format is invalid' },
  2:  { policyId: 'AL-TPA-2024-09921', subscriber: 'Farrukh Nabi', amount: 'PKR 8,500',  error: 'Unreadable Document', detail: 'Attached image is too blurry to OCR' },
  5:  { policyId: 'AL-TPA-2022-33400', subscriber: 'Sana Mirza',   amount: 'PKR 55,000', error: 'Duplicate Claim',     detail: 'Claim CLM-2026-22810 already filed for same incident date' },
  8:  { policyId: 'AL-TPA-2025-10120', subscriber: 'Ali Raza',     amount: 'PKR 3,200',  error: 'Invalid Policy ID',   detail: 'Policy not found in core system' },
  11: { policyId: 'AL-TPA-2023-77800', subscriber: 'Hira Baig',    amount: 'PKR 28,000', error: 'Unreadable Document', detail: 'PDF appears corrupted — re-upload required' },
  14: { policyId: 'AL-TPA-2024-55210', subscriber: 'Kashif Latif', amount: 'PKR 9,400',  error: 'Duplicate Claim',     detail: 'Same subscriber, same date, same amount — suspected fraud flag' },
  17: { policyId: 'AL-TPA-2021-04400', subscriber: 'Zara Fatima',  amount: 'PKR 17,700', error: 'Invalid Policy ID',   detail: 'Policy expired on 01 Jan 2026' },
  22: { policyId: 'AL-TPA-2026-10934', subscriber: 'Imran Siddiq', amount: 'PKR 6,000',  error: 'Unreadable Document', detail: 'CNIC scan not visible — low contrast' },
  28: { policyId: 'AL-TPA-2023-88200', subscriber: 'Nadia Khan',   amount: 'PKR 42,500', error: 'Duplicate Claim',     detail: 'Claim within 30-day waiting period' },
  30: { policyId: 'AL-TPA-XXXX-???',  subscriber: 'Tariq Mehmood',amount: 'PKR 14,000', error: 'Invalid Policy ID',   detail: 'Policy ID missing required TPA prefix' },
};

const SAMPLE_NAMES = [
  'Laura Jensen', 'David Miller', 'Grace Taylor', 'Kevin White', 'Lebron James',
  'Michael Jordan', 'Usman Ghani', 'Ayesha Khan', 'Bilal Ahmed', 'Fatima Zahra',
  'Hamza Malik', 'Saima Iqbal', 'Kamran Shah', 'Zainab Noor', 'Omer Farooq'
];

// Pre-generate 250 claim dataset
const GENERATED_ROWS = Array.from({ length: 250 }, (_, idx) => {
  const rowNum = idx + 1;
  const claimId = `CLM-2026-${String(8660 + rowNum).padStart(5, '0')}`;
  const timestamp = `17:${String(40 + Math.floor(rowNum / 10)).padStart(2, '0')}:${String((rowNum * 7) % 60).padStart(2, '0')}`;

  if (SPECIFIC_EXCEPTIONS[rowNum]) {
    const ex = SPECIFIC_EXCEPTIONS[rowNum];
    return {
      row: rowNum,
      claimId,
      timestamp,
      policyId: ex.policyId,
      subscriber: ex.subscriber,
      amount: ex.amount,
      status: 'failed',
      error: ex.error,
      note: ex.detail,
      stage: rowNum <= 80 ? 1 : rowNum <= 170 ? 2 : 3,
    };
  }

  const nameIndex = (rowNum - 1) % SAMPLE_NAMES.length;
  const subscriber = SAMPLE_NAMES[nameIndex];
  const policyId = `AL-TPA-2026-${String(10000 + rowNum).padStart(5, '0')}`;
  const amountVal = (Math.floor((rowNum * 13) % 45) + 5) * 1000;
  const amount = `PKR ${amountVal.toLocaleString()}`;

  return {
    row: rowNum,
    claimId,
    timestamp,
    policyId,
    subscriber,
    amount,
    status: 'passed',
    note: 'Policy Active · PDF Attached · Auto-verified',
    stage: rowNum <= 80 ? 1 : rowNum <= 170 ? 2 : 3,
  };
});

export default function BulkClaimUpload({ onNavigate, onRoleSwitch }) {
  // File upload state
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  // Ingestion state
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(180); // 180ms * 250 rows = 45 seconds total batch duration
  const [currentIndex, setCurrentIndex] = useState(0);
  const [processedRows, setProcessedRows] = useState([]);
  const [filterTab, setFilterTab] = useState('all'); // 'all', 'passed', 'exceptions'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [done, setDone] = useState(false);
  const [inspectModalRow, setInspectModalRow] = useState(null);

  const logContainerRef = useRef(null);

  const handleFileSelect = (f) => {
    if (!f) return;
    setFile(f);
    resetIngestionState();
  };

  const resetIngestionState = () => {
    setIsProcessing(false);
    setIsPaused(false);
    setCurrentIndex(0);
    setProcessedRows([]);
    setSelectedRows([]);
    setDone(false);
  };

  const startIngestion = () => {
    if (!file && !filePlaceholder) {
      setFile({ name: 'telecard_batch_claims_2026.csv', size: 48200 });
    }
    setIsProcessing(true);
    setIsPaused(false);
    setCurrentIndex(0);
    setProcessedRows([]);
    setSelectedRows([]);
    setDone(false);
  };

  const filePlaceholder = file || { name: 'telecard_batch_claims_2026.csv', size: 48200 };

  // Live row streaming ticker effect
  useEffect(() => {
    if (!isProcessing || isPaused || done) return;

    const timer = setTimeout(() => {
      if (currentIndex < GENERATED_ROWS.length) {
        const nextRow = GENERATED_ROWS[currentIndex];
        setProcessedRows(prev => [...prev, nextRow]);
        setCurrentIndex(prev => prev + 1);

        if (currentIndex + 1 >= GENERATED_ROWS.length) {
          setDone(true);
          setIsProcessing(false);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [isProcessing, isPaused, done, currentIndex, speed]);

  // Auto-scroll log table to bottom during streaming
  useEffect(() => {
    if (logContainerRef.current && isProcessing && !isPaused) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [processedRows, isProcessing, isPaused]);

  // Dynamic calculations
  const totalCount = GENERATED_ROWS.length;
  const processedCount = processedRows.length;
  const validCount = processedRows.filter(r => r.status === 'passed').length;
  const exceptionCount = processedRows.filter(r => r.status === 'failed').length;
  const progressPercent = Math.round((processedCount / totalCount) * 100);

  // Stepper active stage (1-80, 81-170, 171-250)
  const currentStage = done ? 3 : processedCount <= 80 ? 1 : processedCount <= 170 ? 2 : 3;

  // Filtered log rows for high readability table view
  const displayRows = processedRows.filter(r => {
    const matchesTab =
      filterTab === 'all'
        ? true
        : filterTab === 'passed'
        ? r.status === 'passed'
        : r.status === 'failed';

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      r.subscriber.toLowerCase().includes(q) ||
      r.claimId.toLowerCase().includes(q) ||
      r.policyId.toLowerCase().includes(q) ||
      (r.error && r.error.toLowerCase().includes(q));

    return matchesTab && matchesSearch;
  });

  const toggleSelectRow = (rowNum) => {
    setSelectedRows(prev =>
      prev.includes(rowNum) ? prev.filter(r => r !== rowNum) : [...prev, rowNum]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === displayRows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(displayRows.map(r => r.row));
    }
  };

  const handleHandOffToExceptionWorkbench = () => {
    if (onRoleSwitch) onRoleSwitch('admin');
    if (onNavigate) onNavigate('bulk-exception', 'admin');
  };

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', animation: 'fadeIn 0.3s ease', fontFamily: 'var(--font-family)' }}>
      {/* Top Header */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: T.primaryNavy, marginBottom: '4px', letterSpacing: '-0.01em' }}>
            Bulk Claim Upload & Ingestion Pipeline
          </h1>
          <p style={{ fontSize: '13px', color: T.textMuted }}>
            Real-time batch ingestion monitor for Telco & Aggregator insurance claim intimations.
          </p>
        </div>

        {isProcessing || done ? (
          <Button
            variant="secondary"
            size="sm"
            icon={<Icons.RotateCcw color={T.primaryNavy} />}
            onClick={resetIngestionState}
          >
            Reset Batch
          </Button>
        ) : null}
      </div>

      {/* ── MODE 1: FILE UPLOAD DROPZONE ── */}
      {!isProcessing && !done && (
        <div style={{
          background: T.cardSurface, border: `1px solid ${T.borderLight}`,
          borderRadius: '12px', padding: '28px', marginBottom: '24px',
          boxShadow: '0 2px 8px rgba(15, 76, 122, 0.04)',
        }}>
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); handleFileSelect(e.dataTransfer.files[0]); }}
            onClick={() => inputRef.current && inputRef.current.click()}
            style={{
              border: `2px dashed ${dragging ? T.stateBlue : file ? T.commitGreen : T.borderDefault}`,
              borderRadius: '10px', padding: '40px 20px',
              textAlign: 'center', cursor: 'pointer',
              background: dragging ? '#eff6ff' : file ? '#f0fdf4' : '#fafbfc',
              transition: 'all 0.2s ease',
            }}
          >
            <input ref={inputRef} type="file" accept=".csv,.xlsx" onChange={e => handleFileSelect(e.target.files[0])} style={{ display: 'none' }} />
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
              <Icons.UploadCloud color={dragging ? T.stateBlue : file ? T.commitGreen : T.primaryNavy} size={42} />
            </div>
            {file ? (
              <>
                <div style={{ fontWeight: 700, fontSize: '15px', color: T.commitGreen }}>{file.name}</div>
                <div style={{ fontSize: '12px', color: T.textMuted, marginTop: '4px' }}>
                  {(file.size / 1024).toFixed(1)} KB · 250 Records Ready · Click to replace file
                </div>
              </>
            ) : (
              <>
                <div style={{ fontWeight: 600, fontSize: '15px', color: T.textPrimary }}>
                  {dragging ? 'Drop CSV file here' : 'Drag & drop batch CSV file here, or click to browse'}
                </div>
                <div style={{ fontSize: '12px', color: T.textMuted, marginTop: '6px' }}>
                  Supports .csv and .xlsx files · Pre-configured with 250 claim batch stream
                </div>
              </>
            )}
          </div>

          <div style={{ marginTop: '20px' }}>
            <Button
              variant="primary"
              fullWidth
              onClick={startIngestion}
              icon={<Icons.Rocket color="#fff" size={16} />}
              style={{ height: '48px', fontSize: '15px' }}
            >
              Process Batch File (250 Records Ticker)
            </Button>
          </div>
        </div>
      )}

      {/* ── MODE 2: LIVE STREAMING INGESTION PIPELINE & MODERN LOGS UI ── */}
      {(isProcessing || done) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Active File Header Pill */}
          <div style={{
            background: T.cardSurface, border: `1px solid ${T.borderLight}`,
            borderRadius: '10px', padding: '12px 20px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            boxShadow: '0 2px 8px rgba(15, 76, 122, 0.04)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Icons.FileText color={T.primaryNavy} size={20} />
              <div>
                <span style={{ fontWeight: 700, fontSize: '14px', color: T.primaryNavy }}>
                  {filePlaceholder.name}
                </span>
                <span style={{ fontSize: '12px', color: T.textMuted, marginLeft: '10px' }}>
                  250 Total Records · {(filePlaceholder.size / 1024).toFixed(1)} KB
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {isProcessing && (
                <Badge status="Processing">
                  <Icons.Spinner color={T.stateBlue} size={12} />
                  <span>Ingesting Row {processedCount}/250</span>
                </Badge>
              )}
              {done && (
                <Badge status="Approved">
                  <Icons.CheckCircle color={T.commitGreen} size={12} />
                  <span>Ingestion Complete</span>
                </Badge>
              )}
            </div>
          </div>

          {/* ── A. 3-STAGE PROGRESS STEPPER BAR ── */}
          <div style={{
            background: T.cardSurface, border: `1px solid ${T.borderLight}`,
            borderRadius: '12px', padding: '20px 24px',
            boxShadow: '0 2px 8px rgba(15, 76, 122, 0.04)',
          }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
              Ingestion Gatekeeping Pipeline Stages
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', alignItems: 'center', gap: '12px' }}>
              
              {/* Stage 1 */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 14px', borderRadius: '8px',
                background: currentStage === 1 ? '#f0f9ff' : currentStage > 1 ? '#f0fdf4' : T.pageCanvas,
                border: `1px solid ${currentStage === 1 ? T.stateBlue : currentStage > 1 ? T.commitGreen : T.borderLight}`,
                transition: 'all 0.3s ease',
              }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: currentStage > 1 ? T.commitGreen : currentStage === 1 ? T.primaryNavy : '#cbd5e1',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '13px', flexShrink: 0,
                }}>
                  {currentStage > 1 ? <Icons.CheckCircle color="#fff" size={16} /> : currentStage === 1 ? <Icons.Spinner color="#fff" size={14} /> : '1'}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: currentStage >= 1 ? T.primaryNavy : T.textMuted }}>
                    Stage 1: File Schema & Parsing
                  </div>
                  <div style={{ fontSize: '11px', color: T.textMuted }}>Rows 1-80 · Structure Adjudication</div>
                </div>
              </div>

              {/* Connecting Line 1-2 */}
              <div style={{ height: '2px', width: '24px', background: currentStage > 1 ? T.commitGreen : T.borderLight }} />

              {/* Stage 2 */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 14px', borderRadius: '8px',
                background: currentStage === 2 ? '#f0f9ff' : currentStage > 2 ? '#f0fdf4' : T.pageCanvas,
                border: `1px solid ${currentStage === 2 ? T.stateBlue : currentStage > 2 ? T.commitGreen : T.borderLight}`,
                transition: 'all 0.3s ease',
              }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: currentStage > 2 ? T.commitGreen : currentStage === 2 ? T.primaryNavy : '#cbd5e1',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '13px', flexShrink: 0,
                }}>
                  {currentStage > 2 ? <Icons.CheckCircle color="#fff" size={16} /> : currentStage === 2 ? <Icons.Spinner color="#fff" size={14} /> : '2'}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: currentStage >= 2 ? T.primaryNavy : T.textMuted }}>
                    Stage 2: Policy & Coverage Lookup
                  </div>
                  <div style={{ fontSize: '11px', color: T.textMuted }}>Rows 81-170 · Core PAS Validation</div>
                </div>
              </div>

              {/* Connecting Line 2-3 */}
              <div style={{ height: '2px', width: '24px', background: currentStage > 2 ? T.commitGreen : T.borderLight }} />

              {/* Stage 3 */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 14px', borderRadius: '8px',
                background: currentStage === 3 && !done ? '#f0f9ff' : done ? '#f0fdf4' : T.pageCanvas,
                border: `1px solid ${currentStage === 3 && !done ? T.stateBlue : done ? T.commitGreen : T.borderLight}`,
                transition: 'all 0.3s ease',
              }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: done ? T.commitGreen : currentStage === 3 ? T.primaryNavy : '#cbd5e1',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '13px', flexShrink: 0,
                }}>
                  {done ? <Icons.CheckCircle color="#fff" size={16} /> : currentStage === 3 ? <Icons.Spinner color="#fff" size={14} /> : '3'}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: currentStage >= 3 ? T.primaryNavy : T.textMuted }}>
                    Stage 3: Batch Packaging & Queue Dispatch
                  </div>
                  <div style={{ fontSize: '11px', color: T.textMuted }}>Rows 171-250 · Work Queue Dispatch</div>
                </div>
              </div>

            </div>
          </div>

          {/* ── B. DYNAMIC BATCH SUMMARY HEADER CARDS ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            <div style={{
              background: T.cardSurface, border: `1px solid ${T.borderLight}`,
              borderRadius: '12px', padding: '16px 20px',
              boxShadow: '0 2px 8px rgba(15, 76, 122, 0.04)',
            }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: T.textMuted, marginBottom: '6px' }}>
                Total Uploaded
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: T.primaryNavy }}>
                {totalCount}
              </div>
              <div style={{ fontSize: '11px', color: T.textMuted, marginTop: '4px' }}>
                Batch total records
              </div>
            </div>

            <div style={{
              background: T.cardSurface, border: `1px solid ${T.borderLight}`,
              borderRadius: '12px', padding: '16px 20px',
              boxShadow: '0 2px 8px rgba(15, 76, 122, 0.04)',
            }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: T.textMuted, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icons.CheckCircle color={T.commitGreen} size={14} />
                <span>Validated & Queued</span>
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: T.commitGreen }}>
                {validCount}
              </div>
              <div style={{ fontSize: '11px', color: T.commitGreen, marginTop: '4px', fontWeight: 600 }}>
                Passed Ingestion Gatekeeping
              </div>
            </div>

            <div style={{
              background: T.cardSurface, border: `1px solid ${T.borderLight}`,
              borderRadius: '12px', padding: '16px 20px',
              boxShadow: '0 2px 8px rgba(15, 76, 122, 0.04)',
            }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: T.textMuted, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icons.AlertTriangle color={T.error} size={14} />
                <span>Failed / Exceptions</span>
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: exceptionCount > 0 ? T.error : T.textMuted }}>
                {exceptionCount}
              </div>
              <div style={{ fontSize: '11px', color: exceptionCount > 0 ? T.error : T.textMuted, marginTop: '4px', fontWeight: 600 }}>
                {exceptionCount > 0 ? 'Moved to Exception Queue' : 'Zero exceptions'}
              </div>
            </div>

            <div style={{
              background: T.cardSurface, border: `1px solid ${T.borderLight}`,
              borderRadius: '12px', padding: '16px 20px',
              boxShadow: '0 2px 8px rgba(15, 76, 122, 0.04)',
            }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: T.textMuted, marginBottom: '6px' }}>
                Ingestion Progress
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: T.stateBlue }}>
                {progressPercent}%
              </div>
              <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', marginTop: '8px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${progressPercent}%`,
                  background: done ? T.commitGreen : `linear-gradient(90deg, ${T.primaryNavy}, ${T.stateBlue})`,
                  borderRadius: '3px', transition: 'width 0.2s linear',
                }} />
              </div>
            </div>
          </div>

          {/* ── C. MODERN HIGH-READABILITY LOGS UI TABLE ── */}
          <div style={{
            background: T.cardSurface,
            border: `1px solid ${T.borderLight}`,
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(15, 76, 122, 0.06)',
          }}>
            
            {/* Logs Toolbar & Filters Header */}
            <div style={{
              padding: '16px 20px',
              background: '#f8fafc',
              borderBottom: `1px solid ${T.borderLight}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
            }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {isProcessing ? (
                  <Icons.Spinner color={T.stateBlue} size={18} />
                ) : (
                  <Icons.CheckCircle color={T.commitGreen} size={18} />
                )}
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: T.primaryNavy, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Live Adjudication Log Stream
                    <span style={{
                      fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '12px',
                      background: isProcessing ? '#eff6ff' : '#f0fdf4',
                      color: isProcessing ? T.stateBlue : T.commitGreen,
                      border: `1px solid ${isProcessing ? '#bfdbfe' : '#bbf7d0'}`,
                    }}>
                      {isProcessing ? `Row ${processedCount}/${totalCount}` : 'Stream Completed'}
                    </span>
                  </h3>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: '#ffffff', border: `1px solid ${T.borderDefault}`,
                  borderRadius: '6px', padding: '0 10px', height: '34px', width: '210px',
                }}>
                  <Icons.Search color={T.textMuted} size={14} />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{
                      border: 'none', outline: 'none', background: 'transparent',
                      fontSize: '12px', width: '100%', fontFamily: 'var(--font-family)', color: T.textPrimary,
                    }}
                  />
                </div>

                <div style={{ display: 'flex', background: '#e2e8f0', borderRadius: '6px', padding: '2px' }}>
                  {[
                    { id: 'all', label: `All (${processedCount})` },
                    { id: 'passed', label: `Passed (${validCount})` },
                    { id: 'exceptions', label: `Exceptions (${exceptionCount})` },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setFilterTab(tab.id)}
                      style={{
                        background: filterTab === tab.id ? '#ffffff' : 'transparent',
                        color: filterTab === tab.id ? T.primaryNavy : T.textMuted,
                        boxShadow: filterTab === tab.id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                        border: 'none', borderRadius: '4px',
                        padding: '4px 10px', fontSize: '11px', fontWeight: filterTab === tab.id ? 700 : 500,
                        cursor: 'pointer', transition: 'all 0.15s ease',
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {isProcessing && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      onClick={() => setIsPaused(!isPaused)}
                      style={{
                        background: '#ffffff', border: `1px solid ${T.borderDefault}`,
                        color: T.primaryNavy, borderRadius: '6px', padding: '0 10px', height: '34px',
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                      }}
                    >
                      {isPaused ? <Icons.Play color={T.primaryNavy} size={12} /> : <Icons.Pause color={T.primaryNavy} size={12} />}
                      <span>{isPaused ? 'Resume' : 'Pause'}</span>
                    </button>

                    <select
                      value={speed}
                      onChange={e => setSpeed(Number(e.target.value))}
                      style={{
                        background: '#ffffff', border: `1px solid ${T.borderDefault}`,
                        color: T.textPrimary, borderRadius: '6px', padding: '0 8px', height: '34px',
                        fontSize: '12px', outline: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)',
                      }}
                    >
                      <option value={180}>Standard (45s total)</option>
                      <option value={90}>2x Speed (22.5s)</option>
                      <option value={15}>Turbo (3.7s)</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '40px 110px 1.4fr 1.3fr 0.9fr 1.8fr 130px 60px',
              padding: '10px 20px',
              background: '#ffffff',
              borderBottom: `1px solid ${T.borderLight}`,
              alignItems: 'center', gap: '12px',
            }}>
              <input
                type="checkbox"
                checked={displayRows.length > 0 && selectedRows.length === displayRows.length}
                onChange={toggleSelectAll}
                style={{ cursor: 'pointer', accentColor: T.primaryNavy }}
              />
              <span style={{ fontSize: '11px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Row / Time
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Subscriber / Claim ID
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Policy ID & PAS
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Amount
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Adjudication Notes
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Status Signal
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>
                Action
              </span>
            </div>

            <div
              ref={logContainerRef}
              style={{
                maxHeight: '380px',
                overflowY: 'auto',
                background: '#ffffff',
              }}
            >
              {displayRows.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: T.textMuted, fontSize: '13px' }}>
                  {processedCount === 0 ? 'Initializing live batch ingestion stream...' : 'No log records match your filter criteria.'}
                </div>
              ) : (
                displayRows.map((row, idx) => {
                  const isCurrentActive = isProcessing && idx === displayRows.length - 1 && filterTab === 'all' && !searchQuery;
                  const isFailed = row.status === 'failed';
                  const isSelected = selectedRows.includes(row.row);

                  return (
                    <div
                      key={row.row}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '40px 110px 1.4fr 1.3fr 0.9fr 1.8fr 130px 60px',
                        padding: '12px 20px',
                        alignItems: 'center',
                        gap: '12px',
                        borderBottom: `1px solid ${T.borderLight}`,
                        background: isCurrentActive
                          ? '#eff6ff'
                          : isSelected
                          ? '#f1f5f9'
                          : isFailed
                          ? '#fef2f0'
                          : idx % 2 === 1
                          ? '#fcfdfe'
                          : '#ffffff',
                        transition: 'background 0.15s ease',
                        animation: 'fadeIn 0.2s ease',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectRow(row.row)}
                        style={{ cursor: 'pointer', accentColor: T.primaryNavy }}
                      />

                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: isCurrentActive ? T.stateBlue : T.primaryNavy }}>
                          #{String(row.row).padStart(3, '0')}
                        </div>
                        <div style={{ fontSize: '11px', color: T.textMuted }}>
                          {row.timestamp}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: T.textPrimary }}>
                          {row.subscriber}
                        </div>
                        <div style={{ fontSize: '11px', color: T.textMuted, fontFamily: 'monospace' }}>
                          {row.claimId}
                        </div>
                      </div>

                      <div>
                        <div style={{
                          fontSize: '12px', fontWeight: 600,
                          color: row.policyId.includes('???') ? T.error : T.textPrimary,
                          fontFamily: 'monospace',
                        }}>
                          {row.policyId}
                        </div>
                        <div style={{ fontSize: '11px', color: isFailed ? T.error : T.commitGreen, fontWeight: 500 }}>
                          {isFailed ? 'PAS Lookup Alert' : 'Active PAS Policy'}
                        </div>
                      </div>

                      <div style={{ fontSize: '13px', fontWeight: 700, color: T.primaryNavy }}>
                        {row.amount}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{
                          fontSize: '12px',
                          color: isFailed ? T.error : T.textSecondary,
                          lineHeight: 1.35,
                        }}>
                          {row.note}
                        </span>
                      </div>

                      <div>
                        {isCurrentActive ? (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            background: '#eff6ff', color: T.stateBlue, border: '1px solid #bfdbfe',
                            padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                          }}>
                            <Icons.Spinner color={T.stateBlue} size={11} />
                            <span>Checking</span>
                          </span>
                        ) : isFailed ? (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            background: '#fef2f0', color: T.error, border: '1px solid #fecaca',
                            padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                          }}>
                            <Icons.AlertTriangle color={T.error} size={12} />
                            <span>{row.error || 'Exception'}</span>
                          </span>
                        ) : (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            background: '#f0fdf4', color: T.commitGreen, border: '1px solid #bbf7d0',
                            padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                          }}>
                            <Icons.CheckCircle color={T.commitGreen} size={12} />
                            <span>Approved</span>
                          </span>
                        )}
                      </div>

                      <div style={{ textAlign: 'center' }}>
                        <button
                          onClick={() => setInspectModalRow(row)}
                          title="Inspect Log Entry Details"
                          style={{
                            background: 'transparent', border: 'none', cursor: 'pointer',
                            padding: '6px', borderRadius: '6px',
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'background 0.15s ease',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <Icons.Eye color={T.textMuted} size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div style={{
              padding: '10px 20px', background: '#f8fafc', borderTop: `1px solid ${T.borderLight}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: T.textMuted,
            }}>
              <span>Showing {displayRows.length} of {processedCount} streamed log records</span>
              {selectedRows.length > 0 && (
                <span style={{ fontWeight: 600, color: T.primaryNavy }}>
                  {selectedRows.length} rows selected
                </span>
              )}
            </div>

          </div>

          {/* ── D. COMPLETION HAND-OFF BANNER ── */}
          {done && (
            <div style={{
              background: '#f0fdf4',
              border: `1.5px solid ${T.commitGreen}`,
              borderRadius: '12px',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 16px rgba(0, 166, 81, 0.12)',
              animation: 'fadeIn 0.4s ease',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: T.commitGreen, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icons.CheckCircle color="#fff" size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '16px', color: T.primaryNavy, marginBottom: '2px' }}>
                    Batch Ingestion & Adjudication Complete
                  </div>
                  <div style={{ fontSize: '13px', color: T.textSecondary }}>
                    <strong style={{ color: T.commitGreen }}>240 claims</strong> validated & queued for Claims Work Queue. <strong style={{ color: T.error }}>10 exceptions</strong> flagged for manual correction.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleHandOffToExceptionWorkbench}
                  icon={<Icons.ArrowRight color="#fff" size={16} />}
                  style={{
                    background: `linear-gradient(135deg, ${T.primaryNavy}, ${T.stateBlue})`,
                    boxShadow: '0 4px 14px rgba(15, 76, 122, 0.3)',
                    padding: '0 24px',
                  }}
                >
                  View Exception Queue (10)
                </Button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Inspect Log Row Details Modal */}
      <Modal
        open={!!inspectModalRow}
        onClose={() => setInspectModalRow(null)}
        title={`Inspect Ingestion Log Entry — Row #${inspectModalRow?.row}`}
        width="540px"
      >
        {inspectModalRow && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 16px', background: inspectModalRow.status === 'failed' ? T.errorBg : '#f0fdf4',
              borderRadius: '8px', border: `1px solid ${inspectModalRow.status === 'failed' ? '#fecaca' : '#bbf7d0'}`,
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: inspectModalRow.status === 'failed' ? T.error : T.commitGreen }}>
                  {inspectModalRow.status === 'failed' ? `Exception Flagged: ${inspectModalRow.error}` : 'Validation Passed'}
                </div>
                <div style={{ fontSize: '12px', color: T.textMuted, marginTop: '2px' }}>
                  {inspectModalRow.note}
                </div>
              </div>
              <Badge status={inspectModalRow.status === 'failed' ? inspectModalRow.error : 'Approved'} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: T.pageCanvas, padding: '14px', borderRadius: '8px' }}>
              <div>
                <span style={{ fontSize: '11px', color: T.textMuted, display: 'block' }}>Claim ID</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: T.primaryNavy, fontFamily: 'monospace' }}>{inspectModalRow.claimId}</span>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: T.textMuted, display: 'block' }}>Subscriber Name</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: T.textPrimary }}>{inspectModalRow.subscriber}</span>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: T.textMuted, display: 'block' }}>Policy Number</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: T.textPrimary, fontFamily: 'monospace' }}>{inspectModalRow.policyId}</span>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: T.textMuted, display: 'block' }}>Claim Amount</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: T.primaryNavy }}>{inspectModalRow.amount}</span>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: T.textPrimary, display: 'block', marginBottom: '6px' }}>
                Raw Log Payload Output
              </span>
              <pre style={{
                background: '#0b2b3d', color: '#e2e8f0', padding: '12px', borderRadius: '8px',
                fontSize: '11px', fontFamily: 'monospace', overflowX: 'auto', margin: 0,
              }}>
                {JSON.stringify(inspectModalRow, null, 2)}
              </pre>
            </div>

            <Button variant="secondary" fullWidth onClick={() => setInspectModalRow(null)}>
              Close Inspector
            </Button>
          </div>
        )}
      </Modal>

    </div>
  );
}
