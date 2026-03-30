import Database from "../Database/index.js";
export default function AssignmentRoutes(app) {
  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    Database.assignments = Database.assignments.map((a) =>
      a._id === assignmentId ? { ...a, ...req.body } : a
    );
    res.sendStatus(204);
  });
  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    Database.assignments = Database.assignments.filter(
      (a) => a._id !== assignmentId
    );
    res.sendStatus(204);
  });
}
