import { useMemo, useRef, useState } from 'react'
import Header from '../../components/dashboard/Header'
import Sidebar from '../../components/dashboard/Sidebar'
import ExportMenu from '../../components/dashboard/ExportMenu'
import searchIcon from '../../assets/images/search-01.svg'
import filterIcon from '../../assets/images/Filter.png'
import arrowDownIcon from '../../assets/images/arrow-down-01.png'
import arrowDown02Icon from '../../assets/images/arrow-down-02.png'
import firstIcon from '../../assets/images/First.png'
import lastIcon from '../../assets/images/Last.png'
import circleAvatar from '../../assets/images/circle-avatar.png'
import profileAvatar from '../../assets/images/Avatar.png'
import editIcon from '../../assets/images/edit.png'
import mastercardIcon from '../../assets/images/Mastercard.png'

const columns = [
  { key: 'name', label: 'CUSTOMER NAME' },
  { key: 'location', label: 'LOCATION' },
  { key: 'phone', label: 'PHONE' },
  { key: 'date', label: 'DATE' },
  { key: 'status', label: 'STATUS' },
]

const customers = [
  {
    id: 1,
    name: 'Regina Cooper',
    email: 'cooper@example.com',
    location: 'Sochi, Russia',
    phone: '+1 (070) 123-4567',
    date: '12.09.20',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Judith Black',
    email: 'black@example.com',
    location: 'France, Paris',
    phone: '+1 (070) 123-8459',
    date: '12.09.20',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Ronald Robertson',
    email: 'robe@example.com',
    location: 'Sydney, Australia',
    phone: '+1 (070) 123-9221',
    date: '12.09.20',
    status: 'Blocked',
  },
  {
    id: 4,
    name: 'Dustin Williamson',
    email: 'williams@example.com',
    location: 'Germany, Berlin',
    phone: '+1 (070) 123-0507',
    date: '12.09.20',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Calvin Flores',
    email: 'flores@example.com',
    location: 'New York, USA',
    phone: '+1 (070) 123-3791',
    date: '12.09.20',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Robert Edwards',
    email: 'edwards@example.com',
    location: 'Shanghai, China',
    phone: '+1 (070) 123-1147',
    date: '12.09.20',
    status: 'Active',
  },
  {
    id: 7,
    name: 'Colleen Warren',
    email: 'warren@example.com',
    location: 'Canada, Ottawa',
    phone: '+1 (070) 123-9127',
    date: '12.09.20',
    status: 'Active',
  },
  {
    id: 8,
    name: 'Nathan Fox',
    email: 'fox@example.com',
    location: 'London, UK',
    phone: '+1 (070) 123-5073',
    date: '12.09.20',
    status: 'Active',
  },
]

const tabs = [
  { id: 'all', label: 'All', count: 983 },
  { id: 'active', label: 'Active', count: 968 },
  { id: 'blocked', label: 'Blocked', count: 15 },
]

const profileTabs = [
  { id: 'profile', label: 'PROFILE' },
  { id: 'address', label: 'ADDRESS' },
  { id: 'payment', label: 'PAYMENT' },
  { id: 'submission', label: 'SUBMISSION' },
]

const emptyProfile = {
  firstName: 'Regina',
  lastName: 'Cooper',
  email: 'regina_cooper@email.com',
  code: '+1',
  phone: '(070) 4567-8800',
  status: 'Active',
  address1: '993 E. Brewer St. Holtsville',
  address2: '',
  city: 'New York',
  country: 'United States',
  state: 'New York',
  zip: '11742',
  paymentMethod: 'card',
  cardName: 'Regina Cooper',
  cardNumber: '5890 - 6858 - 6332 - 9843',
  month: '12',
  year: '2023',
}

function DetailRow({ label, value }) {
  return (
    <p className="break-words text-[13px] text-[#9ca3af]">
      {label}: <span className="text-[#4b5563]">{value}</span>
    </p>
  )
}

