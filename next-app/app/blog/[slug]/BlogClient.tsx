"use client";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import Link from "next/link";
import ShareButtons from "@/components/ShareButtons";
import { useState, useEffect } from "react";
import { PortableText } from "@portabletext/react";
import { PortableTextComponents } from "@/components/PortableTextComponents";
import { urlFor } from "@/lib/sanity";
import { usePosts } from "@/hooks/usePost";
import BlogCard from "@/components/BlogCard";

const BlogClient = ({ post }: { post?: any }) => {
  const { data: posts, isLoading, isError } = usePosts();

  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const relatedPosts = posts
    ?.filter((p) => p._id !== post._id && p.category === post.category)
    .slice(0, 2);

  return (
    <Layout>
      <article className="pb-16">
        {/* Hero Image */}
        <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
          {post?.mainImage ? (
            <img
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            "fallback image here"
          )}
          <div className="absolute inset-0 bg-linear-to-t no-print from-background via-background/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto -mt-32 relative z-10">
            {/* Back Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-black mb-6 transition-colors no-print"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to articles
            </Link>

            {/* Header */}
            <header className="bg-background rounded-t-2xl p-6 md:p-8 shadow-soft animate-fade-in">
              <span className="inline-block capitalize px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full mb-4">
                {post.category != "other" ? post.category : post.customCategory}
              </span>

              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {post.title}
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                {post?.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-3">
                  {post.authorImage ? (
                    <img
                      src={urlFor(post.authorImage).url()}
                      alt={post.author ? post.author : "Author Profile Picture"}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-[21px] h-[21px] bg-primary flex-none rounded-full overflow-hidden">
                      fall back img
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-foreground">{post.author}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                      {/* <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span> */}
                    </div>
                  </div>
                </div>
              </div>

              <ShareButtons title={post.title} url={currentUrl} />
            </header>

            {/* Article Body */}
            <div className="bg-background px-6 md:px-8 pb-8 shadow-soft rounded-b-2xl prose-editorial text-lg">
              <PortableText
                value={post.body}
                components={PortableTextComponents}
              />

              {/* Tags */}

              <div className="w-full no-print">
                {post?.tags?.length! > 0 && (
                  <div className="flex flex-wrap items-center gap-1  mt-12 pt-6 border-t border-border ">
                    {post?.tags?.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-accent text-accent-foreground text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Share Again */}
              {/* <div className="mt-8 pt-6 border-t border-border">
                <ShareButtons title={post.title} url={currentUrl} />
              </div> */}
            </div>

            {/* Print metadata */}
            <div className="print-only mt-8 pt-4 border-t border-border">
              <p className="text-sm">Originally published at: {currentUrl}</p>
              <p className="text-sm">
                Author: {post.author} | Published:{" "}
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts?.length! > 0 && (
            <section className="max-w-5xl mx-auto mt-16 no-print">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                More in {post.category}
              </h2>
              <div className="grid grid-cols-1 px-[120px] md:grid-cols-2 gap-6">
                {relatedPosts?.map((relatedPost) => (
                  <BlogCard key={relatedPost._id} post={relatedPost} />
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </Layout>
  );
};

export default BlogClient;
