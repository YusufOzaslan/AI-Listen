import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { generateIdeas } from "@/store/thunks";

interface IFormFetchedThreeIdeas {
  ideas: Array<{
    title: string;
    description: string;
  }>;
}
interface IState {
  isGenerating: boolean;
  fetchedData: IFormFetchedThreeIdeas | null;
  stepIndex: number;
}

const initialState: IState = {
  isGenerating: false,
  fetchedData: null,
  stepIndex: 0,
};

export const contentForm = createSlice({
  name: "contentForm",
  initialState,
  reducers: {
    updateStepIndex(state, { payload }: PayloadAction<number>) {
      state.stepIndex = payload;
    },
  },
  extraReducers(build) {
    // Generate  Ideas
    build.addCase(generateIdeas.pending, (state) => {
      state.isGenerating = true;
    });
    build.addCase(
      generateIdeas.fulfilled,
      (state, { payload }: PayloadAction<IFormFetchedThreeIdeas>) => {
        state.isGenerating = false;
        state.fetchedData = payload;
      }
    );
    build.addCase(generateIdeas.rejected, (state, { error }) => {
      state.isGenerating = false;
    });
  },
});

const formReducer = contentForm.reducer;
const formActionCreators = contentForm.actions;

export { formReducer, formActionCreators };
