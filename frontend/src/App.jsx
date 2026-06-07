import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './components/private/LandingPage.jsx'
import Register from './pages/Register'
import Onboarding from './pages/Onboarding'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
