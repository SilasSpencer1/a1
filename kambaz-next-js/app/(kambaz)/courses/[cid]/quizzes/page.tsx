"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { FaPlus, FaCheckCircle, FaBan, FaEllipsisV } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { MdQuiz } from "react-icons/md";
import { RootState } from "../../../store";
import * as client from "./client";

export default function QuizzesPage() {
  const { cid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((s: RootState) => s.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [attemptsByQuiz, setAttemptsByQuiz] = useState<Record<string, any[]>>({});

  const fetchQuizzes = async () => {
    const list = await client.findQuizzesForCourse(cid as string);
    const sorted = [...list].sort((a, b) =>
      String(a.availableDate || "").localeCompare(String(b.availableDate || ""))
    );
    setQuizzes(sorted);
    if (!isFaculty && currentUser) {
      const map: Record<string, any[]> = {};
      for (const q of sorted) {
        try {
          map[q._id] = await client.findAttempts(q._id);
        } catch {
          map[q._id] = [];
        }
      }
      setAttemptsByQuiz(map);
    }
  };

  useEffect(() => {
    if (cid) fetchQuizzes();
  }, [cid, currentUser?._id]);

  const addQuiz = async () => {
    const newQuiz = await client.createQuiz(cid as string, {
      title: "New Quiz",
      points: 0,
      dueDate: "",
      availableDate: "",
      untilDate: "",
    });
    router.push(`/courses/${cid}/quizzes/${newQuiz._id}/edit`);
  };

  const togglePublish = async (q: any) => {
    const updated = { ...q, published: !q.published };
    await client.updateQuiz(updated);
    fetchQuizzes();
  };
  const removeQuiz = async (q: any) => {
    if (!confirm(`Delete quiz "${q.title}"?`)) return;
    await client.deleteQuiz(q._id);
    fetchQuizzes();
  };

  const availabilityLabel = (q: any) => {
    const now = new Date();
    const available = q.availableDate ? new Date(q.availableDate) : null;
    const until = q.untilDate ? new Date(q.untilDate) : null;
    if (until && now > until) return "Closed";
    if (available && now < available) return `Not available until ${q.availableDate}`;
    return "Available";
  };

  return (
    <div id="wd-quizzes" className="p-3">
      <div className="d-flex mb-3 align-items-center">
        <input className="form-control w-50 me-auto" placeholder="Search for Quiz" />
        {isFaculty && (
          <button id="wd-add-quiz" className="btn btn-danger" onClick={addQuiz}>
            <FaPlus className="me-1" /> Quiz
          </button>
        )}
      </div>

      <ul className="list-group rounded-0" id="wd-quiz-list">
        <li className="list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <b>QUIZZES</b>
          </div>
          <ul className="list-group rounded-0">
            {quizzes.length === 0 && (
              <li className="list-group-item text-center text-muted p-4">
                {isFaculty
                  ? "No quizzes yet. Click + Quiz to add one."
                  : "No quizzes available for this course yet."}
              </li>
            )}
            {quizzes.map((q) => {
              const attempts = attemptsByQuiz[q._id] || [];
              const lastScore = attempts.length ? attempts[attempts.length - 1].score : null;
              return (
                <li
                  key={q._id}
                  className="list-group-item p-3 ps-1 d-flex align-items-start wd-quiz-item"
                  style={{ borderLeft: "3px solid green" }}
                >
                  <BsGripVertical className="me-2 fs-3 mt-1" />
                  <MdQuiz className="me-2 fs-3 text-success mt-1" />
                  <div className="flex-fill">
                    <Link
                      href={`/courses/${cid}/quizzes/${q._id}/details`}
                      className="fw-bold text-dark text-decoration-none wd-quiz-title"
                    >
                      {q.title}
                    </Link>
                    <br />
                    <span className="text-muted small">
                      <b>{availabilityLabel(q)}</b> | <b>Due</b> {q.dueDate || "—"} |{" "}
                      {q.questions?.reduce((s: number, x: any) => s + (x.points || 0), 0) || 0} pts |{" "}
                      {q.questions?.length || 0} Question{(q.questions?.length || 0) === 1 ? "" : "s"}
                      {lastScore !== null && (
                        <>
                          {" | "}
                          <b>Score:</b> {lastScore}
                        </>
                      )}
                    </span>
                  </div>
                  <div className="ms-2 d-flex align-items-center">
                    {q.published ? (
                      <FaCheckCircle
                        className="text-success me-2"
                        style={{ cursor: isFaculty ? "pointer" : "default" }}
                        onClick={() => isFaculty && togglePublish(q)}
                        title={isFaculty ? "Click to unpublish" : "Published"}
                      />
                    ) : (
                      <FaBan
                        className="text-muted me-2"
                        style={{ cursor: isFaculty ? "pointer" : "default" }}
                        onClick={() => isFaculty && togglePublish(q)}
                        title={isFaculty ? "Click to publish" : "Unpublished"}
                      />
                    )}
                    {isFaculty && (
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="link"
                          className="p-0 text-dark"
                          id={`quiz-menu-${q._id}`}
                        >
                          <FaEllipsisV />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => router.push(`/courses/${cid}/quizzes/${q._id}/edit`)}
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => removeQuiz(q)}>Delete</Dropdown.Item>
                          <Dropdown.Item onClick={() => togglePublish(q)}>
                            {q.published ? "Unpublish" : "Publish"}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </div>
  );
}
