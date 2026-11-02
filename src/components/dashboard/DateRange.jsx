import calendarIcon from '../../assets/images/Calendar.svg'

export default function DateRange({ label = '19 Aug – 25 Aug' }) {
  return (
    <button
      type="button"
      className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#eef0f3] bg-white px-3 py-1.5 text-[13px] font-medium text-[#6b7280] hover:bg-[#f9fafb]"
    >
      <img src={calendarIcon} alt="" className="h-4 w-4" />
      {label}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
      </svg>
    </button>
  )
}
