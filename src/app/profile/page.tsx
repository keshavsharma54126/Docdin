"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UserPlusIcon, BriefcaseIcon } from "@heroicons/react/24/outline";

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
  AcademicCapIcon,
  PhoneIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

import { FaInstagram, FaResearchgate, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const session = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    const res = await axios.get("/api/userInfo");
    setUserData(res.data.user);
  };
  if (!session) {
    router.push("/signin");
  }

  return (
    <div className="flex flex-col container mx-auto p-4 gap-2">
      <div>
        <Card className="mt-4 w-full overflow-hidden shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="relative">
                <Image
                  src={userData?.imageUrl || "/default-avatar.png"}
                  alt="profile"
                  width={160}
                  height={160}
                  className="rounded-full border-4 border-blue-500 shadow-md"
                />
                <div className="absolute bottom-0 right-0 bg-green-500 text-white text-sm font-semibold rounded-full px-3 py-1 shadow-sm">
                  62%
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {userData?.fullName}
                  </h1>
                  <PencilIcon className="h-8 w-8 text-gray-600 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-12" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                    <span className="font-semibold">Years of Experience:</span>
                    {userData?.yoe ? (
                      <span>{userData.yoe} years</span>
                    ) : (
                      <span>N/A</span>
                    )}
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
                    <Link
                      href={userData?.socialLinks?.[0]?.researchGate || "#"}>
                      <div className="hover:mt-1 hover:scale-105 transition-all duration-300">
                        <FaResearchgate className="size-6 text-green-600" />
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="flex flex-row gap-6 my-6">
                  <Button
                    variant="docdin"
                    className="flex items-center gap-2 text-lg">
                    <UserPlusIcon className="h-5 w-5" />
                    Connect
                  </Button>
                  {session.data?.user?.email === userData?.email && (
                    <Button
                      variant="docdin"
                      className="flex items-center gap-2 text-lg">
                      <BriefcaseIcon className="h-5 w-5" />
                      Post Job
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>posts</Card>
      </div>
      <div>
        <Card></Card>
      </div>
      <div>
        <Card></Card>
      </div>
    </div>
  );
};

export default ProfilePage;
