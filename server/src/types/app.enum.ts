export enum ENodeEnvironment {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
  TEST = "test",
}

export enum EAppError {
  // Authentication & Authorization Errors
  UNAUTHORIZED = "Unauthorized",
  FORBIDDEN = "Forbidden",
  NOT_FOUND = "Not found",
  INTERNAL_SERVER_ERROR = "Internal server error.",
  // User Errors
  USERNAME_TAKEN = "Username already exists",
  EMAIL_TAKEN = "Email already exists",
  INCORRECT_PASSWORD = "Incorrect password",
  INVALID_CREDENTIALS = "Invalid credentials",

  // Token Errors
  INVALID_TOKEN = "Invalid Token",
  INVALID_ACCESS_TOKEN = "Invalid access token",
  EXPIRED_ACCESS_TOKEN = "Access token has expired",

  //Exam
  INVALID_EXAM_URL = "Invalid exam url",
  EXAM_ALREADY_TAKEN = "Exam has already been taken by the student",
  EXAM_OUT_OF_CAPACITY = "The activity has reached its full capacity.",
  EXAM_IS_OVER = "Exam is over",
}
