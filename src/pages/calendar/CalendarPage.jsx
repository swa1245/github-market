import { useMemo, useRef, useState } from 'react'
import Header from '../../components/dashboard/Header'
import Sidebar from '../../components/dashboard/Sidebar'
import NewCalendarModal from './NewCalendarModal'
import NewEventModal from './NewEventModal'
import EventDetailPopup from './EventDetailPopup'
import DeleteEventModal from './DeleteEventModal'

const WEEKDAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']

const CATEGORIES = [
  { id: 'important', label: 'Important', color: '#F07167' },
  { id: 'meeting', label: 'Meeting', color: '#54D1DB' },
  { id: 'event', label: 'Event', color: '#7BC67E' },
  { id: 'work', label: 'Work', color: '#F2C94C' },
  { id: 'other', label: 'Other', color: '#8B9CB3' },
]

const DEFAULT_DESC =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.'

const INITIAL_EVENTS = [
  {
    id: 1,
    title: 'Call Back Priscilla',
    category: 'important',
    start: '2020-09-01',
    end: '2020-09-02',
    time: '00:30',
    endTime: '01:30',
    description: DEFAULT_DESC,
  },
  { id: 2, title: 'Presentation', category: 'work', start: '2020-09-02', end: '2020-09-02', time: '10:00', endTime: '11:00', description: DEFAULT_DESC },
  { id: 3, title: 'Meeting', category: 'meeting', start: '2020-09-04', end: '2020-09-04', time: '14:00', endTime: '15:00', description: DEFAULT_DESC },
  { id: 4, title: 'Project "Rocket"', category: 'work', start: '2020-09-09', end: '2020-09-09', time: '02:00', endTime: '03:30', description: DEFAULT_DESC },
  { id: 5, title: 'Presentation', category: 'event', start: '2020-09-11', end: '2020-09-11', time: '10:00', endTime: '11:30', description: DEFAULT_DESC },
  { id: 6, title: 'Meeting with..', category: 'meeting', start: '2020-09-08', end: '2020-09-08', time: '02:00', endTime: '03:30', description: DEFAULT_DESC },
  { id: 7, title: 'New Event', category: 'meeting', start: '2020-09-08', end: '2020-09-08', time: '04:00', endTime: '05:30', description: DEFAULT_DESC },
  { id: 8, title: 'Call Back Priscilla', category: 'event', start: '2020-09-10', end: '2020-09-10', time: '07:00', endTime: '08:30', description: DEFAULT_DESC },
  { id: 9, title: 'Presentation', category: 'event', start: '2020-09-11', end: '2020-09-11', time: '07:00', endTime: '08:30', description: DEFAULT_DESC },
  { id: 21, title: 'Sprint Planning', category: 'work', start: '2020-09-07', end: '2020-09-07', time: '09:00', endTime: '10:30', description: DEFAULT_DESC },
  { id: 10, title: 'Workshop', category: 'event', start: '2020-09-14', end: '2020-09-15', time: '10:00', endTime: '12:00', description: DEFAULT_DESC },
  { id: 11, title: 'Meeting', category: 'meeting', start: '2020-09-16', end: '2020-09-16', time: '10:00', endTime: '11:00', description: DEFAULT_DESC },
  { id: 12, title: 'Standup', category: 'work', start: '2020-09-16', end: '2020-09-16', time: '09:30', endTime: '10:00', description: DEFAULT_DESC },
  { id: 13, title: 'Demo', category: 'event', start: '2020-09-16', end: '2020-09-16', time: '13:00', endTime: '14:00', description: DEFAULT_DESC },
  { id: 14, title: 'Interview', category: 'important', start: '2020-09-16', end: '2020-09-16', time: '15:00', endTime: '16:00', description: DEFAULT_DESC },
  { id: 15, title: 'Budget Review', category: 'other', start: '2020-09-16', end: '2020-09-16', time: '17:00', endTime: '18:00', description: DEFAULT_DESC },
  { id: 16, title: 'Product Launch', category: 'important', start: '2020-09-18', end: '2020-09-18', time: '12:00', endTime: '13:00', description: DEFAULT_DESC },
  { id: 17, title: 'Meeting', category: 'meeting', start: '2020-09-21', end: '2020-09-22', time: '', description: DEFAULT_DESC, allDay: true },
  { id: 18, title: 'Presentation', category: 'work', start: '2020-09-23', end: '2020-09-25', time: '10:00', endTime: '11:00', description: DEFAULT_DESC },
  { id: 19, title: 'Offline Day', category: 'other', start: '2020-09-25', end: '2020-09-25', time: '', description: DEFAULT_DESC, allDay: true },
  { id: 20, title: 'Project "Rocket"', category: 'event', start: '2020-09-28', end: '2020-09-30', time: '', description: DEFAULT_DESC, allDay: true },
]

