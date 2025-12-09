import { BlogPost } from "@/data/blogPosts";
import { urlFor } from "@/lib/sanity";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BlogCardProps {
  post: any;
  featured?: boolean;
  className?: string;
  featuredClassName?: string;
}

const BlogCard = ({
  post,
  featured = false,
  featuredClassName,
  className,
}: BlogCardProps) => {
  if (featured) {
    return (
      <Link
        href={`/blog/${post?.slug?.current}`}
        className={cn("block  group", featuredClassName)}
      >
        <article className="relative overflow-hidden rounded-2xl bg-card shadow-card card-hover">
          <div className="aspect-video overflow-hidden">
            {post?.mainImage ? (
              <img
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              "fallback image here"
            )}
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <span className="inline-block px-3 capitalize py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full mb-3">
              {post.category != "other" ? post.category : post.customCategory}
            </span>
            <h2 className="font-heading text-2x leading-[1.3]! md:text-3xl lg:text-4xl font-bold text-background mb-3 line-clamp-2">
              {post.title}
            </h2>
            <p className="text-background/80 line-clamp-2 mb-4 max-w-2xl">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3">
              {post.authorImage ? (
                <img
                  src={urlFor(post.authorImage).url()}
                  alt={post.author ? post.author : "Author Profile Picture"}
                  className="w-10 h-10 rounded-full object-cover border-2 border-background/30"
                />
              ) : (
                <div className="w-[21px] h-[21px] bg-primary flex-none rounded-full overflow-hidden">
                  fall back img
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-background">
                  {post.author}
                </p>
                <p className="text-xs text-background/70">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                {/* <p className="text-xs text-background/70">
                  {post.date}

                  · {post.readTime}
                </p> */}
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post?.slug?.current}`}
      className={cn("block group", className)}
    >
      <article className="bg-card rounded-xl overflow-hidden shadow-soft card-hover h-full flex flex-col">
        <div className="aspect-16/10 overflow-hidden">
          {post?.mainImage ? (
            <img
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            "fallback image here"
          )}
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            {post.category != "other" ? post.category : post.customCategory}
          </span>
          <h3 className="font-heading text-xl font-semibold text-foreground mt-2 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            {post.authorImage ? (
              <img
                src={urlFor(post.authorImage).url()}
                alt={post.author ? post.author : "Author Profile Picture"}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-[21px] h-[21px] bg-primary flex-none rounded-full overflow-hidden">
                fall back img
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {post.author}
              </p>
            </div>
            {/* <p className="text-xs text-muted-foreground">{post.readTime}</p> */}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
