import Image from "next/image";
import { PortableTextComponents as PTComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";

interface ImageBlock {
  asset: {
    _ref: string;
  };
  alt?: string;
}

interface VideoBlock {
  url?: string;
}

function getEmbedUrl(url: string) {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    // YouTube URL
    const videoIdMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
    );
    if (videoIdMatch)
      return `https://www.youtube.com/embed/${videoIdMatch[1]}?modestbranding=1&rel=0&controls=0&disablekb=1&fs=0`;
  } else if (url.includes("vimeo.com")) {
    // Vimeo URL
    const videoIdMatch = url.match(/vimeo\.com\/(\d+)/);
    if (videoIdMatch)
      return `https://player.vimeo.com/video/${videoIdMatch[1]}?title=0&byline=0&portrait=0&badge=0`;
  } else if (url.includes("facebook.com")) {
    // Facebook video URL (uses Facebook embed plugin)
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
      url
    )}&show_text=0&width=560`;
  }

  // Fallback, just use the URL as is
  return url;
}

export const PortableTextComponents: PTComponents = {
  types: {
    image: ({ value }: { value: ImageBlock }) => {
      if (!value?.asset?._ref) return null;
      console.log("value.asset._ref", value.asset._ref);
      const [id, width, format] = value.asset._ref
        .replace("image-", "")
        .split("-");
      const imageName = value.asset._ref;

      return (
        <div style={{ margin: "20px 0" }}>
          <Image
            src={urlFor(imageName).url()}
            alt={value.alt || "Blog Image"}
            width={800}
            height={500}
            style={{ width: "100%", height: "auto" }}
          />
          {/* <img
            src={urlFor(imageName).url()}
            alt={value.alt || "Blog Image"}
            style={{ width: "100%", height: "auto" }}
          /> */}
        </div>
      );
    },

    videoEmbedBlock: ({ value }: { value: VideoBlock }) => {
      if (!value?.url) return null;
      const embedUrl = getEmbedUrl(value.url);

      return (
        <div style={{ margin: "20px 0" }}>
          <iframe
            width="100%"
            height="400"
            src={embedUrl}
            title="Embedded Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    },
  },

  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold ">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold ">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-[19px] font-semibold ">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-[18px] font-semibold ">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-[17px] font-semibold ">{children}</h6>
    ),
    blockquote: ({ children }) => (
      <blockquote className="text-[16px] border-l-4 border-primary pl-4 italic my-5 text-muted-foreground ">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="">{children}</p>,
  },
};
