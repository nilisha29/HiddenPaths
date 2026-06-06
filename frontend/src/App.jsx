import { useState } from 'react'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'

function App() {
  const [page, setPage] = useState('landing')

  if (page === 'login') {
    return (
      <LoginPage
        onBack={() => setPage('landing')}
        onSwitchToRegister={() => setPage('register')}
      />
    )
  }

  if (page === 'register') {
    return (
      <RegisterPage
        onBack={() => setPage('landing')}
        onSwitchToLogin={() => setPage('login')}
      />
    )
  }

  return (
    <LandingPage
      onLoginClick={() => setPage('login')}
      onRegisterClick={() => setPage('register')}
    />
  )
}

export default App
