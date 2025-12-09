import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Wrapper from "./Wrapper";

const NewsLetterSection = ({ className }: { className?: string }) => {
  return (
    <section className={cn("py-16 bg-white w-full", className)}>
      <Wrapper className="px-4 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
          Stay Connected in Faith
        </h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Receive weekly devotionals, sermon highlights, and uplifting content
          straight to your inbox.
        </p>
        <form className="flex flex-wrap gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button variant="default" size="lg" className="h-[47px]!">
            Subscribe
          </Button>
        </form>
      </Wrapper>
    </section>
  );
};

export default NewsLetterSection;
