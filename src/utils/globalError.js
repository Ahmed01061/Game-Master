const globalErrorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    error: "error",
    message: err.message,
    code: err.statusCode || 500,
    success: false,
    stack: err.stack,
  });
};

export default globalErrorHandler;
