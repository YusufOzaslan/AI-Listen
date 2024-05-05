import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { startExam } from "@/store/thunks";
import { IContentDialogue } from "./content.slice";

interface IState {
  isGenerating: boolean;
  examData: IContentDialogue | null;
  studentId: string | null;
  error: string | undefined;
}

const initialState: IState = {
  isGenerating: false,
  examData: null,
  studentId: null,
  error: undefined,
};

export const examStudent = createSlice({
  name: "examStudent",
  initialState,
  reducers: {},
  extraReducers(build) {
    // Generate  Exam
    build.addCase(startExam.pending, (state) => {
      state.isGenerating = true;
    });
    build.addCase(
      startExam.fulfilled,
      (
        state,
        {
          payload,
        }: PayloadAction<{ content: IContentDialogue; studentId: string }>
      ) => {
        state.isGenerating = false;
        state.examData = payload.content;
        state.studentId = payload.studentId;
      }
    );
    build.addCase(startExam.rejected, (state, { error }) => {
      state.isGenerating = false;
      state.error = error.message;
    });
  },
});

const examStudentReducer = examStudent.reducer;
const examStudentActionCreators = examStudent.actions;

export { examStudentReducer, examStudentActionCreators };
