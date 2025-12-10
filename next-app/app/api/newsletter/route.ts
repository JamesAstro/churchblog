import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import client from "@sendgrid/client";

if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
) {
  throw new Error("Missing Supabase environment variables");
}

if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_LIST_ID) {
  throw new Error("Missing SendGrid environment variables");
}

client.setApiKey(process.env.SENDGRID_API_KEY!);

const LIST_ID = process.env.SENDGRID_LIST_ID!;

export async function POST(req: NextRequest) {
  try {
    const { email, website } = await req.json();

    console.log("email", email);
    console.log("website", website);

    // Bot detection
    if (website) {
      return NextResponse.json({ message: "Spam blocked" }, { status: 200 });
    }

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from("newsletter_emails")
      .upsert([{ email }], { onConflict: "email" });

    console.log("error", error);
    if (error) {
      console.log(
        "NextResponse.json({ error: error.message }, { status: 500 })",
        NextResponse.json({ error: error.message }, { status: 500 })
      );
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("data", data);

    // Save to SendGrid
    try {
      const response = await client.request({
        method: "PUT",
        url: "/v3/marketing/contacts",
        body: {
          list_ids: [LIST_ID],
          contacts: [{ email }],
        },
      });
      console.log("response", response);
    } catch (sgError) {
      console.error("SendGrid error:", sgError);
    }

    // Always return success if at least one worked

    return NextResponse.json({
      message: "✅ You are subscribed!",
      data,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
