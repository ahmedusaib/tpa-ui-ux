import React, { useRef, useState } from 'react';
import { T } from '../../tokens';

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

  const getIcon = (name) => {
    const ext = name.split('.').pop().toLowerCase();
    if (ext === 'pdf') return '📄';
    if (['jpg', 'jpeg', 'png'].includes(ext)) return '🖼️';
    return '📎';
  };

  return (
    <div>
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
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
        <div style={{ fontSize: '36px', marginBottom: '10px' }}>
          {dragging ? '📂' : '📁'}
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
                <span style={{ fontSize: '20px' }}>{getIcon(f.name)}</span>
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
                  color: T.textMuted, fontSize: '18px', padding: '2px 6px',
                  borderRadius: '4px', transition: 'color 0.15s',
                }}
                onMouseEnter={e => e.target.style.color = T.error}
                onMouseLeave={e => e.target.style.color = T.textMuted}
              >×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
