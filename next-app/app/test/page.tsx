"use client";

import { useQuery } from "@tanstack/react-query";

import { PortableTextBlock } from "@portabletext/types";
import { PortableText } from "@portabletext/react";
import { getVideoEmbedUrl } from "../utils/video";
import { getGoogleDriveImageThumbnail } from "../utils/image";
import Image from "next/image";
import { sanityClient, urlFor } from "@/lib/sanity";
import { PortableTextComponents } from "@/components/PortableTextComponents";

interface Post {
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
  tags?: string[];
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
    body,
    tags
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
          <div
            // href={post.slug.current}
            key={post._id}
            className=" w-[48%] border border-[#818181] p-6"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <div className="flex items-center my-2 gap-x-2">
              {post.authorImage ? (
                <div className="w-[30px] h-[30px] flex-none rounded-full overflow-hidden">
                  <img
                    src={urlFor(post.authorImage).url()}
                    alt="Author Profile Picture"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-[21px] h-[21px] bg-primary flex-none rounded-full overflow-hidden"></div>
              )}{" "}
              <p>{post.author} |</p>{" "}
              <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </div>

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
            {/* 
            <h5>FACEBOOOK IMG</h5>
            <img
              src="https://scontent.fmnl45-1.fna.fbcdn.net/v/t1.6435-9/141275159_1090726001379065_4056352258832986698_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHZuEAEzEs10Eq8_7tVCWHvftAEfbB7DZd-0AR9sHsNl_MNukWVKKA883UolcCXIIkVROVYB8c4-qXOm0SNqyY-&_nc_ohc=qUr8LUXY-JwQ7kNvwGlon3B&_nc_oc=AdnrFdxSE9Uqj5sPY9Eg11-FMYTWLANo0yGgkLdjq8JeSitwdtZKjissFoFXr7BUiakmNPrHP3kW-mIfnm_APPpI&_nc_zt=23&_nc_ht=scontent.fmnl45-1.fna&_nc_gid=mpynmuMCxj7ZUgfIC5rCaA&oh=00_Afkg15fAiNhpvUAelZOIyehdF3zrligMQm1Yiu23z2AVWQ&oe=695E0731"
              alt="facebook img"
              className="my-2 w-[200px]"
            /> */}

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
            <div className="w-full my-2">
              {post.excerpt ? <p>{post.excerpt}</p> : <p>ttttt</p>}
            </div>
            <PortableText
              value={post.body}
              components={PortableTextComponents}
            />

            <div className="w-full  ">
              {post?.tags?.length! > 0 && (
                <div className="mt-7 flex flex-wrap items-center gap-1 ">
                  {post?.tags?.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-1 rounded-[40px] bg-[#e5e5e5] text-primary"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
