import Image from "next/image";
import prisma from "@/lib/db";
import JobListItem from "@/components/JobListItem";

export default async function Home() {
  const jobs = await prisma.jobs.findMany({
    where: {
      approved: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <div>Docdin</div>;
}
