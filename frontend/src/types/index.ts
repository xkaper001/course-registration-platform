export interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  year: number;
  major: string;
}

export interface Course {
  _id: string;
  courseId: string;
  name: string;
  description: string;
  instructor: string;
  credits: number;
  capacity: number;
  enrolled: number;
  availableSpots: number;
  schedule: {
    days: string[];
    startTime: string;
    endTime: string;
  };
  location: string;
  prerequisites: string[];
  department: string;
  semester: string;
  year: number;
  isActive: boolean;
}

export interface Registration {
  _id: string;
  student: string;
  course: Course;
  status: 'registered' | 'dropped' | 'waitlisted';
  registrationDate: string;
  semester: string;
  year: number;
}

export interface AuthResponse {
  message: string;
  token: string;
  student: Student;
}
