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
  fullName: z.string().min(1, { error: "Full Name is required" }),
  email: z.email({ error: "Invalid email address" }),
  contactNumber: z.string().min(1, { error: "Contact Number is required" }),
  gender: z.string().min(1, { error: "Gender is required" }),
  dob: z.date({
    error: (iss) =>
      iss.input === undefined
        ? "Date of Birth is required"
        : "Please select a valid date",
  }),
  cnic: z.string().min(13, { error: "CNIC is required" }),
  address: z.string().min(5, { error: "Address is required" }),
  city: z.string().min(3, { error: "City is required" }),
  country: z.string().min(3, { error: "Country is required" }),
});
