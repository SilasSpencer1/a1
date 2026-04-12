import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export function findAllCourses() {
  return model.find({}, { name: 1, description: 1, number: 1, image: 1 });
}
export function findCourseById(courseId) {
  return model.findById(courseId);
}
export function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4(), modules: [] };
  return model.create(newCourse);
}
export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
}
export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}
