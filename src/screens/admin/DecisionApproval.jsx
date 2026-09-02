import React, { useState } from 'react';
import { T } from '../../tokens';
import Button from '../../components/UI/Button';
import Badge from '../../components/UI/Badge';
import Modal from '../../components/UI/Modal';

const PENDING_APPROVALS = [
  {
    id: 'CLM-2026-48821', type: 'Hospitalization', subscriber: 'Jawad Saleem',
    amount: 45000, deductible: 4500, payable: 40500,
    assessor: 'Ahmed Malik', makerDate: '02 Sep 2026, 09:14',
    riskLevel: 'Low Risk', status: 'Awaiting Checker',
    docs: ['hospital_bill_AKU.pdf', 'discharge_summary.pdf', 'cnic_copy.jpg'],
  },
  {
    id: 'CLM-2026-31100', type: 'Disability', subscriber: 'Usama Tariq',
    amount: 120000, deductible: 0, payable: 120000,
    assessor: 'Sara Khan', makerDate: '01 Sep 2026, 14:32',
    riskLevel: 'Medium Risk', status: 'Awaiting Checker',
    docs: ['disability_cert.pdf', 'doctor_report.pdf'],
  },
];

export default function DecisionApproval() {
  const [selected, setSelected] = useState(null);
  const [checkerNotes, setCheckerNotes] = useState('');
  const [approvedIds, setApprovedIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState('');

  const claim = PENDING_APPROVALS.find(c => c.id === selected);

  const handleAction = (action) => {
    setModalAction(action);
    setShowModal(true);
  };

  const confirmAction = () => {
    if (modalAction === 'Approve') {
      setApprovedIds(prev => [...prev, selected]);
    }
    setShowModal(false);
    setSelected(null);
  };

  const pending = PENDING_APPROVALS.filter(c => !approvedIds.includes(c.id));

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      <div style={{ marginBottom: '22px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: T.primaryNavy, marginBottom: '4px' }}>
          Decision & Approval Workstation
        </h1>
        <p style={{ fontSize: '13px', color: T.textMuted }}>
          Maker-Checker sign-off workflow. Claims approved by Maker require Checker authorization before payout.
        </p>
      </div>

      {/* Maker-Checker Diagram */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 0,
        background: T.cardSurface, border: `1px solid ${T.borderLight}`,
        borderRadius: '12px', padding: '16px 24px', marginBottom: '20px',
        boxShadow: 'var(--shadow-card)',
        overflowX: 'auto',
      }}>
        {[
          { icon: '📋', label: 'Claim Submitted', sub: 'Subscriber Portal', color: T.stateBlue },
          { icon: '🤖', label: 'AI Assessment', sub: 'Auto-adjudication', color: T.stateBlue },
          { icon: '👤', label: 'Maker Review', sub: 'Assessor Decision', color: T.primaryNavy },
          { icon: '✅', label: 'Checker Sign-off', sub: 'Senior Authorization', color: T.goldAccent, active: true },
          { icon: '💳', label: 'Payout Execution', sub: 'Finance Disbursement', color: T.commitGreen },
        ].map((step, i, arr) => (
          <React.Fragment key={step.label}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '100px' }}>
              <div style={{
                width: 42, height: 42, borderRadius: '50%',
                background: step.active ? step.color : '#e8edf2',
                border: step.active ? `3px solid ${step.color}` : '3px solid #c5cad0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px', marginBottom: '8px',
                boxShadow: step.active ? `0 0 0 5px rgba(205,146,78,0.2)` : 'none',
              }}>{step.icon}</div>
              <div style={{ fontWeight: step.active ? 700 : 500, fontSize: '12px', color: step.active ? step.color : T.textSecondary, textAlign: 'center' }}>{step.label}</div>
              <div style={{ fontSize: '10px', color: T.textMuted, textAlign: 'center' }}>{step.sub}</div>
            </div>
            {i < arr.length - 1 && (
              <div style={{ flex: 1, height: '2px', background: '#e2e8f0', margin: '0 4px 20px' }} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: pending.length && selected ? '1fr 1.1fr' : '1fr', gap: '16px' }}>
        {/* Pending Queue */}
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: T.primaryNavy, marginBottom: '12px' }}>
            Pending Checker Authorization ({pending.length})
          </h3>
          {pending.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '40px',
              background: T.cardSurface, borderRadius: '12px',
              border: `1px solid ${T.borderLight}`, color: T.textMuted,
            }}>
              ✅ All items signed off — queue is clear!
            </div>
          ) : (
            pending.map((c, i) => (
              <div
                key={c.id}
                onClick={() => setSelected(selected === c.id ? null : c.id)}
                style={{
                  background: T.cardSurface,
                  border: `1px solid ${selected === c.id ? T.primaryNavy : T.borderLight}`,
                  borderRadius: '10px', padding: '16px',
                  marginBottom: '10px', cursor: 'pointer',
                  boxShadow: selected === c.id ? '0 0 0 3px rgba(15,76,122,0.12)' : 'var(--shadow-card)',
                  transition: 'all 0.18s ease',
                  animation: `fadeIn 0.3s ease ${i * 0.1}s both`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: T.primaryNavy }}>{c.id}</div>
                    <div style={{ fontSize: '12px', color: T.textMuted }}>{c.type} · {c.subscriber}</div>
                  </div>
                  <Badge status={c.riskLevel} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: T.primaryNavy }}>
                      PKR {c.payable.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '11px', color: T.textMuted }}>
                      Maker: {c.assessor} · {c.makerDate}
                    </div>
                  </div>
                  <Badge status="Awaiting Checker" style={{ background: '#fff7ed', color: T.goldAccent, border: `1px solid #fed7aa` }} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail Panel */}
        {selected && claim && (
          <div style={{ animation: 'slideInRight 0.25s ease' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: T.primaryNavy, marginBottom: '12px' }}>
              Checker Review — {selected}
            </h3>
            <div style={{
              background: T.cardSurface, border: `1px solid ${T.borderLight}`,
              borderRadius: '12px', padding: '20px',
              boxShadow: 'var(--shadow-card)',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                {[
                  ['Subscriber', claim.subscriber],
                  ['Claim Type', claim.type],
                  ['Original Amount', `PKR ${claim.amount.toLocaleString()}`],
                  ['Deductible', `PKR ${claim.deductible.toLocaleString()}`],
                  ['Net Payable', `PKR ${claim.payable.toLocaleString()}`],
                  ['Assessed by', claim.assessor],
                ].map(([l, v]) => (
                  <div key={l} style={{
                    background: T.pageCanvas, borderRadius: '8px',
                    padding: '10px 12px',
                  }}>
                    <div style={{ fontSize: '11px', color: T.textMuted, marginBottom: '2px' }}>{l}</div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: T.textPrimary }}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Documents */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: T.textMuted, marginBottom: '8px' }}>ATTACHED DOCUMENTS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {claim.docs.map(doc => (
                    <div key={doc} style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '8px 12px', background: T.pageCanvas,
                      borderRadius: '6px', fontSize: '12px',
                    }}>
                      <span>📄</span>
                      <span style={{ color: T.stateBlue, fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checker Notes */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: T.textPrimary, display: 'block', marginBottom: '6px' }}>
                  Checker Notes (Optional)
                </label>
                <textarea
                  id="checker-notes"
                  value={checkerNotes}
                  onChange={e => setCheckerNotes(e.target.value)}
                  placeholder="Add your authorization notes..."
                  rows={3}
                  style={{
                    width: '100%', padding: '10px 12px',
                    border: `1px solid ${T.borderDefault}`, borderRadius: '8px',
                    fontFamily: 'var(--font-family)', fontSize: '13px',
                    resize: 'none', outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Button variant="commit" fullWidth onClick={() => handleAction('Approve')}>
                  ✅ Authorize & Initiate Payout
                </Button>
                <Button variant="danger" fullWidth onClick={() => handleAction('Reject')}>
                  ❌ Override Reject
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title={`Confirm ${modalAction}`} width="420px">
        <p style={{ fontSize: '14px', color: T.textSecondary, marginBottom: '20px' }}>
          {modalAction === 'Approve'
            ? `You are authorizing payout of PKR ${claim?.payable?.toLocaleString()} for claim ${selected}. This action is irreversible.`
            : `You are overriding the Maker's decision and rejecting claim ${selected}. A reason will be logged.`
          }
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="secondary" fullWidth onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant={modalAction === 'Approve' ? 'commit' : 'danger'} fullWidth onClick={confirmAction}>
            {modalAction === 'Approve' ? '✅ Confirm Authorization' : '❌ Confirm Rejection'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
