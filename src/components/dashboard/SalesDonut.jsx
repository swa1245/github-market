export default function SalesDonut() {
  const size = 148
  const stroke = 12
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const gap = 16
  const current = 0.6
  const last = 0.4
  const currentLen = Math.max(0, c * current - gap)
  const lastLen = Math.max(0, c * last - gap)

  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#f0f1f3] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-[#1f2937]">Sales</h3>
        <button type="button" className="cursor-pointer px-1 text-[#9ca3af] hover:text-[#6b7280]">
          •••
        </button>
      </div>

      <div className="relative mx-auto my-3 flex h-[160px] w-[160px] shrink-0 items-center justify-center">
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#7dd3c7"
            strokeWidth={stroke}
            strokeDasharray={`${lastLen} ${c - lastLen}`}
            strokeDashoffset={-(c * current)}
            strokeLinecap="round"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#1a7a3a"
            strokeWidth={stroke}
            strokeDasharray={`${currentLen} ${c - currentLen}`}
            strokeDashoffset={0}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute text-center">
          <p className="text-[24px] leading-none font-medium text-[#3F434A]">3.500</p>
          <p className="mt-1 text-[12px] text-[#9ca3af]">Total</p>
        </div>
      </div>

      <div className="mt-auto w-full border-t border-[#f3f4f6]">
        <div className="grid grid-cols-3 items-center border-b border-[#f3f4f6] py-3.5 text-[13px]">
          <span className="inline-flex items-center gap-2 text-[#6b7280]">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#1a7a3a]" />
            Current Week
          </span>
          <span className="text-center font-medium text-[#3F434A]">2.500</span>
          <span className="inline-flex items-center justify-end gap-0.5 font-semibold text-[#34d399]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m6 14 6-6 6 6" />
            </svg>
            8.8%
          </span>
        </div>
        <div className="grid grid-cols-3 items-center py-3.5 text-[13px]">
          <span className="inline-flex items-center gap-2 text-[#6b7280]">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#7dd3c7]" />
            Last Week
          </span>
          <span className="text-center font-medium text-[#3F434A]">1.000</span>
          <span className="inline-flex items-center justify-end gap-0.5 font-semibold text-[#f87171]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m6 10 6 6 6-6" />
            </svg>
            5.8%
          </span>
        </div>
      </div>
    </div>
  )
}
