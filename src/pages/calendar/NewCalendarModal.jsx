import { useEffect, useRef, useState } from 'react'

const COLORS = [
  { id: 'coral', soft: '#FFE8E6', hard: '#FF6B6B' },
  { id: 'teal', soft: '#E6F9FB', hard: '#54D1DB' },
  { id: 'yellow', soft: '#FFF6D6', hard: '#F2C94C' },
  { id: 'green', soft: '#E8F8EC', hard: '#7BC67E' },
  { id: 'sky', soft: '#E8F6FF', hard: '#5BC0EB' },
  { id: 'lime', soft: '#F1FBE8', hard: '#A3E635' },
  { id: 'mint', soft: '#ECFDF5', hard: '#34D399' },
  { id: 'purple', soft: '#F3E8FF', hard: '#B07CFF' },
  { id: 'pink', soft: '#FCE7F3', hard: '#F472B6' },
  { id: 'slate', soft: '#F1F3F5', hard: '#A0AEC0' },
]

export default function NewCalendarModal({ onClose, onCreate }) {
  const [name, setName] = useState('Personal')
  const [description, setDescription] = useState('')
  const [colorId, setColorId] = useState('teal')
  const panelRef = useRef(null)

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  function handleCreate(e) {
    e.preventDefault()
    const color = COLORS.find((c) => c.id === colorId) || COLORS[1]
    onCreate?.({
      name: name.trim() || 'Personal',
      description: description.trim(),
      color: color.hard,
    })
    onClose?.()
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/20 p-4">
      <button type="button" aria-label="Close" className="absolute inset-0 cursor-default" onClick={onClose} />
      <form
        ref={panelRef}
        onSubmit={handleCreate}
        className="relative z-[1] my-auto w-full max-w-[380px] rounded-2xl border border-[#e5e7eb] bg-white px-5 py-5 shadow-[0_20px_50px_rgba(16,24,40,0.22),0_4px_14px_rgba(16,24,40,0.1)] sm:px-6 sm:py-6"
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <h2 className="text-[20px] font-semibold text-[#3F434A] sm:text-[22px]">New Calendar</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-[#9ca3af] hover:bg-[#f3f4f6] hover:text-[#6b7280]"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <label className="mb-1.5 block text-[12px] text-[#8392AB]">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 h-11 w-full rounded-xl border border-[#e5e7eb] px-4 text-[13px] text-[#3F434A] outline-none focus:border-[#86efac]"
        />

        <label className="mb-1.5 block text-[12px] text-[#8392AB]">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Type something"
          rows={4}
          className="mb-5 w-full resize-none rounded-xl border border-[#e5e7eb] px-4 py-3 text-[13px] text-[#3F434A] outline-none placeholder:text-[#c4c9d1] focus:border-[#86efac]"
        />

        <p className="mb-3 text-[12px] text-[#8392AB]">Color</p>
        <div className="mb-6 grid grid-cols-5 gap-2 sm:gap-2.5">
          {COLORS.map((c) => {
            const selected = colorId === c.id
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setColorId(c.id)}
                className="relative flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg sm:h-11"
                style={{
                  backgroundColor: c.soft,
                  boxShadow: `inset 0 4px 0 0 ${c.hard}`,
                }}
                aria-label={`Color ${c.id}`}
                aria-pressed={selected}
              >
                {selected ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.8"
                    style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.28))' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5L20 7" />
                  </svg>
                ) : null}
              </button>
            )
          })}
        </div>

        <button
          type="submit"
          className="h-11 w-full cursor-pointer rounded-md bg-[#21943A] text-[14px] font-medium text-white hover:bg-[#1a7a3a]"
        >
          Create
        </button>
      </form>
    </div>
  )
}
