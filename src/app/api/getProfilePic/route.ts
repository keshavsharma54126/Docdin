import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    //@ts-ignore
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    console.log("still  working");

    const user = await prisma.user.findUnique({
      where: {
        //@ts-ignore
        email: session.user.email,
      },
      select: {
        imageUrl: true,
        fullName: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log(user.fullName);

    return NextResponse.json({
      profilePic: user.imageUrl,
      name: user.fullName,
    });
  } catch (error) {
    console.error("Error while fetching user data:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching user data" },
      { status: 500 }
    );
  }
}
