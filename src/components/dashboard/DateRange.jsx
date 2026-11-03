import { useEffect, useMemo, useRef, useState } from 'react'
import calendarIcon from '../../assets/images/Calendar.svg'
import arrowDownIcon from '../../assets/images/arrow-down-02.png'

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const SHORT_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function sameDay(a, b) {
  if (!a || !b) return false
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function formatRange(from, to) {
  if (!from) return 'Select dates'
  const left = `${from.getDate()} ${SHORT_MONTHS[from.getMonth()]}`
  if (!to || sameDay(from, to)) return left
  return `${left} – ${to.getDate()} ${SHORT_MONTHS[to.getMonth()]}`
}

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function buildMonthGrid(year, month) {
  const firstDow = new Date(year, month, 1).getDay()
  const total = daysInMonth(year, month)
  const cells = []
  for (let i = 0; i < firstDow; i++) cells.push(null)
  for (let d = 1; d <= total; d++) cells.push(new Date(year, month, d))
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

function inRange(day, from, to) {
  if (!day || !from || !to) return false
  const t = day.getTime()
  const a = Math.min(from.getTime(), to.getTime())
  const b = Math.max(from.getTime(), to.getTime())
  return t > a && t < b
}

export default function DateRange() {
  const defaultFrom = new Date(2020, 7, 19)
  const defaultTo = new Date(2020, 7, 25)

  const [open, setOpen] = useState(false)
  const [from, setFrom] = useState(defaultFrom)
  const [to, setTo] = useState(defaultTo)
  const [draftFrom, setDraftFrom] = useState(defaultFrom)
  const [draftTo, setDraftTo] = useState(defaultTo)
  const [view, setView] = useState({ year: 2020, month: 7 })
  const ref = useRef(null)

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  const cells = useMemo(
    () => buildMonthGrid(view.year, view.month),
    [view.year, view.month],
  )

  function openPicker() {
    setDraftFrom(from)
    setDraftTo(to)
    setView({ year: from.getFullYear(), month: from.getMonth() })
    setOpen((v) => !v)
  }

  function pickDay(day) {
    if (!day) return
    const d = startOfDay(day)
    if (!draftFrom || (draftFrom && draftTo)) {
      setDraftFrom(d)
      setDraftTo(null)
      return
    }
    if (d.getTime() < draftFrom.getTime()) {
      setDraftTo(draftFrom)
      setDraftFrom(d)
    } else {
      setDraftTo(d)
    }
  }

  function apply() {
    if (!draftFrom) return
    setFrom(draftFrom)
    setTo(draftTo || draftFrom)
    setOpen(false)
  }

  function prevMonth() {
    setView((v) => {
      const m = v.month - 1
      return m < 0 ? { year: v.year - 1, month: 11 } : { year: v.year, month: m }
    })
  }

  function nextMonth() {
    setView((v) => {
      const m = v.month + 1
      return m > 11 ? { year: v.year + 1, month: 0 } : { year: v.year, month: m }
    })
  }

  const rangeStart = draftFrom
  const rangeEnd = draftTo

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={openPicker}
        className={`inline-flex max-w-full cursor-pointer items-center gap-1.5 rounded-lg border bg-white px-2.5 py-1.5 text-[12px] font-medium text-[#6b7280] transition hover:bg-[#f9fafb] sm:gap-2 sm:px-3 sm:text-[13px] ${
          open ? 'border-[#86efac]' : 'border-[#eef0f3]'
        }`}
        aria-expanded={open}
      >
        <img src={calendarIcon} alt="" className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
        <span className="truncate">{formatRange(from, to)}</span>
        <img
          src={arrowDownIcon}
          alt=""
          className={`h-3 w-3 shrink-0 object-contain transition ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open ? (
        <>
          {/* mobile backdrop */}
          <button
            type="button"
            aria-label="Close calendar"
            className="fixed inset-0 z-40 bg-black/30 sm:hidden"
            onClick={() => setOpen(false)}
          />

          <div className="fixed top-1/2 left-1/2 z-50 w-[min(300px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white p-3 shadow-[0_16px_48px_rgba(16,24,40,0.22),0_4px_12px_rgba(16,24,40,0.08)] ring-1 ring-black/5 sm:absolute sm:top-full sm:right-0 sm:left-auto sm:mt-2 sm:w-[300px] sm:translate-x-0 sm:translate-y-0 sm:p-4">
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                onClick={prevMonth}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#6b7280] hover:bg-[#f3f4f6]"
                aria-label="Previous month"
              >
                ‹
              </button>
              <p className="text-[13px] font-semibold text-[#1f2937] sm:text-[14px]">
                {MONTHS[view.month]} {view.year}
              </p>
              <button
                type="button"
                onClick={nextMonth}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#6b7280] hover:bg-[#f3f4f6]"
                aria-label="Next month"
              >
                ›
              </button>
            </div>

            <div className="mb-1 grid grid-cols-7 text-center text-[10px] font-medium text-[#9ca3af] sm:text-[11px]">
              {WEEKDAYS.map((d) => (
                <span key={d} className="py-1">
                  {d}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-0.5 sm:gap-y-1">
              {cells.map((day, i) => {
                if (!day) return <span key={`e${i}`} className="h-8 sm:h-9" />
                const isStart = sameDay(day, rangeStart)
                const isEnd = sameDay(day, rangeEnd)
                const isSelected = isStart || isEnd
                const isBetween = inRange(day, rangeStart, rangeEnd)
                const isToday = sameDay(day, new Date())

                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    onClick={() => pickDay(day)}
                    className={`relative flex h-8 cursor-pointer items-center justify-center text-[12px] transition sm:h-9 sm:text-[13px] ${
                      isBetween ? 'bg-[#E8F8EC] text-[#1f2937]' : 'text-[#374151]'
                    } ${isStart && rangeEnd ? 'rounded-l-full bg-[#E8F8EC]' : ''} ${
                      isEnd && rangeStart ? 'rounded-r-full bg-[#E8F8EC]' : ''
                    } ${!isSelected && !isBetween ? 'rounded-full hover:bg-[#f3f4f6]' : ''}`}
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full sm:h-8 sm:w-8 ${
                        isSelected ? 'bg-[#21943A] font-semibold text-white' : ''
                      } ${isToday && !isSelected ? 'ring-1 ring-[#86efac]' : ''}`}
                    >
                      {day.getDate()}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="mt-3 flex flex-col gap-2 border-t border-[#f0f1f3] pt-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-center text-[12px] text-[#9ca3af] sm:text-left">
                {formatRange(draftFrom, draftTo)}
              </p>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="cursor-pointer rounded-lg px-3 py-1.5 text-[12px] font-medium text-[#6b7280] hover:bg-[#f3f4f6]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={apply}
                  disabled={!draftFrom}
                  className="cursor-pointer rounded-lg bg-[#21943A] px-3 py-1.5 text-[12px] font-medium text-white hover:bg-[#1a7a3a] disabled:opacity-50"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
