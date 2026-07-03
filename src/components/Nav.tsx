import type { AppState } from '../hooks/useAppState'
import { ME } from '../constants/user'
import type { Screen } from '../types'

const MAIN_TABS: { id: Screen; label: string; mobileIcon: string }[] = [
  { id: 'feed', label: 'Feed', mobileIcon: '⌂' },
  { id: 'groups', label: 'Groups', mobileIcon: '◉' },
  { id: 'people', label: 'People', mobileIcon: '◎' },
  { id: 'market', label: 'Market', mobileIcon: '◆' },
]

const DESKTOP_TABS: { id: Screen; label: string; dot?: boolean }[] = [
  ...MAIN_TABS.map(({ id, label }) => ({ id, label })),
  { id: 'profile', label: 'You', dot: true },
]

export function Nav({ app }: { app: AppState }) {
  return (
    <>
      <nav>
        <div className="nav-in">
          <button type="button" className="logo" onClick={() => app.go('feed')} aria-label="Go to feed">
            my<span>subspace</span>
          </button>
          <div className="tabs">
            {DESKTOP_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
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
            <button type="button" className="nav-av" aria-label="Your profile" onClick={() => app.go('profile')}>
              {ME.initial}
            </button>
          </div>
        </div>
      </nav>

      <div className="mobile-tabs" role="navigation" aria-label="Main">
        {MAIN_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`mobile-tab${app.screen === tab.id ? ' on' : ''}`}
            onClick={() => app.go(tab.id)}
            aria-current={app.screen === tab.id ? 'page' : undefined}
          >
            <span className="mobile-tab-ic" aria-hidden="true">{tab.mobileIcon}</span>
            <span className="mobile-tab-label">{tab.label}</span>
          </button>
        ))}
        <button
          type="button"
          className={`mobile-tab${app.screen === 'profile' ? ' on' : ''}`}
          onClick={() => app.go('profile')}
          aria-current={app.screen === 'profile' ? 'page' : undefined}
          aria-label="Your profile"
        >
          <span className="mobile-tab-av">{ME.initial}</span>
          <span className="mobile-tab-label">You</span>
        </button>
      </div>
    </>
  )
}
