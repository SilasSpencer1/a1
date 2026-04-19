"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { RootState } from "../../../../../store";
import * as client from "../../client";

export default function QuizDetailsView() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((s: RootState) => s.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const [quiz, setQuiz] = useState<any>(null);
  const [attempts, setAttempts] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const q = await client.findQuizById(qid as string);
      setQuiz(q);
      if (currentUser) {
        try {
          setAttempts(await client.findAttempts(qid as string));
        } catch {}
      }
    })();
  }, [qid, currentUser?._id]);

  if (!quiz) return <div className="p-3">Loading…</div>;

  const togglePublish = async () => {
    const updated = { ...quiz, published: !quiz.published };
    await client.updateQuiz(updated);
    setQuiz(updated);
  };

  const totalPoints = (quiz.questions || []).reduce(
    (s: number, q: any) => s + (q.points || 0),
    0
  );

  const maxAttempts = quiz.multipleAttempts ? quiz.howManyAttempts : 1;
  const remaining = Math.max(0, maxAttempts - attempts.length);

  const Row = ({ label, value }: { label: string; value: any }) => (
    <div className="row mb-2">
      <div className="col-4 text-end fw-bold">{label}</div>
      <div className="col-8">{String(value ?? "")}</div>
    </div>
  );

  return (
    <div className="p-3">
      <div className="d-flex align-items-center mb-3">
        <h3 className="me-auto mb-0">{quiz.title}</h3>
        {isFaculty && (
          <>
            <Button variant={quiz.published ? "secondary" : "success"} className="me-2" onClick={togglePublish}>
              {quiz.published ? "Unpublish" : "Publish"}
            </Button>
            <Button variant="outline-secondary" className="me-2" onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/preview`)}>
              Preview
            </Button>
            <Button variant="primary" onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}>
              Edit
            </Button>
          </>
        )}
        {!isFaculty && (
          <Button
            variant="primary"
            disabled={remaining === 0 || !quiz.published}
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/take`)}
          >
            {remaining === 0 ? "No attempts left" : attempts.length > 0 ? "Take Again" : "Start Quiz"}
          </Button>
        )}
      </div>

      <hr />
      <Row label="Quiz Type" value={quiz.quizType} />
      <Row label="Points" value={totalPoints} />
      <Row label="Assignment Group" value={quiz.assignmentGroup} />
      <Row label="Shuffle Answers" value={quiz.shuffleAnswers ? "Yes" : "No"} />
      <Row label="Time Limit" value={`${quiz.timeLimit} Minutes`} />
      <Row label="Multiple Attempts" value={quiz.multipleAttempts ? "Yes" : "No"} />
      <Row label="How Many Attempts" value={quiz.howManyAttempts} />
      <Row label="Show Correct Answers" value={quiz.showCorrectAnswers || "—"} />
      <Row label="One Question at a Time" value={quiz.oneQuestionAtATime ? "Yes" : "No"} />
      <Row label="Webcam Required" value={quiz.webcamRequired ? "Yes" : "No"} />
      <Row label="Lock Questions After Answering" value={quiz.lockQuestionsAfterAnswering ? "Yes" : "No"} />
      <Row label="Due Date" value={quiz.dueDate} />
      <Row label="Available Date" value={quiz.availableDate} />
      <Row label="Until Date" value={quiz.untilDate} />

      {!isFaculty && attempts.length > 0 && (
        <>
          <hr />
          <h5>Your Attempts</h5>
          <table className="table">
            <thead>
              <tr><th>#</th><th>Score</th><th>Submitted</th></tr>
            </thead>
            <tbody>
              {attempts.map((a) => (
                <tr key={a._id}>
                  <td>{a.attemptNumber}</td>
                  <td>{a.score}</td>
                  <td>{a.submittedAt && new Date(a.submittedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
