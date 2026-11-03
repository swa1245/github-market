import { useEffect, useRef, useState } from 'react'
import arrowDownIcon from '../../assets/images/arrow-down-02.png'
import calendarIcon from '../../assets/images/Calendar.svg'

const options = ['Last 7 days', 'Last 14 days', 'Last 30 days', 'This month', 'Last month']

export default function DateFilterMenu() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('Last 7 days')
  const ref = useRef(null)

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex h-9 cursor-pointer items-center gap-2 rounded-full bg-white px-3 text-[12px] font-medium text-[#4b5563] shadow-[0_1px_3px_rgba(16,24,40,0.08)] transition hover:bg-[#f9fafb] sm:h-10 sm:px-4 sm:text-[14px] ${
          open ? 'ring-1 ring-[#86efac]' : ''
        }`}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <img src={calendarIcon} alt="" className="hidden h-3.5 w-3.5 object-contain sm:block" />
        {selected}
        <img
          src={arrowDownIcon}
          alt=""
          className={`h-3 w-3 object-contain transition ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open ? (
        <div className="absolute top-full right-0 z-50 mt-2 w-[180px] overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white py-2 shadow-[0_16px_48px_rgba(16,24,40,0.22),0_4px_12px_rgba(16,24,40,0.08)] ring-1 ring-black/5">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              role="menuitem"
              onClick={() => {
                setSelected(opt)
                setOpen(false)
              }}
              className={`flex w-full cursor-pointer items-center px-3.5 py-2.5 text-left text-[13px] font-medium text-[#4b5563] transition hover:bg-[#f3f4f6] ${
                selected === opt ? 'bg-[#f3f4f6] text-[#1f2937]' : ''
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
