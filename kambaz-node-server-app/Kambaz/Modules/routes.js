import Database from "../Database/index.js";
export default function ModuleRoutes(app) {
  app.put("/api/modules/:moduleId", (req, res) => {
    const { moduleId } = req.params;
    Database.modules = Database.modules.map((m) =>
      m._id === moduleId ? { ...m, ...req.body } : m
    );
    res.sendStatus(204);
  });
  app.delete("/api/modules/:moduleId", (req, res) => {
    const { moduleId } = req.params;
    Database.modules = Database.modules.filter((m) => m._id !== moduleId);
    res.sendStatus(204);
  });
}
