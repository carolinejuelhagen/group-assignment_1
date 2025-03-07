import { v4 as uuidv4 } from "uuid";

class Course {
  constructor(courseName, courseCode) {
    this.id = uuidv4();
    this.isAvailable = true;
    this.courseName = courseName;
    this.courseCode = courseCode;

    this.students = [];
    this.instructor = [];
  }
}

export default Course;
