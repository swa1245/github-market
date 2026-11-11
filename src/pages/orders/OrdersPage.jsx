import { useMemo, useState } from 'react'
import Header from '../../components/dashboard/Header'
import Sidebar from '../../components/dashboard/Sidebar'
import ExportMenu from '../../components/dashboard/ExportMenu'
import searchIcon from '../../assets/images/search-01.svg'
import filterIcon from '../../assets/images/Filter.png'
import arrowDownIcon from '../../assets/images/arrow-down-01.png'
import arrowDown02Icon from '../../assets/images/arrow-down-02.png'
import firstIcon from '../../assets/images/First.png'
import lastIcon from '../../assets/images/Last.png'
import OrderDetailsModal from './OrderDetailsModal'

const columns = [
  { key: 'no', label: 'ORDER NO.' },
  { key: 'customer', label: 'CUSTOMER' },
  { key: 'date', label: 'DATE' },
  { key: 'total', label: 'TOTAL' },
  { key: 'payment', label: 'PAYMENT' },
  { key: 'status', label: 'STATUS' },
]

const orders = [
  { id: 1, no: '#790841', customer: 'Claire Warren', date: '12.09.20', total: '$145.85', payment: 'PayPal', status: 'Shipped' },
  { id: 2, no: '#790841', customer: 'Theresa Robertson', date: '12.09.20', total: '$225.15', payment: 'Credit Card', status: 'Shipped' },
  { id: 3, no: '#790841', customer: 'Nathan Hawkins', date: '12.09.20', total: '$45.55', payment: 'PayPal', status: 'Shipped' },
  { id: 4, no: '#790841', customer: 'Lily Williamson', date: '12.09.20', total: '$305.25', payment: 'Credit Card', status: 'Processing' },
  { id: 5, no: '#790841', customer: 'Brooklyn Steward', date: '12.09.20', total: '$483.80', payment: 'Credit Card', status: 'Shipped' },
  { id: 6, no: '#790841', customer: 'Norma Flores', date: '12.09.20', total: '$128.79', payment: 'Payoneer', status: 'Processing' },
  { id: 7, no: '#790841', customer: 'Leslie Mckinney', date: '12.09.20', total: '$105.05', payment: 'Credit Card', status: 'Cancelled' },
  { id: 8, no: '#790841', customer: 'Gregory Black', date: '12.09.20', total: '$1028.15', payment: 'PayPal', status: 'Shipped' },
  { id: 9, no: '#790842', customer: 'Owen Reid', date: '12.09.20', total: '$88.40', payment: 'PayPal', status: 'Pending' },
  { id: 10, no: '#790843', customer: 'Maya Chen', date: '12.09.20', total: '$210.00', payment: 'Credit Card', status: 'Pending' },
  { id: 11, no: '#790844', customer: 'Paul Atkins', date: '12.09.20', total: '$64.20', payment: 'PayPal', status: 'Refunded' },
  { id: 12, no: '#790845', customer: 'Ivy Brooks', date: '12.09.20', total: '$390.10', payment: 'Credit Card', status: 'Refunded' },
]

const tabs = [
  { id: 'all', label: 'All', count: 983 },
  { id: 'pending', label: 'Pending', count: 128 },
  { id: 'processing', label: 'Processing', count: 15 },
  { id: 'refunded', label: 'Refunded', count: 8 },
]

function statusClass(status) {
  if (status === 'Shipped') return 'bg-[#E8F8EC] text-[#21943A]'
  if (status === 'Processing') return 'bg-[#F8E6D8] text-[#C47A4A]'
  if (status === 'Cancelled') return 'bg-[#F8E0E0] text-[#C45A5A]'
  if (status === 'Pending') return 'bg-[#FFF4D6] text-[#C4A04A]'
  if (status === 'Refunded') return 'bg-[#E8EEF8] text-[#4A6AC4]'
  return 'bg-[#f3f4f6] text-[#6b7280]'
}

export default function OrdersPage({
  onOpenSettings,
  onOpenChat,
  onOpenDashboard,
  onOpenProducts,
  onOpenCustomers,
  onOpenCalendar,
  onLock,
  onLogout,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tab, setTab] = useState('all')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState([2, 3, 4])
  const [page, setPage] = useState(1)
  const [detailOrder, setDetailOrder] = useState(null)

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchTab =
        tab === 'all' ||
        (tab === 'pending' && o.status === 'Pending') ||
        (tab === 'processing' && o.status === 'Processing') ||
        (tab === 'refunded' && o.status === 'Refunded')
      const q = query.trim().toLowerCase()
      const matchQuery =
        !q ||
        o.customer.toLowerCase().includes(q) ||
        o.no.toLowerCase().includes(q) ||
        o.payment.toLowerCase().includes(q) ||
        o.status.toLowerCase().includes(q)
      return matchTab && matchQuery
    })
  }, [tab, query])

  const allChecked = filtered.length > 0 && filtered.every((o) => selected.includes(o.id))

  function toggleAll() {
    if (allChecked) {
      setSelected((prev) => prev.filter((id) => !filtered.some((o) => o.id === id)))
    } else {
      setSelected((prev) => [...new Set([...prev, ...filtered.map((o) => o.id)])])
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
        activeLabel="Orders"
        onNavigate={(label) => {
          if (label === 'Dashboard') onOpenDashboard?.()
          if (label === 'Chat') onOpenChat?.()
          if (label === 'Products') onOpenProducts?.()
          if (label === 'Orders') setSidebarOpen(false)
          if (label === 'Customers') onOpenCustomers?.()
          if (label === 'Calendar') onOpenCalendar?.()
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
              <h1 className="text-[22px] font-semibold text-[#3F434A] sm:text-[24px]">Orders</h1>
              <ExportMenu />
            </div>

            <div className="mb-4 overflow-x-auto border-b border-[#eeeeee]">
              <div className="flex min-w-max items-center gap-4 sm:gap-5">
                {tabs.map((t) => {
                  const active = tab === t.id
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setTab(t.id)
                        setPage(1)
                      }}
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
                  placeholder="Search order..."
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
                  {filtered.map((o) => {
                    const checked = selected.includes(o.id)
                    return (
                      <tr
                        key={o.id}
                        className="cursor-pointer border-b border-[#f1f3f5] text-[13px] text-[#3F434A] hover:bg-[#fafbfc]"
                        onClick={() => setDetailOrder(o)}
                      >
                        <td className="py-3.5 pr-2" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleOne(o.id)}
                            className="h-4 w-4 cursor-pointer accent-[#21943A]"
                          />
                        </td>
                        <td className="px-2 py-3.5 text-[#6b7280]">{o.no}</td>
                        <td className="px-2 py-3.5 font-medium">{o.customer}</td>
                        <td className="px-2 py-3.5 text-[#6b7280]">{o.date}</td>
                        <td className="px-2 py-3.5 text-[#6b7280]">{o.total}</td>
                        <td className="px-2 py-3.5 text-[#6b7280]">{o.payment}</td>
                        <td className="px-2 py-3.5">
                          <span className={`inline-flex rounded-md px-2.5 py-1 text-[11px] font-medium ${statusClass(o.status)}`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="px-2 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
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

      {detailOrder ? <OrderDetailsModal order={detailOrder} onClose={() => setDetailOrder(null)} /> : null}
    </div>
  )
}
