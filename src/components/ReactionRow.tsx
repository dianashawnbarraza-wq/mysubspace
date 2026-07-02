import type { AppState } from '../hooks/useAppState'

export function ReactionRow({ postId, app }: { postId: string; app: AppState }) {
  const postReactions = app.reactions[postId] ?? {}

  return (
    <div className="react-row" id={`react-${postId}`}>
      {Object.entries(postReactions).map(([icon, r]) => (
        <span
          key={icon}
          className={`react-chip${r.mine ? ' mine' : ''}`}
          onClick={() => app.toggleReaction(postId, icon)}
        >
          {icon} <span className="rc-n">{r.count}</span>
        </span>
      ))}
      <button
        className="quick-react more reactor-trigger"
        onClick={(e) => app.openReactor(e, 'feed', postId)}
      >
        + more
      </button>
    </div>
  )
}
