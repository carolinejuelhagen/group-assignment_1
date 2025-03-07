import Person from "./person";
let studentIdCounter = 1;
class Student extends Person {
  constructor(firstName, lastName, email, phone) {
    super(firstName, lastName, email, phone);
    this.studentId = studentIdCounter++;
    this.courses = [];
  }
}

export default Student;
