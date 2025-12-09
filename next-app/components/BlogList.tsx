import { BlogPost, categories } from "@/data/blogPosts";
import { Button } from "./ui/button";
import Wrapper from "./Wrapper";
import BlogCard from "./BlogCard";

const BlogList = ({
  className,
  selectedCategory,
  setSelectedCategory,
  regularPosts,
}: {
  className?: string;
  selectedCategory?: string | null;
  setSelectedCategory?: (category: string | null) => void;
  regularPosts?: any;
}) => {
  return (
    <div className="w-full pb-12">
      <Wrapper className="px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory?.(null)}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.title}
              variant={
                selectedCategory === category.value ? "default" : "outline"
              }
              size="sm"
              onClick={() => setSelectedCategory?.(category.value)}
            >
              {category.title}
            </Button>
          ))}
        </div>

        {/* Blog Grid */}

        {regularPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {regularPosts?.map((post: any, index: number) => (
              <div
                key={post._id}
                className="animate-fade-in h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BlogCard post={post} className="h-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full text-center flex py-5 h-[200px] border border-dashed border-primary/70  justify-center items-center">
            <p>No post for this category.</p>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default BlogList;
