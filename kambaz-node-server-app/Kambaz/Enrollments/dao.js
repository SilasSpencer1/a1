import model from "./model.js";

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((e) => e.course).filter(Boolean);
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((e) => e.user).filter(Boolean);
}

export function enrollUserInCourse(userId, courseId) {
  return model.create({
    _id: `${userId}-${courseId}`,
    user: userId,
    course: courseId,
  });
}

export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}

export function unenrollAllUsersFromCourse(courseId) {
  return model.deleteMany({ course: courseId });
}
