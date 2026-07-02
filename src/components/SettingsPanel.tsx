import { useState } from 'react'
import type { AppState } from '../hooks/useAppState'

function ToggleRow({ label, sub, on, onToggle }: { label: string; sub: string; on?: boolean; onToggle: () => void }) {
  return (
    <div className="toggle-row">
      <div className="tl">{label}<small>{sub}</small></div>
      <div className={`switch${on ? ' on' : ''}`} onClick={onToggle} />
    </div>
  )
}

export function SettingsPanel({ app }: { app: AppState }) {
  return (
    <div className={`panel${app.openPanel === 'settings' ? ' show' : ''}`}>
      <div className="panel-head">
        <h3>Settings</h3>
        <button className="close" onClick={app.closeAllPanels}>✕</button>
      </div>
      <div className="panel-body">
        <div className="set-group">
          <h4>Notifications</h4>
          <div className="gnote">Turn off anything that drives you crazy. Changes save instantly.</div>
          <ToggleRow label="Mute everything" sub="One switch for total quiet" onToggle={() => app.toast('Notification pref updated')} />
          <ToggleRow label="Group activity" sub="Posts and updates in your groups" on onToggle={() => app.toast('Notification pref updated')} />
          <ToggleRow label="Direct messages" sub="New DMs from approved friends" on onToggle={() => app.toast('Notification pref updated')} />
          <ToggleRow label="Spanks" sub="When someone spanks you" on onToggle={() => app.toast('Notification pref updated')} />
          <ToggleRow label="Consent requests" sub="When someone asks to reach you" on onToggle={() => app.toast('Notification pref updated')} />
          <ToggleRow label="Event reminders" sub="Before events you RSVP'd to" on onToggle={() => app.toast('Notification pref updated')} />
        </div>

        <div className="set-group">
          <h4>Who can reach you</h4>
          <div className="gnote">People you&apos;ve granted access to. Revoke anytime, no explanation owed.</div>
          {[
            { i: 'N', grad: '135deg,#9EFF00,#00FFC2', name: 'nocturne', perms: 'can spank · message · photos' },
            { i: 'M', grad: '135deg,#00FFC2,#7CE33A', name: 'mercuryknot', perms: 'can spank · message' },
            { i: 'P', grad: '135deg,#7CE33A,#00FFC2', name: 'pupatlas', perms: 'can message' },
          ].map((p) => (
            <PermRow key={p.name} {...p} onRevoke={() => app.toast('Access revoked')} />
          ))}
        </div>

        <div className="set-group">
          <h4>Privacy</h4>
          <ToggleRow label="Handle-first" sub="Hide any real name, always" on onToggle={() => app.toast('Privacy updated')} />
          <ToggleRow label="Show my dynamic" sub="Visible to friends only" on onToggle={() => app.toast('Privacy updated')} />
          <ToggleRow label="Show my location" sub="Neighborhood, not address" on onToggle={() => app.toast('Privacy updated')} />
          <ToggleRow label="Discreet mode" sub="Hide online status and activity" onToggle={() => app.toast('Privacy updated')} />
        </div>

        <div className="set-group">
          <h4>Safety</h4>
          <div className="blocked-row"><span style={{ fontSize: 14, color: 'var(--body)' }}>Blocked users</span><span style={{ marginLeft: 'auto', fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--muted)' }}>2 blocked</span></div>
          <div className="blocked-row"><span className="link-btn" onClick={() => app.toast('Opening report center')}>Report center</span></div>
          <div className="blocked-row"><span className="link-btn" onClick={() => app.toast('Community guidelines')}>Community guidelines &amp; consent norms</span></div>
        </div>

        <div className="set-group" style={{ borderBottom: 'none' }}>
          <h4>Demo</h4>
          <div className="blocked-row">
            <span className="link-btn" onClick={() => { app.closeAllPanels(); app.replayInvite() }}>▶ Replay invite &amp; onboarding flow</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function PermRow({
  i, grad, name, perms, onRevoke,
}: {
  i: string
  grad: string
  name: string
  perms: string
  onRevoke: () => void
}) {
  const [revoked, setRevoked] = useState(false)

  return (
    <div className="perm-row">
      <div className="perm-av" style={{ background: `linear-gradient(${grad})` }}>{i}</div>
      <div className="perm-info"><div className="pn">{name}</div><div className="pk">{revoked ? 'no access' : perms}</div></div>
      <button
        className={`revoke${revoked ? ' done' : ''}`}
        onClick={() => { if (!revoked) { setRevoked(true); onRevoke() } }}
      >
        {revoked ? 'Revoked' : 'Revoke'}
      </button>
    </div>
  )
}
