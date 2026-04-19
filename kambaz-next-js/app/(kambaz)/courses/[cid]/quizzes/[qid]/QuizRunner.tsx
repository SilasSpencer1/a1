"use client";
import { useState } from "react";
import { Button, FormControl, FormCheck } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function QuizRunner({
  quiz,
  onSubmit,
  mode,
  prefillAnswers,
  readOnly,
}: {
  quiz: any;
  onSubmit?: (answers: any[]) => Promise<{ score: number }>;
  mode: "preview" | "take" | "review";
  prefillAnswers?: any[];
  readOnly?: boolean;
}) {
  const questions = quiz.questions || [];
  const [answers, setAnswers] = useState<any[]>(
    prefillAnswers && prefillAnswers.length
      ? prefillAnswers
      : questions.map((q: any) => ({ questionId: q._id, answer: null }))
  );
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(readOnly || false);
  const [score, setScore] = useState<number | null>(null);

  const setAnswer = (qid: string, value: any) => {
    if (submitted) return;
    setAnswers(answers.map((a) => (a.questionId === qid ? { ...a, answer: value } : a)));
  };

  const isCorrect = (q: any, a: any) => {
    if (!a) return false;
    if (q.type === "MULTIPLE_CHOICE") {
      const c = q.choices.find((x: any) => x._id === a.answer);
      return !!(c && c.correct);
    }
    if (q.type === "TRUE_FALSE") return String(q.correctBool) === String(a.answer);
    if (q.type === "FILL_IN_BLANK") {
      const t = String(a.answer || "").trim().toLowerCase();
      return q.blanks.some((b: any) => String(b.text || "").trim().toLowerCase() === t);
    }
    return false;
  };

  const submit = async () => {
    if (mode === "preview") {
      let s = 0;
      questions.forEach((q: any) => {
        const a = answers.find((x) => x.questionId === q._id);
        if (isCorrect(q, a)) s += q.points || 0;
      });
      setScore(s);
      setSubmitted(true);
      return;
    }
    if (onSubmit) {
      const { score: s } = await onSubmit(answers);
      setScore(s);
      setSubmitted(true);
    }
  };

  const showOne = !!quiz.oneQuestionAtATime && !submitted;
  const visible = showOne ? [questions[current]] : questions;

  return (
    <div>
      {submitted && score !== null && (
        <div className="alert alert-info">
          You scored <b>{score}</b> out of{" "}
          {questions.reduce((s: number, q: any) => s + (q.points || 0), 0)}.
        </div>
      )}

      {visible.map((q: any, idx: number) => {
        if (!q) return null;
        const a = answers.find((x) => x.questionId === q._id);
        const displayIdx = showOne ? current : idx;
        const correct = submitted ? isCorrect(q, a) : null;
        return (
          <div key={q._id} className={`card mb-3 ${submitted ? (correct ? "border-success" : "border-danger") : ""}`}>
            <div className="card-header d-flex align-items-center">
              <b>Question {displayIdx + 1}</b>
              <span className="ms-auto">{q.points} pts</span>
              {submitted && (correct ? <FaCheck className="ms-2 text-success" /> : <FaTimes className="ms-2 text-danger" />)}
            </div>
            <div className="card-body">
              <div className="mb-3" style={{ whiteSpace: "pre-wrap" }}>{q.question}</div>
              {q.type === "MULTIPLE_CHOICE" && (
                <div>
                  {q.choices.map((c: any) => (
                    <FormCheck
                      key={c._id}
                      type="radio"
                      name={`q-${q._id}`}
                      label={c.text}
                      disabled={submitted}
                      checked={a?.answer === c._id}
                      onChange={() => setAnswer(q._id, c._id)}
                    />
                  ))}
                </div>
              )}
              {q.type === "TRUE_FALSE" && (
                <div>
                  <FormCheck type="radio" name={`q-${q._id}`} label="True"
                    disabled={submitted}
                    checked={a?.answer === true || a?.answer === "true"}
                    onChange={() => setAnswer(q._id, true)} />
                  <FormCheck type="radio" name={`q-${q._id}`} label="False"
                    disabled={submitted}
                    checked={a?.answer === false || a?.answer === "false"}
                    onChange={() => setAnswer(q._id, false)} />
                </div>
              )}
              {q.type === "FILL_IN_BLANK" && (
                <FormControl value={a?.answer || ""} disabled={submitted}
                  onChange={(e) => setAnswer(q._id, e.target.value)} placeholder="Type answer" />
              )}
              {submitted && !correct && (
                <div className="mt-2 text-muted small">
                  {q.type === "MULTIPLE_CHOICE" && (
                    <>Correct: {q.choices.filter((c: any) => c.correct).map((c: any) => c.text).join(", ")}</>
                  )}
                  {q.type === "TRUE_FALSE" && <>Correct: {q.correctBool ? "True" : "False"}</>}
                  {q.type === "FILL_IN_BLANK" && (
                    <>Accepted: {(q.blanks || []).map((b: any) => b.text).join(", ")}</>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {showOne && (
        <div className="d-flex mb-3">
          <Button variant="outline-secondary" disabled={current === 0} onClick={() => setCurrent(current - 1)}>Previous</Button>
          <span className="mx-3 align-self-center">Question {current + 1} of {questions.length}</span>
          <Button variant="outline-secondary" disabled={current === questions.length - 1} onClick={() => setCurrent(current + 1)}>Next</Button>
          <select className="form-select ms-3" style={{ width: 200 }} value={current}
            onChange={(e) => setCurrent(parseInt(e.target.value))}>
            {questions.map((_: any, i: number) => (
              <option key={i} value={i}>Jump to Q{i + 1}</option>
            ))}
          </select>
        </div>
      )}

      {!submitted && !readOnly && (
        <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={submit}>Submit</Button>
        </div>
      )}
    </div>
  );
}
