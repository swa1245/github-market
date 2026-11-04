import { useState } from 'react'
import Header from '../../components/dashboard/Header'
import ChatPanel from '../../components/dashboard/ChatPanel'
import DateFilterMenu from '../../components/dashboard/DateFilterMenu'
import ExportMenu from '../../components/dashboard/ExportMenu'
import DateRange from '../../components/dashboard/DateRange'
import avatar from '../../assets/images/user-avatar.svg'
import profileAvatar from '../../assets/images/profile-avatar.png'
import settingsIcon from '../../assets/images/Settings.png'
import upIcon from '../../assets/images/up.png'
import downIcon from '../../assets/images/down.png'

function TrendArrow({ up, size = 16, tone = 'percent' }) {
  // percent: coral down · icon/teal: teal down · green: keep asset green
  let downFilter
  if (!up) {
    if (tone === 'icon' || tone === 'teal') {
      downFilter =
        'invert(55%) sepia(45%) saturate(500%) hue-rotate(130deg) brightness(95%) contrast(90%)'
    } else if (tone === 'percent') {
      downFilter =
        'invert(48%) sepia(89%) saturate(1500%) hue-rotate(326deg) brightness(100%) contrast(95%)'
    }
  }

  return (
    <img
      src={up ? upIcon : downIcon}
      alt=""
      width={size}
      height={size}
      className="shrink-0 object-contain"
      style={{
        width: size,
        height: size,
        ...(downFilter ? { filter: downFilter } : {}),
      }}
    />
  )
}

const tabs = [
  { id: 'settings', label: 'Settings' },
  { id: 'activity', label: 'Activity' },
  { id: 'users', label: 'Users' },
]

const infoRows = [
  { label: 'EMAIL', value: 'example@mail.com' },
  { label: 'PHONE', value: '+123-4567-8800' },
  { label: 'BIRTHDAY', value: '17 March, 1995' },
  { label: 'LOCATION', value: 'New York, NY' },
]

const favorites = [
  { name: 'Ronald Robertson', role: 'Product Designer' },
  { name: 'Regina Cooper', role: 'Project Manager' },
  { name: 'Judith Black', role: 'Business Analyst' },
  { name: 'Dustin Williamson', role: 'Web Developer' },
  { name: 'Calvin Flores', role: 'Senior Vice President' },
]

const metrics = [
  { title: 'Total Visitors', value: '20.500', percent: '4.85%', up: true },
  { title: 'Total Followers', value: '21.800', percent: '5.25%', up: false },
  { title: 'Total Likes', value: '30.400', percent: '3.55%', up: true },
  { title: 'Total Comments', value: '14.800', percent: '10.30%', up: false },
]

const platforms = [
  { name: 'Facebook', value: '3.5k', amount: 3.5, color: '#2DD4BF' },
  { name: 'Twitter', value: '7.8k', amount: 7.8, color: '#EAB308' },
  { name: 'Instagram', value: '5.8k', amount: 5.8, color: '#22C55E' },
  { name: 'YouTube', value: '4.7k', amount: 4.7, color: '#F87171' },
]

// Soft UI Followers Growth · capsule bars · Fri tip 2150 · Sat star
const growth = [
  { day: 'Mon', value: 4500, active: true },
  { day: 'Tue', value: 1600, active: false },
  { day: 'Wed', value: 5200, active: true },
  { day: 'Thu', value: 1800, active: false },
  { day: 'Fri', value: 2150, active: true, tip: '2150' },
  { day: 'Sat', value: 9200, active: true, star: true },
  { day: 'Sun', value: 2400, active: false },
]

const newFollowers = [
  { name: 'Regina Cooper', role: 'UI Designer at Figma' },
  { name: 'Jacob Jones', role: 'Developer at Google' },
  { name: 'Leslie Alexander', role: 'PM at Slack' },
  { name: 'Darlene Robertson', role: 'Analyst at Meta' },
  { name: 'Guy Hawkins', role: 'Engineer at Apple' },
]

// Soft UI visits · Mon starts at 2K · Wed 3.100 · min 1.400 · max 9.500
const visitValues = [2000, 1400, 3100, 1500, 2000, 9500, 2000]
const visitStats = [
  { label: 'Min. Visits', value: '1.400', kind: 'down' },
  { label: 'Avg. Visits', value: '3.100', kind: 'avg' },
  { label: 'Max. Visits', value: '9.500', kind: 'up' },
]

// Soft UI Y ticks are evenly spaced but values are not linear
const visitYTicks = [
  { v: 0, t: 0 },
  { v: 1000, t: 0.25 },
  { v: 2000, t: 0.5 },
  { v: 5000, t: 0.75 },
  { v: 10000, t: 1 },
]

