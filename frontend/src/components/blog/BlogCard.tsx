import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate, getImageUrl } from '@/lib/api/blog';
import { BlogPostListItem } from '@/types/blog';
import { ClockIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/outline';

interface BlogCardProps {
  post: BlogPostListItem;
  variant?: 'default' | 'featured' | 'compact';
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, variant = 'default' }) => {
  const categoryColors: Record<string, string> = {
    'Financial Planning': 'bg-blue-100 text-blue-800',
    'Cash Flow': 'bg-green-100 text-green-800',
    'KPIs & Metrics': 'bg-purple-100 text-purple-800',
    'Tax Strategy': 'bg-yellow-100 text-yellow-800',
    'Growth Strategy': 'bg-pink-100 text-pink-800',
    'Technology': 'bg-indigo-100 text-indigo-800',
    'Industry Insights': 'bg-gray-100 text-gray-800',
  };

  if (variant === 'compact') {
    return (
      <article className="group">
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="flex gap-4">
            {post.featuredImage && (
              <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={getImageUrl(post.featuredImage.url)}
                  alt={post.featuredImage.alt || post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-400 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600">{formatDate(post.publishedAt || post.createdAt)}</p>
              <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-3 h-3" />
                  {post.readingTime} min
                </span>
                <span className="flex items-center gap-1">
                  <EyeIcon className="w-3 h-3" />
                  {post.views}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className={`group ${variant === 'featured' ? 'col-span-2 row-span-2' : ''}`}>
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-full flex flex-col">
          {post.featuredImage && (
            <div className={`relative overflow-hidden ${variant === 'featured' ? 'h-96' : 'h-48'}`}>
              <Image
                src={getImageUrl(post.featuredImage.url)}
                alt={post.featuredImage.alt || post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority={variant === 'featured'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              {post.featured && (
                <div className="absolute top-4 left-4">
                  <span className="bg-accent-400 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </span>
                </div>
              )}
            </div>
          )}
          
          <div className="flex-1 p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[post.category]}`}>
                {post.category}
              </span>
              <span className="text-sm text-gray-500">{formatDate(post.publishedAt || post.createdAt)}</span>
            </div>

            <h2 className={`font-bold text-gray-900 group-hover:text-primary-400 transition-colors mb-3 line-clamp-2 ${
              variant === 'featured' ? 'text-2xl' : 'text-xl'
            }`}>
              {post.title}
            </h2>

            <p className={`text-gray-600 mb-4 line-clamp-3 ${variant === 'featured' ? 'text-base' : 'text-sm'}`}>
              {post.excerpt}
            </p>

            <div className="mt-auto">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    {post.readingTime} min read
                  </span>
                  <span className="flex items-center gap-1">
                    <EyeIcon className="w-4 h-4" />
                    {post.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <HeartIcon className="w-4 h-4" />
                    {post.likes}
                  </span>
                </div>
                
                <span className="text-primary-400 font-medium group-hover:translate-x-1 transition-transform">
                  Read more →
                </span>
              </div>

              {post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{post.tags.length - 3} more</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};