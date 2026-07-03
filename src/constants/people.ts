import type { MemberInfo } from '../types'

export const NEIGHBORHOODS = [
  'DTLA',
  'Silver Lake',
  'Echo Park',
  'Highland Park',
  'Los Feliz',
  'West Hollywood',
  'North Hollywood',
  'Venice',
  'Culver City',
  'Koreatown',
  'Long Beach',
  'Pasadena',
] as const

export const DISTANCE_FILTERS = [
  { label: '5 mi', miles: 5 },
  { label: '10 mi', miles: 10 },
  { label: '25 mi', miles: 25 },
  { label: '50 mi', miles: 50 },
] as const

export const INTEREST_FILTERS = [
  'leather',
  'bondage',
  'impact',
  'rope',
  'pup play',
  'switching',
  'latex',
  'sensory',
  'roleplay',
  'exhibitionism',
  'caregiving',
  'pet play',
  'wax',
  'fire play',
  'edging',
  'muscle worship',
  'foot worship',
  'knife play',
  'voyeurism',
  'protocol',
] as const

export const LOOKING_FILTERS = [
  'play partners',
  'friends',
  'relationship',
  'mentorship',
  'casual fun',
  'events',
  'collabs',
  'long distance',
] as const

export const PREFERENCE_FILTERS = [
  'queer',
  'gay',
  'lesbian',
  'bi',
  'pan',
  'straight',
  'demisexual',
  'sapiosexual',
  'open',
  'questioning',
  'fluid',
  'asexual spectrum',
] as const

const GRADS = [
  '135deg,#9EFF00,#00FFC2',
  '135deg,#7CE33A,#00FFC2',
  '135deg,#00FFC2,#7CE33A',
  '135deg,#00FFC2,#5FD000',
  '135deg,#5FD000,#9EFF00',
  '135deg,#9EFF00,#5FD000',
  '135deg,#7CE33A,#5FD000',
  '135deg,#00FFC2,#9EFF00',
]

const DYNS = ['Switch', 'Dom', 'Sub', 'Pup', 'Rigger', 'Brat', 'Handler', 'Leather', 'Primal', 'Vanilla curious']

const HANDLE_PREFIX = [
  'night', 'rope', 'pup', 'leather', 'knot', 'velvet', 'iron', 'shadow', 'neon', 'cruise',
  'amber', 'sable', 'chrome', 'mist', 'ember', 'cipher', 'drift', 'haze', 'volt', 'lace',
  'byte', 'flux', 'glow', 'hex', 'jade', 'lux', 'moss', 'nox', 'onyx', 'pulse',
]

const HANDLE_SUFFIX = [
  'bound', 'wire', 'atlas', 'bean', 'knot', 'fall', 'spark', 'moss', 'drift', 'lace',
  'line', 'core', 'wave', 'dust', 'fire', 'link', 'node', 'sync', 'tone', 'veil',
]

const CORE_PROFILES: MemberInfo[] = [
  {
    name: 'nocturne',
    initial: 'N',
    dyn: 'Switch',
    loc: 'DTLA',
    distanceMiles: 2,
    grad: '135deg,#9EFF00,#00FFC2',
    sexuality: 'queer',
    genderIdentity: 'non-binary',
    interests: ['impact', 'switching', 'leather'],
    lookingFor: ['play partners', 'friends'],
    sexualPreference: 'queer',
  },
  {
    name: 'pupatlas',
    initial: 'P',
    dyn: 'Pup',
    loc: 'Highland Park',
    distanceMiles: 6,
    grad: '135deg,#7CE33A,#00FFC2',
    sexuality: 'gay',
    genderIdentity: 'man',
    interests: ['pup play', 'mosh', 'friends'],
    lookingFor: ['friends', 'play partners'],
    sexualPreference: 'gay',
  },
  {
    name: 'mercuryknot',
    initial: 'M',
    dyn: 'Rigger',
    loc: 'Silver Lake',
    distanceMiles: 4,
    grad: '135deg,#00FFC2,#7CE33A',
    sexuality: 'bi',
    genderIdentity: 'woman',
    interests: ['rope', 'ritual', 'bondage'],
    lookingFor: ['play partners', 'mentorship'],
    sexualPreference: 'bi',
  },
  {
    name: 'brattybean',
    initial: 'B',
    dyn: 'Brat',
    loc: 'Echo Park',
    distanceMiles: 3,
    grad: '135deg,#00FFC2,#7CE33A',
    sexuality: 'pan',
    genderIdentity: 'genderfluid',
    interests: ['impact', 'bratting', 'bondage'],
    lookingFor: ['play partners'],
    sexualPreference: 'pan',
  },
  {
    name: 'ironlace',
    initial: 'I',
    dyn: 'Dom',
    loc: 'Silver Lake',
    distanceMiles: 4,
    grad: '135deg,#00FFC2,#5FD000',
    sexuality: 'gay',
    genderIdentity: 'man',
    interests: ['leather', 'protocol', 'impact'],
    lookingFor: ['relationship', 'play partners'],
    sexualPreference: 'gay',
  },
  {
    name: 'velvetbound',
    initial: 'V',
    dyn: 'Switch',
    loc: 'Los Feliz',
    distanceMiles: 5,
    grad: '135deg,#7CE33A,#00FFC2',
    sexuality: 'queer',
    genderIdentity: 'transfem',
    interests: ['leather', 'bondage', 'switching'],
    lookingFor: ['friends', 'play partners'],
    sexualPreference: 'queer',
  },
]