function visitYRatio(value) {
  const ticks = visitYTicks
  if (value <= ticks[0].v) return ticks[0].t
  if (value >= ticks[ticks.length - 1].v) return ticks[ticks.length - 1].t
  for (let i = 0; i < ticks.length - 1; i++) {
    const a = ticks[i]
    const b = ticks[i + 1]
    if (value >= a.v && value <= b.v) {
      const p = (value - a.v) / (b.v - a.v)
      return a.t + p * (b.t - a.t)
    }
  }
  return 0
}

function VisitStatIcon({ kind }) {
  return (
    <div
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
        kind === 'down' ? 'bg-[#E6F7F5]' : 'bg-[#E8F8EC]'
      }`}
    >
      {kind === 'avg' ? (
        <span className="block h-[3px] w-5 rounded-full bg-[#21943A]" />
      ) : (
        <TrendArrow up={kind === 'up'} size={28} tone={kind === 'down' ? 'teal' : 'green'} />
      )}
    </div>
  )
}

function straightLine(pts) {
  if (pts.length < 2) return ''
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')
}

function VisitsChart() {
  const w = 700
  const h = 200
  const padX = 8
  const padT = 28
  const padB = 8
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const yLabels = ['10K', '5K', '2K', '1K', '0']
  const plotH = h - padT - padB
  const plotBottom = h - padB
  const plotW = w - padX * 2

  const pts = visitValues.map((v, i) => {
    const x = padX + (i * plotW) / (visitValues.length - 1)
    const y = padT + (1 - visitYRatio(v)) * plotH
    return [x, y]
  })

  const line = straightLine(pts)
  const area = `${line} L ${pts[pts.length - 1][0]} ${plotBottom} L ${pts[0][0]} ${plotBottom} Z`
  const wed = pts[2]

  return (
    <div className="rounded-2xl border border-[#f0f1f3] bg-white p-4 font-[Poppins,sans-serif] shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-[16px] font-medium text-[#3F434A]">Visits</h3>
        <DateRange />
      </div>

      <div className="mb-6 ml-2 flex flex-wrap gap-6 sm:ml-3 sm:gap-10">
        {visitStats.map((s) => (
          <div key={s.label} className="flex items-center gap-2.5">
            <VisitStatIcon kind={s.kind} />
            <div>
              <p className="text-[20px] font-medium leading-none text-[#3F434A]">{s.value}</p>
              <p className="mt-1.5 text-[12px] font-normal text-[#9ca3af]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex w-full gap-2">
        {/* Y labels — HTML so fonts stay crisp */}
        <div className="flex w-10 shrink-0 flex-col justify-between pb-7 pt-7 text-right sm:pb-8">
          {yLabels.map((label) => (
            <span key={label} className="text-[11px] font-normal leading-none text-[#9ca3af]">
              {label}
            </span>
          ))}
        </div>

        <div className="relative min-w-0 flex-1">
          <div
            className="pointer-events-none absolute z-10"
            style={{
              left: `${(wed[0] / w) * 100}%`,
              top: `${(wed[1] / h) * 100}%`,
              transform: 'translate(-50%, calc(-100% - 14px))',
            }}
          >
            <div className="whitespace-nowrap rounded-lg bg-white px-3 py-2 shadow-[0_8px_24px_rgba(16,24,40,0.14)]">
              <p className="text-[12px] font-medium text-[#3F434A]">Visitors: 3.100</p>
              <p className="text-[11px] font-normal text-[#9ca3af]">21 August, 2019</p>
            </div>
            <div className="mx-auto h-0 w-0 border-x-[6px] border-t-[7px] border-x-transparent border-t-white" />
          </div>

          <svg
            viewBox={`0 0 ${w} ${h}`}
            className="block h-[180px] w-full sm:h-[200px]"
            preserveAspectRatio="none"
          >
              <defs>
                <linearGradient id="visitsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#34d399" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {yLabels.map((_, i) => {
                const y = padT + (i * plotH) / (yLabels.length - 1)
                return (
                  <line
                    key={i}
                    x1={0}
                    x2={w}
                    y1={y}
                    y2={y}
                    stroke="#e5e7eb"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                )
              })}

              <line
                x1={0}
                x2={0}
                y1={padT}
                y2={plotBottom}
                stroke="#cbd5e1"
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1={0}
                x2={w}
                y1={plotBottom}
                y2={plotBottom}
                stroke="#cbd5e1"
                strokeWidth="3.5"
                vectorEffect="non-scaling-stroke"
              />

              <path d={area} fill="url(#visitsFill)" />
              <path
                d={line}
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              {pts.map(([x, y], i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={i === 2 ? 3.5 : 3}
                  fill="#fff"
                  stroke="#22c55e"
                  strokeWidth="1.75"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>

          {/* X labels — HTML so fonts stay crisp */}
          <div className="mt-2 flex w-full justify-between px-1">
            {days.map((d) => (
              <span key={d} className="text-[11px] font-normal text-[#9ca3af]">
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function polar(cx, cy, radius, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)]
}

/**
 * Soft UI Soft ring segment:
 * start end = convex (round nose) · finish end = concave (notch)
 * so each convex tucks into the next segment's concave gap
 */
function softRingSegment(cx, cy, rOut, rIn, a0, a1) {
  const rCap = (rOut - rIn) / 2
  const large = a1 - a0 > 180 ? 1 : 0
  const o0 = polar(cx, cy, rOut, a0)
  const o1 = polar(cx, cy, rOut, a1)
  const i0 = polar(cx, cy, rIn, a0)
  const i1 = polar(cx, cy, rIn, a1)

  return [
    `M ${o0[0]} ${o0[1]}`,
    // outer curve
    `A ${rOut} ${rOut} 0 ${large} 1 ${o1[0]} ${o1[1]}`,
    // trailing end = concave notch
    `A ${rCap} ${rCap} 0 0 0 ${i1[0]} ${i1[1]}`,
    // inner curve
    `A ${rIn} ${rIn} 0 ${large} 0 ${i0[0]} ${i0[1]}`,
    // leading end = convex nose (opposite sweep so it nests into the next notch)
    `A ${rCap} ${rCap} 0 0 1 ${o0[0]} ${o0[1]}`,
    'Z',
  ].join(' ')
}

function FollowersDonut() {
  const size = 176
  const stroke = 12
  const cx = size / 2
  const cy = size / 2
  const rOut = size / 2 - 4
  const rIn = rOut - stroke
  // Soft UI order from top, clockwise: green → yellow → red → teal
  const segments = [
    { key: 'ig', color: '#22C55E', frac: 0.48 },
    { key: 'tw', color: '#EAB308', frac: 0.1 },
    { key: 'yt', color: '#F87171', frac: 0.24 },
    { key: 'fb', color: '#2DD4BF', frac: 0.18 },
  ]
  // small gap so convex nose sits in next concave notch
  const gapDeg = 5
  let cursor = 0

  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#f0f1f3] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[16px] font-medium text-[#3F434A]">Followers</h3>
        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-full text-[#9ca3af] hover:bg-[#f3f4f6]"
          aria-label="More"
        >
          <span className="text-[18px] leading-none tracking-widest">···</span>
        </button>
      </div>

      <div className="relative mx-auto flex h-[190px] w-[190px] items-center justify-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {segments.map((s) => {
            const sweep = Math.max(s.frac * 360 - gapDeg, 1)
            const start = cursor + gapDeg / 2
            const end = start + sweep
            cursor += s.frac * 360
            return (
              <path
                key={s.key}
                d={softRingSegment(cx, cy, rOut, rIn, start, end)}
                fill={s.color}
              />
            )
          })}
        </svg>
        <div className="absolute text-center">
          <p className="text-[24px] font-medium leading-none text-[#3F434A]">21.800</p>
          <p className="mt-1.5 text-[13px] font-normal text-[#9ca3af]">Total</p>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[#eeeeee] pt-4">
        {platforms.map((p) => (
          <div key={p.name} className="flex items-center gap-2 text-[12px] text-[#6b7280]">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="truncate">{p.name}</span>
            <span className="ml-auto font-medium text-[#3F434A]">{p.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function StarIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M10 1.5l2.35 5.2 5.65.6-4.25 3.85 1.25 5.55L10 13.8l-4.99 2.9 1.25-5.55L1.99 7.3l5.65-.6L10 1.5z"
      />
    </svg>
  )
}

function FollowersGrowth() {
  const yLabels = ['10K', '5K', '2K', '1K', '0']
  const chartH = 160

  return (
    <div className="rounded-2xl border border-[#f0f1f3] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-[16px] font-medium text-[#3F434A]">Followers Growth</h3>
        <DateRange />
      </div>

      <div className="mb-6 flex flex-wrap gap-8 sm:gap-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F8EC]">
            <TrendArrow up size={20} tone="green" />
          </div>
          <div>
            <p className="text-[20px] font-medium leading-none text-[#3F434A]">21.800</p>
            <p className="mt-1.5 text-[12px] text-[#9ca3af]">Current Week</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6F7F5]">
            <TrendArrow up={false} size={20} tone="teal" />
          </div>
          <div>
            <p className="text-[20px] font-medium leading-none text-[#3F434A]">19.400</p>
            <p className="mt-1.5 text-[12px] text-[#9ca3af]">Last Week</p>
          </div>
        </div>
      </div>

      <div className="flex w-full gap-2">
        <div className="flex w-10 shrink-0 flex-col justify-between pb-6 pt-1 text-right">
          {yLabels.map((label) => (
            <span key={label} className="text-[11px] font-normal leading-none text-[#9ca3af]">
              {label}
            </span>
          ))}
        </div>

        <div className="relative min-w-0 flex-1">
          {/* grid lines */}
          <div className="pointer-events-none absolute inset-x-0 top-0 bottom-6 flex flex-col justify-between">
            {yLabels.map((label) => (
              <div key={label} className="border-t border-[#eef0f3]" />
            ))}
          </div>

          <div className="relative" style={{ height: chartH }}>
            {/* 2K line — full width Mon → Sun */}
            <div
              className="pointer-events-none absolute inset-x-0 z-[1] h-px bg-[#94a3b8]"
              style={{ bottom: `${visitYRatio(2000) * 100}%` }}
            />

            <div className="relative z-[2] flex h-full items-end justify-between gap-2 px-1">
              {growth.map((g) => {
                const hPct = visitYRatio(g.value) * 100
                return (
                  <div key={g.day} className="relative flex h-full flex-1 flex-col items-center justify-end">
                    {g.tip ? (
                      <div
                        className="absolute z-10 -translate-x-1/2"
                        style={{ left: '50%', bottom: `calc(${hPct}% + 10px)` }}
                      >
                        <div className="whitespace-nowrap rounded-lg bg-white px-2.5 py-1.5 text-[12px] font-medium text-[#3F434A] shadow-[0_8px_20px_rgba(16,24,40,0.12)]">
                          {g.tip}
                        </div>
                        <div className="mx-auto h-0 w-0 border-x-[5px] border-t-[6px] border-x-transparent border-t-white" />
                      </div>
                    ) : null}

                    <div
                      className={`relative w-3 rounded-full sm:w-3.5 ${
                        g.active ? 'bg-[#22c55e]' : 'bg-[#d1fae5]'
                      }`}
                      style={{ height: `${hPct}%`, minHeight: 10 }}
                    >
                      {g.star ? (
                        <StarIcon className="absolute top-2 left-1/2 h-3 w-3 -translate-x-1/2 text-white" />
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-2 flex justify-between px-1">
            {growth.map((g) => (
              <span key={g.day} className="flex-1 text-center text-[11px] text-[#9ca3af]">
                {g.day}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function NewFollowers() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#f0f1f3] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-[16px] font-semibold text-[#1f2937]">New Followers</h3>
        <DateRange />
      </div>
      <div className="space-y-3 overflow-y-auto">
        {newFollowers.map((u) => (
          <div key={u.name} className="flex items-center gap-3">
            <img src={avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-[#1f2937]">{u.name}</p>
              <p className="truncate text-[11px] text-[#9ca3af]">{u.role}</p>
            </div>
            <button
              type="button"
              className="cursor-pointer rounded-lg bg-[#E8F8EC] px-3 py-1.5 text-[12px] font-medium text-[#21943A] hover:bg-[#B9EB8E]"
            >
              Follow
            </button>
            <button type="button" className="cursor-pointer text-[#9ca3af]" aria-label="More">
              <svg width="4" height="14" viewBox="0 0 4 14" fill="currentColor">
                <circle cx="2" cy="2" r="1.5" />
                <circle cx="2" cy="7" r="1.5" />
                <circle cx="2" cy="12" r="1.5" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SettingsPage({ onLock, onLogout }) {
  const [tab, setTab] = useState('settings')
  const [chatOpen, setChatOpen] = useState(true)

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-[#f5f7fb]">
      <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-[#eceff3] bg-white sm:h-16">
        {/* spacer matches profile sidebar so tabs start above the right panel */}
        <div className="hidden w-[280px] shrink-0 border-r border-[#eeeeee] lg:block" />

        <div className="flex min-w-0 flex-1 items-center justify-between gap-3 px-4 sm:px-5 lg:px-6">
          <div className="flex min-w-0 items-center gap-1 overflow-x-auto sm:gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-medium transition sm:px-4 ${
                  tab === t.id
                    ? 'bg-[#E8F8EC] text-[#21943A]'
                    : 'text-[#6b7280] hover:bg-[#f3f4f6]'
                }`}
              >
                {t.id === 'settings' ? (
                  <img src={settingsIcon} alt="" className="h-4 w-4 object-contain" />
                ) : null}
                {t.label}
              </button>
            ))}
          </div>

          <div className="shrink-0">
            <Header
              actionsOnly
              onOpenSettings={() => setTab('settings')}
              onOpenChat={() => setChatOpen(true)}
              onLock={onLock}
              onLogout={onLogout}
            />
          </div>
        </div>
      </header>

      <ChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* profile sidebar */}
        <aside className="hidden w-[280px] shrink-0 overflow-y-auto border-r border-[#eeeeee] bg-white px-6 pb-7 pt-1 lg:block">
          <div className="mb-6 flex flex-col items-center text-center">
            <img
              src={profileAvatar}
              alt=""
              className="-mt-2 h-[132px] w-[144px] rounded-[32px] object-cover object-top"
            />
            <h2 className="mt-3 text-[16px] font-medium leading-none tracking-tight text-[#3F434A]">
              Felecia Brown
            </h2>
            <p className="mt-4 text-[13px] leading-none tracking-[0.14em] text-[#888888]">
              Project Manager
            </p>
            <button
              type="button"
              className="mt-5 min-w-[140px] cursor-pointer rounded-lg bg-[#21943A] px-6 py-2.5 text-[13px] font-medium text-white hover:bg-[#1a7a3a]"
            >
              Edit profile
            </button>
          </div>

          <div className="mb-6 border-t border-[#eeeeee] pt-5">
            <p className="mb-4 text-[12px] font-semibold tracking-[0.06em] text-[#333333]">
              INFO
            </p>
            <div className="space-y-4">
              {infoRows.map((row) => (
                <div key={row.label} className="text-left">
                  <p className="mb-1 text-[11px] font-medium tracking-[0.04em] text-[#888888]">
                    {row.label}
                  </p>
                  <p className="text-[13px] font-medium text-[#555555]">{row.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#eeeeee] pt-5">
            <p className="mb-4 text-[12px] font-semibold tracking-[0.06em] text-[#333333]">
              FAVORITES
            </p>
            <div className="space-y-4">
              {favorites.map((f) => (
                <div key={f.name} className="flex items-center gap-3">
                  <img
                    src={avatar}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0 text-left">
                    <p className="truncate text-[13px] font-medium text-[#333333]">{f.name}</p>
                    <p className="truncate text-[12px] text-[#888888]">{f.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6">
          {tab !== 'settings' ? (
            <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-[#e5e7eb] bg-white text-[14px] text-[#9ca3af]">
              {tab === 'activity' ? 'Activity coming soon' : 'Users coming soon'}
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-5">
              {/* mobile profile strip */}
              <div className="flex items-center gap-3 rounded-2xl border border-[#f0f1f3] bg-white p-4 lg:hidden">
                <img src={avatar} alt="" className="h-14 w-14 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium leading-tight text-[#3F434A]">Felecia Brown</p>
                  <p className="text-[12px] text-[#9ca3af]">Project Manager</p>
                </div>
                <button
                  type="button"
                  className="cursor-pointer rounded-lg bg-[#21943A] px-3 py-2 text-[12px] font-medium text-white"
                >
                  Edit
                </button>
              </div>

              <div className="flex min-h-[48px] flex-wrap items-center justify-between gap-3">
                <h2 className="text-[24px] font-medium leading-tight text-[#3F434A] sm:text-[26px]">
                  Overview
                </h2>
                <div className="flex items-center gap-2 sm:gap-3">
                  <ExportMenu />
                  <DateFilterMenu />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map((m) => (
                  <div
                    key={m.title}
                    className="flex items-center gap-3 rounded-2xl border border-[#f0f1f3] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:gap-4 sm:p-5"
                  >
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${
                        m.up ? 'bg-[#E8F8EC]' : 'bg-[#E6F7F5]'
                      }`}
                    >
                      <TrendArrow up={m.up} size={34} tone="icon" />
                    </div>
                    <div className="min-w-0">
                      <p className="mb-1 text-[13px] text-[#9ca3af]">{m.title}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-[22px] font-semibold leading-none text-[#3F434A]">{m.value}</p>
                        <span
                          className={`inline-flex items-center gap-0.5 text-[12px] font-semibold ${
                            m.up ? 'text-[#34d399]' : 'text-[#f87171]'
                          }`}
                        >
                          <TrendArrow up={m.up} size={20} tone="percent" />
                          {m.percent}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <VisitsChart />
                </div>
                <FollowersDonut />
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.15fr_1fr]">
                <FollowersGrowth />
                <NewFollowers />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
