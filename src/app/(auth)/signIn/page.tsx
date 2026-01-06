"use client";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SignInForm from "@/components/auth/signIn-form";
// import Cookies from "js-cookie";
// import axios from "axios";

const SignInPageContent = () => {
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
      <SignInForm redirectTo={redirectTo} />
    </div>
  );
};

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInPageContent />
    </Suspense>
  );
};

export default LoginPage;
