import { useState } from 'react'
import AnalyticsChart from '../../components/dashboard/AnalyticsChart'
import Header from '../../components/dashboard/Header'
import LastOrders from '../../components/dashboard/LastOrders'
import SalesDonut from '../../components/dashboard/SalesDonut'
import Sidebar from '../../components/dashboard/Sidebar'
import StatCards from '../../components/dashboard/StatCards'
import StatisticsBars from '../../components/dashboard/StatisticsBars'
import StatisticsButterfly from '../../components/dashboard/StatisticsButterfly'
import Transactions from '../../components/dashboard/Transactions'
import ExportMenu from '../../components/dashboard/ExportMenu'
import DateFilterMenu from '../../components/dashboard/DateFilterMenu'

export default function DashboardPage({
  onOpenSettings,
  onOpenChat,
  onOpenProducts,
  onOpenOrders,
  onOpenCustomers,
  onOpenCalendar,
  onLock,
  onLogout,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f7fb]">
      {/* mobile overlay */}
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
        activeLabel="Dashboard"
        onNavigate={(label) => {
          if (label === 'Chat') onOpenChat?.()
          if (label === 'Products') onOpenProducts?.()
          if (label === 'Orders') onOpenOrders?.()
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
        <main className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 sm:space-y-5 sm:p-5 lg:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4">
            <div>
              <h2 className="text-[20px] font-semibold text-[#111827] sm:text-[22px]">
                Dashboard
              </h2>
              <p className="text-[12px] text-[#9ca3af] sm:text-[13px]">
                Welcome back to FLOWER
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <ExportMenu />
              <DateFilterMenu />
            </div>
          </div>

          <StatCards />

          <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
            <StatisticsBars />
            <AnalyticsChart />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <SalesDonut />
            </div>
            <div className="lg:col-span-2">
              <StatisticsButterfly />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <LastOrders />
            </div>
            <Transactions />
          </div>
        </main>
      </div>
    </div>
  )
}
