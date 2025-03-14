import Course from "../course.js";
import UI from "../ui.js";

class CourseManager {
  static courseCollection = JSON.parse(localStorage.getItem("courses")) || [];

  // Add 
  static addCourse(courseName, courseCode) {
    const latestCourseCollection =
      JSON.parse(localStorage.getItem("courses")) || [];
    let course = new Course(courseName, courseCode);
    latestCourseCollection.push(course);
    CourseManager.storeCourses(latestCourseCollection);
    CourseManager.courseCollection = latestCourseCollection;
  };

  // Store
  static storeCourses(collection) {
    localStorage.setItem("courses", JSON.stringify(collection));
  };

  // Delete
  static deleteCourse(id) {
    const lastestCourseCollection =
      JSON.parse(localStorage.getItem("courses")) || [];
    CourseManager.courseCollection = lastestCourseCollection.filter((course) => {
      return course.id !== id;
    });

    CourseManager.storeCourses(CourseManager.courseCollection);
    UI.renderCourses();
  };

  // Edit
  static editCourse(id, courseName, courseCode, students, instructor) {
    const latestCourseCollection = JSON.parse(localStorage.getItem("courses")) || [];
    const courseIndex = latestCourseCollection.findIndex(course => course.id === id);
    if (courseIndex !== -1) {
      latestCourseCollection[courseIndex] = {
        id,
        courseName,
        courseCode, 
        students, 
        instructor
      };
      CourseManager.storeCourses(latestCourseCollection);
      CourseManager.courseCollection = latestCourseCollection;
      UI.renderCourses();
    };
  };
};

export default CourseManager;