import { NextResponse } from "next/server";
import { getAllServices } from "@/lib/data";

export async function GET() {
  try {
    const services = await getAllServices();
    
    // Extract the country from each service
    const countries = services.map(service => service.country);
    
    // Create a unique list of countries
    const uniqueCountries = Array.from(new Set(countries));
    
    return NextResponse.json(uniqueCountries);

  } catch (error) {
    console.error("Error fetching countries:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
