import StudentManager from "./mangerComponents/studentManager.js";
import InstructorManager from "./mangerComponents/instructorManager.js";
import CourseManager from "./mangerComponents/courseManager.js";
import Validation from "./validation.js";

// Select elements
const studentList = document.querySelector(".students-list");
const instructorList = document.querySelector(".instructors-list");
const courseList = document.querySelector(".courses-list");
const validationMessage = document.querySelector(".form__validation-message");

const assignModal = document.querySelector(".assign-modal");
const assignModalContentContainer = document.querySelector(
  ".assign-modal__content-container"
);
const assignModalHeader = document.querySelector(".assign-header");
const assignModalBody = document.querySelector(".assign-body");
const assignModalFooter = document.querySelector(".assign-footer");

class UI {
  currentEditId = null;

  // Toggle sections
  static handleToggleSection(contentSections, target) {
    contentSections.forEach((section) => {
      if (section.id === target) {
        section.classList.add("content-section--active");
      } else {
        section.classList.remove("content-section--active");
      }
    });
  }

  // Add
  static openAddModal(formModal, formHeader, formBody, formFooter, target) {
    formModal.classList.add("form-modal--display");

    UI.renderForm(formModal, formHeader, formBody, formFooter, target);
  }

  static closeAddModal(formModal) {
    formModal.classList.remove("form-modal--display");
  }

  // Delete
  static openDeleteModal(id, type, firstName, lastName) {
    const deleteModal = document.querySelector(".delete-modal");
    deleteModal.classList.add("delete-modal--display");
    const deleteMessage = document.querySelector(".delete-message");
    const confirmDeleteButton = document.querySelector(".confirm-delete");

    deleteMessage.textContent =
      type === "course"
        ? `Are you sure you want to proceed?`
        : `Are you sure you want to delete ${firstName} ${lastName}?`;

    confirmDeleteButton.addEventListener("click", () => {
      if (type === "student") {
        StudentManager.deleteStudent(id);
      } else if (type === "instructor") {
        InstructorManager.deleteInstructor(id);
      } else if (type === "course") {
        CourseManager.deleteCourse(id);
      }
      deleteModal.classList.remove("delete-modal--display");
    });
  }

  static closeDeleteModal() {
    const deleteModal = document.querySelector(".delete-modal");
    const cancelDeleteButton = document.querySelector(".cancel-delete");

    cancelDeleteButton.addEventListener("click", () => {
      deleteModal.classList.remove("delete-modal--display");
    });
  }

  // Edit
  static openEditModal() {
    const formModal = document.querySelector(".form-modal");
    formModal.classList.add("form-modal--display");
  }

  static populateEditForm(id, type) {
    setTimeout(() => {
      // Select inputs
      const firstName = document.querySelector("#firstName");
      const lastName = document.querySelector("#lastName");
      const email = document.querySelector("#email");
      const phone = document.querySelector("#phone");
      const courseName = document.querySelector("#courseName");
      const courseCode = document.querySelector("#courseCode");

      // Select elements and change content
      const formHeading = document.querySelector(".form-header");
      const submitButton = document.querySelector(".submit-button");
      submitButton.textContent = "Confirm edit";
      const cancelButton = document.querySelector(".cancel-button");
      cancelButton.textContent = "Cancel edit";

      if (type === "students") {
        formHeading.textContent = "Edit student";
        const studentsCollection = JSON.parse(localStorage.getItem("students"));
        const studentToEdit = studentsCollection.find(student => student.id === id);
        if (studentToEdit) {
          firstName.value = studentToEdit.firstName;
          lastName.value = studentToEdit.lastName;
          email.value = studentToEdit.email;
          phone.value = studentToEdit.phone;
          UI.studentToEditCourses = studentToEdit.courses || [];
        }
      } else if (type === "instructors") {
        formHeading.textContent = "Edit instructor";
        const instructorCollection = JSON.parse(localStorage.getItem("instructors"));
        const instructorToEdit = instructorCollection.find(instructor => instructor.id === id);
        if (instructorToEdit) {
          firstName.value = instructorToEdit.firstName;
          lastName.value = instructorToEdit.lastName;
          email.value = instructorToEdit.email;
          phone.value = instructorToEdit.phone;
          UI.instructorToEditCourses = instructorToEdit.courses || [];
        }
      } else if (type === "courses") {
        formHeading.textContent = "Edit course";
        const courseCollection = JSON.parse(localStorage.getItem("courses"));
        const courseToEdit = courseCollection.find(course => course.id === id);
        if (courseToEdit) {
          courseName.value = courseToEdit.courseName;
          courseCode.value = courseToEdit.courseCode;
          UI.courseToEditStudents = courseToEdit.students || [];
          UI.courseToEditInstructor = courseToEdit.instructor || [];
        }
      }
      UI.currentEditId = id;
    }, 0);
  }

