import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as client from "./client";

export const fetchModules = createAsyncThunk(
  "modules/fetchModules",
  async (courseId: string) => {
    const modules = await client.findModulesForCourse(courseId);
    return modules;
  }
);
export const addModule = createAsyncThunk(
  "modules/addModule",
  async ({ courseId, module }: { courseId: string; module: any }) => {
    const newModule = await client.createModule(courseId, module);
    return newModule;
  }
);
export const deleteModule = createAsyncThunk(
  "modules/deleteModule",
  async (moduleId: string) => {
    await client.deleteModule(moduleId);
    return moduleId;
  }
);
export const updateModule = createAsyncThunk(
  "modules/updateModule",
  async (module: any) => {
    await client.updateModule(module);
    return module;
  }
);

const initialState = {
  modules: [] as any[],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === moduleId ? { ...m, editing: true } : m
      ) as any;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModules.fulfilled, (state, { payload }) => {
        state.modules = payload;
      })
      .addCase(addModule.fulfilled, (state, { payload }) => {
        state.modules = [...state.modules, payload] as any;
      })
      .addCase(deleteModule.fulfilled, (state, { payload: moduleId }) => {
        state.modules = state.modules.filter((m: any) => m._id !== moduleId);
      })
      .addCase(updateModule.fulfilled, (state, { payload: module }) => {
        state.modules = state.modules.map((m: any) =>
          m._id === module._id ? module : m
        ) as any;
      });
  },
});

export const { editModule } = modulesSlice.actions;
export default modulesSlice.reducer;
