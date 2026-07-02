import type { AppState } from '../hooks/useAppState'

const REQUESTS = [
  { id: 1, initial: 'N', grad: '135deg,#9EFF00,#00FFC2', name: 'nocturne', kind: '👋 spank', time: '7 min ago', approve: 'Approved. nocturne can spank you.' },
  { id: 2, initial: 'P', grad: '135deg,#7CE33A,#00FFC2', name: 'pupatlas', kind: '💬 message', time: '1 hr ago', approve: 'Approved. pupatlas can message you.' },
  { id: 3, initial: 'K', grad: '135deg,#00FFC2,#9EFF00', name: 'kestrel', kind: '📷 send photos', time: '3 hr ago', approve: 'Approved. kestrel can send photos.' },
]

export function NotifPanel({ app }: { app: AppState }) {
  return (
    <>
      <div className={`panel-scrim${app.openPanel ? ' show' : ''}`} onClick={app.closeAllPanels} />
      <div className={`panel${app.openPanel === 'notif' ? ' show' : ''}`}>
        <div className="panel-head">
          <h3>Activity</h3>
          <button className="close" onClick={app.closeAllPanels}>✕</button>
        </div>
        <div className="panel-tabs">
          <button
            className={`panel-tab${app.notifTab === 'np-req' ? ' on' : ''}`}
            onClick={() => app.setNotifTab('np-req')}
          >
            Requests {app.requestCount > 0 && <span style={{ color: 'var(--acid)' }}>{app.requestCount}</span>}
          </button>
          <button
            className={`panel-tab${app.notifTab === 'np-act' ? ' on' : ''}`}
            onClick={() => app.setNotifTab('np-act')}
          >
            Updates
          </button>
        </div>
        <div className="panel-body">
          <div className={`panel-pane${app.notifTab === 'np-req' ? ' on' : ''}`}>
            <p className="mini-note" style={{ padding: '12px 0' }}>
              Someone wants to interact with you. Nothing reaches you until you approve it. You can revoke later in Settings.
            </p>
            {REQUESTS.filter((r) => app.requests.includes(r.id)).map((r) => (
              <div key={r.id} className="req">
                <div className="req-av" style={{ background: `linear-gradient(${r.grad})` }}>{r.initial}</div>
                <div className="req-body">
                  <div className="req-text"><b>{r.name}</b> wants to <span className="kind">{r.kind}</span> you</div>
                  <div className="req-time">{r.time}</div>
                  <div className="req-actions">
                    <button className="btn btn-primary" onClick={() => app.resolveReq(r.id, r.approve)}>Approve</button>
                    <button className="btn btn-ghost" onClick={() => app.resolveReq(r.id, 'Declined')}>Decline</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={`panel-pane${app.notifTab === 'np-act' ? ' on' : ''}`}>
            <div className="req"><div className="req-av" style={{ background: 'linear-gradient(135deg,#00FFC2,#5FD000)' }}>C</div><div className="req-body"><div className="req-text"><b>Cruise LA</b> event Friday Cruise Night is in 3 days</div><div className="req-time">today</div></div></div>
            <div className="req"><div className="req-av" style={{ background: 'linear-gradient(135deg,#9EFF00,#00FFC2)' }}>N</div><div className="req-body"><div className="req-text"><b>nocturne</b> left a comment on your wall</div><div className="req-time">2 hr ago</div></div></div>
            <div className="req"><div className="req-av" style={{ background: 'linear-gradient(135deg,#9EFF00,#7CE33A)' }}>R</div><div className="req-body"><div className="req-text"><b>Rope &amp; Ritual</b> opened a Truth or Dare lobby</div><div className="req-time">3 hr ago</div></div></div>
          </div>
        </div>
      </div>
    </>
  )
}
