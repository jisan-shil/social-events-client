# Seva Circle

**Live Site:** https://YOUR-CLIENT.vercel.app

A community platform where people create, join and track social service events such as winter clothes distribution, blanket drives, plantation days and clean-ups.

## Features
- Email/password and GitHub authentication with BetterAuth and JWT-protected APIs
- Create, update and delete your own events with date and field validation (no past dates)
- Upcoming Events page with search and event-type filter, showing only future events
- One-click Join Event with duplicate-join protection and live participant count
- Joined Events page sorted by event date
- Light/dark theme toggle that persists across reloads
- Profile page to update display name and photo
- Loading skeletons, toast notifications and fully responsive layout

## Tech Stack
Next.js (App Router), DaisyUI, BetterAuth, Express, MongoDB

## Run Locally
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in the values
3. `npm run dev`
