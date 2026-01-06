import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  text: string;
  label: string;
}

export const Header = ({ label, text }: HeaderProps) => {
  return (
    <div className='w-full flex flex-col gap-y-1 md:gap-y-4 items-center justify-center'>
      <h1 className={cn("md:text-3xl text-xl font-semibold", font.className)}>
        {text}
      </h1>
      <p className='text-muted-foreground md:text-sm text-xs'>{label}</p>
    </div>
  );
};
