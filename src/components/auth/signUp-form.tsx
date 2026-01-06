"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Lock, Loader2, User, Check, X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Optional: for smooth fade in/out

import { SignUpSchema } from "@/schemas";
import { Form } from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CustomFormField from "../global/CustomFormField";
import { FormFieldType } from "@/lib/enums";
import { cn } from "@/lib/utils";

// 1. Define Password Requirements
const passwordRequirements = [
  { label: "At least 8 characters", test: (pass: string) => pass.length >= 8 },
  {
    label: "Contains lowercase letter",
    test: (pass: string) => /[a-z]/.test(pass),
  },
  {
    label: "Contains uppercase letter",
    test: (pass: string) => /[A-Z]/.test(pass),
  },
  { label: "Contains a number", test: (pass: string) => /\d/.test(pass) },
  {
    label: "Contains special character",
    test: (pass: string) => /[^A-Za-z0-9]/.test(pass),
  },
];

const SignUpForm = ({ redirectTo }: { redirectTo?: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false); // State for dropdown visibility
  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const passwordValue = form.watch("password");

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    try {
      setIsLoading(true);
      const payload = { ...values, rememberMe: false };
      const response = await axios.post("/api/user/signIn", payload);

      if (response.data.loginSessionToken) {
        Cookies.set("sessionToken", response.data.loginSessionToken, {
          expires: 1,
        });
        Cookies.set("userId", response.data.userId, { expires: 7 });
        toast.success("Account created successfully!");
        router.push(redirectTo || "/dashboard");
      }
    } catch (error: any) {
      toast.error(error.response?.data || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardWrapper
      headerText='Create your account'
      headerLabel='Please enter your details to get started'
      backButtonLabel='Sign in'
      backButtonHref='/signIn'
      createAccount
      spanLabel='Already have an account?'
      className='p-0'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          <div className='space-y-4'>
            <CustomFormField
              control={form.control}
              name='fullName'
              label='Full Name'
              isRequired
              placeholder='John Doe'
              fieldType={FormFieldType.INPUT}
              icon={User}
            />
            <CustomFormField
              control={form.control}
              name='email'
              label='Email address'
              isRequired
              placeholder='john.doe@example.com'
              fieldType={FormFieldType.INPUT}
              icon={Mail}
            />

            {/* WRAPPER FOR PASSWORD FIELD + DROPDOWN */}
            <div
              className='relative'
              onFocus={() => setShowPasswordRules(true)}
              onBlur={() => setShowPasswordRules(false)}
            >
              <CustomFormField
                control={form.control}
                name='password'
                label='Password'
                isRequired
                placeholder='Enter password'
                fieldType={FormFieldType.PASSWORD_INPUT}
                icon={Lock}
              />

              {/* Password Strength Indicator - Absolute Dropdown */}
              <AnimatePresence>
                {showPasswordRules && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className='absolute top-full left-0 right-0 z-50 mt-2 bg-popover border shadow-lg p-4 rounded-lg space-y-2'
                  >
                    <p className='text-xs font-semibold text-primary mb-2 flex items-center gap-2'>
                      <AlertCircle className='w-3 h-3' />
                      Password Requirements
                    </p>
                    <div className='grid grid-cols-1 gap-2'>
                      {passwordRequirements.map((req, index) => {
                        const isMet = req.test(passwordValue || "");
                        return (
                          <div
                            key={index}
                            className={cn(
                              "flex items-center gap-2 text-xs transition-colors duration-200",
                              isMet
                                ? "text-green-600 font-medium"
                                : "text-muted-foreground/60"
                            )}
                          >
                            <div
                              className={cn(
                                "flex items-center justify-center w-4 h-4 rounded-full border",
                                isMet
                                  ? "bg-green-100 border-green-600"
                                  : "bg-transparent border-muted-foreground/30"
                              )}
                            >
                              {isMet ? (
                                <Check className='w-2.5 h-2.5' />
                              ) : (
                                <X className='w-2.5 h-2.5 opacity-50' />
                              )}
                            </div>
                            <span
                              className={isMet ? "line-through opacity-75" : ""}
                            >
                              {req.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <Button disabled={isLoading} type='submit' className='w-full'>
            {isLoading ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              "Sign Up"
            )}
          </Button>

          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <Separator />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-white px-2 text-muted-foreground'>OR</span>
            </div>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default SignUpForm;
