import { v4 as uuidv4 } from "uuid";

class Person {
  constructor(firstName, lastName, email) {
    this.id = uuidv4();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

export default Person;
