import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import prisma from "@/lib/db";
import { Button } from "./ui/button";
import { Search, Filter, MapPin, Briefcase } from "lucide-react";

async function filterJobs(formData: any) {
  "use server";
  // Implement server-side filtering logic here
}

export default async function JobFilter() {
  const dlocations = (await prisma.jobs
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }: any) => location).filter(Boolean)
    )) as string[];

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 border border-gray-100">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-400 p-8">
        <h2 className="text-3xl font-bold text-white mb-2 font-poppins">
          Find Your Dream Job
        </h2>
        <p className="text-indigo-100 text-lg">
          Discover opportunities that match your skills and aspirations
        </p>
      </div>
      <form action={filterJobs} className="p-8 space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="search"
            className="text-gray-700 font-semibold text-lg">
            Search Jobs
          </Label>
          <div className="relative group">
            <Input
              id="search"
              name="search"
              placeholder="Job title, company, or keywords"
              className="pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all duration-300 text-lg"
            />
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-300"
              size={24}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="location"
            className="text-gray-700 font-semibold text-lg">
            Location
          </Label>
          <div className="relative group">
            <Select
              id="location"
              name="location"
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all duration-300 appearance-none text-lg">
              <option value="" disabled selected>
                Select a location
              </option>
              {dlocations.map((l: string) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </Select>
            <MapPin
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-300"
              size={24}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="jobType"
            className="text-gray-700 font-semibold text-lg">
            Job Type
          </Label>
          <div className="relative group">
            <Select
              id="jobType"
              name="jobType"
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all duration-300 appearance-none text-lg">
              <option value="" disabled selected>
                Select job type
              </option>
              <option value="fullTime">Full-time</option>
              <option value="partTime">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </Select>
            <Briefcase
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-300"
              size={24}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-400 text-white font-semibold py-4 px-6 rounded-lg hover:from-indigo-700 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-lg shadow-lg">
          <Filter className="mr-2" size={24} />
          Apply Filters
        </Button>
      </form>
    </div>
  );
}
