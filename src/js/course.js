class Course {
  constructor(courseName, courseCode) {
    this.isAvailable = true;
    this.courseName = courseName;
    this.courseCode = courseCode;
    this.students = [];
    this.instructor = [];
  }
}

export default Course;