const CATEGORY_STYLES = {
  important: { bg: '#FDE8E6', text: '#C45A5A', bar: '#F07167' },
  meeting: { bg: '#E6F9FB', text: '#2A9AA3', bar: '#54D1DB' },
  event: { bg: '#E8F8EC', text: '#21943A', bar: '#7BC67E' },
  work: { bg: '#FFF6D6', text: '#B8860B', bar: '#F2C94C' },
  other: { bg: '#F3F4F6', text: '#6b7280', bar: '#C4C9D1' },
}

const GRID_HOURS = Array.from({ length: 12 }, (_, i) => i + 1)
const HOUR_HEIGHT = 68
const GRID_START_MIN = 60
const GRID_END_MIN = GRID_START_MIN + GRID_HOURS.length * 60

function timeToMinutes(value) {
  if (!value) return GRID_START_MIN
  const [h, m] = value.split(':').map(Number)
  return h * 60 + (m || 0)
}

function minutesToLabel(totalMin) {
  const h = Math.floor(totalMin / 60)
  const m = totalMin % 60
  return `${pad(h)}:${pad(m)}`
}

function formatHourLabel(hour) {
  return `${pad(hour)}:00`
}

function getEventPlacement(event) {
  const startMin = event.allDay || !event.time ? GRID_START_MIN : timeToMinutes(event.time)
  const endMin = event.allDay || !event.time
    ? startMin + 90
    : timeToMinutes(event.endTime || event.time) + (event.endTime ? 0 : 90)
  const clampedStart = Math.max(startMin, GRID_START_MIN)
  const clampedEnd = Math.min(Math.max(endMin, clampedStart + 45), GRID_END_MIN)
  const top = ((clampedStart - GRID_START_MIN) / 60) * HOUR_HEIGHT
  const height = Math.max(((clampedEnd - clampedStart) / 60) * HOUR_HEIGHT, 52)
  return { top, height }
}

function eventTimeLabel(event) {
  if (event.allDay || !event.time) return 'All Day'
  const end = event.endTime || event.time
  return `${event.time} - ${end}`
}

