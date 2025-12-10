import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Wrapper from "./Wrapper";
import NewsletterForm from "./NewsletterForm";

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
        <NewsletterForm />
      </Wrapper>
    </section>
  );
};

export default NewsLetterSection;
