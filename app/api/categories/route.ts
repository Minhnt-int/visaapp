import { mockNews } from "@/lib/mock-data"; // Assuming mockNews is the source of news data
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Process mockNews to count articles per keyword
    const keywordCounts: { [key: string]: number } = {};

    // Assuming each news item has a 'keyword' property which is an array of strings
    mockNews.forEach((newsItem) => {
      if (newsItem.keyword && Array.isArray(newsItem.keyword)) {
        newsItem.keyword.forEach((keyword) => {
          if (keyword) {
            keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
          }
        });
      }
    });

    // Format the keywords data
    const keywords = Object.keys(keywordCounts).map((keywordName) => ({
      name: keywordName,
      count: keywordCounts[keywordName],
    }));

    return NextResponse.json(keywords);
  } catch (error) {
    console.error("Error fetching keywords:", error);
    return NextResponse.json(
      { message: "Error fetching keywords" },
      { status: 500 }
    );
  }
}
