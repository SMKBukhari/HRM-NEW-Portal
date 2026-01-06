"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Updated data with HRM features instead of testimonials
const features = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop", // Team meeting / Management
    title: "Employee Management",
    description:
      "Centralize your workforce data. Track attendance, leaves, and performance reviews in one unified dashboard.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop", // Interview / Recruitment
    title: "Smart Recruitment",
    description:
      "Streamline your hiring pipeline. Manage job postings, candidates, and interviews from application to onboarding.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop", // Analytics / Data
    title: "Payroll & Analytics",
    description:
      "Automated payroll processing with deep insights into workforce costs, trends, and productivity metrics.",
  },
];

interface TestimonialSliderProps {
  className?: string; // Add className prop
}

export const TestimonialSlider = ({ className }: TestimonialSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={cn(
        "relative bg-gray-900 text-white flex flex-col justify-end p-6 md:p-16 overflow-hidden rounded-lg",
        className
      )}
    >
      {/* Background Image Slider */}
      <AnimatePresence>
        <motion.div
          key={features[currentSlide].image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className='absolute inset-0 z-0'
        >
          <Image
            src={features[currentSlide].image}
            alt={features[currentSlide].title}
            fill
            className='object-cover opacity-60 mix-blend-overlay'
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10' />

      {/* Content */}
      <div className='relative z-10 space-y-6'>
        {/* Title & Description Animation */}
        <motion.div
          key={features[currentSlide].title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-3xl font-bold mb-4 tracking-tight'>
            {features[currentSlide].title}
          </h2>
          <p className='text-lg text-gray-200 leading-relaxed font-light min-h-[80px]'>
            {features[currentSlide].description}
          </p>
        </motion.div>

        {/* Progress Dots */}
        <div className='flex items-center justify-between pt-4'>
          <div className='flex gap-2 z-20'>
            {features.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  currentSlide === index
                    ? "w-8 bg-blue-500" // Changed active color to blue to match your login button
                    : "w-1.5 bg-white/30 hover:bg-white/50"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
