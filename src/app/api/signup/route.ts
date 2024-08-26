import db from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
export default async function POST(req: Request) {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with Email Already exists" },
        { status: 500 }
      );
    }
  } catch (e) {
    return NextResponse.json(
      { message: "error while signing up" },
      { status: 400 }
    );
  }
}
