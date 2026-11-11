import { useEffect, useRef, useState } from 'react'
import flowerLogo from '../../assets/images/Vector.svg'
import cartIcon from '../../assets/images/shopping-cart-01.png'
import chatIcon from '../../assets/images/comment-01.png'
import fileIcon from '../../assets/images/file-02.png'
import notesIcon from '../../assets/images/notebook-02.png'
import contactsIcon from '../../assets/images/contact-02.png'
import projectsIcon from '../../assets/images/projector.png'
import taskIcon from '../../assets/images/task-01.png'
import calendarIcon from '../../assets/images/Calendar.svg'
import homeIcon from '../../assets/images/home-08.png'
import settingsIcon from '../../assets/images/Settings.png'
import deleteIcon from '../../assets/images/Delete.png'
import {
  IconChevron,
  IconMail,
  IconSearch,
} from './icons'

const calendarMenuColors = [
  '#F07167',
  '#54D1DB',
  '#F2C94C',
  '#21943A',
  '#38BDF8',
  '#86EFAC',
  '#A3E635',
  '#B07CFF',
  '#F472B6',
  '#C4C9D1',
]

const ecommerceSubs = ['Products', 'Orders', 'Customers']

const navItems = [
  { label: 'Dashboard', image: homeIcon },
  { label: 'Task', image: taskIcon },
  { label: 'E-Commerce', image: cartIcon, hasSub: true },
  { label: 'Calendar', image: calendarIcon },
  { label: 'Mail', icon: IconMail, badge: 8 },
  { label: 'Chat', image: chatIcon },
  { label: 'Projects', image: projectsIcon },
  { label: 'File Manager', image: fileIcon },
  { label: 'Notes', image: notesIcon },
  { label: 'Contacts', image: contactsIcon },
]

