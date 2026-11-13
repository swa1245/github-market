import { useMemo, useState } from 'react'
import Header from '../../components/dashboard/Header'
import Sidebar from '../../components/dashboard/Sidebar'
import circleAvatar from '../../assets/images/circle-avatar.png'
import pdfIcon from '../../assets/images/PDF 3.png'
import psdIcon from '../../assets/images/PSD 3.png'
import sketchIcon from '../../assets/images/sketch.png'
import figmaIcon from '../../assets/images/figma.png'
import photoMosaic from '../../assets/images/Attachment (1).png'
import photoDesert from '../../assets/images/Attachment (2).png'
import photoWater from '../../assets/images/Attachment3.png'
import attachmentIcon from '../../assets/images/Attachment.png'
import downloadIcon from '../../assets/images/Download.svg'
import editIcon from '../../assets/images/edit.png'
import deleteIcon from '../../assets/images/Delete.png'

const teams = [
  {
    id: 'managers',
    name: '#Managers',
    letter: 'M',
    color: '#d7f4f8',
    text: '#3aa8c1',
    preview: 'Hello, Mark! I am writing to introduce...',
  },
  {
    id: 'designers',
    name: '#Designers',
    letter: 'D',
    color: '#d9f6e6',
    text: '#3cba6e',
    preview: 'Hello, Mark! Can you drop the photos...',
    badge: 4,
  },
]

const people = [
  { id: 'dustin', name: 'Dustin Williamson', role: 'Product Designer', preview: 'Hello, Mark! I am writing to introduce...' },
  { id: 'jane', name: 'Jane Wilson', role: 'Creative Director', preview: 'We use the Arts as a means of touc...', badge: 4 },
  { id: 'regina', name: 'Regina Cooper', role: 'Project Manager', preview: 'The Arts play a large role in the expr...' },
  { id: 'brandon', name: 'Brandon Pena', role: 'Frontend Developer', preview: 'The arts allow us to be as specific or...' },
  { id: 'jacob', name: 'Jacob Hawkins', role: 'UI/UX Designer', preview: 'From dance and music to abstract...' },
  { id: 'shane', name: 'Shane Black', role: 'Marketing Lead', preview: 'The arts teach us how to communic...' },
  { id: 'priscilla', name: 'Priscilla Edwards', role: 'Content Writer', preview: 'Concept of life is shown through the...' },
  { id: 'kristin', name: 'Kristin Mccoy', role: 'Illustrator', preview: 'Inner thoughts and beauty in my life...' },
  { id: 'bruce', name: 'Bruce Russell', role: 'Art Director', preview: 'We use the Arts as a means of touc...' },
]

const janeThread = [
  { id: 1, from: 'them', text: 'Hi Cody, any progress on the project? 😊', time: '1 day ago' },
  {
    id: 2,
    from: 'me',
    text: 'Hi Jane!\nYes. I just finished developing the "Chat" template.',
    time: '1 day ago',
    images: true,
  },
  {
    id: 3,
    from: 'them',
    text: 'It looks amazing. 😍\nThe customer will be very satisfied.',
    time: '1 day ago',
  },
  {
    id: 4,
    from: 'me',
    text: 'Thank you, glad you liked it.\nSend me Styles Guide.',
    time: '1 day ago',
    tools: true,
  },
  { id: 5, type: 'date', text: 'Today' },
  {
    id: 6,
    from: 'them',
    file: { name: 'Brand Styles Guide.pdf', size: '487 KB' },
    time: '2 min ago',
  },
  { id: 7, from: 'me', text: "I'll see later", time: '1 min ago' },
]

const designersThread = [
  { id: 1, name: 'Jane Wilson', text: 'Hi Cody, any progress on the project? 😊', time: '1 day ago' },
  {
    id: 2,
    name: 'Jacob Hawkins',
    text: 'Hi Jane!\nYes. I just finished developing the "Chat" template.',
    time: '1 day ago',
    images: true,
  },
  {
    id: 3,
    name: 'Jane Wilson',
    text: 'It looks amazing.\nThe customer will be very satisfied. 😍',
    time: '1 day ago',
  },
  {
    id: 4,
    name: 'Jacob Hawkins',
    text: 'Thank you, glad you liked it. Send me Styles Guide.',
    time: '1 day ago',
  },
  { id: 5, type: 'date', text: 'Today' },
  {
    id: 6,
    name: 'Jane Wilson',
    time: '2 min ago',
    file: { name: 'Brand Styles Guide.pdf', size: '487 KB', icon: pdfIcon },
  },
  { id: 7, name: 'Jacob Hawkins', text: "I'll see later", time: '1 min ago' },
  {
    id: 8,
    name: 'Jane Wilson',
    time: '1 min ago',
    file: { name: 'Rocket – Admin Dashboard.fig', size: '8.2 MB', icon: figmaIcon, compact: true },
  },
  { id: 9, name: 'Jane Wilson', text: 'OK, Thank You Jacob 😊', time: '1 min ago' },
]

