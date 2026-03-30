import Database from "../Database/index.js";
export default function CourseRoutes(app) {
  app.get("/api/courses", (req, res) => {
    res.json(Database.courses);
  });
  app.get("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const course = Database.courses.find((c) => c._id === courseId);
    res.json(course);
  });
  app.post("/api/courses", (req, res) => {
    const course = { ...req.body, _id: new Date().getTime().toString() };
    Database.courses.push(course);
    res.json(course);
  });
  app.put("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    Database.courses = Database.courses.map((c) =>
      c._id === courseId ? { ...c, ...req.body } : c
    );
    res.sendStatus(204);
  });
  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    Database.courses = Database.courses.filter((c) => c._id !== courseId);
    res.sendStatus(204);
  });

  // Modules for a course
  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = Database.modules.filter((m) => m.course === courseId);
    res.json(modules);
  });
  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      _id: new Date().getTime().toString(),
      course: courseId,
    };
    Database.modules.push(module);
    res.json(module);
  });

  // Assignments for a course
  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignments = Database.assignments.filter(
      (a) => a.course === courseId
    );
    res.json(assignments);
  });
  app.post("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      _id: new Date().getTime().toString(),
      course: courseId,
    };
    Database.assignments.push(assignment);
    res.json(assignment);
  });
}
