import AuthPage from './AuthPage.jsx'

function LoginPage({ onBack, onSwitchToRegister }) {
  return <AuthPage mode="login" onBack={onBack} onSwitch={onSwitchToRegister} />
}

export default LoginPage
