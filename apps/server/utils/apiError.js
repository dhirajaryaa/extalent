class ApiError extends Error {
  constructor(
    statusCode,
    message,
    data=null,
    isSuccess = false,
    isError = true,
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.isSuccess = isSuccess;
    this.isError = isError;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;