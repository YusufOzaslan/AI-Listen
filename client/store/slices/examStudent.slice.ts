import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { startExam, examRefresh } from "@/store/thunks";
import { IContentDialogue } from "./content.slice";

interface IExamQuestion {
  id: string;
  question: string;
  options: string[];
}
interface IExamInfo {
  examId: string;
  questions: IExamQuestion[];
  startTime: number;
  timeLimit: number;
  studentId: string;
  content: IContentDialogue;
}
interface IState {
  isGenerating: boolean;
  examData: IExamInfo | null;
  error: string | undefined;
  examStepIndex: number;
}

const initialState: IState = {
  isGenerating: false,
  examData: null,
  error: undefined,
  examStepIndex: 0,
};

export const examStudent = createSlice({
  name: "examStudent",
  initialState,
  reducers: {
    updateExamStepIndex(state, { payload }: PayloadAction<number>) {
      state.examStepIndex = payload;
    },
  },
  extraReducers(build) {
    // Generate  Exam
    build.addCase(startExam.pending, (state) => {
      state.isGenerating = true;
    });
    build.addCase(
      startExam.fulfilled,
      (state, { payload }: PayloadAction<IExamInfo>) => {
        state.isGenerating = false;
        state.examData = payload;
      }
    );
    build.addCase(startExam.rejected, (state, { error }) => {
      state.isGenerating = false;
      state.error = error.message;
    });
    // Refresh  Exam
    build.addCase(examRefresh.pending, (state) => {
      state.isGenerating = true;
    });
    build.addCase(
      examRefresh.fulfilled,
      (state, { payload }: PayloadAction<IExamInfo>) => {
        state.isGenerating = false;
        state.examData = payload;
      }
    );
    build.addCase(examRefresh.rejected, (state, { error }) => {
      state.isGenerating = false;
      state.error = error.message;
    });
  },
});

const examStudentReducer = examStudent.reducer;
const examStudentActionCreators = examStudent.actions;

export { examStudentReducer, examStudentActionCreators };
