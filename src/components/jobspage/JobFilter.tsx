"use client";
import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Select from "../ui/select";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Search, Filter, MapPin, Briefcase } from "lucide-react";
import axios from "axios";

interface Filters {
  search: string;
  location: string;
  jobType: string;
  salaryRanges: {
    [key: string]: boolean; // Updated to allow indexing with any string
    "10k-30k": boolean;
    "30k-50k": boolean;
    "50k-75k": boolean;
    "75k+": boolean;
  };
}

interface JobFilterProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const JobFilter: React.FC<JobFilterProps> = ({ filters, setFilters }) => {
  const [locations, setLocations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLocations() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get("/api/getLocations");
        setLocations(response.data);
      } catch (e) {
        console.error("Error while fetching locations:", e);
        setError("Failed to load locations. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchLocations();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Reset the filters to default values
    setFilters({
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
  };

  const handleSalaryRangeChange = (range: string) => {
    setFilters((prev) => ({
      ...prev,
      salaryRanges: {
        ...prev.salaryRanges,
        [range]: !prev.salaryRanges[range],
      },
    }));
  };

  return (
    <div className="bg-gray-100 rounded-3xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 border border-teal-300">
      <div className="bg-gradient-to-r from-teal-800 to-blue-600 p-8">
        <h2 className="text-3xl font-bold text-white mb-2 font-poppins">
          Find Your Dream Medical Job
        </h2>
        <p className="text-teal-200 text-lg">
          Discover opportunities that match your medical expertise and career
          goals
        </p>
      </div>
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="search"
            className="text-gray-800 font-semibold text-lg">
            Search Jobs
          </Label>
          <div className="relative group">
            <Input
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              id="search"
              name="search"
              placeholder="Medical specialty, hospital, or keywords"
              className="pl-12 pr-4 py-3 border-2 border-teal-700 rounded-lg focus:border-teal-600 focus:ring focus:ring-teal-300 transition-all duration-300 text-lg"
            />
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-teal-600 transition-colors duration-300"
              size={24}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="location"
            className="text-gray-800 font-semibold text-lg">
            Location
          </Label>
          <div className="relative group">
            <Select
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
              className="pl-12 border-2 border-teal-400 rounded-lg focus:border-teal-600 focus:ring focus:ring-teal-300 transition-all duration-300"
              id="location"
              name="location"
              disabled={isLoading}>
              <option value="" disabled>
                Select a location
              </option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
            <MapPin
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-teal-600 transition-colors duration-300"
              size={24}
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="jobType"
            className="text-gray-800 font-semibold text-lg">
            Job Type
          </Label>
          <div className="relative group">
            <Select
              value={filters.jobType}
              onChange={(e) =>
                setFilters({ ...filters, jobType: e.target.value })
              }
              className="pl-12 border-2 border-teal-400 rounded-lg focus:border-teal-600 focus:ring focus:ring-teal-300 transition-all duration-300"
              id="jobType"
              name="jobType">
              <option value="" disabled>
                Select job type
              </option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </Select>
            <Briefcase
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-teal-600 transition-colors duration-300"
              size={24}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-gray-800 font-semibold text-lg">
            Salary Range
          </Label>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(filters.salaryRanges).map(([range, checked]) => (
              <div key={range} className="flex items-center space-x-2">
                <Checkbox
                  id={range}
                  checked={checked}
                  onCheckedChange={() => handleSalaryRangeChange(range)}
                  className="border-teal-400 text-teal-600 focus:ring-teal-600"
                />
                <Label
                  htmlFor={range}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {`Rs ${range}`}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-700 to-blue-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-teal-800 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-opacity-50 text-lg shadow-lg">
          <Filter className="mr-2" size={24} />
          Remove Filters
        </Button>
      </form>
    </div>
  );
};

export default JobFilter;
