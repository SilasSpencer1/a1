import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export function findAttemptsForUserQuiz(userId, quizId) {
  return model.find({ user: userId, quiz: quizId }).sort({ attemptNumber: 1 });
}
export function createAttempt(data) {
  return model.create({ ...data, _id: uuidv4() });
}
