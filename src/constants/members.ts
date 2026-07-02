export const MEMBER_SNIPPETS: Record<string, { mood: string; into: string }> = {
  nocturne: { mood: 'curious tonight.', into: 'impact, switching' },
  pupatlas: { mood: 'zoomies mode.', into: 'pup play, mosh' },
  ironlace: { mood: 'holding court.', into: 'leather, protocol' },
  mercuryknot: { mood: 'tie-minded.', into: 'rope, ritual' },
  brattybean: { mood: 'asking for it.', into: 'impact, bratting' },
}

export function memberSnippet(name: string, dyn: string) {
  return MEMBER_SNIPPETS[name] ?? { mood: 'around.', into: dyn.toLowerCase() }
}

export const PROFILE_ACTION_LABELS = {
  spank: 'Flirt',
  message: 'Message',
  photo: 'Send photos',
} as const
