"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface UserData {
  achievements?: string | null;
  address?: string | null;
  articles?: string | null;
  certificateCourse?: string | null;
  college?: string | null;
  conferenceHours?: string | null;
  createdAt?: string;
  education?: string | null;
  electives?: string | null;
  email?: string;
  fellowship?: string | null;
  fullName?: string;
  googleId?: string;
  id?: string;
  imageUrl?: string;
  job?: string | null;
  password?: string | null;
  phone?: string | null;
  research?: string | null;
  residency?: string | null;
  updatedAt?: string;
  workshop?: string | null;
  designation?: string | null;
  yoe?: number | null;
}

import {
  HomeIcon,
  EnvelopeIcon,
  BriefcaseIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

const ProfilePage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    const res = await axios.get("/api/userInfo");
    setUserData(res.data.user);
  };

  return (
    <div className="container mx-auto">
      <Card className="mt-4 w-full overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <Image
                src={userData?.imageUrl || "/default-avatar.png"}
                alt="profile"
                width={120}
                height={120}
                className="rounded-full border-4 border-blue-500"
              />
              <div className="absolute bottom-0 right-0 bg-green-500 text-white text-xs rounded-full px-2 py-1">
                62%
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold">{userData?.fullName}</h1>
              <p className="text-gray-500 text-sm mb-4">
                Profile last updated: {userData?.updatedAt}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-row gap-2">
                  <HomeIcon className="size-6" />
                  <span className="font-semibold">Location:</span>
                  {userData?.address ? (
                    <span>{userData.address}</span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
                <div className="flex flex-row gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                  <span className="font-semibold">Phone:</span>
                  {userData?.phone ? (
                    <span>{userData.phone}</span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
                <div className="flex flex-row gap-2">
                  <EnvelopeIcon className="size-6" />
                  <span className="font-semibold">Email:</span>
                  {userData?.email ? (
                    <span>{userData.email}</span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
                <div className="flex flex-row gap-2">
                  <BriefcaseIcon className="size-6" />
                  <span className="font-semibold">{userData?.yoe}</span>
                  <span>1 Year</span>
                </div>
                <div className="flex flex-row gap-2">
                  <AcademicCapIcon className="size-6" />
                  <span className="font-semibold">Designation:</span>
                  {userData?.designation ? (
                    <span>{userData.designation}</span>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              </div>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Add availability to join
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
