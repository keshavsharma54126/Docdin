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
      search
        ? { title: { contains: search as string, mode: "insensitive" } }
        : {},
      location
        ? { location: { equals: location as string, mode: "insensitive" } }
        : {},
      jobType
        ? { type: { equals: jobType as string, mode: "insensitive" } }
        : {},
    ].filter((condition) => Object.keys(condition).length > 0),
  };

  const selectedRanges = Object.entries(salaryRanges)
    .filter(([range, isSelected]) => isSelected)
    .map(([range, isSelected]) => range);

  if (selectedRanges.length > 0) {
    const salaryFilter = {
      OR: selectedRanges.map((range) => {
        switch (range) {
          case "10k-30k":
            return {
              AND: [{ salary: { gte: 10000 } }, { salary: { lt: 30000 } }],
            };
          case "30k-50k":
            return {
              AND: [{ salary: { gte: 30000 } }, { salary: { lt: 50000 } }],
            };
          case "50k-75k":
            return {
              AND: [{ salary: { gte: 50000 } }, { salary: { lt: 75000 } }],
            };
          case "75k+":
            return {
              AND: [{ salary: { gte: 75000 } }],
            };
          default:
            return {};
        }
      }),
    };
    filters.AND.push(salaryFilter);
  }

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
    return NextResponse.json({ message: "failed to fetch jobs" });
  }
}
