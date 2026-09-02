import React, { useState, useRef } from 'react';
import { T } from '../../tokens';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';

export default function BulkClaimUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const template = [
    'Policy Number', 'Claimant Name', 'Relationship', 'Contact Mobile',
    'Benefit Category', 'Incident Date', 'Facility Name', 'Claim Amount (PKR)', 'Description',
  ];

  const handleFile = (f) => {
    setFile(f);
    setDone(false);
    setProgress(0);
  };

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    let p = 0;
    const timer = setInterval(() => {
      p += Math.floor(Math.random() * 12) + 5;
      if (p >= 100) {
        clearInterval(timer);
        p = 100;
        setProgress(100);
        setUploading(false);
        setDone(true);
      } else {
        setProgress(p);
      }
    }, 300);
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', animation: 'fadeIn 0.3s ease' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: T.primaryNavy, marginBottom: '6px' }}>
          Bulk Claim Upload — Telco Agent Portal
        </h1>
        <p style={{ fontSize: '14px', color: T.textMuted }}>
          Upload batch claim intimations in CSV format. Maximum 500 records per batch.
        </p>
      </div>

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

        {/* Upload Progress */}
        {(uploading || done) && (
          <div style={{ marginTop: '18px', animation: 'fadeIn 0.3s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: T.textPrimary }}>
                {done ? '✅ Upload Complete' : '⏳ Uploading & Validating...'}
              </span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: done ? T.commitGreen : T.primaryNavy }}>
                {progress}%
              </span>
            </div>
            <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${progress}%`,
                background: done
                  ? `linear-gradient(90deg, ${T.commitGreen}, #00c968)`
                  : `linear-gradient(90deg, ${T.primaryNavy}, ${T.stateBlue})`,
                borderRadius: '4px',
                transition: 'width 0.3s ease',
              }} />
            </div>
          </div>
        )}

        {/* Done Result */}
        {done && (
          <div style={{
            marginTop: '18px', padding: '14px',
            background: '#f0fdf4', border: '1px solid #bbf7d0',
            borderRadius: '8px', animation: 'fadeIn 0.3s ease',
          }}>
            <div style={{ fontWeight: 700, fontSize: '14px', color: T.commitGreen, marginBottom: '8px' }}>
              Batch Processed Successfully
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              {[
                { label: 'Total Records', value: '250', color: T.primaryNavy },
                { label: 'Valid', value: '240', color: T.commitGreen },
                { label: 'Exceptions', value: '10', color: T.error, badge: true },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: '12px', color: T.textMuted }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '12px', fontSize: '13px', color: T.error }}>
              ⚠️ 10 exceptions found — visit the <strong>Bulk Exception Workbench</strong> to resolve.
            </div>
          </div>
        )}
      </div>

      {!done && (
        <Button variant="primary" fullWidth onClick={handleUpload} disabled={!file || uploading} loading={uploading} style={{ height: '48px' }}>
          🚀 Upload & Process Batch
        </Button>
      )}
    </div>
  );
}
