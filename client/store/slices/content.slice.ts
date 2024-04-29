import { createAction, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  generateDialogue,
  generateDialogueSpeech,
  generateImage,
  generateQuestions,
  getContents,
  getQuestion,
} from "@/store/thunks";
export interface IFaceCoordinates {
  bottom_right_x: number;
  bottom_right_y: number;
  top_left_x: number;
  top_left_y: number;
}
export interface IContentDialogue {
  _id: string;
  title: string;
  level: string;
  dialogues: Array<{
    speaker: string;
    text: string;
  }>;
  audio?: string;
  imageData?: {
    image: string;
    faces: IFaceCoordinates[];
  };
}

export interface IQuestion {
  _id: string;
  content: string;
  user: string;
  question: string;
  options: string[];
  answer: string;
}
interface IState {
  isGenerating: boolean;
  data: IContentDialogue | null;
  myData: IContentDialogue[] | null;
  dataQuestions: IQuestion[] | null;
}

const initialState: IState = {
  isGenerating: false,
  data: null,
  myData: null,
  dataQuestions: null,
};

export const resetQuestion = createAction("resetQuestion");

export const content = createSlice({
  name: "contentForm",
  initialState,
  reducers: {},
  extraReducers(build) {
    // Generate  Dialogue Text
    build.addCase(generateDialogue.pending, (state) => {
      state.isGenerating = true;
    });
    build.addCase(
      generateDialogue.fulfilled,
      (state, { payload }: PayloadAction<IContentDialogue>) => {
        state.isGenerating = false;
        state.data = payload;
      }
    );
    build.addCase(generateDialogue.rejected, (state, { error }) => {
      state.isGenerating = false;
    });
    // Generate  Speech
    build.addCase(generateDialogueSpeech.pending, (state) => {
      state.isGenerating = true;
    });
    build.addCase(
      generateDialogueSpeech.fulfilled,
      (state, { payload }: PayloadAction<IContentDialogue>) => {
        state.isGenerating = false;
        state.data = payload;
      }
    );
    build.addCase(generateDialogueSpeech.rejected, (state) => {
      state.isGenerating = false;
    });
    // Generate  Image
    build.addCase(generateImage.pending, (state) => {
      state.isGenerating = true;
    });
    build.addCase(
      generateImage.fulfilled,
      (state, { payload }: PayloadAction<IContentDialogue>) => {
        state.isGenerating = false;
        state.data = payload;
      }
    );
    build.addCase(generateImage.rejected, (state) => {
      state.isGenerating = false;
    });

    // Generate Questions
    build.addCase(generateQuestions.pending, (state) => {
      state.isGenerating = true;
    });
    build.addCase(
      generateQuestions.fulfilled,
      (state, { payload }: PayloadAction<IQuestion[]>) => {
        state.isGenerating = false;
        state.dataQuestions = payload;
      }
    );
    build.addCase(generateQuestions.rejected, (state) => {
      state.isGenerating = false;
    });

    // Get Contents
    build.addCase(getContents.pending, (state) => {
      state.isGenerating = true;
    });
    build.addCase(
      getContents.fulfilled,
      (state, { payload }: PayloadAction<IContentDialogue[]>) => {
        state.isGenerating = false;
        state.myData = payload;
      }
    );
    build.addCase(getContents.rejected, (state) => {
      state.isGenerating = false;
    });

    // Get Questions
    build.addCase(getQuestion.pending, (state) => {
      state.isGenerating = true;
    });
    build.addCase(
      getQuestion.fulfilled,
      (state, { payload }: PayloadAction<IQuestion[]>) => {
        state.isGenerating = false;
        state.dataQuestions = payload;
      }
    );
    build.addCase(getQuestion.rejected, (state) => {
      state.isGenerating = false;
    });
    // Reset Question
    build.addCase(resetQuestion, (state) => {
      state.dataQuestions = null;
    });
  },
});

const contentReducer = content.reducer;
const contentCreators = content.actions;

export { contentReducer, contentCreators };
