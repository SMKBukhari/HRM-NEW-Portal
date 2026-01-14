import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Education {
  id: string;
  university: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade: string;
}

export interface JobExperience {
  id: string;
  jobTitle: string;
  companyName: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

export interface PersonalDetails {
  fullName: string;
  email: string;
  contactNumber: string;
  gender: string;
  city: string;
  country: string;
  dob: Date | undefined;
  address: string;
  cnic: string;
}

export interface EmploymentDetails {
  department: string;
  designation: string;
  doj: string;
  salary: string;
  contractStartDate: string;
  contractEndDate: string;
  contractDuration: string;
  officeTimingIn: string;
  officeTimingOut: string;
}

export interface BenefitsDetails {
  totalYearlyLeaves: string;
  totalMonthlyLeaves: string;
  bankName: string;
  accountTitle: string;
  accountNumber: string;
  iban: string;
}

interface SetupState {
  step: number;
  personalDetails: PersonalDetails;
  employmentDetails: EmploymentDetails;
  benefitsDetails: BenefitsDetails;
  education: Education[];
  jobExperience: JobExperience[];
  resumeUrl: string;
  isResumeUploading: boolean;

  setStep: (step: number) => void;
  setPersonalDetails: (details: Partial<PersonalDetails>) => void;
  setEmploymentDetails: (details: Partial<EmploymentDetails>) => void;
  setBenefitsDetails: (details: Partial<BenefitsDetails>) => void;
  setEducation: (education: Education[]) => void;
  setJobExperience: (experience: JobExperience[]) => void;
  setResumeUrl: (url: string) => void;
  setIsResumeUploading: (isUploading: boolean) => void;
  resetStore: () => void;
}

export const useSetupStore = create<SetupState>()(
  persist(
    (set) => ({
      step: 0,
      personalDetails: {
        fullName: "",
        email: "",
        contactNumber: "",
        gender: "",
        city: "",
        country: "",
        dob: undefined,
        address: "",
        cnic: "",
      },
      employmentDetails: {
        department: "",
        designation: "",
        doj: "",
        salary: "",
        contractStartDate: "",
        contractEndDate: "",
        contractDuration: "",
        officeTimingIn: "",
        officeTimingOut: "",
      },
      benefitsDetails: {
        totalYearlyLeaves: "36",
        totalMonthlyLeaves: "3",
        bankName: "",
        accountTitle: "",
        accountNumber: "",
        iban: "",
      },
      education: [],
      jobExperience: [],
      resumeUrl: "",
      isResumeUploading: false,

      setStep: (step) => set({ step }),
      setPersonalDetails: (details) =>
        set((state) => ({
          personalDetails: { ...state.personalDetails, ...details },
        })),
      setEmploymentDetails: (details) =>
        set((state) => ({
          employmentDetails: { ...state.employmentDetails, ...details },
        })),
      setBenefitsDetails: (details) =>
        set((state) => ({
          benefitsDetails: { ...state.benefitsDetails, ...details },
        })),
      setEducation: (education) => set({ education }),
      setJobExperience: (jobExperience) => set({ jobExperience }),
      setResumeUrl: (resumeUrl) => set({ resumeUrl }),
      setIsResumeUploading: (isUploading) =>
        set({ isResumeUploading: isUploading }),
      resetStore: () =>
        set({
          step: 0,
          personalDetails: {
            fullName: "",
            email: "",
            contactNumber: "",
            gender: "",
            city: "",
            country: "",
            dob: undefined,
            address: "",
            cnic: "",
          },
          employmentDetails: {
            department: "",
            designation: "",
            doj: "",
            salary: "",
            contractStartDate: "",
            contractEndDate: "",
            contractDuration: "",
            officeTimingIn: "",
            officeTimingOut: "",
          },
          benefitsDetails: {
            totalYearlyLeaves: "36",
            totalMonthlyLeaves: "3",
            bankName: "",
            accountTitle: "",
            accountNumber: "",
            iban: "",
          },
          education: [],
          jobExperience: [],
          resumeUrl: "",
          isResumeUploading: false,
        }),
    }),
    {
      name: "setup-storage",
      partialize: (state) => ({
        step: state.step,
        personalDetails: state.personalDetails,
        employmentDetails: state.employmentDetails,
        benefitsDetails: state.benefitsDetails,
        education: state.education,
        jobExperience: state.jobExperience,
        resumeUrl: state.resumeUrl,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const dob = state.personalDetails?.dob as any;
        if (dob && typeof dob === "string") {
          state.personalDetails.dob = new Date(dob);
        }
      },
    }
  )
);
