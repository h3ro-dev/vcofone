import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { blogApi } from '@/lib/api/blog';
import { BlogFilters, BlogPost } from '@/types/blog';

// Query keys
export const blogQueryKeys = {
  all: ['blog'] as const,
  posts: (filters?: BlogFilters) => [...blogQueryKeys.all, 'posts', filters] as const,
  post: (slug: string) => [...blogQueryKeys.all, 'post', slug] as const,
  categories: () => [...blogQueryKeys.all, 'categories'] as const,
  tags: () => [...blogQueryKeys.all, 'tags'] as const,
};

// Hook to fetch blog posts
export const useBlogPosts = (filters: BlogFilters = {}) => {
  return useQuery({
    queryKey: blogQueryKeys.posts(filters),
    queryFn: () => blogApi.getPosts(filters),
    keepPreviousData: true,
  });
};

// Hook to fetch single blog post
export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: blogQueryKeys.post(slug),
    queryFn: () => blogApi.getPostBySlug(slug),
    enabled: !!slug,
  });
};

// Hook to fetch categories
export const useBlogCategories = () => {
  return useQuery({
    queryKey: blogQueryKeys.categories(),
    queryFn: () => blogApi.getCategories(),
  });
};

// Hook to fetch popular tags
export const useBlogTags = () => {
  return useQuery({
    queryKey: blogQueryKeys.tags(),
    queryFn: () => blogApi.getPopularTags(),
  });
};

// Hook to create blog post
export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postData: Partial<BlogPost>) => blogApi.createPost(postData),
    onSuccess: (data) => {
      queryClient.invalidateQueries(blogQueryKeys.posts());
      toast.success(data.message || 'Blog post created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create blog post');
    },
  });
};

// Hook to update blog post
export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<BlogPost> }) =>
      blogApi.updatePost(id, updates),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(blogQueryKeys.posts());
      queryClient.invalidateQueries(blogQueryKeys.post(data.data.slug));
      toast.success(data.message || 'Blog post updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update blog post');
    },
  });
};

// Hook to delete blog post
export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => blogApi.deletePost(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries(blogQueryKeys.posts());
      toast.success(data.message || 'Blog post deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete blog post');
    },
  });
};

// Hook to like blog post
export const useLikeBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => blogApi.likePost(id),
    onSuccess: (data, id) => {
      // Optimistically update the UI
      queryClient.setQueryData(blogQueryKeys.posts(), (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.map((post: BlogPost) =>
            post._id === id ? { ...post, likes: data.data.likes } : post
          ),
        };
      });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to like post');
    },
  });
};

// Hook to upload image
export const useUploadImage = () => {
  return useMutation({
    mutationFn: (file: File) => blogApi.uploadImage(file),
    onSuccess: () => {
      toast.success('Image uploaded successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to upload image');
    },
  });
};