"use client";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

import Link from "next/link";
import { useEffect, useState, use } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import ShareButtons from "@/components/ShareButtons";
import BlogCard from "@/components/BlogCard";

// import ShareButtons from "@/components/ShareButtons";

export default function BlogPost({ params }: { params: any }) {
  const slugs = use(params) as { slug: string };

  const post = blogPosts.find((p) => p.slug === slugs.slug);

  const [currentUrl, setCurrentUrl] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">
            Article Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist.
          </p>
          <Link href="/">
            <Button variant="default">Go Back Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  // currentUrl is now available as a state variable

  // Convert markdown-like content to HTML
  const renderContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <h1
            key={index}
            className="font-heading text-3xl md:text-4xl font-bold mt-8 mb-4"
          >
            {line.slice(2)}
          </h1>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="font-heading text-2xl md:text-3xl font-semibold mt-8 mb-4"
          >
            {line.slice(3)}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="font-heading text-xl md:text-2xl font-semibold mt-6 mb-3"
          >
            {line.slice(4)}
          </h3>
        );
      }
      if (line.startsWith("> ")) {
        return (
          <blockquote
            key={index}
            className="border-l-4 border-primary pl-6 italic my-6 text-muted-foreground text-lg"
          >
            {line.slice(2)}
          </blockquote>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-6 mb-2">
            {line.slice(2)}
          </li>
        );
      }
      if (line.trim() === "") {
        return <br key={index} />;
      }
      return (
        <p key={index} className="mb-4 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <Layout>
      <article className="pb-16">
        {/* Hero Image */}
        <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t no-print from-background via-background/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto -mt-32 relative z-10">
            {/* Back Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors no-print"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to articles
            </Link>

            {/* Header */}
            <header className="bg-background rounded-t-2xl p-6 md:p-8 shadow-soft animate-fade-in">
              <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full mb-4">
                {post.category}
              </span>

              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {post.title}
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-foreground">{post.author}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <ShareButtons title={post.title} url={currentUrl} />
            </header>

            {/* Article Body */}
            <div className="bg-background px-6 md:px-8 pb-8 shadow-soft rounded-b-2xl prose-editorial text-lg">
              {renderContent(post.content)}

              {/* Tags */}
              <div className="mt-12 pt-6 border-t border-border no-print">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-accent text-accent-foreground text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share Again */}
              <div className="mt-8 pt-6 border-t border-border">
                <ShareButtons title={post.title} url={currentUrl} />
              </div>
            </div>

            {/* Print metadata */}
            <div className="print-only mt-8 pt-4 border-t border-border">
              <p className="text-sm">Originally published at: {currentUrl}</p>
              <p className="text-sm">
                Author: {post.author} | Published: {post.date}
              </p>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="max-w-5xl mx-auto mt-16 no-print">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                More in {post.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </Layout>
  );
}
