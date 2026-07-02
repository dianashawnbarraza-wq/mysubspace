import type { AppState } from '../hooks/useAppState'
import { ME } from '../constants/user'
import { PRIMARY_GROUP } from '../constants/group'
import type { MemberInfo } from '../types'
import { ReactionRow } from './ReactionRow'
import { FeedExploreCta, FeedItem, FeedMeta } from './FeedItem'

const ONLINE: MemberInfo[] = [
  { name: 'nocturne', initial: 'N', dyn: 'Switch', loc: 'DTLA', grad: '135deg,#9EFF00,#00FFC2' },
  { name: 'pupatlas', initial: 'P', dyn: 'Pup', loc: 'Highland Park', grad: '135deg,#7CE33A,#00FFC2' },
]

function Av({ initial, grad }: { initial: string; grad: string }) {
  return (
    <div className="fi-av" style={{ background: `linear-gradient(${grad})` }}>
      {initial}
    </div>
  )
}

export function FeedScreen({ app }: { app: AppState }) {
  return (
    <section className={`screen${app.screen === 'feed' ? ' active' : ''}`} id="feed">
      <div className="hero">
        <p className="eyebrow hero-welcome">
          Welcome, <em>{ME.handle}</em>
        </p>
        <h1>
          What&apos;s happening <em>tonight</em>
        </h1>
      </div>

      <div className="feed-grid">
        <div className="card feed-list">
          {app.flirtRequest !== 'denied' && (
            <FeedItem
              avatar={<Av initial="N" grad="135deg,#9EFF00,#00FFC2" />}
              meta={
                app.flirtRequest === 'pending' ? (
                  <FeedMeta group={null} label="flirt request" visibility="private" time="7 min ago" />
                ) : (
                  <FeedMeta group={null} visibility="private" time="just now" />
                )
              }
              action={
                app.flirtRequest === 'pending' ? (
                  <div className="fi-action-row">
                    <button type="button" className="btn btn-primary fi-mini" onClick={app.acceptFlirtRequest}>
                      Accept request
                    </button>
                    <button type="button" className="btn btn-ghost fi-mini" onClick={app.denyFlirtRequest}>
                      Deny request
                    </button>
                  </div>
                ) : undefined
              }
            >
              {app.flirtRequest === 'pending' ? (
                <>
                  <b>Nocturne</b> would like to spank you 👋
                </>
              ) : (
                <>
                  <b>Nocturne</b> <span className="grn">spanked</span> you 👋
                </>
              )}
            </FeedItem>
          )}

          <FeedItem
            avatar={<Av initial="C" grad="135deg,#00FFC2,#9EFF00" />}
            meta={<FeedMeta visibility="public" time="32 min ago · Fri, Jul 11 · 9:00 PM" />}
            action={
              <>
                <button type="button" className="btn btn-aqua fi-mini" onClick={app.rsvpToast}>RSVP</button>
                <ReactionRow postId="post2" app={app} extra={['🥂']} />
              </>
            }
          >
            <b>{PRIMARY_GROUP}</b> posted an event: <b>Friday Cruise Night</b> at Bar Franca
          </FeedItem>

          <FeedItem
            avatar={<Av initial="N" grad="135deg,#9EFF00,#00FFC2" />}
            meta={<FeedMeta visibility="public" time="1 hr ago · 14 replies" />}
            action={<ReactionRow postId="post3" app={app} extra={['🐾']} />}
          >
            <b>nocturne</b>: who&apos;s coming Friday? first cruise night of the summer 🖤
          </FeedItem>

          <FeedExploreCta
            onGroups={() => app.go('groups')}
            onNearby={() => app.toast('Showing profiles near you in LA…')}
          />

          <FeedItem
            avatar={<Av initial={ME.initial} grad={ME.grad} />}
            meta={<FeedMeta visibility="public" time="2 hr ago · $150" />}
            action={
              <>
                <button type="button" className="btn btn-ghost fi-mini" onClick={() => app.go('market')}>View item</button>
                <ReactionRow postId="post4" app={app} extra={['⛓️']} />
              </>
            }
          >
            <b>{ME.handle}</b> listed <span className="grn">Steel collar, mirror finish</span> in Market · Silver Lake
          </FeedItem>

          <FeedItem
            avatar={<Av initial="V" grad="135deg,#7CE33A,#00FFC2" />}
            meta={<FeedMeta visibility="public" time="3 hr ago" />}
          >
            <b>velvetbound</b> <span className="grn">spanked</span> <b>brattybean</b> 👋
          </FeedItem>

          {!app.feedExpanded ? (
            <button type="button" className="feed-show-more" onClick={() => app.setFeedExpanded(true)}>
              Show more
            </button>
          ) : (
            <>
              <FeedItem
                avatar={<Av initial="R" grad="135deg,#9EFF00,#7CE33A" />}
                meta={<FeedMeta visibility="public" time="4 hr ago · 4 waiting" />}
                action={
                  <>
                    <button type="button" className="btn btn-aqua fi-mini" onClick={() => app.toast('Joining lobby...')}>Join game</button>
                    <ReactionRow postId="post5" app={app} extra={['🎲', '😏']} />
                  </>
                }
              >
                <b>Rope &amp; Ritual</b> wants to play: <span className="grn">Truth or Dare</span> lobby is open
              </FeedItem>

              <FeedItem
                avatar={<Av initial="P" grad="135deg,#7CE33A,#00FFC2" />}
                meta={<FeedMeta visibility="public" time="5 hr ago" />}
                action={
                  <button type="button" className="btn btn-ghost fi-mini" onClick={() => app.toast('Friend added: pupatlas')}>
                    Accept
                  </button>
                }
              >
                <b>pupatlas</b> joined <span className="grn">Pup Park LA</span> and added you as a friend
              </FeedItem>

              <FeedItem
                avatar={<Av initial="M" grad="135deg,#00FFC2,#7CE33A" />}
                meta={<FeedMeta visibility="public" time="6 hr ago" />}
                action={<ReactionRow postId="post6" app={app} extra={['🔥']} />}
              >
                <b>mercuryknot</b> shared photos from last week&apos;s tie session
              </FeedItem>
            </>
          )}
        </div>

        <div className="feed-side">
          <div className="card side-card">
            <h3><span className="online" /> Online in {PRIMARY_GROUP}</h3>
            {ONLINE.map((m) => (
              <div key={m.name} className="who" style={{ cursor: 'pointer' }} onClick={() => app.openMember(m)}>
                <div className="who-av" style={{ background: `linear-gradient(${m.grad})` }}>{m.initial}</div>
                <div>
                  <div className="who-name">{m.name}</div>
                  <div className="who-sub">{m.dyn} · {m.loc}</div>
                </div>
                <button
                  type="button"
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
              <button type="button" className="btn btn-aqua who-btn" onClick={() => app.go('groups')}>Peek</button>
            </div>
            <div className="who">
              <div className="who-av" style={{ background: 'linear-gradient(135deg,#00FFC2,#7CE33A)' }}>K</div>
              <div><div className="who-name">Knots &amp; Coffee</div><div className="who-sub">94 members</div></div>
              <button type="button" className="btn btn-aqua who-btn" onClick={() => app.go('groups')}>Peek</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
