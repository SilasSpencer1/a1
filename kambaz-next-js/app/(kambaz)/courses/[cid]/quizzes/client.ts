import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

export const findQuizzesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
  return data;
};
export const createQuiz = async (courseId: string, quiz: any) => {
  const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
  return data;
};
export const findQuizById = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return data;
};
export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return data;
};
export const deleteQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
  return data;
};
export const addQuestion = async (quizId: string, question: any) => {
  const { data } = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/questions`, question);
  return data;
};
export const updateQuestion = async (quizId: string, question: any) => {
  const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/questions/${question._id}`, question);
  return data;
};
export const deleteQuestion = async (quizId: string, questionId: string) => {
  const { data } = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}/questions/${questionId}`);
  return data;
};
export const findAttempts = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts`);
  return data;
};
export const submitAttempt = async (quizId: string, answers: any[]) => {
  const { data } = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/attempts`, { answers });
  return data;
};
