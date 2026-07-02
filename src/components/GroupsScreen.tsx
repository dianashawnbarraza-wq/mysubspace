import type { AppState } from '../hooks/useAppState'
import type { MemberInfo } from '../types'

const GROUPS = [
  { name: 'Cruise LA', desc: 'Night outs, bar takeovers, and cruise meetups across LA. Consent first, always.', members: 412, online: 38, banner: '120deg,#1a3810,#0d2320', avatars: ['I', 'N', 'P', 'V'], colors: ['#9EFF00', '#00FFC2', '#7CE33A', '#5FD000'], tag: 'member' as const },
  { name: 'Rope & Ritual', desc: 'Shibari practice circle. Weekly tie sessions, skill shares, and safety workshops.', members: 156, online: 12, banner: '120deg,#0d2320,#1a3810', avatars: ['R', 'M', 'A'], colors: ['#00FFC2', '#9EFF00', '#7CE33A'], tag: 'member' as const },
  { name: 'Pup Park LA', desc: 'Pups, handlers, and everyone curious. Park meets, moshes, and gear swaps.', members: 289, online: 21, banner: '120deg,#16300f,#0a1a14', avatars: ['P', 'H', 'B'], colors: ['#7CE33A', '#9EFF00', '#00FFC2'], tag: 'member' as const },
  { name: 'Latex League', desc: 'Shine, gear care, and photo nights for the latex-obsessed. Invite only.', members: 218, online: 9, banner: '120deg,#0d2320,#16300f', avatars: ['L', 'S', 'T'], colors: ['#00FFC2', '#5FD000', '#9EFF00'], tag: 'invited' as const },
]

const MEMBERS: MemberInfo[] = [
  { name: 'nocturne', initial: 'N', dyn: 'Switch', loc: 'DTLA', grad: '135deg,#9EFF00,#00FFC2' },
  { name: 'pupatlas', initial: 'P', dyn: 'Pup', loc: 'Highland Park', grad: '135deg,#7CE33A,#00FFC2' },
]

