import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
  });

  app.get("/api/courses/:courseId", async (req, res) => {
    const course = await dao.findCourseById(req.params.courseId);
    res.json(course);
  });

  app.put("/api/courses/:courseId", async (req, res) => {
    const status = await dao.updateCourse(req.params.courseId, req.body);
    res.send(status);
  });

  app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    await enrollmentsDao.unenrollAllUsersFromCourse(courseId);
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  });

  // Modules for a course
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const modules = await modulesDao.findModulesForCourse(req.params.courseId);
    res.json(modules);
  });

  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const newModule = await modulesDao.createModule(
      req.params.courseId,
      req.body
    );
    res.json(newModule);
  });

  // Assignments for a course
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const assignments = await assignmentsDao.findAssignmentsForCourse(
      req.params.courseId
    );
    res.json(assignments);
  });

  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    const newAssignment = await assignmentsDao.createAssignment(
      req.params.courseId,
      req.body
    );
    res.json(newAssignment);
  });

  // Users enrolled in a course
  app.get("/api/courses/:courseId/users", async (req, res) => {
    const users = await enrollmentsDao.findUsersForCourse(req.params.courseId);
    res.json(users);
  });
}
