import Link from "next/link";
import { BsGripVertical } from "react-icons/bs";
import { FaSearch, FaPlus, FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdAssignment } from "react-icons/md";

export default async function Assignments({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;
  return (
    <div id="wd-assignments" className="p-3">
      <div className="d-flex mb-3">
        <div className="input-group w-50 me-auto">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            className="form-control"
            placeholder="Search for Assignments"
            id="wd-search-assignment"
          />
        </div>
        <button
          className="btn btn-secondary me-2"
          id="wd-add-assignment-group"
        >
          <FaPlus className="me-1" /> Group
        </button>
        <button className="btn btn-danger" id="wd-add-assignment">
          <FaPlus className="me-1" /> Assignment
        </button>
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
            <li
              className="list-group-item p-3 ps-1 d-flex align-items-start"
              style={{ borderLeft: "3px solid green" }}
            >
              <BsGripVertical className="me-2 fs-3 mt-1" />
              <MdAssignment className="me-2 fs-3 text-success mt-1" />
              <div className="flex-fill">
                <Link
                  href={`/courses/${cid}/assignments/123`}
                  className="wd-assignment-link fw-bold text-dark text-decoration-none"
                >
                  A1 - ENV + HTML
                </Link>
                <br />
                <span className="text-muted">
                  Multiple Modules | <b>Not available until</b> May 6 at 12:00am
                  | <b>Due</b> May 13 at 11:59pm | 100 pts
                </span>
              </div>
              <div className="float-end ms-2 d-flex align-items-center">
                <FaCheckCircle className="text-success me-2" />
                <FaEllipsisV />
              </div>
            </li>
            <li
              className="list-group-item p-3 ps-1 d-flex align-items-start"
              style={{ borderLeft: "3px solid green" }}
            >
              <BsGripVertical className="me-2 fs-3 mt-1" />
              <MdAssignment className="me-2 fs-3 text-success mt-1" />
              <div className="flex-fill">
                <Link
                  href={`/courses/${cid}/assignments/124`}
                  className="wd-assignment-link fw-bold text-dark text-decoration-none"
                >
                  A2 - CSS + Bootstrap
                </Link>
                <br />
                <span className="text-muted">
                  Multiple Modules | <b>Not available until</b> May 13 at
                  12:00am | <b>Due</b> May 20 at 11:59pm | 100 pts
                </span>
              </div>
              <div className="float-end ms-2 d-flex align-items-center">
                <FaCheckCircle className="text-success me-2" />
                <FaEllipsisV />
              </div>
            </li>
            <li
              className="list-group-item p-3 ps-1 d-flex align-items-start"
              style={{ borderLeft: "3px solid green" }}
            >
              <BsGripVertical className="me-2 fs-3 mt-1" />
              <MdAssignment className="me-2 fs-3 text-success mt-1" />
              <div className="flex-fill">
                <Link
                  href={`/courses/${cid}/assignments/125`}
                  className="wd-assignment-link fw-bold text-dark text-decoration-none"
                >
                  A3 - JavaScript + React
                </Link>
                <br />
                <span className="text-muted">
                  Multiple Modules | <b>Not available until</b> May 20 at
                  12:00am | <b>Due</b> May 27 at 11:59pm | 100 pts
                </span>
              </div>
              <div className="float-end ms-2 d-flex align-items-center">
                <FaCheckCircle className="text-success me-2" />
                <FaEllipsisV />
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
