# HiddenPaths

HiddenPaths is a full-stack travel experience booking platform that connects travellers with verified local guides across Nepal. The platform supports three user roles—**User**, **Guide**, and **Admin**—through a single authentication system, with each role having its own dashboard and permissions.

---

## Tech Stack

### Backend
- Node.js
- Express.js (ES Modules)
- MongoDB & Mongoose
- JWT Authentication
- Express Validator
- Multer (Image Uploads)
- Stripe Checkout (Sandbox)
- eSewa v2
- Khalti ePayment API v2

### Frontend
- React (JavaScript)
- React Router DOM
- Axios
- Plain CSS (No Tailwind or Bootstrap)
- Leaflet & OpenStreetMap
- jsPDF

---

# Project Structure

```
HiddenPaths/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
└── frontend/
    └── src/
        ├── assets/
        ├── components/
        ├── context/
        ├── hooks/
        ├── pages/
        ├── services/
        ├── styles/
        └── utils/
```

---

# Installation

## Backend

```bash
cd backend
npm install
cp .env.example .env
```

Update the `.env` file with your own configuration.

Start the backend:

```bash
npm run server
```

Backend runs on:

```
http://localhost:5000
```

---

## Frontend

```bash
cd frontend
npm install
cp .env.example .env
```

Start the development server:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# Features

## User

- Register and login
- Personalised onboarding
- Browse experiences
- Search, filter and sort experiences
- View guide profiles
- Book experiences
- Pay using Stripe, eSewa or Khalti
- Download PDF booking receipt
- Wishlist management
- View booking history
- Cancel eligible bookings
- Leave reviews
- Manage personal profile

---

## Guide

- Guide dashboard
- Create experiences
- Edit experiences
- Delete own experiences
- View bookings
- View traveller details
- Update profile
- View and reply to reviews
- Dashboard statistics

---

## Admin

- Dashboard analytics
- Manage users
- Manage guides
- Approve guide accounts
- Manage experiences
- Manage bookings
- Manage payments
- Manage categories
- Moderate reviews
- Manage journal posts
- View contact messages
- Platform settings

---

# User Flow

1. Landing Page
2. Register
3. Welcome / Interest Selection
4. Login
5. Home Dashboard
6. Explore Experiences
7. Experience Details
8. Guide Profile
9. Booking
10. Payment
11. Booking Confirmation
12. My Bookings
13. Review Experience

---

# Frontend Structure

```
frontend/src/

pages/

    public/
        Landing
        Explore
        ExperienceDetail
        GuideProfile
        Journal
        JournalDetail
        About
        Contact
        SignIn
        SignUp
        Welcome

    user/
        Home
        Booking
        Payment
        CardCallback
        EsewaCallback
        KhaltiCallback
        Confirmation
        MyBookings
        Wishlist
        Account

    guide/
        GuideDashboard
        GuideExperiences
        GuideExperienceForm
        GuideBookings
        GuideReviews
        GuideProfileEdit

    admin/
        AdminDashboard
        AdminUsers
        AdminGuides
        AdminExperiences
        AdminExperienceForm
        AdminBookings
        AdminPayments
        AdminCategories
        AdminReviews
        AdminJournals
        AdminMessages
        AdminSettings

components/

    common/
        Navbar
        Footer
        Layout
        ExperienceCard
        StarRating
        ProtectedRoute
        DashboardLayout
        Pagination
        ImageUploader
        MapView
        ToastContainer

    user/
        BookingSteps

    guide/
        GuideNav

    admin/
        AdminNav

services/

    api.js
    Authentication services
    Experience services
    Booking services
    Payment services
    Review services

context/

    AuthContext
    ToastContext

hooks/

    usePagination
    useClickOutside

utils/

    imageUrl
    format
    constants
    generateBookingPdf

styles/

    variables.css
    global.css
    page-specific styles

assets/

    images/
    icons/
    logo/
```

---

# Role-Based Access

### User

- Browse and book experiences
- Manage bookings
- Leave reviews
- Update profile

### Guide

- Manage own experiences
- View bookings
- Reply to reviews
- Update guide profile

### Admin

- Full platform management
- Users
- Guides
- Experiences
- Categories
- Reviews
- Bookings
- Payments
- Journals
- Contact messages
- Platform settings

---

# Integrations

### Interactive Maps

- Leaflet
- OpenStreetMap
- Click-to-select meeting location

### Payment Gateways

- Stripe Checkout (Sandbox)
- eSewa v2
- Khalti ePayment API v2

### PDF

- jsPDF for downloadable booking receipts

### Notifications

- Custom toast notification system for user feedback

---

# Image Uploads

Images are stored locally using **Multer**. The storage solution can later be replaced with cloud storage such as Cloudinary without affecting other parts of the application.

---
