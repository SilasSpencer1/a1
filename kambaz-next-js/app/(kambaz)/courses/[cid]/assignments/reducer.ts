import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as client from "./client";

export const fetchAssignments = createAsyncThunk(
  "assignments/fetchAssignments",
  async (courseId: string) => {
    const assignments = await client.findAssignmentsForCourse(courseId);
    return assignments;
  }
);
export const addAssignment = createAsyncThunk(
  "assignments/addAssignment",
  async ({ courseId, assignment }: { courseId: string; assignment: any }) => {
    const newAssignment = await client.createAssignment(courseId, assignment);
    return newAssignment;
  }
);
export const deleteAssignment = createAsyncThunk(
  "assignments/deleteAssignment",
  async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    return assignmentId;
  }
);
export const updateAssignment = createAsyncThunk(
  "assignments/updateAssignment",
  async (assignment: any) => {
    await client.updateAssignment(assignment);
    return assignment;
  }
);

const initialState = {
  assignments: [] as any[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignments.fulfilled, (state, { payload }) => {
        state.assignments = payload;
      })
      .addCase(addAssignment.fulfilled, (state, { payload }) => {
        state.assignments = [...state.assignments, payload] as any;
      })
      .addCase(deleteAssignment.fulfilled, (state, { payload: assignmentId }) => {
        state.assignments = state.assignments.filter(
          (a: any) => a._id !== assignmentId
        );
      })
      .addCase(updateAssignment.fulfilled, (state, { payload: assignment }) => {
        state.assignments = state.assignments.map((a: any) =>
          a._id === assignment._id ? assignment : a
        ) as any;
      });
  },
});

export default assignmentsSlice.reducer;
