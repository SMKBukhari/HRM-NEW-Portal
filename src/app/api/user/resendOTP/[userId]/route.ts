// import { db } from "@/lib/db";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { compileOTPMail, sendMail } from "@/lib/emails/mail";

export const PATCH = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  const { userId } = await params;

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 400 });
  }

  const user = await prisma.userProfile.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  // Generate new OTP
  const otpCode = crypto.randomInt(100000, 999999).toString();
  const otpCodeExpiry = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.userProfile.update({
    where: { userId: user.userId },
    data: { otpCode, otpCodeExpiry },
  });

  const emailBody = await compileOTPMail(user.fullName, otpCode);

  const response = await sendMail({
    to: user.email,
    subject: "Email Verification (The Truth International)",
    body: emailBody,
  });

  const sendNotification = await prisma.notifications.create({
    data: {
      userId: user.userId,
      title: "Email Verification code sent",
      message: "You have requested a new OTP code. Please check your email.",
      createdBy: "Account",
      isRead: false,
      type: "General",
    },
  });

  return NextResponse.json({
    message: "OTP sent successfully",
    response,
    sendNotification,
  });
};
