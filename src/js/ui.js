import StudentManager from "./mangerComponents/studentManager.js";
import InstructorManager from "./mangerComponents/instructorManager.js";
import CourseManager from "./mangerComponents/courseManager.js";

const studentList = document.querySelector(".students-list");
const instructorList = document.querySelector(".instructors-list");
const courseList = document.querySelector(".courses-list");

class UI {
  currentEditId = null;

  static handleToggleSection(contentSections, target) {
    contentSections.forEach((section) => {
      if (section.id === target) {
        section.classList.add("content-section--active");
      } else {
        section.classList.remove("content-section--active");
      }
    });
  }

  static openAddModal(formModal, formHeader, formBody, formFooter, target) {
    formModal.classList.add("form-modal--display");

    UI.renderForm(formModal, formHeader, formBody, formFooter, target);
  }

  static closeAddModal(formModal) {
    formModal.classList.remove("form-modal--display");
  }

  static renderForm(formModal, formHeader, formBody, formFooter, target) {
    formHeader.innerHTML = "";
    formBody.innerHTML = "";
    formFooter.innerHTML = "";

    if (target === "students") {
      //creating Elements
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

      //appending elements

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

      //Adding event listeners
      formModalClose.addEventListener("click", (e) => {
        UI.closeAddModal(formModal);
      });
      studentSubmitButton.addEventListener("click", (e) => {
        e.preventDefault();

        StudentManager.addStudent(
          studentFirstNameInput.value.trim(),
          studentLastNameInput.value.trim(),
          studentEmailInput.value.trim(),
          studentPhoneInput.value.trim()
        );
      });
    } else if (target === "instructors") {
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

      //adding event listeners
      instructorSubmitButton.addEventListener("click", (e) => {
        e.preventDefault();
        InstructorManager.addInstructor(
          instructorFirstNameInput.value.trim(),
          instructorLastNameInput.value.trim(),
          instructorEmailInput.value.trim(),
          instructorPhoneInput.value.trim()
        );
      });

      formModalClose.addEventListener("click", () => {
        UI.closeAddModal(formModal);
      });
    } else if (target === "courses") {
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

      formHeader.append(courseFormHeading);
      formBody.append(courseNameContainer, courseCodeContainer);
      courseNameContainer.append(courseNameLabel, courseNameInput);
      courseCodeContainer.append(courseCodeLabel, courseCodeInput);

      formFooter.append(courseSubmitButton, formModalClose);

      //Adding event listeners

      courseSubmitButton.addEventListener("click", (e) => {
        e.preventDefault();
        CourseManager.addCourse(
          courseNameInput.value.trim(),
          courseCodeInput.value.trim()
        );
      });

      formModalClose.addEventListener("click", () => {
        UI.closeAddModal(formModal);
      });
    }
  }

  static renderStudents(studentsCollection) {
    studentList.innerHTML = "";
    studentsCollection.forEach((student) => {
      //Creating content
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
      studentInformationContent.classList.add("list-iten__information");
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
      const studentId = document.createElement("p");
      studentId.textContent = `Student ID: ${student.studentId}`;

      const editStudentButton = document.createElement("button");
      editStudentButton.textContent = "edit";
      const deleteStudentButton = document.createElement("button");
      deleteStudentButton.textContent = "delete";

      student.courses.forEach((course) => {
        const selectedCourse = document.createElement("p");
        selectedCourse.textContent = course.courseName + course.courseCode;
        studentEnrollmentContent.append(selectedCourse);
      });

      const studentEnrollmentButton = document.createElement("button");
      studentEnrollmentButton.textContent = "Assign to course";

      //appending elements

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
        studentPhone,
        studentId
      );
      studentInformationTools.append(editStudentButton, deleteStudentButton);
      studentEnrollmentTools.append(studentEnrollmentButton);
    });
  }

  static renderInstructors(instructorsCollection) {
    instructorList.innerHTML = "";
    instructorsCollection.forEach((instructor) => {
      //Creating content
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
      const instructorId = document.createElement("p");
      instructorId.textContent = `Faculty ID: ${instructor.instructorId}`;

      const editInstructorButton = document.createElement("button");
      editInstructorButton.textContent = "edit";
      const deleteInstructorButton = document.createElement("button");
      deleteInstructorButton.textContent = "delete";

      instructor.courses.forEach((course) => {
        const selectedCourse = document.createElement("p");
        selectedCourse.textContent = course.courseName + course.courseCode;
        instructorEnrollmentContent.append(selectedCourse);
      });

      const instructorEnrollmentButton = document.createElement("button");
      instructorEnrollmentButton.textContent = "Assign to course";

      //appending elements

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
        instructorPhone,
        instructorId
      );
      instructorInformationTools.append(
        editInstructorButton,
        deleteInstructorButton
      );
      instructorEnrollmentTools.append(instructorEnrollmentButton);
    });
  }

  static renderCourses(coursesCollection) {
    courseList.innerHTML = "";
    coursesCollection.forEach((course) => {
      //Creating content
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

      //appending elements

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
    });
  }
}

export default UI;
