import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";
import Experience from "../models/Experience.js";

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json({ success: true, count: categories.length, data: categories });
});

export const createCategory = asyncHandler(async (req, res) => {
  const { name, icon } = req.body;
  const exists = await Category.findOne({ name });
  if (exists) {
    res.status(400);
    throw new Error("Category already exists");
  }
  const category = await Category.create({ name, icon });
  res.status(201).json({ success: true, data: category });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  category.name = req.body.name || category.name;
  category.icon = req.body.icon ?? category.icon;
  const updated = await category.save();
  res.json({ success: true, data: updated });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const inUse = await Experience.countDocuments({ category: req.params.id });
  if (inUse > 0) {
    res.status(400);
    throw new Error(`Cannot delete: ${inUse} experience(s) are using this category`);
  }
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  await category.deleteOne();
  res.json({ success: true, message: "Category deleted" });
});
