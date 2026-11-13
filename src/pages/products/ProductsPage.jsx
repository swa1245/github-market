import { useEffect, useMemo, useRef, useState } from 'react'
import Header from '../../components/dashboard/Header'
import Sidebar from '../../components/dashboard/Sidebar'
import ExportMenu from '../../components/dashboard/ExportMenu'
import searchIcon from '../../assets/images/search-01.svg'
import listIcon from '../../assets/images/List 2.png'
import gridIcon from '../../assets/images/Grid.png'
import filterIcon from '../../assets/images/Filter.png'
import arrowDownIcon from '../../assets/images/arrow-down-01.png'
import arrowDown02Icon from '../../assets/images/arrow-down-02.png'
import firstIcon from '../../assets/images/First.png'
import lastIcon from '../../assets/images/Last.png'
import calendarIcon from '../../assets/images/Calendar.svg'
import pictureIcon from '../../assets/images/picture.png'
import checkedIcon from '../../assets/images/Checked.png'
import deleteIcon from '../../assets/images/Delete.png'
import alignLeftIcon from '../../assets/images/Align-Left.png'
import alignCenterIcon from '../../assets/images/Align- Center.png'
import alignRightIcon from '../../assets/images/Align-Right.png'
import alignJustifyIcon from '../../assets/images/Align-Justify.png'

const columns = [
  { key: 'name', label: 'PRODUCT NAME' },
  { key: 'no', label: 'PRODUCT NO.' },
  { key: 'category', label: 'CATEGORY' },
  { key: 'date', label: 'DATE' },
  { key: 'price', label: 'PRICE' },
  { key: 'status', label: 'STATUS' },
]

const products = [
  {
    id: 1,
    name: 'Apple iPhone 11 Pro Max 256GB Space Gray',
    no: '#790841',
    category: 'Phone',
    date: '12.09.20',
    price: '$2.500',
    status: 'Available',
  },
  {
    id: 2,
    name: 'Apple iPhone 11 Pro Max 64GB Midnight Green',
    no: '#790841',
    category: 'Phone',
    date: '12.09.20',
    price: '$2.500',
    status: 'Available',
  },
  {
    id: 3,
    name: 'Apple Watch Series 5 Edition GPS + Cellular',
    no: '#790841',
    category: 'Watch',
    date: '12.09.20',
    price: '$2.500',
    status: 'Disabled',
  },
  {
    id: 4,
    name: 'Apple iPhone 11 Pro 512GB Space Gray',
    no: '#790841',
    category: 'Phone',
    date: '12.09.20',
    price: '$2.500',
    status: 'Available',
  },
  {
    id: 5,
    name: 'AirPods 2nd Gen',
    no: '#790841',
    category: 'Accessories',
    date: '12.09.20',
    price: '$2.500',
    status: 'Disabled',
  },
  {
    id: 6,
    name: 'MacBook Pro 15"',
    no: '#790841',
    category: 'Notebook',
    date: '12.09.20',
    price: '$2.500',
    status: 'Available',
  },
  {
    id: 7,
    name: 'MacBook Pro 15"',
    no: '#790841',
    category: 'Notebook',
    date: '12.09.20',
    price: '$2.500',
    status: 'Available',
  },
  {
    id: 8,
    name: 'MacBook Pro 15"',
    no: '#790841',
    category: 'Notebook',
    date: '12.09.20',
    price: '$2.500',
    status: 'Available',
  },
  {
    id: 9,
    name: 'MacBook Pro 15"',
    no: '#790841',
    category: 'Notebook',
    date: '12.09.20',
    price: '$2.500',
    status: 'Available',
  },
  {
    id: 10,
    name: 'MacBook Pro 15"',
    no: '#790841',
    category: 'Notebook',
    date: '12.09.20',
    price: '$2.500',
    status: 'Available',
  },
]

const tabs = [
  { id: 'all', label: 'All', count: 283 },
  { id: 'available', label: 'Available', count: 268 },
  { id: 'disabled', label: 'Disabled', count: 15 },
]

