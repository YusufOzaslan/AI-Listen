import { createAction, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { startExam, examRefresh, examSaveAnswer } from "@/store/thunks";
import { IContentDialogue } from "./content.slice";
export interface IStudentAnswers {
  questionId: string;
  answer: string;
}
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
  studentAnswers: IStudentAnswers[];
}
interface IState {
  isGenerating: boolean;
  examData: IExamInfo | null;
  error: string | undefined;
}

const initialState: IState = {
  isGenerating: false,
  examData: null,
  error: undefined,
};
export const resetExamData = createAction("resetExamData");

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
    // Save Answer
    build.addCase(examSaveAnswer.pending, (state) => {
      state.isGenerating = true;
    });
    build.addCase(
      examSaveAnswer.fulfilled,
      (state, { payload }: PayloadAction<IStudentAnswers[]>) => {
        state.isGenerating = false;
        state.examData!.studentAnswers = payload;
      }
    );
    build.addCase(examSaveAnswer.rejected, (state, { error }) => {
      state.isGenerating = false;
      state.error = error.message;
    });
    // Reset Data
    build.addCase(resetExamData, (state) => {
      state.examData = null;
    });
  },
});

const examStudentReducer = examStudent.reducer;
const examStudentActionCreators = examStudent.actions;

export { examStudentReducer, examStudentActionCreators };
