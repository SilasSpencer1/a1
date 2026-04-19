"use client";
import { FormControl, FormSelect, FormCheck, Row, Col } from "react-bootstrap";

export default function DetailsTab({ quiz, setQuiz }: { quiz: any; setQuiz: (q: any) => void }) {
  const set = (patch: any) => setQuiz({ ...quiz, ...patch });
  return (
    <div>
      <label className="form-label"><b>Title</b></label>
      <FormControl className="mb-3" value={quiz.title || ""}
        onChange={(e) => set({ title: e.target.value })} />

      <label className="form-label"><b>Description</b></label>
      <FormControl as="textarea" rows={4} className="mb-3" value={quiz.description || ""}
        onChange={(e) => set({ description: e.target.value })} />

      <Row className="mb-3">
        <Col md={3}><label className="form-label float-end">Quiz Type</label></Col>
        <Col md={9}>
          <FormSelect value={quiz.quizType || "GRADED_QUIZ"}
            onChange={(e) => set({ quizType: e.target.value })}>
            <option value="GRADED_QUIZ">Graded Quiz</option>
            <option value="PRACTICE_QUIZ">Practice Quiz</option>
            <option value="GRADED_SURVEY">Graded Survey</option>
            <option value="UNGRADED_SURVEY">Ungraded Survey</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}><label className="form-label float-end">Assignment Group</label></Col>
        <Col md={9}>
          <FormSelect value={quiz.assignmentGroup || "QUIZZES"}
            onChange={(e) => set({ assignmentGroup: e.target.value })}>
            <option value="QUIZZES">Quizzes</option>
            <option value="EXAMS">Exams</option>
            <option value="ASSIGNMENTS">Assignments</option>
            <option value="PROJECT">Project</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}><label className="form-label float-end">Options</label></Col>
        <Col md={9}>
          <FormCheck label="Shuffle Answers" checked={!!quiz.shuffleAnswers}
            onChange={(e) => set({ shuffleAnswers: e.target.checked })} />
          <div className="d-flex align-items-center mb-2">
            <FormCheck label="Time Limit" className="me-2" checked={(quiz.timeLimit ?? 0) > 0}
              onChange={(e) => set({ timeLimit: e.target.checked ? 20 : 0 })} />
            <FormControl type="number" style={{ width: 100 }} className="ms-2"
              value={quiz.timeLimit || 0}
              onChange={(e) => set({ timeLimit: parseInt(e.target.value) || 0 })} />
            <span className="ms-2">Minutes</span>
          </div>
          <FormCheck label="Multiple Attempts" checked={!!quiz.multipleAttempts}
            onChange={(e) => set({ multipleAttempts: e.target.checked })} />
          {quiz.multipleAttempts && (
            <div className="d-flex align-items-center mb-2 ms-4">
              <span className="me-2">How Many Attempts:</span>
              <FormControl type="number" style={{ width: 100 }} value={quiz.howManyAttempts || 1}
                onChange={(e) => set({ howManyAttempts: parseInt(e.target.value) || 1 })} />
            </div>
          )}
          <FormCheck label="One Question at a Time" checked={!!quiz.oneQuestionAtATime}
            onChange={(e) => set({ oneQuestionAtATime: e.target.checked })} />
          <FormCheck label="Webcam Required" checked={!!quiz.webcamRequired}
            onChange={(e) => set({ webcamRequired: e.target.checked })} />
          <FormCheck label="Lock Questions After Answering" checked={!!quiz.lockQuestionsAfterAnswering}
            onChange={(e) => set({ lockQuestionsAfterAnswering: e.target.checked })} />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}><label className="form-label float-end">Show Correct Answers</label></Col>
        <Col md={9}>
          <FormControl value={quiz.showCorrectAnswers || ""}
            onChange={(e) => set({ showCorrectAnswers: e.target.value })}
            placeholder="e.g. After Submission" />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}><label className="form-label float-end">Access Code</label></Col>
        <Col md={9}>
          <FormControl value={quiz.accessCode || ""}
            onChange={(e) => set({ accessCode: e.target.value })} />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}><label className="form-label float-end">Due</label></Col>
        <Col md={9}>
          <FormControl type="date" value={quiz.dueDate || ""}
            onChange={(e) => set({ dueDate: e.target.value })} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={3}><label className="form-label float-end">Available from</label></Col>
        <Col md={4}>
          <FormControl type="date" value={quiz.availableDate || ""}
            onChange={(e) => set({ availableDate: e.target.value })} />
        </Col>
        <Col md={1} className="text-center pt-2">Until</Col>
        <Col md={4}>
          <FormControl type="date" value={quiz.untilDate || ""}
            onChange={(e) => set({ untilDate: e.target.value })} />
        </Col>
      </Row>
    </div>
  );
}
