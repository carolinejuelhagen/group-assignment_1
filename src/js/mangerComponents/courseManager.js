import Course from "../course.js";

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
}
export default CourseManager;
