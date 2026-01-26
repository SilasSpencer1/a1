import Link from "next/link";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" width={200} height={150} alt="reactjs" />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/2345" className="wd-dashboard-course-link">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width={200} height={150} alt="nodejs" />
            <div>
              <h5>CS2345 Node.js</h5>
              <p className="wd-dashboard-course-title">
                Server-side JavaScript runtime
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/3456" className="wd-dashboard-course-link">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" width={200} height={150} alt="mongodb" />
            <div>
              <h5>CS3456 MongoDB</h5>
              <p className="wd-dashboard-course-title">
                NoSQL Database Management
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/4567" className="wd-dashboard-course-link">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" width={200} height={150} alt="nextjs" />
            <div>
              <h5>CS4567 Next.js</h5>
              <p className="wd-dashboard-course-title">
                React Framework for Production
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/5678" className="wd-dashboard-course-link">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" width={200} height={150} alt="typescript" />
            <div>
              <h5>CS5678 TypeScript</h5>
              <p className="wd-dashboard-course-title">
                Typed JavaScript at Scale
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/6789" className="wd-dashboard-course-link">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg" width={200} height={150} alt="html-css" />
            <div>
              <h5>CS6789 HTML &amp; CSS</h5>
              <p className="wd-dashboard-course-title">
                Web Development Fundamentals
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/7890" className="wd-dashboard-course-link">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" width={200} height={150} alt="javascript" />
            <div>
              <h5>CS7890 JavaScript</h5>
              <p className="wd-dashboard-course-title">
                Programming the Web
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
