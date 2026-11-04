import { useId, useState } from 'react'
import avatar from '../../assets/images/user-avatar.svg'
import circleAvatar from '../../assets/images/circle-avatar.png'
import cameraIcon from '../../assets/images/Camera.png'

const friends = [
  { id: 'regina', name: 'Regina Cooper', typing: true, badge: 0 },
  { id: 'charlie', name: 'Charlie Watson', badge: 8 },
  { id: 'jane', name: 'Jane Doe', badge: 0 },
  { id: 'mila', name: 'Mila Skylar', badge: 4 },
  { id: 'sofia', name: 'Sofia Scarlett', badge: 0 },
  { id: 'tom', name: 'Tom Klein', badge: 0 },
  { id: 'alex', name: 'Alex Rivera', badge: 2 },
  { id: 'nina', name: 'Nina Brooks', badge: 0 },
  { id: 'omar', name: 'Omar Hassan', badge: 1 },
  { id: 'lily', name: 'Lily Chen', badge: 0 },
]

/** Soft UI Soft Design bubble shape from Chat.svg (stretchable, tintable) */
function ChatBubble({ mine, children }) {
  const uid = useId().replace(/:/g, '')
  const maskId = `chat-bubble-mask-${uid}`
  const fill = mine ? '#21943A' : '#ffffff'

  return (
    <div
      className={`relative max-w-full ${
        mine ? 'text-white' : 'text-[#3F434A] drop-shadow-[0_1px_2px_rgba(16,24,40,0.08)]'
      }`}
    >
      <svg
        aria-hidden
        className={`pointer-events-none absolute inset-0 h-full w-full ${mine ? '' : 'scale-x-[-1]'}`}
        viewBox="0 0 303 48"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id={maskId}
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="303"
          height="48"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="#F8F8F8"
            d="M287 0C295.837 0 303 7.16344 303 16V32C303 40.8366 295.837 48 287 48H9H0.480499C0.215118 48 0 47.7849 0 47.5195C0 47.3209 0.122528 47.1436 0.305756 47.0671C5.38245 44.9474 9 39.449 9 33V16C9 7.16344 16.1635 0 25 0H287Z"
          />
        </mask>
        <g mask={`url(#${maskId})`}>
          <rect width="305.349" height="48" transform="matrix(-1 0 0 1 303 0)" fill={fill} />
        </g>
      </svg>
      <span
        className={`relative z-[1] block py-2.5 text-[13px] leading-snug ${
          mine ? 'pr-4 pl-5' : 'pr-5 pl-4'
        }`}
      >
        {children}
      </span>
    </div>
  )
}

const seedMessages = [
  {
    id: 1,
    from: 'them',
    text: 'Morning! Have you tried Soft UI Soft Design for admin panels?',
    time: '09:40am',
  },
  {
    id: 2,
    from: 'me',
    text: 'Yes — the charts and cards feel really clean.',
    time: '09:41am',
  },
  {
    id: 3,
    from: 'them',
    text: 'Hey there! Looking for the best dashboard template — Soft UI Soft Design looks perfect.',
    time: '09:45am',
  },
  {
    id: 4,
    from: 'me',
    text: 'Hey! Soft UI Soft Design is a great pick for modern dashboards.',
    time: '09:46am',
  },
  {
    id: 5,
    from: 'them',
    text: 'Can it generate daily design links that include essays and data visualizations?',
    time: '09:46am',
  },
  { id: 6, type: 'date', text: 'MONDAY' },
  {
    id: 7,
    from: 'me',
    text: 'Yeah! Soft UI Soft Design is geared towards those trying to build web apps.',
    time: '09:47am',
  },
  {
    id: 8,
    from: 'them',
    text: 'Excellent, I want it now!',
    time: '09:47am',
  },
  {
    id: 9,
    from: 'me',
    text: 'You can easily get it — Soft UI Soft Design content here is ready to use.',
    time: '09:48am',
  },
  {
    id: 10,
    from: 'them',
    text: 'Does Soft UI Soft Design include chat and settings screens too?',
    time: '09:49am',
  },
  {
    id: 11,
    from: 'me',
    text: 'It does — overview, followers, and messaging are all covered.',
    time: '09:50am',
  },
  {
    id: 12,
    from: 'them',
    text: 'Perfect. Sending the Soft UI Soft Design kit to the team now.',
    time: '09:51am',
  },
  {
    id: 13,
    from: 'me',
    text: 'Great — Soft UI Soft Design also ships with ready-made widgets.',
    time: '09:52am',
  },
  {
    id: 14,
    from: 'them',
    text: 'Nice. Can Soft UI Soft Design handle dark mode later?',
    time: '09:53am',
  },
  {
    id: 15,
    from: 'me',
    text: 'Yes, Soft UI Soft Design tokens make theming straightforward.',
    time: '09:54am',
  },
  {
    id: 16,
    from: 'them',
    text: 'Awesome. Soft UI Soft Design is exactly what we needed.',
    time: '09:55am',
  },
  {
    id: 17,
    from: 'me',
    text: 'Glad it helps — Soft UI Soft Design keeps building fast and clean.',
    time: '09:56am',
  },
  {
    id: 18,
    from: 'them',
    text: 'One more thing — Soft UI Soft Design export for Figma?',
    time: '09:57am',
  },
  {
    id: 19,
    from: 'me',
    text: 'Yep, Soft UI Soft Design includes a matching Figma file.',
    time: '09:58am',
  },
  {
    id: 20,
    from: 'them',
    text: 'Locked in. Soft UI Soft Design is our go-to kit now.',
    time: '09:59am',
  },
]

