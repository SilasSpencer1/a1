import * as dao from "./dao.js";
import * as attemptsDao from "../Attempts/dao.js";

export default function QuizRoutes(app) {
  // List quizzes for a course (students see only published)
  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    let quizzes = await dao.findQuizzesForCourse(courseId);
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN") {
      quizzes = quizzes.filter((q) => q.published);
    }
    res.json(quizzes);
  });

  app.post("/api/courses/:courseId/quizzes", async (req, res) => {
    const quiz = await dao.createQuiz(req.params.courseId, req.body);
    res.json(quiz);
  });

  app.get("/api/quizzes/:quizId", async (req, res) => {
    const quiz = await dao.findQuizById(req.params.quizId);
    res.json(quiz);
  });

  app.put("/api/quizzes/:quizId", async (req, res) => {
    const status = await dao.updateQuiz(req.params.quizId, req.body);
    res.send(status);
  });

  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const status = await dao.deleteQuiz(req.params.quizId);
    res.send(status);
  });

  // Questions
  app.post("/api/quizzes/:quizId/questions", async (req, res) => {
    const q = await dao.addQuestion(req.params.quizId, req.body);
    res.json(q);
  });

  app.put("/api/quizzes/:quizId/questions/:questionId", async (req, res) => {
    const q = await dao.updateQuestion(
      req.params.quizId,
      req.params.questionId,
      req.body
    );
    res.json(q);
  });

  app.delete("/api/quizzes/:quizId/questions/:questionId", async (req, res) => {
    const status = await dao.deleteQuestion(
      req.params.quizId,
      req.params.questionId
    );
    res.send(status);
  });

  // Attempts
  app.get("/api/quizzes/:quizId/attempts", async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const attempts = await attemptsDao.findAttemptsForUserQuiz(
      currentUser._id,
      req.params.quizId
    );
    res.json(attempts);
  });

  app.post("/api/quizzes/:quizId/attempts", async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { quizId } = req.params;
    const quiz = await dao.findQuizById(quizId);
    if (!quiz) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }
    const priorAttempts = await attemptsDao.findAttemptsForUserQuiz(
      currentUser._id,
      quizId
    );
    const maxAttempts = quiz.multipleAttempts ? quiz.howManyAttempts : 1;
    if (priorAttempts.length >= maxAttempts) {
      res.status(403).json({ message: "No attempts remaining" });
      return;
    }
    const answers = req.body.answers || [];
    let score = 0;
    for (const q of quiz.questions) {
      const a = answers.find((x) => x.questionId === q._id);
      if (!a) continue;
      let correct = false;
      if (q.type === "MULTIPLE_CHOICE") {
        const chosen = q.choices.find((c) => c._id === a.answer);
        correct = !!(chosen && chosen.correct);
      } else if (q.type === "TRUE_FALSE") {
        correct = String(q.correctBool) === String(a.answer);
      } else if (q.type === "FILL_IN_BLANK") {
        const text = String(a.answer || "").trim().toLowerCase();
        correct = q.blanks.some(
          (b) => String(b.text || "").trim().toLowerCase() === text
        );
      }
      if (correct) score += q.points || 0;
    }
    const attempt = await attemptsDao.createAttempt({
      user: currentUser._id,
      quiz: quizId,
      answers,
      score,
      attemptNumber: priorAttempts.length + 1,
    });
    res.json(attempt);
  });
}
