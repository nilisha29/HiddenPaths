import AuthPage from './AuthPage.jsx'

function RegisterPage({ onBack, onSwitchToLogin }) {
  return <AuthPage mode="register" onBack={onBack} onSwitch={onSwitchToLogin} />
}

export default RegisterPage
