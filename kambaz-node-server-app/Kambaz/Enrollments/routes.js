import Database from "../Database/index.js";
export default function EnrollmentRoutes(app) {
  app.get("/api/users/:userId/courses", (req, res) => {
    const { userId } = req.params;
    const enrolledCourseIds = Database.enrollments
      .filter((e) => e.user === userId)
      .map((e) => e.course);
    const courses = Database.courses.filter((c) =>
      enrolledCourseIds.includes(c._id)
    );
    res.json(courses);
  });
  app.post("/api/enrollments", (req, res) => {
    const enrollment = {
      ...req.body,
      _id: new Date().getTime().toString(),
    };
    Database.enrollments.push(enrollment);
    res.json(enrollment);
  });
  app.delete("/api/enrollments/:enrollmentId", (req, res) => {
    const { enrollmentId } = req.params;
    Database.enrollments = Database.enrollments.filter(
      (e) => e._id !== enrollmentId
    );
    res.sendStatus(204);
  });
}
