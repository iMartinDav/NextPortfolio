// app/api/fetch-umami-stats/route.ts
import { getClient } from "@umami/api-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = getClient({
      apiEndpoint: process.env.NEXT_PUBLIC_UMAMI_BASE_URL,
    });

    const response = await client.getWebsiteStats(
      process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID as string,
      {
        startAt: Date.now() - 24 * 60 * 60 * 1000,
        endAt: Date.now(),
      }
    );

    if (!response.ok || !response.data) {
      throw new Error("Failed to fetch Umami stats");
    }

    const data = response.data;
    data.totalTime.value /= 60;
    data.totalTime.prev /= 60;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Umami stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 }
    );
  }
}
