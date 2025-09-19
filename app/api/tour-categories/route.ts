import { NextResponse } from "next/server";
import { mockTourCategories } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(mockTourCategories);
}
