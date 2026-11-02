import DateRange from './DateRange'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
// match Figma: both leave Mon at bottom; green peaks Thu then Sun; teal peaks Fri
const income = [2, 48, 36, 72, 38, 55, 88]
const expense = [2, 30, 52, 28, 70, 42, 22]

const W = 560
const H = 220
const LEFT = 28
const RIGHT = 28
const TOP = 20
const BOTTOM = 36
const plotH = H - TOP - BOTTOM
const plotW = W - LEFT - RIGHT

const green = '#2d8a3c'
const teal = '#4fd1c5'

function pt(values, i) {
  const x = LEFT + (i / (values.length - 1)) * plotW
  const y = TOP + (1 - values[i] / 100) * plotH
  return { x, y }
}

function points(values) {
  return values.map((_, i) => pt(values, i))
}

function line(values) {
  const pts = points(values)
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
}

function area(values) {
  const pts = points(values)
  const base = TOP + plotH
  return `${line(values)} L ${pts[pts.length - 1].x} ${base} L ${pts[0].x} ${base} Z`
}

export default function AnalyticsChart() {
  const incomePts = points(income)
  const expensePts = points(expense)
  const thu = incomePts[3]

  return (
    <div className="rounded-2xl border border-[#f0f1f3] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-[#1f2937]">Analytics</h3>
        <DateRange />
      </div>

      <div className="mb-5 flex items-center gap-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8f8ef]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={green} strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m6 14 6-6 6 6" />
            </svg>
          </span>
          <span className="text-[18px] font-medium text-[#3F434A]">$5.850</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e6f7f5]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m6 10 6 6 6-6" />
            </svg>
          </span>
          <span className="text-[18px] font-medium text-[#3F434A]">$1.750</span>
        </div>
      </div>

      <div className="relative w-full">
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2"
          style={{ left: `${(thu.x / W) * 100}%`, top: 8 }}
        >
          <div className="rounded-xl bg-white px-3.5 py-2 shadow-[0_8px_24px_rgba(16,24,40,0.12)]">
            <p className="text-[13px] font-medium text-[#3F434A]">$1.000</p>
            <p className="text-[11px] text-[#9ca3af]">22 August, 2019</p>
          </div>
          <div className="mx-auto h-0 w-0 border-x-[6px] border-t-[7px] border-x-transparent border-t-white" />
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="mt-6 block h-auto w-full overflow-hidden">
          <defs>
            <clipPath id="analyticsPlotClip">
              <rect x={LEFT} y={TOP} width={plotW} height={plotH} />
            </clipPath>
          </defs>

          {days.map((_, i) => {
            const x = LEFT + (i / (days.length - 1)) * plotW
            return (
              <line
                key={i}
                x1={x}
                y1={TOP}
                x2={x}
                y2={TOP + plotH}
                stroke="#eef0f3"
                strokeWidth="1"
              />
            )
          })}

          <g clipPath="url(#analyticsPlotClip)">
            {/* solid teal fill — no soft outside blur */}
            <path d={area(expense)} fill="rgba(79,209,197,0.22)" />
            <path
              d={line(income)}
              fill="none"
              stroke={green}
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d={line(expense)}
              fill="none"
              stroke={teal}
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>

          {incomePts.map((p, i) => (
            <circle key={`g${i}`} cx={p.x} cy={p.y} r="4" fill="#fff" stroke={green} strokeWidth="2.5" />
          ))}
          {expensePts.map((p, i) => (
            <circle key={`t${i}`} cx={p.x} cy={p.y} r="4" fill="#fff" stroke={teal} strokeWidth="2.5" />
          ))}

          {days.map((d, i) => {
            const x = LEFT + (i / (days.length - 1)) * plotW
            return (
              <text
                key={d}
                x={x}
                y={H - 8}
                textAnchor="middle"
                fill="#9ca3af"
                fontSize="11"
                fontFamily="Poppins, sans-serif"
              >
                {d}
              </text>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
