import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true,
    min: 1,
    max: 6
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  enrolled: {
    type: Number,
    default: 0
  },
  schedule: {
    days: [{
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }],
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  },
  location: {
    type: String,
    required: true
  },
  prerequisites: [{
    type: String
  }],
  department: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true,
    enum: ['Fall', 'Spring', 'Summer']
  },
  year: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Virtual for available spots
courseSchema.virtual('availableSpots').get(function() {
  return this.capacity - this.enrolled;
});

// Ensure virtual fields are serialized
courseSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Course', courseSchema);
