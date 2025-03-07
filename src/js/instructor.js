import Person from "./person";

let instructorIdCounter = 1;
class Instructor extends Person {
  constructor(firstName, lastName, email, phone) {
    super(firstName, lastName, email, phone);
    this.instructorId = instructorIdCounter++;
    this.courses = [];
  }
}

export default Instructor;
