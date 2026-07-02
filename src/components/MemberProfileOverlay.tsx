import type { AppState } from '../hooks/useAppState'
import { memberSnippet, PROFILE_ACTION_LABELS } from '../constants/members'
import type { ConsentKind, ConsentStatus } from '../types'
import { SpankActions } from './FeedItem'

const PROFILE_ACTIONS: { kind: ConsentKind; icon: string }[] = [
  { kind: 'spank', icon: '👋' },
  { kind: 'message', icon: '💬' },
  { kind: 'photo', icon: '📷' },
]

function actionClass(status: ConsentStatus) {
  if (status === 'pending') return 'mp-action pending'
  if (status === 'active') return 'mp-action active'
  return 'mp-action'
}

function actionLabel(kind: ConsentKind, status: ConsentStatus) {
  const label = PROFILE_ACTION_LABELS[kind]
  if (status === 'pending') return `${label} · requested`
  if (status === 'active' && kind !== 'spank') return `${label} · open`
  return label
}

export function MemberProfileOverlay({ app }: { app: AppState }) {
  const snippet = memberSnippet(app.member.name, app.member.dyn)

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

        <div className="mp-preview">
          <div className="mp-mood">
            <span className="lbl">Mood</span>
            <em>{snippet.mood}</em>
          </div>
          <div className="mp-detail">
            <span className="k">Into</span>
            <span className="v">{snippet.into}</span>
          </div>
          {app.member.sexuality && (
            <div className="mp-detail">
              <span className="k">Sexuality</span>
              <span className="v">{app.member.sexuality}</span>
            </div>
          )}
          {app.member.genderIdentity && (
            <div className="mp-detail">
              <span className="k">Gender identity</span>
              <span className="v">{app.member.genderIdentity}</span>
            </div>
          )}
          <div className="mp-detail">
            <span className="k">Location</span>
            <span className="v">{app.member.loc}</span>
          </div>
        </div>

        <p className="mp-note">
          Browse freely. A request is sent only when you try to flirt, message, or share photos.
        </p>

        <div className="mp-actions">
          {PROFILE_ACTIONS.map(({ kind, icon }) => {
            const status = app.consentState[kind]
            return (
              <button
                key={kind}
                type="button"
                className={actionClass(status)}
                onClick={() => app.profileAction(kind)}
              >
                <span className="mp-action-ic">{icon}</span>
                {actionLabel(kind, status)}
              </button>
            )
          })}
        </div>

        {app.consentState.spank === 'active' && (
          <div className="spank-actions">
            <div className="consent-title">Flirt with {app.member.name}</div>
            <SpankActions
              label="Flirt"
              onSpank={(visibility) => {
                app.spank(app.member.name, visibility)
                app.setShowMemberProfile(false)
              }}
            />
          </div>
        )}

        <button
          type="button"
          className={`btn btn-ghost center-flex mp-friend${app.friendAdded ? ' added' : ''}`}
          onClick={app.addFriend}
          disabled={app.friendAdded}
        >
          {app.friendAdded ? '✓ Friends' : '+ Add friend'}
        </button>
      </div>
    </div>
  )
}
