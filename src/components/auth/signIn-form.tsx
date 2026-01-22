"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { SignInSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  GoogleIcon,
  FacebookIcon,
  AppleIcon,
} from "@/components/auth/social-icons";
import CustomFormField from "../global/CustomFormField";
import { FormFieldType } from "@/lib/enums";

const LoginForm = ({ redirectTo }: { redirectTo?: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/user/signIn", values);
      if (response.data.loginSessionToken) {
        // Store the session token in localStorage (or you could use cookies)
        Cookies.set("sessionToken", response.data.loginSessionToken, {
          expires: 1, // Cookie expires in 1 day
        });
        Cookies.set("sessionExpiry", response.data.loginSessionExpiry, {
          expires: 1, // Cookie expires in 1 day
        });
        // Store userId in cookies
        Cookies.set("userId", response.data.userId, {
          expires: 7, // Cookie expires in 7 days
        });

        if (response.data.isVerified) {
          console.log(response.data.role);
          router.push("/dashboard");
          toast.success("User SignedIn successfully.");
        } else {
          router.push(`/verify/${response.data.userId}`);
          toast.success(
            "User SignedIn successfully, Please Verify Your Email.",
          );
        }
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          console.error(error.response.data);
          toast.error("An unexpected error occurred. Please try again.");
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardWrapper
      headerText='Login to your account'
      headerLabel='Welcome back, please enter your details'
      backButtonLabel='Create an account'
      backButtonHref='/signUp'
      createAccount
      spanLabel='Not registered yet? '
      className='p-0'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          <div className='space-y-4'>
            <CustomFormField
              control={form.control}
              name='email'
              label='Email address'
              isRequired
              placeholder='john.doe@example.com'
              fieldType={FormFieldType.INPUT}
              icon={Mail}
            />
            <CustomFormField
              control={form.control}
              name='password'
              label='Password'
              isRequired
              placeholder='Enter password'
              fieldType={FormFieldType.PASSWORD_INPUT}
              icon={Lock}
            />
          </div>

          <div className='flex items-center justify-between gap-8'>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='remember'
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label
                htmlFor='remember'
                className='md:text-sm text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Keep me logged in
              </label>
            </div>
            <Link
              href='/forgotPassword'
              className='font-normal text-xs md:text-sm -ml-2 underline underline-offset-4 md:no-underline hover:underline text-primary'
            >
              Forgot password?
            </Link>
          </div>

          <Button disabled={isLoading} type='submit' className='w-full'>
            {isLoading ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              "Log in"
            )}
          </Button>

          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <Separator />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='px-2 text-muted-foreground bg-card'>OR</span>
            </div>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
