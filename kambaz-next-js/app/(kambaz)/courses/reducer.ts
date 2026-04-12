import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as client from "./client";
import * as accountClient from "../account/client";

export const fetchAllCourses = createAsyncThunk(
  "courses/fetchAllCourses",
  async () => {
    const courses = await client.fetchAllCourses();
    return courses;
  }
);
export const fetchMyCourses = createAsyncThunk(
  "courses/fetchMyCourses",
  async () => {
    const courses = await accountClient.findMyCourses();
    return courses;
  }
);
export const addNewCourse = createAsyncThunk(
  "courses/addNewCourse",
  async (course: any) => {
    const newCourse = await accountClient.createCourse(course);
    return newCourse;
  }
);
export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (courseId: string) => {
    await client.deleteCourse(courseId);
    return courseId;
  }
);
export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async (course: any) => {
    await client.updateCourse(course);
    return course;
  }
);

const initialState = {
  courses: [] as any[],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.fulfilled, (state, { payload }) => {
        state.courses = payload;
      })
      .addCase(fetchMyCourses.fulfilled, (state, { payload }) => {
        state.courses = payload;
      })
      .addCase(addNewCourse.fulfilled, (state, { payload }) => {
        state.courses = [...state.courses, payload] as any;
      })
      .addCase(deleteCourse.fulfilled, (state, { payload: courseId }) => {
        state.courses = state.courses.filter((c: any) => c._id !== courseId);
      })
      .addCase(updateCourse.fulfilled, (state, { payload: course }) => {
        state.courses = state.courses.map((c: any) =>
          c._id === course._id ? course : c
        ) as any;
      });
  },
});

export default coursesSlice.reducer;
