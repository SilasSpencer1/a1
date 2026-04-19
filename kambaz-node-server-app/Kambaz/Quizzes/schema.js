import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    _id: String,
    type: {
      type: String,
      enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_BLANK"],
      default: "MULTIPLE_CHOICE",
    },
    title: { type: String, default: "New Question" },
    question: { type: String, default: "" },
    points: { type: Number, default: 1 },
    // Multiple choice: list of { _id, text, correct }
    choices: [{ _id: String, text: String, correct: Boolean }],
    // True/false
    correctBool: { type: Boolean, default: true },
    // Fill in the blank: list of accepted answers (case-insensitive match)
    blanks: [{ _id: String, text: String }],
  },
  { _id: false }
);

const quizSchema = new mongoose.Schema(
  {
    _id: String,
    course: { type: String, ref: "CourseModel" },
    title: { type: String, default: "New Quiz" },
    description: { type: String, default: "" },
    quizType: {
      type: String,
      enum: ["GRADED_QUIZ", "PRACTICE_QUIZ", "GRADED_SURVEY", "UNGRADED_SURVEY"],
      default: "GRADED_QUIZ",
    },
    assignmentGroup: {
      type: String,
      enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECT"],
      default: "QUIZZES",
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    howManyAttempts: { type: Number, default: 1 },
    showCorrectAnswers: { type: String, default: "" },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: String,
    availableDate: String,
    untilDate: String,
    published: { type: Boolean, default: false },
    questions: [questionSchema],
  },
  { collection: "quizzes", timestamps: true }
);

export default quizSchema;
