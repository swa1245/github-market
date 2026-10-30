import illustration from '../../assets/images/auth-illustration.png'

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-6 sm:px-8 lg:bg-[#21943a] lg:px-12">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6 lg:gap-10">
        <div className="hidden flex-1 items-center justify-center lg:flex">
          <img
            src={illustration}
            alt=""
            className="h-auto w-full max-w-[480px] object-contain"
            draggable={false}
          />
        </div>
        <div className="flex w-full justify-center lg:w-auto lg:justify-end">
          {children}
        </div>
      </div>
    </div>
  )
}
