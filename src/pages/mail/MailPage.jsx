import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import Header from '../../components/dashboard/Header'
import Sidebar from '../../components/dashboard/Sidebar'
import NewLabelPanel from './NewLabelModal'
import avatarImg from '../../assets/images/Avatar.png'
import circleAvatar from '../../assets/images/circle-avatar.png'
import pdfIcon from '../../assets/images/PDF 3.png'
import zipIcon from '../../assets/images/ZIP 3.png'
import deleteIcon from '../../assets/images/Delete.png'
import printerIcon from '../../assets/images/Printer.png'
import downloadIcon from '../../assets/images/Download.svg'
import searchIcon from '../../assets/images/search-01.svg'
import arrowDown from '../../assets/images/arrow-down-02.png'
import alignLeft from '../../assets/images/Align-Left.png'
import alignCenter from '../../assets/images/Align- Center.png'
import alignRight from '../../assets/images/Align-Right.png'
import alignJustify from '../../assets/images/Align-Justify.png'
import attachmentIcon from '../../assets/images/Attachment.png'
import importantFillIcon from '../../assets/images/Important [Fill].png'
import timeIcon from '../../assets/images/Time.png'
import replyIcon from '../../assets/images/Reply.png'
import importantIcon from '../../assets/images/Important.png'
import inboxIcon from '../../assets/images/Inbox.png'
import editIcon from '../../assets/images/edit.png'
import filterIcon from '../../assets/images/Filter.png'
import settingsIcon from '../../assets/images/Settings.png'
import readMailIcon from '../../assets/images/Read Mail.png'

const FOLDERS = [
  { id: 'inbox', label: 'Inbox', badge: 5 },
  { id: 'marked', label: 'Marked' },
  { id: 'drafts', label: 'Drafts' },
  { id: 'sent', label: 'Sent' },
  { id: 'important', label: 'Important', badge: 4 },
  { id: 'deleted', label: 'Deleted' },
]

const LABELS = [
  { id: 'personal', label: 'Personal', color: '#54D1DB' },
  { id: 'work', label: 'Work', color: '#5BA4F5' },
  { id: 'friends', label: 'Friends', color: '#7BC67E' },
  { id: 'family', label: 'Family', color: '#F2C94C' },
  { id: 'social', label: 'Social', color: '#21943A' },
]

const LABEL_COLORS = [
  '#FF6B6B',
  '#54D1DB',
  '#F2C94C',
  '#21943A',
  '#5BA4F5',
  '#7BC67E',
  '#A3E635',
  '#B07CFF',
  '#F472B6',
  '#A0AEC0',
]

