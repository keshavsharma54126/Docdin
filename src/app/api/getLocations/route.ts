import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const locations = await prisma.jobs.findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    });

    const locationArray = locations
      .map(({ location }) => location)
      .filter((location): location is string => Boolean(location));

    return NextResponse.json(locationArray, { status: 200 });
  } catch (error) {
    console.error("Error while fetching locations:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching locations" },
      { status: 500 }
    );
  }
}
