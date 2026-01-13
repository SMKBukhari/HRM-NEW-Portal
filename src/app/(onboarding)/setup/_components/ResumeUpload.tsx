"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, CheckCircle, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { parseResumeAction } from "../actions";
import { useSetupStore } from "@/store/useSetupStore";
import { useProgressSteps } from "@/components/global/progress-steps/ProgressStepsContext";

export const ResumeUpload = () => {
  const [isDragActive, setIsDragActive] = useState(false);
  const {
    setIsResumeUploading,
    isResumeUploading,
    setPersonalDetails,
    setEducation,
    setJobExperience,
    setResumeUrl,
  } = useSetupStore();
  const { goNext } = useProgressSteps();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setIsResumeUploading(true);
      const formData = new FormData();
      formData.append("resume", file);

      try {
        const result = await parseResumeAction(formData);

        if (result.success && result.data) {
          toast.success("Resume parsed successfully!");
          setPersonalDetails({
            fullName: result.data.fullName || "",
            email: result.data.email || "",
            contactNumber: result.data.contactNumber || "",
            gender: result.data.gender || "",
            city: result.data.city || "",
            country: result.data.country || "",
            dob: result.data.DOB || "",
          });

          // Set Education
          if (result.data.education && Array.isArray(result.data.education)) {
            setEducation(
              result.data.education.map((edu: any) => ({
                id: crypto.randomUUID(),
                university: edu.university || "",
                degree: edu.degree || "",
                fieldOfStudy: edu.fieldOfStudy || "",
                startDate: edu.startDate || "",
                endDate: edu.endDate || "",
                grade: edu.grade || "",
              }))
            );
          }

          // Set Experience
          if (
            result.data.jobExperience &&
            Array.isArray(result.data.jobExperience)
          ) {
            setJobExperience(
              result.data.jobExperience.map((exp: any) => ({
                id: crypto.randomUUID(),
                jobTitle: exp.jobTitle || "",
                companyName: exp.companyName || "",
                employmentType: exp.employmentType || "",
                location: exp.location || "",
                startDate: exp.startDate || "",
                endDate: exp.endDate || "",
                currentlyWorking: exp.currentlyWorking || false,
                description: exp.description || "",
              }))
            );
          }

          // Set Resume URL
          if (result.data.resumeUrl) {
            setResumeUrl(result.data.resumeUrl);
          }

          goNext(); // Move to next step
        } else {
          toast.error("Failed to parse resume. Please fill details manually.");
          goNext(); // Move to next step even if failed, to let user fill manually
        }
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Something went wrong during upload.");
      } finally {
        setIsResumeUploading(false);
      }
    },
    [setIsResumeUploading, setPersonalDetails, goNext]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  return (
    <div
      className={`w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 ${
        isResumeUploading ? "cursor-not-allowed" : ""
      }`}
    >
      <div
        {...getRootProps()}
        className={`
          relative group cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed transition-all duration-500
          ${
            isDragActive
              ? "border-primary bg-primary/5 scale-[1.02]"
              : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/50"
          }
        `}
      >
        <input {...getInputProps()} />

        {/* Animated Background Gradient */}
        <div className='absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

        <div
          className={`relative p-12 flex flex-col items-center justify-center text-center space-y-6 ${
            isResumeUploading ? "cursor-not-allowed" : ""
          }`}
        >
          {/* Icon Container */}
          <div className='relative'>
            <div className='absolute -inset-4 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
            <div className='relative h-20 w-20 bg-background rounded-2xl shadow-2xl flex items-center justify-center border border-border group-hover:scale-110 transition-transform duration-500'>
              {isResumeUploading ? (
                <Loader2 className='h-10 w-10 text-primary animate-spin' />
              ) : (
                <Upload className='h-10 w-10 text-primary group-hover:-translate-y-1 transition-transform duration-500' />
              )}
            </div>
          </div>

          {/* Text Content */}
          <div className='space-y-2'>
            <h3 className='text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70'>
              {isResumeUploading ? "Analyzing Resume..." : "Upload Your Resume"}
            </h3>
            <p className='text-muted-foreground max-w-sm mx-auto'>
              {isResumeUploading
                ? "Our AI is extracting your details to auto-fill the form."
                : "Drag & drop your resume here, or click to select. We'll auto-fill your details."}
            </p>
          </div>

          {/* File Types */}
          {!isResumeUploading && (
            <div
              className={`flex items-center gap-4 text-xs text-muted-foreground font-medium ${
                isResumeUploading ? "cursor-not-allowed" : ""
              }`}
            >
              <span className='flex items-center gap-1 bg-muted px-3 py-1 rounded-full'>
                <FileText className='h-3 w-3' /> PDF
              </span>
              <span className='flex items-center gap-1 bg-muted px-3 py-1 rounded-full'>
                <Sparkles className='h-3 w-3' /> PNG/JPG
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Skip Button */}
      <div className='mt-8 text-center'>
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className='text-sm text-muted-foreground hover:text-foreground transition-colors underline decoration-dotted underline-offset-4'
        >
          Skip and manually enter details
        </button>
      </div>
    </div>
  );
};
