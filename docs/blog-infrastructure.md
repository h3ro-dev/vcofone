# Blog Infrastructure Documentation

## Overview

The vCFO of One blog infrastructure is a full-stack solution built with modern technologies to provide a professional blogging platform focused on financial insights for small business owners.

## Technology Stack

### Backend
- **Node.js & Express**: RESTful API server
- **MongoDB & Mongoose**: Database and ODM
- **Security**: Helmet, CORS, input validation
- **Image Processing**: Sharp for optimization
- **Content**: Markdown support with sanitization

### Frontend
- **Next.js 13+**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **React Query**: Data fetching and caching
- **SEO**: next-seo for meta tags

## Features

### Content Management
- Create, read, update, and delete blog posts
- Markdown editor support
- Featured image upload and optimization
- Category and tag management
- Draft/Published/Archived status
- SEO optimization fields

### User Features
- Blog listing with pagination
- Advanced filtering (category, tags, search)
- Individual post pages
- Reading time calculation
- View and like counters
- Social sharing
- Related posts

### Performance
- Image optimization (WebP conversion)
- Lazy loading
- Caching strategies
- SSR/SSG support

## API Endpoints

### Public Endpoints
- `GET /api/blog/posts` - Get all posts (with filters)
- `GET /api/blog/posts/:slug` - Get single post
- `GET /api/blog/categories` - Get categories with counts
- `GET /api/blog/tags` - Get popular tags
- `POST /api/blog/posts/:id/like` - Like a post

### Admin Endpoints
- `POST /api/blog/posts` - Create new post
- `PUT /api/blog/posts/:id` - Update post
- `DELETE /api/blog/posts/:id` - Delete post
- `POST /api/blog/upload` - Upload image

## Database Schema

### BlogPost Model
```javascript
{
  title: String (required),
  slug: String (unique, auto-generated),
  excerpt: String (required),
  content: String (markdown),
  contentHtml: String (sanitized HTML),
  author: {
    name: String,
    bio: String,
    avatar: String
  },
  category: String (enum),
  tags: [String],
  featuredImage: {
    url: String,
    alt: String,
    caption: String
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    focusKeyword: String,
    canonicalUrl: String
  },
  readingTime: Number,
  status: String (draft/published/archived),
  publishedAt: Date,
  featured: Boolean,
  views: Number,
  likes: Number,
  relatedPosts: [ObjectId]
}
```

## Categories

The blog supports the following categories aligned with vCFO services:
- Financial Planning
- Cash Flow
- KPIs & Metrics
- Tax Strategy
- Growth Strategy
- Technology
- Industry Insights

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`

5. Start MongoDB (local or configure cloud connection)

6. Run the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
cp .env.example .env.local
```

4. Configure environment variables

5. Run the development server:
```bash
npm run dev
```

## Content Guidelines

### Blog Post Best Practices
1. **Title**: Clear, benefit-focused, 60 characters max
2. **Excerpt**: Compelling summary, 160 characters max
3. **Content**: 
   - Use headers (H2, H3) for structure
   - Include practical examples
   - Add relevant images
   - Target 5-10 minute read time
4. **SEO**:
   - Focus keyword in title and content
   - Meta description with call-to-action
   - Internal linking to related posts
5. **Tags**: 3-5 relevant tags per post

### Image Guidelines
- Featured images: 1200x630px (16:9 ratio)
- In-content images: Max 1200px width
- Alt text for accessibility
- WebP format for performance

## Security Considerations

1. **Input Validation**: All user inputs validated
2. **Content Sanitization**: HTML sanitized to prevent XSS
3. **Rate Limiting**: Consider implementing for API endpoints
4. **Authentication**: Add admin authentication for CMS
5. **HTTPS**: Use in production
6. **Environment Variables**: Never commit sensitive data

## Performance Optimization

1. **Database Indexes**: 
   - Text search on title, content, tags
   - Compound indexes for common queries
2. **Image Optimization**:
   - Automatic WebP conversion
   - Multiple sizes for responsive images
3. **Caching**:
   - React Query for client-side caching
   - Consider Redis for server-side caching
4. **CDN**: Use for static assets in production

## Deployment Considerations

### Backend
- Use PM2 or similar for process management
- Configure proper logging
- Set up database backups
- Monitor server health

### Frontend
- Deploy to Vercel (recommended for Next.js)
- Configure environment variables
- Set up proper redirects
- Enable analytics

## Future Enhancements

1. **Content Management**:
   - Rich text editor integration
   - Scheduled publishing
   - Version history
   - Multi-author support

2. **User Features**:
   - Comments system
   - Newsletter subscription
   - Bookmarking
   - Advanced search

3. **Analytics**:
   - Popular posts dashboard
   - Reader engagement metrics
   - Content performance tracking

4. **SEO**:
   - Sitemap generation
   - RSS feed
   - Schema.org markup
   - AMP support

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check MongoDB is running
   - Verify connection string
   - Check network/firewall

2. **Image Upload Fails**
   - Check file size limits
   - Verify upload directory permissions
   - Check disk space

3. **CORS Errors**
   - Verify frontend URL in backend CORS config
   - Check API URL in frontend config

4. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all environment variables set

## Support

For issues or questions about the blog infrastructure:
1. Check this documentation
2. Review error logs
3. Contact the development team

---

Last Updated: November 2024