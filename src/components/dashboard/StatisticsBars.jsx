import DateRange from './DateRange'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
// expense (teal) on top, income (dark green) on bottom — totals ~ match mock heights
const data = [
  { income: 160, expense: 140 },
  { income: 180, expense: 150 },
  { income: 200, expense: 170 },
  { income: 120, expense: 110 },
  { income: 170, expense: 135 },
  { income: 140, expense: 105 },
  { income: 175, expense: 155 },
]

const max = 400
const incomeColor = '#1a7a3a'
const expenseColor = '#7dd3c7'

export default function StatisticsBars() {
  return (
    <div className="rounded-2xl border border-[#f0f1f3] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-[#1f2937]">Statistics</h3>
        <DateRange />
      </div>

      <div className="relative flex h-[280px]">
        <div className="mr-3 flex h-[calc(100%-28px)] flex-col justify-between text-[11px] text-[#9ca3af]">
          <span>400</span>
          <span>300</span>
          <span>200</span>
          <span>100</span>
          <span>0</span>
        </div>

        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-x-0 top-0 bottom-7 flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="border-t border-[#eef0f3]" />
            ))}
          </div>

          {/* Wed tooltip */}
          <div className="absolute top-2 left-[calc(100%/7*2.5)] z-10 -translate-x-1/2">
            <div className="rounded-xl bg-white px-3.5 py-2.5 shadow-[0_8px_24px_rgba(16,24,40,0.12)]">
              <div className="mb-1 flex items-center gap-3 text-[12px] font-medium text-[#3F434A]">
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: incomeColor }}
                  />
                  2.500
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: expenseColor }}
                  />
                  1.200
                </span>
              </div>
              <p className="text-center text-[11px] text-[#9ca3af]">23 August, 2020</p>
            </div>
            <div className="mx-auto -mt-px h-0 w-0 border-x-[6px] border-t-[7px] border-x-transparent border-t-white drop-shadow-sm" />
          </div>

          <div className="absolute inset-x-0 top-0 bottom-7 flex items-end justify-between gap-4 px-2">
            {data.map((d, i) => {
              const total = d.income + d.expense
              return (
                <div key={days[i]} className="flex h-full flex-1 flex-col items-center justify-end">
                  <div
                    className="relative w-5 overflow-hidden rounded-full sm:w-6"
                    style={{ height: `${(total / max) * 100}%` }}
                  >
                    {/* teal fills full bar behind */}
                    <div
                      className="absolute inset-0"
                      style={{ backgroundColor: expenseColor }}
                    />
                    {/* green bottom with rounded top cap */}
                    <div
                      className="absolute inset-x-0 bottom-0 rounded-t-full"
                      style={{
                        height: `${(d.income / total) * 100}%`,
                        backgroundColor: incomeColor,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between px-1 text-[11px] text-[#9ca3af]">
            {days.map((d) => (
              <span key={d} className="flex-1 text-center">
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-5 text-[12px] text-[#6b7280]">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: incomeColor }} />
          Income
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: expenseColor }} />
          Expense
        </span>
      </div>
    </div>
  )
}
