import type { GroupPost } from '../types'
import { ME } from './user'

export function gearPlaceholder(label: string, accent = '9EFF00', bg = '1a3810') {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#${bg}"/><stop offset="1" stop-color="#0d2320"/></linearGradient></defs>
    <rect width="640" height="400" fill="url(#g)"/>
    <rect x="120" y="80" width="400" height="240" rx="24" fill="#${bg}" stroke="#${accent}" stroke-width="3" opacity="0.55"/>
    <text x="320" y="205" fill="#${accent}" font-family="Arial,sans-serif" font-size="28" font-weight="700" text-anchor="middle">${label}</text>
    <text x="320" y="240" fill="#7CE33A" font-family="Arial,sans-serif" font-size="14" text-anchor="middle" opacity="0.7">gear photo</text>
  </svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export const INITIAL_GROUP_POSTS: GroupPost[] = [
  {
    id: 'gp-pinned',
    author: ME.handle,
    initial: ME.initial,
    grad: ME.grad,
    time: 'pinned',
    text: 'Pinned: house rules and consent norms. Read before your first meet.',
    pinned: true,
    replies: [
      { author: 'nocturne', text: 'thanks for keeping this pinned' },
    ],
    replyCount: 3,
  },
  {
    id: 'gp-1',
    author: 'nocturne',
    initial: 'N',
    grad: '135deg,#9EFF00,#00FFC2',
    time: '1 hr ago',
    text: "Who's coming Friday? First cruise night of the summer 🖤",
    replies: [
      { author: 'pupatlas', text: "I'll be there after work" },
      { author: 'brattybean', text: 'same, need a ride from Echo Park' },
    ],
    replyCount: 14,
  },
  {
    id: 'gp-2',
    author: ME.handle,
    initial: ME.initial,
    grad: ME.grad,
    time: '3 hr ago',
    text: 'New bulldog harness came in. Finally fits right.',
    image: {
      kind: 'photo',
      label: 'Bulldog harness',
      alt: 'Bulldog harness gear photo',
      hue: '9EFF00',
    },
    replies: [
      { author: 'ironlace', text: 'clean lines on that one' },
    ],
    replyCount: 8,
  },
  {
    id: 'gp-3',
    author: 'mercuryknot',
    initial: 'M',
    grad: '135deg,#00FFC2,#7CE33A',
    time: '5 hr ago',
    text: 'Sunday market find — deerskin flogger, barely used.',
    image: {
      kind: 'photo',
      label: 'Deerskin flogger',
      alt: 'Deerskin flogger gear photo',
      hue: '00FFC2',
    },
    replies: [
      { author: 'nocturne', text: 'how many tails?' },
      { author: 'mercuryknot', text: 'six, medium weight' },
    ],
    replyCount: 11,
  },
  {
    id: 'gp-4',
    author: 'brattybean',
    initial: 'B',
    grad: '135deg,#00FFC2,#7CE33A',
    time: '6 hr ago',
    text: 'Reminder: negotiate before you grab someone’s collar at the bar. We mean it.',
    replies: [
      { author: ME.handle, text: 'preach' },
    ],
    replyCount: 6,
  },
  {
    id: 'gp-5',
    author: 'velvetbound',
    initial: 'V',
    grad: '135deg,#7CE33A,#00FFC2',
    time: '8 hr ago',
    text: 'Impact demo stills from last workshop — marked trigger warning.',
    image: {
      kind: 'trigger',
      label: 'Impact demo',
      alt: 'Impact play demo photo with trigger warning',
      hue: '7CE33A',
    },
    replies: [
      { author: 'pupatlas', text: 'thanks for the TW' },
    ],
    replyCount: 4,
  },
]

export function imageSrc(image: GroupPost['image']) {
  if (!image) return undefined
  return gearPlaceholder(image.label, image.hue ?? '9EFF00')
}
