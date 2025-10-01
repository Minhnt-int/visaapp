import { NextResponse } from "next/server";
import { getServices } from "@/lib/api";

export async function GET() {
  const response = await getServices();
  const services = await response.data;
  return NextResponse.json(services);
}
