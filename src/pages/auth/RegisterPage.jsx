import AuthLayout from '../../components/auth/AuthLayout'
import RegisterForm from '../../components/auth/RegisterForm'

export default function RegisterPage({ onSwitchToLogin }) {
  return (
    <AuthLayout>
      <RegisterForm onSwitchToLogin={onSwitchToLogin} />
    </AuthLayout>
  )
}
