import type { MemberInfo } from '../types'

export const INTEREST_FILTERS = ['All', 'leather', 'bondage', 'impact', 'rope', 'pup play', 'switching'] as const
export const LOOKING_FILTERS = ['All', 'play partners', 'friends', 'relationship', 'mentorship'] as const
export const PREFERENCE_FILTERS = ['All', 'queer', 'gay', 'bi', 'pan', 'open'] as const

export type InterestFilter = (typeof INTEREST_FILTERS)[number]
export type LookingFilter = (typeof LOOKING_FILTERS)[number]
export type PreferenceFilter = (typeof PREFERENCE_FILTERS)[number]

export const LOCAL_PEOPLE: MemberInfo[] = [
  {
    name: 'nocturne',
    initial: 'N',
    dyn: 'Switch',
    loc: 'DTLA',
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
    grad: '135deg,#7CE33A,#00FFC2',
    sexuality: 'queer',
    genderIdentity: 'transfem',
    interests: ['leather', 'bondage', 'switching'],
    lookingFor: ['friends', 'play partners'],
    sexualPreference: 'queer',
  },
]

export function filterLocalPeople(
  people: MemberInfo[],
  interest: InterestFilter,
  looking: LookingFilter,
  preference: PreferenceFilter,
) {
  return people.filter((p) => {
    if (interest !== 'All' && !p.interests?.some((i) => i.toLowerCase().includes(interest.toLowerCase()))) {
      return false
    }
    if (looking !== 'All' && !p.lookingFor?.some((l) => l.toLowerCase() === looking.toLowerCase())) {
      return false
    }
    if (preference !== 'All' && p.sexualPreference?.toLowerCase() !== preference.toLowerCase()) {
      return false
    }
    return true
  })
}
