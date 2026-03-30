"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { BsGripVertical } from "react-icons/bs";
import { FaSearch, FaPlus, FaCheckCircle, FaEllipsisV, FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdAssignment } from "react-icons/md";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { deleteAssignment, fetchAssignments } from "./reducer";
import { Modal, Button } from "react-bootstrap";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const dispatch = useDispatch();
  useEffect(() => { dispatch(fetchAssignments(cid as string) as any); }, [cid]);
  const courseAssignments = assignments.filter(
    (assignment: any) => assignment.course === cid
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<any>(null);

  const confirmDelete = (assignment: any) => {
    setAssignmentToDelete(assignment);
    setShowDeleteDialog(true);
  };

  const handleDelete = () => {
    if (assignmentToDelete) {
      dispatch(deleteAssignment(assignmentToDelete._id) as any);
    }
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  return (
    <div id="wd-assignments" className="p-3">
      <Modal show={showDeleteDialog} onHide={() => setShowDeleteDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove the assignment{" "}
          <b>{assignmentToDelete?.title}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteDialog(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="d-flex mb-3">
        <div className="input-group w-50 me-auto">
          <span className="input-group-text"><FaSearch /></span>
          <input className="form-control" placeholder="Search for Assignments"
            id="wd-search-assignment" />
        </div>
        <button className="btn btn-secondary me-2" id="wd-add-assignment-group">
          <FaPlus className="me-1" /> Group
        </button>
        <Link href={`/courses/${cid}/assignments/new`}
          className="btn btn-danger" id="wd-add-assignment">
          <FaPlus className="me-1" /> Assignment
        </Link>
      </div>

      <ul className="list-group rounded-0" id="wd-assignment-list">
        <li className="list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS
            <span className="ms-auto badge rounded-pill bg-secondary text-dark border">
              40% of Total
            </span>
            <FaPlus className="ms-2" />
            <IoEllipsisVertical className="ms-2 fs-4" />
          </div>
          <ul className="list-group rounded-0">
            {courseAssignments.map((assignment: any) => (
              <li key={assignment._id}
                className="list-group-item p-3 ps-1 d-flex align-items-start"
                style={{ borderLeft: "3px solid green" }}>
                <BsGripVertical className="me-2 fs-3 mt-1" />
                <MdAssignment className="me-2 fs-3 text-success mt-1" />
                <div className="flex-fill">
                  <Link href={`/courses/${cid}/assignments/${assignment._id}`}
                    className="wd-assignment-link fw-bold text-dark text-decoration-none">
                    {assignment.title}
                  </Link>
                  <br />
                  <span className="text-muted">
                    Multiple Modules | <b>Not available until</b>{" "}
                    {assignment.availableFrom} | <b>Due</b>{" "}
                    {assignment.dueDate} | {assignment.points} pts
                  </span>
                </div>
                <div className="float-end ms-2 d-flex align-items-center">
                  <FaTrash className="text-danger me-2" style={{ cursor: "pointer" }}
                    onClick={() => confirmDelete(assignment)} />
                  <FaCheckCircle className="text-success me-2" />
                  <FaEllipsisV />
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
