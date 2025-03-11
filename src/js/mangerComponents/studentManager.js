import Student from "../student.js";
import UI from "../ui.js";

class StudentManager {
  static studentsCollection =
    JSON.parse(localStorage.getItem("students")) || [];

  static addStudent(firstName, lastName, email, phone, studentId) {
    const lastestStudentCollection =
      JSON.parse(localStorage.getItem("students")) || [];
    let student = new Student(firstName, lastName, email, phone, studentId);
    lastestStudentCollection.push(student);
    StudentManager.storeStudents(lastestStudentCollection);
    StudentManager.studentsCollection = lastestStudentCollection;
  }

  static storeStudents(collection) {
    localStorage.setItem("students", JSON.stringify(collection));
  }

  static deleteStudent(id) {
    const lastestStudentCollection =
      JSON.parse(localStorage.getItem("students")) || [];
    StudentManager.studentsCollection = lastestStudentCollection.filter((student) => {
      return student.id !== id;
    });

    StudentManager.storeStudents(StudentManager.studentsCollection);
    UI.renderStudents();
  }
}

export default StudentManager;
