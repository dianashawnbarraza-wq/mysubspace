import { REACTOR_ICONS } from '../lib/giphy'
import type { AppState } from '../hooks/useAppState'

export function Reactor({ app }: { app: AppState }) {
  if (!app.reactorOpen) return null

  return (
    <>
      <div className="reactor-scrim" onClick={app.closeReactor} aria-hidden />
      <div className="reactor reactor-modal" onClick={(e) => e.stopPropagation()}>
        <div className="reactor-head">
          <span className="reactor-title">Pick a reaction</span>
          <button type="button" className="reactor-close" onClick={app.closeReactor} aria-label="Close">
            ✕
          </button>
        </div>

        {app.reactorMode === 'compose' && (
          <div className="reactor-tabs">
            <button
              type="button"
              className={`rtab${app.reactorTab === 'icons' ? ' on' : ''}`}
              onClick={() => app.switchReactorTab('icons')}
            >
              Icons
            </button>
            <button
              type="button"
              className={`rtab${app.reactorTab === 'gifs' ? ' on' : ''}`}
              onClick={() => app.switchReactorTab('gifs')}
            >
              GIFs
            </button>
          </div>
        )}

        <div className={`rtab-pane${app.reactorTab === 'icons' || app.reactorMode === 'feed' ? ' on' : ''}`}>
          <div className="icon-grid">
            {REACTOR_ICONS.map((icon) => (
              <button key={icon} type="button" className="icon-btn" onClick={() => app.pickIcon(icon)}>
                {icon}
              </button>
            ))}
          </div>
        </div>

        {app.reactorMode === 'compose' && (
          <div className={`rtab-pane${app.reactorTab === 'gifs' ? ' on' : ''}`}>
            <div className="gif-search">
              <input
                type="text"
                placeholder="Search GIFs..."
                value={app.gifSearch}
                onChange={(e) => app.setGifSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && app.loadGifs(app.gifSearch.trim())}
              />
              <button type="button" onClick={() => app.loadGifs(app.gifSearch.trim())}>Go</button>
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
        )}
      </div>
    </>
  )
}
