# MediBook — Frontend

React + Vite client for the MediBook healthcare platform. Patients can find doctors, book appointments, order lab tests, and consult via video.

---

## Tech Stack

| Tool              | Purpose                                      |
|-------------------|----------------------------------------------|
| React 18          | UI library                                   |
| Vite              | Build tool and dev server                    |
| Tailwind CSS      | Utility-first styling                        |
| Redux Toolkit     | Global state management                      |
| RTK Query         | Server state, data fetching and caching      |
| React Router v6   | Client-side routing                          |
| Axios             | HTTP client with interceptors                |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- Backend API running (see `../backend/README.md`)

### Install dependencies

```bash
npm install
```

### Environment setup

Create a `.env` file in this directory:

```bash
cp .env.example .env
```

Open `.env` and set:

```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_APP_NAME=MediBook
```

> All variables must be prefixed with `VITE_` to be exposed to the browser by Vite.

### Run the dev server

```bash
npm run dev
```

App is available at `http://localhost:5173`.

---

## Available Scripts

| Command             | Description                                      |
|---------------------|--------------------------------------------------|
| `npm run dev`       | Start Vite dev server with hot module reload     |
| `npm run build`     | Production build — output goes to `dist/`        |
| `npm run preview`   | Serve the production build locally               |

---

## Project Structure

```
src/
├── api/                    # Axios API call functions, one file per domain
│   ├── auth/index.jsx      # login, signup, logout, verifyOTP, resendOTP
│   ├── doctor/index.jsx    # getAllDoctors, getDoctorById, createDoctor …
│   ├── appointment/index.jsx
│   ├── patient/index.jsx
│   ├── core.js             # Axios instance, token helpers, interceptors
│   └── index.js            # Barrel — re-exports all API functions
│
├── assets/                 # Static assets
│   ├── images/
│   │   ├── illustrations/  # Hero slider and page images
│   │   ├── icons/          # Icon assets
│   │   └── logos/          # Brand logos
│   ├── fonts/
│   └── styles/
│
├── components/
│   └── common/             # Reusable design-system components
│       ├── button/         # Button — variant, size, loading state
│       ├── input/          # Input — label, error, icons, password toggle
│       ├── textarea/       # Textarea — maxLength, character count
│       ├── select/         # Select — options, groups, placeholder
│       ├── toggle/         # Toggle switch
│       ├── checkbox/       # Checkbox with indeterminate support
│       ├── radio/          # RadioGroup
│       ├── fileupload/     # Drag-and-drop file upload
│       └── index.js        # Barrel
│
├── config/
│   └── index.js            # Reads VITE_* env vars — API_URL, APP_NAME, etc.
│
├── constant/
│   └── apiEndpoints.js     # AUTH, DOCTOR, APPOINTMENT, PATIENT endpoint maps
│
├── features/
│   └── authentication/     # Auth feature: components, hooks, services
│
├── hooks/                  # Global custom hooks (useFetch, useLocalStorage …)
│
├── layouts/
│   ├── header/             # Sticky responsive header with mobile menu
│   └── footer/             # Full-site footer with links, contact, social
│
├── pages/                  # Route-level page components
│   ├── home/               # Public home page
│   │   └── components/
│   │       ├── HeroSlider/     # Auto-advancing image slider
│   │       ├── InfoTicker/     # Scrolling stats marquee
│   │       ├── Departments/    # Medical specializations grid
│   │       ├── LabTests/       # Lab test cards
│   │       ├── WhyChooseUs/    # USP cards
│   │       ├── Testimonials/   # Patient reviews with pagination
│   │       └── CTABanner/      # Call-to-action section
│   ├── auth/
│   │   ├── login/
│   │   ├── signup/
│   │   └── verify-otp/
│   └── dashboard/
│
├── routes/                 # Route definitions, PrivateRoute, PublicRoute
│
├── store/
│   ├── rtkQuery/
│   │   ├── mutations/      # RTK Query mutation hooks
│   │   └── queries/        # RTK Query query hooks
│   ├── services/           # RTK Query API service definitions
│   └── slice/              # Redux slices (auth, UI, etc.)
│
└── utils/
    ├── formating/          # Date, number, string formatters
    └── validation/         # Form validation helpers
```

---

## Conventions

- **File extension** — `.jsx` only (no `.tsx`)
- **Barrel files** — every folder that exports has an `index.js`; always import from the barrel, never from deep paths
- **API calls** — always import from `../api` (the root barrel)
- **Components** — always import from `../components/common` (the barrel)
- **New API domain** — create `api/<domain>/index.jsx`, add export to `api/index.js`, add constants to `constant/apiEndpoints.js`
- **New page** — create `pages/<PageName>/` with `assets/`, `components/`, `subpages/` as needed, then add a route in `routes/`

---

## Environment Variables

| Variable         | Required | Description                               |
|------------------|----------|-------------------------------------------|
| `VITE_API_URL`   | Yes      | Full base URL of the backend API          |
| `VITE_APP_NAME`  | No       | App display name (default: `MediBook`)    |
| `VITE_IS_DEV`    | No       | Enables dev-only logging when `true`      |

> Vite only exposes variables prefixed with `VITE_` to the browser bundle. Never put secrets in frontend env vars — they are visible to anyone who inspects the JS bundle.
