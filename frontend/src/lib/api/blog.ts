import axios from 'axios';
import {
  BlogFilters,
  BlogPost,
  BlogPostsResponse,
  SingleBlogPostResponse,
  CategoryCount,
  TagCount,
} from '@/types/blog';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: `${API_URL}/api/blog`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Blog API functions
export const blogApi = {
  // Get all blog posts with filters
  getPosts: async (filters: BlogFilters = {}): Promise<BlogPostsResponse> => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });

    const response = await api.get<BlogPostsResponse>(`/posts?${params.toString()}`);
    return response.data;
  },

  // Get single blog post by slug
  getPostBySlug: async (slug: string): Promise<SingleBlogPostResponse> => {
    const response = await api.get<SingleBlogPostResponse>(`/posts/${slug}`);
    return response.data;
  },

  // Create new blog post
  createPost: async (postData: Partial<BlogPost>): Promise<{ success: boolean; data: BlogPost; message: string }> => {
    const response = await api.post('/posts', postData);
    return response.data;
  },

  // Update blog post
  updatePost: async (id: string, updates: Partial<BlogPost>): Promise<{ success: boolean; data: BlogPost; message: string }> => {
    const response = await api.put(`/posts/${id}`, updates);
    return response.data;
  },

  // Delete blog post
  deletePost: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },

  // Like a blog post
  likePost: async (id: string): Promise<{ success: boolean; data: { likes: number } }> => {
    const response = await api.post(`/posts/${id}/like`);
    return response.data;
  },

  // Get categories with post counts
  getCategories: async (): Promise<{ success: boolean; data: CategoryCount[] }> => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get popular tags
  getPopularTags: async (): Promise<{ success: boolean; data: TagCount[] }> => {
    const response = await api.get('/tags');
    return response.data;
  },

  // Upload image
  uploadImage: async (file: File): Promise<{ success: boolean; data: { url: string; thumbnail: string; filename: string } }> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Helper function to build full image URL
export const getImageUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_URL}${path}`;
};

// Helper function to format date
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Helper function to generate excerpt if not provided
export const generateExcerpt = (content: string, maxLength: number = 160): string => {
  const plainText = content.replace(/[#*`[\]()]/g, '').trim();
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + '...';
};