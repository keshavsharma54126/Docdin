"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Network = () => {
  const { data: session, status } = useSession();
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      router.push("/api/auth/signin");
    } else {
      setIsLoadingSession(false);
    }
  }, [session, status, router]);
  if (isLoadingSession) {
    return <div>loading....</div>;
  }
  return <div>Network page</div>;
};

export default Network;
