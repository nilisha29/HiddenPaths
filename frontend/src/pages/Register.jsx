// import { useState } from 'react'
// import axios from 'axios'
// import { FiLock, FiMail, FiUser } from 'react-icons/fi'
// import { useNavigate } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import '../App.css'
// import '../styles/register.css'

// export default function Register() {
//   const [fullName, setFullName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const navigate = useNavigate()

//   async function handleSubmit(e) {
//     e.preventDefault()
//     setError(null)
//     if (password.length < 8) return setError('Password must be at least 8 characters')
//     try {
//       setLoading(true)
//       const res = await axios.post('/api/auth/register', { fullName, email, password })
//       const { userId, fullName: name } = res.data
//       // navigate to onboarding with state
//       navigate('/onboarding', { state: { userId, fullName: name } })
//     } catch (err) {
//       setError(err.response?.data?.message || err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="auth-page-shell">
//       <div className="auth-shell choice-shell">
//         <aside className="auth-visual auth-visual-register" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=5c2e7c1f6b315b9b3e4f8d46d1d30f7b')" }}>
//           <div className="auth-visual-content">
//             <a className="auth-brand" href="/">HiddenPaths</a>
//             <h1>Create your path.</h1>
//             <p className="auth-quote">The true journey of discovery consists not in seeking new landscapes, but in having new eyes.</p>
//             <div className="auth-credit"><span />HANDCRAFTED IN THE HIMALAYAS</div>
//           </div>
//         </aside>

//         <section className="auth-form-panel choice-form-panel">
//           <div className="auth-card choice-card">
//             <div className="auth-card-header">
//               <h2>Create account</h2>
//               <p>Start your journey into the unseen Nepal.</p>
//             </div>

//             <form className="auth-form" onSubmit={handleSubmit}>
//               <div className="field-group">
//                 <span>Full Name</span>
//                 <label className="field-shell">
//                   <FiUser className="mini-icon" />
//                   <input required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Tenzing Norgay" />
//                 </label>
//               </div>

//               <div className="field-group">
//                 <span>Email Address</span>
//                 <label className="field-shell">
//                   <FiMail className="mini-icon" />
//                   <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="traveler@hiddenpaths.com" type="email" />
//                 </label>
//               </div>

//               <div className="field-group">
//                 <span>Password</span>
//                 <label className="field-shell">
//                   <FiLock className="mini-icon" />
//                   <input required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" type="password" />
//                 </label>
//                 <p className="field-hint">Minimum 8 characters with one special symbol.</p>
//               </div>

//               {error ? <p className="form-error">{error}</p> : null}

//               <button disabled={loading} type="submit" className="auth-submit">{loading ? 'Creating...' : 'Create Account'}</button>

//               <div className="auth-divider"><span />OR REGISTER WITH<span /></div>

//               <div className="social-auth-row">
//                 <button className="social-auth-button" type="button">Google</button>
//                 <button className="social-auth-button" type="button">Apple</button>
//               </div>

//               <div className="auth-footer">
//                 <p>Already have an account? <Link className="inline-link strong" to="/login">Login here</Link></p>
//                 <div className="footer-links-mini"><a href="#">Privacy Policy</a><a href="#">Terms</a><a href="#">Help Center</a></div>
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

// export default function Register() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch('http://localhost:5000/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         navigate('/onboarding', { state: { userId: data.userId, fullName: data.fullName } });
//       } else {
//         setError(data.message || 'Registration failed');
//       }
//     } catch (err) {
//       setError('Connection refused by authentication server');
//     }
//   };

//   return (
//     <div className="split-screen">
//       <div className="visual-panel" style={{ backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.15)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000')" }}>
//         <div className="panel-content">
//           <h2 className="panel-logo">HiddenPaths</h2>
//           <p className="panel-quote">"The true journey of discovery consists not in seeking new landscapes, but in having new eyes."</p>
//           <div className="panel-divider"></div>
//           <span className="panel-subtext">Handcrafted in the Himalayas</span>
//         </div>
//       </div>

//       <div className="form-panel">
//         <div className="form-wrapper">
//           <div className="form-header">
//             <h1>Create account</h1>
//             <p className="form-subtitle">Start your journey into the unseen Nepal.</p>
//           </div>

//           {error && <div className="error-banner">{error}</div>}

//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label>Full Name</label>
//               <input type="text" required placeholder="Tenzing Norgay" onChange={e => setFormData({...formData, fullName: e.target.value})} />
//             </div>
//             <div className="form-group">
//               <label>Email Address</label>
//               <input type="email" required placeholder="traveler@hiddenpaths.com" onChange={e => setFormData({...formData, email: e.target.value})} />
//             </div>
//             <div className="form-group">
//               <label>Password</label>
//               <input type="password" required placeholder="••••••••" onChange={e => setFormData({...formData, password: e.target.value})} />
//               <span className="input-help">Minimum 8 characters with one special symbol.</span>
//             </div>
//             <button type="submit" className="btn-submit">Create Account</button>
//           </form>

//           <div className="or-divider">Or register with</div>

//           <div className="oauth-row">
//             <button className="btn-oauth">Google</button>
//             <button className="btn-oauth">Apple</button>
//           </div>

//           <p className="form-footer">
//             Already have an account? <span onClick={() => navigate('/login')}>Login here</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        navigate('/onboarding', { state: { userId: data.userId, fullName: data.fullName } });
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Connection refused by authentication server');
    }
  };

  return (
    <div className="split-screen">
      <div className="visual-panel" style={{ backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.15)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000')" }}>
        <div className="panel-content">
          <h2 className="panel-logo">HiddenPaths</h2>
          <p className="panel-quote">"The true journey of discovery consists not in seeking new landscapes, but in having new eyes."</p>
          <div className="panel-divider"></div>
          <span className="panel-subtext">Handcrafted in the Himalayas</span>
        </div>
      </div>

      <div className="form-panel">
        <div className="form-wrapper">
          <div className="form-header">
            <h1>Create account</h1>
            <p className="form-subtitle">Start your journey into the unseen Nepal.</p>
          </div>

          {error && <div className="error-banner">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" required placeholder="Tenzing Norgay" onChange={e => setFormData({...formData, fullName: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" required placeholder="traveler@hiddenpaths.com" onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" required placeholder="••••••••" onChange={e => setFormData({...formData, password: e.target.value})} />
              <span className="input-help">Minimum 8 characters with one special symbol.</span>
            </div>
            <button type="submit" className="btn-submit">Create Account</button>
          </form>

          <div className="or-divider">Or register with</div>

          <div className="oauth-row">
            <button className="btn-oauth">Google</button>
            <button className="btn-oauth">Apple</button>
          </div>

          <p className="form-footer">
            Already have an account? <span onClick={() => navigate('/login')}>Login here</span>
          </p>
        </div>
      </div>
    </div>
  );
}