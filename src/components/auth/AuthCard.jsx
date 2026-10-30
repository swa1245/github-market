export default function AuthCard({ children, footer, tall }) {
  return (
    <div
      className={`flex w-full max-w-[580px] flex-col bg-white px-6 py-8 sm:px-10 lg:min-w-[580px] lg:rounded-xl lg:py-10 lg:shadow-[0_12px_40px_rgba(0,0,0,0.12)] ${
        tall ? 'min-h-[820px]' : 'min-h-[780px]'
      }`}
    >
      <div className="mx-auto flex w-full max-w-[380px] flex-1 flex-col justify-center">
        {children}
      </div>
      {footer && (
        <div className="mt-auto pt-6 text-center text-[13px] font-medium text-[#6b6b6b]">
          {footer}
        </div>
      )}
    </div>
  )
}
