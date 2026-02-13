# Aikido Coding Assignment

##  Quick Overview

A web application that connects to **Aikido** to display security vulnerabilities in your code repositories and show automatically fix PHP backtick RCE issues using **OpenAI**.

##  What It Does

1. **Lists your repositories** connected to Aikido
2. **Shows all security issues** (SAST, Secrets, IaC, Dependencies) grouped by severity
3. **Auto-fixes PHP backticks** - Click "Suggest Fix" and get an instant correction via AI

## Tech Stack

**Frontend:** Vue.js 3 | **Backend:** Node.js + Express | **APIs:** Aikido + OpenAI

## Quick Start

### Backend
```bash
cd backend
npm install
# Set .env variables: PORT, AIKIDO_CLIENT_ID, AIKIDO_CLIENT_SECRET, OPENAI_API_KEY
node server.js
```

### Frontend
```bash
cd frontend
npm install
# Set .env: VITE_API_BASE_URL=http://localhost:3000
npm run dev
```

## API Routes

```
GET  /api/repos              → List repositories
GET  /api/repos/:id/issues   → Get issues for repo
POST /api/fix/backticks      → Generate fix for PHP backticks
```
