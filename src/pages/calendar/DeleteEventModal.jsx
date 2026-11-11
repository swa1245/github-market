export default function DeleteEventModal({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/25 p-4">
      <button type="button" aria-label="Close" className="absolute inset-0 cursor-default" onClick={onCancel} />
      <div className="relative z-[1] w-full max-w-[380px] rounded-2xl bg-white px-5 py-5 shadow-[0_24px_60px_rgba(16,24,40,0.24),0_6px_16px_rgba(16,24,40,0.12)] sm:px-6 sm:py-6">
        <h3 className="mb-2 text-[18px] font-semibold text-[#3F434A] sm:text-[20px]">Deleting Event</h3>
        <p className="mb-6 text-[13px] text-[#6b7280] sm:text-[14px]">Are you sure you want to delete this event?</p>
        <div className="flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="h-10 min-w-[88px] cursor-pointer rounded-lg border border-[#e5e7eb] bg-white px-5 text-[13px] font-medium text-[#3F434A] hover:bg-[#f8fafc]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-10 min-w-[72px] cursor-pointer rounded-lg bg-[#F07167] px-5 text-[13px] font-medium text-white hover:bg-[#e15f55]"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}
