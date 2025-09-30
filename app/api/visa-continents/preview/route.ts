import { NextResponse } from "next/server";
import { getAllServices } from "@/lib/data";

export async function GET() {
  const services = await getAllServices();
  return NextResponse.json(services);
}
