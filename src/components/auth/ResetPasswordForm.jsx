import { useState } from 'react'
import lockIcon from '../../assets/images/Lock.svg'
import AuthCard from './AuthCard'
import AuthInput from './AuthInput'
import PasswordField from './PasswordField'

export default function ResetPasswordForm({
  email: initialEmail = '',
  onSwitchToLogin,
  onSwitchToUnlock,
}) {
  const [email, setEmail] = useState(initialEmail)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    onSwitchToUnlock()
  }

  return (
    <AuthCard
      tall
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
        Reset Your Password
      </h1>

      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <AuthInput
          id="resetEmail"
          label="Email"
          type="email"
          placeholder="cooper@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <PasswordField
          id="resetPassword"
          label="Password"
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
        <PasswordField
          id="resetConfirm"
          label="Confirm Password"
          placeholder="••••••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />
        <button
          type="submit"
          className="w-full cursor-pointer rounded-md bg-[#21943a] py-2.5 text-[15px] font-semibold text-white hover:bg-[#1b7d31]"
        >
          Reset Password
        </button>
      </form>
    </AuthCard>
  )
}
