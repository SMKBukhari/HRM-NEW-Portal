"use server";

import { geminiAI } from "@/lib/ai/gemini";
// import { uploadToCloudinary } from "@/lib/cloudinary";

export async function parseResumeAction(formData: FormData) {
  try {
    const file = formData.get("resume") as File;
    if (!file) {
      return { success: false, error: "No file uploaded" };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = file.type;

    // Parallelize upload and parsing for speed
    const [parsedData] = await Promise.all([
      geminiAI.parseResume(buffer, mimeType),
      //   uploadToCloudinary(buffer, file.name),
    ]);

    return { success: true, data: { ...parsedData } };
  } catch (error) {
    console.error("Error parsing resume:", error);
    return { success: false, error: "Failed to parse resume" };
  }
}
