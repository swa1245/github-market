import { useState } from 'react'
import lockIcon from '../../assets/images/Lock.svg'
import AuthCard from './AuthCard'
import AuthInput from './AuthInput'

export default function RecoverPasswordForm({ onSwitchToLogin, onSwitchToReset }) {
  const [email, setEmail] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    if (!email.trim()) return
    onSwitchToReset(email.trim())
  }

  return (
    <AuthCard
      footer={
        <>
          Go back to{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="cursor-pointer font-semibold text-[#21943a] hover:underline"
          >
            Login
          </button>
        </>
      }
    >
      <img src={lockIcon} alt="" className="mx-auto mb-6 h-[120px] w-[120px]" />
      <h1 className="mb-8 text-center text-[28px] font-medium text-[#2c2c2c]">
        Recover Your Password
      </h1>

      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <AuthInput
          id="recoverEmail"
          label="Email"
          type="email"
          placeholder="cooper@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <button
          type="submit"
          className="w-full cursor-pointer rounded-md bg-[#21943a] py-2.5 text-[15px] font-semibold text-white hover:bg-[#1b7d31]"
        >
          Recover Password
        </button>
      </form>
    </AuthCard>
  )
}
