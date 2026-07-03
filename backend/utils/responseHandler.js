// Standardized success response
export const successResponse = (res, data = {}, message = 'Success') => {
  res.json({
    success: true,
    message,
    ...data,
  });
};

// Standardized error response
export const errorResponse = (res, message = 'Error', statusCode = 400) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};
