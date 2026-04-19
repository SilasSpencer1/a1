import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    questionId: String,
    answer: mongoose.Schema.Types.Mixed,
  },
  { _id: false }
);

const attemptSchema = new mongoose.Schema(
  {
    _id: String,
    user: { type: String, ref: "UserModel" },
    quiz: { type: String, ref: "QuizModel" },
    answers: [answerSchema],
    score: { type: Number, default: 0 },
    attemptNumber: { type: Number, default: 1 },
    submittedAt: { type: Date, default: Date.now },
  },
  { collection: "attempts" }
);

export default attemptSchema;
