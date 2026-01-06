import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// import { db } from "@/lib/db";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { SignUpSchema } from "@/schemas"; // Base schema import if possible, or re-define validation
import { NotificationCreator } from "@prisma/client";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    // Validate fields using Schema roughly or manually
    // Since we validated on frontend, we can do basic checks here
    const {
      email,
      password,
      fullName,
      contactNumber,
      gender,
      city,
      country,
      DOB,
    } = body;

    if (!email || !password || !fullName) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const existingUser = await prisma.userProfile.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new NextResponse("User already exists with this email", {
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.userProfile.create({
      data: {
        userId: uuidv4(),
        email,
        password: hashedPassword,
        fullName,
        contactNumber,
        gender,
        city,
        country,
        DOB: DOB ? new Date(DOB) : null,
        isVerified: false, // Default to false, require email verification ideally
        roleId: "user", // Default role, ensure this exists or handle role assignment logic
      },
    });

    // Optionally create a notification
    await prisma.notifications.create({
      data: {
        userId: newUser.userId,
        title: "Account Created",
        message: "Welcome to HRMS-TTI!",
        createdBy: NotificationCreator.Account,
        isRead: false,
        type: "General",
      },
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        userId: newUser.userId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(`REGISTER_ERROR: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
