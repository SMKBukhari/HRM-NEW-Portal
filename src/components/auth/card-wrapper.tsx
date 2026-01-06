"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/back-button";
import { CreateAccount } from "./account-create-button";
import { UserRoundPlus } from "lucide-react";

import { cn } from "@/lib/utils";

interface CardWrapperProps {
  children: React.ReactNode;
  isShadow?: boolean;
  headerText: string;
  headerLabel: string;
  isbackButton?: boolean;
  backButtonLabel: string;
  backButtonHref: string;
  createAccount?: boolean;
  spanLabel?: string;
  forgotPassword?: boolean;
  className?: string;
}

export const CardWrapper = ({
  children,
  isShadow,
  headerText,
  headerLabel,
  isbackButton,
  backButtonLabel,
  backButtonHref,
  createAccount,
  spanLabel,
  forgotPassword,
  className,
}: CardWrapperProps) => {
  return (
    <Card
      className={cn(
        "w-full",
        isShadow ? "shadow-md border" : "shadow-none border-none",
        className
      )}
    >
      <CardHeader className='flex flex-col items-center gap-2'>
        <div className='border w-fit border-neutral-300 p-2 rounded-lg'>
          <UserRoundPlus width={18} height={18} />
        </div>
        <Header label={headerLabel} text={headerText} />
      </CardHeader>
      <CardContent className='p-0'>{children}</CardContent>
      <CardFooter className='w-full flex justify-center'>
        <div>
          {forgotPassword && (
            <BackButton label='Forgot password?' href='/forgotPassword' />
          )}
          {createAccount && (
            <CreateAccount
              spanLabel={spanLabel || "Don't have an account?"}
              label={backButtonLabel}
              href={backButtonHref}
            />
          )}
          {isbackButton && (
            <BackButton label={backButtonLabel} href={backButtonHref} />
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
