import Person from "./person";

class Student extends Person {
  constructor(firstName, lastName, email, studentId) {
    super(firstName, lastName, email);
    this.studentId = studentId;
    this.courses = [];
  }
}

export default Student;
