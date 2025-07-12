import express from 'express';
import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { studentId, name, email, password, year, major } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({
      $or: [{ email }, { studentId }]
    });

    if (existingStudent) {
      return res.status(400).json({
        message: 'Student with this email or student ID already exists'
      });
    }

    // Create new student
    const student = new Student({
      studentId,
      name,
      email,
      password,
      year,
      major
    });

    await student.save();

    // Generate JWT token
    const token = jwt.sign(
      { studentId: student._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Student registered successfully',
      token,
      student: {
        id: student._id,
        studentId: student.studentId,
        name: student.name,
        email: student.email,
        year: student.year,
        major: student.major
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await student.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { studentId: student._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      student: {
        id: student._id,
        studentId: student.studentId,
        name: student.name,
        email: student.email,
        year: student.year,
        major: student.major
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
