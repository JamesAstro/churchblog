"use client";
import { useEffect, useState } from "react";
import {
  Share2,
  Link2,
  Twitter,
  Facebook,
  Linkedin,
  Printer,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons = ({ title, url }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      setCanShare(true);
    }
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank");
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(facebookUrl, "_blank");
  };

  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(title)}`;
    window.open(linkedInUrl, "_blank");
  };

  const shareToWhatsApp = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${title} - ${url}`
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleNativeShare = async () => {
    try {
      if (typeof navigator !== "undefined" && "share" in navigator) {
        await (navigator as any).share({
          title,
          text: title,
          url,
        });
      } else {
        toast.error("Sharing is not supported in this browser");
      }
    } catch (err) {
      console.log("Share canceled", err);
    }
  };

  return (
    <div className="share-buttons flex flex-wrap items-center gap-2 no-print">
      <span className="text-sm text-muted-foreground font-medium flex items-center gap-2">
        <Share2 className="h-4 w-4" />
        Share:
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="gap-2"
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
        {copied ? "Copied!" : "Copy Link"}
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={shareToTwitter}
        className="h-9 w-9"
        title="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={shareToFacebook}
        className="h-9 w-9"
        title="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={shareToLinkedIn}
        className="h-9 w-9"
        title="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={shareToWhatsApp}
        title="Share on Whatsapp"
      >
        🟢
      </Button>

      {/* Mobile / Native Share */}
      {canShare && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleNativeShare}
          title="Share using device"
        >
          📱 Share
        </Button>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={handlePrint}
        className="gap-2"
      >
        <Printer className="h-4 w-4" />
        Print
      </Button>
    </div>
  );
};

export default ShareButtons;
