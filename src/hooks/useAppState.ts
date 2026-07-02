import { useCallback, useEffect, useRef, useState } from 'react'
import { ME } from '../constants/user'
import { locationFromZip } from '../constants/location'
import type { InterestFilter, LookingFilter, PreferenceFilter } from '../constants/people'
import { fetchGifs, type GifItem } from '../lib/giphy'
import type {
  ConsentKind,
  ConsentStatus,
  FeedSpankEntry,
  GroupTab,
  MemberInfo,
  PanelTab,
  ReactionMap,
  ReactorMode,
  ReactorTab,
  Screen,
  SpankVisibility,
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
  const [zipCode, setZipCode] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneCode, setPhoneCode] = useState('')
  const [locationCity, setLocationCity] = useState('Los Angeles')
  const [idVerificationRequired, setIdVerificationRequired] = useState(false)

  const [peopleInterest, setPeopleInterest] = useState<InterestFilter>('All')
  const [peopleLooking, setPeopleLooking] = useState<LookingFilter>('All')
  const [peoplePreference, setPeoplePreference] = useState<PreferenceFilter>('All')

  const [hiddenPostIds, setHiddenPostIds] = useState<string[]>([])
  const [openFeedMenuId, setOpenFeedMenuId] = useState<string | null>(null)

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
  const [flirtRequestVisibility] = useState<SpankVisibility>('private')
  const [flirtSpankVisibility, setFlirtSpankVisibility] = useState<SpankVisibility | null>(null)
  const [feedSpanks, setFeedSpanks] = useState<FeedSpankEntry[]>([])

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
    (name: string, visibility: SpankVisibility = 'public') => {
      if (name === ME.handle) {
        setMyProfileSpanks((n) => n + 1)
      }
      setFeedSpanks((entries) => [
        {
          id: crypto.randomUUID(),
          spanker: ME.handle,
          target: name,
          visibility,
          time: 'just now',
        },
        ...entries,
      ])
      toast(`👋 You spanked ${name} · ${visibility}`)
    },
    [toast],
  )

  const rsvpToast = useCallback(() => toast("✓ You're going. Added to your calendar."), [toast])
  const inviteTo = useCallback((group: string) => toast(`🔑 Invite link copied for ${group}`), [toast])

  const acceptFlirtRequest = useCallback(() => {
    setFlirtRequest('accepted')
    setFlirtSpankVisibility(flirtRequestVisibility)
    toast(`Nocturne spanked you · ${flirtRequestVisibility}`)
  }, [flirtRequestVisibility, toast])

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

  const submitZip = useCallback(() => {
    const loc = locationFromZip(zipCode)
    setLocationCity(loc.city)
    setIdVerificationRequired(loc.idVerificationRequired)
    setOnboardingStep(2)
  }, [zipCode])

  const finishOnboarding = useCallback(() => {
    setShowOnboarding(false)
    toast('Welcome to mysubspace 💚')
  }, [toast])

  const replayInvite = useCallback(() => {
    setAgeOk(false)
    setOnboardingStep(0)
    setZipCode('')
    setPhone('')
    setPhoneCode('')
    setLocationCity('Los Angeles')
    setIdVerificationRequired(false)
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
    if (friendAdded) return
    setFriendAdded(true)
    toast(`Friend added · ${member.name}`)
  }, [friendAdded, member.name, toast])

  const profileAction = useCallback(
    (kind: ConsentKind) => {
      const labels = { spank: 'Flirt', message: 'Message', photo: 'Photo' } as const
      const label = labels[kind]

      setConsentState((prev) => {
        const status = prev[kind]

        if (status === 'none') {
          toast(`${label} request sent · ${member.name} decides`)
          setTimeout(() => {
            setConsentState((s) => (s[kind] === 'pending' ? { ...s, [kind]: 'active' } : s))
          }, 1600)
          return { ...prev, [kind]: 'pending' }
        }

        if (status === 'pending') {
          toast(`${label} request pending · waiting on ${member.name}`)
          return prev
        }

        if (kind === 'message') {
          toast(`Opening messages with ${member.name}…`)
        } else if (kind === 'photo') {
          toast(`Opening photo share with ${member.name}…`)
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

  const feedPostAction = useCallback(
    (postId: string, action: 'bookmark' | 'hide' | 'report') => {
      setOpenFeedMenuId(null)
      if (action === 'hide') {
        setHiddenPostIds((ids) => [...ids, postId])
        toast('Post hidden from your feed')
      } else if (action === 'bookmark') {
        toast('Saved to bookmarks')
      } else {
        toast('Report sent to mods')
      }
    },
    [toast],
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
      setOpenFeedMenuId(null)
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
    const onClick = () => setOpenFeedMenuId(null)
    if (openFeedMenuId) document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [openFeedMenuId])

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
    zipCode,
    setZipCode,
    phone,
    setPhone,
    phoneCode,
    setPhoneCode,
    locationCity,
    idVerificationRequired,
    submitZip,
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
    profileAction,
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
    flirtRequestVisibility,
    flirtSpankVisibility,
    acceptFlirtRequest,
    denyFlirtRequest,
    feedSpanks,
    hiddenPostIds,
    openFeedMenuId,
    setOpenFeedMenuId,
    feedPostAction,
    peopleInterest,
    setPeopleInterest,
    peopleLooking,
    setPeopleLooking,
    peoplePreference,
    setPeoplePreference,
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
