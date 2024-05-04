import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { formReducer, contentReducer, authtReducer, examTeacherReducer } from "./slices";

const store = configureStore({
  reducer: {
    content: contentReducer,
    form: formReducer,
    auth: authtReducer,
    examTeacher: examTeacherReducer,
  },
});

setupListeners(store.dispatch);

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store, useAppSelector, useAppDispatch };
