"use client";
import { useMemo, useState } from "react";

import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import BlogList from "@/components/BlogList";
import NewsLetterSection from "@/components/NewsLetterSection";
import { usePosts } from "@/hooks/usePost";

const POSTS_PER_PAGE = 15;

export default function Home() {
  const { data: posts, isLoading, isError } = usePosts();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    const rest = posts.slice(1); // exclude featured
    if (!selectedCategory) return rest;
    return rest.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Failed to load posts</p>;
  if (!posts || posts.length === 0) return <p>No posts available</p>;

  const featuredPost = posts[0];

  // const regularPosts = selectedCategory
  //   ? posts?.filter((post) => post.category === selectedCategory)
  //   : posts?.slice(1);

  // Reset page when category changes
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const onPrev = () => {
    setCurrentPage((p) => Math.max(p - 1, 1));
    window.scrollTo({ top: 800, behavior: "smooth" });
  };

  const onNext = () => {
    setCurrentPage((p) => Math.min(p + 1, totalPages));
    window.scrollTo({ top: 800, behavior: "smooth" });
  };

  return (
    <Layout>
      <Hero featuredPost={featuredPost} />
      <BlogList
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategoryChange}
        posts={paginatedPosts}
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={onPrev}
        onNext={onNext}
        // regularPosts={regularPosts}
      />
      <NewsLetterSection />
    </Layout>
  );
}
