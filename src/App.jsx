import { useState } from 'react'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/auth/LoginPage'
import RecoverPasswordPage from './pages/auth/RecoverPasswordPage'
import RegisterPage from './pages/auth/RegisterPage'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'
import UnlockPage from './pages/auth/UnlockPage'

export default function App() {
  const [view, setView] = useState('login')
  const [email, setEmail] = useState('')

  if (view === 'register') {
    return <RegisterPage onSwitchToLogin={() => setView('login')} />
  }

  if (view === 'recover') {
    return (
      <RecoverPasswordPage
        onSwitchToLogin={() => setView('login')}
        onSwitchToReset={(value) => {
          setEmail(value)
          setView('reset')
        }}
      />
    )
  }

  if (view === 'reset') {
    return (
      <ResetPasswordPage
        email={email}
        onSwitchToLogin={() => setView('login')}
        onSwitchToUnlock={() => setView('unlock')}
      />
    )
  }

  if (view === 'unlock') {
    return (
      <UnlockPage
        onSwitchToLogin={() => setView('login')}
        onUnlock={() => setView('notfound')}
      />
    )
  }

  if (view === 'notfound') {
    return <NotFoundPage onBackHome={() => setView('login')} />
  }

  return (
    <LoginPage
      onSwitchToRegister={() => setView('register')}
      onSwitchToRecover={() => setView('recover')}
    />
  )
}
