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

  static openAddModal(formModal, target) {
    formModal.classList.add("form-modal--display");
  }

  static closeAddModal(formModal) {
    formModal.classList.remove("form-modal--display");
  }
}

export default UI;
