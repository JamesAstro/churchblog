import React from "react";

export default function SanityPreviewLink({ document }: { document: any }) {
  const slug = document?.slug?.current;

  if (!slug) return <p>Save & generate slug to enable preview</p>;

  return (
    <a
      href={`http://localhost:3000/api/preview?slug=${slug}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "blue", textDecoration: "underline" }}
    >
      🔍 Preview this post
    </a>
  );
}
