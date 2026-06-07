# HiddenPaths Backend

Run the backend locally:

1. Create a `.env` file in the `backend` folder with:

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/hiddenpaths?retryWrites=true&w=majority
PORT=5050
```

2. Install dependencies and start:

```bash
cd backend
npm install
npm run dev
```

3. API endpoints:
- `POST /api/auth/register` — body: `{ fullName, email, password }` → returns `{ userId, fullName }` (201)
- `PATCH /api/user/onboarding` — body: `{ userId, intent }` → saves `onboardingIntent`

Make sure `MONGODB_URI` is valid. The server connects to MongoDB on startup; if the DB is unreachable the process will exit with an error.