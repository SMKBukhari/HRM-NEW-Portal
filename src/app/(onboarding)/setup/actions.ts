"use server";

import { geminiAI } from "@/lib/ai/gemini";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function parseResumeAction(formData: FormData) {
  try {
    const file = formData.get("resume") as File;
    if (!file) {
      return { success: false, error: "No file uploaded" };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = file.type;

    // Only parse, do not upload yet
    const parsedData = await geminiAI.parseResume(buffer, mimeType);

    return { success: true, data: { ...parsedData } };
  } catch (error) {
    console.error("Error parsing resume:", error);
    return { success: false, error: "Failed to parse resume" };
  }
}

export async function uploadResumeAction(formData: FormData) {
  try {
    const file = formData.get("resume") as File;
    if (!file) {
      return { success: false, error: "No file uploaded" };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { secure_url, public_id, original_filename } =
      await uploadToCloudinary(buffer, file.name);

    return {
      success: true,
      url: secure_url,
      publicId: public_id,
      name: original_filename,
    };
  } catch (error) {
    console.error("Error uploading resume:", error);
    return { success: false, error: "Failed to upload resume" };
  }
}
