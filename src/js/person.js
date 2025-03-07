import { v4 as uuidv4 } from "uuid";

class Person {
  constructor(firstName, lastName, email, phone) {
    this.id = uuidv4();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
  }
}

export default Person;
