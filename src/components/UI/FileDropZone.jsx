import React, { useRef, useState } from 'react';
import { T } from '../../tokens';

const Icons = {
  UploadCloud: ({ color = T.primaryNavy, size = 36 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 16l-4-4-4 4" />
      <path d="M12 12v9" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  ),
  FilePdf: ({ color = T.error, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  FileImage: ({ color = T.stateBlue, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  FileGeneric: ({ color = T.primaryNavy, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
    </svg>
  ),
  X: ({ color = T.textMuted, size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

export default function FileDropZone({ files, onFilesChange }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    onFilesChange([...files, ...dropped]);
  };

  const handleInput = (e) => {
    const selected = Array.from(e.target.files);
    onFilesChange([...files, ...selected]);
  };

  const removeFile = (idx) => {
    onFilesChange(files.filter((_, i) => i !== idx));
  };

  const renderFileIcon = (name) => {
    const ext = name.split('.').pop().toLowerCase();
    if (ext === 'pdf') return <Icons.FilePdf />;
    if (['jpg', 'jpeg', 'png'].includes(ext)) return <Icons.FileImage />;
    return <Icons.FileGeneric />;
  };

  return (
    <div>
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current && inputRef.current.click()}
        style={{
          border: `2px dashed ${dragging ? T.stateBlue : T.borderDefault}`,
          borderRadius: '10px',
          padding: '32px 20px',
          textAlign: 'center',
          cursor: 'pointer',
          background: dragging ? '#eff6ff' : '#fafbfc',
          transition: 'all 0.2s ease',
          position: 'relative',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleInput}
          style={{ display: 'none' }}
        />
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
          <Icons.UploadCloud color={dragging ? T.stateBlue : T.primaryNavy} size={36} />
        </div>
        <div style={{ fontWeight: 600, fontSize: '14px', color: T.textPrimary, marginBottom: '6px' }}>
          {dragging ? 'Drop files here' : 'Drag & drop files here, or click to browse'}
        </div>
        <div style={{ fontSize: '12px', color: T.textMuted }}>
          Supported: PDF, JPG, PNG • Max 10 MB per file
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {files.map((f, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 14px',
                background: T.cardSurface,
                border: `1px solid ${T.borderLight}`,
                borderRadius: '8px',
                animation: 'fadeIn 0.25s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  {renderFileIcon(f.name)}
                </span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: T.textPrimary }}>{f.name}</div>
                  <div style={{ fontSize: '11px', color: T.textMuted }}>
                    {f.size ? (f.size / 1024).toFixed(1) + ' KB' : 'Unknown size'}
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: T.textMuted, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  padding: '4px', borderRadius: '4px', transition: 'all 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <Icons.X color={T.error} size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
