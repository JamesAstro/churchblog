"use client";

import { Search, User } from "lucide-react";

import Link from "next/link";
import { Button } from "./ui/button";
import Wrapper from "./Wrapper";
import { useState } from "react";
import SearchModal from "./SearchModal";
import { cn } from "@/lib/utils";

const Header = ({ className }: { className?: string }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const onSearchClick = () => {
    setIsSearchOpen(true);
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
              <Link href="/auth/login">
                <Button
                  variant="editorial"
                  size="sm"
                  className="hidden sm:flex"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </Link>
              <Link href="/auth/login" className="sm:hidden">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </Wrapper>
      </header>
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Header;
