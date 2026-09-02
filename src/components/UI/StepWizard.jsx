import React from 'react';
import { T } from '../../tokens';

export default function StepWizard({ steps, currentStep }) {
  return (
    <div style={{ padding: '0 0 28px 0' }}>
      {/* Progress Track */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {steps.map((step, i) => {
          const isCompleted = i < currentStep;
          const isActive    = i === currentStep;
          return (
            <React.Fragment key={step}>
              {/* Step Node */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <div style={{
                  width: 36, height: 36,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '14px',
                  background: isCompleted ? T.commitGreen : isActive ? T.primaryNavy : '#e2e8f0',
                  color: isCompleted || isActive ? '#fff' : T.textMuted,
                  border: isActive ? `3px solid ${T.stateBlue}` : 'none',
                  boxShadow: isActive ? '0 0 0 4px rgba(27,117,187,0.15)' : 'none',
                  transition: 'all 0.3s ease',
                  position: 'relative', zIndex: 1,
                }}>
                  {isCompleted ? '✓' : i + 1}
                </div>
                <span style={{
                  marginTop: '6px',
                  fontSize: '12px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? T.primaryNavy : isCompleted ? T.commitGreen : T.textMuted,
                  whiteSpace: 'nowrap',
                  textAlign: 'center',
                }}>
                  {step}
                </span>
              </div>
              {/* Connector */}
              {i < steps.length - 1 && (
                <div style={{
                  flex: 2,
                  height: '2px',
                  background: i < currentStep ? T.commitGreen : T.borderLight,
                  marginBottom: '20px',
                  transition: 'background 0.4s ease',
                  position: 'relative', zIndex: 0,
                }} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
