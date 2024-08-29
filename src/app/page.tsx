"use client";
import Image from "next/image";
import prisma from "@/lib/db";
import JobListItem from "@/components/jobspage/JobListItem";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      router.push("/api/auth/signin");
    } else {
      setIsLoading(false);
    }
  }, [session, status, router]);
  return <div>Docdin</div>;
}
