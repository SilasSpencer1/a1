import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as accountClient from "../account/client";

export const enroll = createAsyncThunk(
  "enrollments/enroll",
  async ({ userId, courseId }: { userId: string; courseId: string }) => {
    await accountClient.enrollIntoCourse(userId, courseId);
    return { userId, courseId };
  }
);
export const unenroll = createAsyncThunk(
  "enrollments/unenroll",
  async ({ userId, courseId }: { userId: string; courseId: string }) => {
    await accountClient.unenrollFromCourse(userId, courseId);
    return { userId, courseId };
  }
);

const initialState = {
  enrollments: [] as any[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload }) => {
      state.enrollments = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(enroll.fulfilled, (state, { payload }) => {
        state.enrollments = [
          ...state.enrollments,
          {
            _id: `${payload.userId}-${payload.courseId}`,
            user: payload.userId,
            course: payload.courseId,
          },
        ];
      })
      .addCase(unenroll.fulfilled, (state, { payload }) => {
        state.enrollments = state.enrollments.filter(
          (e: any) => !(e.user === payload.userId && e.course === payload.courseId)
        );
      });
  },
});

export const { setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