export default function ChatPanel({ open, onClose }) {
  const [activeId, setActiveId] = useState('regina')
  const [messages, setMessages] = useState(seedMessages)
  const [draft, setDraft] = useState('')
  const active = friends.find((f) => f.id === activeId) || friends[0]

  function send(e) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        from: 'me',
        text,
        time: new Date()
          .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
          .toLowerCase()
          .replace(' ', ''),
      },
    ])
    setDraft('')
  }

  return (
    <>
      <button
        type="button"
        aria-label="Close chat"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/30 transition lg:bg-black/10 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        className={`fixed inset-y-0 right-0 z-50 flex transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* conversation — Soft UI Soft Design structure */}
        <section className="flex h-full w-[min(100vw-64px,360px)] flex-col border-l border-[#eeeeee] bg-[#f5f7fb] shadow-[-8px_0_24px_rgba(16,24,40,0.08)] sm:w-[380px]">
          <div className="flex shrink-0 items-center justify-between border-b border-[#e8eaed] bg-white px-4 py-3">
            <button
              type="button"
              className="flex h-8 w-8 cursor-pointer items-center justify-center text-[#9ca3af] hover:text-[#6b7280]"
              aria-label="More"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <circle cx="5" cy="12" r="1.75" />
                <circle cx="12" cy="12" r="1.75" />
                <circle cx="19" cy="12" r="1.75" />
              </svg>
            </button>
            <button
              type="button"
              className="flex h-8 w-8 cursor-pointer items-center justify-center opacity-70 hover:opacity-100"
              aria-label="Camera"
            >
              <img src={cameraIcon} alt="" className="h-5 w-5 object-contain" />
            </button>
          </div>

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 pt-6 pb-4">
            {messages.map((m) => {
              if (m.type === 'date') {
                return (
                  <div key={m.id} className="flex items-center gap-3 py-2">
                    <div className="h-px flex-1 bg-[#e5e7eb]" />
                    <span className="text-[11px] font-medium tracking-[0.08em] text-[#9ca3af]">
                      {m.text}
                    </span>
                    <div className="h-px flex-1 bg-[#e5e7eb]" />
                  </div>
                )
              }

              const mine = m.from === 'me'
              const face = mine ? circleAvatar : avatar
              const avatarEl = (
                <img
                  src={face}
                  alt=""
                  className={`mb-1.5 shrink-0 self-end rounded-full border-2 border-white object-cover object-top shadow-[0_0_0_1px_#e8eaed] ${
                    mine ? 'h-14 w-14' : 'h-12 w-12'
                  }`}
                />
              )

              return (
                <div
                  key={m.id}
                  className={`flex items-end gap-2 ${mine ? '' : 'justify-end'}`}
                >
                  {mine ? avatarEl : null}

                  <div className={`min-w-0 max-w-[82%] ${mine ? '' : 'text-right'}`}>
                    <ChatBubble mine={mine}>{m.text}</ChatBubble>
                    <p
                      className={`mt-1 text-[11px] leading-none text-[#9ca3af] ${
                        mine ? '' : 'text-right'
                      }`}
                    >
                      {m.time}
                    </p>
                  </div>

                  {mine ? null : avatarEl}
                </div>
              )
            })}

          </div>

          {active.typing ? (
            <p className="flex items-center justify-center gap-0.5 px-4 pb-2 text-center text-[13px] text-[#9ca3af]">
              <span>{active.name} is typing</span>
              <span className="inline-flex items-center gap-[2px] pl-0.5" aria-hidden>
                <span className="chat-typing-dot h-[3px] w-[3px] rounded-full bg-[#9ca3af]" />
                <span className="chat-typing-dot h-[3px] w-[3px] rounded-full bg-[#9ca3af] [animation-delay:0.2s]" />
                <span className="chat-typing-dot h-[3px] w-[3px] rounded-full bg-[#9ca3af] [animation-delay:0.4s]" />
              </span>
            </p>
          ) : null}

          {/* Soft UI Soft Design input bar */}
          <form
            onSubmit={send}
            className="flex items-center gap-2 border-t border-[#eeeeee] bg-white px-3 py-3"
          >
            <button
              type="button"
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center text-[#9ca3af] hover:text-[#6b7280]"
              aria-label="Attach"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.44 11.05l-8.49 8.49a5.25 5.25 0 0 1-7.42-7.42l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a1.75 1.75 0 0 1-2.47-2.47l8.49-8.48"
                />
              </svg>
            </button>

            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message"
              className="min-w-0 flex-1 bg-transparent text-[13px] text-[#3F434A] outline-none placeholder:text-[#9ca3af]"
            />

            <button
              type="button"
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center text-[#9ca3af] hover:text-[#6b7280]"
              aria-label="Emoji"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" d="M8.5 10h.01M15.5 10h.01M8.5 15c1.2 1.2 2.6 1.8 3.5 1.8s2.3-.6 3.5-1.8" />
              </svg>
            </button>

            <button
              type="submit"
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#21943A] text-white hover:bg-[#1a7a3a]"
              aria-label="Send"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.4 20.6 21 12 3.4 3.4l.1 6.7L15 12 3.5 13.9l-.1 6.7z" />
              </svg>
            </button>
          </form>
        </section>

        {/* Soft UI Soft Design vertical contacts rail */}
        <aside className="flex h-full w-16 shrink-0 flex-col items-center border-l border-[#eeeeee] bg-[#f8fafc] py-3 sm:w-[72px]">
          <button
            type="button"
            onClick={onClose}
            className="mb-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-[#9ca3af] shadow-sm hover:bg-[#f3f4f6]"
            aria-label="Close chat"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <div className="flex min-h-0 flex-1 flex-col items-center gap-6 overflow-y-auto px-1 py-1">
            {friends.map((f) => {
              const selected = f.id === activeId
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveId(f.id)}
                  className="relative cursor-pointer"
                  aria-label={f.name}
                >
                  <img
                    src={avatar}
                    alt=""
                    className={`h-11 w-11 rounded-full object-cover transition ${
                      selected
                        ? 'border-[3px] border-white shadow-[0_4px_14px_rgba(16,24,40,0.18)] ring-2 ring-[#21943A]/20'
                        : 'border-2 border-transparent opacity-90 hover:opacity-100'
                    }`}
                  />
                  {f.badge > 0 ? (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ef4444] px-1 text-[9px] font-semibold text-white">
                      {f.badge}
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>

          <div className="mt-3 w-10 border-t border-[#e5e7eb] pt-3">
            <button
              type="button"
              className="mx-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-dashed border-[#21943A] text-[#21943A] hover:bg-[#E8F8EC]"
              aria-label="Add chat"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
        </aside>
      </div>
    </>
  )
}
