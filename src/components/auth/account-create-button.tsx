"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CreateAccountProps {
  spanLabel: string;
  label: string;
  href: string;
}

export const CreateAccount = ({
  spanLabel,
  label,
  href,
}: CreateAccountProps) => {
  return (
    <div className='flex w-full justify-center items-center -mt-1.5 md:flex-row flex-col '>
      <span className='md:text-sm text-xs font-normal text-muted-foreground'>
        {spanLabel}
      </span>
      <Button
        variant={"link"}
        className='font-normal text-xs md:text-sm -ml-2 underline underline-offset-4 md:no-underline hover:underline'
        size={"sm"}
        asChild
      >
        <Link href={href}>{label}</Link>
      </Button>
    </div>
  );
};
