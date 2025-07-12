# Course Registration Platform - Vercel Deployment Guide

## Prerequisites

1. **GitHub Account**: Push your code to a GitHub repository
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **MongoDB Atlas**: Set up a MongoDB Atlas cluster (cloud MongoDB)

## Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user with read/write permissions
4. Whitelist all IP addresses (0.0.0.0/0) for serverless deployment
5. Get your connection string (it should look like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

## Step 2: Push Code to GitHub

1. Initialize git repository and push to GitHub:
```bash
cd /Users/xkaper/Documents/Study\ Material/sem6/course-registration-platform
git init
git add .
git commit -m "Initial commit: Course Registration Platform"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Step 3: Deploy Backend to Vercel

1. **Connect Repository to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `backend` folder as the root directory

2. **Configure Environment Variables**:
   - In Vercel dashboard, go to your project settings
   - Add the following environment variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: A secure random string (e.g., generate with `openssl rand -base64 32`)
     - `NODE_ENV`: `production`

3. **Deploy**:
   - Vercel will automatically deploy your backend
   - Note the deployed URL (e.g., `https://your-backend.vercel.app`)

## Step 4: Deploy Frontend to Vercel

1. **Update Frontend Environment**:
   - Create a new Vercel project for the frontend
   - Select the `frontend` folder as the root directory
   - Add environment variable:
     - `NEXT_PUBLIC_API_URL`: Your backend Vercel URL + `/api` (e.g., `https://your-backend.vercel.app/api`)

2. **Deploy**:
   - Vercel will automatically build and deploy your Next.js frontend
   - Note the deployed URL (e.g., `https://your-frontend.vercel.app`)

## Step 5: Update CORS Configuration

After deployment, update your backend's CORS configuration to allow your frontend domain.

## Step 6: Seed the Database

1. **Option 1: Use Vercel CLI to run seed script**:
```bash
npx vercel env pull .env.local
node seed.js
```

2. **Option 2: Create a temporary API endpoint** (add to backend):
```javascript
// Add this route temporarily to seed data
app.get('/api/seed', async (req, res) => {
  // Copy seed.js content here
  // Remove this endpoint after seeding
});
```

## Folder Structure for Deployment

Your repository should have this structure:
```
course-registration-platform/
├── backend/          # Deploy this as one Vercel project
│   ├── index.js
│   ├── package.json
│   ├── vercel.json
│   └── ...
└── frontend/         # Deploy this as another Vercel project
    ├── package.json
    ├── next.config.js
    └── ...
```

## Environment Variables Summary

### Backend (.env):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/course-registration
JWT_SECRET=your-super-secure-jwt-secret
NODE_ENV=production
```

### Frontend (.env.local):
```
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app/api
```

## Testing Deployment

1. Visit your frontend URL
2. Test registration and login
3. Test course browsing and registration
4. Check Vercel function logs for any errors

## Troubleshooting

- **CORS Issues**: Make sure your frontend URL is allowed in backend CORS
- **Database Connection**: Verify MongoDB Atlas connection string and IP whitelist
- **Environment Variables**: Double-check all environment variables are set correctly
- **Function Timeout**: Vercel has a 10-second timeout for hobby plans

## Post-Deployment Updates

To update your deployment:
1. Push changes to GitHub
2. Vercel will automatically redeploy
3. Or use Vercel CLI: `vercel --prod`
