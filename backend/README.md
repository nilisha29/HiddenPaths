# HiddenPaths — Backend

Node.js + Express + MongoDB (Mongoose) REST API, written as **ES Modules**.
JWT-based auth with three roles: `user`, `guide`, `admin` — one shared
login/register flow, role comes back from the database.

## Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`: set `MONGO_URI` (local MongoDB or Atlas) and `JWT_SECRET`.
eSewa's sandbox key is universal and already filled in — no signup needed.
Khalti and Stripe (Card) have no universal public test key, so you'll need
a free sandbox account for each (see "Card (Stripe) setup" and "Khalti
setup" below) before those two payment methods will work.

```bash
npm run seed      # sample users/guides/experiences/bookings/payments/reviews/journals
npm run server    # http://localhost:5000 (nodemon)
```

## Seeded accounts (after `npm run seed`)

| Role  | Email                | Password    | Notes                                  |
|-------|-----------------------|-------------|------------------------------------------|
| Admin | admin@hiddenpaths.com | admin123    |                                           |
| User  | sita@example.com      | password123 | interests: Artisan, Culinary             |
| User  | ramesh@example.com    | password123 | interests: Trekking, Wellness            |
| Guide | pemba@example.com     | password123 | approved, has published experiences      |
| Guide | anita@example.com     | password123 | approved, has published experiences      |
| Guide | bikash@example.com    | password123 | pending admin approval                   |

## Folder structure

```
backend/
  config/db.js              MongoDB connection
  models/                    User, Guide, Experience, Booking, Payment,
                              Review, Category, Journal, Notification,
                              Settings, ContactMessage
  middleware/                JWT auth, role guard, multer upload,
                              express-validator wrapper, error handler
  controllers/                Route handler logic, grouped by resource
  routes/                     Express routers, grouped by resource
  services/                   Business logic shared across controllers:
                               notificationService, stripeService (real Card
                               checkout sandbox), esewaService (real v2
                               sandbox), khaltiService (real ePayment API v2
                               sandbox), bookingService (totals/seat checks)
  utils/                       generateToken.js, validators.js (express-validator chains)
  seed/seed.js                 Sample data importer (npm run seed / seed:destroy)
  uploads/                      Local image storage (multer), served at /uploads
  server.js                    App entry point
```

Note: the guide's public/editable profile is modeled as `Guide` (one-to-one
with a `User` whose `role` is `"guide"`) — kept as a separate collection from
`User` so profile fields (bio, languages, certifications...) don't bloat the
auth model, while still using a clean singular name per role.

## Role permissions

- **User** — register/login, onboarding interests, browse/filter/sort
  experiences, view experience & guide details, book, pay (real Stripe/
  eSewa/Khalti sandboxes), view booking history, cancel eligible bookings,
  review completed experiences, edit own profile.
- **Guide** — own dashboard only: create/edit/delete (or deactivate) their
  own experiences, view bookings + traveler details on their experiences,
  update their own profile, view & reply to reviews on their experiences,
  basic stats (experiences, bookings, rating, earnings). Cannot touch other
  guides' content, users, categories, or platform settings.
- **Admin** — full platform control: users (create/view/edit/block/delete),
  guides (create/view/edit/approve/reject/delete), experiences (create on
  behalf of any guide/edit/approve/remove/delete/feature), bookings
  (edit/delete), payments (view/refund/delete), categories (CRUD), reviews
  (moderate/remove), journal posts (CRUD), contact-form inbox, dashboard
  stats, platform settings.

## Key workflows implemented

- **Unified auth**: `POST /api/auth/register` handles both traveler and guide
  sign-up (branches on `isGuide` flag), optional `profileImage` upload.
  `POST /api/auth/login` shared across all 3 roles.
- **Onboarding interests**: `PUT /api/auth/interests`, called once from the
  Welcome screen before the user logs in for the first time.
- **Home aggregation**: `GET /api/users/home-summary` — next booking, simple
  impact stats, 3 interest-based recommendations, and a Journal preview, in
  one call.
- **Guide approval gate** & **experience approval gate** — see role permissions above.
- **Real eSewa sandbox (v2)**: `POST /api/payments/esewa/initiate` builds a
  signed form-redirect to eSewa's `rc-epay` test environment;
  `POST /api/payments/esewa/verify` decodes + verifies the signature on the
  callback payload and double-checks against eSewa's own status API before
  marking the booking paid.
- **Real Khalti sandbox (ePayment API v2)**: `POST /api/payments/khalti/initiate`
  calls Khalti's sandbox domain (`dev.khalti.com`, requires your own free
  test key — see "Khalti setup" below) to get a hosted `payment_url`;
  `POST /api/payments/khalti/verify` looks up the final status via Khalti's
  API before marking the booking paid.
- **Real Card sandbox (Stripe Checkout)**: `POST /api/payments/card/initiate`
  creates a Stripe Checkout Session (requires your own free test key — see
  "Card (Stripe) setup" below) and returns a hosted checkout `url`;
  `POST /api/payments/card/verify` retrieves the session server-side to
  confirm `payment_status === "paid"` before marking the booking paid.
- **Reviews**: one per user per experience, requires a confirmed/completed
  booking; guide can reply; ratings recalculate automatically; admin can
  remove any review.
- **Notifications**: raised via `services/notificationService.js` on booking
  events, guide/experience approval, and new reviews.
- **Contact form**: `POST /api/contact` is public and stores the message for
  the admin's Messages inbox.

## API overview

All routes are prefixed with `/api`.

