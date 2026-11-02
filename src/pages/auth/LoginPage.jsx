import AuthLayout from '../../components/auth/AuthLayout'
import LoginForm from '../../components/auth/LoginForm'

export default function LoginPage({
  onSwitchToRegister,
  onSwitchToRecover,
  onLoginSuccess,
}) {
  return (
    <AuthLayout>
      <LoginForm
        onSwitchToRegister={onSwitchToRegister}
        onSwitchToRecover={onSwitchToRecover}
        onLoginSuccess={onLoginSuccess}
      />
    </AuthLayout>
  )
}
