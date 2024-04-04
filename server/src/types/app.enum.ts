export enum ENodeEnvironment {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
  TEST = "test",
}

export enum EAppError {
  // Authentication & Authorization Errors
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  NOT_FOUND = 'Not found',
  INTERNAL_SERVER_ERROR = 'Internal server error.',
  FORGOT_PASSWORD_INVALID_EMAIL = 'This email is not associated with any account, please enter a valid email.',

  // User Errors
  USERNAME_TAKEN = 'Username already exists',
  EMAIL_TAKEN = 'Email already exists',
  INCORRECT_PASSWORD = 'Incorrect password',
  INVALID_CREDENTIALS = 'Invalid credentials',

  // Token Errors
  INVALID_TOKEN = 'Invalid Token',
  INVALID_ACCESS_TOKEN = 'Invalid access token',
  EXPIRED_ACCESS_TOKEN = 'Access token has expired',
}
