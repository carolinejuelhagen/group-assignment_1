import Instructor from "../instructor.js";
import UI from "../ui.js";

class InstructorManager {
  static instructorCollection =
    JSON.parse(localStorage.getItem("instructors")) || [];

  // Add
  static addInstructor(firstName, lastName, email, phone) {
    const latestInstructorCollection =
      JSON.parse(localStorage.getItem("instructors")) || [];
    let instructor = new Instructor(firstName, lastName, email, phone);
    latestInstructorCollection.push(instructor);
    InstructorManager.storeInstructors(latestInstructorCollection);
    InstructorManager.instructorCollection = latestInstructorCollection;
  }

  // Store
  static storeInstructors(collection) {
    localStorage.setItem("instructors", JSON.stringify(collection));
  }

  // Delete
  static deleteInstructor(id) {
    const latestInstructorCollection =
      JSON.parse(localStorage.getItem("instructors")) || [];
    InstructorManager.instructorCollection = latestInstructorCollection.filter(
      (instructor) => {
        return instructor.id !== id;
      }
    );

    InstructorManager.storeInstructors(InstructorManager.instructorCollection);
    UI.renderInstructors();
  }

  // Edit
  static editInstructor(id, firstName, lastName, email, phone, courses) {
    const latestInstructorCollection = JSON.parse(localStorage.getItem("instructors")) || [];
    const instructorIndex = latestInstructorCollection.findIndex(instructor => instructor.id === id);

    if (instructorIndex !== -1) {
      latestInstructorCollection[instructorIndex] = {
        id,
        firstName,
        lastName,
        email,
        phone, 
        courses
      };
      InstructorManager.storeInstructors(latestInstructorCollection);
      InstructorManager.instructorCollection = latestInstructorCollection;
      UI.renderInstructors();
    }
  }
}

export default InstructorManager;