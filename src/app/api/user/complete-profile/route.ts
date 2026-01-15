import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const {
      userId,
      personalDetails,
      employmentDetails,
      education,
      jobExperience,
      skills,
      socialLinks,
      resumeUrl,
      resumeName,
      resumePublicId,
    } = body;

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    // Check if user exists
    const userExists = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!userExists) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Update User Profile with all details
    const updatedUser = await prisma.userProfile.update({
      where: { userId },
      data: {
        // Personal Details
        fullName: personalDetails.fullName,
        contactNumber: personalDetails.contactNumber,
        gender: personalDetails.gender,
        city: personalDetails.city,
        country: personalDetails.country,
        DOB: personalDetails.dob ? new Date(personalDetails.dob) : null,
        address: personalDetails.address,
        cnic: personalDetails.cnic,
        userImage: personalDetails.userImage, // Assuming userImage might be in personalDetails

        // Social Links
        linkedIn: socialLinks.linkedin,
        github: socialLinks.github,
        twitter: socialLinks.twitter,
        facebook: socialLinks.facebook,
        instagram: socialLinks.instagram,
        behance: socialLinks.behance,
        skype: socialLinks.skype,
        zoomId: socialLinks.zoomId,
        googleMeetId: socialLinks.googleMeetId,

        // Resume
        resumeUrl: resumeUrl,
        resumeName: resumeName,
        resumePublicId: resumePublicId,

        // Status
        isVerified: true, // Mark as verified/completed

        // Related Data: Delete existing and create new to ensure sync
        education: {
          deleteMany: {},
          create: education.map((edu: any) => ({
            university: edu.university,
            degree: edu.degree,
            fieldOfStudy: edu.fieldOfStudy,
            grade: edu.grade,
            startDate: edu.startDate ? new Date(edu.startDate) : null,
            endDate: edu.endDate ? new Date(edu.endDate) : null,
            currentlyStudying: edu.currentlyStudying,
            description: edu.description,
          })),
        },
        jobExperience: {
          deleteMany: {},
          create: jobExperience.map((exp: any) => ({
            jobTitle: exp.jobTitle,
            companyName: exp.companyName,
            employmentType: exp.employmentType,
            location: exp.location,
            startDate: exp.startDate ? new Date(exp.startDate) : null,
            endDate: exp.endDate ? new Date(exp.endDate) : null,
            currentlyWorking: exp.currentlyWorking,
            description: exp.description,
          })),
        },
        skills: {
          deleteMany: {},
          create: skills.map((skill: any) => ({
            name: skill.name,
            experienceLevel: "Intermediate",
          })),
        },
      },
    });

    console.log("Updated User:", updatedUser);

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("COMPLETE_PROFILE_ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
