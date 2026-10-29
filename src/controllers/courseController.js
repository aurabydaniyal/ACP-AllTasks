import { courses, categories } from '../data/store.js';
import { v4 as uuidv4 } from 'uuid';

export const createCourse = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;
    const cat = categories.find(c => c.id === category);
    if (!cat) {
      return res.status(400).json({ success: false, message: 'Invalid category reference' });
    }
    const id = uuidv4();
    const course = { id, title, description, category };
    courses.push(course);
    return res.status(201).json({ success: true, message: 'Course created', data: course });
  } catch (err) {
    next(err);
  }
};

export const getCourses = async (req, res, next) => {
  try {
    const populated = courses.map(c => {
      const cat = categories.find(cat => cat.id === c.category);
      return { ...c, category: cat ? { id: cat.id, name: cat.name, description: cat.description } : null };
    });
    return res.status(200).json({ success: true, data: populated });
  } catch (err) {
    next(err);
  }
};

export const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = courses.find(c => c.id === id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    const cat = categories.find(cat => cat.id === course.category);
    const populated = { ...course, category: cat ? { id: cat.id, name: cat.name, description: cat.description } : null };
    return res.status(200).json({ success: true, data: populated });
  } catch (err) {
    next(err);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;
    const course = courses.find(c => c.id === id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    if (category) {
      const cat = categories.find(ca => ca.id === category);
      if (!cat) {
        return res.status(400).json({ success: false, message: 'Invalid category reference' });
      }
      course.category = category;
    }
    if (title) course.title = title;
    if (description !== undefined) course.description = description;
    return res.status(200).json({ success: true, message: 'Course updated', data: course });
  } catch (err) {
    next(err);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = courses.findIndex(c => c.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    courses.splice(index, 1);
    return res.status(200).json({ success: true, message: 'Course deleted' });
  } catch (err) {
    next(err);
  }
};