export default function CustomersPage({
  onOpenSettings,
  onOpenChat,
  onOpenDashboard,
  onOpenProducts,
  onOpenOrders,
  onOpenCustomers,
  onOpenCalendar,
  onLock,
  onLogout,
  activeLabel = 'Customers',
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tab, setTab] = useState('all')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(1)
  const [addOpen, setAddOpen] = useState(false)
  const [profileTab, setProfileTab] = useState('profile')
  const [form, setForm] = useState(emptyProfile)
  const [avatarSrc, setAvatarSrc] = useState(profileAvatar)
  const avatarInputRef = useRef(null)

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function openAdd() {
    setForm(emptyProfile)
    setAvatarSrc(profileAvatar)
    setProfileTab('profile')
    setAddOpen(true)
  }

  function goNext() {
    const i = profileTabs.findIndex((t) => t.id === profileTab)
    if (i < profileTabs.length - 1) setProfileTab(profileTabs[i + 1].id)
    else setAddOpen(false)
  }

  function goPrev() {
    const i = profileTabs.findIndex((t) => t.id === profileTab)
    if (i > 0) setProfileTab(profileTabs[i - 1].id)
  }

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const matchTab =
        tab === 'all' ||
        (tab === 'active' && c.status === 'Active') ||
        (tab === 'blocked' && c.status === 'Blocked')
      const q = query.trim().toLowerCase()
      const matchQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
      return matchTab && matchQuery
    })
  }, [tab, query])

  const allChecked = filtered.length > 0 && filtered.every((c) => selected.includes(c.id))

  function toggleAll() {
    if (allChecked) {
      setSelected((prev) => prev.filter((id) => !filtered.some((c) => c.id === id)))
    } else {
      setSelected((prev) => [...new Set([...prev, ...filtered.map((c) => c.id)])])
    }
  }

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
        activeLabel={activeLabel}
        onNavigate={(label) => {
          if (label === 'Dashboard') onOpenDashboard?.()
          if (label === 'Chat') onOpenChat?.()
          if (label === 'Products') onOpenProducts?.()
          if (label === 'Orders') onOpenOrders?.()
          if (label === 'Customers') onOpenCustomers?.()
          if (label === 'Calendar') onOpenCalendar?.()
          if (label === activeLabel) setSidebarOpen(false)
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
              <h1 className="text-[22px] font-semibold text-[#3F434A] sm:text-[24px]">Customers</h1>
              <div className="flex items-center gap-2">
                <ExportMenu />
                <button
                  type="button"
                  onClick={openAdd}
                  className="flex h-9 w-11 cursor-pointer items-center justify-center rounded-md bg-[#21943A] text-white hover:bg-[#1a7a3a]"
                  aria-label="Add customer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                    <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mb-4 overflow-x-auto border-b border-[#eeeeee]">
              <div className="flex min-w-max items-center gap-4 sm:gap-5">
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
            </div>

            <div className="relative mb-4 flex flex-wrap items-center gap-2">
              <div className="relative min-w-0 flex-1 basis-[180px]">
                <img
                  src={searchIcon}
                  alt=""
                  className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 opacity-50"
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search customer..."
                  className="w-full rounded-xl border border-[#e5e7eb] bg-white py-2.5 pr-3 pl-10 text-[13px] text-[#3F434A] outline-none placeholder:text-[#9ca3af] focus:border-[#21943A]"
                />
              </div>
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md border border-[#e5e7eb] hover:bg-[#f8fafc]"
                aria-label="Filter"
              >
                <img src={filterIcon} alt="" className="h-4 w-4 object-contain" />
              </button>
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

            <div className="overflow-x-auto">
              <table className="min-w-[760px] w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#eeeeee] text-[13px] font-medium tracking-wide text-[#9ca3af]">
                    <th className="w-10 py-3 pr-2">
                      <input
                        type="checkbox"
                        checked={allChecked}
                        onChange={toggleAll}
                        className="h-4 w-4 cursor-pointer accent-[#21943A]"
                      />
                    </th>
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
                  {filtered.map((c) => {
                    const checked = selected.includes(c.id)
                    return (
                      <tr key={c.id} className="border-b border-[#f1f3f5] text-[13px] text-[#3F434A]">
                        <td className="py-3.5 pr-2">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleOne(c.id)}
                            className="h-4 w-4 cursor-pointer accent-[#21943A]"
                          />
                        </td>
                        <td className="px-2 py-3.5">
                          <div className="flex items-center gap-3">
                            <img
                              src={circleAvatar}
                              alt=""
                              className="h-9 w-9 rounded-full object-cover object-top"
                            />
                            <div>
                              <p className="font-medium">{c.name}</p>
                              <p className="text-[12px] text-[#9ca3af]">{c.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-2 py-3.5 text-[#6b7280]">{c.location}</td>
                        <td className="px-2 py-3.5 text-[#6b7280]">{c.phone}</td>
                        <td className="px-2 py-3.5 text-[#6b7280]">{c.date}</td>
                        <td className="px-2 py-3.5">
                          <span
                            className={`inline-flex rounded-md px-2.5 py-1 text-[11px] font-medium ${
                              c.status === 'Active'
                                ? 'bg-[#E8F8EC] text-[#21943A]'
                                : 'bg-[#F3E0E0] text-[#B86A6A]'
                            }`}
                          >
                            {c.status}
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

            <div className="mt-4 flex flex-col gap-3 text-[12px] text-[#6b7280] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
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

              <div className="-mx-1 flex items-center gap-1 overflow-x-auto px-1 sm:gap-1.5">
                <button
                  type="button"
                  onClick={() => setPage(1)}
                  disabled={page === 1}
                  className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md bg-[#f3f4f6] disabled:cursor-default disabled:opacity-70 sm:h-11 sm:w-11"
                  aria-label="First page"
                >
                  <img src={firstIcon} alt="" className="h-7 w-7 object-contain sm:h-9 sm:w-9" />
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
                  className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md bg-[#E8F8EC] disabled:cursor-default disabled:opacity-50 sm:h-11 sm:w-11"
                  aria-label="Last page"
                >
                  <img src={lastIcon} alt="" className="h-7 w-7 object-contain sm:h-9 sm:w-9" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {addOpen ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center overflow-y-auto bg-black/20 p-0 sm:items-center sm:p-6">
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 cursor-default"
            onClick={() => setAddOpen(false)}
          />
          <div className="relative z-[1] max-h-[96vh] w-full max-w-[520px] overflow-y-auto rounded-t-2xl bg-white px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_20px_50px_rgba(16,24,40,0.18)] sm:max-h-[92vh] sm:rounded-2xl sm:px-7 sm:py-6">
            <div className="mb-5 flex items-start justify-between gap-3 border-b border-[#eeeeee]">
              <div className="flex min-w-0 flex-1 gap-4 overflow-x-auto sm:gap-6">
                {profileTabs.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setProfileTab(t.id)}
                    className={`relative shrink-0 cursor-pointer pb-3 text-[11px] font-medium tracking-[0.12em] sm:text-[12px] ${
                      profileTab === t.id ? 'text-[#21943A]' : 'text-[#9ca3af] hover:text-[#6b7280]'
                    }`}
                  >
                    {t.label}
                    {profileTab === t.id ? (
                      <span className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-[#21943A]" />
                    ) : null}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setAddOpen(false)}
                className="-mt-1 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center text-[#9ca3af] hover:text-[#6b7280]"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {profileTab === 'profile' ? (
              <>
                <h2 className="mb-5 text-[20px] font-semibold text-[#3F434A] sm:text-[22px]">Profile</h2>

                <div className="relative mx-auto mb-6 h-[140px] w-[140px] sm:h-[168px] sm:w-[168px]">
                  <div className="flex h-full w-full items-center justify-center rounded-full border border-dashed border-[#d1d5db] p-3">
                    <img src={avatarSrc} alt="" className="h-full w-full rounded-full object-cover object-top" />
                  </div>
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      setAvatarSrc(URL.createObjectURL(file))
                      e.target.value = ''
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    className="absolute top-3 right-3 h-8 w-8 cursor-pointer sm:top-4 sm:right-4"
                    aria-label="Change photo"
                  >
                    <img src={editIcon} alt="" className="h-full w-full object-contain" />
                  </button>
                </div>

                <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[12px] text-[#9ca3af]">First Name</label>
                    <input
                      value={form.firstName}
                      onChange={(e) => setField('firstName', e.target.value)}
                      className="h-11 w-full rounded-full border border-[#e5e7eb] px-4 text-[13px] text-[#3F434A] outline-none focus:border-[#86efac]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[12px] text-[#9ca3af]">Last Name</label>
                    <input
                      value={form.lastName}
                      onChange={(e) => setField('lastName', e.target.value)}
                      className="h-11 w-full rounded-full border border-[#e5e7eb] px-4 text-[13px] text-[#3F434A] outline-none focus:border-[#86efac]"
                    />
                  </div>
                </div>

                <label className="mb-1.5 block text-[12px] text-[#9ca3af]">Email</label>
                <input
                  value={form.email}
                  onChange={(e) => setField('email', e.target.value)}
                  className="mb-4 h-11 w-full rounded-full border border-[#e5e7eb] px-4 text-[13px] text-[#3F434A] outline-none focus:border-[#86efac]"
                />

                <label className="mb-1.5 block text-[12px] text-[#9ca3af]">Phone</label>
                <div className="mb-4 flex gap-2">
                  <div className="relative w-[88px] shrink-0">
                    <select
                      value={form.code}
                      onChange={(e) => setField('code', e.target.value)}
                      className="h-11 w-full cursor-pointer appearance-none rounded-full border border-[#e5e7eb] bg-white px-3 pr-7 text-[13px] text-[#3F434A] outline-none"
                    >
                      {['+1', '+7', '+33', '+44', '+49', '+61', '+86'].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                    <img
                      src={arrowDown02Icon}
                      alt=""
                      className="pointer-events-none absolute top-1/2 right-2.5 h-2.5 w-2.5 -translate-y-1/2 object-contain opacity-70"
                    />
                  </div>
                  <input
                    value={form.phone}
                    onChange={(e) => setField('phone', e.target.value)}
                    className="h-11 min-w-0 flex-1 rounded-full border border-[#e5e7eb] px-4 text-[13px] text-[#3F434A] outline-none focus:border-[#86efac]"
                  />
                </div>

                <label className="mb-1.5 block text-[12px] text-[#9ca3af]">Status</label>
                <div className="relative mb-8">
                  <select
                    value={form.status}
                    onChange={(e) => setField('status', e.target.value)}
                    className="h-11 w-full cursor-pointer appearance-none rounded-full border border-[#e5e7eb] bg-white px-4 pr-9 text-[13px] text-[#3F434A] outline-none"
                  >
                    <option>Active</option>
                    <option>Blocked</option>
                  </select>
                  <img
                    src={arrowDown02Icon}
                    alt=""
                    className="pointer-events-none absolute top-1/2 right-4 h-3 w-3 -translate-y-1/2 object-contain opacity-70"
                  />
                </div>
              </>
            ) : profileTab === 'address' ? (
              <>
                <h2 className="mb-5 text-[20px] font-semibold text-[#3F434A] sm:text-[22px]">Address</h2>
                <label className="mb-1.5 block text-[12px] text-[#9ca3af]">Address Line 1</label>
                <input
                  value={form.address1}
                  onChange={(e) => setField('address1', e.target.value)}
                  className="mb-4 h-11 w-full rounded-full border border-[#e5e7eb] px-4 text-[13px] text-[#3F434A] outline-none focus:border-[#86efac]"
                />
                <label className="mb-1.5 block text-[12px] text-[#9ca3af]">Address Line 2</label>
                <input
                  value={form.address2}
                  onChange={(e) => setField('address2', e.target.value)}
                  placeholder="Optional"
                  className="mb-4 h-11 w-full rounded-full border border-[#e5e7eb] px-4 text-[13px] text-[#3F434A] outline-none placeholder:text-[#c4c9d1] focus:border-[#86efac]"
                />
                <label className="mb-1.5 block text-[12px] text-[#9ca3af]">City</label>
                <input
                  value={form.city}
                  onChange={(e) => setField('city', e.target.value)}
                  className="mb-4 h-11 w-full rounded-full border border-[#e5e7eb] px-4 text-[13px] text-[#3F434A] outline-none focus:border-[#86efac]"
                />
                <label className="mb-1.5 block text-[12px] text-[#9ca3af]">Country</label>
                <div className="relative mb-4">
                  <select
                    value={form.country}
                    onChange={(e) => setField('country', e.target.value)}
                    className="h-11 w-full cursor-pointer appearance-none rounded-full border border-[#e5e7eb] bg-white px-4 pr-9 text-[13px] text-[#3F434A] outline-none"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>Australia</option>
                    <option>Russia</option>
                    <option>China</option>
                  </select>
                  <img
                    src={arrowDown02Icon}
                    alt=""
                    className="pointer-events-none absolute top-1/2 right-4 h-3 w-3 -translate-y-1/2 object-contain opacity-70"
                  />
                </div>
                <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[12px] text-[#9ca3af]">State/Region</label>
                    <input
                      value={form.state}
                      onChange={(e) => setField('state', e.target.value)}
                      className="h-11 w-full rounded-full border border-[#e5e7eb] px-4 text-[13px] text-[#3F434A] outline-none focus:border-[#86efac]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[12px] text-[#9ca3af]">Postcode</label>
                    <input
                      value={form.zip}
                      onChange={(e) => setField('zip', e.target.value)}
                      className="h-11 w-full rounded-full border border-[#e5e7eb] px-4 text-[13px] text-[#3F434A] outline-none focus:border-[#86efac]"
                    />
                  </div>
                </div>
              </>
            ) : profileTab === 'payment' ? (
              <>
                <h2 className="mb-5 text-[20px] font-semibold text-[#3F434A] sm:text-[22px]">Payment</h2>
                <p className="mb-3 text-[13px] text-[#9ca3af]">Choose payment method:</p>
                <div className="mb-5 grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:gap-3">
                  {[
                    ['card', 'Credit Card'],
                    ['paypal', 'PayPal'],
                  ].map(([id, label]) => {
                    const active = form.paymentMethod === id
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setField('paymentMethod', id)}
                        className={`flex h-12 cursor-pointer items-center gap-2.5 rounded-2xl px-3 text-[12px] font-medium sm:px-4 sm:text-[13px] ${
                          active
                            ? 'border-2 border-[#21943A] bg-white text-[#3F434A]'
                            : 'border border-transparent bg-[#f3f4f6] text-[#6b7280]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={active}
                          readOnly
                          className="pointer-events-none h-4 w-4 cursor-pointer accent-[#21943A]"
                        />
                        {label}
                      </button>
                    )
                  })}
                </div>

                {form.paymentMethod === 'card' ? (
                  <>
                    <label className="mb-1.5 block text-[12px] text-[#9ca3af]">Card Number</label>
                    <div className="relative mb-4">
                      <input
                        value={form.cardNumber}
                        onChange={(e) => setField('cardNumber', e.target.value)}
                        className="h-11 w-full rounded-full border border-[#e5e7eb] px-4 pr-14 text-[13px] text-[#3F434A] outline-none focus:border-[#86efac]"
                      />
                      <img
                        src={mastercardIcon}
                        alt=""
                        className="pointer-events-none absolute top-1/2 right-4 h-5 w-8 -translate-y-1/2 object-contain"
                      />
                    </div>
                    <label className="mb-1.5 block text-[12px] text-[#9ca3af]">Card Holder</label>
                    <input
                      value={form.cardName}
                      onChange={(e) => setField('cardName', e.target.value)}
                      className="mb-4 h-11 w-full rounded-full border border-[#e5e7eb] px-4 text-[13px] text-[#3F434A] outline-none focus:border-[#86efac]"
                    />
                    <div className="mb-8 grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1.5 block text-[12px] text-[#9ca3af]">Month</label>
                        <div className="relative">
                          <select
                            value={form.month}
                            onChange={(e) => setField('month', e.target.value)}
                            className="h-11 w-full cursor-pointer appearance-none rounded-full border border-[#e5e7eb] bg-white px-4 pr-9 text-[13px] text-[#3F434A] outline-none"
                          >
                            {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((m) => (
                              <option key={m}>{m}</option>
                            ))}
                          </select>
                          <img
                            src={arrowDown02Icon}
                            alt=""
                            className="pointer-events-none absolute top-1/2 right-4 h-3 w-3 -translate-y-1/2 object-contain opacity-70"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-[12px] text-[#9ca3af]">Year</label>
                        <div className="relative">
                          <select
                            value={form.year}
                            onChange={(e) => setField('year', e.target.value)}
                            className="h-11 w-full cursor-pointer appearance-none rounded-full border border-[#e5e7eb] bg-white px-4 pr-9 text-[13px] text-[#3F434A] outline-none"
                          >
                            {['2023', '2024', '2025', '2026', '2027', '2028'].map((y) => (
                              <option key={y}>{y}</option>
                            ))}
                          </select>
                          <img
                            src={arrowDown02Icon}
                            alt=""
                            className="pointer-events-none absolute top-1/2 right-4 h-3 w-3 -translate-y-1/2 object-contain opacity-70"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="mb-8" />
                )}
              </>
            ) : (
              <>
                <h2 className="mb-5 text-[20px] font-semibold text-[#3F434A] sm:text-[22px]">Submission</h2>

                <h3 className="mb-3 text-[15px] font-semibold text-[#3F434A]">Profile Details</h3>
                <div className="mb-4 space-y-1.5">
                  <DetailRow label="Name" value={`${form.firstName} ${form.lastName}`} />
                  <DetailRow label="Email" value={form.email} />
                  <DetailRow label="Phone" value={`${form.code} ${form.phone}`} />
                </div>
                <div className="mb-4 border-t border-[#eeeeee]" />

                <h3 className="mb-3 text-[15px] font-semibold text-[#3F434A]">Address Details</h3>
                <div className="mb-4 space-y-1.5">
                  <DetailRow label="Address Line 1" value={form.address1} />
                  {form.address2 ? <DetailRow label="Address Line 2" value={form.address2} /> : null}
                  <DetailRow label="City" value={form.city} />
                  <DetailRow label="Country" value={form.country} />
                  <DetailRow label="State/Region" value={form.state} />
                  <DetailRow label="Postcode" value={form.zip} />
                </div>
                <div className="mb-4 border-t border-[#eeeeee]" />

                <h3 className="mb-3 text-[15px] font-semibold text-[#3F434A]">Payment Details</h3>
                <div className="mb-8 space-y-1.5">
                  {form.paymentMethod === 'card' ? (
                    <>
                      <DetailRow label="Card Number" value={form.cardNumber} />
                      <DetailRow label="Card Name" value={form.cardName} />
                      <DetailRow label="Card Expiry" value={`${form.month}/${form.year}`} />
                    </>
                  ) : (
                    <DetailRow label="Method" value="PayPal" />
                  )}
                </div>
              </>
            )}

            <div className={`flex flex-wrap items-center gap-2 ${profileTab === 'profile' ? 'justify-end' : 'justify-between'}`}>
              {profileTab !== 'profile' ? (
                <button
                  type="button"
                  onClick={goPrev}
                  className="cursor-pointer rounded-full border border-[#e5e7eb] bg-white px-5 py-2.5 text-[13px] font-medium text-[#3F434A] hover:bg-[#f8fafc] sm:px-6"
                >
                  Previous
                </button>
              ) : null}
              <button
                type="button"
                onClick={goNext}
                className="min-w-[100px] cursor-pointer rounded-md bg-[#21943A] px-6 py-2.5 text-[13px] font-medium text-white hover:bg-[#1a7a3a] sm:min-w-[120px] sm:px-8"
              >
                {profileTab === 'submission' ? 'Submit' : 'Next Step'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