export function GroupsScreen({ app }: { app: AppState }) {
  return (
    <section className={`screen${app.screen === 'groups' ? ' active' : ''}`} id="groups">
      {!app.showGroupDetail ? (
        <>
          <div className="sec-head">
            <h2>Your groups</h2>
            <a href="#" onClick={(e) => { e.preventDefault(); app.toast('Enter an invite code to join a private group') }}>+ Join with a code</a>
          </div>
          <div className="grp-grid">
            {GROUPS.map((g) => (
              <div key={g.name} className="grp-card card" onClick={app.openGroup}>
                <div className="grp-banner" style={{ background: `linear-gradient(${g.banner})` }}>
                  <span className={`pill tag${g.tag === 'invited' ? ' aqua' : ''}`}>{g.tag}</span>
                </div>
                <div className="grp-body">
                  <h3>{g.name}</h3>
                  <div className="desc">{g.desc}</div>
                  <div className="grp-meta">
                    <span>👥 {g.members} members</span>
                    <span><span className="online" /> {g.online} online</span>
                  </div>
                  <div className="grp-foot">
                    <div className="grp-avatars">
                      {g.avatars.map((a, i) => (
                        <div key={a} style={{ background: g.colors[i] }}>{a}</div>
                      ))}
                    </div>
                    {g.tag === 'invited' ? (
                      <button className="btn btn-aqua" style={{ fontSize: 14, padding: '8px 14px' }} onClick={(e) => { e.stopPropagation(); app.toast('Accepted invite to Latex League') }}>Accept</button>
                    ) : (
                      <button className="btn btn-primary" style={{ fontSize: 14, padding: '8px 14px' }} onClick={(e) => { e.stopPropagation(); app.inviteTo(g.name) }}>Invite</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div id="groupDetail">
          <a href="#" onClick={(e) => { e.preventDefault(); app.closeGroup() }} style={{ fontFamily: 'var(--f-mono)', fontSize: 14, color: 'var(--aqua)', display: 'inline-block', marginBottom: 14 }}>← all groups</a>
          <div className="gd-banner" style={{ background: 'linear-gradient(120deg,#1a3810,#0a1a14 60%,#0d2320)' }}>
            <div className="gd-info">
              <div>
                <span className="pill">member · consent first</span>
                <h2 style={{ marginTop: 8 }}>Cruise LA</h2>
                <div className="gd-sub">412 members · 38 online · founded by ironlace</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="nav-icon" aria-label="Group settings" onClick={() => app.setShowGroupSettings(true)} style={{ background: 'rgba(10,13,11,.5)' }}>⚙️</button>
                <button className="btn btn-primary" onClick={() => app.inviteTo('Cruise LA')}>Invite someone</button>
              </div>
            </div>
          </div>

          <div className="gd-tabs">
            {(['g-feed', 'g-cal', 'g-mem'] as const).map((tab) => (
              <button key={tab} className={`gd-tab${app.groupTab === tab ? ' on' : ''}`} onClick={() => app.setGroupTab(tab)}>
                {tab === 'g-feed' ? 'Feed' : tab === 'g-cal' ? 'Calendar' : 'Members'}
              </button>
            ))}
          </div>

          <div className={`gd-pane${app.groupTab === 'g-feed' ? ' on' : ''}`} id="g-feed">
            <div className="card" style={{ overflow: 'hidden' }}>
              <div className="feed-item">
                <div className="fi-av" style={{ background: 'linear-gradient(135deg,#00FFC2,#5FD000)' }}>I</div>
                <div className="fi-body"><div className="top"><b>ironlace</b> pinned: house rules and consent norms. Read before your first meet.</div><div className="fi-time">pinned</div></div>
              </div>
              <div className="feed-item">
                <div className="fi-av" style={{ background: 'linear-gradient(135deg,#9EFF00,#00FFC2)' }}>N</div>
                <div className="fi-body"><div className="top"><b>nocturne</b>: who&apos;s coming Friday? first cruise night of the summer 🖤</div><div className="fi-time">1 hr ago · 14 replies</div></div>
              </div>
              <div className="feed-item">
                <div className="fi-av" style={{ background: 'linear-gradient(135deg,#7CE33A,#00FFC2)' }}>V</div>
                <div className="fi-body"><div className="top"><b>velvetbound</b> shared a gear pic from last week&apos;s meet</div><div className="fi-time">4 hr ago · 22 likes</div></div>
              </div>
            </div>
          </div>

          <div className={`gd-pane${app.groupTab === 'g-cal' ? ' on' : ''}`} id="g-cal">
            {[
              { m: 'Jul', d: '11', name: 'Friday Cruise Night', time: '9:00 PM · Bar Franca, DTLA', about: 'Kickoff for the summer. First round on the group.', primary: true },
              { m: 'Jul', d: '19', name: 'Consent & Negotiation Workshop', time: '2:00 PM · private venue, address on RSVP', about: 'Beginner friendly. Led by two group mods.', primary: false },
              { m: 'Aug', d: '02', name: 'Rooftop Social', time: '7:00 PM · location TBA', about: 'Low key mixer. Bring a plus one with an invite.', primary: false },
            ].map((ev) => (
              <div key={ev.name} className="event">
                <div className="ev-date"><div className="m">{ev.m}</div><div className="d">{ev.d}</div></div>
                <div className="ev-info"><div className="en">{ev.name}</div><div className="em">{ev.time}</div><div className="ea">{ev.about}</div></div>
                <div className="rsvp"><button className={`btn ${ev.primary ? 'btn-primary' : 'btn-aqua'}`} onClick={app.rsvpToast}>RSVP</button></div>
              </div>
            ))}
          </div>

          <div className={`gd-pane${app.groupTab === 'g-mem' ? ' on' : ''}`} id="g-mem">
            <div className="mem-grid">
              <div className="card mem"><div className="mem-av" style={{ background: 'linear-gradient(135deg,#00FFC2,#5FD000)' }}>I<span className="on" /></div><div className="mem-name">ironlace</div><div className="mem-dyn">Dom · founder</div></div>
              {MEMBERS.map((m) => (
                <div key={m.name} className="card mem" style={{ cursor: 'pointer' }} onClick={() => app.openMember(m)}>
                  <div className="mem-av" style={{ background: `linear-gradient(${m.grad})` }}>{m.initial}<span className="on" /></div>
                  <div className="mem-name">{m.name}</div>
                  <div className="mem-dyn">{m.dyn}</div>
                </div>
              ))}
              {[
                { i: 'V', grad: '135deg,#5FD000,#9EFF00', name: 'velvetbound', dyn: 'sub' },
                { i: 'M', grad: '135deg,#00FFC2,#7CE33A', name: 'mercuryknot', dyn: 'Rigger' },
                { i: 'B', grad: '135deg,#9EFF00,#5FD000', name: 'brattybean', dyn: 'Brat' },
              ].map((m) => (
                <div key={m.name} className="card mem">
                  <div className="mem-av" style={{ background: `linear-gradient(${m.grad})` }}>{m.i}</div>
                  <div className="mem-name">{m.name}</div>
                  <div className="mem-dyn">{m.dyn}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
