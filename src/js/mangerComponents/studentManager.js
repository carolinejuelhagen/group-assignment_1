import Student from "../student.js";
import UI from "../ui.js";

class StudentManager {
  static studentsCollection =
    JSON.parse(localStorage.getItem("students")) || [];

  // Add
  static addStudent(firstName, lastName, email, phone) {
    const latestStudentCollection =
      JSON.parse(localStorage.getItem("students")) || [];
    let student = new Student(firstName, lastName, email, phone);
    latestStudentCollection.push(student);
    StudentManager.storeStudents(latestStudentCollection);
    StudentManager.studentsCollection = latestStudentCollection;
  }

  // Store
  static storeStudents(collection) {
    localStorage.setItem("students", JSON.stringify(collection));
  }

  // Delete
  static deleteStudent(id) {
    const latestStudentCollection =
      JSON.parse(localStorage.getItem("students")) || [];
    StudentManager.studentsCollection = latestStudentCollection.filter(
      (student) => {
        return student.id !== id;
      }
    );

    StudentManager.storeStudents(StudentManager.studentsCollection);
    UI.renderStudents();
  }

  // Edit
  static editStudent(id, firstName, lastName, email, phone) {
    const latestStudentCollection = JSON.parse(
      localStorage.getItem("students")
    );
    const studentIndex = latestStudentCollection.findIndex(
      (student) => student.id === id
    );

    if (studentIndex !== -1) {
      latestStudentCollection[studentIndex] = {
        id,
        firstName,
        lastName,
        email,
        phone,
      };
      StudentManager.storeStudents(latestStudentCollection);
      StudentManager.studentsCollection = latestStudentCollection;
      UI.renderStudents();
    }
  }
}

export default StudentManager;
