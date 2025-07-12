#!/bin/bash

# Course Registration Platform - Quick Deployment Script
# This script helps prepare your project for Vercel deployment

echo "🚀 Course Registration Platform - Deployment Preparation"
echo "=================================================="

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    echo "   The directory should contain 'backend' and 'frontend' folders"
    exit 1
fi

echo "✅ Project structure looks good!"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "🔧 Initializing git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Create .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    echo "📝 Creating .gitignore file..."
    cat > .gitignore << EOF
# Dependencies
node_modules/
*/node_modules/

# Environment variables
.env
.env.local
.env.production
.env.development

# Build outputs
.next/
dist/
build/

# Logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# macOS
.DS_Store

# IDE
.vscode/
.idea/
*.swp
*.swo

# Vercel
.vercel
EOF
    echo "✅ .gitignore created"
fi

echo ""
echo "📋 Next Steps for Vercel Deployment:"
echo "===================================="
echo ""
echo "1. 🗃️  Set up MongoDB Atlas:"
echo "   - Go to https://www.mongodb.com/atlas"
echo "   - Create a free cluster"
echo "   - Create database user and get connection string"
echo ""
echo "2. 📁 Push to GitHub:"
echo "   - Create a new repository on GitHub"
echo "   - Run: git add ."
echo "   - Run: git commit -m 'Initial commit'"
echo "   - Run: git remote add origin YOUR_GITHUB_REPO_URL"
echo "   - Run: git push -u origin main"
echo ""
echo "3. 🚀 Deploy to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repository"
echo "   - Deploy backend folder first"
echo "   - Deploy frontend folder second"
echo ""
echo "4. ⚙️  Set Environment Variables in Vercel:"
echo "   Backend:"
echo "   - MONGODB_URI=your_mongodb_atlas_connection_string"
echo "   - JWT_SECRET=your_secure_jwt_secret"
echo "   - NODE_ENV=production"
echo ""
echo "   Frontend:"
echo "   - NEXT_PUBLIC_API_URL=https://your-backend.vercel.app/api"
echo ""
echo "5. 🌱 Seed the database:"
echo "   - After backend deployment, visit:"
echo "   - POST https://your-backend.vercel.app/api/admin/seed-courses"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "🎉 Good luck with your deployment!"
