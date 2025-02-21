class UI {
  currentEditId = null;

  static displayStudentAddModal(studentAddButton, studentFormModal) {
    studentAddButton.addEventListener("click", () => {
      studentFormModal.classList.add("display-form");
    });
  }

  static displayInstructorAddModal(instructorAddButton, instructorFormModal) {
    instructorAddButton.addEventListener("click", () => {
      instructorFormModal.classList.add("display-form");
    });
  }

  static displayCourseAddModal(courseAddButton, courseFormModal) {
    courseAddButton.addEventListener("click", () => {
      courseFormModal.classList.add("display-form");
    });
  }

  static closeAddModal() {}
}

export default UI;