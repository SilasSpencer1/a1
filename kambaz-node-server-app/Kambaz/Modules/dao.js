import { v4 as uuidv4 } from "uuid";
import courseModel from "../Courses/model.js";

export async function findModulesForCourse(courseId) {
  const course = await courseModel.findById(courseId);
  return course ? course.modules : [];
}

export async function createModule(courseId, module) {
  const newModule = {
    ...module,
    _id: uuidv4(),
    lessons: module.lessons || [],
  };
  await courseModel.updateOne(
    { _id: courseId },
    { $push: { modules: newModule } }
  );
  return newModule;
}

export async function deleteModule(courseId, moduleId) {
  return courseModel.updateOne(
    { _id: courseId },
    { $pull: { modules: { _id: moduleId } } }
  );
}

export async function updateModule(courseId, moduleId, moduleUpdates) {
  const course = await courseModel.findById(courseId);
  if (!course) return null;
  const mod = course.modules.id(moduleId);
  if (!mod) return null;
  Object.assign(mod, moduleUpdates);
  await course.save();
  return mod;
}
