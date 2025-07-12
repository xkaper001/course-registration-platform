# 🚀 QUICK DEPLOYMENT GUIDE

## 📋 Pre-Deployment Checklist ✅

Your Course Registration Platform is **ready for deployment**! Here's exactly what you need to do:

## 🗄️ Step 1: Set Up MongoDB Atlas (5 minutes)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free account → Create free cluster
3. **Database Access**: Create user with read/write permissions
4. **Network Access**: Add IP `0.0.0.0/0` (allow all IPs for serverless)
5. **Connect**: Get connection string like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/course-registration
   ```

## 📁 Step 2: Push to GitHub (2 minutes)

```bash
# From your project root directory
git init
git add .
git commit -m "Course Registration Platform - Ready for deployment"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/course-registration-platform.git
git push -u origin main
```

## 🌐 Step 3: Deploy Backend to Vercel (3 minutes)

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repository
3. **Root Directory**: Set to `backend`
4. **Environment Variables** (in Vercel dashboard):
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/course-registration
   JWT_SECRET=your-super-secure-random-string-here
   NODE_ENV=production
   ```
5. **Deploy** → Note your backend URL: `https://your-backend.vercel.app`

## 💻 Step 4: Deploy Frontend to Vercel (2 minutes)

1. **New Project** in Vercel
2. Import same GitHub repository
3. **Root Directory**: Set to `frontend`
4. **Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.vercel.app/api
   ```
5. **Deploy** → Note your frontend URL: `https://your-frontend.vercel.app`

## 🌱 Step 5: Seed Database (1 minute)

Option 1 - Use curl:
```bash
curl -X POST https://your-backend.vercel.app/api/admin/seed-courses
```

Option 2 - Use browser:
- Install a REST client extension (like REST Client for VS Code)
- Send POST request to: `https://your-backend.vercel.app/api/admin/seed-courses`

## 🎉 Step 6: Test Your Deployment

1. Visit your frontend URL: `https://your-frontend.vercel.app`
2. Register a new student account
3. Browse courses
4. Register for a course
5. View your dashboard

## 🔧 Environment Variables Summary

### Backend (Vercel):
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/course-registration
JWT_SECRET=generate-with-openssl-rand-base64-32
NODE_ENV=production
```

### Frontend (Vercel):
```
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app/api
```

## 🛠️ Troubleshooting

### If backend fails to deploy:
- Check MongoDB connection string
- Verify all environment variables are set
- Check Vercel function logs

### If frontend can't connect to backend:
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check browser console for CORS errors
- Ensure backend is deployed successfully

### If courses don't load:
- Run the seed endpoint again
- Check MongoDB Atlas data

## 📱 Your Deployed URLs

After deployment, you'll have:
- **Frontend**: `https://your-frontend.vercel.app`
- **Backend**: `https://your-backend.vercel.app`
- **API**: `https://your-backend.vercel.app/api`

## 🎯 Sample Test Account

After seeding, you can register any new student. Example:
- Student ID: `STU001`
- Name: `John Doe`
- Email: `john.doe@university.edu`
- Password: `password123`
- Year: `2`
- Major: `Computer Science`

---

## 📚 Available Courses After Seeding:
- CS101 - Introduction to Computer Science
- CS201 - Data Structures and Algorithms
- CS301 - Database Systems
- CS401 - Software Engineering
- MATH101 - Calculus I
- MATH201 - Linear Algebra
- PHYS101 - General Physics I
- ENG101 - English Composition

---

**🎉 Congratulations! Your course registration platform is now live!**

**Need help?** Check `DEPLOYMENT.md` for detailed instructions or troubleshooting tips.
