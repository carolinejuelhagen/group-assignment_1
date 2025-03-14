import UI from "./ui.js";

// Select elements
const navbarLinks = document.querySelectorAll(".navbar__link a");
const contentSections = document.querySelectorAll(".content-section");
const addButtons = document.querySelectorAll(".add-button");

const formModal = document.querySelector(".form-modal");
const formHeader = document.querySelector(".form-header");
const formBody = document.querySelector(".form-body");
const formFooter = document.querySelector(".form-footer");

const deleteModal = document.querySelector(".delete-modal");
const deleteMessage = document.querySelector(".delete-message");
const confirmDeleteButton = document.querySelector(".confirm-delete");
const cancelDeleteButton = document.querySelector(".cancel-delete");

// Add event listeners
document.addEventListener("DOMContentLoaded", () => {
  navbarLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      navbarLinks.forEach((link) => {
        link.classList.remove("navbar__link--active");
      });

      e.currentTarget.classList.add("navbar__link--active");

      const target = e.currentTarget.getAttribute("data-target");

      UI.handleToggleSection(contentSections, target);

      if (target === "courses") {
        const latestCourseCollection =
          JSON.parse(localStorage.getItem("courses")) || [];
        UI.renderCourses(latestCourseCollection, target);
      } else if (target === "students") {
        const latestStudentCollection =
          JSON.parse(localStorage.getItem("students")) || [];
        UI.renderStudents(latestStudentCollection, target);
      } else if (target === "instructors") {
        const latestInstructorCollection =
          JSON.parse(localStorage.getItem("instructors")) || [];
        UI.renderInstructors(latestInstructorCollection, target);
      }
    });
  });

  UI.closeDeleteModal();

  addButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const target = e.currentTarget.getAttribute("data-target");
      UI.openAddModal(formModal, formHeader, formBody, formFooter, target);
    });
  });
});