const popularEmojis = ['😂', '😊', '😎', '😉', '😍', '😮']
const smileyEmojis = [
  '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '🙂',
  '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗',
  '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭',
  '🤔', '🤐', '🤨', '😐', '😏', '😒', '🙄', '😬',
  '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕',
  '😎', '🤓', '😕', '😮', '😲', '😳', '🥺', '😢',
  '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫',
]

const chatFiles = [
  { name: 'Brand Styles Guide.pdf', size: '487KB', icon: pdfIcon },
  { name: 'Dashboard UI Kit.psd', size: '2.5MB', icon: psdIcon },
  { name: 'Rocket – Admin Dashboard', size: '4.2MB', icon: sketchIcon, compact: true },
  { name: 'Rocket – Admin Dashboard', size: '4.2MB', icon: figmaIcon, compact: true },
]

const personInfo = [
  { label: 'Email', value: 'example@mail.com' },
  { label: 'Phone', value: '+123-4567-8800' },
  { label: 'Birthday', value: '17 March, 1995' },
  { label: 'Location', value: 'New York, NY' },
]

const chatPhotos = [photoWater, photoMosaic, photoDesert]
const mediaPhotos = [photoWater, photoDesert, photoMosaic, photoMosaic, photoDesert, photoWater]

const invitePeople = [
  { id: 'regina', name: 'Regina Cooper' },
  { id: 'jane-1', name: 'Jane Wilson' },
  { id: 'jane-2', name: 'Jane Wilson' },
  { id: 'dustin', name: 'Dustin Williamsonk' },
  { id: 'brandon', name: 'Brandon Pena' },
]

const chatMembers = [
  { name: 'Jacob Hawkins', role: 'UI/UX Designer' },
  { name: 'Regina Cooper', role: 'Project Manager' },
  { name: 'Jane Wilson', role: 'Product Designer' },
]

function Dots() {
  return (
    <span className="mb-2 flex shrink-0 items-center gap-0.5 text-[#c5cad3]" aria-hidden>
      <span className="h-[3px] w-[3px] rounded-full bg-current" />
      <span className="h-[3px] w-[3px] rounded-full bg-current" />
      <span className="h-[3px] w-[3px] rounded-full bg-current" />
    </span>
  )
}

function Bubble({ mine, children }) {
  return (
    <div
      className={`max-w-full px-3.5 py-2.5 text-[13px] leading-relaxed break-words whitespace-pre-line ${
        mine
          ? 'rounded-[18px] rounded-br-[6px] border border-[#eceff3] bg-white text-[#6b7280]'
          : 'rounded-[18px] rounded-bl-[6px] bg-[#21943A] text-white'
      }`}
    >
      {children}
    </div>
  )
}

