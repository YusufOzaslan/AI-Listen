import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { generateDialogue, generateImage } from "@/store/thunks";
import { generateDialogueSpeech } from "../thunks/generateDialogueSpeech";
import { generateQuestions } from "@/store/thunks";
export interface IFaceCoordinates {
  bottom_right_x: number;
  bottom_right_y: number;
  top_left_x: number;
  top_left_y: number;
}
export interface IContentDialogue {
  _id: string;
  title: string;
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
  dataQuestions: IQuestion[] | null;
}

const initialState: IState = {
  isGenerating: false,
  data: null,
  dataQuestions: null,
};

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
    build.addCase(generateDialogueSpeech.rejected, (state, { error }) => {
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
    build.addCase(generateImage.rejected, (state, { error }) => {
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
    build.addCase(generateQuestions.rejected, (state, { error }) => {
      state.isGenerating = false;
    });
  },
});

const contentReducer = content.reducer;
const contentCreators = content.actions;

export { contentReducer, contentCreators };
