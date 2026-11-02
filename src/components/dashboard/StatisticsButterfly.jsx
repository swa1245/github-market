import DateRange from './DateRange'

const rows = [
  { day: '19', income: 220, expense: 160 },
  { day: '20', income: 180, expense: 140 },
  { day: '21', income: 260, expense: 210 },
  { day: '22', income: 150, expense: 120 },
  { day: '23', income: 310, expense: 180 },
  { day: '24', income: 250, expense: 120 },
  { day: '25', income: 190, expense: 220 },
]

const max = 400
const incomeColor = '#1a7a3a'
const expenseColor = '#64e9d1'
const xLabels = [400, 300, 200, 100, 0, -100, -200, -300, -400]

export default function StatisticsButterfly() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#f0f1f3] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-[16px] font-semibold text-[#1f2937]">Statistics</h3>
        <div className="flex items-center gap-5 text-[12px] text-[#6b7280]">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: incomeColor }} />
            Income
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: expenseColor }} />
            Expense
          </span>
        </div>
        <DateRange />
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col">
        <div className="absolute top-[42%] right-[4%] z-10 flex -translate-y-1/2 items-center gap-3 rounded-xl bg-white px-3.5 py-2.5 shadow-[0_8px_24px_rgba(16,24,40,0.12)]">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#3F434A]">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: incomeColor }} />
            2.500
          </span>
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#3F434A]">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: expenseColor }} />
            1.200
          </span>
        </div>

        {/* chart rows */}
        <div className="flex min-h-0 flex-1 gap-3">
          <div className="flex w-6 shrink-0 flex-col justify-between text-[12px] text-[#9ca3af]">
            {rows.map((row) => (
              <span key={row.day} className="flex h-5 items-center justify-end leading-none">
                {row.day}
              </span>
            ))}
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-between">
            {rows.map((row) => (
              <div key={row.day} className="relative flex h-5 items-center">
                <div className="pointer-events-none absolute inset-0 flex">
                  {xLabels.map((_, i) => (
                    <div
                      key={i}
                      className="h-full flex-1 border-l border-[#eef0f3] first:border-l-0"
                    />
                  ))}
                  <div className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-[#e5e7eb]" />
                </div>

                <div className="relative z-[1] flex w-full items-center">
                  <div className="flex flex-1 items-center justify-end">
                    <div
                      className="h-3.5 rounded-l-full"
                      style={{
                        width: `${(row.income / max) * 100}%`,
                        backgroundColor: incomeColor,
                      }}
                    />
                  </div>
                  <div className="flex flex-1 items-center justify-start">
                    <div
                      className="h-3.5 rounded-r-full"
                      style={{
                        width: `${(row.expense / max) * 100}%`,
                        backgroundColor: expenseColor,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* X-axis pinned below chart with real gap */}
        <div className="shrink-0 pt-6 pl-9">
          <div className="grid grid-cols-9 text-[10px] text-[#9ca3af]">
            {xLabels.map((n, i) => (
              <span
                key={n}
                className={
                  i === 0
                    ? 'text-left'
                    : i === xLabels.length - 1
                      ? 'text-right'
                      : 'text-center'
                }
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
