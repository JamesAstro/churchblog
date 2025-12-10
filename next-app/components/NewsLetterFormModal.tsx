import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

import { Button } from "./ui/button";
import Image from "next/image";
import NewsletterForm from "./NewsletterForm";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsLetterFormModal = ({ isOpen, onClose }: SearchModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

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
      <div className="fixed inset-x-4 top-20 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 sm:w-full md:max-w-146">
        <div className="bg-background rounded-xl shadow-elevated border border-border overflow-hidden">
          <div className="w-full flex justify-end absolute top-0 right-0">
            <Button variant="ghost" size="icon" onClick={onClose} title="Close">
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="w-full  px-4 pt-7 pb-5">
            <div className="w-full flex justify-between items-center gap-x-7">
              <div className="flex-none w-[110px] cursor-pointer">
                <Image
                  src="/mailbox.png"
                  alt="mailbox icon"
                  width={300}
                  height={300}
                  className="w-full h-full"
                />
              </div>
              <div className="w-full">
                <h2 className="font-extrabold text-[24px]">Stay Updated!</h2>
                <h3 className="font-medium text-[19px] ">
                  Join Our Newsletter
                </h3>
                <p className="text-[15px] mt-1 mb-4 pr-3">
                  Subscribe to our newsletter to get latest updates delivered
                  directly in your inbox.
                </p>
              </div>
            </div>
            <NewsletterForm className="max-w-full px-2" onClose={onClose} />
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

export default NewsLetterFormModal;
