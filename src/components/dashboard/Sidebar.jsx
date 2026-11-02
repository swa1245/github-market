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
import {
  IconChevron,
  IconMail,
  IconSearch,
} from './icons'

const navItems = [
  { label: 'Dashboard', image: homeIcon, active: true },
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

export default function Sidebar({ open = false, onClose }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[min(250px,85vw)] shrink-0 flex-col overflow-hidden border-r border-[#eceff3] bg-white px-3 py-5 transition-transform duration-200 sm:px-4 lg:static lg:z-auto lg:w-[250px] lg:translate-x-0 ${
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

      <nav className="flex-1 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="flex items-center gap-1.5">
              <span
                className={`h-6 w-1 shrink-0 rounded-full ${
                  item.active ? 'bg-[#21943A]' : 'bg-transparent'
                }`}
              />
              <button
                type="button"
                onClick={onClose}
                className={`flex min-w-0 flex-1 cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[14px] font-medium transition ${
                  item.active
                    ? 'bg-[#B9EB8E] text-[#0D1B2A]'
                    : 'text-[#4b5563] hover:bg-[#f3f4f6]'
                }`}
              >
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center ${item.active ? 'text-[#0D1B2A]' : 'text-[#6b7280]'}`}>
                  {item.image ? (
                    <img src={item.image} alt="" className="h-5 w-5 object-contain" />
                  ) : (
                    <Icon active={item.active} />
                  )}
                </span>
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge ? (
                  <span className="rounded-full bg-[#ef4444] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    {item.badge}
                  </span>
                ) : null}
                {item.hasSub ? (
                  <span className="text-[#9ca3af]">
                    <IconChevron />
                  </span>
                ) : null}
              </button>
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
