import express from 'express';
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController.js';
import protect from '../middleware/authMiddleware.js';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

// Create Course (protected)
router.post(
  '/',
  protect,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('category').trim().notEmpty().withMessage('Valid category ID is required'),
  ],
  validateRequest,
  createCourse
);

// Get All Courses (public)
router.get('/', getCourses);

// Get Course by ID (public)
router.get(
  '/:id',
  [param('id').trim().notEmpty().withMessage('Invalid course ID')],
  validateRequest,
  getCourseById
);

// Update Course (protected)
router.put(
  '/:id',
  protect,
  [
    param('id').trim().notEmpty().withMessage('Invalid course ID'),
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('category').optional().trim().notEmpty().withMessage('Invalid category ID'),
  ],
  validateRequest,
  updateCourse
);

// Delete Course (protected)
router.delete(
  '/:id',
  protect,
  [param('id').isMongoId().withMessage('Invalid course ID')],
  validateRequest,
  deleteCourse
);

export default router;
