import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ message: "Missing slug" }, { status: 400 });
  }

  const res = NextResponse.redirect(
    new URL(`/blog/${slug}?preview=true`, req.url)
  );

  res.cookies.set("__prerender_bypass", "1");
  res.cookies.set("__next_preview_data", "1");
  res.cookies.set("sanity-preview", "true", { path: "/" });

  return res;
}
