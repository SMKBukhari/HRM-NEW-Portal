"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { id: 1, label: "Resume" },
  { id: 2, label: "Personal" },
  { id: 3, label: "Account" },
  { id: 4, label: "Review" },
];

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  return (
    <div className='w-full mb-8'>
      <div className='flex items-center justify-between relative'>
        {/* Progress Bar Background */}
        <div className='absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 w-full rounded-full -z-10' />

        {/* Active Progress Bar */}
        <motion.div
          className='absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full -z-10'
          initial={{ width: "0%" }}
          animate={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div
              key={step.id}
              className='flex flex-col items-center gap-2 bg-white px-2'
            >
              <motion.div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300",
                  isActive
                    ? "border-primary bg-primary text-white"
                    : isCompleted
                    ? "border-primary bg-primary text-white"
                    : "border-gray-200 text-gray-400 bg-white"
                )}
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  transition: { duration: 0.2 },
                }}
              >
                {isCompleted ? (
                  <Check size={16} />
                ) : (
                  <span className='text-xs font-bold'>{step.id}</span>
                )}
              </motion.div>
              <span
                className={cn(
                  "text-xs font-medium transition-colors duration-300 hidden md:block",
                  isActive || isCompleted
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
