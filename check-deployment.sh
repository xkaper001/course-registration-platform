#!/bin/bash

# Course Registration Platform - Pre-deployment Checklist
echo "🔍 Course Registration Platform - Pre-deployment Checklist"
echo "========================================================="

SUCCESS=0
WARNINGS=0

# Function to check if file exists
check_file() {
    if [ -f "$1" ]; then
        echo "✅ $1"
        return 0
    else
        echo "❌ $1 - MISSING"
        return 1
    fi
}

# Function to check if directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo "✅ $1/"
        return 0
    else
        echo "❌ $1/ - MISSING"
        return 1
    fi
}

echo ""
echo "📁 Checking project structure..."
check_dir "backend" || ((SUCCESS++))
check_dir "frontend" || ((SUCCESS++))
check_dir "backend/models" || ((SUCCESS++))
check_dir "backend/routes" || ((SUCCESS++))
check_dir "frontend/src" || ((SUCCESS++))

echo ""
echo "📄 Checking essential files..."
check_file "backend/package.json" || ((SUCCESS++))
check_file "backend/index.js" || ((SUCCESS++))
check_file "backend/vercel.json" || ((SUCCESS++))
check_file "frontend/package.json" || ((SUCCESS++))
check_file "frontend/next.config.js" || ((SUCCESS++))
check_file "DEPLOYMENT.md" || ((SUCCESS++))
check_file "README.md" || ((SUCCESS++))

echo ""
echo "🔧 Checking backend files..."
check_file "backend/models/Student.js" || ((SUCCESS++))
check_file "backend/models/Course.js" || ((SUCCESS++))
check_file "backend/models/Registration.js" || ((SUCCESS++))
check_file "backend/routes/auth.js" || ((SUCCESS++))
check_file "backend/routes/courses.js" || ((SUCCESS++))
check_file "backend/routes/registrations.js" || ((SUCCESS++))
check_file "backend/routes/seed.js" || ((SUCCESS++))

echo ""
echo "⚛️ Checking frontend files..."
check_file "frontend/src/app/page.tsx" || ((SUCCESS++))
check_file "frontend/src/app/auth/page.tsx" || ((SUCCESS++))
check_file "frontend/src/app/dashboard/page.tsx" || ((SUCCESS++))
check_file "frontend/src/lib/api.ts" || ((SUCCESS++))
check_file "frontend/src/types/index.ts" || ((SUCCESS++))

echo ""
echo "🔐 Checking environment file templates..."
if [ -f "backend/.env" ]; then
    echo "⚠️  backend/.env exists (remove before git commit!)"
    ((WARNINGS++))
fi

if [ -f "frontend/.env.local" ]; then
    echo "⚠️  frontend/.env.local exists (remove before git commit!)"
    ((WARNINGS++))
fi

echo ""
echo "📦 Checking dependencies..."
cd backend
if npm list > /dev/null 2>&1; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Backend dependencies missing - run 'npm install' in backend/"
    ((SUCCESS++))
fi

cd ../frontend
if npm list > /dev/null 2>&1; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Frontend dependencies missing - run 'npm install' in frontend/"
    ((SUCCESS++))
fi

cd ..

echo ""
echo "🏆 Checklist Summary"
echo "==================="
if [ $SUCCESS -eq 0 ]; then
    echo "🎉 All checks passed! Your project is ready for deployment."
    if [ $WARNINGS -gt 0 ]; then
        echo "⚠️  $WARNINGS warning(s) - check environment files before committing"
    fi
else
    echo "❌ $SUCCESS issue(s) found. Please fix them before deployment."
fi

if [ $WARNINGS -gt 0 ]; then
    echo "⚠️  $WARNINGS warning(s) found."
fi

echo ""
echo "🚀 Next steps for deployment:"
echo "1. Fix any issues shown above"
echo "2. Remove .env files if they exist"
echo "3. Run ./deploy.sh for deployment preparation"
echo "4. Follow DEPLOYMENT.md for detailed instructions"