const EMAILS = [
  {
    id: 1,
    from: 'Regina Cooper',
    email: 'regina.cooper@gmail.com',
    subject: 'Creative Director Resume',
    preview:
      'I want to introduce myself as a potential creative director for Soft UI Soft Design. My experience and skills...',
    time: '15:00',
    date: 'Today, 07:23 AM',
    folder: 'inbox',
    starred: true,
    star: true,
    hasAttachment: true,
    avatar: circleAvatar,
    body: `Dear Soft UI Soft Design team,

I want to introduce myself as a potential creative director for Soft UI Soft Design. My experience and skills make me a strong candidate for this position. I am excited about the opportunity to contribute to Soft UI Soft Design's innovative projects.

Please find my resume and portfolio attached. I look forward to discussing how I can help Soft UI Soft Design achieve its creative goals.`,
    attachments: [
      { name: 'Resume.pdf', size: '1.2 MB', type: 'pdf' },
      { name: 'Portfolio.zip', size: '14 MB', type: 'zip' },
    ],
  },
  {
    id: 2,
    from: 'Jane Pearson',
    email: 'jane.pearson@example.com',
    subject: 'Need a designer urgently!',
    preview: 'Hi Soft UI Soft Design, I hope you are doing well. We need a designer urgently for a new project...',
    time: '14:32',
    date: 'Today, 02:32 PM',
    folder: 'inbox',
    starred: false,
    hasAttachment: false,
    avatar: circleAvatar,
    body: `Hi Soft UI Soft Design,

I hope you are doing well. We need a designer urgently for a new project launching next month. Please let me know if someone from your team is available.`,
    attachments: [],
  },
  {
    id: 3,
    from: 'Stephanie Stevens',
    email: 'stephanie@example.com',
    subject: 'Questions regarding Soft UI Soft Design',
    preview: 'Hello Soft UI Soft Design, I have a few questions regarding Soft UI Soft Design pricing and licenses...',
    time: '13:10',
    date: 'Today, 01:10 PM',
    folder: 'inbox',
    starred: true,
    hasAttachment: true,
    avatar: circleAvatar,
    body: `Hello Soft UI Soft Design,

I have a few questions regarding Soft UI Soft Design pricing and licenses. Could you clarify the differences between the Pro and Team plans?`,
    attachments: [{ name: 'Questions.pdf', size: '240 KB', type: 'pdf' }],
  },
  {
    id: 4,
    from: 'David Chen',
    email: 'david.chen@example.com',
    subject: 'Weekly report attached',
    preview: 'Please review the weekly analytics report. Numbers look strong across Soft UI Soft Design channels...',
    time: '11:45',
    date: 'Yesterday',
    folder: 'inbox',
    starred: false,
    hasAttachment: true,
    avatar: circleAvatar,
    body: `Hi team,

Please review the weekly analytics report. Numbers look strong across Soft UI Soft Design channels this week.`,
    attachments: [{ name: 'Report.pdf', size: '890 KB', type: 'pdf' }],
  },
  {
    id: 5,
    from: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    subject: 'Invitation to Soft UI Soft Design meetup',
    preview: 'You are invited to Soft UI Soft Design community meetup this Friday at 6 PM...',
    time: '09:20',
    date: 'Yesterday',
    folder: 'important',
    starred: true,
    hasAttachment: false,
    avatar: circleAvatar,
    body: `Hello,

You are invited to Soft UI Soft Design community meetup this Friday at 6 PM. We would love to see you there!`,
    attachments: [],
  },
  {
    id: 6,
    from: 'Dustin Williamson',
    email: 'dustin@example.com',
    subject: 'Meeting with friends',
    preview: 'We use the Arts as a means of touching that part of us that we cannot reach with words...',
    time: '10:45',
    date: 'Today, 10:45 AM',
    folder: 'inbox',
    starred: false,
    star: false,
    checked: true,
    avatar: circleAvatar,
    body: 'We use the Arts as a means of touching that part of us that we cannot reach with words.',
    attachments: [],
  },
  {
    id: 7,
    from: 'Jane Wilson',
    email: 'jane.wilson@example.com',
    subject: 'UX Conference in New York',
    preview: 'The arts allow us to be as specific or as abstract as we please. It helps us become...',
    time: '10:45',
    date: 'Today, 10:45 AM',
    folder: 'inbox',
    starred: false,
    avatar: circleAvatar,
    body: 'The arts allow us to be as specific or as abstract as we please.',
    attachments: [],
  },
  {
    id: 8,
    from: 'Brandon Pena',
    email: 'brandon@example.com',
    subject: "Muzli's weekly design #236",
    preview: 'From dance and music to abstract art our concept of life is shown through creative expression...',
    time: '10:45',
    date: 'Today, 10:45 AM',
    folder: 'inbox',
    starred: true,
    checked: true,
    avatar: circleAvatar,
    body: "From dance and music to abstract art our concept of life is shown through creative expression.",
    attachments: [],
  },
  {
    id: 9,
    from: 'Jacob Hawkins',
    email: 'jacob@example.com',
    subject: 'Weekly project report',
    preview: 'The arts teach us how to communicate through creative expressions of n...',
    time: '10:45',
    date: 'Today, 10:45 AM',
    folder: 'inbox',
    starred: false,
    checked: true,
    avatar: circleAvatar,
    body: 'The arts teach us how to communicate through creative expressions.',
    attachments: [],
  },
  {
    id: 10,
    from: 'Shane Black',
    email: 'shane@example.com',
    subject: 'Order Status #24197118',
    preview: 'Music, singing, dancing, poetry, and sketching are just a few of the different...',
    time: '10:45',
    date: 'Today, 10:45 AM',
    folder: 'inbox',
    starred: true,
    star: true,
    hasAttachment: true,
    avatar: circleAvatar,
    body: 'Music, singing, dancing, poetry, and sketching are just a few of the different ways we create.',
    attachments: [],
  },
  {
    id: 11,
    from: 'Regina Cooper',
    email: 'regina.cooper@gmail.com',
    subject: 'Welcome to Dribbble!',
    preview: 'Prepare us to adapt to and respect the ways others think, work, and expr...',
    time: '10:45',
    date: 'Today, 10:45 AM',
    folder: 'inbox',
    starred: false,
    star: true,
    hasAttachment: true,
    avatar: circleAvatar,
    body: 'Prepare us to adapt to and respect the ways others think, work, and express.',
    attachments: [],
  },
  {
    id: 12,
    from: 'Jane Wilson',
    email: 'jane.wilson@example.com',
    subject: 'Creative Director Resume',
    preview: 'Show us how to understand human experiences, past and present th...',
    time: '10:45',
    date: 'Today, 10:45 AM',
    folder: 'inbox',
    starred: false,
    avatar: circleAvatar,
    body: 'Show us how to understand human experiences, past and present.',
    attachments: [],
  },
  {
    id: 13,
    from: 'Jacob Hawkins',
    email: 'jacob@example.com',
    subject: 'Weekly project report',
    preview: 'The arts teach us how to communicate through creative expressions of n...',
    time: '10:45',
    date: 'Today, 10:45 AM',
    folder: 'inbox',
    starred: false,
    avatar: circleAvatar,
    body: 'The arts teach us how to communicate through creative expressions.',
    attachments: [],
  },
  {
    id: 14,
    from: 'Dustin Williamson',
    email: 'dustin@example.com',
    subject: 'Meeting with friends',
    preview: 'We use the Arts as a means of touching that part of us that we cannot rea...',
    time: '10:45',
    date: 'Today, 10:45 AM',
    folder: 'inbox',
    starred: true,
    avatar: circleAvatar,
    body: 'We use the Arts as a means of touching that part of us that we cannot reach.',
    attachments: [],
  },
  {
    id: 15,
    from: 'Regina Cooper',
    email: 'regina.cooper@gmail.com',
    subject: 'Creative Director Resume',
    preview: 'The Arts play a large role in the expression of inner thoughts and bea...',
    time: '10:45',
    date: 'Today, 10:45 AM',
    folder: 'inbox',
    starred: true,
    star: true,
    hasAttachment: true,
    avatar: circleAvatar,
    body: 'The Arts play a large role in the expression of inner thoughts and beauty.',
    attachments: [{ name: 'Resume.pdf', size: '570 KB', type: 'pdf' }],
  },
  {
    id: 16,
    from: 'Shane Black',
    email: 'shane@example.com',
    subject: 'Order Status #24197120',
    preview: 'Music, singing, dancing, poetry, and sketching are just a few of the diffe...',
    time: '10:45',
    date: 'Today, 10:45 AM',
    folder: 'inbox',
    starred: false,
    avatar: circleAvatar,
    body: 'Music, singing, dancing, poetry, and sketching are just a few of the different ways we create.',
    attachments: [],
  },
  {
    id: 17,
    from: 'Brandon Pena',
    email: 'brandon@example.com',
    subject: "Muzli's weekly design #236",
    preview: 'From dance and music to abstract art our concept of life is shown t...',
    time: '10:45',
    date: 'Today, 10:45 AM',
    folder: 'inbox',
    starred: false,
    star: true,
    avatar: circleAvatar,
    body: 'From dance and music to abstract art our concept of life is shown through creative expression.',
    attachments: [],
  },
  {
    id: 18,
    from: 'Jane Wilson',
    email: 'jane.wilson@example.com',
    subject: 'Creative Director Resume',
    preview: 'Show us how to understand human experiences, past and present th...',
    time: '10:45',
    date: 'Today, 10:45 AM',
    folder: 'inbox',
    starred: false,
    avatar: circleAvatar,
    body: 'Show us how to understand human experiences, past and present.',
    attachments: [],
  },
  {
    id: 19,
    from: 'Sofia Scarlett',
    email: 'sofia@example.com',
    subject: 'Portfolio review notes',
    preview: 'I left a few comments on the latest screens. The spacing on the mail list looks closer now...',
    time: '09:12',
    date: 'Today, 09:12 AM',
    folder: 'inbox',
    starred: true,
    hasAttachment: true,
    avatar: circleAvatar,
    body: 'I left a few comments on the latest screens. Please check the mail list spacing.',
    attachments: [{ name: 'Notes.pdf', size: '320 KB', type: 'pdf' }],
  },
  {
    id: 20,
    from: 'Tom Klein',
    email: 'tom@example.com',
    subject: 'Sprint demo tomorrow',
    preview: 'We will walk through the inbox, labels, and the reply composer during the demo...',
    time: '08:40',
    date: 'Today, 08:40 AM',
    folder: 'inbox',
    starred: false,
    star: true,
    avatar: circleAvatar,
    body: 'We will walk through the inbox, labels, and the reply composer during the demo.',
    attachments: [],
  },
]

