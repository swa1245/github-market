import { useEffect, useRef, useState } from 'react'
import downloadIcon from '../../assets/images/Download.svg'
import arrowDownIcon from '../../assets/images/arrow-down-02.png'
import printIcon from '../../assets/images/Printer.png'
import excelIcon from '../../assets/images/Excel.png'
import pdfIcon from '../../assets/images/PDF.png'
import csvIcon from '../../assets/images/CSV.png'

const options = [
  { label: 'Print', icon: printIcon },
  { label: 'Excel', icon: excelIcon },
  { label: 'PDF', icon: pdfIcon },
  { label: 'CSV', icon: csvIcon },
]

export default function ExportMenu() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('Excel')
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
        className={`inline-flex h-9 cursor-pointer items-center gap-2 rounded-xl border bg-white px-3 text-[12px] font-medium text-[#4b5563] shadow-[0_1px_3px_rgba(16,24,40,0.08)] transition hover:bg-[#f9fafb] sm:h-10 sm:px-3.5 sm:text-[13px] ${
          open ? 'border-[#86efac]' : 'border-transparent sm:border-[#e5e7eb]'
        }`}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <img src={downloadIcon} alt="" className="h-4 w-4" />
        <span className="hidden sm:inline">Export</span>
        <img
          src={arrowDownIcon}
          alt=""
          className={`hidden h-3 w-3 object-contain transition sm:block ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open ? (
        <div className="absolute top-full right-0 z-50 mt-2 w-[180px] overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white py-2 shadow-[0_16px_48px_rgba(16,24,40,0.22),0_4px_12px_rgba(16,24,40,0.08)] ring-1 ring-black/5">
          {options.map((opt) => (
            <button
              key={opt.label}
              type="button"
              role="menuitem"
              onClick={() => {
                setActive(opt.label)
                setOpen(false)
              }}
              className={`flex w-full cursor-pointer items-center gap-3 px-3.5 py-2.5 text-left text-[13px] font-medium text-[#4b5563] transition hover:bg-[#f3f4f6] ${
                active === opt.label ? 'bg-[#f3f4f6]' : ''
              }`}
            >
              <img src={opt.icon} alt="" className="h-[18px] w-[18px] object-contain" />
              {opt.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
