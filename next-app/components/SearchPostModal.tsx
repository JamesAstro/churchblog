"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Post {
  title: string;
  slug: { current: string };
  excerpt: string;
  category?: string;
  customCategory?: string;
  mainImage?: string;
}

const SearchPostModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  // debounce and fetch from API
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const handler = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        console.log("data", data);
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 300); // wait 300ms after typing stops

    return () => clearTimeout(handler); // cancel previous timeout
  }, [query]);

  // close modal on Esc
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
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex justify-center items-start pt-20">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex items-center gap-3 px-4  py-2 border-b border-gray-200">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border-0 py-2 px-1 text-sm outline-none"
          />
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() === "" ? (
            <div className="p-8 text-center text-gray-400">
              Start typing to search...
            </div>
          ) : loading ? (
            <div className="p-8 text-center text-gray-400">Searching...</div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No results found for "{query}"
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {results.map((post, index) => (
                <li key={index}>
                  <Link
                    href={`/blog/${post.slug.current}`}
                    onClick={onClose}
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {post.mainImage ? (
                        <img
                          src={post.mainImage}
                          alt={post.title}
                          className="w-14 h-14 rounded-lg object-cover shrink-0"
                        />
                      ) : (
                        "fallback image here"
                      )}
                      <div className="min-w-0">
                        {post.category && (
                          <span className="text-xs font-medium text-primary uppercase tracking-wider">
                            {post.category != "other"
                              ? post.category
                              : post.customCategory}
                          </span>
                        )}
                        <h4 className="font-semibold text-[15px] text-gray-900 truncate">
                          {post.title}
                        </h4>
                        {post.excerpt && (
                          <p className="text-[13px] text-gray-500 mt-1 truncate">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-3 border-t border-gray-200 bg-gray-50 text-center text-xs text-gray-500">
          Press{" "}
          <kbd className="px-1 py-0.5 rounded bg-white border text-xs">Esc</kbd>{" "}
          to close
        </div>
      </div>
    </div>
  );
};

export default SearchPostModal;
