import { useEffect, useRef, useState } from 'react'
import avatar from '../../assets/images/user-avatar.svg'
import notificationIcon from '../../assets/images/notification-01.svg'
import searchIcon from '../../assets/images/search-01.svg'
import arrowDownIcon from '../../assets/images/arrow-down-01.png'
import menuIcon from '../../assets/images/Align-Left.png'
import lockIcon from '../../assets/images/Lock1.svg'
import settingsIcon from '../../assets/images/Settings.png'

const initialNotifications = [
  { id: 1, name: 'Regina Cooper', time: '1 min ago' },
  { id: 2, name: 'Judith Black', time: '5 min ago' },
  { id: 3, name: 'Ronald Robertson', time: '3 hour ago' },
  { id: 4, name: 'Dustin Williamson', time: '15 hour ago' },
  { id: 5, name: 'Calvin Flores', time: 'Yesterday' },
  { id: 6, name: 'Robert Edwards', time: 'Yesterday' },
]

function IconUser() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.5" />
      <path strokeLinecap="round" d="M5.5 19a6.5 6.5 0 0 1 13 0" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
    </svg>
  )
}

function IconClipboard() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path strokeLinecap="round" d="M9 4.5h6M9 10h6M9 14h4" />
    </svg>
  )
}

function IconLogout() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 7V5a2 2 0 0 1 2-2h7v18h-7a2 2 0 0 1-2-2v-2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H3m0 0 3-3m-3 3 3 3" />
    </svg>
  )
}

const profileMenuTop = [
  { label: 'My Profile', icon: IconUser },
  { label: 'My Messages', icon: IconMail },
  { label: 'My Tasks', icon: IconClipboard },
]

export default function Header({
  onMenuClick,
  onOpenSettings,
  onLock,
  onLogout,
  hideMenu,
  actionsOnly,
}) {
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifications, setNotifications] = useState(initialNotifications)
  const notifRef = useRef(null)
  const profileRef = useRef(null)

  useEffect(() => {
    function onDocClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  function dismiss(id) {
    setNotifications((list) => list.filter((n) => n.id !== id))
  }

  const actions = (
      <div className="flex items-center gap-3 sm:gap-4">
        <button type="button" className="cursor-pointer">
          <img src={searchIcon} alt="" className="h-5 w-5" />
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => {
              setNotifOpen((v) => !v)
              setProfileOpen(false)
            }}
            className={`relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl ${
              notifOpen ? 'bg-[#f3f4f6]' : 'hover:bg-[#f3f4f6]'
            }`}
            aria-label="Notifications"
            aria-expanded={notifOpen}
          >
            <img src={notificationIcon} alt="" className="h-5 w-5" />
            {notifications.length > 0 ? (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#ef4444]" />
            ) : null}
          </button>

          {notifOpen ? (
            <div className="absolute top-full right-0 z-50 mt-2 w-[min(320px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_16px_48px_rgba(16,24,40,0.22),0_4px_12px_rgba(16,24,40,0.08)] ring-1 ring-black/5">
              <div className="flex items-center gap-2 border-b border-[#e8eaed] bg-[#fafbfc] px-4 py-3.5">
                <h3 className="text-[15px] font-semibold text-[#1f2937]">Notifications</h3>
                <span className="rounded-md bg-[#ef4444] px-1.5 py-0.5 text-[11px] font-semibold text-white">
                  8
                </span>
              </div>
              <ul className="max-h-[360px] overflow-y-auto bg-white py-1">
                {notifications.map((item) => (
                  <li key={item.id} className="group">
                    <div className="flex items-center gap-3 px-4 py-3 transition hover:bg-[#f3f4f6]">
                      <div className="relative shrink-0">
                        <img src={avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                        <span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#22c55e]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-semibold text-[#1f2937]">{item.name}</p>
                        <p className="text-[12px] text-[#9ca3af]">{item.time}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => dismiss(item.id)}
                        className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#9ca3af] opacity-0 transition group-hover:opacity-100 hover:bg-[#e5e7eb]"
                        aria-label={`Dismiss ${item.name}`}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path strokeLinecap="round" d="M1 1l8 8M9 1L1 9" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* ArtTemplate profile */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => {
              setProfileOpen((v) => !v)
              setNotifOpen(false)
            }}
            className={`flex cursor-pointer items-center gap-2 rounded-xl px-1.5 py-1 sm:gap-3 ${
              profileOpen ? 'bg-[#f3f4f6]' : 'hover:bg-[#f3f4f6]'
            }`}
            aria-expanded={profileOpen}
            aria-label="Account menu"
          >
            <img
              src={avatar}
              alt="ArtTemplate"
              className="h-8 w-8 rounded-full object-cover sm:h-9 sm:w-9"
            />
            <span className="hidden text-[14px] font-semibold text-[#1e293b] sm:inline">
              ArtTemplate
            </span>
            <img
              src={arrowDownIcon}
              alt=""
              className={`hidden h-3 w-3 object-contain transition sm:block ${
                profileOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {profileOpen ? (
            <div className="absolute top-full right-0 z-50 mt-2 w-[240px] overflow-hidden rounded-2xl border border-[#e5e7eb] bg-[#fafbfc] shadow-[0_16px_48px_rgba(16,24,40,0.22),0_4px_12px_rgba(16,24,40,0.08)] ring-1 ring-black/5">
              <div className="flex flex-col items-center bg-white px-4 pt-5 pb-4">
                <img src={avatar} alt="" className="mb-3 h-14 w-14 rounded-full object-cover" />
                <p className="text-[15px] font-semibold text-[#1f2937]">ArtTemplate</p>
                <p className="text-[12px] text-[#9ca3af]">Manager</p>
              </div>

              <div className="bg-white px-2 pb-2">
                {profileMenuTop.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.label}
                      type="button"
                      className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium text-[#4b5563] hover:bg-[#f3f4f6]"
                    >
                      <span className="text-[#6b7280]">
                        <Icon />
                      </span>
                      {item.label}
                    </button>
                  )
                })}
              </div>

              <div className="border-t border-[#e8eaed] bg-white px-2 py-2">
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false)
                    onOpenSettings?.()
                  }}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-xl bg-[#eef0f3] px-3 py-2.5 text-left text-[13px] font-medium text-[#1f2937]"
                >
                  <img src={settingsIcon} alt="" className="h-[18px] w-[18px] object-contain" />
                  Settings
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false)
                    onLock?.()
                  }}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium text-[#4b5563] hover:bg-[#f3f4f6]"
                >
                  <img src={lockIcon} alt="" className="h-[18px] w-[18px] object-contain opacity-70" />
                  Lock Screen
                </button>
              </div>

              <div className="border-t border-[#e8eaed] bg-white px-2 py-2">
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false)
                    onLogout?.()
                  }}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium text-[#4b5563] hover:bg-[#f3f4f6]"
                >
                  <span className="text-[#6b7280]">
                    <IconLogout />
                  </span>
                  Logout
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
  )

  if (actionsOnly) {
    return <div className="relative flex items-center">{actions}</div>
  }

  return (
    <header className="relative flex h-14 shrink-0 items-center justify-between border-b border-[#eceff3] bg-white px-4 sm:h-16 sm:px-6">
      {hideMenu ? (
        <div />
      ) : (
        <button
          type="button"
          onClick={onMenuClick}
          className="cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <img src={menuIcon} alt="" className="h-5 w-5 object-contain" />
        </button>
      )}
      {actions}
    </header>
  )
}
