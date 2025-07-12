# 🎓 University Course Registration Platform

A modern, full-stack course registration system built with Next.js, Express.js, MongoDB, and shadcn/ui.

## ✨ Features

- 🔐 **Student Authentication** - Secure login and registration
- 📚 **Course Browsing** - Filter courses by department and search
- ✅ **Course Registration** - Enroll in available courses
- � **Registration Management** - View and drop registered courses
- 🎨 **Modern UI** - Beautiful interface with shadcn/ui components
- 📱 **Responsive Design** - Works on all devices

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI components
- **Axios** - HTTP client for API calls

### Backend
- **Express.js** - Node.js web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **bcryptjs** for password hashing

### Frontend
- **Next.js 15** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Axios** for API calls
- **Sonner** for toast notifications
- **Lucide React** for icons

## Prerequisites

- Node.js (v18 or later)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd course-registration-platform
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/course_registration
JWT_SECRET=course_registration_super_secret_jwt_key_2025
PORT=5000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Database Setup

Make sure MongoDB is running, then seed the database with sample courses:
```bash
cd backend
node seed.js
```

### 5. Start the Applications

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
```
The backend will run on http://localhost:5000

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```
The frontend will run on http://localhost:3000

## Usage

### For Students

1. **Registration**: Create a new student account with your student ID, name, email, year, and major
2. **Login**: Sign in with your email and password
3. **Browse Courses**: Search and filter available courses by department, semester, or keywords
4. **Register for Courses**: Click "Register" on desired courses (subject to capacity and schedule conflicts)
5. **Manage Courses**: View your registered courses in "My Courses" tab and drop courses if needed

### Sample Data

The system comes with pre-seeded sample courses including:
- CS101 - Introduction to Computer Science
- CS201 - Data Structures and Algorithms
- MATH201 - Calculus I
- PHYS101 - General Physics I
- ENG101 - English Composition I
- And more...

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new student
- `POST /api/auth/login` - Student login

### Courses
- `GET /api/courses` - Get all courses (with filters)
- `GET /api/courses/:id` - Get specific course
- `GET /api/courses/meta/departments` - Get all departments

### Registrations
- `GET /api/registrations/my-courses` - Get student's registered courses
- `POST /api/registrations/register` - Register for a course
- `DELETE /api/registrations/drop/:courseId` - Drop a course

## Features in Detail

### Course Registration Rules
- **Capacity Check**: Cannot register for full courses
- **Schedule Conflict Detection**: Prevents overlapping class times
- **Prerequisite Validation**: Checks course prerequisites
- **Duplicate Prevention**: Cannot register for the same course twice

### Security Features
- Password hashing with bcryptjs
- JWT token authentication
- Protected API routes
- Input validation and sanitization

### User Experience
- Modern, responsive design
- Real-time toast notifications
- Loading states and error handling
- Intuitive navigation and search

## Database Schema

### Student Model
```javascript
{
  studentId: String (unique),
  name: String,
  email: String (unique),
  password: String (hashed),
  year: Number (1-4),
  major: String,
  registeredCourses: [ObjectId]
}
```

### Course Model
```javascript
{
  courseId: String (unique),
  name: String,
  description: String,
  instructor: String,
  credits: Number,
  capacity: Number,
  enrolled: Number,
  schedule: {
    days: [String],
    startTime: String,
    endTime: String
  },
  location: String,
  prerequisites: [String],
  department: String,
  semester: String,
  year: Number,
  isActive: Boolean
}
```

### Registration Model
```javascript
{
  student: ObjectId,
  course: ObjectId,
  status: String ('registered', 'dropped', 'waitlisted'),
  registrationDate: Date,
  semester: String,
  year: Number
}
```

## Development

### Adding New Features
1. Backend: Add new routes in `/backend/routes/`
2. Frontend: Create new pages in `/frontend/src/app/`
3. Update types in `/frontend/src/types/index.ts`
4. Add API calls in `/frontend/src/lib/api.ts`

### Styling
- Uses Tailwind CSS with shadcn/ui components
- Color scheme and themes defined in `globals.css`
- Component variants in individual UI component files

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the MONGODB_URI in `.env`

2. **API Connection Error**
   - Ensure backend is running on port 5000
   - Check NEXT_PUBLIC_API_URL in frontend `.env.local`

3. **JWT Token Issues**
   - Clear localStorage in browser
   - Restart both frontend and backend

4. **Course Registration Fails**
   - Check course capacity
   - Verify no schedule conflicts
   - Ensure student is logged in

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Future Enhancements

- [ ] Waitlist functionality for full courses
- [ ] Email notifications for registration confirmations
- [ ] Grade management system
- [ ] Academic advisor approval workflow
- [ ] Course evaluation and ratings
- [ ] Student transcript generation
- [ ] Admin dashboard for course management
- [ ] Payment integration for course fees
