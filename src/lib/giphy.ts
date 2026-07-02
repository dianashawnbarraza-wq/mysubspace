const GIPHY_KEY = 'dc6zaTOxFJmzC'

export type GifItem = {
  url: string
  thumbUrl: string
  title: string
}

export async function fetchGifs(query?: string): Promise<GifItem[]> {
  const endpoint = query
    ? `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(query)}&limit=12&rating=pg-13`
    : `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_KEY}&limit=12&rating=pg-13`

  const res = await fetch(endpoint)
  const data = await res.json()
  const items = (data?.data ?? []) as Array<{
    title?: string
    images: { fixed_width_small: { url: string }; fixed_width: { url: string } }
  }>

  return items.map((g) => ({
    url: g.images.fixed_width.url,
    thumbUrl: g.images.fixed_width_small.url,
    title: g.title ?? 'gif',
  }))
}

export const REACTOR_ICONS = [
  '🖤', '💚', '🔥', '⚡', '⛓️', '🪢', '🐾', '🕯️', '👑', '🎭', '🗝️', '🔒',
  '😈', '🤐', '😏', '🥵', '💋', '🥂', '🌙', '✨', '🎲', '👀', '🍑', '👋',
] as const
