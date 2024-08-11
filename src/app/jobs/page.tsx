import { Suspense } from "react";
import JobListItem from "@/components/JobListItem";
import JobFilter from "@/components/JobFilter";
import { PaginationDemo } from "@/components/Pagination";
import prisma from "@/lib/db";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams["page"] ?? "1");
  const per_page = Number(searchParams["per_page"] ?? "5");

  const totalJobs = await prisma.jobs.count({
    where: {
      approved: true,
    },
  });

  const totalPages = Math.ceil(totalJobs / per_page);
  const hasNextPage = page < totalPages;

  const jobs = await prisma.jobs.findMany({
    where: {
      approved: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * per_page,
    take: per_page,
  });

  return (
    <div className=" min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header and other content... */}
        <div className="flex flex-col lg:flex-row gap-4">
          <aside className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Filter Jobs</h2>
              <JobFilter />
            </div>
          </aside>
          <main className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6">
                Latest Job Listings
              </h2>
              {jobs.length > 0 ? (
                <div className="space-y-3">
                  {jobs.map((job) => (
                    <JobListItem key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  {/* No jobs found content... */}
                </div>
              )}
            </div>
            <div className="mt-5">
              <Suspense fallback={<div>Loading...</div>}>
                <PaginationDemo
                  hasNextPage={hasNextPage}
                  totalPages={totalPages}
                  currentPage={page}
                />
              </Suspense>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
