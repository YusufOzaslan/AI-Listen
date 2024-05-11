import { createAction, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { generateExam, getExamUrl } from "@/store/thunks";

interface IState {
  isGenerating: boolean;
  examUrl: string | null;
}

const initialState: IState = {
  isGenerating: false,
  examUrl: null,
};

export const resetExamUrl = createAction("resetExamUrl");

export const examTeacher = createSlice({
  name: "examTeacher",
  initialState,
  reducers: {},
  extraReducers(build) {
    // Generate  Exam
    build.addCase(generateExam.pending, (state) => {
      state.isGenerating = true;
    });
    build.addCase(
      generateExam.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.isGenerating = false;
        state.examUrl = payload;
      }
    );
    build.addCase(generateExam.rejected, (state, { error }) => {
      state.isGenerating = false;
    });
    // Get Exam Url
    build.addCase(getExamUrl.pending, (state) => {
      state.isGenerating = true;
    });
    build.addCase(
      getExamUrl.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.isGenerating = false;
        state.examUrl = payload;
      }
    );
    build.addCase(getExamUrl.rejected, (state, { error }) => {
      state.isGenerating = false;
    });
    // Reset Data
    build.addCase(resetExamUrl, (state) => {
      state.examUrl = null;
    });
  },
});

const examTeacherReducer = examTeacher.reducer;
const examTeacherActionCreators = examTeacher.actions;

export { examTeacherReducer, examTeacherActionCreators };
