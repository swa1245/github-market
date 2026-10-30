import AuthLayout from '../../components/auth/AuthLayout'
import RecoverPasswordForm from '../../components/auth/RecoverPasswordForm'

export default function RecoverPasswordPage({ onSwitchToLogin, onSwitchToReset }) {
  return (
    <AuthLayout>
      <RecoverPasswordForm
        onSwitchToLogin={onSwitchToLogin}
        onSwitchToReset={onSwitchToReset}
      />
    </AuthLayout>
  )
}
