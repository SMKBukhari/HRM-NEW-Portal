"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  FileText,
  CheckCircle,
  Loader2,
  Sparkles,
  ScanLine,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { parseResumeAction } from "../actions";
import { useSetupStore } from "@/store/useSetupStore";
import { useProgressSteps } from "@/components/global/progress-steps/ProgressStepsContext";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// --- Sub-Components for Visual Flair ---

const GridPattern = () => (
  <div className='absolute inset-0 z-0 opacity-[0.03] pointer-events-none'>
    <div className='h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]' />
  </div>
);

const GlowingOrb = () => (
  <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/80 rounded-full blur-[60px] pointer-events-none animate-pulse' />
);

// --- Holographic Scanner Animation ---

const HolographicScanner = () => {
  return (
    <div className='relative flex flex-col items-center justify-center w-full h-full md:min-h-[300px] rounded-2xl overflow-hidden'>
      <GridPattern />

      {/* Central HUD */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className='relative z-10 flex flex-col items-center'
      >
        <div className='relative md:w-48 w-32 md:h-64 h-36 border border-primary/30 bg-primary/5 rounded-lg backdrop-blur-sm overflow-hidden'>
          {/* Digital Noise / Glitch Effect Overlay */}
          <motion.div
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className='absolute inset-0 bg-noise opacity-10 mix-blend-overlay'
          />

          {/* Skeleton Lines */}
          <div className='p-4 space-y-3'>
            <motion.div
              animate={{ width: ["60%", "100%", "80%"] }}
              transition={{ duration: 2, repeat: Infinity }}
              className='h-2 bg-primary/40 rounded-sm'
            />
            <motion.div className='h-2 w-full bg-primary/20 rounded-sm' />
            <div className='space-y-2 pt-4'>
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className='h-1.5 w-full bg-primary/20 rounded-sm'
                />
              ))}
            </div>
          </div>

          {/* Scanning Laser */}
          <motion.div
            animate={{ top: ["0%", "120%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className='absolute left-0 right-0 h-1 bg-primary shadow-[0_0_20px_rgba(var(--primary),1)] z-20'
          >
            <div className='absolute right-0 top-1 text-[10px] font-mono text-primary font-bold px-1'>
              SCANNING
            </div>
          </motion.div>
        </div>

        {/* Text Status */}
        <div className='mt-6 flex flex-col items-center space-y-2'>
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className='flex items-center gap-2 text-primary font-mono text-sm tracking-widest uppercase'
          >
            <ScanLine className='w-4 h-4' />
            Parsing Data Nodes
          </motion.div>
          <p className='text-xs text-muted-foreground font-mono text-center'>
            Extracting professional entities...
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main Component ---

export const ResumeUpload = () => {
  const [isDragActive, setIsDragActive] = useState(false);
  const {
    setIsResumeUploading,
    isResumeUploading,
    setPersonalDetails,
    setEducation,
    setJobExperience,
    setResumeUrl,
    setResumeFile,
  } = useSetupStore();
  const { goNext } = useProgressSteps();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setIsResumeUploading(true);
      setResumeFile(file); // Store file for later upload
      const formData = new FormData();
      formData.append("resume", file);

      try {
        const result = await parseResumeAction(formData);

        if (result.success && result.data) {
          toast.success("Resume parsed successfully!");
          setPersonalDetails({
            fullName: result.data.fullName || "",
            // email: result.data.email || "", // Email is read-only from DB
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

          setTimeout(() => goNext(), 1000); // Move to next step
        } else {
          toast.error("Parsing Failed: Please enter details manually.", {
            icon: <AlertCircle className='text-red-500' />,
          });
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='relative group rounded-2xl p-px overflow-hidden'
      >
        {/* Main Content Area */}
        <div
          {...getRootProps()}
          className={cn(
            "relative bg-background/80 backdrop-blur-xl rounded-2xl md:min-h-[450px] flex flex-col items-center justify-center border border-muted-foreground/30 transition-all duration-300",
            isDragActive ? "scale-[1.01] border-primary/50 bg-primary/5" : "",
            isResumeUploading
              ? "cursor-default"
              : "cursor-pointer hover:bg-muted/5"
          )}
        >
          <input {...getInputProps()} />
          <GridPattern />

          <AnimatePresence mode='wait'>
            {isResumeUploading ? (
              <motion.div
                key='scanning'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='w-full h-full flex items-center justify-center p-8'
              >
                <HolographicScanner />
              </motion.div>
            ) : (
              <motion.div
                key='upload-idle'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='relative z-10 flex flex-col items-center text-center p-10 space-y-8'
              >
                {/* Floating Icon */}
                <div className='relative'>
                  <GlowingOrb />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className='relative md:w-20 w-16 md:h-20 h-16 bg-linear-to-br from-background to-muted rounded-xl border border-primary/10 shadow-xl flex items-center justify-center group-hover:shadow-primary/20 transition-all duration-500'
                  >
                    <Upload className='md:w-10 w-8 md:h-10 h-8 text-primary group-hover:-translate-y-1 transition-transform duration-500' />
                  </motion.div>

                  {/* Decorative orbital dots */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className='absolute inset-0 rounded-full border border-dashed border-primary/20 scale-150'
                  />
                </div>

                <div className='space-y-3 max-w-md'>
                  <h3 className='md:text-3xl text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground via-foreground/80 to-primary'>
                    Upload Resume
                  </h3>
                  <p className='text-muted-foreground md:text-sm text-xs leading-relaxed'>
                    Drop your{" "}
                    <span className='text-primary font-medium'>PDF</span> or{" "}
                    <span className='text-primary font-medium'>Image</span>{" "}
                    here.
                    <br />
                    Our AI will analyze and extract your profile.
                  </p>
                </div>

                {/* Tech Pills */}
                <div className='flex gap-3'>
                  <div className='px-2 py-1 rounded-full bg-primary/10 border border-primary/20 flex items-center gap-2 text-xs font-mono text-primary'>
                    <FileText className='w-3 h-3' />
                    <span>PDF_DOC</span>
                  </div>
                  <div className='px-2 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center gap-2 text-xs font-mono text-purple-500'>
                    <Sparkles className='w-3 h-3' />
                    <span>AI_PARSE</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Manual Entry Option */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='mt-6 text-center'
      >
        <Button
          variant='ghosted'
          onClick={(e) => {
            e.stopPropagation();
            if (!isResumeUploading) goNext();
          }}
          disabled={isResumeUploading}
          className='text-primary font-mono text-[11px] tracking-wider uppercase opacity-70 hover:opacity-100 hover:bg-transparent'
        >
          [ Skip, Manually Enter Details ]
        </Button>
      </motion.div>
    </div>
  );
};
