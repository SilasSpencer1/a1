"use client";
import { useState } from "react";
import { Button, FormControl, FormCheck, Row, Col } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function QuestionEditor({
  question,
  onSave,
  onCancel,
  onChangeLocal,
}: {
  question: any;
  onSave: (q: any) => void;
  onCancel: () => void;
  onChangeLocal: (patch: any) => void;
}) {
  const [draft, setDraft] = useState<any>({
    ...question,
    choices: question.choices ? [...question.choices] : [],
    blanks: question.blanks ? [...question.blanks] : [],
  });
  const set = (patch: any) => {
    const next = { ...draft, ...patch };
    setDraft(next);
    onChangeLocal(patch);
  };

  return (
    <div>
      <Row className="mb-3">
        <Col md={8}>
          <label className="form-label"><b>Title</b></label>
          <FormControl value={draft.title || ""} onChange={(e) => set({ title: e.target.value })} />
        </Col>
        <Col md={4}>
          <label className="form-label"><b>Points</b></label>
          <FormControl type="number" value={draft.points ?? 0}
            onChange={(e) => set({ points: parseInt(e.target.value) || 0 })} />
        </Col>
      </Row>

      <label className="form-label"><b>Question</b></label>
      <FormControl as="textarea" rows={3} className="mb-3" value={draft.question || ""}
        onChange={(e) => set({ question: e.target.value })} />

      {draft.type === "MULTIPLE_CHOICE" && (
        <MultipleChoiceFields draft={draft} set={set} />
      )}
      {draft.type === "TRUE_FALSE" && (
        <TrueFalseFields draft={draft} set={set} />
      )}
      {draft.type === "FILL_IN_BLANK" && (
        <FillInBlankFields draft={draft} set={set} />
      )}

      <hr />
      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" onClick={() => onSave(draft)}>Update Question</Button>
      </div>
    </div>
  );
}

function MultipleChoiceFields({ draft, set }: { draft: any; set: (p: any) => void }) {
  const choices = draft.choices || [];
  const update = (i: number, patch: any) => {
    const next = choices.map((c: any, idx: number) => (idx === i ? { ...c, ...patch } : c));
    set({ choices: next });
  };
  const setCorrect = (i: number) => {
    const next = choices.map((c: any, idx: number) => ({ ...c, correct: idx === i }));
    set({ choices: next });
  };
  const addChoice = () => set({ choices: [...choices, { text: "", correct: false }] });
  const removeChoice = (i: number) => set({ choices: choices.filter((_: any, idx: number) => idx !== i) });

  return (
    <div>
      <label className="form-label"><b>Answers</b></label>
      {choices.map((c: any, i: number) => (
        <div key={i} className="d-flex mb-2 align-items-center">
          <FormCheck type="radio" name="mc-correct" checked={!!c.correct}
            onChange={() => setCorrect(i)} className="me-2" />
          <FormControl as="textarea" rows={1} value={c.text || ""}
            onChange={(e) => update(i, { text: e.target.value })} />
          <Button size="sm" variant="outline-danger" className="ms-2" onClick={() => removeChoice(i)}>
            <FaTrash />
          </Button>
        </div>
      ))}
      <Button size="sm" variant="outline-primary" onClick={addChoice}>
        <FaPlus className="me-1" /> Add Answer
      </Button>
    </div>
  );
}

function TrueFalseFields({ draft, set }: { draft: any; set: (p: any) => void }) {
  return (
    <div>
      <label className="form-label"><b>Correct Answer</b></label>
      <div>
        <FormCheck type="radio" name="tf-correct" label="True" checked={draft.correctBool !== false}
          onChange={() => set({ correctBool: true })} />
        <FormCheck type="radio" name="tf-correct" label="False" checked={draft.correctBool === false}
          onChange={() => set({ correctBool: false })} />
      </div>
    </div>
  );
}

function FillInBlankFields({ draft, set }: { draft: any; set: (p: any) => void }) {
  const blanks = draft.blanks || [];
  const update = (i: number, text: string) => {
    const next = blanks.map((b: any, idx: number) => (idx === i ? { ...b, text } : b));
    set({ blanks: next });
  };
  const add = () => set({ blanks: [...blanks, { text: "" }] });
  const remove = (i: number) => set({ blanks: blanks.filter((_: any, idx: number) => idx !== i) });

  return (
    <div>
      <label className="form-label"><b>Accepted Answers</b> (case-insensitive)</label>
      {blanks.map((b: any, i: number) => (
        <div key={i} className="d-flex mb-2 align-items-center">
          <FormControl value={b.text || ""} onChange={(e) => update(i, e.target.value)} />
          <Button size="sm" variant="outline-danger" className="ms-2" onClick={() => remove(i)}>
            <FaTrash />
          </Button>
        </div>
      ))}
      <Button size="sm" variant="outline-primary" onClick={add}>
        <FaPlus className="me-1" /> Add Answer
      </Button>
    </div>
  );
}
