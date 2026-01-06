"use client";
import React, { useState } from "react";
import { useSignUpStore } from "@/store/useSignUpStore";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SignUpFormData } from "@/store/useSignUpStore";

export const ReviewStep = () => {
  const { formData, setStep, resetStore } = useSignUpStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    // Validate required fields crudely or trust previous steps + schema
    if (!formData.email || !formData.password || !formData.fullName) {
      toast.error("Missing required fields. Please go back and fill them.");
      return;
    }

    try {
      setIsLoading(true);
      // Ensure date is string or Date as expected by API. Zod schema expects Date object for DOB, verify API handling.
      // Usually API expects everything as JSON.
      const payload = { ...formData };

      const response = await axios.post("/api/user/register", payload); // Assuming this route, or verify with user

      if (response.status === 200 || response.status === 201) {
        toast.success("Account created successfully!");
        resetStore();
        router.push("/signIn");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data || "Registration failed");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const ReviewItem = ({
    label,
    value,
  }: {
    label: string;
    value: string | undefined;
  }) => (
    <div className='flex justify-between items-center py-2 border-b border-gray-100 last:border-0'>
      <span className='text-sm text-gray-500 font-medium'>{label}</span>
      <span className='text-sm text-gray-900 font-semibold text-right'>
        {value || "-"}
      </span>
    </div>
  );

  return (
    <div className='space-y-8'>
      <div className='text-center space-y-2'>
        <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
          <CheckCircle2 className='w-8 h-8 text-green-600' />
        </div>
        <h2 className='text-2xl font-bold tracking-tight'>
          Review your details
        </h2>
        <p className='text-muted-foreground text-sm'>
          Please verify your information before creating your account.
        </p>
      </div>

      <div className='bg-gray-50 p-6 rounded-xl space-y-6'>
        <div>
          <h3 className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-2'>
            Personal Information
          </h3>
          <div className='bg-white rounded-lg p-4 shadow-sm border border-gray-100'>
            <ReviewItem label='Full Name' value={formData.fullName} />
            <ReviewItem label='Phone' value={formData.contactNumber} />
            <ReviewItem label='Gender' value={formData.gender} />
            <ReviewItem
              label='Date of Birth'
              value={formData.DOB?.toLocaleDateString()}
            />
            <ReviewItem label='City' value={formData.city} />
            <ReviewItem label='Country' value={formData.country} />
          </div>
        </div>

        <div>
          <h3 className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-2'>
            Account Information
          </h3>
          <div className='bg-white rounded-lg p-4 shadow-sm border border-gray-100'>
            <ReviewItem label='Email' value={formData.email} />
            <ReviewItem label='Password' value='••••••••' />
          </div>
        </div>
      </div>

      <div className='flex justify-between pt-4'>
        <Button
          type='button'
          variant='outline'
          onClick={() => setStep(3)}
          className='flex items-center gap-2'
          disabled={isLoading}
        >
          <ArrowLeft className='w-4 h-4' /> Back
        </Button>
        <Button
          onClick={handleSubmit}
          className='flex items-center gap-2 w-32 justify-center'
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className='w-4 h-4 animate-spin' />
          ) : (
            "Create Account"
          )}
        </Button>
      </div>
    </div>
  );
};
