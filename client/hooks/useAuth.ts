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

  const isOwner = (userId?: string) => {
    return auth.user?._id === userId;
  };

  return {
    ...{ ...(auth.user && auth.user) },
    isAuthenticated: !!auth.user?.accessToken,
    role: auth.user?.role,
    isAdmin: auth.user?.role === "admin",
    isTeacher: auth.user?.role === "teacher",
    isStudent: auth.user?.role === "student",
    refresh,
    signOut,
    isOwner,
  };
};
