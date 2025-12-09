"use client";

import { cn } from "@/lib/utils";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster as Sonner } from "./ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <Sonner />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
