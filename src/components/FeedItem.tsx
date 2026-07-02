import type { ReactNode } from 'react'
import { PRIMARY_GROUP } from '../constants/group'

export function FeedMeta({
  group = PRIMARY_GROUP,
  visibility,
  label,
  time,
}: {
  group?: string
  visibility?: 'public' | 'private'
  label?: string
  time: string
}) {
  const tag = label ?? visibility
  return (
    <div className="fi-meta">
      <span className="fi-group">{group}</span>
      {tag && (
        <>
          <span className="fi-meta-dot">·</span>
          <span className={`fi-vis${label ? ' label' : ''}${visibility === 'private' ? ' private' : ''}`}>{tag}</span>
        </>
      )}
      <span className="fi-meta-dot">·</span>
      <span className="fi-time-inline">{time}</span>
    </div>
  )
}

export function FeedItem({
  avatar,
  children,
  meta,
  action,
}: {
  avatar: ReactNode
  children: ReactNode
  meta: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="feed-item">
      {avatar}
      <div className="fi-body">
        <div className="top">{children}</div>
        {meta}
        {action && <div className="fi-action">{action}</div>}
      </div>
    </div>
  )
}

export function FeedExploreCta({ onGroups, onNearby }: { onGroups: () => void; onNearby: () => void }) {
  return (
    <div className="feed-explore card">
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
          Profiles nearby
        </button>
      </div>
    </div>
  )
}
