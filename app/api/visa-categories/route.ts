import { NextResponse } from 'next/server';
import { mockVisaCategories } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json(mockVisaCategories);
}