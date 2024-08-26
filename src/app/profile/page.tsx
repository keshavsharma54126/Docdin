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
}

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
                <InfoItem
                  icon="🏠"
                  label="Location"
                  value={userData?.address}
                />
                <InfoItem icon="📞" label="Phone" value={userData?.phone} />
                <InfoItem icon="📧" label="Email" value={userData?.email} />
                <InfoItem icon="💼" label="Experience" value="1 Year" />
                <InfoItem icon="💰" label="Salary" value="₹ 4,00,000" />
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

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value?: string | null;
}) => (
  <div className="flex items-center gap-2">
    <span>{icon}</span>
    <span className="font-semibold">{label}:</span> {value || "N/A"}
  </div>
);

export default ProfilePage;
