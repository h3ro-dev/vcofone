'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import ReactMarkdown from 'react-markdown';
import { useBlogPost, useLikeBlogPost } from '@/hooks/useBlog';
import { BlogCard } from '@/components/blog/BlogCard';
import { formatDate, getImageUrl } from '@/lib/api/blog';
import { 
  ClockIcon, 
  EyeIcon, 
  HeartIcon, 
  ShareIcon,
  BookmarkIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon
} from 'react-share';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [hasLiked, setHasLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  const { data, isLoading, error } = useBlogPost(slug);
  const likeMutation = useLikeBlogPost();

  const post = data?.data;
  const relatedPosts = data?.relatedPosts || [];
  
  const handleLike = () => {
    if (!post || hasLiked) return;
    
    likeMutation.mutate(post._id, {
      onSuccess: () => {
        setHasLiked(true);
        toast.success('Thanks for liking this post!');
      }
    });
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
    setShowShareMenu(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="h-96 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
          <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  return (
    <>
      <NextSeo
        title={`${post.seo.metaTitle || post.title} - vCFO of One`}
        description={post.seo.metaDescription || post.excerpt}
        openGraph={{
          title: post.seo.metaTitle || post.title,
          description: post.seo.metaDescription || post.excerpt,
          url: shareUrl,
          type: 'article',
          article: {
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt,
            authors: [post.author.name],
            tags: post.tags,
          },
          images: post.featuredImage ? [
            {
              url: getImageUrl(post.featuredImage.url),
              width: 1200,
              height: 630,
              alt: post.featuredImage.alt || post.title,
            }
          ] : [],
        }}
        canonical={post.seo.canonicalUrl || shareUrl}
      />
      
      <ArticleJsonLd
        url={shareUrl}
        title={post.title}
        images={post.featuredImage ? [getImageUrl(post.featuredImage.url)] : []}
        datePublished={post.publishedAt || post.createdAt}
        dateModified={post.updatedAt}
        authorName={post.author.name}
        description={post.excerpt}
      />

      <article className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-8 sm:py-12">
            <div className="max-w-4xl mx-auto">
              {/* Category & Date */}
              <div className="flex items-center gap-4 mb-4 text-sm">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full font-medium">
                  {post.category}
                </span>
                <span className="text-gray-500 flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  {formatDate(post.publishedAt || post.createdAt)}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-600 mb-6">
                {post.excerpt}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-2">
                  <Image
                    src={post.author.avatar || '/images/default-avatar.png'}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="font-medium text-gray-700">{post.author.name}</span>
                </div>
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
                  {post.likes + (hasLiked ? 1 : 0)} likes
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pb-6 border-b">
                <button
                  onClick={handleLike}
                  disabled={hasLiked}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                    hasLiked 
                      ? 'bg-red-100 text-red-600 cursor-not-allowed' 
                      : 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600'
                  }`}
                >
                  {hasLiked ? (
                    <HeartIconSolid className="w-5 h-5" />
                  ) : (
                    <HeartIcon className="w-5 h-5" />
                  )}
                  {hasLiked ? 'Liked' : 'Like'}
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <ShareIcon className="w-5 h-5" />
                    Share
                  </button>

                  {showShareMenu && (
                    <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg p-2 z-10 min-w-[200px]">
                      <FacebookShareButton url={shareUrl} quote={post.title} className="w-full">
                        <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded">
                          <FacebookIcon size={24} round />
                          <span className="text-sm">Facebook</span>
                        </div>
                      </FacebookShareButton>
                      
                      <TwitterShareButton url={shareUrl} title={post.title} hashtags={post.tags} className="w-full">
                        <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded">
                          <TwitterIcon size={24} round />
                          <span className="text-sm">Twitter</span>
                        </div>
                      </TwitterShareButton>
                      
                      <LinkedinShareButton url={shareUrl} title={post.title} summary={post.excerpt} className="w-full">
                        <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded">
                          <LinkedinIcon size={24} round />
                          <span className="text-sm">LinkedIn</span>
                        </div>
                      </LinkedinShareButton>
                      
                      <button
                        onClick={handleCopyLink}
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded text-left"
                      >
                        <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                          <ShareIcon className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm">Copy link</span>
                      </button>
                    </div>
                  )}
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                  <BookmarkIcon className="w-5 h-5" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <Image
                  src={getImageUrl(post.featuredImage.url)}
                  alt={post.featuredImage.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                />
                {post.featuredImage.caption && (
                  <p className="mt-2 text-sm text-gray-500 text-center">
                    {post.featuredImage.caption}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            {post.author.bio && (
              <div className="mt-12 p-6 bg-gray-50 rounded-xl">
                <div className="flex items-start gap-4">
                  <Image
                    src={post.author.avatar || '/images/default-avatar.png'}
                    alt={post.author.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      About {post.author.name}
                    </h3>
                    <p className="text-gray-600">{post.author.bio}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <BlogCard key={relatedPost._id} post={relatedPost} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}