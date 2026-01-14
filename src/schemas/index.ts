import * as z from "zod";

export const SignInSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const SignUpSchema = z.object({
  fullName: z.string().min(1, { message: "Please enter your Name" }),
  email: z.email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(12, {
      message: "Password must be less than 12 characters",
    }),
  gender: z.enum(["Male", "Female", "Other"], {
    message: "Please Select Gender",
  }),
  contactNumber: z
    .string()
    .length(11, {
      message: "Please enter a valid contact number",
    })
    .regex(/^\d+$/, {
      message: "Please enter a valid contact number",
    }),
  DOB: z.date().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

export const OTPSchema = z.object({
  otpCode: z.string().length(6, {
    message: "Please enter a valid OTP code",
  }),
});

export const ForgotPasswordSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address",
  }),
});

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    ConfirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters."),
  })
  .refine((data) => data.password === data.ConfirmPassword, {
    message: "Passwords do not match",
    path: ["ConfirmPassword"],
  });

export const PersonalDetailsSchema = z.object({
  fullName: z.string().min(1, { message: "Full Name is required" }),
  email: z.email({ message: "Invalid email address" }),
  contactNumber: z.string().min(1, { message: "Contact Number is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  dob: z.date(),
  cnic: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});
