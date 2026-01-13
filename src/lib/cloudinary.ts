import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (
  fileBuffer: Buffer,
  fileName: string,
  folder: string = "resumes"
): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: folder,
          public_id: fileName.replace(/\.[^/.]+$/, ""), // Remove extension
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          if (result) {
            resolve(result.secure_url);
          } else {
            reject(new Error("Upload failed: No result returned"));
          }
        }
      )
      .end(fileBuffer);
  });
};
