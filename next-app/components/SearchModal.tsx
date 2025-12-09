import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

import { blogPosts, BlogPost } from "@/data/blogPosts";
import Link from "next/link";
import { Button } from "./ui/button";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BlogPost[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
        post.category.toLowerCase().includes(searchTerm)
    );
    setResults(filtered);
  }, [query]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 bg-foreground/20 backdrop-blur-sm animate-fade-in">
      <div className="fixed inset-x-4 top-20 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl">
        <div className="bg-background rounded-xl shadow-elevated border border-border overflow-hidden">
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search articles, topics, or tags..."
              value={query}
              onChange={(e: any) => setQuery(e.target.value)}
              className="border-0 flex h-10  py-2 text-sm placeholder:text-muted-foreground  bg-background w-full focus-within:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
            />
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {query.trim() === "" ? (
              <div className="p-8 text-center text-muted-foreground">
                <p className="font-body">Start typing to search...</p>
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <p className="font-body">No results found for "{query}"</p>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {results.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      onClick={onClose}
                      className="block p-4 hover:bg-accent transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-16 h-16 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-xs font-medium text-primary uppercase tracking-wider">
                            {post.category}
                          </span>
                          <h4 className="font-heading font-semibold text-foreground mt-1 line-clamp-1">
                            {post.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-3 border-t border-border bg-muted/50">
            <p className="text-xs text-muted-foreground text-center">
              Press{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-xs">
                Esc
              </kbd>{" "}
              to close
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
