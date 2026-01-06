// import { db } from "@/lib/db";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    const userProfile = await prisma.userProfile.findFirst({
      where: { userId },
    });

    if (!userProfile) {
      return new NextResponse("User not found", { status: 404 });
    }

    const checkAllNotifications = await prisma.notifications.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return NextResponse.json({
      message: "Notifications updated successfully.",
      updatedCount: checkAllNotifications.count,
    });
  } catch (error) {
    console.error(`CHECK_ALL_NOTIFICATIONS_ERROR: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
