export interface Author {
  name: string;
  bio?: string;
  avatar?: string;
}

export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
}

export interface FeaturedImage {
  url: string;
  alt?: string;
  caption?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  contentHtml: string;
  author: Author;
  category: BlogCategory;
  tags: string[];
  featuredImage?: FeaturedImage;
  seo: SEO;
  readingTime: number;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  featured: boolean;
  views: number;
  likes: number;
  relatedPosts?: string[];
  createdAt: string;
  updatedAt: string;
  url: string;
}

export type BlogCategory = 
  | 'Financial Planning'
  | 'Cash Flow'
  | 'KPIs & Metrics'
  | 'Tax Strategy'
  | 'Growth Strategy'
  | 'Technology'
  | 'Industry Insights';

export interface BlogPostListItem extends Omit<BlogPost, 'content' | 'contentHtml'> {}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface BlogPostsResponse {
  success: boolean;
  data: BlogPostListItem[];
  pagination: PaginationInfo;
}

export interface SingleBlogPostResponse {
  success: boolean;
  data: BlogPost;
  relatedPosts: BlogPostListItem[];
}

export interface CategoryCount {
  name: string;
  count: number;
}

export interface TagCount {
  name: string;
  count: number;
}

export interface BlogFilters {
  page?: number;
  limit?: number;
  category?: BlogCategory;
  tag?: string;
  search?: string;
  status?: 'draft' | 'published' | 'archived';
  featured?: boolean;
  sort?: string;
}