import { useEffect, useRef, useState } from 'react'
import type { AppState } from '../hooks/useAppState'
import { ME } from '../constants/user'
import { PRIMARY_GROUP } from '../constants/group'
import type { MemberInfo } from '../types'
import { ReactionRow } from './ReactionRow'
import { FeedExploreCta, FeedItem, FeedMeta, SpankActions, flirtRequestMeta, spankMeta } from './FeedItem'

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

function visible(app: AppState, postId: string) {
  return !app.hiddenPostIds.includes(postId)
}

export function FeedScreen({ app }: { app: AppState }) {
  const [feedExpanded, setFeedExpanded] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (feedExpanded) return
    const node = loadMoreRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setFeedExpanded(true)
      },
      { rootMargin: '160px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [feedExpanded])

  const cityLabel = app.locationCity === 'your area' ? 'near you' : app.locationCity

  return (
    <section className={`screen${app.screen === 'feed' ? ' active' : ''}`} id="feed">
      <div className="hero">
        <p className="eyebrow hero-welcome">
          Welcome, <em>{app.handle}</em>
        </p>
        <h1>
          What&apos;s happening in <em>{cityLabel}</em>
        </h1>
      </div>

      <div className="feed-grid">
        <div className="card feed-list">
          {app.flirtRequest !== 'denied' && visible(app, 'post-flirt') && (
            <FeedItem
              postId="post-flirt"
              app={app}
              avatar={<Av initial="N" grad="135deg,#9EFF00,#00FFC2" />}
              meta={
                app.flirtRequest === 'pending' ? (
                  <FeedMeta {...flirtRequestMeta(app.flirtRequestVisibility, '7 min ago')} />
                ) : (
                  <FeedMeta
                    {...spankMeta(app.flirtSpankVisibility ?? app.flirtRequestVisibility, 'just now')}
                  />
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
                ) : (
                  <SpankActions label="Spank back" onSpank={(visibility) => app.spank('nocturne', visibility)} />
                )
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

          {app.feedSpanks.map((entry) =>
            visible(app, entry.id) ? (
              <FeedItem
                key={entry.id}
                postId={entry.id}
                app={app}
                avatar={<Av initial={ME.initial} grad={ME.grad} />}
                meta={<FeedMeta {...spankMeta(entry.visibility, entry.time)} />}
              >
                <b>{entry.spanker}</b> <span className="grn">spanked</span> <b>{entry.target}</b> 👋
              </FeedItem>
            ) : null,
          )}

          {visible(app, 'post2') && (
            <FeedItem
              postId="post2"
              app={app}
              avatar={<Av initial="C" grad="135deg,#00FFC2,#9EFF00" />}
              meta={<FeedMeta group={PRIMARY_GROUP} visibility="public" time="32 min ago · Fri, Jul 11 · 9:00 PM" />}
              action={
                <>
                  <button type="button" className="btn btn-aqua fi-mini" onClick={app.rsvpToast}>RSVP</button>
                  <ReactionRow postId="post2" app={app} extra={['🥂']} />
                </>
              }
            >
              <b>{PRIMARY_GROUP}</b> posted an event: <b>Friday Cruise Night</b> at Bar Franca
            </FeedItem>
          )}

          {visible(app, 'post3') && (
            <FeedItem
              postId="post3"
              app={app}
              avatar={<Av initial="N" grad="135deg,#9EFF00,#00FFC2" />}
              meta={<FeedMeta group={PRIMARY_GROUP} visibility="public" time="1 hr ago · 14 replies" />}
              action={<ReactionRow postId="post3" app={app} extra={['🐾']} />}
            >
              <b>nocturne</b>: who&apos;s coming Friday? first cruise night of the summer 🖤
            </FeedItem>
          )}

          <FeedExploreCta
            onGroups={() => app.go('groups')}
            onNearby={() => app.go('people')}
          />

          {visible(app, 'post4') && (
            <FeedItem
              postId="post4"
              app={app}
              avatar={<Av initial={ME.initial} grad={ME.grad} />}
              meta={<FeedMeta label="Member" group={PRIMARY_GROUP} visibility="public" time="2 hr ago · $150" />}
              action={
                <>
                  <button type="button" className="btn btn-ghost fi-mini" onClick={() => app.go('market')}>View item</button>
                  <ReactionRow postId="post4" app={app} extra={['⛓️']} />
                </>
              }
            >
              <b>{app.handle}</b> listed <span className="grn">Steel collar, mirror finish</span> in Market · Silver Lake
            </FeedItem>
          )}

          {visible(app, 'post5') && (
            <FeedItem
              postId="post5"
              app={app}
              avatar={<Av initial="V" grad="135deg,#7CE33A,#00FFC2" />}
              meta={<FeedMeta {...spankMeta('public', '3 hr ago')} />}
            >
              <b>velvetbound</b> <span className="grn">spanked</span> <b>brattybean</b> 👋
            </FeedItem>
          )}

          <div ref={loadMoreRef} className="feed-load-sentinel" aria-hidden="true" />

          {feedExpanded && (
            <>
              {visible(app, 'post6') && (
                <FeedItem
                  postId="post6"
                  app={app}
                  avatar={<Av initial="R" grad="135deg,#9EFF00,#7CE33A" />}
                  meta={<FeedMeta group="Rope & Ritual" visibility="public" time="4 hr ago · 4 waiting" />}
                  action={
                    <>
                      <button type="button" className="btn btn-aqua fi-mini" onClick={() => app.toast('Joining lobby...')}>Join game</button>
                      <ReactionRow postId="post6" app={app} extra={['🎲', '😏']} />
                    </>
                  }
                >
                  <b>Rope &amp; Ritual</b> wants to play: <span className="grn">Truth or Dare</span> lobby is open
                </FeedItem>
              )}

              {visible(app, 'post7') && (
                <FeedItem
                  postId="post7"
                  app={app}
                  avatar={<Av initial="P" grad="135deg,#7CE33A,#00FFC2" />}
                  meta={<FeedMeta label="Member" group="Pup Park LA" visibility="public" time="5 hr ago" />}
                  action={
                    <button type="button" className="btn btn-ghost fi-mini" onClick={() => app.toast('Friend added: pupatlas')}>
                      Accept
                    </button>
                  }
                >
                  <b>pupatlas</b> joined <span className="grn">Pup Park LA</span> and added you as a friend
                </FeedItem>
              )}

              {visible(app, 'post8') && (
                <FeedItem
                  postId="post8"
                  app={app}
                  avatar={<Av initial="M" grad="135deg,#00FFC2,#7CE33A" />}
                  meta={<FeedMeta group="Rope & Ritual" visibility="public" time="6 hr ago" />}
                  action={<ReactionRow postId="post8" app={app} extra={['🔥']} />}
                >
                  <b>mercuryknot</b> shared photos from last week&apos;s tie session
                </FeedItem>
              )}
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
            <h3>Connect locally</h3>
            <p className="side-note">Find people in {app.locationCity} by interests and what they&apos;re looking for.</p>
            <button type="button" className="btn btn-primary who-btn" style={{ width: '100%' }} onClick={() => app.go('people')}>
              Search people
            </button>
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
