import React from "react";
import { jobs } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "../ui/card";
import companylogoplaceholder from "../../assets/company-logo-placeholder.png";
import { Badge } from "../ui/badge";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import { formatMoney, relativeDate } from "@/lib/utils";
import dynamic from "next/dynamic";

const AnimatedComponent = dynamic(() => import("../AnimatedComponent"), {
  ssr: false,
});

interface JobListItem {
  job: jobs;
}

export default function JobListItem({
  job: {
    id,
    title,
    companyName,
    type,
    locationType,
    location,
    salary,
    createdAt,
  },
}: JobListItem) {
  return (
    <Link href={`/job/${id}`} className="block">
      <AnimatedComponent>
        <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group bg-white rounded-3xl transform hover:scale-[1.02] border border-teal-100">
          <CardContent className="p-0">
            <div className="flex items-stretch">
              <div className="w-2 bg-gradient-to-b from-teal-600 to-blue-400 group-hover:w-4 transition-all duration-300"></div>
              <div className="flex-grow p-6">
                <div className="flex items-start space-x-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-blue-300 rounded-2xl transform -rotate-6 group-hover:rotate-3 transition-all duration-300"></div>
                    <Image
                      src={companylogoplaceholder}
                      alt={`${companyName} logo`}
                      width={100}
                      height={100}
                      className="rounded-2xl relative z-10 border-2 border-white shadow-lg"
                    />
                  </div>
                  <div className="flex-grow">
                    <CardHeader className="p-0 mb-4">
                      <h2 className="text-2xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                        {title}
                      </h2>
                      <p className="text-lg text-gray-600 font-semibold group-hover:text-teal-500 transition-colors duration-300">
                        {companyName}
                      </p>
                    </CardHeader>
                    <div className="grid grid-cols-2 gap-y-3 text-sm">
                      <JobDetail icon={<Briefcase size={18} />} text={type} />
                      <JobDetail
                        icon={<MapPin size={18} />}
                        text={locationType}
                      />
                      <JobDetail
                        icon={<Globe2 size={18} />}
                        text={location || "Worldwide"}
                      />
                      <JobDetail
                        icon={<Banknote size={18} />}
                        text={formatMoney(salary)}
                      />
                      <JobDetail
                        icon={<Clock size={18} />}
                        text={relativeDate(createdAt)}
                      />
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="self-start mt-1 bg-gradient-to-r from-teal-600 to-blue-400 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                    {type}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedComponent>
    </Link>
  );
}

function JobDetail({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center space-x-2 text-gray-600 group-hover:text-teal-600 transition-colors duration-300">
      {icon}
      <span className="font-medium">{text}</span>
    </div>
  );
}
