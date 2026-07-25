import { validationResult } from "express-validator";

// Runs after an express-validator chain; returns 422 with a clean error list
// if any validator in the chain failed.
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }
  next();
};
