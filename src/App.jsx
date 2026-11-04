import { useState } from 'react'
import DashboardPage from './pages/dashboard/DashboardPage'
import SettingsPage from './pages/settings/SettingsPage'
import ChatPage from './pages/chat/ChatPage'
import ProductsPage from './pages/products/ProductsPage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/auth/LoginPage'
import RecoverPasswordPage from './pages/auth/RecoverPasswordPage'
import RegisterPage from './pages/auth/RegisterPage'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'
import UnlockPage from './pages/auth/UnlockPage'

export default function App() {
  const [view, setView] = useState('login')
  const [email, setEmail] = useState('')

  if (view === 'dashboard') {
    return (
      <DashboardPage
        onOpenSettings={() => setView('settings')}
        onOpenChat={() => setView('chat')}
        onOpenProducts={() => setView('products')}
        onLock={() => setView('unlock')}
        onLogout={() => setView('login')}
      />
    )
  }

  if (view === 'products') {
    return (
      <ProductsPage
        onOpenSettings={() => setView('settings')}
        onOpenChat={() => setView('chat')}
        onOpenDashboard={() => setView('dashboard')}
        onLock={() => setView('unlock')}
        onLogout={() => setView('login')}
      />
    )
  }

  if (view === 'settings') {
    return (
      <SettingsPage
        onLock={() => setView('unlock')}
        onLogout={() => setView('login')}
        onOpenDashboard={() => setView('dashboard')}
        onOpenChat={() => setView('chat')}
        onOpenProducts={() => setView('products')}
      />
    )
  }

  if (view === 'chat') {
    return (
      <ChatPage
        onOpenSettings={() => setView('settings')}
        onOpenDashboard={() => setView('dashboard')}
        onOpenProducts={() => setView('products')}
        onLock={() => setView('unlock')}
        onLogout={() => setView('login')}
      />
    )
  }

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
        onUnlock={() => setView('dashboard')}
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
      onLoginSuccess={() => setView('dashboard')}
    />
  )
}
