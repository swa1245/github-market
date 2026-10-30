import { useState } from 'react'
import AuthCard from './AuthCard'
import AuthInput from './AuthInput'
import GoogleIcon from './GoogleIcon'
import PasswordField from './PasswordField'

export default function LoginForm({ onSwitchToRegister, onSwitchToRecover }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)

  function onSubmit(e) {
    e.preventDefault()
  }

  return (
    <AuthCard
      footer={
        <>
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="cursor-pointer font-semibold text-[#21943a] hover:underline"
          >
            Sign Up
          </button>
        </>
      }
    >
      <h1 className="mb-7 text-center text-[28px] font-semibold text-[#2c2c2c]">
        Login To Your Account
      </h1>

      <button
        type="button"
        className="relative mb-6 flex w-full cursor-pointer items-center justify-center rounded-md border border-[#e6e6e6] bg-white px-3.5 py-3 text-[14px] font-medium text-[#2c2c2c] hover:bg-[#fafafa]"
      >
        <span className="absolute top-1/2 left-3.5 -translate-y-1/2">
          <GoogleIcon />
        </span>
        Login with Google
      </button>

      <div className="mb-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#e8e8e8]" />
        <span className="text-[11px] font-medium tracking-wide text-[#9b9b9b] uppercase">
          Or Login With Email
        </span>
        <div className="h-px flex-1 bg-[#e8e8e8]" />
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <AuthInput
          id="email"
          label="Email"
          type="email"
          placeholder="cooper@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <PasswordField
          id="password"
          label="Password"
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-[13px] font-medium text-[#21943a]">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 cursor-pointer accent-[#21943a]"
            />
            Remember Me
          </label>
          <button
            type="button"
            onClick={onSwitchToRecover}
            className="cursor-pointer text-[13px] font-semibold text-[#21943a] hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="mt-1 w-full cursor-pointer rounded-md bg-[#21943a] py-2.5 text-[15px] font-semibold text-white hover:bg-[#1b7d31]"
        >
          Log In
        </button>
      </form>
    </AuthCard>
  )
}
