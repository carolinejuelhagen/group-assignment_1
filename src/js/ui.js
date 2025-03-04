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
      studentSubmitButton.setAttribute("type", "submit");
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
      instructorSubmitButton.setAttribute("type", "submit");
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

      formModalClose.addEventListener("click", () => {
        UI.closeAddModal(formModal);
      });
    } else if (target === "courses") {
      const courseFormHeading = document.createElement("h2");
      courseFormHeading.textContent = "Add New Course";
      courseFormHeading.classList.add("form-header");

      const courseNameContainer = document.createElement("div");
      courseNameContainer.classList.add("form-group");
      const courseDescriptionContainer = document.createElement("div");
      courseDescriptionContainer.classList.add("form-group");

      const courseNameLabel = document.createElement("label");
      courseNameLabel.textContent = "Enter Course Name";
      const courseNameInput = document.createElement("input");
      courseNameInput.classList.add("input");
      courseNameInput.setAttribute("type", "text");
      courseNameInput.setAttribute("name", "courseName");
      courseNameInput.setAttribute("id", "courseName");

      const courseDescriptionLabel = document.createElement("label");
      courseDescriptionLabel.textContent = "Enter Course Description";
      const courseDescriptionInput = document.createElement("input");
      courseDescriptionInput.classList.add("input");
      courseDescriptionInput.setAttribute("type", "text");
      courseDescriptionInput.setAttribute("name", "courseDescription");
      courseDescriptionInput.setAttribute("id", "courseDescription");

      const courseSubmitButton = document.createElement("button");
      courseSubmitButton.textContent = "Create Course";
      courseSubmitButton.classList.add("submit-button");
      courseSubmitButton.setAttribute("type", "submit");
      courseSubmitButton.setAttribute("id", "submit");
      courseSubmitButton.setAttribute("data-target", "courses");

      const formModalClose = document.createElement("button");
      formModalClose.textContent = "Cancel Course Creation";
      formModalClose.classList.add("cancel-button");
      formModalClose.setAttribute("type", "button");

      formHeader.append(courseFormHeading);
      formBody.append(courseNameContainer, courseDescriptionContainer);
      courseNameContainer.append(courseNameLabel, courseNameInput);
      courseDescriptionContainer.append(
        courseDescriptionLabel,
        courseDescriptionInput
      );

      formFooter.append(courseSubmitButton, formModalClose);

      //Adding event listeners

      formModalClose.addEventListener("click", () => {
        UI.closeAddModal(formModal);
      });
    }
  }
}

export default UI;
