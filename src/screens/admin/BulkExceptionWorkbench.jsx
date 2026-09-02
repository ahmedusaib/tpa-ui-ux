import React, { useState } from 'react';
import { T } from '../../tokens';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import Modal from '../../components/UI/Modal';

const EXCEPTION_ROWS = [
  { row: 1,  policyId: 'AL-TPA-XXXX-???', subscriber: 'Muhammad Ali',   amount: 'PKR 12,000', error: 'Invalid Policy ID',     errorDetail: 'Policy number format is invalid' },
  { row: 2,  policyId: 'AL-TPA-2024-09921', subscriber: 'Farrukh Nabi',  amount: 'PKR 8,500',  error: 'Unreadable Document',  errorDetail: 'Attached image is too blurry to OCR' },
  { row: 5,  policyId: 'AL-TPA-2022-33400', subscriber: 'Sana Mirza',    amount: 'PKR 55,000', error: 'Duplicate Claim',      errorDetail: 'Claim CLM-2026-22810 already filed for same incident date' },
  { row: 8,  policyId: 'AL-TPA-2025-10120', subscriber: 'Ali Raza',      amount: 'PKR 3,200',  error: 'Invalid Policy ID',    errorDetail: 'Policy not found in core system' },
  { row: 11, policyId: 'AL-TPA-2023-77800', subscriber: 'Hira Baig',     amount: 'PKR 28,000', error: 'Unreadable Document',  errorDetail: 'PDF appears corrupted — re-upload required' },
  { row: 14, policyId: 'AL-TPA-2024-55210', subscriber: 'Kashif Latif',  amount: 'PKR 9,400',  error: 'Duplicate Claim',      errorDetail: 'Same subscriber, same date, same amount — suspected fraud flag' },
  { row: 17, policyId: 'AL-TPA-2021-04400', subscriber: 'Zara Fatima',   amount: 'PKR 17,700', error: 'Invalid Policy ID',    errorDetail: 'Policy expired on 01 Jan 2026' },
  { row: 22, policyId: 'AL-TPA-2026-10934', subscriber: 'Imran Siddiq',  amount: 'PKR 6,000',  error: 'Unreadable Document',  errorDetail: 'CNIC scan not visible — low contrast' },
  { row: 28, policyId: 'AL-TPA-2023-88200', subscriber: 'Nadia Khan',    amount: 'PKR 42,500', error: 'Duplicate Claim',      errorDetail: 'Claim within 30-day waiting period' },
  { row: 30, policyId: 'AL-TPA-XXXX-???',  subscriber: 'Tariq Mehmood', amount: 'PKR 14,000', error: 'Invalid Policy ID',    errorDetail: 'Policy ID missing required TPA prefix' },
];

