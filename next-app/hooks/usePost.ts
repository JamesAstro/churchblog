"use client";

import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "@/lib/sanity";
import { PortableTextBlock } from "@portabletext/types";

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  author: string;
  authorImage?: string;
  publishedAt: string;
  mainImage?: { asset: { _ref: string } };
  externalImage?: string;
  videoEmbed?: string;
  category?: string;
  customCategory?: string;
  excerpt?: string;
  gallery?: string[];
  body: PortableTextBlock[];
}

const fetchPosts = async (): Promise<Post[]> => {
  const query = `*[_type == "post"] | order(publishedAt desc){
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
    body
  }`;
  return sanityClient.fetch(query);
};

export const usePosts = () => {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
};
