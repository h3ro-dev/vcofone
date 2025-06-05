const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { body, param, query } = require('express-validator');
const validateRequest = require('../middleware/validateRequest');

// Validation rules
const createPostValidation = [
  body('title').notEmpty().trim().isLength({ max: 200 }),
  body('excerpt').notEmpty().trim().isLength({ max: 300 }),
  body('content').notEmpty(),
  body('category').notEmpty().isIn(['Financial Planning', 'Cash Flow', 'KPIs & Metrics', 'Tax Strategy', 'Growth Strategy', 'Technology', 'Industry Insights']),
  body('tags').optional().isArray(),
  body('author.name').notEmpty().trim(),
  body('status').optional().isIn(['draft', 'published', 'archived']),
  body('featured').optional().isBoolean(),
  body('seo.metaTitle').optional().isLength({ max: 60 }),
  body('seo.metaDescription').optional().isLength({ max: 160 })
];

const updatePostValidation = [
  param('id').isMongoId(),
  body('title').optional().trim().isLength({ max: 200 }),
  body('excerpt').optional().trim().isLength({ max: 300 }),
  body('content').optional(),
  body('category').optional().isIn(['Financial Planning', 'Cash Flow', 'KPIs & Metrics', 'Tax Strategy', 'Growth Strategy', 'Technology', 'Industry Insights']),
  body('tags').optional().isArray(),
  body('status').optional().isIn(['draft', 'published', 'archived']),
  body('featured').optional().isBoolean(),
  body('seo.metaTitle').optional().isLength({ max: 60 }),
  body('seo.metaDescription').optional().isLength({ max: 160 })
];

const queryValidation = [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('category').optional().isIn(['Financial Planning', 'Cash Flow', 'KPIs & Metrics', 'Tax Strategy', 'Growth Strategy', 'Technology', 'Industry Insights']),
  query('status').optional().isIn(['draft', 'published', 'archived']),
  query('featured').optional().isBoolean()
];

// Public routes
router.get('/posts', queryValidation, validateRequest, blogController.getAllPosts);
router.get('/posts/:slug', blogController.getPostBySlug);
router.get('/categories', blogController.getCategories);
router.get('/tags', blogController.getPopularTags);
router.post('/posts/:id/like', param('id').isMongoId(), validateRequest, blogController.likePost);

// Admin routes (you may want to add authentication middleware here)
router.post('/posts', createPostValidation, validateRequest, blogController.createPost);
router.put('/posts/:id', updatePostValidation, validateRequest, blogController.updatePost);
router.delete('/posts/:id', param('id').isMongoId(), validateRequest, blogController.deletePost);
router.post('/upload', blogController.uploadMiddleware, blogController.uploadImage);

module.exports = router;