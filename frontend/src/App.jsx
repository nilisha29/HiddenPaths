import React from "react";
import { Routes, Route } from "react-router-dom";

// Public pages
import Landing from "./pages/public/Landing";
import Explore from "./pages/public/Explore";
import ExperienceDetail from "./pages/public/ExperienceDetail";
import GuideProfile from "./pages/public/GuideProfile";
import Journal from "./pages/public/Journal";
import JournalDetail from "./pages/public/JournalDetail";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import SignIn from "./pages/public/SignIn";
import SignUp from "./pages/public/SignUp";
import Welcome from "./pages/public/Welcome";

// User (traveler) pages
import Home from "./pages/user/Home";
import Booking from "./pages/user/Booking";
import Payment from "./pages/user/Payment";
import EsewaCallback from "./pages/user/EsewaCallback";
import KhaltiCallback from "./pages/user/KhaltiCallback";
import CardCallback from "./pages/user/CardCallback";
import Confirmation from "./pages/user/Confirmation";
import MyBookings from "./pages/user/MyBookings";
import Wishlist from "./pages/user/Wishlist";
import Account from "./pages/user/Account";

// Guide pages
import GuideDashboard from "./pages/guide/GuideDashboard";
import GuideExperiences from "./pages/guide/GuideExperiences";
import GuideExperienceForm from "./pages/guide/GuideExperienceForm";
import GuideBookings from "./pages/guide/GuideBookings";
import GuideReviews from "./pages/guide/GuideReviews";
import GuideProfileEdit from "./pages/guide/GuideProfileEdit";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminGuides from "./pages/admin/AdminGuides";
import AdminExperiences from "./pages/admin/AdminExperiences";
import AdminExperienceForm from "./pages/admin/AdminExperienceForm";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminJournals from "./pages/admin/AdminJournals";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminSettings from "./pages/admin/AdminSettings";

import ProtectedRoute from "./components/common/ProtectedRoute";
import ComingSoon from "./components/common/ComingSoon";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/explore/:id" element={<ExperienceDetail />} />
      <Route path="/guides/:id" element={<GuideProfile />} />
      <Route path="/journal" element={<Journal />} />
      <Route path="/journal/:id" element={<JournalDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Traveler (protected) */}
      <Route path="/home" element={<ProtectedRoute roles={["user"]}><Home /></ProtectedRoute>} />
      <Route path="/account" element={<ProtectedRoute roles={["user"]}><Account /></ProtectedRoute>} />
      <Route path="/bookings" element={<ProtectedRoute roles={["user"]}><MyBookings /></ProtectedRoute>} />
      <Route path="/wishlist" element={<ProtectedRoute roles={["user"]}><Wishlist /></ProtectedRoute>} />
      <Route path="/book/:experienceId" element={<ProtectedRoute roles={["user"]}><Booking /></ProtectedRoute>} />
      <Route path="/payment/:bookingId" element={<ProtectedRoute roles={["user"]}><Payment /></ProtectedRoute>} />
      <Route path="/payment/esewa/callback" element={<ProtectedRoute roles={["user"]}><EsewaCallback /></ProtectedRoute>} />
      <Route path="/payment/khalti/callback" element={<ProtectedRoute roles={["user"]}><KhaltiCallback /></ProtectedRoute>} />
      <Route path="/payment/card/callback" element={<ProtectedRoute roles={["user"]}><CardCallback /></ProtectedRoute>} />
      <Route path="/confirmation/:bookingId" element={<ProtectedRoute roles={["user"]}><Confirmation /></ProtectedRoute>} />

      {/* Guide (protected) */}
      <Route path="/guide/dashboard" element={<ProtectedRoute roles={["guide"]}><GuideDashboard /></ProtectedRoute>} />
      <Route path="/guide/experiences" element={<ProtectedRoute roles={["guide"]}><GuideExperiences /></ProtectedRoute>} />
      <Route path="/guide/experiences/new" element={<ProtectedRoute roles={["guide"]}><GuideExperienceForm /></ProtectedRoute>} />
      <Route path="/guide/experiences/:id/edit" element={<ProtectedRoute roles={["guide"]}><GuideExperienceForm /></ProtectedRoute>} />
      <Route path="/guide/bookings" element={<ProtectedRoute roles={["guide"]}><GuideBookings /></ProtectedRoute>} />
      <Route path="/guide/reviews" element={<ProtectedRoute roles={["guide"]}><GuideReviews /></ProtectedRoute>} />
      <Route path="/guide/profile" element={<ProtectedRoute roles={["guide"]}><GuideProfileEdit /></ProtectedRoute>} />

      {/* Admin (protected) */}
      <Route path="/admin" element={<ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute roles={["admin"]}><AdminUsers /></ProtectedRoute>} />
      <Route path="/admin/guides" element={<ProtectedRoute roles={["admin"]}><AdminGuides /></ProtectedRoute>} />
      <Route path="/admin/experiences" element={<ProtectedRoute roles={["admin"]}><AdminExperiences /></ProtectedRoute>} />
      <Route path="/admin/experiences/new" element={<ProtectedRoute roles={["admin"]}><AdminExperienceForm /></ProtectedRoute>} />
      <Route path="/admin/experiences/:id/edit" element={<ProtectedRoute roles={["admin"]}><AdminExperienceForm /></ProtectedRoute>} />
      <Route path="/admin/bookings" element={<ProtectedRoute roles={["admin"]}><AdminBookings /></ProtectedRoute>} />
      <Route path="/admin/payments" element={<ProtectedRoute roles={["admin"]}><AdminPayments /></ProtectedRoute>} />
      <Route path="/admin/categories" element={<ProtectedRoute roles={["admin"]}><AdminCategories /></ProtectedRoute>} />
      <Route path="/admin/reviews" element={<ProtectedRoute roles={["admin"]}><AdminReviews /></ProtectedRoute>} />
      <Route path="/admin/journals" element={<ProtectedRoute roles={["admin"]}><AdminJournals /></ProtectedRoute>} />
      <Route path="/admin/messages" element={<ProtectedRoute roles={["admin"]}><AdminMessages /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute roles={["admin"]}><AdminSettings /></ProtectedRoute>} />

      {/* 404 */}
      <Route path="*" element={<ComingSoon title="Page not found" />} />
    </Routes>
  );
}

export default App;
