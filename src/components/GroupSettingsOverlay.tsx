import type { AppState } from '../hooks/useAppState'

export function GroupSettingsOverlay({ app }: { app: AppState }) {
  return (
    <div
      className={`overlay${app.showGroupSettings ? ' show' : ''}`}
      onClick={(e) => e.target === e.currentTarget && app.setShowGroupSettings(false)}
    >
      <div className="modal">
        <h2 style={{ textAlign: 'left' }}>Cruise LA settings</h2>
        <p className="sub" style={{ textAlign: 'left', marginBottom: 18 }}>Admin controls. Members never see this.</p>

        <div className="set-group" style={{ padding: '0 0 16px', borderColor: 'var(--line-soft)' }}>
          <h4>Visibility</h4>
          <div className="gnote">Private groups don&apos;t appear in search. New members join by invite only.</div>
          <div className="toggle-row">
            <div className="tl">Private group<small>Invite-only, hidden from discovery</small></div>
            <div className="switch on" onClick={() => app.toast('Group visibility updated')} />
          </div>
        </div>

        <div className="set-group" style={{ padding: '16px 0', borderColor: 'var(--line-soft)' }}>
          <h4>Who can invite</h4>
          <div className="gnote">Controls who can bring new people in. This is your trust backbone.</div>
          <div className="toggle-row">
            <div className="tl" id="inviteModeLabel">
              {app.inviteModeMember ? (
                <>Any member<small>Everyone in the group can invite</small></>
              ) : (
                <>Admins only<small>Only mods and the founder can invite</small></>
              )}
            </div>
            <div
              className={`switch${app.inviteModeMember ? ' on' : ''}`}
              onClick={() => {
                const next = !app.inviteModeMember
                app.setInviteModeMember(next)
                app.toast(next ? 'Anyone can now invite' : 'Only admins can invite')
              }}
            />
          </div>
        </div>

        <div className="set-group" style={{ padding: '16px 0 0', border: 'none' }}>
          <h4>Notifications</h4>
          <div className="toggle-row">
            <div className="tl">Mute this group<small>Stay a member, stop the pings</small></div>
            <div className="switch" onClick={() => app.toast('Group notifications updated')} />
          </div>
        </div>
      </div>
    </div>
  )
}
