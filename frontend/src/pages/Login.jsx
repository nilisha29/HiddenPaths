// import { useState } from 'react'
// import axios from 'axios'
// import { FiLock, FiMail } from 'react-icons/fi'
// import { Link, useNavigate } from 'react-router-dom'
// import '../App.css'
// import '../styles/login.css'

// export default function Login() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const navigate = useNavigate()

//   async function handleSubmit(e) {
//     e.preventDefault()
//     setError('')

//     try {
//       setLoading(true)
//       const res = await axios.post('/api/auth/login', { email, password })
//       localStorage.setItem('hiddenpaths_token', res.data.token)
//       navigate('/home')
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="auth-page-shell">
//       <div className="auth-shell">
//         <aside className="auth-visual" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=5c2e7c1f6b315b9b3e4f8d46d1d30f7b')" }}>
//           <div className="auth-visual-content">
//             <a className="auth-brand" href="/">HiddenPaths</a>
//             <h1>Travel that touches the soul.</h1>
//             <p className="auth-quote">The trail is not just a path through the mountains, but a journey through the soul of Nepal.</p>
//             <div className="auth-credit"><span />TENZING SHERPA</div>
//           </div>
//         </aside>

//         <section className="auth-form-panel">
//           <div className="auth-card">
//             <div className="auth-card-header">
//               <h2>Welcome back</h2>
//               <p>Resume your journey through the hidden paths of Nepal.</p>
//             </div>

//             <form className="auth-form" onSubmit={handleSubmit}>
//               <div className="field-group">
//                 <span>Email Address</span>
//                 <label className="field-shell">
//                   <FiMail className="mini-icon" />
//                   <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                 </label>
//               </div>

//               <div className="field-group">
//                 <div className="field-label-row">
//                   <span>Password</span>
//                   <button type="button" className="inline-link">Forgot password?</button>
//                 </div>
//                 <label className="field-shell">
//                   <FiLock className="mini-icon" />
//                   <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                 </label>
//               </div>

//               {error ? <p className="form-error">{error}</p> : null}

//               <button className="auth-submit" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>

//               <div className="auth-divider"><span />OR<span /></div>

//               <button className="social-auth-button" type="button">Continue with Google</button>

//               <div className="auth-footer">
//                 <p>Don’t have an account? <Link className="inline-link strong" to="/register">Register</Link></p>
//               </div>
//             </form>
//           </div>
//         </section>
//       </div>
//     </div>
//   )
// }



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/register.css';
// import '../styles/login.css';

// export default function Login() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         localStorage.setItem('token', data.token);
//         navigate('/'); // Routes user to the verified home interface
//       } else {
//         setError(data.message || 'Invalid credentials');
//       }
//     } catch (err) {
//       setError('Connection refused by authentication platform');
//     }
//   };

//   return (
//     <div className="split-screen">
//       <div className="login-split-panel" style={{ backgroundImage: "linear-gradient(to top, rgba(15,32,39,0.85), rgba(44,83,100,0.35)), url('https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1000')" }}>
//         <div className="panel-content">
//           <h2 className="panel-logo text-accent-gold">HiddenPaths</h2>
//           <p className="quote-subtext">"The path is not just a path through the mountains, but a journey through the soul of Nepal."</p>
//         </div>
//       </div>

//       <div className="form-panel">
//         <div className="form-wrapper">
//           <div className="form-header">
//             <h1>Welcome back</h1>
//             <p>Please enter your credentials to look for paths.</p>
//           </div>

//           {error && <div className="error-banner">{error}</div>}

//           <form onSubmit={handleLogin}>
//             <div className="form-group">
//               <label>Email Address</label>
//               <input type="email" required placeholder="traveler@hiddenpaths.com" onChange={e => setFormData({...formData, email: e.target.value})} />
//             </div>
//             <div className="form-group">
//               <label>Password</label>
//               <input type="password" required placeholder="••••••••" onChange={e => setFormData({...formData, password: e.target.value})} />
//             </div>
//             <button type="submit" className="btn-submit">Sign In</button>
//           </form>
//           <p className="form-footer">
//             Don't have an account? <span onClick={() => navigate('/register')}>Register here</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';
import '../styles/login.css';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/home'); 
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection refused by authentication platform');
    }
  };

  return (
    <div className="split-screen">
      <div className="login-split-panel" style={{ backgroundImage: "linear-gradient(to top, rgba(15,32,39,0.85), rgba(44,83,100,0.35)), url('https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1000')" }}>
        <div className="panel-content">
          <h2 className="panel-logo text-accent-gold">HiddenPaths</h2>
          <p className="quote-subtext">"The path is not just a path through the mountains, but a journey through the soul of Nepal."</p>
        </div>
      </div>

      <div className="form-panel">
        <div className="form-wrapper">
          <div className="form-header">
            <h1>Welcome back</h1>
            <p>Please enter your credentials to look for paths.</p>
          </div>

          {error && <div className="error-banner">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" required placeholder="traveler@hiddenpaths.com" onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" required placeholder="••••••••" onChange={e => setFormData({...formData, password: e.target.value})} />
            </div>
            <button type="submit" className="btn-submit">Sign In</button>
          </form>
          <p className="form-footer">
            Don't have an account? <span onClick={() => navigate('/register')}>Register here</span>
          </p>
        </div>
      </div>
    </div>
  );
}