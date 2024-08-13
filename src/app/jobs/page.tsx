"use client";
import React, { useState, useEffect } from "react";
import { Suspense } from "react";
import JobListItem from "@/components/JobListItem";
import JobFilter from "@/components/JobFilter";
import { PaginationDemo } from "@/components/Pagination";

export default function JobsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams["page"] ?? "1");
  const per_page = Number(searchParams["per_page"] ?? "5");

  const [filters, setFilters] = useState({
    search: "",
    location: "",
    jobType: "",
    salaryRanges: {
      "10k-30k": false,
      "30k-50k": false,
      "50k-75k": false,
      "75k+": false,
    },
  });
  const [jobs, setJobs] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJobs() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/jobs?search=${filters.search}&location=${filters.location}&jobType=${filters.jobType}&salaryRanges=${JSON.stringify(filters.salaryRanges)}&page=${page}&per_page=${per_page}`
        );
        if (!response.ok) throw new Error("Failed to fetch jobs");
        const data = await response.json();
        setJobs(data.jobs);
        setTotalPages(data.totalPages);
      } catch (error) {
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchJobs();
  }, [filters, page, per_page]);

  const hasNextPage = page < totalPages;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-4">
        <div className="sticky mb-4 lg:ml-10">
          <Suspense fallback={<div>Loading...</div>}>
            <PaginationDemo
              hasNextPage={hasNextPage}
              totalPages={totalPages}
              currentPage={page}
            />
          </Suspense>
        </div>
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Filter Jobs</h2>
              <JobFilter filters={filters} setFilters={setFilters} />
            </div>
          </aside>
          <main className="lg:w-3/4">
            <div className=" p-6 ">
              <h2 className="text-2xl font-semibold mb-6">
                Latest Job Listings
              </h2>
              {isLoading ? (
                <div className="text-center py-12">Loading...</div>
              ) : error ? (
                <div className="text-center py-12 text-red-600">{error}</div>
              ) : jobs.length > 0 ? (
                <div className="space-y-3">
                  {jobs.map((job: any) => (
                    <JobListItem key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">No jobs found</div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