export default function ChatPage({
  onOpenSettings,
  onLock,
  onLogout,
  onOpenDashboard,
  onOpenProducts,
  onOpenOrders,
  onOpenCustomers,
  onOpenCalendar,
  onOpenMail,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeId, setActiveId] = useState('designers')
  const [pane, setPane] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches ? 'list' : 'chat',
  )
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [threads, setThreads] = useState({ jane: janeThread, designers: designersThread })
  const [uploadOpen, setUploadOpen] = useState(true)
  const [draft, setDraft] = useState('')
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [emojiQuery, setEmojiQuery] = useState('')
  const [inviteOpen, setInviteOpen] = useState(false)
  const [inviteQuery, setInviteQuery] = useState('')
  const [inviteChip, setInviteChip] = useState('Shane Black')
  const [checkedIds, setCheckedIds] = useState(() => new Set(invitePeople.map((person) => person.id)))

  const activePerson = people.find((p) => p.id === activeId)
  const activeTeam = teams.find((t) => t.id === activeId)
  const active = activePerson || activeTeam
  const activeName = active?.name?.replace('#', '') || 'Chat'

  const filteredTeams = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return teams
    return teams.filter((t) => t.name.toLowerCase().includes(q) || t.preview.toLowerCase().includes(q))
  }, [query])

  const filteredPeople = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return people
    return people.filter((p) => p.name.toLowerCase().includes(q) || p.preview.toLowerCase().includes(q))
  }, [query])

  const messages = threads[activeId] || [
    {
      id: 'hello',
      from: 'them',
      text: activePerson?.preview || activeTeam?.preview || 'Say hello',
      time: 'now',
    },
  ]

  function openChat(id) {
    setActiveId(id)
    setPane('chat')
    setMenuOpen(false)
    setEmojiOpen(false)
  }

  function sendMessage(e) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    setThreads((prev) => ({
      ...prev,
      [activeId]: [
        ...(prev[activeId] || messages),
        activeId === 'designers'
          ? { id: Date.now(), name: 'You', text, time: 'now' }
          : { id: Date.now(), from: 'me', text, time: 'now' },
      ],
    }))
    setDraft('')
  }

  return (
    <div className="flex h-dvh overflow-hidden bg-[#f5f7fb] font-[Poppins,sans-serif]">
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
        activeLabel="Chat"
        onNavigate={(label) => {
          if (label === 'Dashboard') onOpenDashboard?.()
          if (label === 'Products') onOpenProducts?.()
          if (label === 'Orders') onOpenOrders?.()
          if (label === 'Customers') onOpenCustomers?.()
          if (label === 'Calendar') onOpenCalendar?.()
          if (label === 'Mail') onOpenMail?.()
          if (label === 'Chat') setSidebarOpen(false)
        }}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          onMenuClick={() => setSidebarOpen((v) => !v)}
          onOpenSettings={onOpenSettings}
          onLock={onLock}
          onLogout={onLogout}
        />

        <main className="flex min-h-0 flex-1 overflow-hidden bg-white">
          <aside
            className={`w-full shrink-0 flex-col border-r border-[#eeeeee] md:flex md:w-[260px] lg:w-[300px] xl:w-[320px] ${
              pane === 'chat' ? 'hidden' : 'flex'
            }`}
          >
            <div className="px-4 pt-4 pb-2">
              <div className="relative">
                <svg className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-[#9ca3af]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path strokeLinecap="round" d="m20 20-3.5-3.5" />
                </svg>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="h-10 w-full rounded-full border border-[#eef1f4] bg-[#f6f8fb] pr-3 pl-9 text-[13px] text-[#3F434A] outline-none placeholder:text-[#c5cad3] focus:border-[#86efac]"
                />
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-4">
              <div className="mt-2 mb-1 flex items-center justify-between px-3">
                <p className="text-[11px] font-semibold tracking-[0.08em] text-[#a8b3c4] uppercase">Teams</p>
                <button type="button" className="cursor-pointer text-[#9ca3af] hover:text-[#6b7280]" aria-label="Add team">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
              {filteredTeams.map((team) => (
                <button
                  key={team.id}
                  type="button"
                  onClick={() => openChat(team.id)}
                  className={`mb-0.5 flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left ${
                    activeId === team.id ? 'bg-[#f4f6f8]' : 'hover:bg-[#f8fafc]'
                  }`}
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[15px] font-semibold"
                    style={{ backgroundColor: team.color, color: team.text }}
                  >
                    {team.letter}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold text-[#3F434A]">{team.name}</span>
                    <span className="block truncate text-[12px] text-[#9ca3af]">{team.preview}</span>
                  </span>
                  {team.badge ? (
                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-[6px] bg-[#FF807B] px-1.5 text-[11px] font-semibold text-white">
                      {team.badge}
                    </span>
                  ) : null}
                </button>
              ))}

              <div className="mt-4 mb-1 flex items-center justify-between px-3">
                <p className="text-[11px] font-semibold tracking-[0.08em] text-[#a8b3c4] uppercase">People</p>
                <button type="button" className="cursor-pointer text-[#9ca3af] hover:text-[#6b7280]" aria-label="Add person">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
              {filteredPeople.map((person) => (
                <button
                  key={person.id}
                  type="button"
                  onClick={() => openChat(person.id)}
                  className={`mb-0.5 flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left ${
                    activeId === person.id ? 'bg-[#f4f6f8]' : 'hover:bg-[#f8fafc]'
                  }`}
                >
                  <span className="relative h-10 w-10 shrink-0">
                    <img
                      src={circleAvatar}
                      alt=""
                      className="h-10 w-10 rounded-full object-cover"
                      style={{ borderRadius: '50%' }}
                    />
                    <span className="absolute right-0 bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#22c55e]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold text-[#3F434A]">{person.name}</span>
                    <span className="block truncate text-[12px] text-[#9ca3af]">{person.preview}</span>
                  </span>
                  {person.badge ? (
                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-[6px] bg-[#FF807B] px-1.5 text-[11px] font-semibold text-white">
                      {person.badge}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </aside>

          <section className={`min-w-0 flex-1 flex-col ${pane === 'chat' ? 'flex' : 'hidden md:flex'}`}>
            <div className="flex items-center justify-between gap-3 border-b border-[#eeeeee] px-4 py-3 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setPane('list')
                    setDetailsOpen(false)
                    setMenuOpen(false)
                    setEmojiOpen(false)
                  }}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-[#8392AB] md:hidden"
                  aria-label="Back"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15 6-6 6 6 6" />
                  </svg>
                </button>
                {activePerson ? (
                  <img src={circleAvatar} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" style={{ borderRadius: '50%' }} />
                ) : (
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[15px] font-semibold"
                    style={{ backgroundColor: activeTeam?.color || '#d9f6e6', color: activeTeam?.text || '#3cba6e' }}
                  >
                    {activeTeam?.letter || 'C'}
                  </span>
                )}
                <p className="truncate text-[15px] font-semibold text-[#3F434A]">{active?.name}</p>
              </div>
              <div className="relative flex items-center gap-1 text-[#9ca3af]">
                <button
                  type="button"
                  onClick={() => setDetailsOpen(true)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-[#f3f4f6] xl:hidden"
                  aria-label="Details"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="8" />
                    <path strokeLinecap="round" d="M12 11v5M12 8h.01" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setInviteOpen(true)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-[#f3f4f6]"
                  aria-label="Add"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-[#f3f4f6]"
                  aria-label="More"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="5" cy="12" r="1.6" />
                    <circle cx="12" cy="12" r="1.6" />
                    <circle cx="19" cy="12" r="1.6" />
                  </svg>
                </button>
                {menuOpen ? (
                  <div className="absolute top-full right-0 z-20 mt-1 w-44 overflow-hidden rounded-xl border border-[#eeeeee] bg-white py-1 shadow-[0_8px_24px_rgba(16,24,40,0.12)]">
                    {['Profile', 'Mute', 'Clear chat'].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setMenuOpen(false)
                          if (item === 'Profile') setDetailsOpen(true)
                        }}
                        className="block w-full cursor-pointer px-4 py-2 text-left text-[13px] text-[#3F434A] hover:bg-[#f8fafc]"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <div className={`min-h-0 flex-1 overflow-y-auto bg-white px-4 py-5 sm:px-8 ${activeId === 'designers' ? 'space-y-6' : 'space-y-4'}`}>
              {messages.map((message) => {
                if (message.type === 'date') {
                  return (
                    <div key={message.id} className="flex items-center gap-3 py-1 text-[12px] text-[#c4c9d1]">
                      <span className="h-px flex-1 bg-[#eeeeee]" />
                      {message.text}
                      <span className="h-px flex-1 bg-[#eeeeee]" />
                    </div>
                  )
                }

                if (activeId === 'designers') {
                  return (
                    <div key={message.id} className="flex items-start gap-3">
                      <span className="mt-0.5 block h-9 w-9 shrink-0 overflow-hidden rounded-full" style={{ borderRadius: '50%' }}>
                        <img src={circleAvatar} alt="" className="h-full w-full object-cover" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-baseline gap-2">
                          <span className="text-[13px] font-semibold text-[#3F434A]">{message.name}</span>
                          <span className="text-[11px] text-[#c5cad3]">{message.time}</span>
                        </div>
                        {message.text ? (
                          <p className="max-w-[520px] text-[13px] leading-relaxed whitespace-pre-line text-[#8b95a5]">{message.text}</p>
                        ) : null}
                        {message.file ? (
                          <div className="mt-1 flex w-full max-w-[min(340px,100%)] items-center gap-3 rounded-xl border border-[#eceff3] bg-white px-3 py-2.5">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center">
                              <img
                                src={message.file.icon}
                                alt=""
                                className={message.file.compact ? 'h-6 w-6 object-contain' : 'h-8 w-8 object-contain'}
                              />
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[13px] font-medium text-[#3F434A]">{message.file.name}</p>
                              <p className="text-[11px] text-[#a8b3c4]">{message.file.size}</p>
                            </div>
                            <img src={downloadIcon} alt="" className="h-4 w-4 shrink-0 object-contain opacity-60" />
                          </div>
                        ) : null}
                        {message.images ? (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {chatPhotos.map((src) => (
                              <img key={src} src={src} alt="" className="h-14 w-14 rounded-xl object-cover sm:w-[68px]" />
                            ))}
                            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#e7f6ea] text-[13px] font-medium text-[#7dcea0] sm:w-[68px]">
                              +3
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )
                }

                const mine = message.from === 'me'
                return (
                  <div key={message.id} className={`flex items-end gap-2 ${mine ? 'justify-end' : 'justify-start'}`}>
                    {!mine ? (
                      <span className="mb-5 block h-8 w-8 shrink-0 overflow-hidden rounded-full" style={{ borderRadius: '50%' }}>
                        <img src={circleAvatar} alt="" className="h-full w-full object-cover" />
                      </span>
                    ) : null}
                    <div className={`flex min-w-0 max-w-[min(420px,calc(100%-2.75rem))] flex-col ${mine ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-end gap-2">
                        {mine && message.tools ? (
                          <span className="mb-1 flex items-center gap-2 text-[#c4c9d1]">
                            <img src={editIcon} alt="" className="h-3.5 w-3.5 object-contain opacity-50" />
                            <img src={deleteIcon} alt="" className="h-3.5 w-3.5 object-contain brightness-0 opacity-30" />
                          </span>
                        ) : null}
                        {mine ? <Dots /> : null}
                        {message.file ? (
                          <div className="w-[min(240px,100%)] overflow-hidden rounded-[18px] rounded-bl-[6px] bg-[#e8f8ec]">
                            <div className="px-4 pt-3 pb-2.5">
                              <p className="truncate text-[13px] font-semibold text-[#1a7a3a]">{message.file.name}</p>
                              <p className="text-[12px] text-[#3cba6e]">{message.file.size}</p>
                            </div>
                            <button type="button" className="flex w-full cursor-pointer items-center justify-center gap-2 bg-[#21943A] py-2 text-[13px] font-medium text-white">
                              Download
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v10m0 0 4-4m-4 4-4-4M5 20h14" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <Bubble mine={mine}>{message.text}</Bubble>
                        )}
                        {!mine ? <Dots /> : null}
                      </div>
                      {message.images ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {chatPhotos.map((src) => (
                            <img key={src} src={src} alt="" className="h-14 w-14 rounded-xl object-cover sm:w-[68px]" />
                          ))}
                          <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#e7f6ea] text-[13px] font-medium text-[#7dcea0] sm:w-[68px]">
                            +3
                          </span>
                        </div>
                      ) : null}
                      <span className="mt-1 px-1 text-[11px] text-[#c4c9d1]">{message.time}</span>
                    </div>
                    {mine ? (
                      <span className="mb-5 block h-8 w-8 shrink-0 overflow-hidden rounded-full" style={{ borderRadius: '50%' }}>
                        <img src={circleAvatar} alt="" className="h-full w-full object-cover" />
                      </span>
                    ) : null}
                  </div>
                )
              })}
            </div>

            <div className="relative border-t border-[#eeeeee]">
              {emojiOpen ? (
                <div className="absolute bottom-full left-2 z-30 mb-2 flex max-h-[min(420px,70dvh)] w-[min(340px,calc(100%-1rem))] flex-col overflow-hidden rounded-2xl border border-[#eeeeee] bg-white shadow-[0_12px_40px_rgba(16,24,40,0.14)]">
                  <div className="px-3 pt-3">
                    <div className="relative">
                      <svg className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-[#b0b7c3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="7" />
                        <path strokeLinecap="round" d="m20 20-3.5-3.5" />
                      </svg>
                      <input
                        value={emojiQuery}
                        onChange={(e) => setEmojiQuery(e.target.value)}
                        placeholder="Search..."
                        className="h-9 w-full rounded-full bg-[#f3f4f6] pr-3 pl-9 text-[13px] text-[#3F434A] outline-none placeholder:text-[#b0b7c3]"
                      />
                    </div>
                  </div>
                  <div className="min-h-0 flex-1 overflow-y-auto px-3 pt-3 pb-2">
                    <p className="mb-2 text-[11px] font-semibold tracking-[0.08em] text-[#a8b3c4] uppercase">Popular</p>
                    <div className="mb-3 flex flex-wrap gap-1">
                      {popularEmojis
                        .filter((emoji) => !emojiQuery || emoji.includes(emojiQuery))
                        .map((emoji) => (
                          <button
                            key={`pop-${emoji}`}
                            type="button"
                            onClick={() => setDraft((value) => value + emoji)}
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-[22px] hover:bg-[#f3f4f6]"
                          >
                            {emoji}
                          </button>
                        ))}
                    </div>
                    <div className="mb-3 border-t border-[#f0f1f3]" />
                    <p className="mb-2 text-[11px] font-semibold tracking-[0.08em] text-[#a8b3c4] uppercase">Smileys</p>
                    <div className="grid grid-cols-7 gap-0.5 min-[380px]:grid-cols-8">
                      {smileyEmojis
                        .filter((emoji) => !emojiQuery || emoji.includes(emojiQuery))
                        .map((emoji, index) => (
                          <button
                            key={`smile-${emoji}-${index}`}
                            type="button"
                            onClick={() => setDraft((value) => value + emoji)}
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-[22px] hover:bg-[#f3f4f6]"
                          >
                            {emoji}
                          </button>
                        ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-1 overflow-x-auto border-t border-[#f0f1f3] px-2 py-2 text-[#b0b7c3]">
                    {[
                      { label: 'Recent', d: 'M12 7v5l3 2M12 21a9 9 0 1 0-9-9' },
                      { label: 'Smileys', d: 'M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9zM9 10h.01M15 10h.01M8.5 14.5c.9 1.2 2.1 1.8 3.5 1.8s2.6-.6 3.5-1.8', active: true },
                      { label: 'Hearts', d: 'M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z' },
                      { label: 'Food', d: 'M6 4v7a3 3 0 0 0 3 3v6M9 4v7M15 20V10a4 4 0 0 1 4-4' },
                      { label: 'Nature', d: 'M12 4v2M5 13h14M7 13a5 5 0 0 1 10 0M12 18v2' },
                      { label: 'Places', d: 'M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11zM12 10.5h.01' },
                      { label: 'Flags', d: 'M5 21V4m0 0h9l-1.5 3L14 10H5' },
                    ].map((item) => (
                      <span
                        key={item.label}
                        className={`flex h-8 w-8 items-center justify-center ${item.active ? 'text-[#6b7280]' : ''}`}
                        aria-label={item.label}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                          <path strokeLinecap="round" strokeLinejoin="round" d={item.d} />
                        </svg>
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            {activeId === 'designers' && uploadOpen ? (
              <div className="flex items-center gap-3 px-4 pt-3 sm:px-5">
                <div className="relative h-8 min-w-0 flex-1 overflow-hidden rounded-md bg-[#f3f4f6]">
                  <div
                    className="absolute inset-y-0 left-0 flex items-center justify-between gap-3 bg-[#21943A] px-3 text-[12px] font-medium text-white"
                    style={{ width: '64%' }}
                  >
                    <span className="truncate">Rocket – Admin Dashboard.sketch</span>
                    <span className="shrink-0">64%</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setUploadOpen(false)}
                  className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center text-[16px] text-[#9ca3af] hover:text-[#6b7280]"
                  aria-label="Cancel upload"
                >
                  ×
                </button>
              </div>
            ) : null}
            <form onSubmit={sendMessage} className="flex items-center gap-2 px-4 py-3 sm:px-5">
              <button type="button" className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-[#9ca3af] hover:bg-[#f3f4f6]" aria-label="Attach">
                <img src={attachmentIcon} alt="" className="h-4 w-4 object-contain brightness-0 opacity-40" />
              </button>
              <button
                type="button"
                onClick={() => setEmojiOpen((open) => !open)}
                className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-md hover:bg-[#f3f4f6] ${emojiOpen ? 'bg-[#f3f4f6] text-[#6b7280]' : 'text-[#9ca3af]'}`}
                aria-label="Emoji"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <circle cx="12" cy="12" r="8" />
                  <path strokeLinecap="round" d="M9 10h.01M15 10h.01M9.2 14.5c.8.8 1.8 1.2 2.8 1.2s2-.4 2.8-1.2" />
                </svg>
              </button>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type a message here..."
                className="min-w-0 flex-1 bg-transparent text-[13px] text-[#3F434A] outline-none placeholder:text-[#c4c9d1]"
              />
              <button
                type="submit"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#21943A] text-white hover:bg-[#1a7a3a]"
                aria-label="Send"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.4 11.2 20.2 4.2c.8-.3 1.6.5 1.3 1.3l-7 16.8c-.3.8-1.5.8-1.8 0l-2.6-6.3-6.3-2.6c-.8-.3-.8-1.5 0-1.8z" />
                </svg>
              </button>
            </form>
            </div>
          </section>

          {detailsOpen ? (
            <button
              type="button"
              aria-label="Close details"
              className="fixed inset-0 z-[60] bg-black/30 xl:hidden"
              onClick={() => setDetailsOpen(false)}
            />
          ) : null}
          <aside
            className={`${
              detailsOpen
                ? 'fixed inset-y-0 right-0 z-[70] flex w-full max-w-[360px] shadow-[0_0_40px_rgba(16,24,40,0.18)]'
                : 'hidden'
            } shrink-0 flex-col overflow-y-auto border-l border-[#eeeeee] bg-white px-5 py-5 sm:px-6 xl:static xl:z-auto xl:flex xl:w-[280px] xl:max-w-none xl:py-8 xl:shadow-none`}
          >
            <div className="mb-4 flex items-center justify-between xl:hidden">
              <p className="text-[15px] font-semibold text-[#3F434A]">Details</p>
              <button
                type="button"
                onClick={() => setDetailsOpen(false)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[18px] text-[#9ca3af] hover:bg-[#f3f4f6]"
                aria-label="Close details"
              >
                ×
              </button>
            </div>
            {activePerson ? (
              <>
                <div className="mb-5 flex flex-col items-center text-center">
                  <span className="relative mb-3 h-24 w-24">
                    <img src={circleAvatar} alt="" className="h-24 w-24 rounded-full object-cover" style={{ borderRadius: '50%' }} />
                    <span className="absolute right-1 bottom-1 h-4 w-4 rounded-full border-[3px] border-white bg-[#22c55e]" />
                  </span>
                  <p className="text-[16px] font-semibold text-[#3F434A]">{activePerson.name}</p>
                  <p className="mt-0.5 text-[12px] text-[#a8b3c4]">{activePerson.role}</p>
                </div>
                <div className="mb-5 border-t border-[#f0f1f3]" />
                <p className="mb-3 text-[11px] font-semibold tracking-[0.08em] text-[#a8b3c4] uppercase">Info</p>
                <div className="mb-5 space-y-3">
                  {personInfo.map((row) => (
                    <div key={row.label}>
                      <p className="text-[10px] font-semibold tracking-[0.06em] text-[#c5cad3] uppercase">{row.label}</p>
                      <p className="text-[13px] text-[#3F434A]">{row.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[11px] font-semibold tracking-[0.08em] text-[#a8b3c4] uppercase">Media</p>
                  <button type="button" className="cursor-pointer text-[12px] font-medium text-[#21943A]">
                    View All
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {mediaPhotos.map((src, index) => (
                    <img key={`${src}-${index}`} src={src} alt="" className="h-16 w-full rounded-xl object-cover" />
                  ))}
                </div>
              </>
            ) : (
              <>
            <div className="mb-8 flex flex-col items-center text-center">
              {activeTeam ? (
                <span
                  className="mb-4 flex h-24 w-24 items-center justify-center rounded-full text-[36px] font-semibold"
                  style={{ backgroundColor: activeTeam.color, color: activeTeam.text }}
                >
                  {activeTeam.letter}
                </span>
              ) : null}
              <p className="text-[16px] font-semibold text-[#3F434A]">{active?.name}</p>
              <p className="mt-1.5 text-[12px] text-[#a8b3c4]">Members (8)</p>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <p className="text-[11px] font-semibold tracking-[0.08em] text-[#a8b3c4] uppercase">Files</p>
              <button type="button" className="cursor-pointer text-[12px] font-medium text-[#21943A]">
                View All
              </button>
            </div>
            <div className="mb-8 space-y-4">
              {chatFiles.map((file, index) => (
                <div key={`${file.name}-${index}`} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center">
                    <img src={file.icon} alt="" className={file.compact ? 'h-6 w-6 object-contain' : 'h-9 w-9 object-contain'} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-[#3F434A]">{file.name}</p>
                    <p className="mt-0.5 text-[11px] text-[#a8b3c4]">{file.size}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-4 flex items-center justify-between">
              <p className="text-[11px] font-semibold tracking-[0.08em] text-[#a8b3c4] uppercase">Photos</p>
              <button type="button" className="cursor-pointer text-[12px] font-medium text-[#21943A]">
                View All
              </button>
            </div>
            <div className="mb-8 flex flex-wrap gap-3">
              {chatPhotos.map((src) => (
                <img key={src} src={src} alt="" className="h-16 w-16 rounded-xl object-cover" />
              ))}
            </div>

            <div className="mb-4 flex items-center justify-between">
              <p className="text-[11px] font-semibold tracking-[0.08em] text-[#a8b3c4] uppercase">Members</p>
              <button type="button" className="cursor-pointer text-[12px] font-medium text-[#21943A]">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {chatMembers.map((member) => (
                <div key={member.name} className="flex items-center gap-3">
                  <img src={circleAvatar} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" style={{ borderRadius: '50%' }} />
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-[#3F434A]">{member.name}</p>
                    <p className="truncate text-[11px] text-[#a8b3c4]">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
              </>
            )}
          </aside>
        </main>
      </div>

      {inviteOpen ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/20 p-4">
          <button type="button" aria-label="Close invite" className="absolute inset-0 cursor-default" onClick={() => setInviteOpen(false)} />
          <div className="relative z-10 max-h-[calc(100dvh-2rem)] w-full max-w-[460px] overflow-y-auto rounded-2xl bg-white px-4 py-4 shadow-[0_24px_60px_rgba(16,24,40,0.18)] sm:px-6 sm:py-5">
            <div className="mb-4 flex items-start justify-between">
              <h2 className="text-[18px] font-semibold text-[#3F434A]">Invite New Members</h2>
              <button
                type="button"
                onClick={() => setInviteOpen(false)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[18px] text-[#9ca3af] hover:bg-[#f3f4f6]"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <p className="mb-3 text-[13px] text-[#8392AB]">
              Invite Members to {activeTeam ? activeTeam.name.replace('#', '') : activeName} Team
            </p>
            <div className="mb-4 flex min-h-11 items-center gap-2 rounded-lg border border-[#e6e8ec] px-2.5 py-1.5 sm:px-3">
              {inviteChip ? (
                <span className="inline-flex max-w-[70%] items-center gap-1.5 rounded-full bg-[#f3f4f6] py-1 pr-2 pl-1 text-[12px] text-[#3F434A]">
                  <img src={circleAvatar} alt="" className="h-5 w-5 rounded-full object-cover" style={{ borderRadius: '50%' }} />
                  <span className="truncate">{inviteChip}</span>
                  <button type="button" onClick={() => setInviteChip('')} className="cursor-pointer text-[#9ca3af]" aria-label="Remove">
                    ×
                  </button>
                </span>
              ) : null}
              <input
                value={inviteQuery}
                onChange={(e) => setInviteQuery(e.target.value)}
                placeholder="Search..."
                className="min-w-0 flex-1 bg-transparent text-[13px] text-[#3F434A] outline-none placeholder:text-[#c5cad3]"
              />
              <svg className="h-4 w-4 shrink-0 text-[#b0b7c3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="m20 20-3.5-3.5" />
              </svg>
            </div>
            <p className="mb-2 text-[13px] font-medium text-[#3F434A]">Invited({invitePeople.length})</p>
            <div className="mb-5 max-h-[min(280px,calc(100dvh-18rem))] space-y-2 overflow-y-auto overscroll-contain">
              {invitePeople
                .filter((person) => person.name.toLowerCase().includes(inviteQuery.trim().toLowerCase()))
                .map((person) => {
                  const checked = checkedIds.has(person.id)
                  return (
                    <button
                      key={person.id}
                      type="button"
                      onClick={() =>
                        setCheckedIds((prev) => {
                          const next = new Set(prev)
                          if (next.has(person.id)) next.delete(person.id)
                          else next.add(person.id)
                          return next
                        })
                      }
                      className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-[#eeeeee] px-3 py-2.5 text-left hover:bg-[#f8fafc]"
                    >
                      <img src={circleAvatar} alt="" className="h-8 w-8 shrink-0 rounded-full object-cover" style={{ borderRadius: '50%' }} />
                      <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-[#3F434A]">{person.name}</span>
                      {checked ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#21943A" strokeWidth="2.4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5L20 7" />
                        </svg>
                      ) : (
                        <span className="h-4 w-4 rounded-full border border-[#d1d5db]" />
                      )}
                    </button>
                  )
                })}
            </div>
            <button
              type="button"
              onClick={() => setInviteOpen(false)}
              className="h-10 w-[168px] max-w-full cursor-pointer rounded-lg bg-[#21943A] text-[14px] font-medium text-white hover:bg-[#1a7a3a]"
            >
              Invite
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
