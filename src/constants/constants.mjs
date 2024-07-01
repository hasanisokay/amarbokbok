export const COOKIE_NAME = "token";
export const dbErrorResponse = {
    status: 404,
    message: "Database connection error",
  }
export const serverErrorResponse = {
    status: 500,
    message: "Server side error. Contact support.",
  }
export const unauthorizedResponse = {
    status: 401,
    message: "Unauthorized.",
  }
  // export const hostname = window.location.hostname