import AppError from "../utils/appError.js";

const authorization = (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") {
    return next(new AppError("unauthorized you are not admin", 403));
  }
  next();
};

export default authorization;
