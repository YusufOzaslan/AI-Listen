import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { generateDialogue } from "@/store/thunks";

export interface IFetchedDialogue {
  title: string;
  dialogues: Array<{
    speaker: string;
    text: string;
  }>;
}
interface IState {
  isGenerating: boolean;
  data: IFetchedDialogue | null;
}

const initialState: IState = {
  isGenerating: false,
  data: null,
};

export const content = createSlice({
  name: "contentForm",
  initialState,
  reducers: {},
  extraReducers(build) {
    // Generate  dialogue
    build.addCase(generateDialogue.pending, (state) => {
      state.isGenerating = true;
    });
    build.addCase(
      generateDialogue.fulfilled,
      (state, { payload }: PayloadAction<IFetchedDialogue>) => {
        state.isGenerating = false;
        state.data = payload;
      }
    );
    build.addCase(generateDialogue.rejected, (state, { error }) => {
      state.isGenerating = false;
    });
  },
});

const contentReducer = content.reducer;
const contentCreators = content.actions;

export { contentReducer, contentCreators };
