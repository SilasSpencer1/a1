"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FormControl, FormSelect, FormCheck, Row, Col,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const existingAssignment = assignments.find(
    (a: any) => a._id === aid && a.course === cid
  );
  const isNew = aid === "new";

  const [assignment, setAssignment] = useState<any>({
    title: "New Assignment",
    description: "The assignment is available online.",
    points: 100,
    dueDate: "2024-05-13",
    availableFrom: "2024-05-06",
    availableUntil: "2024-05-20",
    course: cid,
  });

  useEffect(() => {
    if (existingAssignment) {
      setAssignment(existingAssignment);
    }
  }, []);

  const handleSave = () => {
    if (isNew) {
      dispatch(addAssignment(assignment));
    } else {
      dispatch(updateAssignment(assignment));
    }
    router.push(`/courses/${cid}/assignments`);
  };

  const handleCancel = () => {
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      <label htmlFor="wd-name" className="form-label"><b>Assignment Name</b></label>
      <FormControl id="wd-name" value={assignment.title} className="mb-3"
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />

      <FormControl as="textarea" id="wd-description" rows={5} className="mb-3"
        value={assignment.description}
        onChange={(e) => setAssignment({ ...assignment, description: e.target.value })} />

      <Row className="mb-3">
        <Col md={3}>
          <label htmlFor="wd-points" className="form-label float-end">Points</label>
        </Col>
        <Col md={9}>
          <FormControl id="wd-points" type="number" value={assignment.points}
            onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) })} />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <label htmlFor="wd-group" className="form-label float-end">Assignment Group</label>
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
            <label htmlFor="wd-assign-to" className="form-label"><b>Assign to</b></label>
            <FormControl id="wd-assign-to" defaultValue="Everyone" className="mb-3" />

            <label htmlFor="wd-due-date" className="form-label"><b>Due</b></label>
            <FormControl id="wd-due-date" type="date" value={assignment.dueDate}
              className="mb-3"
              onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })} />

            <Row>
              <Col md={6}>
                <label htmlFor="wd-available-from" className="form-label">
                  <b>Available from</b>
                </label>
                <FormControl id="wd-available-from" type="date"
                  value={assignment.availableFrom}
                  onChange={(e) => setAssignment({ ...assignment, availableFrom: e.target.value })} />
              </Col>
              <Col md={6}>
                <label htmlFor="wd-available-until" className="form-label"><b>Until</b></label>
                <FormControl id="wd-available-until" type="date"
                  value={assignment.availableUntil}
                  onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })} />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <hr />
      <div className="d-flex justify-content-end">
        <button onClick={handleCancel} className="btn btn-secondary me-2">Cancel</button>
        <button onClick={handleSave} className="btn btn-danger" id="wd-save-assignment">Save</button>
      </div>
    </div>
  );
}
