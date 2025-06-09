#!/bin/bash

echo "🚀 Starting vCFO of One Development Environment"
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in project root directory"
    echo "Please run this script from the vcofone directory"
    exit 1
fi

# Check if node_modules exists in frontend
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install
    cd ..
fi

# Check if .env.local exists
if [ ! -f "frontend/.env.local" ]; then
    echo "⚠️  Warning: .env.local not found"
    echo "Creating .env.local from example..."
    cp frontend/.env.local.example frontend/.env.local
    echo "✅ Created frontend/.env.local - Please update with your values"
fi

# Start the frontend
echo ""
echo "🎨 Starting Frontend (Next.js)..."
echo "================================"
cd frontend && npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Development environment started!"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "📊 Dashboard Preview: http://localhost:3000/dashboard"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for interrupt
trap 'kill $FRONTEND_PID; exit' INT
wait