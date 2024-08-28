"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

const AvatarDropdown = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [userid, setUserId] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const session = useSession();
  if (!session) {
    router.push("/signin");
  }
  const userId = session.data?.user?.name;
  console.log(userId);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await axios.get("/api/getProfilePic");
        setName(res.data.name);
        setProfilePic(res.data.profilePic);
        setUserId(res.data.id);
      } catch (e) {
        console.error("There was an error fetching the profile pic", e);
      }
    };

    fetchProfileData();
  }, []);
  return (
    <div className="pr-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src={profilePic} alt={name} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={`/profile/${userid}`}>
            <DropdownMenuItem className="hover:bg-slate-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            className="text-red-700 font-bold hover:bg-red-200"
            onClick={async () => {
              await signOut({ redirect: false });
              router.push("/signin");
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AvatarDropdown;
