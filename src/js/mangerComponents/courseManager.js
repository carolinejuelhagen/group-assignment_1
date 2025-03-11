import Course from "../course.js";
import UI from "../ui.js";

class CourseManager {
  static courseCollection = JSON.parse(localStorage.getItem("courses")) || [];

  static addCourse(courseName, courseCode) {
    const latestCourseCollection =
      JSON.parse(localStorage.getItem("courses")) || [];
    let course = new Course(courseName, courseCode);
    latestCourseCollection.push(course);
    CourseManager.storeCourses(latestCourseCollection);
    CourseManager.courseCollection = latestCourseCollection;
  }

  static storeCourses(collection) {
    localStorage.setItem("courses", JSON.stringify(collection));
  }

  static deleteCourse(id) {
    const lastestCourseCollection =
      JSON.parse(localStorage.getItem("courses")) || [];
    CourseManager.courseCollection = lastestCourseCollection.filter((course) => {
      return course.id !== id;
    });

    CourseManager.storeCourses(CourseManager.courseCollection);
    UI.renderCourses();
  }
}
export default CourseManager;
