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

  static closeAddModal() {}
}

export default UI;
