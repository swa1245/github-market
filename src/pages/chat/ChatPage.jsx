import { useState } from 'react'
import Header from '../../components/dashboard/Header'
import Sidebar from '../../components/dashboard/Sidebar'
import avatar from '../../assets/images/user-avatar.svg'
import profileAvatar from '../../assets/images/profile-avatar.png'

const friends = [
  {
    id: 'charlie',
    name: 'Charlie Watson',
    preview: 'Typing...',
    typing: true,
    time: '',
  },
  {
    id: 'jane',
    name: 'Jane Doe',
    preview: 'Computer users and programmers',
    time: '1 hour ago',
  },
  {
    id: 'mila',
    name: 'Mila Skylar',
    preview: 'You can subscribe to receive weekly...',
    time: '24 min ago',
  },
  {
    id: 'sofia',
    name: 'Sofia Scarlett',
    preview: "It's an effective resource regardless..",
    time: '7 hours ago',
  },
  {
    id: 'tom',
    name: 'Tom Klein',
    preview: 'Be sure to check it out if your dev pro...',
    time: '1 day ago',
  },
]

const initialMessages = [
  {
    id: 1,
    from: 'them',
    text: 'It contains a lot of good lessons about effective practices',
    time: '3:14am',
  },
  {
    id: 2,
    from: 'me',
    text: 'Can it generate daily design links that include essays and data visualizations ?',
    time: '4:42pm',
  },
  { id: 3, type: 'date', text: 'Wed, 3:27pm' },
  {
    id: 4,
    from: 'them',
    text: 'Yeah! Responsive Design is geared towards those trying to build web apps',
    time: '4:31pm',
  },
  {
    id: 5,
    from: 'me',
    text: 'Excellent, I want it now !',
    time: '4:42pm',
  },
  {
    id: 6,
    from: 'them',
    text: 'You can easily get it; The content here is all free',
    time: '4:42pm',
  },
  {
    id: 7,
    from: 'me',
    text: 'Awesome, blog is important source material for anyone who creates apps? Beacuse these blogs offer a lot of information about website development.',
    time: '4:42pm',
  },
  {
    id: 8,
    from: 'them',
    text: 'At the end of the day … the native dev apps is where users are',
    time: '4:47pm',
  },
]

