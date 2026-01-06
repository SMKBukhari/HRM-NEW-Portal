"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import CustomFormField from "@/components/global/CustomFormField"; // Update path if needed
import { FormFieldType } from "@/lib/enums";

interface OTPInputProps {
  userId: string;
}

const formSchema = z.object({
  otpCode: z.string().min(6, { message: "OTP is required" }),
});

const OTPInput = ({ userId }: OTPInputProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otpCode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/user/verify/${userId}`, values);
      toast.success("OTP verified successfully");
      router.refresh();
      router.push("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          toast.error(error.response.data);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      setIsResendLoading(true);
      await axios.patch(`/api/user/resendOTP/${userId}`);
      toast.success(`OTP Sent successfully, Please check your email`);
      router.refresh();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          toast.error(error.response.data);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
    } finally {
      setIsResendLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center w-full max-w-md mx-auto'>
      <h1 className='text-5xl font-bold text-center'>Verify Your Account</h1>
      <p className='mt-2 text-muted-foreground font-base text-center'>
        Please enter the OTP code sent to your email.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mt-6 w-full space-y-6'
        >
          <div className='flex justify-center'>
            <CustomFormField
              fieldType={FormFieldType.OTP_INPUT}
              control={form.control}
              name='otpCode'
            />
          </div>

          <div className='flex gap-5 mt-10 w-full items-center justify-center'>
            <Button disabled={isLoading} type='submit' className='w-full'>
              {isLoading ? (
                <Loader2 className='animate-spin w-3 h-3' />
              ) : (
                "Verify Account"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <div className='flex justify-center w-full mt-2'>
        <Button
          variant={"link"}
          disabled={isResendLoading}
          onClick={resendOTP}
          className='hover:bg-transparent underline'
        >
          {isResendLoading ? (
            <Loader2 className='animate-spin w-3 h-3' />
          ) : (
            "Resend OTP"
          )}
        </Button>
      </div>
    </div>
  );
};

export default OTPInput;