- **Auth**: `POST /auth/register`, `POST /auth/login`, `GET /auth/me`, `PUT /auth/interests`
- **Experiences**: `GET /experiences` (filters: category, location, minPrice, maxPrice, minRating, duration, search, sort, page, limit), `GET /experiences/:id`, `POST/PUT/DELETE /experiences` (guide), `GET /experiences/me/all`
- **Guides**: `GET /guides/:id` (public), `GET/PUT /guides/me/profile`, `GET /guides/me/bookings`, `PUT /guides/me/bookings/:id`, `GET /guides/me/earnings`, `GET /guides/me/reviews`
- **Users**: `GET /users/home-summary`, `PUT /users/profile`, `GET /users/bookings`, `GET/POST/DELETE /users/wishlist`
- **Bookings**: `POST /bookings`, `GET /bookings/:id`, `PUT /bookings/:id/cancel`
- **Payments**: `GET /payments/:id`, `POST /payments/card/initiate`, `POST /payments/card/verify`, `POST /payments/esewa/initiate`, `POST /payments/esewa/verify`, `POST /payments/khalti/initiate`, `POST /payments/khalti/verify`
- **Reviews**: `GET /reviews/experience/:id`, `POST /reviews`, `PUT /reviews/:id/reply` (guide), `DELETE /reviews/:id`
- **Categories**: `GET /categories`, `POST/PUT/DELETE /categories` (admin)
- **Journals**: `GET /journals`, `GET /journals/:id`, `POST/PUT/DELETE /journals` (admin)
- **Notifications**: `GET /notifications`, `PUT /notifications/:id/read`, `PUT /notifications/read-all`
- **Contact**: `POST /contact` (public)
- **Admin**: `/admin/stats`; `/admin/users` (+`/:id`, `/:id/block`); `/admin/guides` (+`/:id`, `/:id/status`, `/:id/profile`); `/admin/experiences` (+`/:id`, `/:id/approve`, `/:id/remove`, `/:id/feature`); `/admin/bookings/:id`; `/admin/payments/:id`; `/admin/reviews/:id`; `/admin/settings`; `/admin/messages` (+`/:id/read`)
- **Upload**: `POST /upload` — standalone image upload, returns `{ url }`

## Card setup (Stripe — required, no universal test key exists)

Like Khalti, Stripe doesn't publish a shared test key, so you need your own
free account:

1. Go to **https://dashboard.stripe.com/register** and sign up (free — test
   mode needs no business verification, you can use it immediately).
2. In the dashboard: **https://dashboard.stripe.com/test/apikeys** — copy the
   **Secret key** (starts with `sk_test_...`). Make sure you're viewing test
   mode (Stripe's dashboard has a "Test mode" toggle, usually top-right).
3. Paste it into `backend/.env` as `STRIPE_SECRET_KEY`.
4. Restart `npm run server`.

To complete a test payment on Stripe's hosted checkout, use their universal
test card:
- Card number: `4242 4242 4242 4242`
- Expiry: any future date (e.g. `12/34`)
- CVC: any 3 digits (e.g. `123`)
- ZIP: any 5 digits (e.g. `10001`)

Note: Stripe doesn't settle in NPR, so the Checkout line item is shown in
USD using a rough conversion (`STRIPE_NPR_TO_USD_RATE`, default 133) purely
so the sandbox checkout has a sensible amount to charge — the booking's
actual price stays in NPR everywhere else in the app; Stripe here is only
the payment rail, not the source of truth for the amount.

## Khalti setup (required — no universal test key exists)

Unlike eSewa, Khalti doesn't publish a shared test key, so you need your own
free sandbox account:

1. Go to **https://test-admin.khalti.com** and sign up as a merchant
   (sandbox login OTP is always `987654`).
2. In the dashboard: **Settings → Keys**. Copy the **"Live secret key"**
   shown there — despite the label, this *is* the correct sandbox key on
   this portal (confirmed in Khalti's own docs: keys from
   `test-admin.khalti.com` are sandbox, keys from `admin.khalti.com` are
   real production, regardless of the "live"/"test" wording next to them).
3. Paste it into `backend/.env` as `KHALTI_SECRET_KEY`.
4. Leave `KHALTI_BASE_URL=https://dev.khalti.com/api/v2` as-is — sandbox and
   production are separate **domains** for Khalti, not just different keys.
5. Restart `npm run server`.

To actually complete a test payment on Khalti's hosted checkout, use their
published sandbox test credentials:
- Khalti ID (phone): `9800000000` (through `...0005` also work)
- MPIN: `1111`
- OTP: `987654`

## Scope decisions

- **Image storage**: local disk via Multer, served from `/uploads`. Swapping
  in Cloudinary later only touches `middleware/uploadMiddleware.js`.
- **bcryptjs** instead of `bcrypt` — identical API, pure JS, no native build step.
- **eSewa test credentials**: the defaults in `.env.example` are eSewa's own
  publicly-documented universal sandbox credentials — no signup needed.
  **Khalti and Stripe have no equivalent universal key** — see their setup
  sections above.
- **Lazy env-var loading**: `esewaService.js`, `khaltiService.js`, and
  `stripeService.js` all deliberately read `process.env.*` *inside* their
  functions rather than as top-level constants. Because `server.js` imports
  routes → controllers → these services before it calls `dotenv.config()`
  (ES module imports are hoisted ahead of any top-level code in the
  importing file), a top-level read would always see `undefined` and
  silently lock in a broken value regardless of what's in `.env` — this bit
  the Khalti integration specifically until it was traced down and fixed
  the same way across all three payment services.
