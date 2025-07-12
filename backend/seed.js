import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/Course.js';

dotenv.config();

const sampleCourses = [
  {
    courseId: 'CS101',
    name: 'Introduction to Computer Science',
    description: 'Fundamental concepts of computer science including programming basics, algorithms, and data structures.',
    instructor: 'Dr. Alice Johnson',
    credits: 3,
    capacity: 30,
    enrolled: 15,
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      startTime: '9:00 AM',
      endTime: '10:00 AM'
    },
    location: 'Tech Building Room 101',
    prerequisites: [],
    department: 'Computer Science',
    semester: 'Spring',
    year: 2025
  },
  {
    courseId: 'CS201',
    name: 'Data Structures and Algorithms',
    description: 'Advanced study of data structures, algorithms, and their applications.',
    instructor: 'Dr. Bob Smith',
    credits: 4,
    capacity: 25,
    enrolled: 20,
    schedule: {
      days: ['Tuesday', 'Thursday'],
      startTime: '11:00 AM',
      endTime: '12:30 PM'
    },
    location: 'Tech Building Room 205',
    prerequisites: ['CS101'],
    department: 'Computer Science',
    semester: 'Spring',
    year: 2025
  },
  {
    courseId: 'MATH201',
    name: 'Calculus I',
    description: 'Introduction to differential and integral calculus.',
    instructor: 'Dr. Carol Wilson',
    credits: 4,
    capacity: 40,
    enrolled: 25,
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      startTime: '10:30 AM',
      endTime: '11:30 AM'
    },
    location: 'Math Building Room 150',
    prerequisites: [],
    department: 'Mathematics',
    semester: 'Spring',
    year: 2025
  },
  {
    courseId: 'PHYS101',
    name: 'General Physics I',
    description: 'Introduction to mechanics, thermodynamics, and wave phenomena.',
    instructor: 'Dr. David Brown',
    credits: 4,
    capacity: 35,
    enrolled: 18,
    schedule: {
      days: ['Monday', 'Wednesday'],
      startTime: '2:00 PM',
      endTime: '3:30 PM'
    },
    location: 'Science Building Room 201',
    prerequisites: ['MATH201'],
    department: 'Physics',
    semester: 'Spring',
    year: 2025
  },
  {
    courseId: 'ENG101',
    name: 'English Composition I',
    description: 'Development of writing skills with emphasis on clear, effective communication.',
    instructor: 'Prof. Emily Davis',
    credits: 3,
    capacity: 25,
    enrolled: 12,
    schedule: {
      days: ['Tuesday', 'Thursday'],
      startTime: '9:30 AM',
      endTime: '11:00 AM'
    },
    location: 'Liberal Arts Building Room 305',
    prerequisites: [],
    department: 'English',
    semester: 'Spring',
    year: 2025
  },
  {
    courseId: 'CS301',
    name: 'Database Systems',
    description: 'Design and implementation of database systems, SQL, and database management.',
    instructor: 'Dr. Frank Miller',
    credits: 3,
    capacity: 20,
    enrolled: 8,
    schedule: {
      days: ['Monday', 'Wednesday'],
      startTime: '1:00 PM',
      endTime: '2:30 PM'
    },
    location: 'Tech Building Room 301',
    prerequisites: ['CS201'],
    department: 'Computer Science',
    semester: 'Spring',
    year: 2025
  },
  {
    courseId: 'HIST101',
    name: 'World History I',
    description: 'Survey of world history from ancient civilizations to 1500 CE.',
    instructor: 'Dr. Grace Taylor',
    credits: 3,
    capacity: 30,
    enrolled: 22,
    schedule: {
      days: ['Tuesday', 'Thursday'],
      startTime: '1:00 PM',
      endTime: '2:30 PM'
    },
    location: 'Humanities Building Room 102',
    prerequisites: [],
    department: 'History',
    semester: 'Spring',
    year: 2025
  },
  {
    courseId: 'BIO101',
    name: 'General Biology I',
    description: 'Introduction to biological principles including cell biology, genetics, and evolution.',
    instructor: 'Dr. Helen Garcia',
    credits: 4,
    capacity: 28,
    enrolled: 16,
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      startTime: '8:00 AM',
      endTime: '9:00 AM'
    },
    location: 'Science Building Room 105',
    prerequisites: [],
    department: 'Biology',
    semester: 'Spring',
    year: 2025
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('Cleared existing courses');

    // Insert sample courses
    await Course.insertMany(sampleCourses);
    console.log('Sample courses inserted successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
