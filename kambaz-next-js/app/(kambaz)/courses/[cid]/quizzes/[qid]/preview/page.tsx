"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import QuizRunner from "../QuizRunner";
import * as client from "../../client";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  useEffect(() => {
    (async () => setQuiz(await client.findQuizById(qid as string)))();
  }, [qid]);
  if (!quiz) return <div className="p-3">Loading…</div>;
  return (
    <div className="p-3">
      <div className="alert alert-warning">
        Preview mode. Answers are not saved.
      </div>
      <div className="d-flex mb-3 align-items-center">
        <h3 className="me-auto mb-0">{quiz.title}</h3>
        <Button variant="outline-secondary" onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}>
          Edit Quiz
        </Button>
      </div>
      <QuizRunner quiz={quiz} mode="preview" />
    </div>
  );
}
