import UI from "./ui.js";

// Select elements
const studentAddButton = document.querySelector(".add-student-button");
const studentFormModal = document.querySelector(".student-form-modal");

const instructorAddButton = document.querySelector(".add-instructor-button");
const instructorFormModal = document.querySelector(".instructor-form-modal");

const courseAddButton = document.querySelector(".add-course-button");
const courseFormModal = document.querySelector(".course-form-modal");

// Add event listeners
document.addEventListener("DOMContentLoaded", () => {
    UI.displayStudentAddModal(studentAddButton, studentFormModal);

    UI.displayInstructorAddModal(instructorAddButton, instructorFormModal);
    
    UI.displayCourseAddModal(courseAddButton, courseFormModal);
})