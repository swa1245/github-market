import AuthLayout from '../../components/auth/AuthLayout'
import ResetPasswordForm from '../../components/auth/ResetPasswordForm'

export default function ResetPasswordPage({ email, onSwitchToLogin, onSwitchToUnlock }) {
  return (
    <AuthLayout>
      <ResetPasswordForm
        email={email}
        onSwitchToLogin={onSwitchToLogin}
        onSwitchToUnlock={onSwitchToUnlock}
      />
    </AuthLayout>
  )
}
