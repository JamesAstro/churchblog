"use client";
import Layout from "./Layout";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const ArticleNotFound = ({ className }: { className?: string }) => {
  return (
    <Layout>
      <div
        className={cn("container mx-auto px-4 py-20 text-center", className)}
      >
        <h1 className="font-heading text-4xl font-bold text-foreground mb-4">
          Article Not Found
        </h1>
        <p className="text-muted-foreground mb-8">
          The article you're looking for doesn't exist.
        </p>
        <Link href="/">
          <Button variant="default">Go Back Home</Button>
        </Link>
      </div>
    </Layout>
  );
};

export default ArticleNotFound;
