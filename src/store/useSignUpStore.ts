import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SignUpSchema } from "@/schemas";
import * as z from "zod";

export type SignUpFormData = z.infer<typeof SignUpSchema>;

interface SignUpState {
  step: number;
  formData: Partial<SignUpFormData>;
  resumeFile: File | null;
  isAnalyzing: boolean;
  setStep: (step: number) => void;
  setFormData: (data: Partial<SignUpFormData>) => void;
  setResumeFile: (file: File | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  resetStore: () => void;
}

export const useSignUpStore = create<SignUpState>()(
  persist(
    (set) => ({
      step: 1,
      formData: {},
      resumeFile: null,
      isAnalyzing: false,
      setStep: (step) => set({ step }),
      setFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),
      setResumeFile: (file) => set({ resumeFile: file }),
      setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
      resetStore: () =>
        set({ step: 1, formData: {}, resumeFile: null, isAnalyzing: false }),
    }),
    {
      name: "signup-storage",
      partialize: (state) => ({ step: state.step, formData: state.formData }), // Don't persist File object
    }
  )
);
