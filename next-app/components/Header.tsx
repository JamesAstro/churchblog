"use client";

import { Mailbox, Search, User } from "lucide-react";

import Link from "next/link";
import { Button } from "./ui/button";
import Wrapper from "./Wrapper";
import { useState } from "react";
import SearchModal from "./SearchModal";
import { cn } from "@/lib/utils";
import NewsLetterFormModal from "./NewsLetterFormModal";
import SearchPostModal from "./SearchPostModal";

const Header = ({ className }: { className?: string }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNewsletterFormOpen, setIsNewsletterFormOpen] = useState(false);

  const onSearchClick = () => {
    setIsSearchOpen(true);
  };
  const onSubscribeClick = () => {
    setIsNewsletterFormOpen(true);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 no-print z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border",
          className
        )}
      >
        <Wrapper className="px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 no-print">
              <span className="font-heading text-2xl font-bold text-foreground tracking-tight">
                Church<span className="text-primary">Blog</span>
              </span>
            </Link>

            {/* <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline"
              >
                Home
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline"
              >
                Categories
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline"
              >
                About
              </Link>
            </nav> */}

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={onSearchClick}
                className="text-muted-foreground hover:text-foreground"
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button
                variant="editorial"
                size="sm"
                onClick={onSubscribeClick}
                className="flex focus-within:outline-0! focus-visible:ring-0!  focus-visible:outline-0!"
              >
                <Mailbox className="h-4 w-4 mr-1" />
                Subscribe
              </Button>
            </div>
          </div>
        </Wrapper>
      </header>
      <SearchPostModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <NewsLetterFormModal
        isOpen={isNewsletterFormOpen}
        onClose={() => setIsNewsletterFormOpen(false)}
      />
    </>
  );
};

export default Header;
