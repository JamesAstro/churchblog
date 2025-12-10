"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

export default function NewsletterForm({
  className,
  onClose,
}: {
  className?: string;
  onClose?: () => void;
}) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }), // send honeypot
      });

      const data = await res.json();
      console.log("data FRONTEND", data);
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      toast.success("Thanks for subscribing!", {
        className: "bg-green-600! text-white! border-none!",
      });
      setEmail("");
      onClose && onClose();
    } catch (error: any) {
      toast.error(error.message || "Request failed", {
        className: "bg-red-600! text-white! border-none!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-wrap gap-3 max-w-md mx-auto", className)}
    >
      {/* ✅ Hidden input - bots usually fill this */}
      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <Button
        disabled={loading}
        type="submit"
        variant="default"
        size="lg"
        className="h-[47px]!"
      >
        Subscribe
        {loading && (
          <LoaderCircle className="animate-spin w-[19px]! h-[19px]!" />
        )}
      </Button>
    </form>
  );
}
