import type { Metadata } from "next";
import TTIRoundedLogo from "@/lib/Logos/ttiRoundedLogo";
import { TestimonialSlider } from "@/components/auth/testimonial-slider";

export const metadata: Metadata = {
  title: "HRMS-TTI | Sign In (The Truth International)",
  description: "A Human Resource Management System for The Truth International",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='w-full h-screen p-4 flex items-center justify-center'>
      <div className='w-full h-full max-w-screen flex overflow-hidden'>
        {/* Left Side - Form */}
        <div className='w-full lg:w-1/2 h-full flex flex-col relative justify-center items-center p-2'>
          {/* 1. Logo at the top */}
          <div className='absolute top-0 left-0 p-2'>
            <TTIRoundedLogo width={35} height={35} />
          </div>

          {/* 2. Main Content (The Form) */}
          <div className='w-full max-w-md'>{children}</div>

          {/* 3. Footer (Copyright) */}
          <div className='absolute bottom-0 w-full text-center pb-6'>
            <p className='text-xs text-gray-400'>
              &copy; {new Date().getFullYear()} The Truth International. All
              rights reserved.
            </p>
          </div>
        </div>

        {/* Right Side - Testimonial (Hidden on mobile) */}
        <div className='hidden lg:block w-1/2 h-full'>
          <TestimonialSlider className='w-full h-full' />
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
