import { useState } from 'react'

export default function PasswordField({
  id,
  label,
  placeholder,
  value,
  onChange,
  autoComplete,
}) {
  const [show, setShow] = useState(false)

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-[#9b9b9b]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className="w-full rounded-md border border-[#e5e5e5] px-3.5 py-2.5 pr-11 text-[14px] font-medium text-[#2c2c2c] outline-none placeholder:font-normal placeholder:text-[#bfbfbf] focus:border-[#21943a]"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-[#9b9b9b] hover:text-[#2c2c2c]"
        >
          {show ? (
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          ) : (
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
