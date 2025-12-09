import { NextResponse, NextRequest } from "next/server";
import { sanityClient } from "@/lib/sanity";

export async function GET(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  let redirectUrl = "/"; // default fallback

  if (slug) {
    // Check if the post is published
    const query = `*[_type == "post" && slug.current == $slug][0]{slug}`;
    const post = await sanityClient.fetch(query, { slug });

    if (post) {
      redirectUrl = `/blog/${slug}`;
    }
  }

  const res = NextResponse.redirect(new URL(redirectUrl, baseUrl));

  res.cookies.delete("__prerender_bypass");
  res.cookies.delete("__next_preview_data");
  res.cookies.delete("sanity-preview");

  return res;
}
