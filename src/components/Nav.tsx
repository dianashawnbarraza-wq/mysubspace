import type { AppState } from '../hooks/useAppState'
import { ME } from '../constants/user'
import type { Screen } from '../types'

const TABS: { id: Screen; label: string; dot?: boolean }[] = [
  { id: 'feed', label: 'Feed' },
  { id: 'groups', label: 'Groups' },
  { id: 'people', label: 'People' },
  { id: 'market', label: 'Market' },
  { id: 'profile', label: 'You', dot: true },
]

export function Nav({ app }: { app: AppState }) {
  return (
    <nav>
      <div className="nav-in">
        <div className="logo">
          my<span>subspace</span>
        </div>
        <div className="tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab${app.screen === tab.id ? ' on' : ''}`}
              onClick={() => app.go(tab.id)}
            >
              {tab.dot && <span className="dot" />}
              <span className="tlabel">{tab.label}</span>
            </button>
          ))}
        </div>
        <div className="nav-right">
          <button
            className="nav-icon"
            aria-label="Notifications and requests"
            onClick={() => app.setOpenPanel('notif')}
          >
            🔔
            {app.requestCount > 0 && <span className="nav-badge">{app.requestCount}</span>}
          </button>
          <button
            className="nav-icon"
            aria-label="Settings"
            onClick={() => app.setOpenPanel('settings')}
          >
            ⚙️
          </button>
          <div className="nav-av" onClick={() => app.go('profile')}>
            {ME.initial}
          </div>
        </div>
      </div>
    </nav>
  )
}
