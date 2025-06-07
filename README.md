# vCFO of One

> Virtual CFO for solo businesses

## 🎯 Project Overview

vCFO of One is a landing page and conversion funnel designed for Small business owners without a full-time CFO.

### Value Proposition
AI-driven virtual CFO providing financial insight and oversight on demand

### Target Audience
Small business owners without a full-time CFO

### Key Pain Points
- Making money or just managing money?
- Hours in Excel with no clarity
- Unpredictable cashflow
- Unclear KPIs and metrics

### Hero Message
"Get Crystal-Clear Financial Visibility Without a Full-Time CFO"

### Primary CTA
"Get Your Free Financial Clarity Session"

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
```bash
git clone <repository-url>
cd vcofone
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..

# Install backend dependencies
cd backend
npm install
cd ..
```

3. **Run the development servers**

```bash
# Run both frontend and backend
npm run dev:all

# Or run them separately:
# Frontend only (http://localhost:3000)
npm run dev:frontend

# Backend only (http://localhost:3001)
npm run dev:backend
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api

## 🎨 Design

- **Primary Color**: #4169E1 (Utlyze Blue)
- **Accent Color**: #00A878
- **Style**: Clean, minimalist, professional

## 📊 Key Features

- Real-time financial insights
- Cash flow forecasting
- Custom KPI tracking
- ROI analysis on all initiatives

## 🏗️ Architecture

### Frontend (Next.js 14)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **Components**: Reusable UI component library
- **Location**: `/frontend`

### Backend (Express.js)
- **Framework**: Express.js
- **Language**: TypeScript
- **API**: RESTful API with CORS support
- **Security**: Helmet, rate limiting
- **Location**: `/backend`

### Key Directories
```
vcofone/
├── frontend/               # Next.js frontend application
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # UI components
│   │   └── styles/        # Design system
│   └── public/            # Static assets
├── backend/               # Express.js API
│   └── src/
│       └── api/           # API routes and server
├── content/               # Content markdown files
│   └── copy/
├── scripts/               # Build and utility scripts
└── docs/                  # Documentation
```

## 🛠️ Development

### Available Scripts

- `npm run orchestrate` - Run the agent orchestrator to see task status
- `npm run dev:all` - Run both frontend and backend
- `npm run dev:frontend` - Run frontend only
- `npm run dev:backend` - Run backend only
- `npm run build:all` - Build both frontend and backend
- `npm run test` - Run tests
- `npm run lint` - Run linting

### API Endpoints

- `GET /api` - API information
- `GET /health` - Health check
- `POST /api/leads` - Lead capture
- `POST /api/consultation` - Book consultation
- `POST /api/contact` - Contact form submission

## 📦 Deployment

### Frontend (Vercel)
The frontend is optimized for deployment on Vercel. Simply connect your GitHub repository to Vercel and it will automatically deploy.

### Backend (Vercel Functions)
The backend is configured to work with Vercel Functions. The API will be available at your Vercel deployment URL.

### Environment Variables
Create a `.env` file in both frontend and backend directories:

```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Backend (.env)
NODE_ENV=development
PORT=3001
```

## 🔒 Security

- CORS configured for production domains
- Rate limiting on API endpoints
- Helmet.js for security headers
- Input validation on all forms

---

Part of the Utlyze "Of One" suite - empowering solo professionals everywhere.
