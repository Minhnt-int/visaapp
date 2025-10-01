import { NextResponse } from "next/server";
import { getAllServices } from "@/lib/api";

export async function GET() {
  const services = await getAllServices();
  return NextResponse.json(services);
}
