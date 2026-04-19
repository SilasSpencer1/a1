"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Tabs, Tab, Button } from "react-bootstrap";
import * as client from "../../client";
import DetailsTab from "./DetailsTab";
import QuestionsTab from "./QuestionsTab";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [tab, setTab] = useState("details");

  useEffect(() => {
    (async () => {
      const q = await client.findQuizById(qid as string);
      setQuiz(q);
    })();
  }, [qid]);

  if (!quiz) return <div className="p-3">Loading…</div>;

  const save = async (andPublish = false) => {
    const payload = { ...quiz, published: andPublish ? true : quiz.published };
    await client.updateQuiz(payload);
    if (andPublish) {
      router.push(`/courses/${cid}/quizzes`);
    } else {
      router.push(`/courses/${cid}/quizzes/${qid}/details`);
    }
  };

  const cancel = () => router.push(`/courses/${cid}/quizzes`);

  return (
    <div className="p-3">
      <Tabs activeKey={tab} onSelect={(k) => setTab(k || "details")} className="mb-3">
        <Tab eventKey="details" title="Details">
          <DetailsTab quiz={quiz} setQuiz={setQuiz} />
        </Tab>
        <Tab eventKey="questions" title="Questions">
          <QuestionsTab quiz={quiz} setQuiz={setQuiz} />
        </Tab>
      </Tabs>
      <hr />
      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={cancel}>Cancel</Button>
        <Button variant="primary" className="me-2" onClick={() => save(false)}>Save</Button>
        <Button variant="success" onClick={() => save(true)}>Save and Publish</Button>
      </div>
    </div>
  );
}
