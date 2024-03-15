import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IForm, IFormFetchedThreeIdeas } from "../interfaces";
import { generateDialogue } from "@/store/thunks";

interface IState {
  isLoading: boolean;
  isGenerating: boolean;
  data: IForm | null;
  fetchedData: IFormFetchedThreeIdeas | null;
}

const initialState: IState = {
  isLoading: false,
  isGenerating: false,
  data: null,
  fetchedData: null,
};

export const content = createSlice({
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
  extraReducers(build) {},
});

const contentReducer = content.reducer;
const contentCreators = content.actions;

export { contentReducer, contentCreators };
