import { useState } from 'react'
import avatar from '../../assets/images/user-avatar.svg'
import AuthCard from './AuthCard'
import PasswordField from './PasswordField'

export default function UnlockForm({ onSwitchToLogin, onUnlock }) {
  const [password, setPassword] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    onUnlock()
  }

  return (
    <AuthCard
      footer={
        <>
          Not you?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="cursor-pointer font-semibold text-[#21943a] hover:underline"
          >
            Sign In
          </button>
        </>
      }
    >
      <img
        src={avatar}
        alt="Ronald Robertson"
        className="mx-auto mb-5 h-[110px] w-[110px] rounded-full object-cover"
      />
      <h1 className="mb-2 text-center text-[26px] font-semibold text-[#2c2c2c]">
        Ronald Robertson
      </h1>
      <p className="mb-8 text-center text-[14px] text-[#9b9b9b]">
        Enter your password to access the admin.
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <PasswordField
          id="unlockPassword"
          label="Password"
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button
          type="submit"
          className="w-full cursor-pointer rounded-md bg-[#21943a] py-2.5 text-[15px] font-semibold text-white hover:bg-[#1b7d31]"
        >
          Unlock
        </button>
      </form>
    </AuthCard>
  )
}
