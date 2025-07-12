import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  status: {
    type: String,
    enum: ['registered', 'dropped', 'waitlisted'],
    default: 'registered'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  semester: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Ensure unique registration per student per course
registrationSchema.index({ student: 1, course: 1 }, { unique: true });

export default mongoose.model('Registration', registrationSchema);
