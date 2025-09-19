import { NextResponse } from 'next/server';
import { visaCategories } from '@/lib/visa-mock-data';

export async function GET() {
  return NextResponse.json(visaCategories);
}