export default function BulkExceptionWorkbench() {
  const [fixModal, setFixModal] = useState(null); // row index
  const [resolved, setResolved] = useState([]);
  const [editValues, setEditValues] = useState({});

  const openFix = (row) => {
    setEditValues({
      policyId: row.policyId,
      subscriber: row.subscriber,
      amount: row.amount,
    });
    setFixModal(row.row);
  };

  const handleResolve = () => {
    setResolved(prev => [...prev, fixModal]);
    setFixModal(null);
  };

  const exceptionRow = EXCEPTION_ROWS.find(r => r.row === fixModal);
  const pending = EXCEPTION_ROWS.filter(r => !resolved.includes(r.row));

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      {/* Header */}
      <div style={{ marginBottom: '22px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: T.primaryNavy, marginBottom: '4px' }}>
          Bulk Intimation Exception Workbench
        </h1>
        <p style={{ fontSize: '13px', color: T.textMuted }}>
          Resolve corrupted or invalid records from the batch upload before re-submitting to the claims queue.
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '22px' }}>
        {[
          { label: 'Total Uploaded',   value: 250, icon: '📦', color: T.primaryNavy },
          { label: 'Valid Records',     value: 240, icon: '✅', color: T.commitGreen },
          { label: 'Exceptions',        value: 10,  icon: '⚠️', color: T.error },
          { label: 'Resolved',          value: resolved.length, icon: '🔧', color: T.goldAccent },
        ].map(stat => (
          <div key={stat.label} style={{
            background: T.cardSurface, border: `1px solid ${T.borderLight}`,
            borderRadius: '12px', padding: '16px 18px',
            borderLeft: `4px solid ${stat.color}`,
            boxShadow: 'var(--shadow-card)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '20px' }}>{stat.icon}</span>
              <span style={{ fontSize: '12px', color: T.textMuted }}>{stat.label}</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: stat.color }}>
              {stat.label === 'Resolved' ? resolved.length : stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      {resolved.length > 0 && (
        <div style={{ marginBottom: '18px', animation: 'fadeIn 0.3s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: T.textPrimary }}>
              Exception Resolution Progress
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: T.commitGreen }}>
              {resolved.length}/10 resolved
            </span>
          </div>
          <div style={{ height: '7px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${(resolved.length / 10) * 100}%`,
              background: `linear-gradient(90deg, ${T.commitGreen}, #00c968)`,
              borderRadius: '4px', transition: 'width 0.5s ease',
            }} />
          </div>
        </div>
      )}

      {/* Exception Table */}
      <div style={{
        background: T.cardSurface, border: `1px solid ${T.borderLight}`,
        borderRadius: '12px', overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
      }}>
        {/* Table Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '60px 1fr 1.2fr 0.8fr 1.2fr 1.4fr 1fr',
          padding: '0 16px', height: '42px',
          background: T.pageCanvas,
          borderBottom: `1px solid ${T.borderLight}`,
          alignItems: 'center', gap: '12px',
        }}>
          {['Row #', 'Policy ID', 'Subscriber', 'Amount', 'Error Type', 'Error Detail', 'Action'].map(h => (
            <span key={h} style={{ fontSize: '11px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {EXCEPTION_ROWS.map((row, i) => {
          const isResolved = resolved.includes(row.row);
          return (
            <div
              key={row.row}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 1.2fr 0.8fr 1.2fr 1.4fr 1fr',
                padding: '0 16px', height: '52px',
                alignItems: 'center', gap: '12px',
                borderBottom: i < EXCEPTION_ROWS.length - 1 ? `1px solid ${T.borderLight}` : 'none',
                background: isResolved ? '#f0fdf4' : 'transparent',
                opacity: isResolved ? 0.65 : 1,
                transition: 'all 0.25s ease',
                animation: `fadeIn 0.3s ease ${i * 0.05}s both`,
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: 700, color: T.textMuted }}>#{row.row}</span>
              <span style={{
                fontSize: '12px', fontWeight: 600,
                color: row.policyId.includes('???') ? T.error : T.textPrimary,
                fontFamily: 'monospace',
              }}>{row.policyId}</span>
              <span style={{ fontSize: '13px', fontWeight: 500, color: T.textPrimary }}>{row.subscriber}</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: T.primaryNavy }}>{row.amount}</span>
              <Badge status={row.error} size="sm" />
              <span style={{ fontSize: '11px', color: T.textMuted, lineHeight: 1.3 }}>{row.errorDetail}</span>
              {isResolved ? (
                <span style={{ fontSize: '12px', fontWeight: 700, color: T.commitGreen }}>✅ Resolved</span>
              ) : (
                <Button
                  id={`fix-btn-row-${row.row}`}
                  variant="stateBlue"
                  size="sm"
                  onClick={() => openFix(row)}
                >
                  🔧 Fix & Resubmit
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {/* All resolved banner */}
      {resolved.length === EXCEPTION_ROWS.length && (
        <div style={{
          marginTop: '20px', padding: '18px 24px',
          background: '#f0fdf4', border: `1px solid ${T.commitGreen}`,
          borderRadius: '12px', textAlign: 'center',
          animation: 'fadeIn 0.4s ease',
        }}>
          <div style={{ fontSize: '28px', marginBottom: '6px' }}>🎉</div>
          <div style={{ fontWeight: 700, fontSize: '16px', color: T.commitGreen }}>
            All exceptions resolved!
          </div>
          <div style={{ fontSize: '13px', color: T.textMuted, marginTop: '4px' }}>
            10 records corrected and re-submitted to the Claims Work Queue.
          </div>
        </div>
      )}

      {/* Fix Modal */}
      <Modal
        open={!!fixModal}
        onClose={() => setFixModal(null)}
        title={`Fix Exception — Row #${fixModal}`}
        width="520px"
      >
        {exceptionRow && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Error Info */}
            <div style={{
              padding: '12px 14px', background: T.errorBg,
              border: `1px solid #fecaca`, borderRadius: '8px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Badge status={exceptionRow.error} />
              </div>
              <div style={{ fontSize: '13px', color: T.error }}>{exceptionRow.errorDetail}</div>
            </div>

            {/* Editable Fields */}
            {[
              { label: 'Policy ID', key: 'policyId', placeholder: 'e.g. AL-TPA-2024-XXXXX' },
              { label: 'Subscriber Name', key: 'subscriber', placeholder: 'Full name' },
              { label: 'Claim Amount', key: 'amount', placeholder: 'e.g. PKR 12,000' },
            ].map(field => (
              <div key={field.key}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: T.textPrimary, display: 'block', marginBottom: '5px' }}>
                  {field.label}
                </label>
                <input
                  type="text"
                  value={editValues[field.key] || ''}
                  onChange={e => setEditValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  style={{
                    width: '100%', height: '42px', padding: '0 14px',
                    border: `1px solid ${T.borderDefault}`, borderRadius: '8px',
                    fontFamily: 'var(--font-family)', fontSize: '14px', outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = T.stateBlue}
                  onBlur={e => e.target.style.borderColor = T.borderDefault}
                />
              </div>
            ))}

            <div style={{
              padding: '12px 14px', background: '#eff6ff',
              border: '1px solid #bfdbfe', borderRadius: '8px',
              fontSize: '13px', color: T.stateBlue,
            }}>
              💡 After correction, this record will be re-validated and added to the Claims Work Queue.
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <Button variant="secondary" fullWidth onClick={() => setFixModal(null)}>Cancel</Button>
              <Button variant="primary" fullWidth onClick={handleResolve}>
                🚀 Correct & Re-submit
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
