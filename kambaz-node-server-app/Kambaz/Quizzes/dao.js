import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export function findQuizzesForCourse(courseId) {
  return model.find({ course: courseId });
}
export function findQuizById(quizId) {
  return model.findById(quizId);
}
export function createQuiz(courseId, quiz) {
  const newQuiz = {
    ...quiz,
    _id: uuidv4(),
    course: courseId,
    questions: quiz.questions || [],
  };
  return model.create(newQuiz);
}
export function updateQuiz(quizId, updates) {
  return model.updateOne({ _id: quizId }, { $set: updates });
}
export function deleteQuiz(quizId) {
  return model.deleteOne({ _id: quizId });
}

export async function addQuestion(quizId, question) {
  const newQuestion = {
    ...question,
    _id: question._id || uuidv4(),
  };
  await model.updateOne({ _id: quizId }, { $push: { questions: newQuestion } });
  return newQuestion;
}

export async function updateQuestion(quizId, questionId, updates) {
  const quiz = await model.findById(quizId);
  if (!quiz) return null;
  const idx = quiz.questions.findIndex((q) => q._id === questionId);
  if (idx === -1) return null;
  const updated = { ...quiz.questions[idx].toObject(), ...updates, _id: questionId };
  quiz.questions[idx] = updated;
  await quiz.save();
  return updated;
}

export async function deleteQuestion(quizId, questionId) {
  return model.updateOne(
    { _id: quizId },
    { $pull: { questions: { _id: questionId } } }
  );
}
