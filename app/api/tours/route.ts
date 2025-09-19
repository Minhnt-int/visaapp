import { NextResponse } from 'next/server';
import { mockTours } from '@/lib/mock-data';

export async function GET() {
  // In a real application, you would fetch this data from a database
  // or a headless CMS.
  try {
    return NextResponse.json(mockTours);
  } catch (error) {
    console.error("Failed to fetch tours:", error);
    return NextResponse.json({ message: "Failed to fetch tours" }, { status: 500 });
  }
}
