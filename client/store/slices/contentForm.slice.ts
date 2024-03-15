import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IForm, IFormFetchedThreeIdeas } from "../interfaces";
import { generateIdeas } from "@/store/thunks";

interface IState {
  isGenerating: boolean;
  data: IForm | null;
  fetchedData: IFormFetchedThreeIdeas | null;
}

const initialState: IState = {
  isGenerating: false,
  data: null,
  fetchedData: null,
};

export const contentForm = createSlice({
  name: "contentForm",
  initialState,
  reducers: {
    updateData(state, { payload }: PayloadAction<IForm>) {
      state.data = {
        ...state.data,
        ...payload,
      };
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
