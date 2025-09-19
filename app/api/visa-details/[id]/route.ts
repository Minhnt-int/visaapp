import { NextResponse } from "next/server";
import { getVisaDetailById } from "@/lib/data";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!id) {
        return new NextResponse('Bad Request: Missing ID', { status: 400 });
    }

    try {
        // The ID from the URL should correspond to the country slug (e.g., 'phap', 'anh')
        // which is used as the key in mockVisaPageData.
        const visaDetail = await getVisaDetailById(id);

        if (!visaDetail) {
            return new NextResponse(null, { status: 404, statusText: "Not Found" });
        }

        return NextResponse.json(visaDetail);

    } catch (error) {
        console.error(`Error fetching visa details for ID: ${id}`, error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
