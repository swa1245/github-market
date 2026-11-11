import { useEffect, useState } from 'react'
import editIcon from '../../assets/images/edit.png'
import deleteIcon from '../../assets/images/Delete.png'
import calendarIcon from '../../assets/images/Calendar.svg'
import alignLeftIcon from '../../assets/images/Align-Left.png'

const CATEGORY_COLORS = {
  important: '#F07167',
  meeting: '#54D1DB',
  event: '#7BC67E',
  work: '#F2C94C',
  other: '#8B9CB3',
}

function IconBtn({ onClick, label, children, boxed = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-[#8392AB] transition-colors hover:bg-[#f3f4f6] hover:text-[#6b7280] sm:h-10 sm:w-10 ${
        boxed ? 'bg-[#f1f3f5] shadow-[0_1px_2px_rgba(16,24,40,0.06)]' : ''
      }`}
    >
      {children}
    </button>
  )
}

function parseKey(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function formatDayLabel(key) {
  return parseKey(key).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

function formatTimeRange(event) {
  if (event.allDay || (!event.time && !event.endTime)) {
    return 'All Day'
  }
  const start = event.time || '00:00'
  const end = event.endTime || start
  return `${start} – ${end}`
}

export default function EventDetailPopup({
  event,
  categoryLabel,
  anchor,
  onClose,
  onEdit,
  onDelete,
}) {
  const color = CATEGORY_COLORS[event.category] || CATEGORY_COLORS.other
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false,
  )

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 640)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const width = Math.min(420, typeof window !== 'undefined' ? window.innerWidth - 32 : 420)
  const left = isMobile
    ? Math.max(16, (window.innerWidth - width) / 2)
    : Math.min(Math.max(16, anchor?.left ?? 80), window.innerWidth - width - 16)
  const top = isMobile
    ? undefined
    : Math.min(Math.max(16, anchor?.top ?? 100), window.innerHeight - 360)

  return (
    <>
      <button
        type="button"
        aria-label="Close event"
        className="fixed inset-0 z-[60] cursor-default bg-black/20 sm:bg-transparent"
        onClick={onClose}
      />
      <div
        className={`fixed z-[70] max-h-[min(90vh,560px)] overflow-y-auto rounded-[20px] border border-[#eef0f3] bg-white px-5 py-5 shadow-[0_24px_60px_rgba(16,24,40,0.18),0_8px_20px_rgba(16,24,40,0.08)] sm:px-7 sm:py-6 ${
          isMobile
            ? 'top-1/2 left-1/2 w-[min(420px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2'
            : 'w-[min(420px,calc(100vw-32px))]'
        }`}
        style={isMobile ? undefined : { top, left, width }}
      >
        <div className="mb-5 flex items-center justify-end gap-1.5 sm:mb-6 sm:gap-3">
          <IconBtn onClick={onEdit} label="Edit">
            <img src={editIcon} alt="" className="h-7 w-7 object-contain sm:h-8 sm:w-8" />
          </IconBtn>
          <IconBtn onClick={onDelete} label="Delete">
            <img src={deleteIcon} alt="" className="h-5 w-5 object-contain sm:h-6 sm:w-6" />
          </IconBtn>
          <IconBtn label="More">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="sm:h-[22px] sm:w-[22px]">
              <circle cx="5" cy="12" r="1.85" />
              <circle cx="12" cy="12" r="1.85" />
              <circle cx="19" cy="12" r="1.85" />
            </svg>
          </IconBtn>
          <IconBtn onClick={onClose} label="Close" boxed>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </IconBtn>
        </div>

        <div className="mb-4 flex items-center gap-3 sm:mb-5 sm:gap-3.5">
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[6px]"
            style={{ backgroundColor: color }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5L20 7" />
            </svg>
          </span>
          <p className="text-[18px] leading-snug font-semibold tracking-[-0.01em] text-[#3F434A] sm:text-[22px]">
            {event.title}
          </p>
        </div>

        <div className="mb-4 flex items-start gap-3 sm:mb-5 sm:gap-3.5">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center text-[#8392AB]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="8.25" />
              <path strokeLinecap="round" d="M12 8v4.25l2.75 1.75" />
            </svg>
          </span>
          <p className="pt-0.5 text-[13px] leading-relaxed font-medium text-[#6b7280] sm:text-[15px]">
            {formatDayLabel(event.start)}
            <span className="mx-2 text-[#c4c9d4]">•</span>
            {formatTimeRange(event)}
          </p>
        </div>

        <div className="mb-4 flex items-start gap-3 sm:mb-5 sm:gap-3.5">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center">
            <img src={alignLeftIcon} alt="" className="h-5 w-5 object-contain opacity-70" />
          </span>
          <p className="pt-0.5 text-[13px] leading-[1.7] text-[#8392AB] sm:text-[15px]">
            {event.description ||
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
          </p>
        </div>

        <div className="flex items-center gap-3 sm:gap-3.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center">
            <img src={calendarIcon} alt="" className="h-5 w-5 object-contain opacity-70" />
          </span>
          <p className="text-[13px] font-medium text-[#6b7280] sm:text-[15px]">{categoryLabel || 'Important'}</p>
        </div>
      </div>
    </>
  )
}
