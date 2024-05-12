import { createAction, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { generateExam, getExamUrl, getExamResults } from "@/store/thunks";

export interface IScore {
  trueCount: number;
  falseCount: number;
}
interface IStudentResult {
  name: string;
  studentNumber: string;
  score: IScore;
  startTime: number;
  finishTime?: number;
}
interface IExamResult {
  examName: string;
  contentTitle: string;
  school: string;
  class: string;
  timeLimitInMinutes: number;
  capacity: number;
  students: IStudentResult[];
}
interface IState {
  isGenerating: boolean;
  examResults: IExamResult[] | null;
  examUrl: string | null;
}

const initialState: IState = {
  isGenerating: false,
  examResults: null,
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
    // Get Exam Results
    build.addCase(getExamResults.pending, (state) => {
      state.isGenerating = true;
    });
    build.addCase(
      getExamResults.fulfilled,
      (state, { payload }: PayloadAction<IExamResult[]>) => {
        state.isGenerating = false;
        state.examResults = payload;
      }
    );
    build.addCase(getExamResults.rejected, (state, { error }) => {
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
