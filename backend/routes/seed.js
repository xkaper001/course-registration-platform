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
        courseCode: 'CS101',
        title: 'Introduction to Computer Science',
        description: 'Basic concepts of programming and computer science fundamentals.',
        credits: 3,
        department: 'Computer Science',
        instructor: 'Dr. Smith',
        schedule: 'Mon, Wed, Fri 9:00-10:00 AM',
        maxStudents: 30,
        prerequisites: []
      },
      {
        courseCode: 'CS201',
        title: 'Data Structures and Algorithms',
        description: 'Study of fundamental data structures and algorithms.',
        credits: 4,
        department: 'Computer Science',
        instructor: 'Dr. Johnson',
        schedule: 'Tue, Thu 11:00 AM-12:30 PM',
        maxStudents: 25,
        prerequisites: ['CS101']
      },
      {
        courseCode: 'MATH101',
        title: 'Calculus I',
        description: 'Differential and integral calculus of functions of one variable.',
        credits: 4,
        department: 'Mathematics',
        instructor: 'Prof. Williams',
        schedule: 'Mon, Wed, Fri 10:00-11:00 AM',
        maxStudents: 40,
        prerequisites: []
      },
      {
        courseCode: 'PHYS101',
        title: 'General Physics I',
        description: 'Mechanics, heat, and sound.',
        credits: 4,
        department: 'Physics',
        instructor: 'Dr. Brown',
        schedule: 'Tue, Thu 2:00-3:30 PM',
        maxStudents: 35,
        prerequisites: ['MATH101']
      },
      {
        courseCode: 'ENG101',
        title: 'English Composition',
        description: 'Writing and composition skills development.',
        credits: 3,
        department: 'English',
        instructor: 'Prof. Davis',
        schedule: 'Mon, Wed 1:00-2:30 PM',
        maxStudents: 20,
        prerequisites: []
      },
      {
        courseCode: 'CS301',
        title: 'Database Systems',
        description: 'Design and implementation of database systems.',
        credits: 3,
        department: 'Computer Science',
        instructor: 'Dr. Wilson',
        schedule: 'Tue, Thu 9:30-11:00 AM',
        maxStudents: 30,
        prerequisites: ['CS201']
      },
      {
        courseCode: 'MATH201',
        title: 'Linear Algebra',
        description: 'Vector spaces, matrices, and linear transformations.',
        credits: 3,
        department: 'Mathematics',
        instructor: 'Prof. Taylor',
        schedule: 'Mon, Wed, Fri 2:00-3:00 PM',
        maxStudents: 30,
        prerequisites: ['MATH101']
      },
      {
        courseCode: 'CS401',
        title: 'Software Engineering',
        description: 'Principles and practices of software development.',
        credits: 4,
        department: 'Computer Science',
        instructor: 'Dr. Anderson',
        schedule: 'Tue, Thu 3:30-5:00 PM',
        maxStudents: 25,
        prerequisites: ['CS301']
      }
    ];

    const createdCourses = await Course.insertMany(courses);
    res.json({ 
      message: 'Courses seeded successfully', 
      count: createdCourses.length,
      courses: createdCourses.map(c => ({ courseCode: c.courseCode, title: c.title }))
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ message: 'Error seeding courses', error: error.message });
  }
});

export default router;
