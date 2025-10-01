import { NextResponse } from "next/server";
import { getServices } from "@/lib/api";

export async function GET() {
  try {
    const response = await getServices();
    const services = response.data;
    
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
