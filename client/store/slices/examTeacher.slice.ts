import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { generateExam } from "@/store/thunks";


interface IState {
  isGenerating: boolean;
  examUrl: string | null;
}

const initialState: IState = {
  isGenerating: false,
  examUrl: null,
};

export const examTeacher = createSlice({
  name: "examTeacher",
  initialState,
  reducers: { },
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
  },
});

const examTeacherReducer = examTeacher.reducer;
const examTeacherActionCreators = examTeacher.actions;

export { examTeacherReducer, examTeacherActionCreators };
