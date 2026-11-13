import { useState } from 'react'

const COLORS = [
  { id: 'coral', hard: '#FF6B6B', soft: '#FFE8E6' },
  { id: 'teal', hard: '#54D1DB', soft: '#E6F9FB' },
  { id: 'yellow', hard: '#F2C94C', soft: '#FFF6D6' },
  { id: 'green', hard: '#7BC67E', soft: '#E8F8EC' },
  { id: 'sky', hard: '#5BA4F5', soft: '#E8F6FF' },
  { id: 'lime', hard: '#A3E635', soft: '#F1FBE8' },
  { id: 'mint', hard: '#34D399', soft: '#ECFDF5' },
  { id: 'purple', hard: '#B07CFF', soft: '#F3E8FF' },
  { id: 'pink', hard: '#F472B6', soft: '#FCE7F3' },
  { id: 'slate', hard: '#A0AEC0', soft: '#F1F3F5' },
]

export default function NewLabelPanel({ onClose, onCreate }) {
  const [name, setName] = useState('Personal')
  const [colorId, setColorId] = useState('teal')

  function handleCreate(e) {
    e.preventDefault()
    const color = COLORS.find((c) => c.id === colorId) || COLORS[1]
    onCreate?.({
      name: name.trim() || 'Personal',
      color: color.hard,
    })
    onClose?.()
  }

  return (
    <section className="flex w-full min-w-0 flex-col border-r border-[#eeeeee] bg-white md:w-[300px] lg:w-[320px]">
      <form onSubmit={handleCreate} className="flex min-h-0 flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[22px] leading-none font-semibold text-[#3F434A]">New Label</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-[#9ca3af] hover:bg-[#f3f4f6] hover:text-[#6b7280]"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-[12px] leading-none text-[#8392AB]">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 w-full rounded-xl border border-[#e5e7eb] px-4 text-[13px] text-[#3F434A] outline-none focus:border-[#86efac]"
          />
        </div>

        <div className="mb-7">
          <p className="mb-3 text-[12px] leading-none text-[#8392AB]">Color</p>
          <div className="grid grid-cols-5 gap-x-3 gap-y-4">
            {COLORS.map((c) => {
              const selected = colorId === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColorId(c.id)}
                  aria-label={`Color ${c.id}`}
                  aria-pressed={selected}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center justify-self-start rounded-full"
                  style={{ backgroundColor: selected ? c.soft : 'transparent' }}
                >
                  <span
                    className="relative flex h-[22px] w-[22px] items-center justify-center rounded-full"
                    style={{ backgroundColor: c.hard }}
                  >
                    {selected ? (
                      <span className="absolute h-2 w-2 rounded-full bg-white" />
                    ) : null}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <button
          type="submit"
          className="h-11 w-full cursor-pointer rounded-md bg-[#21943A] text-[14px] font-medium text-white hover:bg-[#1a7a3a]"
        >
          Create
        </button>
      </form>
    </section>
  )
}
