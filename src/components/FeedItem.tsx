import type { ReactNode } from 'react'
import type { SpankVisibility } from '../types'
import { FEED_LABEL } from '../constants/group'

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
          Profiles nearby
        </button>
      </div>
    </div>
  )
}
