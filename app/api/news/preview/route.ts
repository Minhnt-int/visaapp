import { newsData } from "@/lib/mock-data";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Trả về toàn bộ mockNews data
    return NextResponse.json(newsData);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { message: "Error fetching news" },
      { status: 500 }
    );
  }
}
