import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/courses/1234/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg
                  variant="top"
                  src="/images/reactjs.jpg"
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS1234 React JS
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Full Stack software developer
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/courses/2345/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <div
                  style={{ height: 160, backgroundColor: "#68a063" }}
                  className="d-flex align-items-center justify-content-center"
                >
                  <span className="text-white fs-1 fw-bold">Node.js</span>
                </div>
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS2345 Node.js
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Server-side JavaScript runtime environment
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/courses/3456/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <div
                  style={{ height: 160, backgroundColor: "#4DB33D" }}
                  className="d-flex align-items-center justify-content-center"
                >
                  <span className="text-white fs-1 fw-bold">MongoDB</span>
                </div>
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS3456 MongoDB
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    NoSQL Database Management
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/courses/4567/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <div
                  style={{ height: 160, backgroundColor: "#000000" }}
                  className="d-flex align-items-center justify-content-center"
                >
                  <span className="text-white fs-1 fw-bold">Next.js</span>
                </div>
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS4567 Next.js
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    React Framework for Production
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/courses/5678/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <div
                  style={{ height: 160, backgroundColor: "#3178C6" }}
                  className="d-flex align-items-center justify-content-center"
                >
                  <span className="text-white fs-1 fw-bold">TypeScript</span>
                </div>
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS5678 TypeScript
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Typed JavaScript at Scale
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/courses/6789/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <div
                  style={{ height: 160, backgroundColor: "#E44D26" }}
                  className="d-flex align-items-center justify-content-center"
                >
                  <span className="text-white fs-1 fw-bold">HTML &amp; CSS</span>
                </div>
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS6789 HTML &amp; CSS
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Web Development Fundamentals
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/courses/7890/home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <div
                  style={{ height: 160, backgroundColor: "#F7DF1E" }}
                  className="d-flex align-items-center justify-content-center"
                >
                  <span className="text-dark fs-1 fw-bold">JavaScript</span>
                </div>
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS7890 JavaScript
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Programming the Web
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
