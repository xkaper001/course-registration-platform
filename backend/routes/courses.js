import express from 'express';
import Course from '../models/Course.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const { semester, year, department, search } = req.query;
    let query = { isActive: true };

    if (semester) query.semester = semester;
    if (year) query.year = parseInt(year);
    if (department) query.department = department;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { courseId: { $regex: search, $options: 'i' } },
        { instructor: { $regex: search, $options: 'i' } }
      ];
    }

    const courses = await Course.find(query).sort({ courseId: 1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new course (admin only - simplified for demo)
router.post('/', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Course ID already exists' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update course
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json({ message: 'Course updated successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get available departments
router.get('/meta/departments', async (req, res) => {
  try {
    const departments = await Course.distinct('department', { isActive: true });
    res.json(departments.sort());
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
