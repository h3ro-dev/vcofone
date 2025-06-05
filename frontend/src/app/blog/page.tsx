'use client';

import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import { useBlogPosts, useBlogCategories, useBlogTags } from '@/hooks/useBlog';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogFilters } from '@/types/blog';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { Transition } from '@headlessui/react';

export default function BlogPage() {
  const [filters, setFilters] = useState<BlogFilters>({ page: 1, limit: 12 });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { data: postsData, isLoading, error } = useBlogPosts(filters);
  const { data: categoriesData } = useBlogCategories();
  const { data: tagsData } = useBlogTags();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ ...filters, search: searchQuery, page: 1 });
  };

  const handleCategoryFilter = (category: string | undefined) => {
    setFilters({ ...filters, category: category as any, page: 1 });
  };

  const handleTagFilter = (tag: string | undefined) => {
    setFilters({ ...filters, tag, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <NextSeo
        title="Blog - vCFO of One"
        description="Financial insights, tips, and strategies for small business owners. Learn how to manage your finances like a CFO."
        openGraph={{
          title: 'Blog - vCFO of One',
          description: 'Financial insights, tips, and strategies for small business owners.',
          url: 'https://vcofone.com/blog',
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <div className="container mx-auto px-4 py-16 sm:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Financial Insights for Growing Businesses
              </h1>
              <p className="text-xl text-primary-100 mb-8">
                Expert advice and practical strategies to help you make better financial decisions
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full px-6 py-4 pr-12 text-gray-900 bg-white rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-primary-300"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary-600 hover:text-primary-700"
                  >
                    <MagnifyingGlassIcon className="w-6 h-6" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex gap-8">
              {/* Filters Sidebar */}
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-4 space-y-6">
                  {/* Categories */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                    <ul className="space-y-2">
                      <li>
                        <button
                          onClick={() => handleCategoryFilter(undefined)}
                          className={`text-sm hover:text-primary-600 transition-colors ${
                            !filters.category ? 'text-primary-600 font-medium' : 'text-gray-600'
                          }`}
                        >
                          All Categories
                        </button>
                      </li>
                      {categoriesData?.data.map((category) => (
                        <li key={category.name}>
                          <button
                            onClick={() => handleCategoryFilter(category.name)}
                            className={`text-sm hover:text-primary-600 transition-colors flex justify-between w-full ${
                              filters.category === category.name
                                ? 'text-primary-600 font-medium'
                                : 'text-gray-600'
                            }`}
                          >
                            <span>{category.name}</span>
                            <span className="text-gray-400">({category.count})</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Popular Tags */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Popular Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {tagsData?.data.slice(0, 10).map((tag) => (
                        <button
                          key={tag.name}
                          onClick={() => handleTagFilter(tag.name)}
                          className={`px-3 py-1 rounded-full text-xs transition-colors ${
                            filters.tag === tag.name
                              ? 'bg-primary-100 text-primary-700'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {tag.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <main className="flex-1">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <FunnelIcon className="w-5 h-5" />
                  Filters
                </button>

                {/* Mobile Filters */}
                <Transition
                  show={showFilters}
                  enter="transition-all duration-300"
                  enterFrom="opacity-0 max-h-0"
                  enterTo="opacity-100 max-h-96"
                  leave="transition-all duration-300"
                  leaveFrom="opacity-100 max-h-96"
                  leaveTo="opacity-0 max-h-0"
                >
                  <div className="lg:hidden mb-6 overflow-hidden">
                    {/* Mobile filters content similar to sidebar */}
                  </div>
                </Transition>

                {/* Results Info */}
                {postsData && (
                  <div className="mb-6 text-sm text-gray-600">
                    Showing {postsData.data.length} of {postsData.pagination.total} articles
                  </div>
                )}

                {/* Blog Grid */}
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">Failed to load blog posts. Please try again later.</p>
                  </div>
                ) : postsData?.data.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No articles found matching your criteria.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {postsData?.data.map((post, index) => (
                      <BlogCard
                        key={post._id}
                        post={post}
                        variant={index === 0 && filters.page === 1 ? 'featured' : 'default'}
                      />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {postsData && postsData.pagination.pages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <nav className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(filters.page! - 1)}
                        disabled={filters.page === 1}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      
                      {[...Array(postsData.pagination.pages)].map((_, i) => {
                        const page = i + 1;
                        if (
                          page === 1 ||
                          page === postsData.pagination.pages ||
                          (page >= (filters.page || 1) - 1 && page <= (filters.page || 1) + 1)
                        ) {
                          return (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`px-4 py-2 text-sm font-medium rounded-md ${
                                page === filters.page
                                  ? 'bg-primary-600 text-white'
                                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        } else if (
                          page === (filters.page || 1) - 2 ||
                          page === (filters.page || 1) + 2
                        ) {
                          return <span key={page} className="px-2">...</span>;
                        }
                        return null;
                      })}

                      <button
                        onClick={() => handlePageChange(filters.page! + 1)}
                        disabled={filters.page === postsData.pagination.pages}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </main>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}