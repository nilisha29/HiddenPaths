import { body } from "express-validator";

export const registerValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("A valid email is required").normalizeEmail(),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("A valid email is required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

export const experienceValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("location").trim().notEmpty().withMessage("Location is required"),
  body("category").notEmpty().withMessage("Category is required"),
];

export const bookingValidator = [
  body("experienceId").notEmpty().withMessage("Experience is required"),
  body("date").notEmpty().withMessage("Date is required"),
  body("numberOfPeople").isInt({ min: 1 }).withMessage("At least 1 guest is required"),
];
