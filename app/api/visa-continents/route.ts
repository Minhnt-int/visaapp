import { NextResponse } from 'next/server';
import { mockVisaContinents } from '@/lib/mock-data';

export async function GET() {
    const data = mockVisaContinents;
    return NextResponse.json({ success: true, data });
}