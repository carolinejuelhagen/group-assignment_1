import Person from "./person";

class Instructor extends Person {
  constructor(firstName, lastName, email, phone) {
    super(firstName, lastName, email, phone);

    this.courses = [];
  }
}

export default Instructor;
