import type { AppState } from '../hooks/useAppState'
import { ME } from '../constants/user'
import type { MemberInfo } from '../types'
import { ReactionRow } from './ReactionRow'

const ONLINE: MemberInfo[] = [
  { name: 'nocturne', initial: 'N', dyn: 'Switch', loc: 'DTLA', grad: '135deg,#9EFF00,#00FFC2' },
  { name: 'pupatlas', initial: 'P', dyn: 'Pup', loc: 'Highland Park', grad: '135deg,#7CE33A,#00FFC2' },
]

export function FeedScreen({ app }: { app: AppState }) {
  return (
    <section className={`screen${app.screen === 'feed' ? ' active' : ''}`} id="feed">
      <div className="hero">
        <p className="eyebrow" style={{ marginBottom: 10 }}>
          Your scene, tonight
        </p>
        <h1>
          What&apos;s happening in <em>your groups</em>
        </h1>
        <p>Everything from the people and groups you&apos;re connected to. Spank back, RSVP, or go say hi.</p>
      </div>

      <div className="feed-grid">
        <div className="card" style={{ overflow: 'hidden' }}>
          <div className="feed-item">
            <div className="fi-av" style={{ background: 'linear-gradient(135deg,#9EFF00,#00FFC2)' }}>N</div>
            <div className="fi-body">
              <div className="top"><b>nocturne</b> <span className="grn">spanked</span> you 👋</div>
              <div className="fi-time">7 min ago</div>
              <div className="fi-action">
                <button className="btn btn-primary fi-mini" onClick={() => app.spank('nocturne')}>Spank back</button>
              </div>
              <ReactionRow postId="post1" app={app} />
            </div>
          </div>

          <div className="feed-item">
            <div className="fi-av" style={{ background: 'linear-gradient(135deg,#00FFC2,#9EFF00)' }}>C</div>
            <div className="fi-body">
              <div className="top"><b>Cruise LA</b> posted an event: <b>Friday Cruise Night</b> at Bar Franca</div>
              <div className="fi-time">32 min ago · Fri, Jul 11 · 9:00 PM</div>
              <div className="fi-action">
                <button className="btn btn-aqua fi-mini" onClick={app.rsvpToast}>RSVP</button>
              </div>
              <ReactionRow postId="post2" app={app} />
            </div>
          </div>

          <div className="feed-item">
            <div className="fi-av" style={{ background: 'linear-gradient(135deg,#7CE33A,#00FFC2)' }}>P</div>
            <div className="fi-body">
              <div className="top"><b>pupatlas</b> joined <span className="grn">Pup Park LA</span> and added you as a friend</div>
              <div className="fi-time">1 hr ago</div>
              <div className="fi-action">
                <button className="btn btn-ghost fi-mini" onClick={() => app.toast('Friend added: pupatlas')}>Accept</button>
              </div>
              <ReactionRow postId="post3" app={app} />
            </div>
          </div>

          <div className="feed-item">
            <div className="fi-av" style={{ background: `linear-gradient(${ME.grad})` }}>{ME.initial}</div>
            <div className="fi-body">
              <div className="top"><b>{ME.handle}</b> listed <span className="grn">Steel collar, mirror finish</span> in Market · pickup in Silver Lake</div>
              <div className="fi-time">2 hr ago · $150</div>
              <div className="fi-action">
                <button className="btn btn-ghost fi-mini" onClick={() => app.go('market')}>View item</button>
              </div>
              <ReactionRow postId="post4" app={app} />
            </div>
          </div>

          <div className="feed-item">
            <div className="fi-av" style={{ background: 'linear-gradient(135deg,#9EFF00,#7CE33A)' }}>R</div>
            <div className="fi-body">
              <div className="top"><b>Rope &amp; Ritual</b> wants to play: <span className="grn">Truth or Dare</span> lobby is open</div>
              <div className="fi-time">3 hr ago · 4 waiting</div>
              <div className="fi-action">
                <button className="btn btn-aqua fi-mini" onClick={() => app.toast('Joining lobby...')}>Join game</button>
              </div>
              <ReactionRow postId="post5" app={app} />
            </div>
          </div>
        </div>

        <div className="feed-side">
          <div className="card side-card">
            <h3><span className="online" /> Online now</h3>
            {ONLINE.map((m) => (
              <div key={m.name} className="who" style={{ cursor: 'pointer' }} onClick={() => app.openMember(m)}>
                <div className="who-av" style={{ background: `linear-gradient(${m.grad})` }}>{m.initial}</div>
                <div>
                  <div className="who-name">{m.name}</div>
                  <div className="who-sub">{m.dyn} · {m.loc}</div>
                </div>
                <button
                  className="btn btn-ghost who-btn"
                  onClick={(e) => { e.stopPropagation(); app.openMember(m) }}
                >
                  View
                </button>
              </div>
            ))}
          </div>

          <div className="card side-card">
            <h3>Suggested groups</h3>
            <div className="who">
              <div className="who-av" style={{ background: 'linear-gradient(135deg,#9EFF00,#5FD000)' }}>L</div>
              <div><div className="who-name">Latex League</div><div className="who-sub">218 members</div></div>
              <button className="btn btn-aqua who-btn" onClick={() => app.go('groups')}>Peek</button>
            </div>
            <div className="who">
              <div className="who-av" style={{ background: 'linear-gradient(135deg,#00FFC2,#7CE33A)' }}>K</div>
              <div><div className="who-name">Knots &amp; Coffee</div><div className="who-sub">94 members</div></div>
              <button className="btn btn-aqua who-btn" onClick={() => app.go('groups')}>Peek</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
