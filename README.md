# ChatMeow

ChatMeow is a React-based social and messaging web application. The current frontend includes account login, a home/feed view, user profiles, profile editing, messaging, and a games section.

The backend is maintained separately in [ChatMeow-API](https://github.com/masterweb801/ChatMeow-API).

## Technology

- React 18
- React Router 6
- Create React App (react-scripts)
- React Icons
- Browser-based token storage for the signed-in session

## Application routes

| Route | Purpose |
|---|---|
| / | Home/feed |
| /login | Sign in |
| /user | User profile |
| /edit-profile | Profile settings |
| /messages | Messaging |
| /games | Games |
| /logout | Sign out |

## Run locally

### Requirements

- Node.js and npm
- A running ChatMeow API instance
- The API URL configured in the frontend source as required by the current deployment

### Install dependencies

    npm install

### Start the development server

    npm start

The development app opens at http://localhost:3000.

### Create a production build

    npm run build

The optimized production output is generated in the build/ directory.

## Related repository

- [ChatMeow-API](https://github.com/masterweb801/ChatMeow-API) — Express and MongoDB backend

## Project notes

This repository contains the frontend only. API availability and database configuration are handled by the backend project. Do not commit credentials, access tokens, or private deployment configuration.

---

Built by [Mobashshirul Karim](https://github.com/masterweb801).
