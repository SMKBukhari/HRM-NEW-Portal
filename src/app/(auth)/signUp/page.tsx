// "use client";
// import React, { useEffect, useState } from "react";
// import { useSignUpStore } from "@/store/useSignUpStore";
// import { StepIndicator } from "@/components/auth/signup-steps/StepIndicator";
// import { ResumeUploadStep } from "@/components/auth/signup-steps/ResumeUploadStep";
// import { PersonalDetailsStep } from "@/components/auth/signup-steps/PersonalDetailsStep";
// import { AccountDetailsStep } from "@/components/auth/signup-steps/AccountDetailsStep";
// import { ReviewStep } from "@/components/auth/signup-steps/ReviewStep";
// import { CardWrapper } from "@/components/auth/card-wrapper";
// import { motion, AnimatePresence } from "framer-motion";

// const SignUpPage = () => {
//   const { step, resetStore } = useSignUpStore();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     // Optional: Reset store on mount if you want fresh start every time,
//     // or keep it to allow persistence. User asked for persistence.
//   }, []);

//   if (!mounted) return null;

//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return <ResumeUploadStep />;
//       case 2:
//         return <PersonalDetailsStep />;
//       case 3:
//         return <AccountDetailsStep />;
//       case 4:
//         return <ReviewStep />;
//       default:
//         return <ResumeUploadStep />;
//     }
//   };

//   return (
//     <CardWrapper
//       headerText='Create an Account'
//       headerLabel='Join us to experience the future of HRM'
//       backButtonLabel='Already have an account?'
//       backButtonHref='/signIn'
//     >
//       <div className='w-full'>
//         <StepIndicator currentStep={step} totalSteps={4} />

//         <AnimatePresence mode='wait'>
//           <motion.div
//             key={step}
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -20 }}
//             transition={{ duration: 0.3 }}
//           >
//             {renderStep()}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </CardWrapper>
//   );
// };

// export default SignUpPage;

"use client";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SignUpForm from "@/components/auth/signUp-form";
// import Cookies from "js-cookie";
// import axios from "axios";

const SignUpPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || undefined;

  //   useEffect(() => {
  //     const checkUserSession = async () => {
  //       // Check if the user is already authenticated by looking for session token in localStorage
  //       // const sessionToken = localStorage.getItem("sessionToken");
  //       const sessionToken = Cookies.get("sessionToken");
  //       const userId = Cookies.get("userId");
  //       if (sessionToken) {
  //         // Check if the session token has expired
  //         // const sessionExpiry = localStorage.getItem("sessionExpiry");
  //         const sessionExpiry = Cookies.get("sessionExpiry");
  //         if (sessionExpiry && new Date(sessionExpiry) > new Date()) {
  //           // If session is still valid, redirect to the dashboard
  //           const response = await axios.post("/api/user/getUserProfile", {
  //             userId: userId,
  //           });

  //           if (redirectTo) {
  //             const projectMatch = redirectTo.match(/^\/projects\/([^\/]+)/);
  //             if (projectMatch) {
  //               const slug = projectMatch[1];
  //               try {
  //                 const checkSlugResponse = await axios.get(
  //                   `/api/projects/checkSlug?slug=${slug}`
  //                 );
  //                 if (!checkSlugResponse.data.isAvailable) {
  //                   router.push(redirectTo);
  //                   return;
  //                 }
  //               } catch (error) {
  //                 console.error("Error checking project slug:", error);
  //               }
  //             } else {
  //               router.push(redirectTo);
  //               return;
  //             }
  //           }

  //           if (response.data.role?.name === "Admin") {
  //             router.push("/admin/dashboard");
  //           } else if (response.data.role?.name === "Manager") {
  //             router.push("/manager/dashboard");
  //           } else if (response.data.role?.name === "Employee") {
  //             router.push("/employee/dashboard");
  //           } else if (response.data.role?.name === "Recruiter") {
  //             router.push("/recruiter/dashboard");
  //           } else if (response.data.role?.name === "Interviewer") {
  //             router.push("/interviewer/dashboard");
  //           } else if (response.data.role?.name === "CEO") {
  //             router.push("/ceo/dashboard");
  //           } else {
  //             router.push("/dashboard");
  //           }
  //         } else {
  //           Cookies.remove("sessionToken");
  //           Cookies.remove("sessionExpiry");
  //           router.push("/signIn");
  //         }
  //       }
  //     };

  //     checkUserSession();
  //   }, [router, redirectTo]);

  return (
    <div className='w-full h-full flex justify-center'>
      <SignUpForm redirectTo={redirectTo} />
    </div>
  );
};

const SignUpPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpPageContent />
    </Suspense>
  );
};

export default SignUpPage;
