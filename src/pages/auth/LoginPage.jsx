import AuthLayout from '../../components/auth/AuthLayout'
import LoginForm from '../../components/auth/LoginForm'

export default function LoginPage({ onSwitchToRegister, onSwitchToRecover }) {
  return (
    <AuthLayout>
      <LoginForm
        onSwitchToRegister={onSwitchToRegister}
        onSwitchToRecover={onSwitchToRecover}
      />
    </AuthLayout>
  )
}
