// import { db } from "@/lib/db";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { compileOTPMail, sendMail } from "@/lib/emails/mail";
import Cookies from "js-cookie";

export const POST = async (req: Request) => {
  try {
    const { fullName, email, password } = await req.json();

    if (!fullName || !email || !password) {
      return new NextResponse("All fields are required", { status: 400 });
    }

    const userExist = await prisma.userProfile.findFirst({
      where: {
        email,
      },
    });

    if (userExist) {
      return new NextResponse(
        "User/Email already exist! Please use your email and password to login",
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otpCode = crypto.randomInt(100000, 999999).toString();
    const otpCodeExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const userRole = await prisma.role.findFirst({
      where: {
        name: "User",
      },
    });

    if (!userRole) {
      return new NextResponse("User Role not found", { status: 500 });
    }

    const company = await prisma.company.findFirst({});

    const user = await prisma.userProfile.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        otpCode,
        otpCodeExpiry,
        isVerified: false,
        role: {
          connect: {
            id: userRole.id,
          },
        },
        company: {
          connect: {
            id: company?.id,
          },
        },
      },
    });

    const emailBody = await compileOTPMail(fullName, otpCode);

    const response = await sendMail({
      to: email,
      subject: "Email Verification (The Truth International)",
      body: emailBody,
    });

    await prisma.notifications.create({
      data: {
        userId: user.userId,
        title: "Account Created",
        message: "Your account has been successfully created",
        createdBy: "Account",
        isRead: false,
        type: "General",
      },
    });

    Cookies.set("userId", user.userId, {
      expires: 1,
    });

    return NextResponse.json({ user, response }, { status: 201 });
  } catch (error) {
    console.error(`SINGUP_ERROR: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
