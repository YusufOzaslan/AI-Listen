import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IUserAttributes {
  name: string;
  email: string;
  password: string;
}

export interface IUserDocument extends mongoose.Document, IUserAttributes {
  isPasswordCorrect(password: string): Promise<boolean>;
  role: string;
}

interface IUserModel extends mongoose.Model<IUserDocument> {
  build(attrs: IUserAttributes): IUserDocument;
  isEmailTaken(email: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    default: "student",
  },
});

userSchema.statics.build = (attrs: IUserAttributes): IUserDocument =>
  new User(attrs);

userSchema.statics.isEmailTaken = async function (email: string) {
  const user = await User.findOne({ email });
  return !!user;
};

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 13);
  }
  next();
});

export const User = mongoose.model<IUserDocument, IUserModel>(
  "User",
  userSchema
);
