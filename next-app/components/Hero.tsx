import { cn } from "@/lib/utils";
import BlogCard from "./BlogCard";
import Wrapper from "./Wrapper";
import { Post } from "@/hooks/usePost";

const Hero = ({
  className,
  parentClassName,
  selectedCategory,
  featuredPost,
}: {
  className?: string;
  parentClassName?: string;
  selectedCategory?: string | null;
  featuredPost: any;
}) => {
  return (
    <div className={cn("w-full py-12 no-print", parentClassName)}>
      <Wrapper className="px-4">
        <section
          className={cn("text-center mb-12  animate-fade-in", className)}
        >
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Faith, Hope & Inspiration
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Encouraging devotionals, Bible studies, and spiritual insights for
            your daily walk with Christ.
          </p>
        </section>
        {/* Featured Post */}
        {!selectedCategory && (
          <div className=" animate-slide-up">
            <BlogCard post={featuredPost} featured />
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Hero;
