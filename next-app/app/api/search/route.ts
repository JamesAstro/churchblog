import { NextRequest } from "next/server";
import { sanityClient } from "@/lib/sanity";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q)
    return new Response(JSON.stringify({ error: "Query is required" }), {
      status: 400,
    });

  try {
    const query = `*[_type == "post" && (title match $q || pt::text(body) match $q || excerpt match $q || category match $q)]{
      title,
      slug,
      excerpt,
      category,
      customCategory,
      "mainImage": mainImage.asset->url
    } | order(publishedAt desc)`;

    const posts = await sanityClient.fetch(query, { q });

    console.log("postssssszzzzzz:", JSON.stringify(posts));
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Sanity search error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch posts" }), {
      status: 500,
    });
  }
}
