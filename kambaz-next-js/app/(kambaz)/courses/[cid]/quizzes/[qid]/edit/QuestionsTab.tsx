"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import { FaPlus, FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import QuestionEditor from "./QuestionEditor";
import * as client from "../../client";

export default function QuestionsTab({ quiz, setQuiz }: { quiz: any; setQuiz: (q: any) => void }) {
  const { qid } = useParams();
  const [editingIds, setEditingIds] = useState<Set<string>>(new Set());

  const setEditing = (id: string, on: boolean) => {
    const next = new Set(editingIds);
    on ? next.add(id) : next.delete(id);
    setEditingIds(next);
  };

  const totalPoints = (quiz.questions || []).reduce(
    (s: number, q: any) => s + (q.points || 0),
    0
  );

  const addQuestion = async () => {
    const newQ = await client.addQuestion(qid as string, {
      type: "MULTIPLE_CHOICE",
      title: "New Question",
      question: "",
      points: 1,
      choices: [
        { text: "Option 1", correct: true },
        { text: "Option 2", correct: false },
      ],
    });
    const updated = { ...quiz, questions: [...(quiz.questions || []), newQ] };
    setQuiz(updated);
    setEditing(newQ._id, true);
  };

  const saveQuestion = async (q: any) => {
    const saved = await client.updateQuestion(qid as string, q);
    const questions = quiz.questions.map((x: any) => (x._id === q._id ? saved : x));
    setQuiz({ ...quiz, questions });
    setEditing(q._id, false);
  };

  const removeQuestion = async (qid2: string) => {
    if (!confirm("Delete this question?")) return;
    await client.deleteQuestion(qid as string, qid2);
    setQuiz({ ...quiz, questions: quiz.questions.filter((x: any) => x._id !== qid2) });
  };

  const changeType = (q: any, newType: string) => {
    let patch: any = { ...q, type: newType };
    if (newType === "MULTIPLE_CHOICE" && !q.choices?.length) {
      patch.choices = [
        { text: "Option 1", correct: true },
        { text: "Option 2", correct: false },
      ];
    }
    if (newType === "FILL_IN_BLANK" && !q.blanks?.length) {
      patch.blanks = [{ text: "" }];
    }
    const questions = quiz.questions.map((x: any) => (x._id === q._id ? patch : x));
    setQuiz({ ...quiz, questions });
  };

  return (
    <div>
      <div className="d-flex mb-3 align-items-center">
        <div className="me-auto"><b>Points:</b> {totalPoints}</div>
        <Button variant="secondary" onClick={addQuestion}>
          <FaPlus className="me-1" /> New Question
        </Button>
      </div>
      {(quiz.questions || []).length === 0 && (
        <div className="text-center text-muted p-4 border rounded">
          No questions yet. Click New Question to add one.
        </div>
      )}
      {(quiz.questions || []).map((q: any, idx: number) => {
        const isEditing = editingIds.has(q._id);
        return (
          <div key={q._id} className="card mb-3">
            <div className="card-header d-flex align-items-center">
              <b className="me-2">Question {idx + 1}</b>
              <FormSelect style={{ width: 220 }} value={q.type}
                onChange={(e) => changeType(q, e.target.value)}>
                <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                <option value="TRUE_FALSE">True / False</option>
                <option value="FILL_IN_BLANK">Fill in the Blank</option>
              </FormSelect>
              <div className="ms-auto">
                <span className="me-3"><b>{q.points || 0}</b> pts</span>
                {!isEditing && (
                  <Button size="sm" variant="outline-primary" className="me-2"
                    onClick={() => setEditing(q._id, true)}>
                    <FaPencil />
                  </Button>
                )}
                <Button size="sm" variant="outline-danger" onClick={() => removeQuestion(q._id)}>
                  <FaTrash />
                </Button>
              </div>
            </div>
            <div className="card-body">
              {isEditing ? (
                <QuestionEditor
                  question={q}
                  onCancel={() => setEditing(q._id, false)}
                  onSave={saveQuestion}
                  onChangeLocal={(patch) => {
                    const questions = quiz.questions.map((x: any) =>
                      x._id === q._id ? { ...x, ...patch } : x
                    );
                    setQuiz({ ...quiz, questions });
                  }}
                />
              ) : (
                <QuestionPreview question={q} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function QuestionPreview({ question }: { question: any }) {
  return (
    <div>
      <h5>{question.title}</h5>
      <div className="mb-2" style={{ whiteSpace: "pre-wrap" }}>{question.question}</div>
      {question.type === "MULTIPLE_CHOICE" && (
        <ul>
          {(question.choices || []).map((c: any, i: number) => (
            <li key={i} className={c.correct ? "text-success fw-bold" : ""}>
              {c.text}
            </li>
          ))}
        </ul>
      )}
      {question.type === "TRUE_FALSE" && (
        <div>Correct answer: <b>{question.correctBool ? "True" : "False"}</b></div>
      )}
      {question.type === "FILL_IN_BLANK" && (
        <div>
          Accepted answers:
          <ul>
            {(question.blanks || []).map((b: any, i: number) => (
              <li key={i}>{b.text}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
