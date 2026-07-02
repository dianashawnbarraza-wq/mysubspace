import type { AppState } from '../hooks/useAppState'
import { ME } from '../constants/user'

const TOP8 = [
  { i: 'N', name: 'nocturne', grad: '135deg,#9EFF00,#00FFC2', on: true },
  { i: 'N', name: 'nocturne', grad: '135deg,#9EFF00,#00FFC2', on: true },
  { i: 'P', name: 'pupatlas', grad: '135deg,#7CE33A,#00FFC2', on: true },
  { i: 'M', name: 'mercuryknot', grad: '135deg,#5FD000,#9EFF00', on: false },
  { i: 'B', name: 'brattybean', grad: '135deg,#00FFC2,#7CE33A', on: false },
  { i: 'S', name: 'sablewire', grad: '135deg,#9EFF00,#5FD000', on: false },
  { i: 'K', name: 'kestrel', grad: '135deg,#00FFC2,#9EFF00', on: false },
  { i: 'A', name: 'ashfall', grad: '135deg,#7CE33A,#5FD000', on: false },
]

const GAMES = [
  { icon: '🎲', name: 'Truth or Dare', desc: 'Turn based, send a dare across the distance', toast: 'Invite sent: Truth or Dare' },
  { icon: '🔀', name: 'Would You Rather', desc: 'Quick spicy or sweet, you set the heat', toast: 'Invite sent: Would You Rather' },
  { icon: '📋', name: 'Task of the Day', desc: 'Long distance dynamic, set and check off tasks', toast: 'Invite sent: Task of the Day' },
]

export function ProfileScreen({ app }: { app: AppState }) {
  return (
    <section className={`screen${app.screen === 'profile' ? ' active' : ''}`} id="profile">
      <div className="prof-banner" />
      <div className="prof-wrap">
        <div className="prof-left">
          <div className="card">
            <div className="prof-av-row">
              <div className="prof-av">{ME.initial}</div>
              <div className="prof-name">{ME.handle}</div>
              <div className="prof-handle">@{ME.handle}</div>
              <div className="prof-status"><span className="online" /> online now</div>
            </div>

            <div className="prof-mood">
              <span className="lbl">Mood</span>
              <em>feeling brave, low key looking for trouble ⚡</em>
            </div>

            <div className="prof-stats">
              <div className="n">128<span>friends</span></div>
              <div className="n">6<span>groups</span></div>
              <div className="n">2.4k<span>spanks</span></div>
            </div>

            <div className="prof-actions">
              <button className="btn btn-primary spank-btn" onClick={() => app.spank(ME.handle)}>👋 Spank</button>
              <div className="spank-count">spanked {app.myProfileSpanks.toLocaleString()} times</div>
              <button className="btn btn-ghost" onClick={() => app.toast('Friend request sent')}>+ Add friend</button>
              <button className="btn btn-aqua" onClick={() => app.toast('Opening chat...')}>💬 Message</button>
            </div>

            <div className="details">
              <div className="row"><span className="k">Dynamic</span><span className="v">Dom · founder energy</span></div>
              <div className="row"><span className="k">Pronouns</span><span className="v">she / they</span></div>
              <div className="row"><span className="k">Into</span><span className="v">rope, impact, latex</span></div>
              <div className="row"><span className="k">Looking for</span><span className="v">play partners, friends</span></div>
              <div className="row"><span className="k">Location</span><span className="v">Northeast LA</span></div>
              <div className="row"><span className="k">Boundaries</span><span className="v lock">🔒 ask first</span></div>
              <div className="row"><span className="k">Member since</span><span className="v">2024</span></div>
            </div>
          </div>
        </div>

        <div className="prof-right">
          <div className="card blurb">
            <h3>About me</h3>
            <p>LA based, here for the community more than the apps. I like slow negotiation, good rope, and people who read the room.</p>
            <p>Ask before you assume. I bite, but only with a green light. 🖤💚</p>
          </div>

          <div className="card top8">
            <h3>Top 8</h3>
            <div className="top8-grid">
              {TOP8.map((f) => (
                <div key={f.name} className="t8">
                  <div className="t8-av" style={{ background: `linear-gradient(${f.grad})` }}>
                    {f.i}{f.on && <span className="on" />}
                  </div>
                  <div className="t8-name">{f.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card games">
            <h3>Play a game</h3>
            {GAMES.map((g) => (
              <div key={g.name} className="game-row" onClick={() => app.toast(g.toast)}>
                <div className="game-ic">{g.icon}</div>
                <div className="game-info"><div className="gn">{g.name}</div><div className="gd">{g.desc}</div></div>
                <button className="btn btn-aqua" style={{ fontSize: 14, padding: '7px 13px' }}>Invite</button>
              </div>
            ))}
          </div>

          <div className="card wall">
            <h3>Comment wall</h3>
            <div className="wall-input">
              <input
                type="text"
                placeholder={`Leave ${ME.handle} a comment...`}
                value={app.wallInput}
                onChange={(e) => app.setWallInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && app.postComment()}
              />
              <button className="nav-icon reactor-trigger" aria-label="Icons and GIFs" onClick={(e) => app.openReactor(e, 'compose')}>😈</button>
              <button className="btn btn-primary" onClick={() => app.postComment()}>Post</button>
            </div>
            <div id="wallList">
              {app.wallEntries.map((entry) => (
                <div key={entry.id} className="wall-entry">
                  <div
                    className="we-av"
                    style={{
                      background: `linear-gradient(${entry.grad ?? '135deg,#9EFF00,#00FFC2'})`,
                    }}
                  >
                    {entry.initial ?? ME.initial}
                  </div>
                  <div className="we-body">
                    <div className="we-name">
                      {entry.author ?? ME.handle} <span>{entry.time ?? 'just now'}</span>
                    </div>
                    {entry.gifUrl ? (
                      <img className="we-gif" src={entry.gifUrl} alt={entry.gifAlt ?? 'gif reaction'} />
                    ) : (
                      <div className="we-text">{entry.text}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
