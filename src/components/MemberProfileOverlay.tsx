import type { AppState } from '../hooks/useAppState'
import type { ConsentKind } from '../types'

const CONSENT: { kind: ConsentKind; icon: string; label: string; defaultSub: string }[] = [
  { kind: 'spank', icon: '👋', label: 'Spank', defaultSub: 'Playful nudge, needs approval' },
  { kind: 'message', icon: '💬', label: 'Message', defaultSub: 'Direct messages, needs approval' },
  { kind: 'photo', icon: '📷', label: 'Send photos', defaultSub: 'Share pictures, needs approval' },
]

function consentLabel(status: string, defaultSub: string) {
  if (status === 'pending') return 'Waiting for approval'
  if (status === 'active') return 'Approved. Tap to revoke anytime.'
  if (status === 'none') return defaultSub
  return 'Revoked. Needs approval again.'
}

function consentBtnClass(status: string) {
  if (status === 'pending') return 'consent-btn pending'
  if (status === 'active') return 'consent-btn active'
  return 'consent-btn request'
}

function consentBtnText(status: string) {
  if (status === 'pending') return 'Requested'
  if (status === 'active') return 'Allowed · revoke'
  return 'Request'
}

export function MemberProfileOverlay({ app }: { app: AppState }) {
  return (
    <div
      className={`overlay${app.showMemberProfile ? ' show' : ''}`}
      onClick={(e) => e.target === e.currentTarget && app.setShowMemberProfile(false)}
    >
      <div className="modal">
        <div className="mp-head">
          <div className="mp-av" style={{ background: `linear-gradient(${app.member.grad})` }}>
            {app.member.initial}<span className="on" />
          </div>
          <div style={{ flex: 1 }}>
            <div className="mp-name">{app.member.name}</div>
            <div className="mp-handle">@{app.member.name} · {app.member.loc}</div>
            <div className="mp-dyn"><span className="pill">{app.member.dyn}</span></div>
          </div>
          <button
            className="mp-cog"
            aria-label="More options"
            onClick={(e) => { e.stopPropagation(); app.setMpMenuOpen(!app.mpMenuOpen) }}
          >
            ⚙️
          </button>
          <div className={`mp-menu${app.mpMenuOpen ? ' show' : ''}`}>
            <button onClick={() => { app.toast('Permissions manager opened'); app.setMpMenuOpen(false) }}>🛡️ Manage permissions</button>
            <button onClick={() => { app.toast(`🔇 ${app.member.name} muted`); app.setMpMenuOpen(false) }}>🔇 Mute</button>
            <button className="danger" onClick={() => { app.toast(`🚫 ${app.member.name} blocked`); app.setMpMenuOpen(false); app.setShowMemberProfile(false) }}>🚫 Block</button>
            <button className="danger" onClick={() => { app.toast('Report sent to mods'); app.setMpMenuOpen(false) }}>⚑ Report</button>
          </div>
        </div>

        {!app.friendAdded ? (
          <div>
            <button className="btn btn-primary center-flex" style={{ marginTop: 20 }} onClick={app.addFriend}>+ Add friend</button>
            <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', marginTop: 12 }}>
              Adding a friend doesn&apos;t grant any access. You approve each thing separately.
            </p>
          </div>
        ) : (
          <div>
            <div className="consent-title">What {app.member.name} can do</div>
            <p className="consent-note">
              Every interaction is opt-in. Send a request, they approve, and you can revoke it anytime. Nothing happens without a yes.
            </p>
            {CONSENT.map(({ kind, icon, label, defaultSub }) => {
              const status = app.consentState[kind]
              return (
                <div key={kind} className="consent-row">
                  <div className="consent-ic">{icon}</div>
                  <div className="consent-info">
                    <div className="cn">{label}</div>
                    <div className="cs">{consentLabel(status, defaultSub)}</div>
                  </div>
                  <button className={consentBtnClass(status)} onClick={() => app.requestConsent(kind)}>
                    {consentBtnText(status)}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
