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
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    researchGate?: string;
    linkedin?: string;
  }[];
}

import {
  HomeIcon,
  EnvelopeIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Instagram from "next-auth/providers/instagram";
import { FaInstagram, FaResearchgate, FaTwitter } from "react-icons/fa";
import Link from "next/link";

const ProfileItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | undefined | null;
}) => (
  <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
    {icon}
    <div>
      <span className="font-semibold text-gray-700">{label}:</span>
      <span className="ml-2 text-gray-600">{value || "N/A"}</span>
    </div>
  </div>
);

const SocialLink = ({
  href,
  icon,
}: {
  href: string | undefined;
  icon: React.ReactNode;
}) => (
  <Link href={href || "#"}>
    <div className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      {icon}
    </div>
  </Link>
);

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
                  <PhoneIcon className="size-6" />
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
                  <span>N/A</span>
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
                <div className="flex flex-row gap-4">
                  <Link href={userData?.socialLinks?.[0]?.instagram || "#"}>
                    <div className="hover:mt-1 hover:scale-105 transition-all duration-300">
                      <FaInstagram className="size-6 text-pink-500" />
                    </div>
                  </Link>
                  <Link href={userData?.socialLinks?.[0]?.twitter || "#"}>
                    <div className="hover:mt-1 hover:scale-105 transition-all duration-300">
                      <FaTwitter className="size-6 text-blue-400" />
                    </div>
                  </Link>
                  <Link href={userData?.socialLinks?.[0]?.researchGate || "#"}>
                    <div className="hover:mt-1 hover:scale-105 transition-all duration-300">
                      <FaResearchgate className="size-6 text-green-600" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
