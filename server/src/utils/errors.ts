export class AppError extends Error {
  constructor(message: string, options?: any) {
    super(message);
    this.name = "AppError";
    if (options) {
      Object.assign(this, options);
    }
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
    Object.setPrototypeOf(this, new.target.prototype);
  }

  static from(e: Error) {
    const appError = new AppError(e.message, e);
    return appError;
  }
}
