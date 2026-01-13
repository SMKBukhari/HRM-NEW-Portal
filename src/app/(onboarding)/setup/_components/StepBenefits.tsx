"use client";

import React from "react";
import { useSetupStore } from "@/store/useSetupStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useProgressSteps } from "@/components/global/progress-steps/ProgressStepsContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const StepBenefits = () => {
  const { benefitsDetails, setBenefitsDetails, resetStore } = useSetupStore();
  const { goPrev } = useProgressSteps();
  const router = useRouter();

  const handleChange = (field: string, value: string) => {
    setBenefitsDetails({ [field]: value });
  };

  const handleSubmit = async () => {
    // Here you would typically make an API call to save all data
    // For now we'll simulate a success and redirect
    try {
      // await saveOnboardingData(store.getState());
      toast.success("Profile setup completed successfully!");
      resetStore();
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to save profile.");
    }
  };

  return (
    <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-2'>
          <Label htmlFor='totalYearlyLeaves'>Total Yearly Leaves</Label>
          <Input
            id='totalYearlyLeaves'
            type='number'
            value={benefitsDetails.totalYearlyLeaves}
            onChange={(e) => handleChange("totalYearlyLeaves", e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='totalMonthlyLeaves'>Total Monthly Leaves</Label>
          <Input
            id='totalMonthlyLeaves'
            type='number'
            value={benefitsDetails.totalMonthlyLeaves}
            onChange={(e) => handleChange("totalMonthlyLeaves", e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='bankName'>Bank Name</Label>
          <Input
            id='bankName'
            placeholder='Bank of America'
            value={benefitsDetails.bankName}
            onChange={(e) => handleChange("bankName", e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='accountTitle'>Account Title</Label>
          <Input
            id='accountTitle'
            placeholder='John Doe'
            value={benefitsDetails.accountTitle}
            onChange={(e) => handleChange("accountTitle", e.target.value)}
          />
        </div>

        <div className='space-y-2 md:col-span-2'>
          <Label htmlFor='accountNumber'>Account Number</Label>
          <Input
            id='accountNumber'
            placeholder='1234567890'
            value={benefitsDetails.accountNumber}
            onChange={(e) => handleChange("accountNumber", e.target.value)}
          />
        </div>

        <div className='space-y-2 md:col-span-2'>
          <Label htmlFor='iban'>IBAN</Label>
          <Input
            id='iban'
            placeholder='US12 3456 7890 1234 5678'
            value={benefitsDetails.iban}
            onChange={(e) => handleChange("iban", e.target.value)}
          />
        </div>
      </div>

      <div className='flex justify-between pt-4'>
        <Button variant='outline' onClick={goPrev} size='lg'>
          Previous
        </Button>
        <Button
          onClick={handleSubmit}
          size='lg'
          className='bg-green-600 hover:bg-green-700'
        >
          Complete Setup
        </Button>
      </div>
    </div>
  );
};

export default StepBenefits;
