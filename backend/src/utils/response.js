/**
 * Standard API Success Response Envelope
 */
export function sendSuccess(res, message = "Success", data = null, statusCode = 200) {
  const response = {
    success: true,
    message,
  };
  if (data !== null && data !== undefined) {
    response.data = data;
  }
  return res.status(statusCode).json(response);
}

/**
 * Standard API Error Response Envelope
 */
export function sendError(res, message = "An error occurred", code = "INTERNAL_SERVER_ERROR", statusCode = 500, details = null) {
  const response = {
    success: false,
    message,
    code,
    error: {
      code,
    },
  };
  if (details) {
    response.error.details = details;
  }
  return res.status(statusCode).json(response);
}
