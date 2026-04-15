# RoofHero Backend

This backend provides the API endpoints expected by the RoofHero frontend.

## Available endpoints

- `POST /api/auth/login` — login with `usernameOrEmail` and `password`
- `POST /api/contractors/apply` — contractor onboarding form with file upload support
- `POST /api/homeowner/quote` — quote request and homeowner credential generation
- `GET /api/admin/users` — list approved users (admin + approved contractors)
- `GET /api/admin/contractor-applications` — list contractor applications
- `PATCH /api/admin/contractor-applications/:id/status` — approve or reject contractor applications
- `GET /api/admin/quote-requests` — list quote requests
- `GET /api/admin/homeowners` — list homeowner records

## Setup

1. Open a terminal in `backend`
2. Run `npm install`
3. Copy `.env.example` to `.env` and update `MONGO_URI` if needed
4. Run `npm run dev` for local development

## Notes

- The backend now stores data in MongoDB via Mongoose.
- Collections include `users`, `contractorapplications`, `homeowners`, and `quoterequests`.
- Uploaded files are accepted by `multer` and file names are saved to application records.
- The frontend is configured to proxy `/api` to `http://localhost:3000` via `rh-frontend-react/vite.config.js`.
