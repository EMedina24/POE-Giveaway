import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { giveaway_id, participant_name, reddit_name, reddit_profile_link } = body;

    // Validate required fields
    if (!giveaway_id || !participant_name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get IP address from request headers
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Create Supabase client
    const supabase = await createClient();

    // Check if IP address has already entered this giveaway
    if (ip !== "unknown") {
      const { data: existingEntries, error: checkError } = await supabase
        .from("entries")
        .select("id")
        .eq("giveaway_id", giveaway_id)
        .eq("ip_address", ip)
        .limit(1);

      if (!checkError && existingEntries && existingEntries.length > 0) {
        return NextResponse.json(
          { error: "This IP address has already entered this giveaway" },
          { status: 409 }
        );
      }
    }

    // Insert entry with IP address
    const { data, error } = await supabase
      .from("entries")
      .insert({
        giveaway_id,
        participant_name,
        reddit_name: reddit_name || null,
        reddit_profile_link: reddit_profile_link || null,
        ip_address: ip,
      })
      .select()
      .single();

    if (error) {
      // Handle duplicate entry error (participant_name unique constraint)
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "You have already entered this giveaway" },
          { status: 409 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error("Error creating entry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
