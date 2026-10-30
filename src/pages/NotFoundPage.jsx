export default function NotFoundPage({ onBackHome }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7f5] px-4">
      <div className="text-center">
        <p className="mb-2 text-[96px] leading-none font-bold text-[#21943a] sm:text-[120px]">
          404
        </p>
        <h1 className="mb-3 text-[28px] font-semibold text-[#2c2c2c] sm:text-[32px]">
          We can&apos;t seem to find that
        </h1>
        <p className="mb-8 text-[15px] text-[#9b9b9b]">
          The page you&apos;re looking for doesn&apos;t exist or has been moved
        </p>
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-[#21943a] px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-[#1b7d31]"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  )
}
