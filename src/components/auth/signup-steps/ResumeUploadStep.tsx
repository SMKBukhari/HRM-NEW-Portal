"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2, ScanLine } from "lucide-react";
import { useSignUpStore } from "@/store/useSignUpStore";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const ResumeUploadStep = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setResumeFile, setStep, isAnalyzing, setIsAnalyzing, setFormData } =
    useSignUpStore();
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = async (file: File) => {
    if (
      file.type !== "application/pdf" &&
      !file.type.includes("word") &&
      !file.type.includes("document")
    ) {
      toast.error("Please upload a PDF or Word document.");
      return;
    }

    setResumeFile(file);
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/utils/parse-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();

      console.log(data);

      // Update store with parsed data
      setFormData({
        fullName: data.fullName || "",
        email: data.email || "",
        contactNumber: data.contactNumber || "",
        // Provide defaults or empty for others
        city: "",
        country: "",
      });

      toast.success("Resume analyzed successfully!");
      setStep(2);
    } catch (error) {
      console.error(error);
      toast.error("Failed to analyze resume. Please fill manually.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold tracking-tight'>Upload Resume</h2>
        <p className='text-muted-foreground text-sm mt-2'>
          We'll analyze your resume to auto-fill your details.
        </p>
      </div>

      <div className='relative'>
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='absolute inset-0 z-50 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl border border-primary/20'
            >
              <motion.div
                animate={{ y: [0, 50, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className='text-primary mb-4'
              >
                <ScanLine size={48} />
              </motion.div>
              <p className='text-primary font-medium animate-pulse'>
                Analyzing Resume...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleBrowseClick}
          className={cn(
            "border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 min-h-[250px] bg-gray-50/50 hover:bg-gray-50",
            isDragging ? "border-primary bg-primary/5" : "border-gray-200",
            isAnalyzing ? "opacity-50 pointer-events-none" : ""
          )}
        >
          <div className='bg-primary/10 p-4 rounded-full mb-4'>
            <Upload className='w-8 h-8 text-primary' />
          </div>
          <h3 className='font-semibold text-lg text-gray-900'>
            Click to upload or drag and drop
          </h3>
          <p className='text-gray-500 text-sm mt-1 text-center max-w-xs'>
            PDF, DOCX formats supported. Max size 5MB.
          </p>
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept='.pdf,.doc,.docx'
            className='hidden'
          />
        </div>
      </div>

      <div className='flex justify-center'>
        <Button
          variant='ghost'
          className='text-muted-foreground hover:text-primary'
          onClick={() => setStep(2)}
        >
          Skip and fill manually
        </Button>
      </div>
    </div>
  );
};
