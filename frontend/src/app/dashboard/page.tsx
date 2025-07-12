"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { coursesAPI, registrationsAPI } from "@/lib/api";
import { Course, Registration, Student } from "@/types";
import { toast } from "sonner";
import { Search, User, BookOpen, Calendar, MapPin, Users, Clock, LogOut } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [myCourses, setMyCourses] = useState<Registration[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    department: "all",
    semester: "Spring",
    year: 2025,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const studentData = localStorage.getItem("student");
    
    if (!token || !studentData) {
      router.push("/auth");
      return;
    }

    setStudent(JSON.parse(studentData));
    loadInitialData();
  }, [router]);

  const loadInitialData = async () => {
    try {
      const searchFilters = {
        ...filters,
        department: filters.department === "all" ? undefined : filters.department,
      };
      const [coursesRes, myCoursesRes, departmentsRes] = await Promise.all([
        coursesAPI.getAllCourses(searchFilters),
        registrationsAPI.getMyCourses(),
        coursesAPI.getDepartments(),
      ]);

      setCourses(coursesRes.data);
      setMyCourses(myCoursesRes.data);
      setDepartments(departmentsRes.data);
    } catch (error: any) {
      toast.error("Failed to load data");
      console.error(error);
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const searchFilters = {
        ...filters,
        department: filters.department === "all" ? undefined : filters.department,
      };
      const response = await coursesAPI.getAllCourses(searchFilters);
      setCourses(response.data);
    } catch (error: any) {
      toast.error("Failed to search courses");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (courseId: string) => {
    try {
      await registrationsAPI.registerForCourse(courseId);
      toast.success("Successfully registered for course!");
      loadInitialData(); // Refresh data
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  const handleDrop = async (courseId: string) => {
    try {
      await registrationsAPI.dropCourse(courseId);
      toast.success("Successfully dropped course!");
      loadInitialData(); // Refresh data
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Drop failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("student");
    router.push("/auth");
  };

  const isRegistered = (courseId: string) => {
    return myCourses.some(reg => reg.course._id === courseId);
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Course Registration</h1>
                <p className="text-sm text-gray-500">Spring 2025 Semester</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">{student.name}</span>
                <Badge variant="outline">{student.studentId}</Badge>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Student Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Student ID</p>
                <p className="text-lg font-semibold">{student.studentId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-lg font-semibold">{student.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Year</p>
                <p className="text-lg font-semibold">{student.year}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Major</p>
                <p className="text-lg font-semibold">{student.major}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList>
            <TabsTrigger value="browse">Browse Courses</TabsTrigger>
            <TabsTrigger value="registered">My Courses ({myCourses.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Find Courses</CardTitle>
                <CardDescription>Search and filter available courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search courses..."
                      value={filters.search}
                      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                  <Select
                    value={filters.department}
                    onValueChange={(value) => setFilters({ ...filters, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={filters.semester}
                    onValueChange={(value) => setFilters({ ...filters, semester: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Spring">Spring</SelectItem>
                      <SelectItem value="Fall">Fall</SelectItem>
                      <SelectItem value="Summer">Summer</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleSearch} disabled={isLoading}>
                    {isLoading ? "Searching..." : "Search"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Course List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Card key={course._id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{course.courseId} - {course.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {course.instructor} • {course.credits} credits
                        </CardDescription>
                      </div>
                      <Badge variant={course.availableSpots > 0 ? "default" : "destructive"}>
                        {course.availableSpots > 0 ? "Available" : "Full"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{course.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{course.schedule.days.join(", ")}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{course.schedule.startTime} - {course.schedule.endTime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{course.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span>{course.enrolled}/{course.capacity} enrolled</span>
                      </div>
                    </div>

                    {course.prerequisites.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Prerequisites:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {course.prerequisites.map((prereq) => (
                            <Badge key={prereq} variant="outline" className="text-xs">
                              {prereq}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-4">
                      {isRegistered(course._id) ? (
                        <Badge variant="default" className="w-full justify-center py-2">
                          Registered
                        </Badge>
                      ) : (
                        <Button
                          onClick={() => handleRegister(course._id)}
                          disabled={course.availableSpots <= 0}
                          className="w-full"
                        >
                          {course.availableSpots > 0 ? "Register" : "Course Full"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="registered">
            <Card>
              <CardHeader>
                <CardTitle>My Registered Courses</CardTitle>
                <CardDescription>
                  Courses you are currently registered for this semester
                </CardDescription>
              </CardHeader>
              <CardContent>
                {myCourses.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No courses registered yet</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Switch to Browse Courses tab to register for courses
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Instructor</TableHead>
                        <TableHead>Credits</TableHead>
                        <TableHead>Schedule</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {myCourses.map((registration) => (
                        <TableRow key={registration._id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">
                                {registration.course.courseId} - {registration.course.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {registration.course.department}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>{registration.course.instructor}</TableCell>
                          <TableCell>{registration.course.credits}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p>{registration.course.schedule.days.join(", ")}</p>
                              <p className="text-gray-500">
                                {registration.course.schedule.startTime} - {registration.course.schedule.endTime}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>{registration.course.location}</TableCell>
                          <TableCell>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDrop(registration.course._id)}
                            >
                              Drop
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
