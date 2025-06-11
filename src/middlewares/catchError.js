import AppError from "../utils/appError.js";

const catchError = (callback) => {
  return (req, res, next) => {
    callback(req, res, next).catch((err) => {
      next(new AppError(err.message, err.statusCode || 500));
    });
  };
};

export default catchError;
