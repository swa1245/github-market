import { useEffect, useMemo, useRef, useState } from 'react'
import arrowDown02Icon from '../../assets/images/arrow-down-02.png'

function pad(n) {
  return String(n).padStart(2, '0')
}

function buildTimeOptions() {
  const list = []
  for (let h = 0; h < 24; h += 1) {
    for (const m of [0, 30]) {
      list.push(`${pad(h)}:${pad(m)}`)
    }
  }
  return list
}

const TIME_OPTIONS = buildTimeOptions()
const WEEKDAYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']
const MONTH_NAMES = [
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

function parseDdMmYyyy(value) {
  const [d, m, y] = value.split('.').map(Number)
  if (!d || !m || !y) return new Date(2020, 8, 12)
  return new Date(y, m - 1, d)
}

function formatDdMmYyyy(date) {
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`
}

function buildMonthCells(viewYear, viewMonth) {
  const first = new Date(viewYear, viewMonth, 1)
  const startOffset = (first.getDay() + 6) % 7
  const start = new Date(viewYear, viewMonth, 1 - startOffset)
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return {
      date: d,
      day: d.getDate(),
      inMonth: d.getMonth() === viewMonth,
      key: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
    }
  })
}

function TimeDropdown({ value, onChange, muted, open, onToggle, onClose }) {
  const listRef = useRef(null)
  const btnRef = useRef(null)
  const [pos, setPos] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (!open || !btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    setPos({ top: rect.bottom + 6, left: rect.left })
  }, [open])

  useEffect(() => {
    if (!open || !listRef.current) return
    const idx = TIME_OPTIONS.indexOf(value)
    if (idx < 0) return
    const el = listRef.current.children[idx]
    if (el) el.scrollIntoView({ block: 'nearest' })
  }, [open, value])

  return (
    <div className="relative min-w-0 flex-1">
      <button
        ref={btnRef}
        type="button"
        onClick={onToggle}
        className={`flex h-11 w-full cursor-pointer items-center rounded-xl border px-3 text-left text-[13px] outline-none transition-colors ${
          open
            ? 'border-[#21943A] bg-white text-[#3F434A]'
            : muted
              ? 'border-[#e5e7eb] bg-[#f8fafc] text-[#9ca3af] hover:border-[#d1d5db]'
              : 'border-[#e5e7eb] bg-white text-[#3F434A] hover:border-[#d1d5db]'
        }`}
      >
        {value}
      </button>
      {open ? (
        <>
          <button type="button" aria-label="Close time" className="fixed inset-0 z-[80] cursor-default" onClick={onClose} />
          <div
            className="fixed z-[90] w-[118px] overflow-hidden rounded-xl border border-[#e5e7eb] bg-white py-1.5 shadow-[0_12px_30px_rgba(16,24,40,0.16)]"
            style={{ top: pos.top, left: pos.left }}
          >
            <div ref={listRef} className="max-h-[196px] overflow-y-auto px-1.5">
              {TIME_OPTIONS.map((opt) => {
                const selected = opt === value
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      onChange(opt)
                      onClose()
                    }}
                    className={`mb-0.5 flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] last:mb-0 hover:bg-[#f3f4f6] ${
                      selected ? 'font-medium text-[#21943A]' : 'text-[#3F434A]'
                    }`}
                  >
                    <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                      {selected ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#21943A" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5L20 7" />
                        </svg>
                      ) : null}
                    </span>
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

function DateDropdown({ value, onChange, open, onToggle, onClose }) {
  const selectedDate = useMemo(() => parseDdMmYyyy(value), [value])
  const [viewYear, setViewYear] = useState(selectedDate.getFullYear())
  const [viewMonth, setViewMonth] = useState(selectedDate.getMonth())
  const btnRef = useRef(null)
  const [pos, setPos] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (!open) return
    setViewYear(selectedDate.getFullYear())
    setViewMonth(selectedDate.getMonth())
  }, [open, selectedDate])

  useEffect(() => {
    if (!open || !btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const width = 280
    const left = Math.min(rect.left, window.innerWidth - width - 12)
    setPos({ top: rect.bottom + 6, left: Math.max(12, left) })
  }, [open])

  const cells = useMemo(() => buildMonthCells(viewYear, viewMonth), [viewYear, viewMonth])

  function shiftMonth(delta) {
    const next = new Date(viewYear, viewMonth + delta, 1)
    setViewYear(next.getFullYear())
    setViewMonth(next.getMonth())
  }

  return (
    <div className="relative min-w-0 flex-[1.35]">
      <button
        ref={btnRef}
        type="button"
        onClick={onToggle}
        className={`flex h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-xl border bg-white px-3 text-left text-[13px] outline-none transition-colors ${
          open
            ? 'border-[#21943A] text-[#3F434A]'
            : 'border-[#e5e7eb] text-[#3F434A] hover:border-[#d1d5db]'
        }`}
      >
        <span className="truncate">{value}</span>
        <img src={arrowDown02Icon} alt="" className="h-3 w-3 shrink-0 object-contain opacity-70" />
      </button>
      {open ? (
        <>
          <button type="button" aria-label="Close date" className="fixed inset-0 z-[80] cursor-default" onClick={onClose} />
          <div
            className="fixed z-[90] w-[280px] rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-[0_16px_40px_rgba(16,24,40,0.18)]"
            style={{ top: pos.top, left: pos.left }}
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#f3f4f6] text-[#6b7280] hover:bg-[#e5e7eb]"
                aria-label="Previous month"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <p className="text-[14px] font-semibold text-[#3F434A]">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </p>
              <button
                type="button"
                onClick={() => shiftMonth(1)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#f3f4f6] text-[#6b7280] hover:bg-[#e5e7eb]"
                aria-label="Next month"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            <div className="mb-1 grid grid-cols-7 gap-y-1">
              {WEEKDAYS.map((d) => (
                <div key={d} className="py-1 text-center text-[11px] font-medium tracking-wide text-[#9ca3af]">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-1">
              {cells.map((cell) => {
                const isSelected =
                  cell.date.getFullYear() === selectedDate.getFullYear() &&
                  cell.date.getMonth() === selectedDate.getMonth() &&
                  cell.date.getDate() === selectedDate.getDate()
                return (
                  <button
                    key={cell.key}
                    type="button"
                    onClick={() => {
                      onChange(formatDdMmYyyy(cell.date))
                      onClose()
                    }}
                    className={`mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[13px] ${
                      isSelected
                        ? 'bg-[#21943A] font-medium text-white'
                        : cell.inMonth
                          ? 'text-[#3F434A] hover:bg-[#f3f4f6]'
                          : 'text-[#c4c9d4] hover:bg-[#f8fafc]'
                    }`}
                  >
                    {cell.day}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default function NewEventModal({ calendars, onClose, onCreate }) {
  const [title, setTitle] = useState('Sending order')
  const [description, setDescription] = useState('Sending order #25789 Felecia Burke at 5:30')
  const [startTime, setStartTime] = useState('00:00')
  const [startDate, setStartDate] = useState('12.07.2020')
  const [endTime, setEndTime] = useState('00:00')
  const [endDate, setEndDate] = useState('12.07.2020')
  const [allDay, setAllDay] = useState(true)
  const [repeat, setRepeat] = useState(false)
  const [calendarId, setCalendarId] = useState(calendars[0]?.id || 'important')
  const [calOpen, setCalOpen] = useState(false)
  const [openPicker, setOpenPicker] = useState(null)

  const selected = calendars.find((c) => c.id === calendarId) || calendars[0]

  function closePickers() {
    setOpenPicker(null)
  }

  function togglePicker(id) {
    setCalOpen(false)
    if (id === 'startTime' || id === 'endTime') {
      setAllDay(false)
    }
    setOpenPicker((cur) => (cur === id ? null : id))
  }

  function parseDate(value) {
    const [d, m, y] = value.split('.').map(Number)
    if (!d || !m || !y) return null
    return `${y}-${pad(m)}-${pad(d)}`
  }

  function handleCreate(e) {
    e.preventDefault()
    const start = parseDate(startDate) || '2020-09-12'
    const end = parseDate(endDate) || start
    onCreate?.({
      title: title.trim() || 'New Event',
      description: description.trim(),
      category: selected?.id || 'important',
      start,
      end,
      time: allDay ? '' : startTime,
      allDay,
      repeat,
    })
    onClose?.()
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/20 p-4 sm:p-6">
      <button type="button" aria-label="Close" className="absolute inset-0 cursor-default" onClick={onClose} />
      <form
        onSubmit={handleCreate}
        className="relative z-[1] my-auto w-full max-w-[480px] rounded-2xl bg-white px-5 py-5 shadow-[0_20px_50px_rgba(16,24,40,0.22),0_4px_14px_rgba(16,24,40,0.1)] sm:px-6 sm:py-6"
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <h2 className="text-[22px] font-semibold text-[#3F434A]">New Event</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-[#9ca3af] hover:bg-[#f3f4f6] hover:text-[#6b7280]"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <label className="mb-1.5 block text-[12px] text-[#8392AB]">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 h-11 w-full rounded-xl border border-[#e5e7eb] px-4 text-[13px] text-[#3F434A] outline-none focus:border-[#86efac]"
        />

        <label className="mb-1.5 block text-[12px] text-[#8392AB]">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mb-4 w-full resize-none rounded-xl border border-[#e5e7eb] px-4 py-3 text-[13px] text-[#3F434A] outline-none focus:border-[#86efac]"
        />

        <label className="mb-1.5 block text-[12px] text-[#8392AB]">Time and Date</label>
        <div className="mb-4 grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:items-center">
          <div className="col-span-2 flex min-w-0 gap-2 sm:flex-1">
            <TimeDropdown
              value={startTime}
              onChange={setStartTime}
              muted={allDay}
              open={openPicker === 'startTime'}
              onToggle={() => togglePicker('startTime')}
              onClose={closePickers}
            />
            <DateDropdown
              value={startDate}
              onChange={setStartDate}
              open={openPicker === 'startDate'}
              onToggle={() => togglePicker('startDate')}
              onClose={closePickers}
            />
          </div>
          <span className="col-span-2 hidden text-center text-[13px] text-[#9ca3af] sm:inline sm:shrink-0">-</span>
          <div className="col-span-2 flex min-w-0 gap-2 sm:flex-1">
            <TimeDropdown
              value={endTime}
              onChange={setEndTime}
              muted={allDay}
              open={openPicker === 'endTime'}
              onToggle={() => togglePicker('endTime')}
              onClose={closePickers}
            />
            <DateDropdown
              value={endDate}
              onChange={setEndDate}
              open={openPicker === 'endDate'}
              onToggle={() => togglePicker('endDate')}
              onClose={closePickers}
            />
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-5">
          <label className="flex cursor-pointer items-center gap-2.5 text-[13px] font-medium text-[#3F434A]">
            <input
              type="checkbox"
              checked={allDay}
              onChange={(e) => {
                setAllDay(e.target.checked)
                if (e.target.checked) closePickers()
              }}
              className="h-4 w-4 cursor-pointer accent-[#21943A]"
            />
            All Day
          </label>
          <label className="flex cursor-pointer items-center gap-2.5 text-[13px] font-medium text-[#3F434A]">
            <input
              type="checkbox"
              checked={repeat}
              onChange={(e) => setRepeat(e.target.checked)}
              className="h-4 w-4 cursor-pointer accent-[#21943A]"
            />
            Repeat
          </label>
        </div>

        <label className="mb-1.5 block text-[12px] text-[#8392AB]">Calendar</label>
        <div className="relative mb-6">
          <button
            type="button"
            onClick={() => {
              closePickers()
              setCalOpen((v) => !v)
            }}
            className="flex h-11 w-full cursor-pointer items-center gap-2.5 rounded-xl border border-[#e5e7eb] bg-white px-3 text-left text-[13px] font-medium text-[#3F434A]"
          >
            <span
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px]"
              style={{ backgroundColor: selected?.color || '#F07167' }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5L20 7" />
              </svg>
            </span>
            <span className="flex-1 truncate">{selected?.label || 'Important'}</span>
            <img src={arrowDown02Icon} alt="" className="h-3 w-3 object-contain opacity-70" />
          </button>
          {calOpen ? (
            <div className="absolute top-full right-0 left-0 z-20 mt-1 overflow-hidden rounded-xl border border-[#e5e7eb] bg-white py-1 shadow-[0_12px_30px_rgba(16,24,40,0.14)]">
              {calendars.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setCalendarId(c.id)
                    setCalOpen(false)
                  }}
                  className="flex w-full cursor-pointer items-center gap-2.5 px-3 py-2.5 text-left text-[13px] font-medium text-[#3F434A] hover:bg-[#f8fafc]"
                >
                  <span
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px]"
                    style={{ backgroundColor: c.color }}
                  >
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5L20 7" />
                    </svg>
                  </span>
                  {c.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="min-w-[110px] cursor-pointer rounded-md bg-[#21943A] px-6 py-2.5 text-[13px] font-medium text-white hover:bg-[#1a7a3a]"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}
