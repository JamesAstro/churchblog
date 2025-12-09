"use client";
import { useState } from "react";

import { blogPosts } from "@/data/blogPosts";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import BlogList from "@/components/BlogList";
import NewsLetterSection from "@/components/NewsLetterSection";

export default function AAA() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const featuredPost = blogPosts[0];
  const regularPosts = selectedCategory
    ? blogPosts.filter((post) => post.category === selectedCategory)
    : blogPosts.slice(1);

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
