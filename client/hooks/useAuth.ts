import { useAppDispatch, useAppSelector } from "@/store/";
import {
  refresh as refreshThunk,
  signOut as signOutThunk,
} from "@/store/thunks";
export const useAuth = () => {
  const auth = useAppSelector((store) => store.auth);
  
  const dispatch = useAppDispatch();

  const refresh = async () => dispatch(refreshThunk());

  const signOut = () => {
    dispatch(signOutThunk());
  };


  return {
    ...{...(auth.data && auth.data)},
    isAuthenticated: !!auth.data?.accessToken,
    role: auth.data?.user.role,
    isAdmin: auth.data?.user.role === "admin",
    isTeacher: auth.data?.user.role === "teacher",
    isStudent: auth.data?.user.role === "student",
    refresh,
    signOut,
  };
};