  static openAssignModal(target, id) {
    assignModal.classList.add("assign-modal--display");
    UI.renderAssignContent(target, id);
  }

  static closeAssignModal() {
    assignModal.classList.remove("assign-modal--display");
  }

  static renderAssignContent(target, id) {
    assignModalHeader.innerHTML = "";
    assignModalBody.innerHTML = "";
    assignModalFooter.innerHTML = "";

    //creating elements
    const assignModalHeading = document.createElement("h2");
    if (target === "students") {
      assignModalHeading.textContent = "Add student to course";
    } else if (target === "instructors") {
      assignModalHeading.textContent = "Add instructor to course";
    }

    const latestCourses = JSON.parse(localStorage.getItem("courses")) || [];

    const latestStudents = JSON.parse(localStorage.getItem("students")) || [];
    const currentStudent = latestStudents.find(student => student.id === id);

    const latestInstructors = JSON.parse(localStorage.getItem("instructors")) || [];
    const currentInstructor = latestInstructors.find(instructor => instructor.id === id);

    const availableCourses = latestCourses.filter((course) => {
      if (target === "students") {
        return !currentStudent.courses.includes(course.id);
      }
      if (target === "instructors") {
        return !currentInstructor.courses.includes(course.id);
      }
    });

    if (availableCourses.length === 0) {
        const noCoursesMessage = document.createElement("p");
        noCoursesMessage.textContent = "No available courses";
        assignModalBody.append(noCoursesMessage);
    }

    availableCourses.forEach((course) => {
      const courseItem = document.createElement("li");
      courseItem.classList.add("course-item");

      const courseTitle = document.createElement("p");
      courseTitle.textContent = course.courseName;

      const assignButton = document.createElement("button");
      assignButton.textContent = "Add";
      assignButton.classList.add("assign-button");

      // Appending
      assignModalBody.append(courseItem);
      courseItem.append(courseTitle, assignButton);

      // Add event listeners
      assignButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (target === "students") {
          if (course.students.length >= 30) {
            alert("This course already has the maximum number of students");
            return;
          };
          course.students.push(currentStudent);
          currentStudent.courses.push(course.id);
          localStorage.setItem("students", JSON.stringify(latestStudents));
          localStorage.setItem("courses", JSON.stringify(latestCourses));
          UI.renderAssignContent(target, currentStudent.id);
        } else if (target === "instructors") {
          course.instructor.push(currentInstructor);
          currentInstructor.courses.push(course.id);
          localStorage.setItem("instructors", JSON.stringify(latestInstructors));
          localStorage.setItem("courses", JSON.stringify(latestCourses));
        }

        UI.closeAssignModal();
        UI.renderStudents(latestStudents, target);
        UI.renderInstructors(latestInstructors, target);
      });
    });

    const assignModalCloseButton = document.createElement("button");
    assignModalCloseButton.classList.add("cancel-button");
    assignModalCloseButton.textContent = "Cancel";

    //appending
    assignModalHeader.append(assignModalHeading);
    assignModalFooter.append(assignModalCloseButton);

    assignModalCloseButton.addEventListener("click", () => {
      UI.closeAssignModal();
    });
  }

  // Render form based on data-target
  static renderForm(formModal, formHeader, formBody, formFooter, target) {
    formHeader.innerHTML = "";
    formBody.innerHTML = "";
    formFooter.innerHTML = "";

    if (target === "students") {
      // Creating Elements
      const studentFormHeading = document.createElement("h2");
      studentFormHeading.textContent = "Add New Student";
      studentFormHeading.classList.add("form-header");

      const studentFirstNameContainer = document.createElement("div");
      studentFirstNameContainer.classList.add("form-group");
      const studentLastNameContainer = document.createElement("div");
      studentLastNameContainer.classList.add("form-group");
      const studentEmailContainer = document.createElement("div");
      studentEmailContainer.classList.add("form-group");
      const studentPhoneContainer = document.createElement("div");
      studentPhoneContainer.classList.add("form-group");

      const studentFirstNameLabel = document.createElement("label");
      studentFirstNameLabel.textContent = "Enter First Name";
      const studentFirstNameInput = document.createElement("input");
      studentFirstNameInput.classList.add("input");
      studentFirstNameInput.setAttribute("type", "text");
      studentFirstNameInput.setAttribute("name", "firstName");
      studentFirstNameInput.setAttribute("id", "firstName");

      const studentLastNameLabel = document.createElement("label");
      studentLastNameLabel.textContent = "Enter Last Name";
      const studentLastNameInput = document.createElement("input");
      studentLastNameInput.classList.add("input");
      studentLastNameInput.setAttribute("type", "text");
      studentLastNameInput.setAttribute("name", "lastName");
      studentLastNameInput.setAttribute("id", "lastName");

      const studentEmailLabel = document.createElement("label");
      studentEmailLabel.textContent = "Enter Email";
      const studentEmailInput = document.createElement("input");
      studentEmailInput.classList.add("input");
      studentEmailInput.setAttribute("type", "email");
      studentEmailInput.setAttribute("name", "email");
      studentEmailInput.setAttribute("id", "email");

      const studentPhoneLabel = document.createElement("label");
      studentPhoneLabel.textContent = "Enter Phone Number";
      const studentPhoneInput = document.createElement("input");
      studentPhoneInput.classList.add("input");
      studentPhoneInput.setAttribute("type", "tel");
      studentPhoneInput.setAttribute("name", "phone");
      studentPhoneInput.setAttribute("id", "phone");

      const studentSubmitButton = document.createElement("button");
      studentSubmitButton.textContent = "Register Student";
      studentSubmitButton.classList.add("submit-button");

      studentSubmitButton.setAttribute("id", "submit");
      studentSubmitButton.setAttribute("data-target", "students");

      const formModalClose = document.createElement("button");
      formModalClose.textContent = "Cancel Registration";
      formModalClose.classList.add("cancel-button");
      formModalClose.setAttribute("type", "button");

      // Appending elements
      formHeader.append(studentFormHeading);
      formBody.append(
        studentFirstNameContainer,
        studentLastNameContainer,
        studentEmailContainer,
        studentPhoneContainer
      );
      studentFirstNameContainer.append(
        studentFirstNameLabel,
        studentFirstNameInput
      );
      studentLastNameContainer.append(
        studentLastNameLabel,
        studentLastNameInput
      );
      studentEmailContainer.append(studentEmailLabel, studentEmailInput);
      studentPhoneContainer.append(studentPhoneLabel, studentPhoneInput);

      formFooter.append(studentSubmitButton, formModalClose);

      // Add event listeners
      studentSubmitButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (!Validation.validateForm("students", validationMessage)) {
          return;
        }
        if (!UI.currentEditId) {
          StudentManager.addStudent(
            studentFirstNameInput.value.trim(),
            studentLastNameInput.value.trim(),
            studentEmailInput.value.trim(),
            studentPhoneInput.value.trim()
          );
        } else {
          StudentManager.editStudent(
            UI.currentEditId,
            studentFirstNameInput.value.trim(),
            studentLastNameInput.value.trim(),
            studentEmailInput.value.trim(),
            studentPhoneInput.value.trim(),
            UI.studentToEditCourses
          );
          UI.currentEditId = null;
          formModal.classList.remove("form-modal--display");
        }
        UI.renderStudents();
      });

      formModalClose.addEventListener("click", (e) => {
        UI.closeAddModal(formModal);
        validationMessage.style.display = "none";
        UI.currentEditId = null;
      });
    } else if (target === "instructors") {
      // Creating elements
      const instructorFormHeading = document.createElement("h2");
      instructorFormHeading.textContent = "Add New Instructor";
      instructorFormHeading.classList.add("form-header");

      const instructorFirstNameContainer = document.createElement("div");
      instructorFirstNameContainer.classList.add("form-group");
      const instructorLastNameContainer = document.createElement("div");
      instructorLastNameContainer.classList.add("form-group");
      const instructorEmailContainer = document.createElement("div");
      instructorEmailContainer.classList.add("form-group");
      const instructorPhoneContainer = document.createElement("div");
      instructorPhoneContainer.classList.add("form-group");

      const instructorFirstNameLabel = document.createElement("label");
      instructorFirstNameLabel.textContent = "Enter First Name";
      const instructorFirstNameInput = document.createElement("input");
      instructorFirstNameInput.classList.add("input");
      instructorFirstNameInput.setAttribute("type", "text");
      instructorFirstNameInput.setAttribute("name", "firstName");
      instructorFirstNameInput.setAttribute("id", "firstName");

      const instructorLastNameLabel = document.createElement("label");
      instructorLastNameLabel.textContent = "Enter Last Name";
      const instructorLastNameInput = document.createElement("input");
      instructorLastNameInput.classList.add("input");
      instructorLastNameInput.setAttribute("type", "text");
      instructorLastNameInput.setAttribute("name", "lastName");
      instructorLastNameInput.setAttribute("id", "lastName");

      const instructorEmailLabel = document.createElement("label");
      instructorEmailLabel.textContent = "Enter Email";
      const instructorEmailInput = document.createElement("input");
      instructorEmailInput.classList.add("input");
      instructorEmailInput.setAttribute("type", "email");
      instructorEmailInput.setAttribute("name", "email");
      instructorEmailInput.setAttribute("id", "email");

      const instructorPhoneLabel = document.createElement("label");
      instructorPhoneLabel.textContent = "Enter Phone Number";
      const instructorPhoneInput = document.createElement("input");
      instructorPhoneInput.classList.add("input");
      instructorPhoneInput.setAttribute("type", "tel");
      instructorPhoneInput.setAttribute("name", "phone");
      instructorPhoneInput.setAttribute("id", "phone");

      const instructorSubmitButton = document.createElement("button");
      instructorSubmitButton.textContent = "Register Instructor";
      instructorSubmitButton.classList.add("submit-button");

      instructorSubmitButton.setAttribute("id", "submit");
      instructorSubmitButton.setAttribute("data-target", "instructors");

      const formModalClose = document.createElement("button");
      formModalClose.textContent = "Cancel Registration";
      formModalClose.classList.add("cancel-button");
      formModalClose.setAttribute("type", "button");

      // Appending elements
      formHeader.append(instructorFormHeading);
      formBody.append(
        instructorFirstNameContainer,
        instructorLastNameContainer,
        instructorEmailContainer,
        instructorPhoneContainer
      );
      instructorFirstNameContainer.append(
        instructorFirstNameLabel,
        instructorFirstNameInput
      );
      instructorLastNameContainer.append(
        instructorLastNameLabel,
        instructorLastNameInput
      );
      instructorEmailContainer.append(
        instructorEmailLabel,
        instructorEmailInput
      );
      instructorPhoneContainer.append(
        instructorPhoneLabel,
        instructorPhoneInput
      );

      formFooter.append(instructorSubmitButton, formModalClose);

      // Add event listeners
      instructorSubmitButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (!Validation.validateForm("instructor", validationMessage)) {
          return;
        }
        if (!UI.currentEditId) {
          InstructorManager.addInstructor(
            instructorFirstNameInput.value.trim(),
            instructorLastNameInput.value.trim(),
            instructorEmailInput.value.trim(),
            instructorPhoneInput.value.trim()
          );
        } else {
          InstructorManager.editInstructor(
            UI.currentEditId,
            instructorFirstNameInput.value.trim(),
            instructorLastNameInput.value.trim(),
            instructorEmailInput.value.trim(),
            instructorPhoneInput.value.trim(),
            UI.instructorToEditCourses
          );
          UI.currentEditId = null;
          formModal.classList.remove("form-modal--display");
        }
        UI.renderInstructors();
      });

      formModalClose.addEventListener("click", () => {
        UI.closeAddModal(formModal);
        validationMessage.style.display = "none";
        UI.currentEditId = null;
      });
    } else if (target === "courses") {
      // Creating elements
      const courseFormHeading = document.createElement("h2");
      courseFormHeading.textContent = "Add New Course";
      courseFormHeading.classList.add("form-header");

      const courseNameContainer = document.createElement("div");
      courseNameContainer.classList.add("form-group");
      const courseCodeContainer = document.createElement("div");
      courseCodeContainer.classList.add("form-group");

      const courseNameLabel = document.createElement("label");
      courseNameLabel.textContent = "Enter Course Name";
      const courseNameInput = document.createElement("input");
      courseNameInput.classList.add("input");
      courseNameInput.setAttribute("type", "text");
      courseNameInput.setAttribute("name", "courseName");
      courseNameInput.setAttribute("id", "courseName");

      const courseCodeLabel = document.createElement("label");
      courseCodeLabel.textContent = "Enter Course Code";
      const courseCodeInput = document.createElement("input");
      courseCodeInput.classList.add("input");
      courseCodeInput.setAttribute("type", "text");
      courseCodeInput.setAttribute("name", "courseCode");
      courseCodeInput.setAttribute("id", "courseCode");

      const courseSubmitButton = document.createElement("button");
      courseSubmitButton.textContent = "Create Course";
      courseSubmitButton.classList.add("submit-button");

      courseSubmitButton.setAttribute("id", "submit");
      courseSubmitButton.setAttribute("data-target", "courses");

      const formModalClose = document.createElement("button");
      formModalClose.textContent = "Cancel Course Creation";
      formModalClose.classList.add("cancel-button");
      formModalClose.setAttribute("type", "button");

      // Appending elements
      formHeader.append(courseFormHeading);
      formBody.append(courseNameContainer, courseCodeContainer);
      courseNameContainer.append(courseNameLabel, courseNameInput);
      courseCodeContainer.append(courseCodeLabel, courseCodeInput);

      formFooter.append(courseSubmitButton, formModalClose);

      // Add event listeners
      courseSubmitButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (!Validation.validateForm("course", validationMessage)) {
          return;
        }
        if (!UI.currentEditId) {
          CourseManager.addCourse(
            courseNameInput.value.trim(),
            courseCodeInput.value.trim()
          );
        } else {
          CourseManager.editCourse(
            UI.currentEditId,
            courseNameInput.value.trim(),
            courseCodeInput.value.trim(),
            UI.courseToEditStudents,
            UI.courseToEditInstructor
          );
          UI.currentEditId = null;
          formModal.classList.remove("form-modal--display");
        }
        UI.renderCourses();
      });

      formModalClose.addEventListener("click", () => {
        UI.closeAddModal(formModal);
        validationMessage.style.display = "none";
        UI.currentEditId = null;
      });
    }
  }

  // Render student list
  static renderStudents(
    studentsCollection = JSON.parse(localStorage.getItem("students")) || [],
    target
  ) {
    studentList.innerHTML = "";
    studentsCollection.forEach((student) => {
      // Creating elements
      const studentCard = document.createElement("li");
      studentCard.classList.add("list-item");

      const studentInformationContainer = document.createElement("div");
      studentInformationContainer.classList.add(
        "list-item__information-container"
      );
      const studentEnrollmentContainer = document.createElement("div");
      studentEnrollmentContainer.classList.add(
        "list-item__enrollment-container"
      );

      const studentInformationContent = document.createElement("div");
      studentInformationContent.classList.add("list-item__information");
      const studentInformationTools = document.createElement("div");
      studentInformationTools.classList.add("list-item__tools");

      const studentEnrollmentContent = document.createElement("div");
      studentEnrollmentContent.classList.add("list-item__information");
      const studentEnrollmentTools = document.createElement("div");
      studentEnrollmentTools.classList.add("list-item__tools");

      const studentFirstName = document.createElement("p");
      studentFirstName.textContent = `First Name: ${student.firstName}`;
      const studentLastName = document.createElement("p");
      studentLastName.textContent = `Last Name: ${student.lastName}`;
      const studentEmail = document.createElement("p");
      studentEmail.textContent = `E-mail: ${student.email}`;
      const studentPhone = document.createElement("p");
      studentPhone.textContent = `Phone Number: ${student.phone}`;

      const editStudentButton = document.createElement("button");
      editStudentButton.textContent = "edit";
      const deleteStudentButton = document.createElement("button");
      deleteStudentButton.textContent = "delete";
      const studentEnrollmentButton = document.createElement("button");

      if (student.courses && student.courses.length < 3) {
        const selectedCourse = document.createElement("p");
        selectedCourse.textContent = `Currently enrolled in ${student.courses.length} courses`;
        studentEnrollmentContent.append(selectedCourse);
        studentEnrollmentTools.append(studentEnrollmentButton);
        studentEnrollmentButton.textContent = "Assign to course";
      } else if (student.courses.length >= 3) {
        const studentEnrollmentMessage = document.createElement("p");
        studentEnrollmentMessage.textContent =
          "Already assigned to maximum amount of courses.";
        studentEnrollmentContainer.append(studentEnrollmentMessage);
        studentEnrollmentButton.style.display = "none";
      }
      // Appending elements
      studentList.append(studentCard);

      studentCard.append(
        studentInformationContainer,
        studentEnrollmentContainer
      );

      studentInformationContainer.append(
        studentInformationContent,
        studentInformationTools
      );
      studentEnrollmentContainer.append(
        studentEnrollmentContent,
        studentEnrollmentTools
      );

      studentInformationContent.append(
        studentFirstName,
        studentLastName,
        studentEmail,
        studentPhone
      );
      studentInformationTools.append(editStudentButton, deleteStudentButton);

      // Add event listeners
      deleteStudentButton.addEventListener("click", () => {
        UI.openDeleteModal(
          student.id,
          "student",
          student.firstName,
          student.lastName
        );
      });

      editStudentButton.addEventListener("click", () => {
        UI.openEditModal();
        UI.renderForm(
          document.querySelector(".form-modal"),
          document.querySelector(".form-header"),
          document.querySelector(".form-body"),
          document.querySelector(".form-footer"),
          "students"
        );
        setTimeout(() => {
          UI.populateEditForm(student.id, "students");
        }, 0);
      });

      studentEnrollmentButton.addEventListener("click", () => {
        UI.openAssignModal(target, student.id);
      });
    });
  }

  // Render instructor list
  static renderInstructors(
    instructorsCollection = JSON.parse(localStorage.getItem("instructors")) ||
      [],
    target
  ) {
    instructorList.innerHTML = "";
    if (instructorsCollection) {
      instructorsCollection.forEach((instructor) => {
        // Creating elements
        const instructorCard = document.createElement("li");
        instructorCard.classList.add("list-item");

        const instructorInformationContainer = document.createElement("div");
        instructorInformationContainer.classList.add(
          "list-item__information-container"
        );
        const instructorEnrollmentContainer = document.createElement("div");
        instructorEnrollmentContainer.classList.add(
          "list-item__enrollment-container"
        );

        const instructorInformationContent = document.createElement("div");
        instructorInformationContent.classList.add("list-item__information");
        const instructorInformationTools = document.createElement("div");
        instructorInformationTools.classList.add("list-item__tools");

        const instructorEnrollmentContent = document.createElement("div");
        instructorEnrollmentContent.classList.add("list-item__information");
        const instructorEnrollmentTools = document.createElement("div");
        instructorEnrollmentTools.classList.add("list-item__tools");

        const instructorFirstName = document.createElement("p");
        instructorFirstName.textContent = `First Name: ${instructor.firstName}`;
        const instructorLastName = document.createElement("p");
        instructorLastName.textContent = `Last Name: ${instructor.lastName}`;
        const instructorEmail = document.createElement("p");
        instructorEmail.textContent = `E-mail: ${instructor.email}`;
        const instructorPhone = document.createElement("p");
        instructorPhone.textContent = `Phone number: ${instructor.phone}`;

        const editInstructorButton = document.createElement("button");
        editInstructorButton.textContent = "edit";
        const deleteInstructorButton = document.createElement("button");
        deleteInstructorButton.textContent = "delete";
        const instructorEnrollmentButton = document.createElement("button");

        if (instructor.courses && instructor.courses.length < 5) {
          const selectedCourse = document.createElement("p");
          selectedCourse.textContent = `Currently assigned to ${instructor.courses.length} courses`;
          instructorEnrollmentContent.append(selectedCourse);
          instructorEnrollmentTools.append(instructorEnrollmentButton);
          instructorEnrollmentButton.textContent = "Assign to course";
        } else if (instructor.courses.length >= 5) {
          const instructorEnrollmentMessage = document.createElement("p");
          instructorEnrollmentMessage.textContent =
            "Already assigned to maximum amount of courses";
          instructorEnrollmentContainer.append(instructorEnrollmentMessage);
          instructorEnrollmentButton.style.display = "none";
        }

        // Appending elements
        instructorList.append(instructorCard);

        instructorCard.append(
          instructorInformationContainer,
          instructorEnrollmentContainer
        );

        instructorInformationContainer.append(
          instructorInformationContent,
          instructorInformationTools
        );
        instructorEnrollmentContainer.append(
          instructorEnrollmentContent,
          instructorEnrollmentTools
        );

        instructorInformationContent.append(
          instructorFirstName,
          instructorLastName,
          instructorEmail,
          instructorPhone
        );
        instructorInformationTools.append(
          editInstructorButton,
          deleteInstructorButton
        );

        // Add event listeners
        deleteInstructorButton.addEventListener("click", () => {
          UI.openDeleteModal(
            instructor.id,
            "instructor",
            instructor.firstName,
            instructor.lastName
          );
        });

        instructorEnrollmentButton.addEventListener("click", () => {
          UI.openAssignModal(target, instructor.id);
        });

        editInstructorButton.addEventListener("click", () => {
          UI.openEditModal();
          UI.renderForm(
            document.querySelector(".form-modal"),
            document.querySelector(".form-header"),
            document.querySelector(".form-body"),
            document.querySelector(".form-footer"),
            "instructors"
          );
          setTimeout(() => {
            UI.populateEditForm(instructor.id, "instructors");
          }, 0);
        });
      });
    }
  }

  // Render course list
  static renderCourses(
    coursesCollection = JSON.parse(localStorage.getItem("courses")) || []
  ) {
    courseList.innerHTML = "";
    coursesCollection.forEach((course) => {
      // Creating elements
      const courseCard = document.createElement("li");
      courseCard.classList.add("list-item");

      const courseInformationContainer = document.createElement("div");
      courseInformationContainer.classList.add(
        "list-item__information-container"
      );
      const courseEnrollmentContainer = document.createElement("div");
      courseEnrollmentContainer.classList.add(
        "list-item__enrollment-container"
      );

      const courseInformationContent = document.createElement("div");
      courseInformationContent.classList.add("list-item__information");
      const courseInformationTools = document.createElement("div");
      courseInformationTools.classList.add("list-item__tools");

      const courseEnrollmentContent = document.createElement("div");
      const courseEnrollmentTools = document.createElement("div");

      const courseName = document.createElement("p");
      courseName.textContent = `Course Name: ${course.courseName}`;
      const courseCode = document.createElement("p");
      courseCode.textContent = `Course Code: ${course.courseCode}`;

      const editCourseButton = document.createElement("button");
      editCourseButton.textContent = "edit";
      const deleteCourseButton = document.createElement("button");
      deleteCourseButton.textContent = "delete";

      if (course.students || course.instructor) {
        const courseStudentsAmount = document.createElement("p");
        courseStudentsAmount.textContent = `There are currently ${course.students.length} students enrolled in this class`;
        const courseInstructorAmount = document.createElement("p");
        courseInstructorAmount.textContent = `There is ${course.instructor.length} instructors assigned to this course`;
        courseEnrollmentContent.append(
          courseStudentsAmount,
          courseInstructorAmount
        );
      }

      // Appending elements
      courseList.append(courseCard);

      courseCard.append(courseInformationContainer, courseEnrollmentContainer);

      courseInformationContainer.append(
        courseInformationContent,
        courseInformationTools
      );
      courseEnrollmentContainer.append(
        courseEnrollmentContent,
        courseEnrollmentTools
      );

      courseInformationContent.append(courseName, courseCode);
      courseInformationTools.append(editCourseButton, deleteCourseButton);

      // Add event listeners
      deleteCourseButton.addEventListener("click", () => {
        UI.openDeleteModal(course.id, "course");
      });

      editCourseButton.addEventListener("click", () => {
        UI.openEditModal();
        UI.renderForm(
          document.querySelector(".form-modal"),
          document.querySelector(".form-header"),
          document.querySelector(".form-body"),
          document.querySelector(".form-footer"),
          "courses"
        );
        setTimeout(() => {
          UI.populateEditForm(course.id, "courses");
        }, 0);
      });
    });
  }
}

export default UI;