import type { AppState } from '../hooks/useAppState'

const QUICK = ['💚', '🔥', '😈'] as const

export function ReactionRow({
  postId,
  app,
  extra = [],
}: {
  postId: string
  app: AppState
  extra?: string[]
}) {
  const postReactions = app.reactions[postId] ?? {}
  const icons = [...new Set([...QUICK, ...extra])]

  return (
    <div className="react-row" id={`react-${postId}`}>
      {icons.map((icon) => {
        const r = postReactions[icon]
        if (r) {
          return (
            <span
              key={icon}
              className={`react-chip${r.mine ? ' mine' : ''}`}
              onClick={() => app.toggleReaction(postId, icon)}
            >
              {icon} <span className="rc-n">{r.count}</span>
            </span>
          )
        }
        return (
          <button
            key={icon}
            className="quick-react"
            onClick={() => app.toggleReaction(postId, icon)}
          >
            {icon}
          </button>
        )
      })}
      {Object.entries(postReactions)
        .filter(([icon]) => !icons.includes(icon))
        .map(([icon, r]) => (
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