function pick<T>(arr: readonly T[], index: number) {
  return arr[index % arr.length]
}

function pickMany<T>(arr: readonly T[], count: number, seed: number) {
  const out: T[] = []
  for (let i = 0; i < count; i++) {
    out.push(pick(arr, seed + i * 3))
  }
  return [...new Set(out)]
}

function generateHandle(index: number, used: Set<string>) {
  let name = `${pick(HANDLE_PREFIX, index)}${pick(HANDLE_SUFFIX, index + 5)}`
  if (used.has(name)) name = `${name}${index}`
  if (used.has(name)) name = `scene${index}`
  used.add(name)
  return name
}

function generateProfiles(count: number): MemberInfo[] {
  const used = new Set(CORE_PROFILES.map((p) => p.name))
  const profiles: MemberInfo[] = [...CORE_PROFILES]

  for (let i = 0; profiles.length < count; i++) {
    const name = generateHandle(i + 20, used)
    const loc = pick(NEIGHBORHOODS, i + 2)
    const pref = pick(PREFERENCE_FILTERS, i + 4)
    profiles.push({
      name,
      initial: name.charAt(0).toUpperCase(),
      dyn: pick(DYNS, i),
      loc,
      distanceMiles: 1 + ((i * 11 + 3) % 48),
      grad: pick(GRADS, i),
      sexuality: pref,
      genderIdentity: pick(['man', 'woman', 'non-binary', 'transmasc', 'transfem', 'genderfluid', 'agender'], i),
      interests: pickMany(INTEREST_FILTERS, 2 + (i % 3), i),
      lookingFor: pickMany(LOOKING_FILTERS, 1 + (i % 2), i + 1),
      sexualPreference: pref,
    })
  }

  return profiles
}

export const LOCAL_PEOPLE = generateProfiles(150)

export type PeopleFilters = {
  query: string
  maxDistanceMiles: number | null
  interests: string[]
  lookingFor: string[]
  preferences: string[]
}

function matchesAny(haystack: string[] | undefined, needles: string[]) {
  if (needles.length === 0) return true
  const lower = (haystack ?? []).map((v) => v.toLowerCase())
  return needles.some((n) => lower.some((h) => h.includes(n.toLowerCase()) || n.toLowerCase().includes(h)))
}

function matchesPreference(person: MemberInfo, preferences: string[]) {
  if (preferences.length === 0) return true
  const identity = [person.sexualPreference, person.sexuality].filter(Boolean).map((v) => v!.toLowerCase())
  return preferences.some((p) => identity.some((id) => id.includes(p.toLowerCase()) || p.toLowerCase().includes(id)))
}

export function filterLocalPeople(people: MemberInfo[], filters: PeopleFilters) {
  const q = filters.query.trim().toLowerCase().replace(/^@/, '')

  return people.filter((person) => {
    if (q && !person.name.toLowerCase().includes(q)) return false
    if (
      filters.maxDistanceMiles != null &&
      (person.distanceMiles ?? Number.POSITIVE_INFINITY) > filters.maxDistanceMiles
    ) {
      return false
    }
    if (!matchesAny(person.interests, filters.interests)) return false
    if (!matchesAny(person.lookingFor, filters.lookingFor)) return false
    if (!matchesPreference(person, filters.preferences)) return false
    return true
  })
}

export function findPersonByName(name: string) {
  return LOCAL_PEOPLE.find((p) => p.name.toLowerCase() === name.toLowerCase())
}
