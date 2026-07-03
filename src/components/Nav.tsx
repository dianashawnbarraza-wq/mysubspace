import type { AppState } from '../hooks/useAppState'
import { ME } from '../constants/user'
import type { Screen } from '../types'

const TABS: { id: Screen; label: string; icon: string; dot?: boolean }[] = [
  { id: 'feed', label: 'Feed', icon: '⎔' },
  { id: 'groups', label: 'Groups', icon: '◉' },
  { id: 'people', label: 'People', icon: '◎' },
  { id: 'market', label: 'Market', icon: '◆' },
  { id: 'profile', label: 'You', icon: '◐', dot: true },
]

export function Nav({ app }: { app: AppState }) {
  return (
    <>
      <nav>
        <div className="nav-in">
          <div className="logo">
            my<span>subspace</span>
          </div>
          <div className="tabs">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`tab${app.screen === tab.id ? ' on' : ''}`}
                onClick={() => app.go(tab.id)}
              >
                <span className="tab-ic" aria-hidden="true">{tab.icon}</span>
                {tab.dot && <span className="dot" />}
                <span className="tlabel">{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="nav-right">
            <button
              type="button"
              className="nav-icon"
              aria-label="Notifications and requests"
              onClick={() => app.setOpenPanel('notif')}
            >
              🔔
              {app.requestCount > 0 && <span className="nav-badge">{app.requestCount}</span>}
            </button>
            <button
              type="button"
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

      <div className="mobile-tabs" role="navigation" aria-label="Main">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`mobile-tab${app.screen === tab.id ? ' on' : ''}`}
            onClick={() => app.go(tab.id)}
            aria-current={app.screen === tab.id ? 'page' : undefined}
          >
            {tab.id === 'profile' ? (
              <span className="mobile-tab-av">{ME.initial}</span>
            ) : (
              <span className="mobile-tab-ic" aria-hidden="true">{tab.icon}</span>
            )}
            <span className="mobile-tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </>
  )
}
