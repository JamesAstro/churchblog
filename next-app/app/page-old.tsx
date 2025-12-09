"use client";
import { sanityClient, urlFor } from "../lib/sanity";
import { useQuery } from "@tanstack/react-query";

import { PortableTextBlock } from "@portabletext/types";
import { PortableText } from "@portabletext/react";
import { getVideoEmbedUrl } from "./utils/video";
import { getGoogleDriveImageThumbnail } from "./utils/image";
import Image from "next/image";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  author: string;
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

export default function Home() {
  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  console.log("posts", posts);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Church Blog</h1>
      <div className="flex justify-between flex-wrap">
        {posts?.map((post) => (
          <a
            href={post.slug.current}
            key={post._id}
            className=" w-[48%] border border-white p-6"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>
              By {post.author} |{" "}
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>

            {/* Sanity image */}
            {post.mainImage && (
              <img
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                className="my-2 max-w-lg"
              />
            )}

            {/* External image */}
            <h5>EXTERNALLL ONEEEEE:</h5>
            {post.externalImage && (
              <img
                src={
                  post?.externalImage?.includes("drive.google.com")
                    ? getGoogleDriveImageThumbnail(post.externalImage)
                    : post.externalImage
                }
                alt={post.title}
                className="my-2 max-w-[150px]"
              />
            )}
            <h5>EXTERNALLL:</h5>
            <img
              src={
                post?.externalImage?.includes("drive.google.com")
                  ? getGoogleDriveImageThumbnail(post.externalImage)
                  : post.externalImage
              }
              alt={post.title}
              className="my-2 w-[300px]"
            />

            <h5>EXTERNALLL ONE DRIVE:</h5>
            <img
              // https://1drv.ms/i/c/be5e63db59752da8/IQC8z9SZ43aiQL70i9n-y075Afr_e7MGDbynxhZ1cL_2dUQ?e=2NpQts
              src="https://1drv.ms/i/c/be5e63db59752da8/IQS8z9SZ43aiQL70i9n-y075AY44Ak4FaH6FVw30DU1sKew?width=977&height=572"
              alt="ONE DRIVE"
              className="my-2 w-[300px]"
            />

            <h5>FACEBOOOK IMG</h5>
            <img
              src="https://scontent.fmnl8-3.fna.fbcdn.net/v/t1.6435-9/119965072_180626366899770_3164949361645395149_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHXeHaLMlq6Pk3QIGhYIZ4evpwrXyrafoO-nCtfKtp-g-ytruko1zeSzrEsw-rD7UTGxzy8otVDl-Mkc71lC4a8&_nc_ohc=TagJq_fwnaMQ7kNvwHDenPZ&_nc_oc=AdlBGZWoxdysZm86Az-P-zuvSzb4FjVX7vnpi_TMj2ULw5IZxpmqiu1NFW0gHIOG51Rju5pDmcoOsbdNLX-Gd_g0&_nc_zt=23&_nc_ht=scontent.fmnl8-3.fna&_nc_gid=voq3lC4gMpvwzDY8AoYLIQ&oh=00_AfnG31kGl1i1JX_0lPYTFs_yX0aSwF-2ZgRh5jgSJZ0L9A&oe=6959DD17"
              alt="facebook img"
              className="my-2 w-[200px]"
            />

            {/* Video */}
            {post.videoEmbed &&
              ([
                "youtube.com",
                "youtu.be",
                "vimeo.com",
                "drive.google.com",
                "onedrive.live.com",
                "facebook.com",
              ].some((host) => post.videoEmbed!.includes(host)) ? (
                <iframe
                  width="400"
                  height="225"
                  src={getVideoEmbedUrl(post.videoEmbed)}
                  title={post.title}
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              ) : (
                <video width="400" height="225" controls>
                  <source src={post.videoEmbed} />
                  Your browser does not support the video tag.
                </video>
              ))}
            <PortableText value={post.body} />
          </a>
        ))}
      </div>
    </div>
  );
}
