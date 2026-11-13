import { useState } from 'react'
import DashboardPage from './pages/dashboard/DashboardPage'
import SettingsPage from './pages/settings/SettingsPage'
import ChatPage from './pages/chat/ChatPage'
import ProductsPage from './pages/products/ProductsPage'
import CustomersPage from './pages/customers/CustomersPage'
import OrdersPage from './pages/orders/OrdersPage'
import CalendarPage from './pages/calendar/CalendarPage'
import MailPage from './pages/mail/MailPage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/auth/LoginPage'
import RecoverPasswordPage from './pages/auth/RecoverPasswordPage'
import RegisterPage from './pages/auth/RegisterPage'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'
import UnlockPage from './pages/auth/UnlockPage'

const pageNav = (setView) => ({
  onOpenSettings: () => setView('settings'),
  onOpenChat: () => setView('chat'),
  onOpenDashboard: () => setView('dashboard'),
  onOpenProducts: () => setView('products'),
  onOpenOrders: () => setView('orders'),
  onOpenCustomers: () => setView('customers'),
  onOpenCalendar: () => setView('calendar'),
  onOpenMail: () => setView('mail'),
  onLock: () => setView('unlock'),
  onLogout: () => setView('login'),
})

export default function App() {
  const [view, setView] = useState('login')
  const [email, setEmail] = useState('')
  const nav = pageNav(setView)

  if (view === 'dashboard') {
    return <DashboardPage {...nav} />
  }

  if (view === 'products') {
    return <ProductsPage {...nav} />
  }

  if (view === 'orders') {
    return <OrdersPage {...nav} />
  }

  if (view === 'customers') {
    return <CustomersPage activeLabel="Customers" {...nav} />
  }

  if (view === 'calendar') {
    return <CalendarPage {...nav} />
  }

  if (view === 'mail') {
    return <MailPage {...nav} />
  }

  if (view === 'settings') {
    return <SettingsPage {...nav} />
  }

  if (view === 'chat') {
    return <ChatPage {...nav} />
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
