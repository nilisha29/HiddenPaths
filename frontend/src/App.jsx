// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import LandingPage from './components/private/LandingPage.jsx'
// import Register from './pages/Register'
// import Onboarding from './pages/Onboarding'
// import Login from './pages/Login'
// import Home from './pages/Home'

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/onboarding" element={<Onboarding />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/home" element={<Home />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Landing';
// import Register from './pages/Register';
// import Login from './pages/Login';
// import Onboarding from './pages/Onboarding';
// import './styles/index.css';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/onboarding" element={<Onboarding />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LandingPage from './pages/LandingPage';
// import Register from './pages/Register';
// import Login from './pages/Login';
// import Onboarding from './pages/Onboarding';
// import './styles/index.css';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/onboarding" element={<Onboarding />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LandingPage from './pages/LandingPage';
// import Home from './pages/Home';
// import Explore from './pages/Explore';
// import Register from './pages/Register';
// import Login from './pages/Login';
// import Onboarding from './pages/Onboarding';
// import './styles/index.css';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/explore" element={<Explore />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/onboarding" element={<Onboarding />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Explore from './pages/Explore';
import ReviewPage from './pages/ReviewPage'; // Import the new review page
import ExperienceDetail from './pages/ExperienceDetail'; // Import the new details & review page
import guideProfile from './pages/GuideProfile'; // Import the new details & review page
import './styles/index.css';
import GuideProfile from './pages/GuideProfile';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';
// import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect to login */}
        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}

           <Route path="/" element={<Navigate to="/landing" replace />} />

              <Route path="/landing" element={<LandingPage />} />
        
        {/* Auth Channels */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

                <Route path="/onboarding" element={<Onboarding />} />
        
        {/* Main Dashboard Hubs */}
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        
        {/* Experience Details & Review Section Route */}
        <Route path="/explore/detail" element={<ExperienceDetail />} />
        
        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/home" replace />} />

        {/* <Route path="/explore/detail" element={<ExperienceDetail />} /> */}
<Route path="/review" element={<ReviewPage />} />
<Route path="/guideprofile" element={<GuideProfile />} />
<Route path="/booking" element={<BookingPage />} />
<Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;