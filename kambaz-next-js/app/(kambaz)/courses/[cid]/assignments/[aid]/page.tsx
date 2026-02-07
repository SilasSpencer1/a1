import Link from "next/link";
import { FormControl, FormSelect, FormCheck, Row, Col, Button } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-3">
      <label htmlFor="wd-name" className="form-label">
        <b>Assignment Name</b>
      </label>
      <FormControl id="wd-name" defaultValue="A1 - ENV + HTML" className="mb-3" />

      <FormControl
        as="textarea"
        id="wd-description"
        rows={5}
        className="mb-3"
        defaultValue="The assignment is available online. Submit a link to the landing page of your Web application running on Vercel. The landing page should include a link to the Labs page with all the exercises completed. Also include a link to the GitHub repository."
      />

      <Row className="mb-3">
        <Col md={3}>
          <label htmlFor="wd-points" className="form-label float-end">
            Points
          </label>
        </Col>
        <Col md={9}>
          <FormControl id="wd-points" type="number" defaultValue={100} />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <label htmlFor="wd-group" className="form-label float-end">
            Assignment Group
          </label>
        </Col>
        <Col md={9}>
          <FormSelect id="wd-group" defaultValue="ASSIGNMENTS">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <label htmlFor="wd-display-grade-as" className="form-label float-end">
            Display Grade as
          </label>
        </Col>
        <Col md={9}>
          <FormSelect id="wd-display-grade-as" defaultValue="PERCENTAGE">
            <option value="PERCENTAGE">Percentage</option>
            <option value="POINTS">Points</option>
            <option value="LETTER">Letter Grade</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <label htmlFor="wd-submission-type" className="form-label float-end">
            Submission Type
          </label>
        </Col>
        <Col md={9}>
          <div className="border rounded p-3">
            <FormSelect id="wd-submission-type" defaultValue="ONLINE" className="mb-3">
              <option value="ONLINE">Online</option>
              <option value="ON_PAPER">On Paper</option>
              <option value="NO_SUBMISSION">No Submission</option>
            </FormSelect>
            <b>Online Entry Options</b>
            <div className="mt-2">
              <FormCheck type="checkbox" id="wd-text-entry" label="Text Entry" />
              <FormCheck type="checkbox" id="wd-website-url" label="Website URL" defaultChecked />
              <FormCheck type="checkbox" id="wd-media-recordings" label="Media Recordings" />
              <FormCheck type="checkbox" id="wd-student-annotation" label="Student Annotation" />
              <FormCheck type="checkbox" id="wd-file-upload" label="File Uploads" />
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <label className="form-label float-end">Assign</label>
        </Col>
        <Col md={9}>
          <div className="border rounded p-3">
            <label htmlFor="wd-assign-to" className="form-label">
              <b>Assign to</b>
            </label>
            <FormControl id="wd-assign-to" defaultValue="Everyone" className="mb-3" />

            <label htmlFor="wd-due-date" className="form-label">
              <b>Due</b>
            </label>
            <FormControl id="wd-due-date" type="date" defaultValue="2024-05-13" className="mb-3" />

            <Row>
              <Col md={6}>
                <label htmlFor="wd-available-from" className="form-label">
                  <b>Available from</b>
                </label>
                <FormControl id="wd-available-from" type="date" defaultValue="2024-05-06" />
              </Col>
              <Col md={6}>
                <label htmlFor="wd-available-until" className="form-label">
                  <b>Until</b>
                </label>
                <FormControl id="wd-available-until" type="date" defaultValue="2024-05-20" />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <hr />
      <div className="d-flex justify-content-end">
        <Link href={`/courses/1234/assignments`} className="btn btn-secondary me-2">
          Cancel
        </Link>
        <Link href={`/courses/1234/assignments`} className="btn btn-danger">
          Save
        </Link>
      </div>
    </div>
  );
}