export default function Sidebar({
  open = false,
  onClose,
  activeLabel = 'Dashboard',
  onNavigate,
  showCalendarFilters = false,
  calendarFilters = [],
  enabledCalendarFilters = [],
  onToggleCalendarFilter,
  onAddCalendar,
  onDisplayOnlyCalendar,
  onHideCalendar,
  onDeleteCalendar,
  onChangeCalendarColor,
}) {
  const [ecommerceOpen, setEcommerceOpen] = useState(
    activeLabel === 'E-Commerce' || ecommerceSubs.includes(activeLabel),
  )
  const [activeSub, setActiveSub] = useState(
    ecommerceSubs.includes(activeLabel) ? activeLabel : 'Products',
  )
  const [calendarMenuId, setCalendarMenuId] = useState(null)
  const calendarMenuRef = useRef(null)

  useEffect(() => {
    if (!calendarMenuId) return undefined
    function onDocClick(e) {
      if (calendarMenuRef.current && !calendarMenuRef.current.contains(e.target)) {
        setCalendarMenuId(null)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [calendarMenuId])

  const ecommerceActive =
    activeLabel === 'E-Commerce' || ecommerceSubs.includes(activeLabel) || ecommerceOpen

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[min(250px,85vw)] shrink-0 flex-col overflow-visible border-r border-[#eceff3] bg-white px-3 py-5 transition-transform duration-200 sm:px-4 lg:static lg:z-auto lg:w-[250px] lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="mb-6 flex items-center justify-between gap-2 px-2">
        <div className="flex items-center gap-2.5">
          <img src={flowerLogo} alt="FLOWER" className="h-8 w-8" />
          <span className="text-[18px] font-bold tracking-wide text-[#1f2937]">FLOWER</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-lg p-1.5 text-[#6b7280] hover:bg-[#f3f4f6] lg:hidden"
          aria-label="Close sidebar"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div className="relative mb-5">
        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#9ca3af]">
          <IconSearch />
        </span>
        <input
          type="text"
          placeholder="Search anything"
          className="w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] py-2.5 pr-3 pl-10 text-[13px] text-[#374151] outline-none placeholder:text-[#9ca3af] focus:border-[#86efac]"
        />
      </div>

      <nav className="flex min-h-0 flex-1 flex-col overflow-visible">
        <div className="min-h-0 flex-1 space-y-1 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const Icon = item.icon
          const isEcommerce = item.label === 'E-Commerce'
          const isActive = isEcommerce
            ? ecommerceActive
            : item.label === activeLabel && !ecommerceSubs.includes(activeLabel)

          if (isEcommerce) {
            return (
              <div key={item.label}>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`h-6 w-1 shrink-0 rounded-full ${
                      ecommerceOpen || isActive ? 'bg-[#21943A]' : 'bg-transparent'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setEcommerceOpen((open) => {
                        if (!open) {
                          setActiveSub('Products')
                          onNavigate?.('Products')
                        }
                        return !open
                      })
                    }}
                    className={`flex min-w-0 flex-1 cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[14px] font-medium transition ${
                      ecommerceOpen || isActive
                        ? 'bg-[#B9EB8E] text-[#0D1B2A]'
                        : 'text-[#4b5563] hover:bg-[#f3f4f6]'
                    }`}
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[#0D1B2A]">
                      <img src={item.image} alt="" className="h-5 w-5 object-contain" />
                    </span>
                    <span className="flex-1 truncate">{item.label}</span>
                    <span
                      className={`text-[#0D1B2A] transition-transform ${
                        ecommerceOpen ? 'rotate-[-90deg]' : 'rotate-90'
                      }`}
                    >
                      <IconChevron />
                    </span>
                  </button>
                </div>

                {ecommerceOpen ? (
                  <div className="mt-1 ml-[10px] space-y-1 pl-3">
                    {ecommerceSubs.map((sub) => {
                      const subActive = activeSub === sub
                      return (
                        <button
                          key={sub}
                          type="button"
                          onClick={() => {
                            setActiveSub(sub)
                            onNavigate?.(sub)
                            onClose?.()
                          }}
                          className={`flex w-full cursor-pointer items-center gap-3 rounded-md px-4 py-2.5 text-left text-[13px] font-medium transition ${
                            subActive
                              ? 'bg-[#FBF3D8] text-[#1f2937]'
                              : 'bg-transparent text-[#6b7280] hover:bg-[#f3f4f6]'
                          }`}
                        >
                          <span
                            className={`h-[6px] w-[6px] shrink-0 rounded-full ${
                              subActive ? 'bg-black' : 'bg-[#c4c9d1]'
                            }`}
                          />
                          <span>{sub}</span>
                        </button>
                      )
                    })}
                  </div>
                ) : null}
              </div>
            )
          }

          return (
            <div key={item.label} className="flex items-center gap-1.5">
              <span
                className={`h-6 w-1 shrink-0 rounded-full ${
                  isActive ? 'bg-[#21943A]' : 'bg-transparent'
                }`}
              />
              <button
                type="button"
                onClick={() => {
                  setEcommerceOpen(false)
                  onNavigate?.(item.label)
                  onClose?.()
                }}
                className={`flex min-w-0 flex-1 cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[14px] font-medium transition ${
                  isActive
                    ? 'bg-[#B9EB8E] text-[#0D1B2A]'
                    : 'text-[#4b5563] hover:bg-[#f3f4f6]'
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center ${
                    isActive ? 'text-[#0D1B2A]' : 'text-[#6b7280]'
                  }`}
                >
                  {item.image ? (
                    <img src={item.image} alt="" className="h-5 w-5 object-contain" />
                  ) : (
                    <Icon active={isActive} />
                  )}
                </span>
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge ? (
                  <span className="rounded-full bg-[#ef4444] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            </div>
          )
        })}
        </div>

        {showCalendarFilters ? (
          <div className="relative z-[60] mt-3 shrink-0 overflow-visible border-t border-[#eeeeee] pt-3">
            <div className="mb-2.5 flex items-center justify-between px-1">
              <p className="text-[12px] font-semibold tracking-[0.12em] text-[#9ca3af] uppercase">
                Calendars
              </p>
              <button
                type="button"
                onClick={() => {
                  setCalendarMenuId(null)
                  onAddCalendar?.()
                }}
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-[#f3f4f6] text-[#6b7280] hover:bg-[#e5e7eb] hover:text-[#3F434A]"
                aria-label="Add calendar"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>
            <div className="space-y-0.5">
              {calendarFilters.map((filter) => {
                const checked = enabledCalendarFilters.includes(filter.id)
                const menuOpen = calendarMenuId === filter.id
                return (
                  <div key={filter.id} className="relative">
                    <div className="group flex items-center gap-1 rounded-lg px-1 py-1.5 hover:bg-[#f8fafc]">
                      <button
                        type="button"
                        onClick={() => onToggleCalendarFilter?.(filter.id)}
                        className="flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 text-left"
                      >
                        <span
                          className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px]"
                          style={{
                            backgroundColor: checked ? filter.color : 'transparent',
                            border: checked ? 'none' : `1.5px solid ${filter.color}`,
                          }}
                          aria-hidden
                        >
                          {checked ? (
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5L20 7" />
                            </svg>
                          ) : null}
                        </span>
                        <span className="truncate text-[13px] font-medium text-[#3F434A]">{filter.label}</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setCalendarMenuId((id) => (id === filter.id ? null : filter.id))
                        }}
                        className={`flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-[#9ca3af] hover:bg-[#f3f4f6] hover:text-[#6b7280] ${
                          menuOpen ? 'bg-[#f3f4f6] text-[#6b7280] opacity-100' : 'opacity-100 sm:opacity-0 sm:group-hover:opacity-100'
                        }`}
                        aria-label={`${filter.label} menu`}
                        aria-expanded={menuOpen}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <circle cx="12" cy="5" r="1.6" />
                          <circle cx="12" cy="12" r="1.6" />
                          <circle cx="12" cy="19" r="1.6" />
                        </svg>
                      </button>
                    </div>

                    {menuOpen ? (
                      <div
                        ref={calendarMenuRef}
                        className="absolute right-0 bottom-[calc(100%-4px)] z-[90] w-[210px] rounded-2xl border border-[#e5e7eb] bg-white py-2 shadow-[0_16px_40px_rgba(16,24,40,0.18)]"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            onDisplayOnlyCalendar?.(filter.id)
                            setCalendarMenuId(null)
                          }}
                          className="flex w-full cursor-pointer items-center gap-3 px-3.5 py-2.5 text-left text-[13px] font-medium text-[#6b7280] hover:bg-[#f3f4f6]"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Display this Only
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onHideCalendar?.(filter.id)
                            setCalendarMenuId(null)
                          }}
                          className="flex w-full cursor-pointer items-center gap-3 px-3.5 py-2.5 text-left text-[13px] font-medium text-[#6b7280] hover:bg-[#f3f4f6]"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.6 10.6A3 3 0 0 0 12 15a3 3 0 0 0 2.4-4.8" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.9 5.1A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a16.7 16.7 0 0 1-3.2 4.1M6.1 6.1A16.8 16.8 0 0 0 2 12s3.5 7 10 7a10.4 10.4 0 0 0 4.1-.8" />
                          </svg>
                          Hide from List
                        </button>
                        <button
                          type="button"
                          onClick={() => setCalendarMenuId(null)}
                          className="flex w-full cursor-pointer items-center gap-3 px-3.5 py-2.5 text-left text-[13px] font-medium text-[#6b7280] hover:bg-[#f3f4f6]"
                        >
                          <img src={settingsIcon} alt="" className="h-4 w-4 object-contain opacity-70" />
                          Settings
                        </button>
                        <div className="my-1 border-t border-[#eeeeee]" />
                        <button
                          type="button"
                          onClick={() => {
                            onDeleteCalendar?.(filter.id)
                            setCalendarMenuId(null)
                          }}
                          className="flex w-full cursor-pointer items-center gap-3 px-3.5 py-2.5 text-left text-[13px] font-medium text-[#F07167] hover:bg-[#FDE8E6]"
                        >
                          <img
                            src={deleteIcon}
                            alt=""
                            className="h-4 w-4 object-contain"
                            style={{ filter: 'invert(48%) sepia(42%) saturate(1200%) hue-rotate(314deg) brightness(98%)' }}
                          />
                          Delete Calendar
                        </button>
                        <div className="my-1 border-t border-[#eeeeee]" />
                        <div className="grid grid-cols-5 gap-2.5 px-3.5 pt-2 pb-3">
                          {calendarMenuColors.map((color) => {
                            const selected = filter.color.toLowerCase() === color.toLowerCase()
                            return (
                              <button
                                key={color}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onChangeCalendarColor?.(filter.id, color)
                                  setCalendarMenuId(null)
                                }}
                                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-black/5"
                                style={{ backgroundColor: color }}
                                aria-label={`Set color ${color}`}
                              >
                                {selected ? (
                                  <span className="h-1.5 w-1.5 rounded-full bg-white shadow-sm" />
                                ) : null}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </div>
        ) : null}
      </nav>
    </aside>
  )
}
