const mongoose = require('mongoose');
const slugify = require('slugify');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog post must have a title'],
    trim: true,
    maxlength: [200, 'Title must be less than 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    index: true
  },
  excerpt: {
    type: String,
    required: [true, 'Blog post must have an excerpt'],
    maxlength: [300, 'Excerpt must be less than 300 characters']
  },
  content: {
    type: String,
    required: [true, 'Blog post must have content']
  },
  contentHtml: {
    type: String
  },
  author: {
    name: {
      type: String,
      required: true,
      default: 'vCFO Team'
    },
    bio: String,
    avatar: String
  },
  category: {
    type: String,
    required: true,
    enum: ['Financial Planning', 'Cash Flow', 'KPIs & Metrics', 'Tax Strategy', 'Growth Strategy', 'Technology', 'Industry Insights'],
    index: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  featuredImage: {
    url: String,
    alt: String,
    caption: String
  },
  seo: {
    metaTitle: {
      type: String,
      maxlength: [60, 'Meta title must be less than 60 characters']
    },
    metaDescription: {
      type: String,
      maxlength: [160, 'Meta description must be less than 160 characters']
    },
    focusKeyword: String,
    canonicalUrl: String
  },
  readingTime: {
    type: Number,
    default: 5
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
    index: true
  },
  publishedAt: {
    type: Date,
    index: true
  },
  featured: {
    type: Boolean,
    default: false,
    index: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  relatedPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost'
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
blogPostSchema.index({ title: 'text', content: 'text', tags: 'text' });
blogPostSchema.index({ publishedAt: -1, status: 1 });
blogPostSchema.index({ category: 1, status: 1, publishedAt: -1 });

// Generate slug from title before saving
blogPostSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  
  // Calculate reading time based on content
  if (this.isModified('content')) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    this.readingTime = Math.ceil(wordCount / wordsPerMinute);
  }
  
  // Set publishedAt when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  // Set SEO defaults
  if (!this.seo.metaTitle) {
    this.seo.metaTitle = this.title;
  }
  if (!this.seo.metaDescription) {
    this.seo.metaDescription = this.excerpt;
  }
  
  next();
});

// Virtual for URL
blogPostSchema.virtual('url').get(function() {
  return `/blog/${this.slug}`;
});

// Instance method to increment views
blogPostSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Static method to find published posts
blogPostSchema.statics.findPublished = function(options = {}) {
  const query = this.find({ status: 'published' });
  
  if (options.category) {
    query.where('category').equals(options.category);
  }
  
  if (options.tag) {
    query.where('tags').in([options.tag]);
  }
  
  if (options.featured !== undefined) {
    query.where('featured').equals(options.featured);
  }
  
  return query
    .sort({ publishedAt: -1 })
    .limit(options.limit || 10)
    .skip(options.skip || 0);
};

// Static method to find related posts
blogPostSchema.statics.findRelated = async function(postId, limit = 3) {
  const post = await this.findById(postId);
  if (!post) return [];
  
  return this.find({
    _id: { $ne: postId },
    status: 'published',
    $or: [
      { category: post.category },
      { tags: { $in: post.tags } }
    ]
  })
  .sort({ publishedAt: -1 })
  .limit(limit);
};

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;