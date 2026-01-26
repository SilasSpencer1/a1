import Link from "next/link";
export default async function Assignments({ params }: { params: Promise<{ cid: string }> }) {
  const { cid } = await params;
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link href={`/courses/${cid}/assignments/123`} className="wd-assignment-link">
            A1 - ENV + HTML
          </Link>
          <br />
          Multiple Modules | <b>Not available until</b> May 6 at 12:00am |
          <br />
          <b>Due</b> May 13 at 11:59pm | 100 pts
        </li>
        <li className="wd-assignment-list-item">
          <Link href={`/courses/${cid}/assignments/124`} className="wd-assignment-link">
            A2 - CSS + Bootstrap
          </Link>
          <br />
          Multiple Modules | <b>Not available until</b> May 13 at 12:00am |
          <br />
          <b>Due</b> May 20 at 11:59pm | 100 pts
        </li>
        <li className="wd-assignment-list-item">
          <Link href={`/courses/${cid}/assignments/125`} className="wd-assignment-link">
            A3 - JavaScript + React
          </Link>
          <br />
          Multiple Modules | <b>Not available until</b> May 20 at 12:00am |
          <br />
          <b>Due</b> May 27 at 11:59pm | 100 pts
        </li>
      </ul>
      <h3>QUIZZES 20% of Total <button>+</button></h3>
      <ul>
        <li className="wd-assignment-list-item">
          <Link href={`/courses/${cid}/assignments/q1`} className="wd-assignment-link">
            Q1 - HTML Quiz
          </Link>
        </li>
        <li className="wd-assignment-list-item">
          <Link href={`/courses/${cid}/assignments/q2`} className="wd-assignment-link">
            Q2 - CSS Quiz
          </Link>
        </li>
      </ul>
      <h3>EXAMS 25% of Total <button>+</button></h3>
      <ul>
        <li className="wd-assignment-list-item">
          <Link href={`/courses/${cid}/assignments/e1`} className="wd-assignment-link">
            E1 - Midterm Exam
          </Link>
        </li>
        <li className="wd-assignment-list-item">
          <Link href={`/courses/${cid}/assignments/e2`} className="wd-assignment-link">
            E2 - Final Exam
          </Link>
        </li>
      </ul>
      <h3>PROJECT 15% of Total <button>+</button></h3>
      <ul>
        <li className="wd-assignment-list-item">
          <Link href={`/courses/${cid}/assignments/p1`} className="wd-assignment-link">
            P1 - Final Project
          </Link>
        </li>
      </ul>
    </div>
  );
}





