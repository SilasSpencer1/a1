"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Row, Col, Card, CardImg, CardBody, CardTitle, CardText,
  Button, FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCourse, deleteCourse, updateCourse, fetchAllCourses, fetchMyCourses,
} from "../courses/reducer";
import { enroll, unenroll } from "../enrollments/reducer";
import { RootState } from "../store";
import * as accountClient from "../account/client";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [myCourseIds, setMyCourseIds] = useState<string[]>([]);
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description",
  });

  const refreshMyCourseIds = async () => {
    if (!currentUser) return setMyCourseIds([]);
    try {
      const mine = await accountClient.findMyCourses();
      setMyCourseIds(mine.map((c: any) => c._id));
    } catch {
      setMyCourseIds([]);
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    if (showAllCourses) {
      dispatch(fetchAllCourses() as any);
    } else {
      dispatch(fetchMyCourses() as any);
    }
    refreshMyCourseIds();
  }, [showAllCourses, currentUser]);

  const isEnrolled = (courseId: string) => myCourseIds.includes(courseId);

  const handleEnroll = async (cid: string) => {
    if (!currentUser) return;
    await dispatch(enroll({ userId: currentUser._id, courseId: cid }) as any);
    setMyCourseIds([...myCourseIds, cid]);
  };
  const handleUnenroll = async (cid: string) => {
    if (!currentUser) return;
    await dispatch(unenroll({ userId: currentUser._id, courseId: cid }) as any);
    setMyCourseIds(myCourseIds.filter((id) => id !== cid));
  };
  const handleAdd = async () => {
    await dispatch(addNewCourse(course) as any);
    if (!showAllCourses) dispatch(fetchMyCourses() as any);
    refreshMyCourseIds();
  };
  const handleUpdate = async () => {
    await dispatch(updateCourse(course) as any);
  };
  const handleDelete = async (cid: string) => {
    await dispatch(deleteCourse(cid) as any);
    refreshMyCourseIds();
  };

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h5>
        New Course
        <button className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={handleAdd}>
          Add
        </button>
        <button className="btn btn-warning float-end me-2"
          id="wd-update-course-click"
          onClick={handleUpdate}>
          Update
        </button>
        {currentUser && (
          <button
            className="btn btn-primary float-end me-2"
            onClick={() => setShowAllCourses(!showAllCourses)}>
            {showAllCourses ? "My Courses" : "All Courses"}
          </button>
        )}
      </h5>
      <br />
      <FormControl value={course.name} className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })} />
      <FormControl as="textarea" value={course.description} rows={3} className="mb-2"
        onChange={(e) => setCourse({ ...course, description: e.target.value })} />
      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((c: any) => (
            <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link href={`/courses/${c._id}/home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark">
                  <CardImg src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.name}
                    </CardTitle>
                    <CardText className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}>
                      {c.description}
                    </CardText>
                    <Button variant="primary">Go</Button>
                    {showAllCourses && currentUser && (
                      isEnrolled(c._id) ? (
                        <Button variant="danger" className="float-end"
                          onClick={(e) => { e.preventDefault(); handleUnenroll(c._id); }}>
                          Unenroll
                        </Button>
                      ) : (
                        <Button variant="success" className="float-end"
                          onClick={(e) => { e.preventDefault(); handleEnroll(c._id); }}>
                          Enroll
                        </Button>
                      )
                    )}
                    {!showAllCourses && (
                      <>
                        <button onClick={(e) => { e.preventDefault(); handleDelete(c._id); }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click">
                          Delete
                        </button>
                        <button id="wd-edit-course-click"
                          onClick={(e) => { e.preventDefault(); setCourse(c); }}
                          className="btn btn-warning me-2 float-end">
                          Edit
                        </button>
                      </>
                    )}
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
