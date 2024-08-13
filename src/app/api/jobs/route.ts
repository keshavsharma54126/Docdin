// src/app/api/jobs/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search") || "";
  const location = url.searchParams.get("location") || "";
  const jobType = url.searchParams.get("jobType") || "";
  const salaryRanges = JSON.parse(url.searchParams.get("salaryRanges") || "{}");
  const page = Number(url.searchParams.get("page")) || 1;
  const per_page = Number(url.searchParams.get("per_page")) || 5;

  const filters: any = {
    approved: true,
    AND: [
      search ? { title: { contains: search, mode: "insensitive" } } : {},
      location ? { location: { equals: location, mode: "insensitive" } } : {},
      jobType ? { type: { equals: jobType, mode: "insensitive" } } : {},
      salaryRanges["10k-30k"] ? { salary: { gte: 10000, lt: 30000 } } : {},
      salaryRanges["30k-50k"] ? { salary: { gte: 30000, lt: 50000 } } : {},
      salaryRanges["50k-75k"] ? { salary: { gte: 50000, lt: 75000 } } : {},
      salaryRanges["75k+"] ? { salary: { gte: 75000 } } : {},
    ],
  };

  try {
    const totalJobs = await prisma.jobs.count({ where: filters });
    const totalPages = Math.ceil(totalJobs / per_page);

    const jobs = await prisma.jobs.findMany({
      where: filters,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * per_page,
      take: per_page,
    });

    return NextResponse.json({ jobs, totalPages, totalJobs });
  } catch (error) {
    return NextResponse.json({ message: "failed to fetchjobs" });
  }
}
