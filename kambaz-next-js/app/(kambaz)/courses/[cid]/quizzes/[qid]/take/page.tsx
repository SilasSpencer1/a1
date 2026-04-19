"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import QuizRunner from "../QuizRunner";
import * as client from "../../client";

export default function QuizTake() {
  const { qid } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [mode, setMode] = useState<"take" | "review">("take");

  const load = async () => {
    const q = await client.findQuizById(qid as string);
    setQuiz(q);
    try {
      const list = await client.findAttempts(qid as string);
      setAttempts(list);
      const maxAttempts = q.multipleAttempts ? q.howManyAttempts : 1;
      if (list.length >= maxAttempts) setMode("review");
    } catch {}
  };
  useEffect(() => {
    load();
  }, [qid]);

  if (!quiz) return <div className="p-3">Loading…</div>;

  const onSubmit = async (answers: any[]) => {
    const attempt = await client.submitAttempt(qid as string, answers);
    const list = await client.findAttempts(qid as string);
    setAttempts(list);
    return { score: attempt.score };
  };

  const lastAttempt = attempts.length ? attempts[attempts.length - 1] : null;

  return (
    <div className="p-3">
      <h3>{quiz.title}</h3>
      {mode === "review" && lastAttempt && (
        <div className="alert alert-info">
          You have used all your attempts. Showing your last attempt (score: <b>{lastAttempt.score}</b>).
        </div>
      )}
      <QuizRunner
        quiz={quiz}
        mode={mode}
        onSubmit={mode === "take" ? onSubmit : undefined}
        prefillAnswers={mode === "review" ? lastAttempt?.answers : undefined}
        readOnly={mode === "review"}
      />
    </div>
  );
}
