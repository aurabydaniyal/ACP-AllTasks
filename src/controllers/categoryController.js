import { categories } from '../data/store.js';

export const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const existing = categories.find(c => c.name === name);
    if (existing) {
      return res.status(409).json({ success: false, message: 'Category name already exists' });
    }
    const id = Date.now().toString();
    const category = { id, name, description };
    categories.push(category);
    return res.status(201).json({ success: true, message: 'Category created successfully', data: category });
  } catch (err) {
    next(err);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    return res.status(200).json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = categories.find(c => c.id === id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    return res.status(200).json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const category = categories.find(c => c.id === id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    if (name) category.name = name;
    if (description !== undefined) category.description = description;
    return res.status(200).json({ success: true, message: 'Category updated', data: category });
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    categories.splice(index, 1);
    return res.status(200).json({ success: true, message: 'Category deleted' });
  } catch (err) {
    next(err);
  }
};
