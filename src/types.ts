export type Screen = 'feed' | 'groups' | 'people' | 'market' | 'profile'

export type SpankVisibility = 'public' | 'private'

export type FeedSpankEntry = {
  id: string
  spanker: string
  target: string
  visibility: SpankVisibility
  time: string
}

export type ConsentKind = 'spank' | 'message' | 'photo'
export type ConsentStatus = 'none' | 'pending' | 'active'

export type MemberInfo = {
  name: string
  initial: string
  dyn: string
  loc: string
  distanceMiles?: number
  grad: string
  sexuality?: string
  genderIdentity?: string
  interests?: string[]
  lookingFor?: string[]
  sexualPreference?: string
}

export type ReactionMap = Record<string, Record<string, { count: number; mine: boolean }>>

export type WallEntry = {
  id: string
  author?: string
  initial?: string
  grad?: string
  time?: string
  text?: string
  gifUrl?: string
  gifAlt?: string
  isNew?: boolean
}

export type ReactorMode = 'feed' | 'compose'
export type ReactorPosition = { left: number; top: number }

export type GroupTab = 'g-feed' | 'g-cal' | 'g-mem'
export type PanelTab = 'np-req' | 'np-act'
export type ReactorTab = 'icons' | 'gifs'

export type GroupPostReply = {
  author: string
  text: string
}

export type GroupPostImage = {
  kind: 'photo' | 'trigger'
  label: string
  alt: string
  hue?: string
}

export type GroupPost = {
  id: string
  author: string
  initial: string
  grad: string
  time: string
  text: string
  pinned?: boolean
  image?: GroupPostImage
  replies: GroupPostReply[]
  replyCount: number
}
