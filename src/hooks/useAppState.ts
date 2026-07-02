import { useCallback, useEffect, useRef, useState } from 'react'
import { ME } from '../constants/user'
import { fetchGifs, type GifItem } from '../lib/giphy'
import type {
  ConsentKind,
  ConsentStatus,
  GroupTab,
  MemberInfo,
  PanelTab,
  ReactionMap,
  ReactorMode,
  ReactorTab,
  Screen,
  WallEntry,
} from '../types'

const INITIAL_WALL: WallEntry[] = [
  {
    id: '1',
    author: 'nocturne',
    initial: 'N',
    grad: '135deg,#9EFF00,#00FFC2',
    time: '2h ago',
    text: 'great meeting you at cruise night, welcome to the group 🖤',
  },
  {
    id: '2',
    author: 'nocturne',
    initial: 'N',
    grad: '135deg,#9EFF00,#00FFC2',
    time: 'yesterday',
    text: "Top 8 spot secured, don't make me fight brattybean for it",
  },
]

export function useAppState() {
  const [screen, setScreen] = useState<Screen>('feed')
  const [inviteStripVisible, setInviteStripVisible] = useState(true)
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const [myProfileSpanks, setMyProfileSpanks] = useState(2431)
  const [showGroupDetail, setShowGroupDetail] = useState(false)
  const [groupTab, setGroupTab] = useState<GroupTab>('g-feed')
  const [marketChip, setMarketChip] = useState('All')

  const [showOnboarding, setShowOnboarding] = useState(false)
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [ageOk, setAgeOk] = useState(false)
  const [handle, setHandle] = useState<string>(ME.handle)

  const [showMemberProfile, setShowMemberProfile] = useState(false)
  const [member, setMember] = useState<MemberInfo>({
    name: 'nocturne',
    initial: 'N',
    dyn: 'Switch',
    loc: 'DTLA',
    grad: '135deg,#9EFF00,#00FFC2',
  })
  const [friendAdded, setFriendAdded] = useState(false)
  const [consentState, setConsentState] = useState<Record<ConsentKind, ConsentStatus>>({
    spank: 'none',
    message: 'none',
    photo: 'none',
  })
  const [mpMenuOpen, setMpMenuOpen] = useState(false)

  const [openPanel, setOpenPanel] = useState<'notif' | 'settings' | null>(null)
  const [notifTab, setNotifTab] = useState<PanelTab>('np-req')
  const [requestCount, setRequestCount] = useState(3)
  const [requests, setRequests] = useState([1, 2, 3])

  const [showGroupSettings, setShowGroupSettings] = useState(false)
  const [inviteModeMember, setInviteModeMember] = useState(false)

  const [wallInput, setWallInput] = useState('')
  const [wallEntries, setWallEntries] = useState<WallEntry[]>(INITIAL_WALL)

  const [reactions, setReactions] = useState<ReactionMap>({})

  const [flirtRequest, setFlirtRequest] = useState<'pending' | 'accepted' | 'denied'>('pending')

  const [reactorOpen, setReactorOpen] = useState(false)
  const [reactorMode, setReactorMode] = useState<ReactorMode>('feed')
  const [reactorCtx, setReactorCtx] = useState('')
  const [reactorTab, setReactorTab] = useState<ReactorTab>('icons')
  const [gifs, setGifs] = useState<GifItem[]>([])
  const [gifsLoading, setGifsLoading] = useState(false)
  const [gifSearch, setGifSearch] = useState('')
  const gifsLoadedOnce = useRef(false)

  const toast = useCallback((msg: string) => {
    setToastMsg(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToastMsg(null), 2200)
  }, [])

  const go = useCallback(
    (name: Screen) => {
      setScreen(name)
      if (name !== 'groups') setShowGroupDetail(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [],
  )

  const spank = useCallback(
    (name: string, visibility: 'public' | 'private' = 'public') => {
      if (name === ME.handle) {
        setMyProfileSpanks((n) => n + 1)
      }
      toast(`👋 You spanked ${name} · ${visibility}`)
    },
    [toast],
  )

  const rsvpToast = useCallback(() => toast("✓ You're going. Added to your calendar."), [toast])
  const inviteTo = useCallback((group: string) => toast(`🔑 Invite link copied for ${group}`), [toast])

  const acceptFlirtRequest = useCallback(() => {
    setFlirtRequest('accepted')
    toast('Nocturne spanked you · private')
  }, [toast])

  const denyFlirtRequest = useCallback(() => {
    setFlirtRequest('denied')
    toast('Request declined')
  }, [toast])

  const openGroup = useCallback(() => {
    setShowGroupDetail(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const closeGroup = useCallback(() => setShowGroupDetail(false), [])

  const postComment = useCallback(
    (text?: string) => {
      const value = (text ?? wallInput).trim()
      if (!value) return
      setWallEntries((entries) => [
        {
          id: crypto.randomUUID(),
          author: ME.handle,
          initial: ME.initial,
          grad: ME.grad,
          time: 'just now',
          text: value,
          isNew: true,
        },
        ...entries,
      ])
      setWallInput('')
      toast('Comment posted')
    },
    [wallInput, toast],
  )

  const toggleAge = useCallback(() => setAgeOk((v) => !v), [])

  const obStep = useCallback((n: number) => setOnboardingStep(n), [])

  const finishOnboarding = useCallback(() => {
    setShowOnboarding(false)
    toast('Welcome to mysubspace 💚')
  }, [toast])

  const replayInvite = useCallback(() => {
    setAgeOk(false)
    setOnboardingStep(0)
    setShowOnboarding(true)
  }, [])

  const openMember = useCallback((info: MemberInfo) => {
    setMember(info)
    setFriendAdded(false)
    setConsentState({ spank: 'none', message: 'none', photo: 'none' })
    setMpMenuOpen(false)
    setShowMemberProfile(true)
  }, [])

  const addFriend = useCallback(() => {
    setFriendAdded(true)
    toast('Friend added. Now choose what they can do.')
  }, [toast])

  const requestConsent = useCallback(
    (kind: ConsentKind) => {
      setConsentState((prev) => {
        const current = prev[kind]
        if (current === 'none') {
          toast(`Request sent · ${member.name} decides`)
          setTimeout(() => {
            setConsentState((s) => (s[kind] === 'pending' ? { ...s, [kind]: 'active' } : s))
          }, 1600)
          return { ...prev, [kind]: 'pending' }
        }
        if (current === 'active') {
          toast('Revoked. That access is off.')
          return { ...prev, [kind]: 'none' }
        }
        return prev
      })
    },
    [member.name, toast],
  )

  const resolveReq = useCallback(
    (id: number, msg: string) => {
      setRequests((r) => r.filter((x) => x !== id))
      setRequestCount((n) => Math.max(0, n - 1))
      toast(`✓ ${msg}`)
    },
    [toast],
  )

  const toggleReaction = useCallback((postId: string, icon: string) => {
    setReactions((prev) => {
      const post = { ...(prev[postId] ?? {}) }
      const existing = post[icon]
      if (existing) {
        const mine = !existing.mine
        const count = existing.count + (mine ? 1 : -1)
        if (count <= 0) delete post[icon]
        else post[icon] = { count, mine }
      } else {
        post[icon] = { count: 1, mine: true }
      }
      return { ...prev, [postId]: post }
    })
  }, [])

  const loadGifs = useCallback(async (query?: string) => {
    setGifsLoading(true)
    try {
      const items = await fetchGifs(query)
      setGifs(items)
    } catch {
      setGifs([])
    } finally {
      setGifsLoading(false)
    }
  }, [])

  const openReactor = useCallback(
    (e: React.MouseEvent, mode: ReactorMode, ctx = '') => {
      e.stopPropagation()
      setReactorMode(mode)
      setReactorCtx(ctx)
      setReactorTab('icons')
      setReactorOpen(true)
    },
    [],
  )

  const closeReactor = useCallback(() => setReactorOpen(false), [])

  const pickIcon = useCallback(
    (icon: string) => {
      if (reactorMode === 'compose') {
        setWallInput((v) => v + icon)
      } else if (reactorMode === 'feed' && reactorCtx) {
        toggleReaction(reactorCtx, icon)
      }
      closeReactor()
    },
    [reactorMode, reactorCtx, toggleReaction, closeReactor],
  )

  const selectGif = useCallback(
    (url: string, title: string) => {
      setWallEntries((entries) => [
        {
          id: crypto.randomUUID(),
          author: ME.handle,
          initial: ME.initial,
          grad: ME.grad,
          time: 'just now',
          gifUrl: url,
          gifAlt: title,
          isNew: true,
        },
        ...entries,
      ])
      closeReactor()
      toast('GIF posted to your wall')
    },
    [closeReactor, toast],
  )

  const switchReactorTab = useCallback(
    (tab: ReactorTab) => {
      setReactorTab(tab)
      if (tab === 'gifs' && !gifsLoadedOnce.current) {
        gifsLoadedOnce.current = true
        loadGifs()
      }
    },
    [loadGifs],
  )

  const closeAllPanels = useCallback(() => setOpenPanel(null), [])

  useEffect(() => {
    const timer = setTimeout(() => setShowOnboarding(true), 350)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      closeAllPanels()
      setShowMemberProfile(false)
      setShowGroupSettings(false)
      setMpMenuOpen(false)
      closeReactor()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeAllPanels, closeReactor])

  useEffect(() => {
    const onClick = () => setMpMenuOpen(false)
    if (mpMenuOpen) document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [mpMenuOpen])

  useEffect(() => {
    if (!reactorOpen) return
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.reactor-modal') && !target.closest('.reactor-trigger')) {
        closeReactor()
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [reactorOpen, closeReactor])

  return {
    screen,
    go,
    inviteStripVisible,
    setInviteStripVisible,
    toastMsg,
    toast,
    myProfileSpanks,
    spank,
    rsvpToast,
    inviteTo,
    showGroupDetail,
    openGroup,
    closeGroup,
    groupTab,
    setGroupTab,
    marketChip,
    setMarketChip,
    showOnboarding,
    onboardingStep,
    ageOk,
    toggleAge,
    handle,
    setHandle,
    obStep,
    finishOnboarding,
    replayInvite,
    showMemberProfile,
    setShowMemberProfile,
    member,
    openMember,
    friendAdded,
    addFriend,
    consentState,
    requestConsent,
    mpMenuOpen,
    setMpMenuOpen,
    openPanel,
    setOpenPanel,
    closeAllPanels,
    notifTab,
    setNotifTab,
    requestCount,
    requests,
    resolveReq,
    showGroupSettings,
    setShowGroupSettings,
    inviteModeMember,
    setInviteModeMember,
    wallInput,
    setWallInput,
    wallEntries,
    postComment,
    reactions,
    toggleReaction,
    flirtRequest,
    acceptFlirtRequest,
    denyFlirtRequest,
    reactorOpen,
    reactorMode,
    reactorCtx,
    reactorTab,
    switchReactorTab,
    openReactor,
    closeReactor,
    pickIcon,
    gifs,
    gifsLoading,
    gifSearch,
    setGifSearch,
    loadGifs,
    selectGif,
  }
}

export type AppState = ReturnType<typeof useAppState>
