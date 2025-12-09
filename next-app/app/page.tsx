"use client";
import { useState } from "react";

import { blogPosts } from "@/data/blogPosts";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import BlogList from "@/components/BlogList";
import NewsLetterSection from "@/components/NewsLetterSection";
import { usePosts } from "@/hooks/usePost";

export default function Home() {
  const { data: posts, isLoading, isError } = usePosts();

  console.log("postszzzzzzz", posts);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // const featuredPost = blogPosts[0];
  // const regularPosts = selectedCategory
  //   ? blogPosts.filter((post) => post.category === selectedCategory)
  //   : blogPosts.slice(1);

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Failed to load posts</p>;
  if (!posts || posts.length === 0) return <p>No posts available</p>;

  const featuredPost = posts[0];
  console.log("featuredPost", featuredPost);
  const regularPosts = selectedCategory
    ? posts?.filter((post) => post.category === selectedCategory)
    : posts?.slice(1);

  console.log("regularPosts", regularPosts);

  return (
    <Layout>
      <Hero featuredPost={featuredPost} />
      <BlogList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        regularPosts={regularPosts}
      />
      <NewsLetterSection />
    </Layout>
  );
}
