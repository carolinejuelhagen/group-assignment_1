import Instructor from "../instructor.js";
import UI from "../ui.js";
class InstructorManager {
  static instructorCollection =
    JSON.parse(localStorage.getItem("instructors")) || [];

  static addInstructor(firstName, lastName, email, phone, instructorId) {
    const lastestInstructorCollection =
      JSON.parse(localStorage.getItem("instructors")) || [];
    let instructor = new Instructor(
      firstName,
      lastName,
      email,
      phone,
      instructorId
    );
    lastestInstructorCollection.push(instructor);
    InstructorManager.storeInstructors(lastestInstructorCollection);
    InstructorManager.instructorCollection = lastestInstructorCollection;
  }

  static storeInstructors(collection) {
    localStorage.setItem("instructors", JSON.stringify(collection));
  }
}

export default InstructorManager;
