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

export default function DashboardPage() {
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

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen((v) => !v)} />
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
              <button
                type="button"
                className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-full bg-white px-3 text-[12px] font-medium text-[#4b5563] shadow-[0_1px_3px_rgba(16,24,40,0.08)] hover:bg-[#f9fafb] sm:h-10 sm:px-4 sm:text-[14px]"
              >
                Last 7 days
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                </svg>
              </button>
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
