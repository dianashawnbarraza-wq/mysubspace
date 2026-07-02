import type { AppState } from '../hooks/useAppState'

export function InviteStrip({ app }: { app: AppState }) {
  if (!app.inviteStripVisible) return null

  return (
    <div className="invite-strip">
      <span>
        🔑 <b>ironlace</b> invited you into <b>Cruise LA</b>. You&apos;re in. Explore other groups and add who you vibe with.
      </span>
      <span className="x" onClick={() => app.setInviteStripVisible(false)}>
        dismiss ✕
      </span>
    </div>
  )
}
