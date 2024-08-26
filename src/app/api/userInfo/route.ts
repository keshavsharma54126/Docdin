import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (user) {
      return NextResponse.json({ user }, { status: 200 });
    }
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
