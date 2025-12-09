import { ArrowLeft, Calendar, Clock, Info, X } from "lucide-react";
// import { blogPosts } from "@/data/blogPosts";
import { sanityClient, previewClient } from "@/lib/sanity";

import Link from "next/link";
// import { useEffect, useState, use } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import ShareButtons from "@/components/ShareButtons";
import BlogCard from "@/components/BlogCard";
import ArticleNotFound from "@/components/ArticleNotFound";
import BlogClient from "./BlogClient";
import Wrapper from "@/components/Wrapper";

// import ShareButtons from "@/components/ShareButtons";

interface Props {
  params: any;
  searchParams: any;
}

export default async function BlogPost({ params, searchParams }: Props) {
  const { slug } = await params;
  const { preview } = await searchParams;

  console.log("slugsssss", slug);
  console.log("previewsss", preview);
  //   const isPreview =
  //     cookies().get("sanity-preview")?.value === "true" ||
  //     searchParams.preview === "true";
  //   const isPreview = true;
  const isPreview = preview === "true";

  console.log("isPreview", isPreview);

  const client = isPreview ? previewClient : sanityClient;

  const query = `*[_type=="post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    author,
    authorImage,
    publishedAt,
    mainImage,
    externalImage,
    videoEmbed,
    category,
    customCategory,
    excerpt,
    gallery,
    body,
    tags
  }`;

  const post = await client.fetch(query, { slug });
  console.log("post", post);

  // const post = blogPosts.find((p) => p.slug === slugs.slug);

  if (!post) {
    return <ArticleNotFound />;
  }

  return (
    <>
      {isPreview && (
        <div className="fixed top-[65px] left-0 right-0 z-999 bg-primary w-full text-white">
          <Wrapper className=" flex justify-between items-center gap-x-3   px-4 py-2">
            <h3 className="font-semibold previewHeading flex items-center gap-x-1">
              <Info className="text-[#ccc]" />
              Preview Mode Enabled
            </h3>
            <Link
              href={`/api/exit-preview?slug=${slug}`}
              className=" border flex items-center gap-x-2 font-medium text-[15px] hover:text-primary hover:bg-white rounded-x px-3 py-[3px]"
            >
              Exit Preview <X className="w-[15px]" />
            </Link>
          </Wrapper>
        </div>
      )}
      <BlogClient post={post} />
    </>
  );
}