function FolderIcon({ id, active }) {
  const imgClass = `h-5 w-5 object-contain ${active ? 'opacity-100' : 'opacity-70'}`

  if (id === 'inbox') {
    return <img src={inboxIcon} alt="" className={`h-5 w-5 object-contain ${active ? 'opacity-100' : 'opacity-70'}`} />
  }
  if (id === 'marked') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.7 6.8 19.5l1-5.8L3.6 9.6l5.8-.8L12 3.5z"
        />
      </svg>
    )
  }
  if (id === 'drafts') {
    return <img src={editIcon} alt="" className={`h-6 w-6 object-contain ${active ? 'opacity-100' : 'opacity-70'}`} />
  }
  if (id === 'sent') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12l16-7-5 16-3.5-6.5L4 12z" />
      </svg>
    )
  }
  if (id === 'important') {
    return <img src={importantIcon} alt="" className={imgClass} />
  }
  return <img src={deleteIcon} alt="" className={imgClass} />
}

export default function MailPage({
  onOpenSettings,
  onOpenChat,
  onOpenDashboard,
  onOpenProducts,
  onOpenOrders,
  onOpenCustomers,
  onOpenCalendar,
  onLock,
  onLogout,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [foldersOpen, setFoldersOpen] = useState(false)
  const [folder, setFolder] = useState('inbox')
  const [selectedId, setSelectedId] = useState(1)
  const [search, setSearch] = useState('')
  const [reply, setReply] = useState('')
  const [starredIds, setStarredIds] = useState(() => new Set(EMAILS.filter((e) => e.starred).map((e) => e.id)))
  const [starIds, setStarIds] = useState(() => new Set(EMAILS.filter((e) => e.star).map((e) => e.id)))
  const [checkedIds, setCheckedIds] = useState(() => new Set(EMAILS.filter((e) => e.checked).map((e) => e.id)))
  const [mobilePane, setMobilePane] = useState('list')
  const [labels, setLabels] = useState(LABELS)
  const [newLabelOpen, setNewLabelOpen] = useState(false)
  const [labelMenuId, setLabelMenuId] = useState(null)
  const [labelMenuPos, setLabelMenuPos] = useState({ top: 0, left: 0 })
  const [composeOpen, setComposeOpen] = useState(false)
  const [composeTo, setComposeTo] = useState('Regina Cooper')
  const [composeCc, setComposeCc] = useState('')
  const [composeBcc, setComposeBcc] = useState('')
  const [showCc, setShowCc] = useState(false)
  const [showBcc, setShowBcc] = useState(false)
  const [composeSubject, setComposeSubject] = useState('Order Status #24197118')
  const [composeBody, setComposeBody] = useState('')
  const [composeFiles, setComposeFiles] = useState([
    { id: 'resume', name: 'Resume.pdf', meta: '570 KB', kind: 'pdf' },
    { id: 'upload', name: 'Uploading File...', meta: '40%', kind: 'uploading' },
  ])

  const list = useMemo(() => {
    const q = search.trim().toLowerCase()
    return EMAILS.filter((mail) => {
      let inFolder = mail.folder === folder
      if (folder === 'inbox') inFolder = mail.folder === 'inbox' || mail.folder === 'important'
      if (folder === 'marked') inFolder = starredIds.has(mail.id)
      if (folder === 'important') inFolder = mail.folder === 'important'
      if (!inFolder) return false
      if (!q) return true
      return (
        mail.from.toLowerCase().includes(q) ||
        mail.subject.toLowerCase().includes(q) ||
        mail.preview.toLowerCase().includes(q)
      )
    })
  }, [folder, search, starredIds])

  const selected = list.find((m) => m.id === selectedId) || list[0] || EMAILS[0]
  const selectedIndex = Math.max(0, list.findIndex((m) => m.id === selected?.id))

  function selectMail(id) {
    setSelectedId(id)
    setMobilePane('detail')
    setComposeOpen(false)
  }

  function openCompose() {
    setComposeTo('Regina Cooper')
    setComposeCc('')
    setComposeBcc('')
    setShowCc(false)
    setShowBcc(false)
    setComposeSubject('Order Status #24197118')
    setComposeBody('')
    setComposeFiles([
      { id: 'resume', name: 'Resume.pdf', meta: '570 KB', kind: 'pdf' },
      { id: 'upload', name: 'Uploading File...', meta: '40%', kind: 'uploading' },
    ])
    setComposeOpen(true)
    setMobilePane('list')
    setNewLabelOpen(false)
    setFoldersOpen(false)
  }

  function toggleStar(id) {
    setStarredIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleFavorite(id) {
    setStarIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleChecked(id) {
    setCheckedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function goPrev() {
    if (selectedIndex <= 0) return
    setSelectedId(list[selectedIndex - 1].id)
  }

  function goNext() {
    if (selectedIndex >= list.length - 1) return
    setSelectedId(list[selectedIndex + 1].id)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f7fb] font-[Poppins,sans-serif]">
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
        activeLabel="Mail"
        onNavigate={(label) => {
          if (label === 'Dashboard') onOpenDashboard?.()
          if (label === 'Chat') onOpenChat?.()
          if (label === 'Products') onOpenProducts?.()
          if (label === 'Orders') onOpenOrders?.()
          if (label === 'Customers') onOpenCustomers?.()
          if (label === 'Calendar') onOpenCalendar?.()
          if (label === 'Mail') setSidebarOpen(false)
        }}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          onMenuClick={() => setSidebarOpen((v) => !v)}
          onOpenSettings={onOpenSettings}
          onLock={onLock}
          onLogout={onLogout}
          onOpenChat={onOpenChat}
        />

        <main className="flex min-h-0 flex-1 overflow-hidden">
          {foldersOpen ? (
            <button
              type="button"
              aria-label="Close folders"
              className="fixed inset-0 z-30 bg-black/30 xl:hidden"
              onClick={() => setFoldersOpen(false)}
            />
          ) : null}

          {/* Folders */}
          <aside
            className={`fixed inset-y-0 left-0 z-40 flex w-[240px] flex-col border-r border-[#eeeeee] bg-white px-4 py-5 transition-transform xl:static xl:z-auto xl:translate-x-0 ${
              foldersOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <button
              type="button"
              onClick={openCompose}
              className="mb-5 h-11 w-full cursor-pointer rounded-md bg-[#21943A] text-[12px] font-semibold tracking-wide text-white uppercase hover:bg-[#1a7a3a]"
            >
              New Message
            </button>

            <nav className="space-y-0.5">
              {FOLDERS.map((f) => {
                const active = folder === f.id
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      setFolder(f.id)
                      setFoldersOpen(false)
                      setMobilePane('list')
                    }}
                    className={`flex h-10 w-full cursor-pointer items-center gap-3 rounded-lg px-3 text-left text-[13px] font-medium ${
                      active ? 'bg-[#E8F8EC] text-[#21943A]' : 'text-[#6b7280] hover:bg-[#f8fafc]'
                    }`}
                  >
                    <span className={active ? 'text-[#21943A]' : 'text-[#9ca3af]'}>
                      <FolderIcon id={f.id} active={active} />
                    </span>
                    <span className="flex-1">{f.label}</span>
                    {f.badge ? (
                      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-[6px] bg-[#FF807B] px-1.5 text-[11px] font-semibold text-white">
                        {f.badge}
                      </span>
                    ) : null}
                  </button>
                )
              })}
            </nav>

            <div className="mt-6 mb-2 flex items-center justify-between px-3">
              <p className="text-[11px] font-semibold tracking-wide text-[#9ca3af] uppercase">Labels</p>
              <button
                type="button"
                onClick={() => {
                  setNewLabelOpen(true)
                  setFoldersOpen(false)
                  setMobilePane('list')
                }}
                className="cursor-pointer text-[#9ca3af] hover:text-[#6b7280]"
                aria-label="Add label"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>
            <div className="space-y-1">
              {labels.map((l) => {
                const menuOpen = labelMenuId === l.id
                return (
                  <div key={l.id} className="group relative">
                    <div
                      className={`flex h-10 w-full items-center gap-2 rounded-lg px-3 ${
                        menuOpen ? 'bg-[#f5f7fb]' : 'hover:bg-[#f8fafc]'
                      }`}
                    >
                      <button
                        type="button"
                        className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-left text-[13px] font-medium text-[#3F434A]"
                      >
                        <span
                          className="h-3.5 w-3.5 shrink-0 rounded-full border-[2.5px] border-solid bg-transparent"
                          style={{ borderColor: l.color }}
                        />
                        <span className="truncate">{l.label}</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (labelMenuId === l.id) {
                            setLabelMenuId(null)
                            return
                          }
                          const rect = e.currentTarget.getBoundingClientRect()
                          const menuW = 200
                          const left = Math.min(rect.right + 6, window.innerWidth - menuW - 8)
                          setLabelMenuPos({
                            top: Math.max(8, rect.top - 4),
                            left: Math.max(8, left),
                          })
                          setLabelMenuId(l.id)
                        }}
                        className={`flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#9ca3af] ${
                          menuOpen ? 'bg-[#e8eaed] opacity-100' : 'opacity-0 group-hover:opacity-100 hover:bg-[#e8eaed]'
                        }`}
                        aria-label={`${l.label} menu`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="12" cy="5" r="1.6" />
                          <circle cx="12" cy="12" r="1.6" />
                          <circle cx="12" cy="19" r="1.6" />
                        </svg>
                      </button>
                    </div>

                    {menuOpen
                      ? createPortal(
                      <>
                        <button
                          type="button"
                          aria-label="Close label menu"
                          className="fixed inset-0 z-[60] cursor-default"
                          onClick={() => setLabelMenuId(null)}
                        />
                        <div
                          className="fixed z-[70] w-[200px] overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white py-1.5 shadow-[0_20px_50px_rgba(16,24,40,0.22),0_6px_16px_rgba(16,24,40,0.12)]"
                          style={{ top: labelMenuPos.top, left: labelMenuPos.left }}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setLabelMenuId(null)
                              setNewLabelOpen(true)
                            }}
                            className="flex w-full cursor-pointer items-center gap-2.5 px-3.5 py-2.5 text-left text-[13px] font-medium text-[#3F434A] hover:bg-[#f8fafc]"
                          >
                            <img src={editIcon} alt="" className="h-5 w-5 object-contain opacity-60" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setLabelMenuId(null)
                              setNewLabelOpen(true)
                            }}
                            className="flex w-full cursor-pointer items-center gap-2.5 px-3.5 py-2.5 text-left text-[13px] font-medium text-[#3F434A] hover:bg-[#f8fafc]"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8392AB" strokeWidth="2.2">
                              <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                            </svg>
                            Add Sublabel
                          </button>

                          <div className="my-1.5 border-t border-[#eeeeee]" />

                          <button
                            type="button"
                            onClick={() => {
                              setLabels((prev) => prev.filter((x) => x.id !== l.id))
                              setLabelMenuId(null)
                            }}
                            className="flex w-full cursor-pointer items-center gap-2.5 px-3.5 py-2.5 text-left text-[13px] font-medium text-[#FF807B] hover:bg-[#fff5f4]"
                          >
                            <img
                              src={deleteIcon}
                              alt=""
                              className="h-4 w-4 object-contain"
                              style={{
                                filter:
                                  'invert(52%) sepia(62%) saturate(1200%) hue-rotate(320deg) brightness(105%)',
                              }}
                            />
                            Delete Label
                          </button>

                          <div className="my-1.5 border-t border-[#eeeeee]" />

                          <div className="grid grid-cols-5 gap-2 px-3.5 py-2.5">
                            {LABEL_COLORS.map((color) => {
                              const selected = l.color === color
                              return (
                                <button
                                  key={color}
                                  type="button"
                                  onClick={() => {
                                    setLabels((prev) =>
                                      prev.map((x) => (x.id === l.id ? { ...x, color } : x)),
                                    )
                                  }}
                                  className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full"
                                  style={{ backgroundColor: selected ? `${color}33` : 'transparent' }}
                                  aria-label={`Color ${color}`}
                                >
                                  <span
                                    className="relative flex h-[18px] w-[18px] items-center justify-center rounded-full"
                                    style={{ backgroundColor: color }}
                                  >
                                    {selected ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
                                  </span>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      </>,
                      document.body,
                    )
                      : null}
                  </div>
                )
              })}
            </div>
          </aside>

          {newLabelOpen ? (
            <div className={mobilePane === 'detail' ? 'hidden md:flex md:min-w-0' : 'flex min-w-0 flex-1 md:flex-none'}>
              <NewLabelPanel
                onClose={() => setNewLabelOpen(false)}
                onCreate={({ name, color }) => {
                  setLabels((prev) => [
                    ...prev,
                    {
                      id: `label-${Date.now()}`,
                      label: name,
                      color,
                    },
                  ])
                }}
              />
            </div>
          ) : null}

          {/* List */}
          <section
            className={`relative min-w-0 flex-col bg-white ${
              newLabelOpen || mobilePane === 'detail' ? 'hidden' : 'flex w-full flex-1'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2 border-b border-[#eeeeee] px-3 py-2.5 sm:px-4">
              <button
                type="button"
                onClick={() => setFoldersOpen(true)}
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-[#8392AB] xl:hidden"
                aria-label="Folders"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h10" />
                </svg>
              </button>
              <div className="flex items-center gap-0.5 text-[#8392AB]">
                <button type="button" className="flex h-8 cursor-pointer items-center gap-1 rounded-md px-1 hover:bg-[#f3f4f6]" aria-label="Select">
                  <span className="h-[18px] w-[18px] rounded-[5px] border border-[#d1d5db] bg-white" />
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <button type="button" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-[#f3f4f6]" aria-label="Inbox">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 13h4l1.5 2h5L16 13h4" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 6h14a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" />
                  </svg>
                </button>
                <button type="button" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-[#f3f4f6]" aria-label="Spam">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path strokeLinejoin="round" d="M8.2 3.8h7.6L20.2 8.2v7.6l-4.4 4.4H8.2L3.8 15.8V8.2L8.2 3.8z" />
                    <path strokeLinecap="round" d="M12 8v5M12 16.2h.01" />
                  </svg>
                </button>
                <button type="button" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-[#f3f4f6]" aria-label="Delete">
                  <img src={deleteIcon} alt="" className="h-[18px] w-[18px] object-contain brightness-0 opacity-45" />
                </button>
                <span className="mx-1.5 hidden h-5 w-px bg-[#e5e7eb] sm:block" />
                <button type="button" className="hidden h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-[#f3f4f6] sm:flex" aria-label="Move">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 8.5V6.8A1.8 1.8 0 0 1 5.3 5h4.2l1.6 2h7.6A1.8 1.8 0 0 1 20.5 8.8v8.4a1.8 1.8 0 0 1-1.8 1.8H5.3a1.8 1.8 0 0 1-1.8-1.8V8.5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 13.5h6M14 11.5l2 2-2 2" />
                  </svg>
                </button>
                <button type="button" className="hidden h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-[#f3f4f6] sm:flex" aria-label="Mark read">
                  <img src={readMailIcon} alt="" className="h-[18px] w-[18px] object-contain" />
                </button>
              </div>
              <div className="relative mx-auto min-w-[160px] flex-1 max-w-[280px]">
                <img src={searchIcon} alt="" className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 opacity-40" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="h-9 w-full rounded-full border border-[#e5e7eb] bg-white pr-3 pl-9 text-[13px] text-[#3F434A] outline-none focus:border-[#86efac]"
                />
              </div>
              <div className="ml-auto flex items-center gap-1 text-[#6b7280]">
                <button type="button" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-[#f3f4f6]" aria-label="Previous page">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15 6-6 6 6 6" />
                  </svg>
                </button>
                <span className="px-1 text-[13px] font-medium text-[#4b5563]">1 of 200</span>
                <button type="button" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-[#f3f4f6]" aria-label="Next page">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 6 6 6-6 6" />
                  </svg>
                </button>
                <button type="button" className="ml-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-[#f3f4f6]" aria-label="Filter">
                  <img src={filterIcon} alt="" className="h-4 w-4 object-contain brightness-0 opacity-55" />
                </button>
                <button type="button" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-[#f3f4f6]" aria-label="Settings">
                  <img src={settingsIcon} alt="" className="h-[18px] w-[18px] object-contain brightness-0 opacity-55" />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              {list.length === 0 ? (
                <p className="px-4 py-10 text-center text-[13px] text-[#9ca3af]">No messages</p>
              ) : (
                list.map((mail) => {
                  const checked = checkedIds.has(mail.id)
                  const favorite = starIds.has(mail.id)
                  const marked = starredIds.has(mail.id)
                  return (
                    <div
                      key={mail.id}
                      className="flex h-12 items-center gap-2 border-b border-[#f0f1f3] px-3 hover:bg-[#fafbfc] sm:gap-3 sm:px-4"
                    >
                      <button
                        type="button"
                        onClick={() => toggleChecked(mail.id)}
                        className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center"
                        aria-label="Select message"
                      >
                        {checked ? (
                          <span className="flex h-4 w-4 items-center justify-center rounded-[4px] bg-[#21943A] text-white">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5L20 7" />
                            </svg>
                          </span>
                        ) : (
                          <span className="h-4 w-4 rounded-[4px] border border-[#d1d5db]" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(mail.id)}
                        className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center"
                        aria-label="Star"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill={favorite ? '#F2C94C' : 'none'} stroke={favorite ? '#F2C94C' : '#c4c9d4'} strokeWidth="1.7">
                          <path strokeLinejoin="round" d="M12 3.5l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.8 7.2 18.4l.9-5.4L4.2 9.2l5.4-.8L12 3.5z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleStar(mail.id)}
                        className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center"
                        aria-label="Important"
                      >
                        {marked ? (
                          <img src={importantFillIcon} alt="" className="h-[18px] w-3.5 object-contain" />
                        ) : (
                          <img src={importantIcon} alt="" className="h-[18px] w-3.5 object-contain opacity-40" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => selectMail(mail.id)}
                        className="flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 text-left sm:gap-3"
                      >
                        <img src={mail.avatar || avatarImg} alt="" className="h-7 w-7 shrink-0 rounded-full object-cover" />
                        <span className="hidden w-[140px] shrink-0 truncate text-[13px] font-medium text-[#3F434A] lg:inline">
                          {mail.from}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-[13px] text-[#6b7280]">
                          <span className="font-semibold text-[#3F434A] lg:font-medium">{mail.subject}</span>
                          <span className="text-[#8392AB]"> — {mail.preview}</span>
                        </span>
                        <span className="inline-flex shrink-0 items-center gap-1.5 text-[12px] text-[#9ca3af]">
                          {mail.hasAttachment ? (
                            <img src={attachmentIcon} alt="" className="h-3.5 w-3.5 object-contain brightness-0 opacity-40" />
                          ) : null}
                          {mail.time}
                        </span>
                      </button>
                    </div>
                  )
                })
              )}
            </div>

            {composeOpen ? (
              <div className="absolute inset-x-0 bottom-0 top-[53px] z-20 flex justify-center p-3 sm:justify-end sm:p-4">
                <div className="flex h-full w-full max-w-[640px] flex-col overflow-hidden rounded-2xl border border-[#eeeeee] bg-white shadow-[0_16px_50px_rgba(16,24,40,0.14)]">
                  <div className="flex h-full min-h-0 flex-1 flex-col overflow-y-auto px-5 py-4 sm:px-6 sm:py-5">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-[22px] font-semibold text-[#3F434A]">New Message</h2>
                      <button
                        type="button"
                        onClick={() => setComposeOpen(false)}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#f3f4f6] text-[18px] leading-none text-[#9ca3af] hover:bg-[#e8eaed]"
                        aria-label="Close"
                      >
                        ×
                      </button>
                    </div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[13px] text-[#9aa3b2]">To</span>
                      <div className="flex items-center gap-4 text-[13px] text-[#9aa3b2]">
                        <button type="button" onClick={() => setShowCc((v) => !v)} className="cursor-pointer hover:text-[#6b7280]">
                          Cc
                        </button>
                        <button type="button" onClick={() => setShowBcc((v) => !v)} className="cursor-pointer hover:text-[#6b7280]">
                          Bcc
                        </button>
                      </div>
                    </div>
                    <div className="mb-4 flex h-11 items-center rounded-lg border border-[#e6e8ec] px-2.5">
                      {composeTo ? (
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-[#f3f4f6] px-2.5 py-1 text-[13px] text-[#3F434A]">
                          {composeTo}
                          <button
                            type="button"
                            onClick={() => setComposeTo('')}
                            className="cursor-pointer text-[#9ca3af] hover:text-[#6b7280]"
                            aria-label="Remove recipient"
                          >
                            ×
                          </button>
                        </span>
                      ) : (
                        <input
                          value={composeTo}
                          onChange={(e) => setComposeTo(e.target.value)}
                          placeholder="Recipients"
                          className="h-8 w-full bg-transparent text-[13px] text-[#3F434A] outline-none placeholder:text-[#c4c9d1]"
                        />
                      )}
                    </div>
                    {showCc ? (
                      <input
                        value={composeCc}
                        onChange={(e) => setComposeCc(e.target.value)}
                        placeholder="Cc"
                        className="mb-3 h-10 w-full rounded-lg border border-[#e5e7eb] px-3 text-[13px] text-[#3F434A] outline-none placeholder:text-[#c4c9d1]"
                      />
                    ) : null}
                    {showBcc ? (
                      <input
                        value={composeBcc}
                        onChange={(e) => setComposeBcc(e.target.value)}
                        placeholder="Bcc"
                        className="mb-3 h-10 w-full rounded-lg border border-[#e5e7eb] px-3 text-[13px] text-[#3F434A] outline-none placeholder:text-[#c4c9d1]"
                      />
                    ) : null}

                    <p className="mb-2 text-[13px] text-[#9aa3b2]">Subject</p>
                    <input
                      value={composeSubject}
                      onChange={(e) => setComposeSubject(e.target.value)}
                      className="mb-4 h-11 w-full rounded-lg border border-[#e6e8ec] px-3 text-[13px] text-[#3F434A] outline-none"
                    />

                    <p className="mb-2 text-[13px] text-[#9aa3b2]">Message</p>
                    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-[#e6e8ec]">
                      <div className="flex items-center gap-0.5 overflow-x-auto border-b border-[#eeeeee] px-2 py-1.5">
                        <button type="button" className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-md px-2 text-[13px] font-semibold text-[#6b7280] hover:bg-[#eef1f4]">
                          A
                          <img src={arrowDown} alt="" className="h-2.5 w-2.5 object-contain opacity-60" />
                        </button>
                        <span className="mx-0.5 h-4 w-px bg-[#e5e7eb]" />
                        {['B', 'I', 'U'].map((t) => (
                          <button
                            key={t}
                            type="button"
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-[13px] font-semibold text-[#6b7280] hover:bg-[#eef1f4]"
                          >
                            {t === 'I' ? <em>{t}</em> : t === 'U' ? <span className="underline">{t}</span> : t}
                          </button>
                        ))}
                        <span className="mx-0.5 h-4 w-px bg-[#e5e7eb]" />
                        <button type="button" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-[#6b7280] hover:bg-[#eef1f4]" aria-label="Link">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path strokeLinecap="round" d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07L10.5 5.4" />
                            <path strokeLinecap="round" d="M14 11a5 5 0 0 0-7.07 0L4.8 13.13a5 5 0 0 0 7.07 7.07L13.5 18.6" />
                          </svg>
                        </button>
                        <button type="button" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-[#6b7280] hover:bg-[#eef1f4]" aria-label="Emoji">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <circle cx="12" cy="12" r="8.5" />
                            <path strokeLinecap="round" d="M9 10h.01M15 10h.01M9.5 15c.8 1 1.9 1.5 2.5 1.5s1.7-.5 2.5-1.5" />
                          </svg>
                        </button>
                        <button type="button" className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-[#6b7280] hover:bg-[#eef1f4]" aria-label="Image">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
                            <circle cx="9" cy="10" r="1.5" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8 16 3.5-3.5L14 15l2-2 3.5 3" />
                          </svg>
                        </button>
                        <span className="mx-0.5 h-4 w-px shrink-0 bg-[#e5e7eb]" />
                        <button type="button" className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-[#6b7280] hover:bg-[#eef1f4]" aria-label="Bullets">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="5" cy="7" r="1.3" />
                            <circle cx="5" cy="12" r="1.3" />
                            <circle cx="5" cy="17" r="1.3" />
                            <rect x="9" y="6" width="11" height="2" rx="1" />
                            <rect x="9" y="11" width="11" height="2" rx="1" />
                            <rect x="9" y="16" width="11" height="2" rx="1" />
                          </svg>
                        </button>
                        <button type="button" className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-[#6b7280] hover:bg-[#eef1f4]" aria-label="Numbers">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path strokeLinecap="round" d="M5 7h1M5 12h1.5M5 17h1M10 7h10M10 12h10M10 17h10" />
                          </svg>
                        </button>
                        <span className="mx-0.5 h-4 w-px shrink-0 bg-[#e5e7eb]" />
                        {[alignLeft, alignCenter, alignRight, alignJustify].map((src, i) => (
                          <button
                            key={i}
                            type="button"
                            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md hover:bg-[#eef1f4]"
                          >
                            <img src={src} alt="" className="h-3.5 w-3.5 object-contain opacity-55" />
                          </button>
                        ))}
                      </div>
                      <textarea
                        value={composeBody}
                        onChange={(e) => setComposeBody(e.target.value)}
                        placeholder="Type something"
                        className="min-h-[120px] w-full flex-1 resize-none bg-transparent px-3.5 py-3 text-[13px] text-[#3F434A] outline-none placeholder:text-[#c5cad3]"
                      />

                    {composeFiles.length ? (
                      <div className="grid grid-cols-1 gap-3 px-3 pb-3 sm:grid-cols-2">
                        {composeFiles.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center gap-3 rounded-xl border border-[#e6e8ec] px-3 py-3"
                          >
                            {file.kind === 'pdf' ? (
                              <img src={pdfIcon} alt="" className="h-10 w-10 shrink-0 object-contain" />
                            ) : (
                              <span className="flex h-10 w-10 shrink-0 items-center justify-center text-[#b0b7c3]">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                                  <path strokeLinejoin="round" d="M7 3.5h7.2L19 8.2V20a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5H7z" />
                                  <path strokeLinecap="round" d="M14 3.8V8h4.2M12 16.2V11M9.8 13.1 12 11l2.2 2.1" />
                                </svg>
                              </span>
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[13px] font-medium text-[#3F434A]">
                                {file.kind === 'uploading' ? `${file.name} ${file.meta}` : file.name}
                              </p>
                              {file.kind === 'uploading' ? (
                                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e5e7eb]">
                                  <div className="h-full w-[40%] rounded-full bg-[#21943A]" />
                                </div>
                              ) : (
                                <p className="text-[12px] text-[#9ca3af]">{file.meta}</p>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => setComposeFiles((prev) => prev.filter((item) => item.id !== file.id))}
                              className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-[#9ca3af] hover:bg-[#f3f4f6]"
                              aria-label={file.kind === 'pdf' ? 'Remove file' : 'Cancel upload'}
                            >
                              {file.kind === 'pdf' ? (
                                <img src={deleteIcon} alt="" className="h-4 w-4 object-contain brightness-0 opacity-45" />
                              ) : (
                                <span className="text-[18px] leading-none">×</span>
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    <div className="flex items-center gap-3 px-3 pt-1 pb-3">
                      <div className="inline-flex overflow-hidden rounded-lg">
                        <button
                          type="button"
                          onClick={() => setComposeOpen(false)}
                          className="h-10 cursor-pointer bg-[#21943A] px-5 text-[14px] font-medium text-white hover:bg-[#1a7a3a]"
                        >
                          Send
                        </button>
                        <button
                          type="button"
                          className="flex h-10 w-10 cursor-pointer items-center justify-center border-l border-white/25 bg-[#21943A] hover:bg-[#1a7a3a]"
                          aria-label="Schedule send"
                        >
                          <img src={timeIcon} alt="" className="h-4 w-4 object-contain brightness-0 invert" />
                        </button>
                      </div>
                      <button type="button" className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md hover:bg-[#f3f4f6]" aria-label="Attach">
                        <img src={attachmentIcon} alt="" className="h-5 w-5 object-contain brightness-0 opacity-45" />
                      </button>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </section>

          {/* Reader */}
          <section
            className={`min-w-0 flex-1 flex-col bg-white ${
              mobilePane === 'detail' ? 'flex' : 'hidden'
            }`}
          >
            {selected ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eeeeee] px-3 py-3 sm:px-5">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      type="button"
                      onClick={() => setMobilePane('list')}
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md hover:bg-[#f3f4f6]"
                      aria-label="Back to inbox"
                    >
                      <img src={replyIcon} alt="" className="h-5 w-5 object-contain brightness-0 opacity-45" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1 text-[#8392AB]">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md hover:bg-[#f3f4f6]"
                      aria-label="Previous"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m15 6-6 6 6 6" />
                      </svg>
                    </button>
                    <span className="min-w-[72px] text-center text-[13px] font-medium text-[#8392AB]">
                      {selectedIndex + 1} of {Math.max(list.length, 200)}
                    </span>
                    <button
                      type="button"
                      onClick={goNext}
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md hover:bg-[#f3f4f6]"
                      aria-label="Next"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9 6 6 6-6 6" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => toggleStar(selected.id)}
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md hover:bg-[#f3f4f6]"
                      aria-label="Mark"
                    >
                      {starredIds.has(selected.id) ? (
                        <img src={importantFillIcon} alt="" className="h-6 w-5 object-contain" />
                      ) : (
                        <img src={importantIcon} alt="" className="h-5 w-4 object-contain opacity-55" />
                      )}
                    </button>
                    <button type="button" className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md hover:bg-[#f3f4f6]" aria-label="Print">
                      <img src={printerIcon} alt="" className="h-5 w-5 object-contain brightness-0 opacity-45" />
                    </button>
                    <button type="button" className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md hover:bg-[#f3f4f6]" aria-label="Delete">
                      <img src={deleteIcon} alt="" className="h-5 w-5 object-contain brightness-0 opacity-45" />
                    </button>
                  </div>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
                  <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full">
                        <img
                          src={selected.avatar || circleAvatar}
                          alt=""
                          className="h-full w-full rounded-full object-cover object-center"
                        />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[14px] font-semibold text-[#3F434A]">{selected.from}</p>
                        <p className="truncate text-[12px] text-[#21943A]">{selected.email}</p>
                      </div>
                    </div>
                    <p className="text-[12px] text-[#9ca3af]">{selected.date}</p>
                  </div>

                  <h2 className="mb-4 text-[22px] font-semibold text-[#3F434A] sm:text-[26px]">{selected.subject}</h2>
                  <div className="mb-6 space-y-4 text-[14px] leading-relaxed whitespace-pre-line text-[#6b7280]">
                    {selected.body}
                  </div>

                  {selected.attachments?.length ? (
                    <div className="mb-6 flex flex-wrap gap-3">
                      {selected.attachments.map((file) => (
                        <div
                          key={file.name}
                          className="flex min-w-[180px] flex-1 items-center gap-3 rounded-xl border border-[#e5e7eb] bg-[#f8fafc] px-3 py-3 sm:max-w-[240px]"
                        >
                          <img
                            src={file.type === 'zip' ? zipIcon : pdfIcon}
                            alt=""
                            className="h-10 w-10 object-contain"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[13px] font-medium text-[#3F434A]">{file.name}</p>
                            <p className="text-[11px] text-[#9ca3af]">{file.size}</p>
                          </div>
                          <button type="button" className="cursor-pointer opacity-60 hover:opacity-100" aria-label="Download">
                            <img src={downloadIcon} alt="" className="h-4 w-4 object-contain" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="border-t border-[#eeeeee] bg-white px-3 py-3 sm:px-5 sm:py-4">
                  <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#eeeeee] px-3 py-2.5 sm:px-4">
                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <span className="text-[13px] text-[#8392AB]">To:</span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f3f5] px-2.5 py-1 text-[12px] font-medium text-[#3F434A]">
                          {selected.from}
                          <button type="button" className="cursor-pointer text-[#9ca3af] hover:text-[#6b7280]" aria-label="Remove">
                            ×
                          </button>
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[13px] font-medium text-[#8392AB]">
                        <button type="button" className="cursor-pointer hover:text-[#6b7280]">
                          Cc
                        </button>
                        <button type="button" className="cursor-pointer hover:text-[#6b7280]">
                          Bcc
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1 border-b border-[#eeeeee] bg-[#f8fafc] px-2 py-2.5 sm:gap-1.5 sm:px-3 sm:py-3">
                      <button
                        type="button"
                        className="inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-md px-2.5 text-[15px] font-semibold text-[#6b7280] hover:bg-[#eef1f4]"
                      >
                        A
                        <img src={arrowDown} alt="" className="h-3 w-3 object-contain opacity-60" />
                      </button>
                      <span className="mx-1 h-5 w-px bg-[#e5e7eb]" />
                      {['B', 'I', 'U'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-[15px] font-semibold text-[#6b7280] hover:bg-[#eef1f4]"
                        >
                          {t === 'I' ? <em>{t}</em> : t === 'U' ? <span className="underline">{t}</span> : t}
                        </button>
                      ))}
                      <span className="mx-1 hidden h-5 w-px bg-[#e5e7eb] sm:block" />
                      <button type="button" className="hidden h-10 w-10 cursor-pointer items-center justify-center rounded-md text-[#6b7280] hover:bg-[#eef1f4] sm:flex" aria-label="Link">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path strokeLinecap="round" d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07L10.5 5.4" />
                          <path strokeLinecap="round" d="M14 11a5 5 0 0 0-7.07 0L4.8 13.13a5 5 0 0 0 7.07 7.07L13.5 18.6" />
                        </svg>
                      </button>
                      <button type="button" className="hidden h-10 w-10 cursor-pointer items-center justify-center rounded-md text-[#6b7280] hover:bg-[#eef1f4] sm:flex" aria-label="Emoji">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <circle cx="12" cy="12" r="8.5" />
                          <path strokeLinecap="round" d="M9 10h.01M15 10h.01M9.5 15c.8 1 1.9 1.5 2.5 1.5s1.7-.5 2.5-1.5" />
                        </svg>
                      </button>
                      <button type="button" className="hidden h-10 w-10 cursor-pointer items-center justify-center rounded-md text-[#6b7280] hover:bg-[#eef1f4] sm:flex" aria-label="Image">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
                          <circle cx="9" cy="10" r="1.5" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8 16 3.5-3.5L14 15l2-2 3.5 3" />
                        </svg>
                      </button>
                      <span className="mx-1 hidden h-5 w-px bg-[#e5e7eb] sm:block" />
                      <button type="button" className="hidden h-10 w-10 cursor-pointer items-center justify-center rounded-md text-[#6b7280] hover:bg-[#eef1f4] sm:flex" aria-label="Bullets">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="5" cy="7" r="1.3" />
                          <circle cx="5" cy="12" r="1.3" />
                          <circle cx="5" cy="17" r="1.3" />
                          <rect x="9" y="6" width="11" height="2" rx="1" />
                          <rect x="9" y="11" width="11" height="2" rx="1" />
                          <rect x="9" y="16" width="11" height="2" rx="1" />
                        </svg>
                      </button>
                      <button type="button" className="hidden h-10 w-10 cursor-pointer items-center justify-center rounded-md text-[#6b7280] hover:bg-[#eef1f4] sm:flex" aria-label="Numbers">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path strokeLinecap="round" d="M5 7h1M5 12h1.5M5 17h1M10 7h10M10 12h10M10 17h10" />
                        </svg>
                      </button>
                      <span className="mx-1 h-5 w-px bg-[#e5e7eb]" />
                      {[alignLeft, alignCenter, alignRight, alignJustify].map((src, i) => (
                        <button
                          key={i}
                          type="button"
                          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md hover:bg-[#eef1f4]"
                        >
                          <img src={src} alt="" className="h-4 w-4 object-contain opacity-55" />
                        </button>
                      ))}
                    </div>

                    <div className="relative px-3 pt-3 sm:px-4">
                      <textarea
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        placeholder="Type something"
                        rows={4}
                        className="min-h-[96px] w-full resize-y bg-transparent pb-6 text-[13px] text-[#3F434A] outline-none placeholder:text-[#c4c9d1]"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 px-3 py-3 sm:px-4">
                      <div className="inline-flex overflow-hidden rounded-md">
                        <button
                          type="button"
                          onClick={() => setReply('')}
                          className="h-10 cursor-pointer bg-[#21943A] px-5 text-[13px] font-medium text-white hover:bg-[#1a7a3a]"
                        >
                          Send
                        </button>
                        <button
                          type="button"
                          className="flex h-10 w-10 cursor-pointer items-center justify-center border-l border-white/25 bg-[#21943A] hover:bg-[#1a7a3a]"
                          aria-label="Schedule send"
                        >
                          <img src={timeIcon} alt="" className="h-4 w-4 object-contain brightness-0 invert" />
                        </button>
                      </div>
                      <button type="button" className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md hover:bg-[#f3f4f6]" aria-label="Attach">
                        <img
                          src={attachmentIcon}
                          alt=""
                          className="h-5 w-5 object-contain brightness-0 opacity-45 hover:opacity-60"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center text-[13px] text-[#9ca3af]">Select a message</div>
            )}
          </section>
        </main>
      </div>

    </div>
  )
}
