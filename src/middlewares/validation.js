import { validationResult } from "express-validator";
import fs from "fs";

const validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting uploaded file:", err.message);
      });
    }

    const extractedErrors = errors.array().map((err) => err.msg);
    return res.status(400).json({ errors: extractedErrors });
  }
  next();
};

export default validation;
