import { useAppDispatch, useAppSelector } from "@/store/";
import { signOut as signOutThunk } from "@/store/thunks";
export const useAuth = () => {
  const auth = useAppSelector((store) => store.auth);

  const dispatch = useAppDispatch();

  const signOut = () => {
    dispatch(signOutThunk());
  };

  return {
    ...{ ...(auth.user && auth.user) },
    isAuthenticated: !!auth.user,
    role: auth.user?.role,
    isAdmin: auth.user?.role === "admin",
    isTeacher: auth.user?.role === "teacher",
    isStudent: auth.user?.role === "student",
    signOut,
  };
};
