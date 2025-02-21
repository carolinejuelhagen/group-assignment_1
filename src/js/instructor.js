import Person from "./person";

class Instructor extends Person {
  constructor(firstName, lastName, email, instructorId) {
    super(firstName, lastName, email);
    this.instructorId = instructorId;
    this.courses = [];
  }
}

export default Instructor;
