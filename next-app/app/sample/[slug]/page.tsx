import { sanityClient, previewClient } from "@/lib/sanity";
import { cookies } from "next/headers";
import { PortableText } from "@portabletext/react";

interface Props {
  params: any;
  searchParams: any;
}

export default async function BlogPage({ params, searchParams }: Props) {
  console.log("paramsssss", await params);
  console.log("searchParams", await searchParams);
  const { slug } = await params;
  const { preview } = await searchParams;

  console.log("slugsssss", slug);
  console.log("previewsss", preview);
  //   const isPreview =
  //     cookies().get("sanity-preview")?.value === "true" ||
  //     searchParams.preview === "true";
  //   const isPreview = true;
  const isPreview = preview === "true";

  console.log("isPreview", isPreview);

  const client = isPreview ? previewClient : sanityClient;
  console.log("client", client);
  const query = `*[_type=="post" && slug.current == $slug][0]{
    title,
    body
  }`;

  const post = await client.fetch(query, { slug });
  console.log("post", post);

  if (!post) return <p>Post not found</p>;

  return (
    <div style={{ padding: 20 }}>
      {isPreview && (
        <div style={{ background: "#fffae6", padding: 10, color: "#000" }}>
          Preview Mode Enabled
        </div>
      )}
      <h1>{post.title}</h1>
      <PortableText value={post.body} />
      {isPreview && (
        <a
          href={`/api/exit-preview?slug=${slug}`}
          style={{ display: "block", marginTop: 20 }}
        >
          Exit Preview
        </a>
      )}
    </div>
  );
}
