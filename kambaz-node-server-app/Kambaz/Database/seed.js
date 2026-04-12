import userModel from "../Users/model.js";
import courseModel from "../Courses/model.js";
import assignmentModel from "../Assignments/model.js";
import enrollmentModel from "../Enrollments/model.js";
import courses from "./courses.js";
import modules from "./modules.js";
import assignments from "./assignments.js";

const seedUsers = [
  { _id: "u1", username: "iron_man", password: "stark123", firstName: "Tony", lastName: "Stark", email: "tony@stark.com", role: "FACULTY", loginId: "001234561S", section: "S101" },
  { _id: "u2", username: "dark_knight", password: "wayne234", firstName: "Bruce", lastName: "Wayne", email: "bruce@wayne.com", role: "STUDENT", loginId: "001234562S", section: "S101" },
  { _id: "u3", username: "cap_america", password: "rogers345", firstName: "Steve", lastName: "Rogers", email: "steve@avengers.com", role: "STUDENT", loginId: "001234563S", section: "S101" },
  { _id: "u4", username: "black_widow", password: "romanoff456", firstName: "Natasha", lastName: "Romanoff", email: "natasha@avengers.com", role: "TA", loginId: "001234564S", section: "S101" },
  { _id: "u5", username: "thor_odinson", password: "thor567", firstName: "Thor", lastName: "Odinson", email: "thor@asgard.com", role: "STUDENT", loginId: "001234565S", section: "S102" },
  { _id: "u6", username: "ring_bearer", password: "baggins678", firstName: "Frodo", lastName: "Baggins", email: "frodo@shire.com", role: "STUDENT", loginId: "001234566S", section: "S102" },
  { _id: "u7", username: "wizard_grey", password: "gandalf789", firstName: "Gandalf", lastName: "Grey", email: "gandalf@middleearth.com", role: "FACULTY", loginId: "001234567S", section: "S101" },
  { _id: "u8", username: "admin", password: "admin", firstName: "Admin", lastName: "User", email: "admin@kambaz.com", role: "ADMIN", loginId: "0000ADMIN", section: "S100" },
];

export default async function seed() {
  const userCount = await userModel.estimatedDocumentCount();
  if (userCount === 0) {
    await userModel.insertMany(seedUsers);
    console.log("Seeded users");
  }

  const courseCount = await courseModel.estimatedDocumentCount();
  if (courseCount === 0) {
    const coursesWithModules = courses.map((c) => ({
      ...c,
      modules: modules.filter((m) => m.course === c._id),
    }));
    await courseModel.insertMany(coursesWithModules);
    console.log("Seeded courses with modules");
  }

  const assignmentCount = await assignmentModel.estimatedDocumentCount();
  if (assignmentCount === 0) {
    await assignmentModel.insertMany(assignments);
    console.log("Seeded assignments");
  }

  const enrollmentCount = await enrollmentModel.estimatedDocumentCount();
  if (enrollmentCount === 0) {
    const seedEnrollments = [
      { _id: "u1-RS101", user: "u1", course: "RS101" },
      { _id: "u1-RS102", user: "u1", course: "RS102" },
      { _id: "u2-RS101", user: "u2", course: "RS101" },
      { _id: "u2-RS102", user: "u2", course: "RS102" },
      { _id: "u3-RS101", user: "u3", course: "RS101" },
      { _id: "u4-RS101", user: "u4", course: "RS101" },
      { _id: "u5-RS102", user: "u5", course: "RS102" },
    ];
    await enrollmentModel.insertMany(seedEnrollments);
    console.log("Seeded enrollments");
  }
}
