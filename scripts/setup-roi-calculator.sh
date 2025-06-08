#!/bin/bash

echo "🚀 Setting up vCFO of One ROI Calculator..."

# Navigate to frontend directory
cd frontend

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

echo "✅ Setup complete!"
echo ""
echo "To run the ROI Calculator:"
echo "  1. cd frontend"
echo "  2. npm run dev"
echo "  3. Open http://localhost:3000/roi-calculator"
echo ""
echo "To view the homepage:"
echo "  Open http://localhost:3000"