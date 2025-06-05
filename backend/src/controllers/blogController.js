const BlogPost = require('../models/BlogPost');
const { marked } = require('marked');
const sanitizeHtml = require('sanitize-html');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

// Configure multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
  mangle: false
});

// Sanitize HTML options
const sanitizeOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    a: ['href', 'name', 'target', 'rel']
  },
  allowedSchemes: ['http', 'https', 'mailto']
};

// Get all blog posts with pagination and filters
exports.getAllPosts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      tag,
      search,
      status = 'published',
      featured,
      sort = '-publishedAt'
    } = req.query;

    const skip = (page - 1) * limit;
    const query = {};

    // Build query based on filters
    if (status) query.status = status;
    if (category) query.category = category;
    if (tag) query.tags = { $in: [tag] };
    if (featured !== undefined) query.featured = featured === 'true';
    
    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Execute query with pagination
    const [posts, total] = await Promise.all([
      BlogPost.find(query)
        .sort(sort)
        .limit(parseInt(limit))
        .skip(skip)
        .select('-content -contentHtml'),
      BlogPost.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog posts',
      error: error.message
    });
  }
};

// Get single blog post by slug
exports.getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const post = await BlogPost.findOne({ slug, status: 'published' });
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Increment views
    await post.incrementViews();

    // Get related posts
    const relatedPosts = await BlogPost.findRelated(post._id, 3);

    res.json({
      success: true,
      data: post,
      relatedPosts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog post',
      error: error.message
    });
  }
};

// Create new blog post
exports.createPost = async (req, res) => {
  try {
    const postData = req.body;

    // Convert markdown to HTML
    if (postData.content) {
      const rawHtml = marked(postData.content);
      postData.contentHtml = sanitizeHtml(rawHtml, sanitizeOptions);
    }

    const post = new BlogPost(postData);
    await post.save();

    res.status(201).json({
      success: true,
      data: post,
      message: 'Blog post created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating blog post',
      error: error.message
    });
  }
};

// Update blog post
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Convert markdown to HTML if content is updated
    if (updates.content) {
      const rawHtml = marked(updates.content);
      updates.contentHtml = sanitizeHtml(rawHtml, sanitizeOptions);
    }

    const post = await BlogPost.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      data: post,
      message: 'Blog post updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating blog post',
      error: error.message
    });
  }
};

// Delete blog post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = await BlogPost.findByIdAndDelete(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog post',
      error: error.message
    });
  }
};

// Upload blog image
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(__dirname, '../../uploads/blog');
    await fs.mkdir(uploadsDir, { recursive: true });

    // Generate unique filename
    const filename = `blog-${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`;
    const filepath = path.join(uploadsDir, filename);

    // Process and save image
    await sharp(req.file.buffer)
      .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(filepath);

    // Generate thumbnail
    const thumbnailFilename = `thumb-${filename}`;
    const thumbnailPath = path.join(uploadsDir, thumbnailFilename);
    
    await sharp(req.file.buffer)
      .resize(400, 300, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(thumbnailPath);

    res.json({
      success: true,
      data: {
        url: `/uploads/blog/${filename}`,
        thumbnail: `/uploads/blog/${thumbnailFilename}`,
        filename
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading image',
      error: error.message
    });
  }
};

// Get blog categories with post counts
exports.getCategories = async (req, res) => {
  try {
    const categories = await BlogPost.aggregate([
      { $match: { status: 'published' } },
      { $group: { 
        _id: '$category',
        count: { $sum: 1 }
      }},
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: categories.map(cat => ({
        name: cat._id,
        count: cat.count
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};

// Get popular tags
exports.getPopularTags = async (req, res) => {
  try {
    const tags = await BlogPost.aggregate([
      { $match: { status: 'published' } },
      { $unwind: '$tags' },
      { $group: {
        _id: '$tags',
        count: { $sum: 1 }
      }},
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);

    res.json({
      success: true,
      data: tags.map(tag => ({
        name: tag._id,
        count: tag.count
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tags',
      error: error.message
    });
  }
};

// Like a blog post
exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = await BlogPost.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      data: { likes: post.likes }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error liking post',
      error: error.message
    });
  }
};

// Export multer upload middleware
exports.uploadMiddleware = upload.single('image');