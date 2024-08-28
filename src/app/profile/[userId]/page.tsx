"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UserPlusIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaResearchgate,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
        <Card className="mt-4 w-full overflow-hidden shadow-lg bg-gradient-to-br from-white to-blue-50">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}>
                <Image
                  src={userData?.imageUrl || "/default-avatar.png"}
                  alt="profile"
                  width={180}
                  height={180}
                  className="rounded-full border-4 border-blue-500 shadow-lg"
                />
                <div className="absolute bottom-2 right-2 bg-green-500 text-white text-sm font-semibold rounded-full px-3 py-1 shadow-sm">
                  62%
                </div>
              </motion.div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    {userData?.fullName}
                  </h1>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-600 hover:text-blue-500 transition-colors duration-300">
                    <PencilIcon className="h-6 w-6" />
                  </motion.button>
                </div>
                <p className="text-xl text-gray-600 mb-6">
                  {userData?.designation || "Professional Title"}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <InfoItem
                    label="Location"
                    value={userData?.address || "N/A"}
                    icon={<HomeIcon className="h-5 w-5" />}
                  />
                  <InfoItem
                    icon={<PhoneIcon className="h-5 w-5" />}
                    label="Phone"
                    value={userData?.phone || "N/A"}
                  />
                  <InfoItem
                    icon={<EnvelopeIcon className="h-5 w-5" />}
                    label="Email"
                    value={userData?.email || "N/A"}
                  />
                  <InfoItem
                    icon={<BriefcaseIcon className="h-5 w-5" />}
                    label="Experience"
                    value={userData?.yoe ? `${userData.yoe} years` : "N/A"}
                  />
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                  <SocialLink
                    href={userData?.socialLinks?.[0]?.instagram || "#"}
                    icon={<FaInstagram className="h-5 w-5" />}
                    color="text-pink-500"
                  />
                  <SocialLink
                    href={userData?.socialLinks?.[0]?.twitter || "#"}
                    icon={<FaTwitter className="h-5 w-5" />}
                    color="text-blue-400"
                  />
                  <SocialLink
                    href={userData?.socialLinks?.[0]?.researchGate || "#"}
                    icon={<FaResearchgate className="h-5 w-5" />}
                    color="text-green-600"
                  />
                  <SocialLink
                    href={userData?.socialLinks?.[0]?.linkedin || "#"}
                    icon={<FaLinkedinIn className="h-5 w-5" />}
                    color="text-blue-700"
                  />
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <Button
                    variant="docdin"
                    className="flex items-center gap-2 text-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <UserPlusIcon className="h-5 w-5" />
                    Connect
                  </Button>
                  {session.data?.user?.email === userData?.email && (
                    <Button
                      variant="docdin"
                      className="flex items-center gap-2 text-lg shadow-md hover:shadow-lg transition-shadow duration-300">
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
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Recent Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Assuming you have a map function here for posts */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-medium text-lg text-gray-800 mb-2">
                Post Title
              </h3>
              <p className="text-gray-600 mb-2 text-sm">
                This is the content of the post. It can be a short description
                or the beginning of a longer post.
              </p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Posted 2 hours ago</span>
                <Button
                  variant="link"
                  className="text-blue-600 hover:text-blue-800 p-0 h-auto">
                  Read More
                </Button>
              </div>
            </div>
            {/* Repeat this structure for other posts */}
          </div>
        </CardContent>
      </Card>
      <Collapsible>
        <Card className="w-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
          <CollapsibleTrigger className="w-full">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardTitle className="flex justify-between items-center">
                <span className="text-xl font-bold">Academic Information</span>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-blue-600 rounded-full p-2 shadow-md transition-colors duration-200 hover:bg-blue-100">
                    <PencilIcon className="h-5 w-5" />
                  </motion.button>
                  <ChevronDownIcon className="h-6 w-6 transition-transform duration-200" />
                </div>
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="p-6 bg-gradient-to-b from-blue-50 to-white">
              <div className="space-y-4">
                <InfoItem
                  label="Degree"
                  value="Bachelor of Science in Computer Science"
                  icon={undefined}
                />
                <InfoItem
                  label="University"
                  value="Example University"
                  icon={undefined}
                />
                <InfoItem
                  label="Graduation Year"
                  value="2022"
                  icon={undefined}
                />
                <InfoItem label="GPA" value="3.8/4.0" icon={undefined} />
                <InfoItem
                  label="Relevant Coursework"
                  value="Data Structures, Algorithms, Web Development, Machine Learning"
                  icon={undefined}
                />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
      <Collapsible className="mt-6">
        <Card className="w-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
          <CollapsibleTrigger className="w-full">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
              <CardTitle className="flex justify-between items-center">
                <span className="text-xl font-bold">
                  Professional Information
                </span>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-green-600 rounded-full p-2 shadow-md transition-colors duration-200 hover:bg-green-100">
                    <PencilIcon className="h-5 w-5" />
                  </motion.button>
                  <ChevronDownIcon className="h-6 w-6 transition-transform duration-200" />
                </div>
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="p-6 bg-gradient-to-b from-green-50 to-white">
              <div className="space-y-4">
                <InfoItem
                  label="Current Position"
                  value="Software Engineer"
                  icon={undefined}
                />
                <InfoItem
                  label="Company"
                  value="Tech Innovations Inc."
                  icon={undefined}
                />
                <InfoItem
                  label="Years of Experience"
                  value="3"
                  icon={undefined}
                />
                <InfoItem
                  label="Skills"
                  value="React, Node.js, TypeScript, Python, AWS"
                  icon={undefined}
                />
                <InfoItem
                  label="Certifications"
                  value="AWS Certified Developer, Scrum Master"
                  icon={undefined}
                />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
};

export default ProfilePage;

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center space-x-3">
    <div className="text-blue-500 flex-shrink-0">{icon}</div>
    <div className="flex-1 min-w-0">
      <span className="font-semibold text-gray-700">{label}:</span>
      <span className="ml-1 text-gray-600 truncate">{value}</span>
    </div>
  </div>
);

const SocialLink = ({
  href,
  icon,
  color,
}: {
  href: string;
  icon: React.ReactNode;
  color: string;
}) => (
  <Link href={href}>
    <motion.div
      whileHover={{ y: -3 }}
      className={`${color} bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300`}>
      {icon}
    </motion.div>
  </Link>
);
