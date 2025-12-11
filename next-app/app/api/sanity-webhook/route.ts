import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import client from "@sendgrid/client";
import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity";
import { toHTML } from "@portabletext/to-html";

client.setApiKey(process.env.SENDGRID_API_KEY!);

const LIST_ID = process.env.SENDGRID_LIST_ID!;
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (req.headers.get("sanity-webhook-secret") !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Received webhook2:", body);
    const docId = body._id;
    console.log("docId2", docId);
    if (!docId)
      return NextResponse.json({ error: "No document ID" }, { status: 400 });

    const query = groq`*[_id == $id][0]{
      title,
      slug,
      excerpt,
      body,
      mainImage,
      publishedAt
    }`;

    const post = await sanityClient.fetch(query, { id: docId });
    console.log("Fetched post2:", post);

    if (!post)
      return NextResponse.json({ error: "Post not found" }, { status: 404 });

    // Convert Portable Text body to HTML
    const postHTML = toHTML(post.body || []);

    console.log("Post HTML generated2", postHTML);

    // Fetch subscriber emails from Supabase
    const { data: emails, error } = await supabase
      .from("newsletter_emails")
      .select("email");
    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch emails" },
        { status: 500 }
      );
    }
    console.log("Fetched emails2:", emails);
    const contacts = emails.map((e) => ({ email: e.email }));
    console.log("Fetched contacts2:", contacts);

    if (contacts.length === 0) {
      return NextResponse.json({ message: "No subscribers to send to" });
    }

    // Send email to all subscribers
    const msg = {
      personalizations: contacts.map((c) => ({
        to: [{ email: c.email }],
      })),
      from: {
        email: "astronomojamesclifford@gmail.com", // change later
        name: "Church Blog",
      },
      replyTo: "no-reply@churchblog.com",
      subject: `Church Blog New: ${post.title}`,
      content: [
        {
          type: "text/html",
          value: `
        <h1>${post.title}</h1>
        <p>${post.excerpt || ""}</p>
        ${postHTML}
        <p>
          <a href="https://your-site.vercel.app/blog/${post.slug.current}">
            Read full post
          </a>
        </p>
      `,
        },
      ],
    };
    try {
      await client.request({
        method: "POST",
        url: "/v3/mail/send",
        body: msg,
      });
    } catch (e) {
      console.error("SendGrid mail error:", e);
    }

    return NextResponse.json({ message: "Send emails successfully" });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}