export default function ChatPage({
  onOpenSettings,
  onLock,
  onLogout,
  onOpenDashboard,
  onOpenProducts,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeId, setActiveId] = useState('charlie')
  const [messages, setMessages] = useState(initialMessages)
  const [draft, setDraft] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const active = friends.find((f) => f.id === activeId) || friends[0]

  function sendMessage(e) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        from: 'me',
        text,
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      },
    ])
    setDraft('')
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
        activeLabel="Chat"
        onNavigate={(label) => {
          if (label === 'Dashboard' && onOpenDashboard) onOpenDashboard()
          if (label === 'Products') onOpenProducts?.()
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

        <main className="min-h-0 flex-1 overflow-hidden p-3 sm:p-4 lg:p-5">
          <div className="flex h-full min-h-0 overflow-hidden rounded-2xl border border-[#f0f1f3] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            {/* Friends list */}
            <aside className="hidden w-[280px] shrink-0 flex-col border-r border-[#eeeeee] sm:flex lg:w-[300px]">
              <div className="border-b border-[#eeeeee] px-4 py-4">
                <h2 className="text-[16px] font-medium text-[#3F434A]">Friends</h2>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto p-2">
                {friends.map((f) => {
                  const selected = f.id === activeId
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setActiveId(f.id)}
                      className={`mb-1 flex w-full cursor-pointer items-start gap-3 rounded-xl px-3 py-3 text-left transition ${
                        selected ? 'bg-[#E8F8EC]' : 'hover:bg-[#f8fafc]'
                      }`}
                    >
                      <img
                        src={avatar}
                        alt=""
                        className="h-10 w-10 shrink-0 rounded-full border-2 border-white object-cover shadow-[0_0_0_1px_#e5e7eb]"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-[13px] font-medium text-[#3F434A]">{f.name}</p>
                          {f.time ? (
                            <span className="shrink-0 text-[10px] text-[#9ca3af]">{f.time}</span>
                          ) : null}
                        </div>
                        <p
                          className={`mt-0.5 truncate text-[12px] ${
                            f.typing ? 'font-medium text-[#21943A]' : 'text-[#9ca3af]'
                          }`}
                        >
                          {f.preview}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </aside>

            {/* Conversation */}
            <section className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-center justify-between gap-3 border-b border-[#eeeeee] px-4 py-3 sm:px-5">
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={profileAvatar}
                    alt=""
                    className="h-11 w-11 shrink-0 rounded-full border-2 border-white object-cover object-top shadow-[0_0_0_1px_#e5e7eb]"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-medium text-[#3F434A]">{active.name}</p>
                    <p className="text-[12px] text-[#9ca3af]">last seen today at 1:53am</p>
                  </div>
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setMenuOpen((v) => !v)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[#9ca3af] hover:bg-[#f3f4f6]"
                    aria-label="Chat options"
                  >
                    <span className="text-[18px] leading-none tracking-widest">···</span>
                  </button>
                  {menuOpen ? (
                    <div className="absolute top-full right-0 z-20 mt-1 w-48 overflow-hidden rounded-xl border border-[#eeeeee] bg-white py-1 shadow-[0_8px_24px_rgba(16,24,40,0.12)]">
                      {['Profile', 'Mute conversation', 'Block', 'Clear chat', 'Delete chat'].map(
                        (item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setMenuOpen(false)}
                            className="block w-full cursor-pointer px-4 py-2 text-left text-[13px] text-[#3F434A] hover:bg-[#f8fafc]"
                          >
                            {item}
                          </button>
                        ),
                      )}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* mobile friends strip */}
              <div className="flex gap-2 overflow-x-auto border-b border-[#eeeeee] px-3 py-2 sm:hidden">
                {friends.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setActiveId(f.id)}
                    className={`shrink-0 cursor-pointer rounded-full px-3 py-1.5 text-[12px] font-medium ${
                      f.id === activeId
                        ? 'bg-[#B9EB8E] text-[#0D1B2A]'
                        : 'bg-[#f3f4f6] text-[#6b7280]'
                    }`}
                  >
                    {f.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-[#fafbfc] px-4 py-4 sm:px-5">
                {messages.map((m) => {
                  if (m.type === 'date') {
                    return (
                      <div key={m.id} className="flex justify-center py-1">
                        <span className="rounded-full bg-white px-3 py-1 text-[11px] text-[#9ca3af] shadow-sm">
                          {m.text}
                        </span>
                      </div>
                    )
                  }

                  const mine = m.from === 'me'
                  return (
                    <div
                      key={m.id}
                      className={`flex ${mine ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] sm:max-w-[70%] ${mine ? 'items-end' : 'items-start'} flex flex-col`}>
                        <div
                          className={`rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                            mine
                              ? 'rounded-br-md bg-[#21943A] text-white'
                              : 'rounded-bl-md bg-white text-[#3F434A] shadow-[0_1px_2px_rgba(16,24,40,0.06)]'
                          }`}
                        >
                          {m.text}
                        </div>
                        <span className="mt-1 px-1 text-[10px] text-[#9ca3af]">{m.time}</span>
                      </div>
                    </div>
                  )
                })}

                {active.typing ? (
                  <p className="text-[12px] font-medium text-[#21943A]">Charlie is Typing...</p>
                ) : null}
              </div>

              <form
                onSubmit={sendMessage}
                className="flex items-center gap-2 border-t border-[#eeeeee] bg-white px-3 py-3 sm:gap-3 sm:px-4"
              >
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Type a message..."
                  className="min-w-0 flex-1 rounded-xl border border-[#e5e7eb] bg-[#f8fafc] px-3 py-2.5 text-[13px] text-[#3F434A] outline-none placeholder:text-[#9ca3af] focus:border-[#86efac]"
                />
                <button
                  type="submit"
                  className="cursor-pointer rounded-xl bg-[#21943A] px-4 py-2.5 text-[13px] font-medium text-white hover:bg-[#1a7a3a]"
                >
                  Send
                </button>
              </form>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
