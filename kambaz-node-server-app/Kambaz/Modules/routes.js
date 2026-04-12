import * as dao from "./dao.js";

export default function ModuleRoutes(app) {
  app.put("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const { courseId } = req.body;
    const status = await dao.updateModule(courseId, moduleId, req.body);
    res.send(status);
  });

  app.delete("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const { courseId } = req.query;
    const status = await dao.deleteModule(courseId, moduleId);
    res.send(status);
  });
}
