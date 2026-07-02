import type { AppState } from '../hooks/useAppState'
import { ME } from '../constants/user'
import type { GroupPost } from '../types'
import { imageSrc } from '../constants/groupPosts'

function GroupPostMenu({ postId, app }: { postId: string; app: AppState }) {
  const open = app.openGroupMenuId === postId

  return (
    <div className="fi-menu-wrap">
      <button
        type="button"
        className="fi-menu-btn"
        aria-label="Post options"
        onClick={(e) => {
          e.stopPropagation()
          app.setOpenGroupMenuId(open ? null : postId)
        }}
      >
        ⋯
      </button>
      {open && (
        <div className="fi-menu" onClick={(e) => e.stopPropagation()}>
          <button type="button" onClick={() => app.groupPostAction(postId, 'bookmark')}>Bookmark</button>
          <button type="button" onClick={() => app.groupPostAction(postId, 'hide')}>Hide</button>
          <button type="button" className="danger" onClick={() => app.groupPostAction(postId, 'report')}>Report</button>
        </div>
      )}
    </div>
  )
}

export function GroupFeedPost({ post, app }: { post: GroupPost; app: AppState }) {
  const revealed = app.revealedGroupImages.includes(post.id)
  const src = post.image ? imageSrc(post.image) : undefined

  return (
    <div className={`feed-item group-post${post.pinned ? ' pinned' : ''}`}>
      <div className="fi-av" style={{ background: `linear-gradient(${post.grad})` }}>{post.initial}</div>
      <div className="fi-body">
        <div className="fi-top-row">
          <div className="top">
            <b>{post.author}</b>
            {post.pinned ? '' : ': '}
            {post.pinned ? ` ${post.text}` : post.text}
          </div>
          <GroupPostMenu postId={post.id} app={app} />
        </div>

        {post.image && src && (
          <div
            className={`gp-media${post.image.kind === 'trigger' && !revealed ? ' gp-media-trigger' : ''}`}
            onClick={
              post.image.kind === 'trigger' && !revealed
                ? () => app.revealGroupImage(post.id)
                : undefined
            }
          >
            <img src={src} alt={post.image.alt} className={post.image.kind === 'trigger' && !revealed ? 'gp-blur' : ''} />
            {post.image.kind === 'trigger' && !revealed && (
              <div className="gp-trigger-overlay">
                <span className="gp-trigger-label">Trigger warning</span>
                <span className="gp-trigger-sub">Tap to view</span>
              </div>
            )}
          </div>
        )}

        <div className="fi-time">{post.time}{post.replyCount > 0 ? ` · ${post.replyCount} replies` : ''}</div>

        {post.replies.length > 0 && (
          <div className="gp-replies">
            {post.replies.slice(0, 2).map((reply) => (
              <div key={`${reply.author}-${reply.text}`} className="gp-reply">
                <b>{reply.author}</b> {reply.text}
              </div>
            ))}
            {post.replyCount > post.replies.length && (
              <button type="button" className="gp-view-replies" onClick={() => app.toast('Opening replies…')}>
                View all {post.replyCount} replies
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function GroupCompose({ app }: { app: AppState }) {
  return (
    <div className="gp-compose">
      <div className="gp-compose-row">
        <div className="fi-av" style={{ background: `linear-gradient(${ME.grad})` }}>{ME.initial}</div>
        <textarea
          className="gp-compose-input"
          placeholder="Post to Cruise LA..."
          rows={2}
          value={app.groupComposeText}
          onChange={(e) => app.setGroupComposeText(e.target.value)}
        />
      </div>
      <div className="gp-compose-actions">
        <button
          type="button"
          className={`btn btn-ghost gp-compose-photo${app.groupComposePhoto ? ' on' : ''}`}
          onClick={() => app.setGroupComposePhoto(!app.groupComposePhoto)}
        >
          📷 {app.groupComposePhoto ? 'Photo attached' : 'Add photo'}
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={!app.groupComposeText.trim()}
          onClick={app.postToGroup}
        >
          Post
        </button>
      </div>
    </div>
  )
}
