import { NextResponse } from 'next/server';
import { mockVisaCategories } from '@/lib/mock-data';

export async function GET() {
    const data = mockVisaCategories;
    return NextResponse.json({ success: true, data });
}