import { User, IUserAttributes } from "../models";
import httpStatus from "http-status";

export const signUp = async (attrs: IUserAttributes) => {
  if (await User.isEmailTaken(attrs.email))
    throw new Error(`${httpStatus.BAD_REQUEST}, Email already exists`);
  const user = User.build(attrs);
  user.role = "teacher";
  user.save();
  return user;
};

export const signIn = async (
  attrs: Pick<IUserAttributes, "email" | "password">
) => {
  const user = await User.findOne({ email: attrs.email });
  if (!user) throw new Error(`${httpStatus.BAD_REQUEST}, User not found`);
  if (!(await user.isPasswordCorrect(attrs.password)))
    throw new Error(`${httpStatus.BAD_REQUEST}, User not found`);

  return user;
};

export const authService = { signUp, signIn };