function TimeGrid({ days, events, todayKey, onOpenEvent }) {
  const [markerMin, setMarkerMin] = useState(6 * 60 + 30)
  const gridRef = useRef(null)
  const isWeek = days.length > 1
  const gridHeight = GRID_HOURS.length * HOUR_HEIGHT
  const nowTop = ((markerMin - GRID_START_MIN) / 60) * HOUR_HEIGHT
  const markerLabel = minutesToLabel(markerMin)
  const colTemplate = isWeek
    ? '48px repeat(7, minmax(88px, 1fr))'
    : '52px minmax(0, 1fr)'

  function updateMarkerFromClientY(clientY) {
    const el = gridRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const y = Math.min(Math.max(clientY - rect.top, 0), gridHeight)
    const rawMin = GRID_START_MIN + (y / HOUR_HEIGHT) * 60
    const snapped = Math.round(rawMin / 30) * 30
    const clamped = Math.min(Math.max(snapped, GRID_START_MIN), GRID_END_MIN)
    setMarkerMin(clamped)
  }

  return (
    <div className="-mx-1 overflow-x-auto overscroll-x-contain sm:mx-0">
      <div
        className={isWeek ? 'min-w-[700px] sm:min-w-[760px]' : 'min-w-0 w-full'}
        style={{ ['--time-col']: isWeek ? '48px' : '52px' }}
      >
        <div
          className="grid border-b border-[#eeeeee]"
          style={{ gridTemplateColumns: colTemplate }}
        >
          <div className="border-r border-[#eeeeee]" />
          {days.map((d) => {
            const key = toKey(d)
            const isToday = key === todayKey
            return (
              <div key={key} className="border-r border-[#eeeeee] px-1 py-2.5 text-center last:border-r-0 sm:px-2 sm:py-3">
                <p className="text-[10px] font-medium tracking-wide text-[#9ca3af] sm:text-[11px]">
                  <span className="sm:hidden">
                    {d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                  </span>
                  <span className="hidden sm:inline">
                    {d.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()}
                  </span>
                </p>
                <p
                  className={`mx-auto mt-1 flex h-7 w-7 items-center justify-center text-[14px] font-semibold sm:mt-1.5 sm:h-9 sm:w-9 sm:text-[16px] ${
                    isToday ? 'rounded-full bg-[#21943A] text-white' : 'text-[#3F434A]'
                  }`}
                >
                  {d.getDate()}
                </p>
              </div>
            )
          })}
        </div>

        <div
          ref={gridRef}
          className="relative grid cursor-pointer"
          style={{ gridTemplateColumns: colTemplate, height: gridHeight }}
          onClick={(e) => {
            if (e.target.closest('[data-event-block]')) return
            updateMarkerFromClientY(e.clientY)
          }}
        >
          <div className="relative border-r border-[#eeeeee]">
            {GRID_HOURS.map((hour) => (
              <div
                key={hour}
                className="absolute right-1 -translate-y-1/2 text-[10px] font-medium text-[#9ca3af] sm:right-2 sm:text-[11px]"
                style={{ top: (hour - 1) * HOUR_HEIGHT }}
              >
                {formatHourLabel(hour)}
              </div>
            ))}
            <div
              className="absolute right-0.5 z-20 -translate-y-1/2 rounded-md bg-[#F07167] px-1 py-0.5 text-[9px] font-semibold text-white transition-[top] duration-200 sm:right-1 sm:px-1.5 sm:text-[10px]"
              style={{ top: nowTop }}
            >
              {markerLabel}
            </div>
          </div>

          {days.map((d) => {
            const key = toKey(d)
            const dayList = events.filter((e) => eventTouchesDay(e, key))
            return (
              <div key={key} className="relative border-r border-[#eeeeee] last:border-r-0">
                {GRID_HOURS.map((hour) => (
                  <div
                    key={`${key}-${hour}`}
                    className="absolute right-0 left-0 border-t border-[#f0f1f3]"
                    style={{ top: (hour - 1) * HOUR_HEIGHT, height: HOUR_HEIGHT }}
                  />
                ))}
                {dayList.map((event) => {
                  const style = CATEGORY_STYLES[event.category] || CATEGORY_STYLES.other
                  const place = getEventPlacement(event)
                  return (
                    <button
                      type="button"
                      data-event-block
                      key={`${event.id}-${key}`}
                      onClick={(e) => onOpenEvent(event, e)}
                      className="absolute right-0.5 left-0.5 z-10 overflow-hidden rounded-lg px-1.5 py-1.5 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:right-1 sm:left-1 sm:px-2.5 sm:py-2"
                      style={{
                        top: place.top,
                        height: place.height,
                        backgroundColor: style.bg,
                        color: style.text,
                        borderLeft: `3px solid ${style.bar}`,
                      }}
                    >
                      <p className="truncate text-[10px] font-medium opacity-80 sm:text-[11px]">{eventTimeLabel(event)}</p>
                      <p className="mt-0.5 truncate text-[11px] font-semibold sm:text-[12px]">{event.title}</p>
                    </button>
                  )
                })}
              </div>
            )
          })}

          <div
            className="pointer-events-none absolute right-0 z-30 border-t-2 border-[#F07167] transition-[top] duration-200"
            style={{ top: nowTop, left: 'var(--time-col)' }}
          />
        </div>
      </div>
    </div>
  )
}

function pad(n) {
  return String(n).padStart(2, '0')
}

function toKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function parseKey(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function startOfWeek(date) {
  const d = new Date(date)
  const day = (d.getDay() + 6) % 7
  d.setDate(d.getDate() - day)
  d.setHours(0, 0, 0, 0)
  return d
}

function addDays(date, amount) {
  const d = new Date(date)
  d.setDate(d.getDate() + amount)
  return d
}

function monthName(year, month) {
  return new Date(year, month, 1).toLocaleString('en-US', { month: 'long' })
}

function buildMonthCells(year, month) {
  const first = new Date(year, month, 1)
  const start = startOfWeek(first)
  const cells = []
  for (let i = 0; i < 42; i += 1) {
    const date = addDays(start, i)
    cells.push({
      date,
      key: toKey(date),
      day: date.getDate(),
      inMonth: date.getMonth() === month,
    })
  }
  return cells
}

function eventTouchesDay(event, key) {
  return event.start <= key && event.end >= key
}

export default function CalendarPage({
  onOpenSettings,
  onOpenChat,
  onOpenDashboard,
  onOpenProducts,
  onOpenOrders,
  onOpenCustomers,
  onLock,
  onLogout,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [cursor, setCursor] = useState(() => new Date(2020, 8, 8))
  const [viewMode, setViewMode] = useState('month')
  const [enabledCats, setEnabledCats] = useState(['important', 'meeting', 'event', 'work', 'other'])
  const [events, setEvents] = useState(INITIAL_EVENTS)
  const [categories, setCategories] = useState(CATEGORIES)
  const [newCalendarOpen, setNewCalendarOpen] = useState(false)
  const [newEventOpen, setNewEventOpen] = useState(false)
  const [dayPopup, setDayPopup] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [eventAnchor, setEventAnchor] = useState({ top: 120, left: 80 })
  const [deleteEventId, setDeleteEventId] = useState(null)

  function openEventDetail(event, e) {
    e?.stopPropagation?.()
    const rect = e?.currentTarget?.getBoundingClientRect?.()
    if (rect) {
      const popupW = Math.min(420, window.innerWidth - 32)
      setEventAnchor({
        top: Math.min(rect.bottom + 10, window.innerHeight - 320),
        left: Math.min(Math.max(16, rect.left), window.innerWidth - popupW - 16),
      })
    }
    setDayPopup(null)
    setSelectedEvent(event)
  }

  function closeEventDetail() {
    setSelectedEvent(null)
  }

  function confirmDeleteEvent() {
    if (deleteEventId == null) return
    setEvents((prev) => prev.filter((ev) => ev.id !== deleteEventId))
    setDeleteEventId(null)
    setSelectedEvent(null)
  }

  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const todayKey = toKey(new Date(2020, 8, 8))

  const cells = useMemo(() => buildMonthCells(year, month), [year, month])

  const visibleEvents = useMemo(
    () => events.filter((e) => enabledCats.includes(e.category)),
    [events, enabledCats],
  )

  function toggleCat(id) {
    setEnabledCats((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  function displayOnlyCat(id) {
    setEnabledCats([id])
  }

  function hideCat(id) {
    setEnabledCats((prev) => prev.filter((x) => x !== id))
  }

  function deleteCat(id) {
    setCategories((prev) => prev.filter((c) => c.id !== id))
    setEnabledCats((prev) => prev.filter((x) => x !== id))
  }

  function changeCatColor(id, color) {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, color } : c)))
  }

  function goToday() {
    setCursor(new Date(2020, 8, 8))
  }

  function goPrev() {
    if (viewMode === 'month') setCursor(new Date(year, month - 1, 1))
    else if (viewMode === 'week') setCursor(addDays(cursor, -7))
    else setCursor(addDays(cursor, -1))
  }

  function goNext() {
    if (viewMode === 'month') setCursor(new Date(year, month + 1, 1))
    else if (viewMode === 'week') setCursor(addDays(cursor, 7))
    else setCursor(addDays(cursor, 1))
  }

  const weekDays = useMemo(() => {
    const start = startOfWeek(cursor)
    return Array.from({ length: 7 }, (_, i) => addDays(start, i))
  }, [cursor])

  const dayEvents = useMemo(() => {
    const key = toKey(cursor)
    return visibleEvents.filter((e) => eventTouchesDay(e, key))
  }, [visibleEvents, cursor])

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f7fb] font-[Poppins,sans-serif] [&_aside]:overflow-visible">
      {sidebarOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeLabel="Calendar"
        showCalendarFilters
        calendarFilters={categories}
        enabledCalendarFilters={enabledCats}
        onToggleCalendarFilter={toggleCat}
        onAddCalendar={() => setNewCalendarOpen(true)}
        onDisplayOnlyCalendar={displayOnlyCat}
        onHideCalendar={hideCat}
        onDeleteCalendar={deleteCat}
        onChangeCalendarColor={changeCatColor}
        onNavigate={(label) => {
          if (label === 'Dashboard') onOpenDashboard?.()
          if (label === 'Chat') onOpenChat?.()
          if (label === 'Products') onOpenProducts?.()
          if (label === 'Orders') onOpenOrders?.()
          if (label === 'Customers') onOpenCustomers?.()
          if (label === 'Calendar') setSidebarOpen(false)
        }}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          onMenuClick={() => setSidebarOpen((v) => !v)}
          onOpenSettings={onOpenSettings}
          onLock={onLock}
          onLogout={onLogout}
        />

        <main className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6">
          <div className="rounded-md border border-[#eeeeee] bg-white p-3 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-5 lg:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-5">
              <h1 className="text-[22px] font-semibold text-[#3F434A] sm:text-[24px]">Calendar</h1>
              <button
                type="button"
                onClick={() => setNewEventOpen(true)}
                className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-md bg-[#21943A] px-4 text-[13px] font-medium text-white hover:bg-[#1a7a3a]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                  <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                </svg>
                Add Event
              </button>
            </div>

            <div className="mb-4 flex flex-col gap-3 sm:mb-4 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
              <div className="flex items-center justify-between gap-2 sm:justify-start">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-[#e5e7eb] text-[#6b7280] hover:bg-[#f8fafc]"
                    aria-label="Previous"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m15 6-6 6 6 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-[#e5e7eb] text-[#6b7280] hover:bg-[#f8fafc]"
                    aria-label="Next"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m9 6 6 6-6 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={goToday}
                    className="h-9 cursor-pointer rounded-md border border-[#e5e7eb] px-3 text-[13px] font-medium text-[#3F434A] hover:bg-[#f8fafc] sm:px-3.5"
                  >
                    Today
                  </button>
                </div>
                <div className="flex items-center rounded-md border border-[#e5e7eb] p-0.5 lg:hidden">
                  {[
                    ['month', 'Month'],
                    ['week', 'Week'],
                    ['day', 'Day'],
                  ].map(([id, label]) => (
                    <button
                      key={`m-${id}`}
                      type="button"
                      onClick={() => setViewMode(id)}
                      className={`h-8 cursor-pointer rounded-[5px] px-2.5 text-[11px] font-medium transition sm:px-3 sm:text-[12px] ${
                        viewMode === id
                          ? 'bg-[#21943A] text-white'
                          : 'bg-transparent text-[#6b7280] hover:text-[#3F434A]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <h2 className="text-center text-[18px] font-semibold text-[#3F434A] sm:text-[22px]">
                {viewMode === 'day' ? (
                  <>
                    {cursor.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}{' '}
                    <span className="text-[13px] font-medium text-[#8392AB] sm:text-[15px]">
                      {cursor.getFullYear()}
                    </span>
                  </>
                ) : viewMode === 'week' ? (
                  <>
                    {weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} –{' '}
                    {weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}{' '}
                    <span className="text-[13px] font-medium text-[#8392AB] sm:text-[15px]">
                      {weekDays[6].getFullYear()}
                    </span>
                  </>
                ) : (
                  <>
                    {monthName(year, month)}{' '}
                    <span className="text-[13px] font-medium text-[#8392AB] sm:text-[15px]">{year}</span>
                  </>
                )}
              </h2>

              <div className="hidden items-center rounded-md border border-[#e5e7eb] p-0.5 lg:flex">
                {[
                  ['month', 'Month'],
                  ['week', 'Week'],
                  ['day', 'Day'],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setViewMode(id)}
                    className={`h-8 cursor-pointer rounded-[5px] px-3.5 text-[13px] font-medium transition ${
                      viewMode === id
                        ? 'bg-[#21943A] text-white'
                        : 'bg-transparent text-[#6b7280] hover:text-[#3F434A]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {viewMode === 'month' ? (
              <div className="-mx-1 overflow-x-auto overscroll-x-contain sm:mx-0">
                <div className="min-w-[640px] sm:min-w-[720px]">
                  <div className="grid grid-cols-7 border-b border-[#eeeeee]">
                    {WEEKDAYS.map((d) => (
                      <div
                        key={d}
                        className="px-1 py-2 text-center text-[10px] font-medium tracking-wide text-[#9ca3af] sm:px-2 sm:py-2.5 sm:text-[11px]"
                      >
                        <span className="sm:hidden">{d.slice(0, 3)}</span>
                        <span className="hidden sm:inline">{d}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 border-l border-[#eeeeee]">
                    {cells.map((cell) => {
                      const dayEventsList = visibleEvents.filter((e) => eventTouchesDay(e, cell.key))
                      const shown = dayEventsList.slice(0, 3)
                      const more = dayEventsList.length - shown.length
                      const isToday = cell.key === todayKey
                      const popupOpen = dayPopup?.key === cell.key
                      return (
                        <div
                          key={cell.key}
                          className={`relative min-h-[96px] border-r border-b border-[#eeeeee] p-1 sm:min-h-[110px] sm:p-1.5 ${
                            cell.inMonth ? 'bg-white' : 'bg-[repeating-linear-gradient(-45deg,#f8fafc,#f8fafc_6px,#f1f3f5_6px,#f1f3f5_12px)]'
                          }`}
                        >
                          <div className="mb-1.5 flex justify-end">
                            <button
                              type="button"
                              onClick={() =>
                                setDayPopup(
                                  dayEventsList.length
                                    ? { key: cell.key, date: cell.date, events: dayEventsList }
                                    : null,
                                )
                              }
                              className={`flex h-7 w-7 cursor-pointer items-center justify-center text-[12px] font-medium ${
                                isToday
                                  ? 'rounded-full bg-[#21943A] text-white'
                                  : cell.inMonth
                                    ? 'text-[#3F434A] hover:bg-[#f3f4f6]'
                                    : 'text-[#9ca3af] hover:bg-[#f3f4f6]'
                              }`}
                            >
                              {cell.day}
                            </button>
                          </div>
                          <div className="space-y-1">
                            {shown.map((event) => {
                              const style = CATEGORY_STYLES[event.category] || CATEGORY_STYLES.other
                              return (
                                <button
                                  type="button"
                                  key={`${event.id}-${cell.key}`}
                                  onClick={(e) => openEventDetail(event, e)}
                                  className="flex w-full cursor-pointer items-center justify-between gap-1 truncate rounded-md border border-transparent px-1.5 py-1 text-left text-[10px] font-medium"
                                  style={{
                                    backgroundColor: style.bg,
                                    color: style.text,
                                    borderLeft: `3px solid ${style.bar}`,
                                  }}
                                  title={event.title}
                                >
                                  <span className="truncate">{event.title}</span>
                                  {event.time ? <span className="shrink-0 opacity-80">{event.time}</span> : null}
                                </button>
                              )
                            })}
                            {more > 0 ? (
                              <button
                                type="button"
                                onClick={() =>
                                  setDayPopup({ key: cell.key, date: cell.date, events: dayEventsList })
                                }
                                className="inline-flex cursor-pointer rounded-md bg-[#E8F1FF] px-1.5 py-0.5 text-[10px] font-medium text-[#4A6AC4] hover:bg-[#dbe7ff]"
                              >
                                +{more}
                              </button>
                            ) : null}
                          </div>

                          {popupOpen ? (
                            <>
                              <button
                                type="button"
                                aria-label="Close day popup"
                                className="fixed inset-0 z-[39] cursor-default bg-black/20 sm:bg-transparent"
                                onClick={() => setDayPopup(null)}
                              />
                              <div className="fixed right-4 bottom-4 left-4 z-[40] max-h-[50vh] overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-[0_20px_50px_rgba(16,24,40,0.22),0_4px_14px_rgba(16,24,40,0.1)] sm:absolute sm:top-8 sm:right-auto sm:bottom-auto sm:left-1/2 sm:max-h-none sm:w-[220px] sm:-translate-x-1/2 sm:p-3">
                                <div className="mb-3 flex items-center justify-between gap-2">
                                  <p className="text-[14px] font-semibold text-[#3F434A]">
                                    {cell.date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric' })}
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() => setDayPopup(null)}
                                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-[#9ca3af] hover:bg-[#f3f4f6]"
                                    aria-label="Close"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                                    </svg>
                                  </button>
                                </div>
                                <div className="max-h-[36vh] space-y-1.5 overflow-y-auto sm:max-h-[220px]">
                                  {dayEventsList.map((event) => {
                                    const style = CATEGORY_STYLES[event.category] || CATEGORY_STYLES.other
                                    return (
                                      <button
                                        type="button"
                                        key={event.id}
                                        onClick={(e) => openEventDetail(event, e)}
                                        className="w-full cursor-pointer rounded-md px-2.5 py-2 text-left text-[12px] font-medium"
                                        style={{
                                          backgroundColor: style.bg,
                                          color: style.text,
                                          borderLeft: `3px solid ${style.bar}`,
                                        }}
                                      >
                                        {event.title}
                                      </button>
                                    )
                                  })}
                                </div>
                              </div>
                            </>
                          ) : null}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : null}

            {viewMode === 'week' ? (
              <TimeGrid
                days={weekDays}
                events={visibleEvents}
                todayKey={todayKey}
                onOpenEvent={openEventDetail}
              />
            ) : null}

            {viewMode === 'day' ? (
              <TimeGrid
                days={[cursor]}
                events={dayEvents}
                todayKey={todayKey}
                onOpenEvent={openEventDetail}
              />
            ) : null}
          </div>
        </main>
      </div>

      {newCalendarOpen ? (
        <NewCalendarModal
          onClose={() => setNewCalendarOpen(false)}
          onCreate={({ name, color }) => {
            const id = `custom-${Date.now()}`
            setCategories((prev) => [...prev, { id, label: name, color }])
            setEnabledCats((prev) => [...prev, id])
          }}
        />
      ) : null}

      {newEventOpen ? (
        <NewEventModal
          calendars={categories}
          onClose={() => setNewEventOpen(false)}
          onCreate={(event) => {
            setEvents((prev) => [
              ...prev,
              {
                id: Date.now(),
                title: event.title,
                category: event.category,
                start: event.start,
                end: event.end,
                time: event.time,
                description: event.description || DEFAULT_DESC,
                allDay: event.allDay,
              },
            ])
            if (!enabledCats.includes(event.category)) {
              setEnabledCats((prev) => [...prev, event.category])
            }
          }}
        />
      ) : null}

      {selectedEvent ? (
        <EventDetailPopup
          event={selectedEvent}
          categoryLabel={categories.find((c) => c.id === selectedEvent.category)?.label}
          anchor={eventAnchor}
          onClose={closeEventDetail}
          onEdit={() => {
            closeEventDetail()
            setNewEventOpen(true)
          }}
          onDelete={() => setDeleteEventId(selectedEvent.id)}
        />
      ) : null}

      {deleteEventId != null ? (
        <DeleteEventModal
          onCancel={() => setDeleteEventId(null)}
          onConfirm={confirmDeleteEvent}
        />
      ) : null}
    </div>
  )
}
