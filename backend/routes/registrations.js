import express from 'express';
import mongoose from 'mongoose';
import Registration from '../models/Registration.js';
import Course from '../models/Course.js';
import Student from '../models/Student.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get student's registrations
router.get('/my-courses', authenticateToken, async (req, res) => {
  try {
    const registrations = await Registration.find({
      student: req.student._id,
      status: 'registered'
    }).populate('course');
    
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Register for a course
router.post('/register', authenticateToken, async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.student._id;

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if course is full
    if (course.enrolled >= course.capacity) {
      return res.status(400).json({ message: 'Course is full' });
    }

    // Check if student is already registered (active registration only)
    const existingRegistration = await Registration.findOne({
      student: studentId,
      course: courseId,
      status: 'registered'
    });

    if (existingRegistration) {
      return res.status(400).json({ message: 'Already registered for this course' });
    }

    // Check for schedule conflicts
    const studentRegistrations = await Registration.find({
      student: studentId,
      status: 'registered'
    }).populate('course');

    const hasConflict = studentRegistrations.some(reg => {
      const regCourse = reg.course;
      return course.schedule.days.some(day => 
        regCourse.schedule.days.includes(day) &&
        timeOverlap(course.schedule, regCourse.schedule)
      );
    });

    if (hasConflict) {
      return res.status(400).json({ message: 'Schedule conflict detected' });
    }

    // Create registration
    const registration = new Registration({
      student: studentId,
      course: courseId,
      semester: course.semester,
      year: course.year
    });

    await registration.save();

    // Update course enrollment count
    await Course.findByIdAndUpdate(
      courseId,
      { $inc: { enrolled: 1 } }
    );

    // Add course to student's registered courses
    await Student.findByIdAndUpdate(
      studentId,
      { $addToSet: { registeredCourses: courseId } }
    );
    
    const populatedRegistration = await Registration.findById(registration._id).populate('course');
    res.status(201).json({
      message: 'Successfully registered for course',
      registration: populatedRegistration
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Drop a course
router.delete('/drop/:courseId', authenticateToken, async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.student._id;

    // Find the registration
    const registration = await Registration.findOne({
      student: studentId,
      course: courseId,
      status: 'registered'
    });

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    // Update registration status
    registration.status = 'dropped';
    await registration.save();

    // Update course enrollment count
    await Course.findByIdAndUpdate(
      courseId,
      { $inc: { enrolled: -1 } }
    );

    // Remove course from student's registered courses
    await Student.findByIdAndUpdate(
      studentId,
      { $pull: { registeredCourses: courseId } }
    );

    res.json({ message: 'Successfully dropped course' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Helper function to check time overlap
function timeOverlap(schedule1, schedule2) {
  const start1 = parseTime(schedule1.startTime);
  const end1 = parseTime(schedule1.endTime);
  const start2 = parseTime(schedule2.startTime);
  const end2 = parseTime(schedule2.endTime);

  return start1 < end2 && start2 < end1;
}

function parseTime(timeString) {
  const [time, period] = timeString.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  let totalMinutes = hours * 60 + minutes;
  
  if (period === 'PM' && hours !== 12) {
    totalMinutes += 12 * 60;
  } else if (period === 'AM' && hours === 12) {
    totalMinutes -= 12 * 60;
  }
  
  return totalMinutes;
}

export default router;
