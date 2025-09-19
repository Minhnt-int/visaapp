import { NextResponse } from "next/server";
import { getCountriesByContinent } from "../../../lib/mock-data";

// GET /api/visa -> returns an object where keys are continent slugs and values are arrays of { slug, name }
export async function GET() {
  const data = getCountriesByContinent();
  return NextResponse.json({ success: true, data });
}
