import AuthLayout from '../../components/auth/AuthLayout'
import UnlockForm from '../../components/auth/UnlockForm'

export default function UnlockPage({ onSwitchToLogin, onUnlock }) {
  return (
    <AuthLayout>
      <UnlockForm onSwitchToLogin={onSwitchToLogin} onUnlock={onUnlock} />
    </AuthLayout>
  )
}
