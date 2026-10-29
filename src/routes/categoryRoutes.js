import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import protect from '../middleware/authMiddleware.js';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

// Create Category (protected)
router.post(
  '/',
  protect,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').optional().isString().withMessage('Description must be a string'),
  ],
  validateRequest,
  createCategory
);

// Get All Categories (public)
router.get('/', getCategories);

// Get Category by ID (public)
router.get(
  '/:id',
  [param('id').trim().notEmpty().withMessage('Invalid category ID')],
  validateRequest,
  getCategoryById
);

// Update Category (protected)
router.put(
  '/:id',
  protect,
  [
    param('id').trim().notEmpty().withMessage('Invalid category ID'),
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('description').optional().isString().withMessage('Description must be a string'),
  ],
  validateRequest,
  updateCategory
);

// Delete Category (protected)
router.delete(
  '/:id',
  protect,
  [param('id').trim().notEmpty().withMessage('Invalid category ID')],
  validateRequest,
  deleteCategory
);

export default router;
