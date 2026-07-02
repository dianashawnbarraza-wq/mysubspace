import { REACTOR_ICONS } from '../lib/giphy'
import type { AppState } from '../hooks/useAppState'

export function Reactor({ app }: { app: AppState }) {
  return (
    <div
      id="reactor"
      className={app.reactorOpen ? 'show' : ''}
      style={{ left: app.reactorPos.left, top: app.reactorPos.top }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="reactor-tabs">
        <button
          className={`rtab${app.reactorTab === 'icons' ? ' on' : ''}`}
          onClick={() => app.switchReactorTab('icons')}
        >
          😈 Icons
        </button>
        {app.reactorMode === 'compose' && (
          <button
            className={`rtab${app.reactorTab === 'gifs' ? ' on' : ''}`}
            onClick={() => app.switchReactorTab('gifs')}
          >
            🎬 GIFs
          </button>
        )}
      </div>

      <div className={`rtab-pane${app.reactorTab === 'icons' ? ' on' : ''}`} id="rt-icons">
        <div className="icon-grid">
          {REACTOR_ICONS.map((icon) => (
            <button key={icon} className="icon-btn" onClick={() => app.pickIcon(icon)}>
              {icon}
            </button>
          ))}
        </div>
      </div>

      <div className={`rtab-pane${app.reactorTab === 'gifs' ? ' on' : ''}`} id="rt-gifs">
        <div className="gif-search">
          <input
            type="text"
            placeholder="Search GIFs..."
            value={app.gifSearch}
            onChange={(e) => app.setGifSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && app.loadGifs(app.gifSearch.trim())}
          />
          <button onClick={() => app.loadGifs(app.gifSearch.trim())}>Go</button>
        </div>
        <div className="gif-attrib">Powered by GIPHY</div>
        <div className="gif-grid">
          {app.gifsLoading ? (
            <div className="gif-loading">Loading GIFs...</div>
          ) : app.gifs.length === 0 ? (
            <div className="gif-loading">No GIFs found. Try another search.</div>
          ) : (
            app.gifs.map((g) => (
              <img
                key={g.url}
                className="gif-thumb"
                loading="lazy"
                src={g.thumbUrl}
                alt={g.title}
                onClick={() => app.selectGif(g.url, g.title)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
