import type { ReactNode } from 'react'
import type { SpankVisibility } from '../types'
import { FEED_LABEL } from '../constants/group'
import type { AppState } from '../hooks/useAppState'

export function flirtRequestMeta(visibility: SpankVisibility, time: string) {
  return { label: 'Flirt Request' as const, visibility, time }
}

export function spankMeta(visibility: SpankVisibility, time: string) {
  return { group: FEED_LABEL, visibility, time }
}

export function SpankActions({
  onSpank,
  label = 'Spank',
}: {
  onSpank: (visibility: SpankVisibility) => void
  label?: string
}) {
  return (
    <div className="fi-action-row">
      <button type="button" className="btn btn-primary fi-mini" onClick={() => onSpank('public')}>
        {label} · Public
      </button>
      <button type="button" className="btn btn-ghost fi-mini" onClick={() => onSpank('private')}>
        {label} · Private
      </button>
    </div>
  )
}

export function FeedMeta({
  group,
  visibility,
  label,
  time,
}: {
  group?: string
  visibility?: 'public' | 'private'
  label?: string
  time: string
}) {
  const visLabel = visibility
    ? visibility.charAt(0).toUpperCase() + visibility.slice(1)
    : undefined

  return (
    <div className="fi-meta">
      {label && (
        <>
          <span className="fi-vis label">{label}</span>
          <span className="fi-meta-dot">·</span>
        </>
      )}
      {group && (
        <>
          <span className="fi-group">{group}</span>
          <span className="fi-meta-dot">·</span>
        </>
      )}
      {visLabel && (
        <>
          <span className={`fi-vis${visibility === 'private' ? ' private' : ''}`}>{visLabel}</span>
          <span className="fi-meta-dot">·</span>
        </>
      )}
      <span className="fi-time-inline">{time}</span>
    </div>
  )
}

export function FeedPostMenu({
  postId,
  app,
}: {
  postId: string
  app: AppState
}) {
  const open = app.openFeedMenuId === postId

  return (
    <div className="fi-menu-wrap">
      <button
        type="button"
        className="fi-menu-btn"
        aria-label="Post options"
        onClick={(e) => {
          e.stopPropagation()
          app.setOpenFeedMenuId(open ? null : postId)
        }}
      >
        ⋯
      </button>
      {open && (
        <div className="fi-menu" onClick={(e) => e.stopPropagation()}>
          <button type="button" onClick={() => app.feedPostAction(postId, 'bookmark')}>Bookmark</button>
          <button type="button" onClick={() => app.feedPostAction(postId, 'hide')}>Hide</button>
          <button type="button" className="danger" onClick={() => app.feedPostAction(postId, 'report')}>Report</button>
        </div>
      )}
    </div>
  )
}

export function FeedItem({
  postId,
  app,
  avatar,
  children,
  meta,
  action,
}: {
  postId?: string
  app?: AppState
  avatar: ReactNode
  children: ReactNode
  meta: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="feed-item">
      {avatar}
      <div className="fi-body">
        <div className="fi-top-row">
          <div className="top">{children}</div>
          {postId && app && <FeedPostMenu postId={postId} app={app} />}
        </div>
        {meta}
        {action && <div className="fi-action">{action}</div>}
      </div>
    </div>
  )
}

export function FeedExploreCta({
  onGroups,
  onNearby,
}: {
  onGroups: () => void
  onNearby: () => void
}) {
  return (
    <div className="feed-explore">
      <p className="eyebrow" style={{ marginBottom: 8 }}>Keep exploring</p>
      <h3 className="feed-explore-title">There&apos;s more beyond Cruise LA</h3>
      <p className="feed-explore-sub">
        Browse other groups in the scene or find profiles near you in LA.
      </p>
      <div className="feed-explore-actions">
        <button type="button" className="btn btn-primary fi-mini" onClick={onGroups}>
          Explore groups
        </button>
        <button type="button" className="btn btn-aqua fi-mini" onClick={onNearby}>
          Find locals
        </button>
      </div>
    </div>
  )
}
