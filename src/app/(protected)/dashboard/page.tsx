// import { db } from "@/lib/db";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { format } from "date-fns";

const page = async () => {
  const cookieStore = cookies();
  const userId = (await cookieStore).get("userId")?.value;

  if (!userId) {
    redirect("/signIn");
  }

  const user = await prisma.userProfile.findUnique({
    where: {
      userId: userId,
    },
    include: {
      education: true,
      jobExperience: true,
      applicationStatus: true,
      skills: true,
      role: true,
      JobApplications: true,
      company: true,
    },
  });

  const jobApplications = await prisma.jobApplications.findMany({
    where: {
      id: user?.currentJobApplicationId || "",
    },
  });

  const jobs = await prisma.job.findMany({
    where: {
      isPusblished: true,
    },
  });
  const departments = await prisma.department.findMany();

  if (user?.isVerified === false) {
    redirect(`/verify/${userId}`);
  }

  const requiredFieldsForApply = [
    user?.fullName,
    user?.email,
    user?.contactNumber,
    user?.city,
    user?.country,
    user?.jobExperience?.length,
    user?.education?.length,
    user?.resumeUrl,
  ];

  const userRole = user?.role?.name === "User";
  const applicantRole =
    user?.role?.name === "Applicant" &&
    user?.applicationStatus?.name !== "Rejected";
  const intervieweeRole = user?.role?.name === "Interviewee";

  const totalFields = requiredFieldsForApply.length;
  const completedFields = requiredFieldsForApply.filter(Boolean).length;
  const isComplete = requiredFieldsForApply.every(Boolean);

  if (!isComplete) {
    redirect("/setup");
  }

  const interviewDateTime = jobApplications[0]?.interviewDate;
  const formattedDate = interviewDateTime
    ? format(new Date(interviewDateTime), "MMMM do, yyyy")
    : null;

  const formattedTime = interviewDateTime
    ? format(new Date(interviewDateTime), "h:mm a")
    : null;

  const isRejected = user?.applicationStatus?.name === "Rejected";
  const isOffered = user?.applicationStatus?.name === "Offered";
  const isHired = user?.applicationStatus?.name === "Hired";

  const isInterviewed = user?.JobApplications[0]?.isInterviewed === true;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{user?.fullName}</p>
      <p>{user?.email}</p>
      <p>{user?.contactNumber}</p>
      <p>{user?.city}</p>
      <p>{user?.country}</p>
      <p>{user?.education.length}</p>
      <p>{user?.resumeUrl}</p>
      <p>{user?.role?.name}</p>
      <p>{user?.applicationStatus?.name}</p>
    </div>
  );
};

export default page;