function formatDate(d) {
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}.${month}.${year}`
}

function sameDay(a, b) {
  return (
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function MiniCalendar({ value, onSelect, onClose }) {
  const [view, setView] = useState(new Date(value.getFullYear(), value.getMonth(), 1))
  const year = view.getFullYear()
  const month = view.getMonth()
  const firstDow = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const blanks = Array.from({ length: firstDow }, (_, i) => i)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const monthLabel = view.toLocaleString('en', { month: 'long', year: 'numeric' })

  return (
    <div className="absolute top-full left-0 z-[60] mt-2 w-[260px] rounded-2xl border border-[#eeeeee] bg-white p-3 shadow-[0_16px_40px_rgba(16,24,40,0.16)]">
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setView(new Date(year, month - 1, 1))}
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-[#6b7280] hover:bg-[#f3f4f6]"
          aria-label="Previous month"
        >
          ‹
        </button>
        <p className="text-[13px] font-medium text-[#3F434A]">{monthLabel}</p>
        <button
          type="button"
          onClick={() => setView(new Date(year, month + 1, 1))}
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-[#6b7280] hover:bg-[#f3f4f6]"
          aria-label="Next month"
        >
          ›
        </button>
      </div>
      <div className="mb-1 grid grid-cols-7 gap-0.5 text-center text-[10px] font-medium text-[#9ca3af]">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <span key={d} className="py-1">
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center">
        {blanks.map((b) => (
          <span key={`b-${b}`} />
        ))}
        {days.map((day) => {
          const date = new Date(year, month, day)
          const selected = sameDay(date, value)
          return (
            <button
              key={day}
              type="button"
              onClick={() => {
                onSelect(date)
                onClose()
              }}
              className={`flex h-8 w-full cursor-pointer items-center justify-center rounded-full text-[12px] ${
                selected
                  ? 'bg-[#21943A] font-medium text-white'
                  : 'text-[#3F434A] hover:bg-[#E8F8EC]'
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function ProductsPage({
  onOpenSettings,
  onOpenChat,
  onOpenDashboard,
  onOpenOrders,
  onOpenCustomers,
  onOpenCalendar,
  onOpenMail,
  onLock,
  onLogout,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tab, setTab] = useState('all')
  const [query, setQuery] = useState('')
  const [appliedName, setAppliedName] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [selected, setSelected] = useState([2, 3, 4])
  const [viewMode, setViewMode] = useState('list')
  const [page, setPage] = useState(1)
  const [addOpen, setAddOpen] = useState(false)
  const [addTab, setAddTab] = useState('information')
  const [productName, setProductName] = useState('Apple iPhone 11 Pro Max 64GB Midnight Green')
  const [description, setDescription] = useState('')
  const [textAlign, setTextAlign] = useState('left')
  const [productCategory, setProductCategory] = useState('Phone')
  const [tags, setTags] = useState(['Apple', 'iPhone', '64GB'])
  const [tagDraft, setTagDraft] = useState('')
  const [productImages, setProductImages] = useState([
    { id: 1, src: pictureIcon, cover: true },
    { id: 2, src: pictureIcon, cover: false },
    { id: 3, src: pictureIcon, cover: false },
  ])
  const imageInputRef = useRef(null)
  const dragImageId = useRef(null)
  const [taxExcluded, setTaxExcluded] = useState('2.500')
  const [taxIncluded, setTaxIncluded] = useState('0.00')
  const [taxRules, setTaxRules] = useState(['US-AL Rate (4%)', 'US-CA Rate (7.25%)', 'No tax'])
  const [taxRule, setTaxRule] = useState('US-AL Rate (4%)')
  const [newTaxOpen, setNewTaxOpen] = useState(false)
  const [newTaxName, setNewTaxName] = useState('')
  const [newTaxRate, setNewTaxRate] = useState('')
  const [unitPrice, setUnitPrice] = useState('0.00')
  const [perQty, setPerQty] = useState(0)
  const [sku, setSku] = useState('0')
  const [quantity, setQuantity] = useState(0)
  const [shipWidth, setShipWidth] = useState('0cm')
  const [shipHeight, setShipHeight] = useState('0cm')
  const [shipDepth, setShipDepth] = useState('0cm')
  const [shipWeight, setShipWeight] = useState('0kg')
  const [shipFee, setShipFee] = useState('0.00')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filterCategory, setFilterCategory] = useState('All')
  const [filterStatus, setFilterStatus] = useState('Available')
  const [priceMin, setPriceMin] = useState(500)
  const [priceMax, setPriceMax] = useState(5500)
  const [dateFrom, setDateFrom] = useState(() => new Date(2020, 6, 12))
  const [dateTo, setDateTo] = useState(() => new Date(2020, 6, 12))
  const [calendarFor, setCalendarFor] = useState(null)
  const filterRef = useRef(null)

  useEffect(() => {
    if (!filterOpen) {
      setCalendarFor(null)
      return
    }
    function onDocClick(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [filterOpen])

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const names = []
    for (const p of products) {
      if (p.name.toLowerCase().includes(q) && !names.includes(p.name)) names.push(p.name)
    }
    return names.slice(0, 6)
  }, [query])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchTab =
        tab === 'all' ||
        (tab === 'available' && p.status === 'Available') ||
        (tab === 'disabled' && p.status === 'Disabled')
      const matchQuery = !appliedName || p.name === appliedName
      return matchTab && matchQuery
    })
  }, [tab, appliedName])

  function toggleOne(id) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
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
        activeLabel="Products"
        onNavigate={(label) => {
          if (label === 'Dashboard') onOpenDashboard?.()
          if (label === 'Chat') onOpenChat?.()
          if (label === 'Products') setSidebarOpen(false)
          if (label === 'Orders') onOpenOrders?.()
          if (label === 'Customers') onOpenCustomers?.()
          if (label === 'Calendar') onOpenCalendar?.()
          if (label === 'Mail') onOpenMail?.()
        }}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          onMenuClick={() => setSidebarOpen((v) => !v)}
          onOpenSettings={onOpenSettings}
          onLock={onLock}
          onLogout={onLogout}
        />

        <main className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6">
          <div className="rounded-md border border-[#eeeeee] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-5 lg:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-[22px] font-semibold text-[#3F434A] sm:text-[24px]">Products</h1>
              <div className="flex items-center gap-2">
                <ExportMenu />
                <button
                  type="button"
                  onClick={() => {
                    setAddTab('information')
                    setAddOpen(true)
                  }}
                  className="flex h-9 w-11 cursor-pointer items-center justify-center rounded-md bg-[#21943A] text-white hover:bg-[#1a7a3a]"
                  aria-label="Add product"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                    <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#eeeeee]">
              <div className="flex items-center gap-5">
                {tabs.map((t) => {
                  const active = tab === t.id
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTab(t.id)}
                      className={`relative cursor-pointer pb-3 text-[13px] font-medium transition ${
                        active ? 'text-[#21943A]' : 'text-[#9ca3af] hover:text-[#6b7280]'
                      }`}
                    >
                      {t.label}{' '}
                      <span className={active ? 'text-[#21943A]' : 'text-[#9ca3af]'}>({t.count})</span>
                      {active ? (
                        <span className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-[#21943A]" />
                      ) : null}
                    </button>
                  )
                })}
              </div>

              <div className="flex items-center gap-1 pb-2">
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-md transition-colors duration-200 ease-out ${
                    viewMode === 'list' ? 'bg-[#21943A]' : 'hover:bg-[#f3f4f6]'
                  }`}
                  aria-label="List view"
                >
                  <img
                    src={listIcon}
                    alt=""
                    className="h-5 w-5 object-contain transition-all duration-200 ease-out"
                    style={
                      viewMode === 'list'
                        ? { filter: 'brightness(0) invert(1)' }
                        : { filter: 'grayscale(1) brightness(0.55)', opacity: 0.85 }
                    }
                  />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-md transition-colors duration-200 ease-out ${
                    viewMode === 'grid' ? 'bg-[#21943A]' : 'hover:bg-[#f3f4f6]'
                  }`}
                  aria-label="Grid view"
                >
                  <img
                    src={gridIcon}
                    alt=""
                    className="h-5 w-5 object-contain transition-all duration-200 ease-out"
                    style={
                      viewMode === 'grid'
                        ? { filter: 'brightness(0) invert(1)' }
                        : { filter: 'grayscale(1) brightness(0.55)', opacity: 0.85 }
                    }
                  />
                </button>
              </div>
            </div>

            <div className="relative mb-4 flex flex-wrap items-center gap-2">
              <div className="relative min-w-[200px] flex-1">
                <img
                  src={searchIcon}
                  alt=""
                  className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 opacity-50"
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setSearchOpen(true)
                  }}
                  onFocus={() => setSearchOpen(true)}
                  onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
                  placeholder="Search products..."
                  className={`w-full rounded-xl border bg-white py-2.5 pr-10 pl-10 text-[13px] text-[#3F434A] outline-none placeholder:text-[#9ca3af] ${
                    searchOpen || query
                      ? 'border-[#21943A] border-b-2'
                      : 'border-[#e5e7eb]'
                  }`}
                />
                {query ? (
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setQuery('')
                      setAppliedName('')
                      setSearchOpen(false)
                    }}
                    className="absolute top-1/2 right-3 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center text-[#9ca3af] hover:text-[#6b7280]"
                    aria-label="Clear search"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                ) : null}
                {searchOpen && suggestions.length > 0 ? (
                  <div className="absolute top-full right-0 left-0 z-40 mt-1 overflow-hidden rounded-xl border border-[#eeeeee] bg-white py-1 shadow-[0_12px_32px_rgba(16,24,40,0.12)]">
                    {suggestions.map((name) => (
                      <button
                        key={name}
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          setQuery(name)
                          setAppliedName(name)
                          setSearchOpen(false)
                        }}
                        className="block w-full cursor-pointer px-4 py-2.5 text-left text-[13px] text-[#3F434A] hover:bg-[#f3f4f6]"
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="relative" ref={filterRef}>
                <button
                  type="button"
                  onClick={() => setFilterOpen((v) => !v)}
                  className={`flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md border hover:bg-[#f8fafc] ${
                    filterOpen ? 'border-[#86efac] bg-[#E8F8EC]' : 'border-[#e5e7eb]'
                  }`}
                  aria-label="Filter"
                >
                  <img src={filterIcon} alt="" className="h-4 w-4 object-contain" />
                </button>

                {filterOpen ? (
                  <div className="absolute top-full right-0 z-50 mt-2 w-[min(92vw,320px)] rounded-2xl border border-[#eeeeee] bg-white p-5 shadow-[0_20px_50px_rgba(16,24,40,0.18),0_8px_20px_rgba(16,24,40,0.1),0_2px_6px_rgba(16,24,40,0.06)]">
                    <h3 className="mb-4 text-[20px] font-semibold text-[#3F434A]">Filter</h3>

                    <label className="mb-1.5 block text-[12px] font-medium text-[#9ca3af]">Category</label>
                    <div className="relative mb-4">
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-[#e5e7eb] bg-white px-3.5 pr-9 text-[13px] text-[#3F434A] outline-none"
                      >
                        <option>All</option>
                        <option>Notebook</option>
                        <option>Watch</option>
                        <option>Phone</option>
                        <option>Tablet</option>
                        <option>Accessories</option>
                      </select>
                      <img
                        src={arrowDown02Icon}
                        alt=""
                        className="pointer-events-none absolute top-1/2 right-3 h-3 w-3 -translate-y-1/2 object-contain opacity-70"
                      />
                    </div>

                    <label className="mb-1.5 block text-[12px] font-medium text-[#9ca3af]">Status</label>
                    <div className="relative mb-4">
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-[#e5e7eb] bg-white px-3.5 pr-9 text-[13px] text-[#3F434A] outline-none"
                      >
                        <option>Available</option>
                        <option>Disabled</option>
                        <option>All</option>
                      </select>
                      <img
                        src={arrowDown02Icon}
                        alt=""
                        className="pointer-events-none absolute top-1/2 right-3 h-3 w-3 -translate-y-1/2 object-contain opacity-70"
                      />
                    </div>

                    <label className="mb-1.5 block text-[12px] font-medium text-[#9ca3af]">Date</label>
                    <div className="relative mb-4 flex items-center gap-2">
                      {[
                        { key: 'from', value: dateFrom, set: setDateFrom },
                        { key: 'to', value: dateTo, set: setDateTo },
                      ].map((item) => (
                        <div key={item.key} className="relative min-w-0 flex-1">
                          <button
                            type="button"
                            onClick={() =>
                              setCalendarFor((cur) => (cur === item.key ? null : item.key))
                            }
                            className={`flex h-12 w-full cursor-pointer items-center gap-2 rounded-xl border bg-white px-3 text-left text-[12px] text-[#3F434A] ${
                              calendarFor === item.key
                                ? 'border-[#86efac]'
                                : 'border-[#e5e7eb]'
                            }`}
                          >
                            <img
                              src={calendarIcon}
                              alt=""
                              className="h-4 w-4 shrink-0 object-contain opacity-55 brightness-0 saturate-0"
                            />
                            <span className="min-w-0 flex-1 truncate">{formatDate(item.value)}</span>
                            <img
                              src={arrowDown02Icon}
                              alt=""
                              className="h-2.5 w-2.5 shrink-0 object-contain opacity-60"
                            />
                          </button>
                          {calendarFor === item.key ? (
                            <MiniCalendar
                              value={item.value}
                              onSelect={item.set}
                              onClose={() => setCalendarFor(null)}
                            />
                          ) : null}
                        </div>
                      ))}
                    </div>

                    <label className="mb-2 block text-[12px] font-medium text-[#9ca3af]">Price</label>
                    <div className="mb-1 px-1">
                      <div className="relative h-8">
                        <div className="absolute top-1/2 right-0 left-0 h-1.5 -translate-y-1/2 rounded-full bg-[#e5e7eb]" />
                        <div
                          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#21943A]"
                          style={{
                            left: `${(priceMin / 6000) * 100}%`,
                            width: `${((priceMax - priceMin) / 6000) * 100}%`,
                          }}
                        />
                        <input
                          type="range"
                          min={0}
                          max={6000}
                          step={50}
                          value={priceMin}
                          onChange={(e) => {
                            const next = Number(e.target.value)
                            setPriceMin(Math.min(next, priceMax - 50))
                          }}
                          className="price-range absolute inset-0 z-[3] m-0 h-8 w-full cursor-pointer appearance-none bg-transparent"
                          style={{ zIndex: priceMin > priceMax - 500 ? 5 : 3 }}
                        />
                        <input
                          type="range"
                          min={0}
                          max={6000}
                          step={50}
                          value={priceMax}
                          onChange={(e) => {
                            const next = Number(e.target.value)
                            setPriceMax(Math.max(next, priceMin + 50))
                          }}
                          className="price-range absolute inset-0 z-[4] m-0 h-8 w-full cursor-pointer appearance-none bg-transparent"
                          style={{ zIndex: priceMax < priceMin + 500 ? 5 : 4 }}
                        />
                      </div>
                    </div>
                    <div className="mb-5 flex items-center justify-between text-[12px] text-[#6b7280]">
                      <span>${priceMin.toLocaleString('de-DE')}</span>
                      <span>${priceMax.toLocaleString('de-DE')}</span>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setFilterOpen(false)}
                        className="min-w-[110px] cursor-pointer rounded-xl bg-[#21943A] px-8 py-2.5 text-[13px] font-medium text-white hover:bg-[#1a7a3a]"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-[#e5e7eb] bg-white px-3 py-2.5 text-[13px] font-medium text-[#3F434A] hover:bg-[#f8fafc]"
              >
                Actions
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((p) => {
                  const checked = selected.includes(p.id)
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => toggleOne(p.id)}
                      className={`relative cursor-pointer rounded-2xl border bg-white p-4 text-left transition ${
                        checked
                          ? 'border-[#21943A] shadow-[0_8px_24px_rgba(33,148,58,0.12)]'
                          : 'border-[#eeeeee] shadow-[0_2px_8px_rgba(16,24,40,0.04)] hover:shadow-[0_8px_24px_rgba(16,24,40,0.08)]'
                      }`}
                    >
                      <span
                        className={`absolute top-4 left-4 inline-flex rounded-md px-2.5 py-1 text-[11px] font-medium ${
                          p.status === 'Available'
                            ? 'bg-[#E8F8EC] text-[#21943A]'
                            : 'bg-[#F3E0E0] text-[#B86A6A]'
                        }`}
                      >
                        {p.status}
                      </span>
                      {checked ? (
                        <img
                          src={checkedIcon}
                          alt=""
                          className="absolute top-4 right-4 h-5 w-5 object-contain"
                        />
                      ) : (
                        <span className="absolute top-4 right-4 h-5 w-5 rounded-full border border-[#d1d5db] bg-white" />
                      )}

                      <div className="mt-8 mb-4 flex h-36 items-center justify-center rounded-xl bg-[#f3f4f6]">
                        <img src={pictureIcon} alt="" className="h-28 w-28 scale-150 object-contain" />
                      </div>

                      <p className="mb-4 line-clamp-2 min-h-[40px] text-[14px] font-semibold text-[#3F434A]">
                        {p.name}
                      </p>

                      <div className="flex items-end justify-between gap-2 border-t border-[#f1f3f5] pt-3 text-[12px]">
                        <div>
                          <p className="mb-0.5 text-[10px] uppercase tracking-wide text-[#9ca3af]">Date</p>
                          <p className="text-[#6b7280]">{p.date}</p>
                        </div>
                        <div>
                          <p className="mb-0.5 text-[10px] uppercase tracking-wide text-[#9ca3af]">Category</p>
                          <p className="text-[#3F434A]">{p.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="mb-0.5 text-[10px] uppercase tracking-wide text-[#9ca3af]">Price</p>
                          <p className="font-semibold text-[#3F434A]">{p.price}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-[760px] w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#eeeeee] text-[13px] font-medium tracking-wide text-[#9ca3af]">
                      <th className="w-10 py-3 pr-2" />
                      {columns.map((col) => (
                        <th key={col.key} className="px-2 py-3">
                          <button
                            type="button"
                            className="inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-medium uppercase hover:text-[#6b7280]"
                          >
                            {col.label}
                            <img src={arrowDownIcon} alt="" className="h-3.5 w-3.5 object-contain opacity-40" />
                          </button>
                        </th>
                      ))}
                      <th className="w-10 px-2 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p) => {
                      const checked = selected.includes(p.id)
                      return (
                        <tr key={p.id} className="border-b border-[#f1f3f5] text-[13px] text-[#3F434A]">
                          <td className="py-3.5 pr-2">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleOne(p.id)}
                              className="h-4 w-4 cursor-pointer accent-[#21943A]"
                            />
                          </td>
                          <td className="px-2 py-3.5 font-medium">{p.name}</td>
                          <td className="px-2 py-3.5 text-[#6b7280]">{p.no}</td>
                          <td className="px-2 py-3.5">{p.category}</td>
                          <td className="px-2 py-3.5 text-[#6b7280]">{p.date}</td>
                          <td className="px-2 py-3.5 font-medium">{p.price}</td>
                          <td className="px-2 py-3.5">
                            <span
                              className={`inline-flex rounded-md px-2.5 py-1 text-[11px] font-medium ${
                                p.status === 'Available'
                                  ? 'bg-[#E8F8EC] text-[#21943A]'
                                  : 'bg-[#F3E0E0] text-[#B86A6A]'
                              }`}
                            >
                              {p.status}
                            </span>
                          </td>
                          <td className="px-2 py-3.5 text-right">
                            <button
                              type="button"
                              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-[#6b7280] hover:bg-[#f3f4f6]"
                              aria-label="Row menu"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                <circle cx="12" cy="5" r="1.75" />
                                <circle cx="12" cy="12" r="1.75" />
                                <circle cx="12" cy="19" r="1.75" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[12px] text-[#6b7280]">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <select
                    defaultValue="10"
                    className="h-9 cursor-pointer appearance-none rounded-full border border-[#e5e7eb] bg-white py-1.5 pr-8 pl-3.5 text-[13px] font-medium text-[#3F434A] outline-none"
                  >
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                  <img
                    src={arrowDown02Icon}
                    alt=""
                    className="pointer-events-none absolute top-1/2 right-3 h-3 w-3 -translate-y-1/2 object-contain opacity-70"
                  />
                </div>
                <span className="text-[13px] font-normal text-[#9ca3af]">Showing 1 - 10 of 100</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setPage(1)}
                  disabled={page === 1}
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-md bg-[#f3f4f6] disabled:cursor-default disabled:opacity-70"
                  aria-label="First page"
                >
                  <img src={firstIcon} alt="" className="h-9 w-9 object-contain" />
                </button>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md bg-[#f3f4f6] text-[#9ca3af] disabled:cursor-default disabled:opacity-70"
                  aria-label="Previous page"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15 6-6 6 6 6" />
                  </svg>
                </button>

                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    className={`flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-md px-2 text-[13px] font-medium ${
                      page === n
                        ? 'bg-[#21943A] text-white'
                        : 'bg-transparent text-[#6b7280] hover:bg-[#f3f4f6]'
                    }`}
                  >
                    {n}
                  </button>
                ))}

                <span className="px-1 text-[#9ca3af]">…</span>

                <button
                  type="button"
                  onClick={() => setPage(5)}
                  className={`flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-md px-2 text-[13px] font-medium ${
                    page === 5
                      ? 'bg-[#21943A] text-white'
                      : 'bg-transparent text-[#6b7280] hover:bg-[#f3f4f6]'
                  }`}
                >
                  5
                </button>

                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(5, p + 1))}
                  disabled={page === 5}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md bg-[#E8F8EC] text-[#21943A] disabled:cursor-default disabled:opacity-50"
                  aria-label="Next page"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 6 6 6-6 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setPage(5)}
                  disabled={page === 5}
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-md bg-[#E8F8EC] disabled:cursor-default disabled:opacity-50"
                  aria-label="Last page"
                >
                  <img src={lastIcon} alt="" className="h-9 w-9 object-contain" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {addOpen ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center overflow-y-auto bg-black/20 p-3 sm:items-center sm:p-6">
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 cursor-default"
            onClick={() => setAddOpen(false)}
          />
          <div className="relative z-[1] max-h-[92vh] w-full max-w-[560px] overflow-y-auto rounded-2xl bg-white p-4 shadow-[0_20px_50px_rgba(16,24,40,0.18)] sm:p-6">
            <div className="mb-5 flex gap-4 overflow-x-auto border-b border-[#eeeeee] sm:gap-5">
              {[
                ['information', 'INFORMATION'],
                ['images', 'IMAGES'],
                ['pricing', 'PRICING'],
                ['inventory', 'INVENTORY'],
                ['shipping', 'SHIPPING'],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setAddTab(id)}
                  className={`relative shrink-0 cursor-pointer pb-3 text-[11px] font-medium tracking-wide sm:text-[12px] ${
                    addTab === id ? 'text-[#21943A]' : 'text-[#9ca3af] hover:text-[#6b7280]'
                  }`}
                >
                  {label}
                  {addTab === id ? (
                    <span className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-[#21943A]" />
                  ) : null}
                </button>
              ))}
            </div>

            {addTab === 'information' ? (
              <>
                <h2 className="mb-4 text-[22px] font-semibold text-[#3F434A]">Information</h2>

                <label className="mb-1.5 block text-[12px] text-[#9ca3af]">Product Name</label>
                <input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="mb-4 h-11 w-full rounded-xl border border-[#e5e7eb] px-3 text-[13px] text-[#3F434A] outline-none focus:border-[#86efac]"
                />

                <label className="mb-1.5 block text-[12px] text-[#9ca3af]">Description</label>
                <div className="mb-4 overflow-hidden rounded-xl border border-[#e5e7eb]">
                  <div className="flex flex-wrap items-center gap-1 border-b border-[#eeeeee] px-2 py-2 text-[14px] text-[#6b7280]">
                    <button
                      type="button"
                      className="flex h-7 cursor-pointer items-center rounded px-2 hover:bg-[#f3f4f6]"
                    >
                      A ▾
                    </button>
                    {['B', 'I', 'U'].map((m) => (
                      <button
                        key={m}
                        type="button"
                        className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded hover:bg-[#f3f4f6] ${
                          m === 'B' ? 'font-bold' : m === 'I' ? 'italic' : 'underline'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                    <span className="mx-1 h-4 w-px bg-[#e5e7eb]" />
                    {[
                      ['left', alignLeftIcon, 'Align left'],
                      ['center', alignCenterIcon, 'Align center'],
                      ['right', alignRightIcon, 'Align right'],
                      ['justify', alignJustifyIcon, 'Align justify'],
                    ].map(([id, icon, label]) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setTextAlign(id)}
                        className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded ${
                          textAlign === id ? 'bg-[#E8F8EC]' : 'hover:bg-[#f3f4f6]'
                        }`}
                        aria-label={label}
                      >
                        <img src={icon} alt="" className="h-5 w-5 object-contain" />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Type something"
                    rows={4}
                    style={{ textAlign }}
                    className="w-full resize-y px-3 py-2 text-[13px] text-[#3F434A] outline-none placeholder:text-[#c4c9d1]"
                  />
                </div>

                <label className="mb-1.5 block text-[12px] text-[#9ca3af]">Category</label>
                <div className="relative mb-4">
                  <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-[#e5e7eb] bg-white px-3 pr-9 text-[13px] text-[#3F434A] outline-none"
                  >
                    <option>Phone</option>
                    <option>Notebook</option>
                    <option>Watch</option>
                    <option>Tablet</option>
                    <option>Accessories</option>
                  </select>
                  <img
                    src={arrowDown02Icon}
                    alt=""
                    className="pointer-events-none absolute top-1/2 right-3 h-3 w-3 -translate-y-1/2 object-contain opacity-70"
                  />
                </div>

                <label className="mb-1.5 block text-[12px] text-[#9ca3af]">Tags</label>
                <div className="mb-6 flex min-h-11 flex-wrap items-center gap-2 rounded-xl border border-[#e5e7eb] px-3 py-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-md bg-[#f3f4f6] px-2 py-1 text-[12px] text-[#3F434A]"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => setTags((prev) => prev.filter((t) => t !== tag))}
                        className="cursor-pointer text-[#9ca3af] hover:text-[#6b7280]"
                        aria-label={`Remove ${tag}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    value={tagDraft}
                    onChange={(e) => setTagDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key !== 'Enter') return
                      e.preventDefault()
                      const next = tagDraft.trim()
                      if (!next || tags.includes(next)) {
                        setTagDraft('')
                        return
                      }
                      setTags((prev) => [...prev, next])
                      setTagDraft('')
                    }}
                    placeholder="Add tag"
                    className="min-w-[80px] flex-1 bg-transparent text-[12px] text-[#3F434A] outline-none placeholder:text-[#c4c9d1]"
                  />
                </div>
              </>
            ) : addTab === 'images' ? (
              <>
                <h2 className="mb-4 text-[22px] font-semibold text-[#3F434A]">Images</h2>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = [...(e.target.files || [])]
                    if (!files.length) return
                    setProductImages((prev) => [
                      ...prev,
                      ...files.map((file, i) => ({
                        id: Date.now() + i,
                        src: URL.createObjectURL(file),
                        cover: false,
                      })),
                    ])
                    e.target.value = ''
                  }}
                />
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault()
                    const files = [...e.dataTransfer.files].filter((f) => f.type.startsWith('image/'))
                    if (!files.length) return
                    setProductImages((prev) => [
                      ...prev,
                      ...files.map((file, i) => ({
                        id: Date.now() + i,
                        src: URL.createObjectURL(file),
                        cover: false,
                      })),
                    ])
                  }}
                  className="mb-5 flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#d1d5db] bg-[#f8fafc] px-4 py-8"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.6" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 0 1 .2-8 5 5 0 0 1 9.6-1.2A3.5 3.5 0 0 1 18 16" />
                    <path strokeLinecap="round" d="M12 12v6M12 12l-2.5 2.5M12 12l2.5 2.5" />
                  </svg>
                  <p className="mt-2 text-[13px] text-[#6b7280]">
                    Drag and Drop or{' '}
                    <span className="font-medium text-[#21943A]">Browse</span> to upload
                  </p>
                </button>

                <div className="relative mb-2 hidden items-center px-3 text-[12px] text-[#9ca3af] sm:flex">
                  <span>Image</span>
                  <span className="absolute left-1/2 -translate-x-1/2">Position</span>
                  <span className="ml-auto pr-16">Cover</span>
                </div>
                <div className="mb-6 space-y-2">
                  {productImages.map((img, index) => (
                    <div
                      key={img.id}
                      draggable
                      onDragStart={() => {
                        dragImageId.current = img.id
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromId = dragImageId.current
                        if (fromId == null || fromId === img.id) return
                        setProductImages((prev) => {
                          const next = [...prev]
                          const from = next.findIndex((item) => item.id === fromId)
                          const to = next.findIndex((item) => item.id === img.id)
                          if (from < 0 || to < 0) return prev
                          const [moved] = next.splice(from, 1)
                          next.splice(to, 0, moved)
                          return next
                        })
                      }}
                      className="relative flex flex-col gap-3 rounded-xl border border-[#eeeeee] px-3 py-2 sm:flex-row sm:items-center"
                    >
                      <div className="flex items-center gap-3">
                        <span className="cursor-grab text-[#9ca3af]" aria-hidden>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="9" cy="6" r="1.4" />
                            <circle cx="15" cy="6" r="1.4" />
                            <circle cx="9" cy="12" r="1.4" />
                            <circle cx="15" cy="12" r="1.4" />
                            <circle cx="9" cy="18" r="1.4" />
                            <circle cx="15" cy="18" r="1.4" />
                          </svg>
                        </span>
                        <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#f3f4f6]">
                          <img src={pictureIcon} alt="" className="h-14 w-14 scale-150 object-contain" />
                        </span>
                      </div>
                      <span className="flex h-8 w-8 items-center justify-center self-center rounded-lg border border-[#e5e7eb] text-[13px] text-[#3F434A] sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                        {index + 1}
                      </span>
                      <div className="flex items-center justify-end gap-4 sm:ml-auto">
                      <button
                        type="button"
                        onClick={() =>
                          setProductImages((prev) =>
                            prev.map((item) => ({ ...item, cover: item.id === img.id })),
                          )
                        }
                        className="mr-6 flex h-6 w-6 cursor-pointer items-center justify-center"
                        aria-label="Set cover"
                      >
                        {img.cover ? (
                          <img src={checkedIcon} alt="" className="h-5 w-5 object-contain" />
                        ) : (
                          <span className="h-4 w-4 rounded-full border border-[#d1d5db]" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setProductImages((prev) => prev.filter((item) => item.id !== img.id))
                        }
                        className="flex cursor-pointer items-center justify-center"
                        aria-label="Delete image"
                      >
                        <img src={deleteIcon} alt="" className="h-4 w-4 object-contain" />
                      </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : addTab === 'pricing' ? (
              <>
                <h2 className="mb-4 text-[22px] font-semibold text-[#3F434A]">Pricing</h2>

                <label className="mb-1.5 block text-[12px] text-[#9ca3af]">Tax Excluded Price</label>
                <div className="mb-4 flex h-11 items-center gap-2 rounded-xl border border-[#e5e7eb] px-3">
                  <span className="text-[13px] text-[#4b5563]">$</span>
                  <input
                    value={taxExcluded}
                    onChange={(e) => setTaxExcluded(e.target.value)}
                    className="w-full bg-transparent text-[13px] text-[#3F434A] outline-none"
                  />
                </div>

                <label className="mb-1.5 block text-[12px] text-[#9ca3af]">Tax Included Price</label>
                <div className="mb-4 flex h-11 items-center gap-2 rounded-xl border border-[#e5e7eb] px-3">
                  <span className="text-[13px] text-[#4b5563]">$</span>
                  <input
                    value={taxIncluded}
                    onChange={(e) => setTaxIncluded(e.target.value)}
                    className="w-full bg-transparent text-[13px] text-[#3F434A] outline-none"
                  />
                </div>

                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-[12px] text-[#9ca3af]">Tax Rule</label>
                  <button
                    type="button"
                    onClick={() => setNewTaxOpen((v) => !v)}
                    className="cursor-pointer text-[12px] font-medium text-[#21943A]"
                  >
                    Create New Tax
                  </button>
                </div>
                {newTaxOpen ? (
                  <div className="mb-3 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                    <input
                      value={newTaxName}
                      onChange={(e) => setNewTaxName(e.target.value)}
                      placeholder="Tax name"
                      className="h-11 min-w-0 flex-1 rounded-xl border border-[#e5e7eb] px-3 text-[13px] text-[#3F434A] outline-none"
                    />
                    <input
                      value={newTaxRate}
                      onChange={(e) => setNewTaxRate(e.target.value)}
                      placeholder="Rate %"
                      className="h-11 w-24 rounded-xl border border-[#e5e7eb] px-3 text-[13px] text-[#3F434A] outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const name = newTaxName.trim()
                        const rate = newTaxRate.trim()
                        if (!name || !rate) return
                        const label = `${name} (${rate}%)`
                        setTaxRules((prev) => (prev.includes(label) ? prev : [...prev, label]))
                        setTaxRule(label)
                        setNewTaxName('')
                        setNewTaxRate('')
                        setNewTaxOpen(false)
                      }}
                      className="h-11 cursor-pointer rounded-md bg-[#21943A] px-4 text-[13px] font-medium text-white hover:bg-[#1a7a3a]"
                    >
                      Add
                    </button>
                  </div>
                ) : null}
                <div className="relative mb-4">
                  <select
                    value={taxRule}
                    onChange={(e) => setTaxRule(e.target.value)}
                    className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-[#e5e7eb] bg-white px-3 pr-9 text-[13px] text-[#3F434A] outline-none"
                  >
                    {taxRules.map((rule) => (
                      <option key={rule}>{rule}</option>
                    ))}
                  </select>
                  <img
                    src={arrowDown02Icon}
                    alt=""
                    className="pointer-events-none absolute top-1/2 right-3 h-3 w-3 -translate-y-1/2 object-contain opacity-70"
                  />
                </div>

                <div className="mb-6 grid grid-cols-1 items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
                  <div>
                    <label className="mb-1.5 block text-[12px] text-[#9ca3af]">Unit Price</label>
                    <div className="flex h-11 items-center gap-2 rounded-xl border border-[#e5e7eb] px-3">
                      <span className="text-[13px] text-[#4b5563]">$</span>
                      <input
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(e.target.value)}
                        className="w-full bg-transparent text-[13px] text-[#3F434A] outline-none"
                      />
                    </div>
                  </div>
                  <span className="pb-3 text-[#9ca3af]">–</span>
                  <div>
                    <label className="mb-1.5 block text-[12px] text-[#9ca3af]">Per</label>
                    <div className="flex h-11 items-center rounded-xl border border-[#e5e7eb] pr-1 pl-3">
                      <input
                        value={perQty}
                        onChange={(e) => setPerQty(e.target.value)}
                        className="w-full bg-transparent text-[13px] text-[#3F434A] outline-none"
                      />
                      <span className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => setPerQty((n) => Number(n) + 1)}
                          className="cursor-pointer px-1 text-[10px] leading-none text-[#9ca3af]"
                          aria-label="Increase"
                        >
                          ▴
                        </button>
                        <button
                          type="button"
                          onClick={() => setPerQty((n) => Math.max(0, Number(n) - 1))}
                          className="cursor-pointer px-1 text-[10px] leading-none text-[#9ca3af]"
                          aria-label="Decrease"
                        >
                          ▾
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : addTab === 'inventory' ? (
              <>
                <h2 className="mb-4 text-[22px] font-semibold text-[#3F434A]">Inventory</h2>

                <label className="mb-1.5 block text-[12px] text-[#9ca3af]">SKU</label>
                <input
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="mb-4 h-11 w-full rounded-xl border border-[#e5e7eb] px-3 text-[13px] text-[#3F434A] outline-none"
                />

                <label className="mb-1.5 block text-[12px] text-[#9ca3af]">Quantity</label>
                <div className="mb-6 flex h-11 items-center rounded-xl border border-[#e5e7eb] pr-1 pl-3">
                  <input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full bg-transparent text-[13px] text-[#3F434A] outline-none"
                  />
                  <span className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => setQuantity((n) => Number(n) + 1)}
                      className="cursor-pointer px-1 text-[10px] leading-none text-[#9ca3af]"
                      aria-label="Increase quantity"
                    >
                      ▴
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuantity((n) => Math.max(0, Number(n) - 1))}
                      className="cursor-pointer px-1 text-[10px] leading-none text-[#9ca3af]"
                      aria-label="Decrease quantity"
                    >
                      ▾
                    </button>
                  </span>
                </div>
              </>
            ) : (
              <>
                <h2 className="mb-4 text-[22px] font-semibold text-[#3F434A]">Shipping</h2>
                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    ['Width', shipWidth, setShipWidth],
                    ['Height', shipHeight, setShipHeight],
                    ['Depth', shipDepth, setShipDepth],
                    ['Weight', shipWeight, setShipWeight],
                  ].map(([label, value, setValue]) => (
                    <div key={label}>
                      <label className="mb-1.5 block text-[12px] text-[#9ca3af]">{label}</label>
                      <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="h-11 w-full rounded-xl border border-[#e5e7eb] px-3 text-[13px] text-[#3F434A] outline-none"
                      />
                    </div>
                  ))}
                </div>
                <label className="mb-1.5 block text-[12px] text-[#9ca3af]">Extra Shipping Fee</label>
                <div className="mb-6 flex h-11 items-center gap-2 rounded-xl border border-[#e5e7eb] px-3">
                  <span className="text-[13px] text-[#4b5563]">$</span>
                  <input
                    value={shipFee}
                    onChange={(e) => setShipFee(e.target.value)}
                    className="w-full bg-transparent text-[13px] text-[#3F434A] outline-none"
                  />
                </div>
              </>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setAddOpen(false)}
                className="min-w-[120px] cursor-pointer rounded-md bg-[#21943A] px-8 py-2.5 text-[13px] font-medium text-white hover:bg-[#1a7a3a] sm:px-10"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setAddOpen(false)}
                className="cursor-pointer rounded-md border border-[#e5e7eb] bg-white px-6 py-2.5 text-[13px] font-medium text-[#3F434A] hover:bg-[#f8fafc]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
