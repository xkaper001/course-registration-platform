import express from 'express';
import Course from '../models/Course.js';

const router = express.Router();

// Temporary seed endpoint for production (remove after use)
router.post('/seed-courses', async (req, res) => {
  try {
    // Check if courses already exist
    const existingCourses = await Course.countDocuments();
    if (existingCourses > 0) {
      return res.json({ message: 'Courses already seeded', count: existingCourses });
    }

    const courses = [
      {
        courseId: 'CS101',
        name: 'Introduction to Computer Science',
        description: 'Basic concepts of programming and computer science fundamentals.',
        credits: 3,
        department: 'Computer Science',
        instructor: 'Dr. Smith',
        schedule: {
          days: ['Monday', 'Wednesday', 'Friday'],
          startTime: '09:00',
          endTime: '10:00'
        },
        location: 'Room 101, Engineering Building',
        capacity: 30,
        semester: 'Fall',
        year: 2025,
        prerequisites: []
      },
      {
        courseId: 'CS201',
        name: 'Data Structures and Algorithms',
        description: 'Study of fundamental data structures and algorithms.',
        credits: 4,
        department: 'Computer Science',
        instructor: 'Dr. Johnson',
        schedule: {
          days: ['Tuesday', 'Thursday'],
          startTime: '11:00',
          endTime: '12:30'
        },
        location: 'Room 205, Engineering Building',
        capacity: 25,
        semester: 'Fall',
        year: 2025,
        prerequisites: ['CS101']
      },
      {
        courseId: 'MATH101',
        name: 'Calculus I',
        description: 'Differential and integral calculus of functions of one variable.',
        credits: 4,
        department: 'Mathematics',
        instructor: 'Prof. Williams',
        schedule: {
          days: ['Monday', 'Wednesday', 'Friday'],
          startTime: '10:00',
          endTime: '11:00'
        },
        location: 'Room 301, Mathematics Building',
        capacity: 40,
        semester: 'Fall',
        year: 2025,
        prerequisites: []
      },
      {
        courseId: 'PHYS101',
        name: 'General Physics I',
        description: 'Mechanics, heat, and sound.',
        credits: 4,
        department: 'Physics',
        instructor: 'Dr. Brown',
        schedule: {
          days: ['Tuesday', 'Thursday'],
          startTime: '14:00',
          endTime: '15:30'
        },
        location: 'Room 101, Physics Building',
        capacity: 35,
        semester: 'Fall',
        year: 2025,
        prerequisites: ['MATH101']
      },
      {
        courseId: 'ENG101',
        name: 'English Composition',
        description: 'Writing and composition skills development.',
        credits: 3,
        department: 'English',
        instructor: 'Prof. Davis',
        schedule: {
          days: ['Monday', 'Wednesday'],
          startTime: '13:00',
          endTime: '14:30'
        },
        location: 'Room 201, Liberal Arts Building',
        capacity: 20,
        semester: 'Fall',
        year: 2025,
        prerequisites: []
      },
      {
        courseId: 'CS301',
        name: 'Database Systems',
        description: 'Design and implementation of database systems.',
        credits: 3,
        department: 'Computer Science',
        instructor: 'Dr. Wilson',
        schedule: {
          days: ['Tuesday', 'Thursday'],
          startTime: '09:30',
          endTime: '11:00'
        },
        location: 'Room 210, Engineering Building',
        capacity: 30,
        semester: 'Fall',
        year: 2025,
        prerequisites: ['CS201']
      },
      {
        courseId: 'MATH201',
        name: 'Linear Algebra',
        description: 'Vector spaces, matrices, and linear transformations.',
        credits: 3,
        department: 'Mathematics',
        instructor: 'Prof. Taylor',
        schedule: {
          days: ['Monday', 'Wednesday', 'Friday'],
          startTime: '14:00',
          endTime: '15:00'
        },
        location: 'Room 305, Mathematics Building',
        capacity: 30,
        semester: 'Fall',
        year: 2025,
        prerequisites: ['MATH101']
      },
      {
        courseId: 'CS401',
        name: 'Software Engineering',
        description: 'Principles and practices of software development.',
        credits: 4,
        department: 'Computer Science',
        instructor: 'Dr. Anderson',
        schedule: {
          days: ['Tuesday', 'Thursday'],
          startTime: '15:30',
          endTime: '17:00'
        },
        location: 'Room 215, Engineering Building',
        capacity: 25,
        semester: 'Fall',
        year: 2025,
        prerequisites: ['CS301']
      }
    ];

    const createdCourses = await Course.insertMany(courses);
    res.json({ 
      message: 'Courses seeded successfully', 
      count: createdCourses.length,
      courses: createdCourses.map(c => ({ courseId: c.courseId, name: c.name }))
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ message: 'Error seeding courses', error: error.message });
  }
});

export default router;
