"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SignUpSchema } from "@/schemas";
import { useSignUpStore } from "@/store/useSignUpStore";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/global/CustomFormField";
import { FormFieldType } from "@/lib/enums";
import { ArrowLeft, ArrowRight, Mail, Lock } from "lucide-react";

// Partial schema for this step
const AccountDetailsSchema = SignUpSchema.pick({
  email: true,
  password: true,
});

export const AccountDetailsStep = () => {
  const { formData, setFormData, setStep } = useSignUpStore();

  const form = useForm<z.infer<typeof AccountDetailsSchema>>({
    resolver: zodResolver(AccountDetailsSchema),
    defaultValues: {
      email: formData.email || "",
      password: formData.password || "",
    },
  });

  const onSubmit = (values: z.infer<typeof AccountDetailsSchema>) => {
    setFormData(values);
    setStep(4);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <CustomFormField
          control={form.control}
          name='email'
          label='Email Address'
          isRequired
          placeholder='john@example.com'
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

        <div className='flex justify-between pt-4'>
          <Button
            type='button'
            variant='outline'
            onClick={() => setStep(2)}
            className='flex items-center gap-2'
          >
            <ArrowLeft className='w-4 h-4' /> Back
          </Button>
          <Button type='submit' className='flex items-center gap-2'>
            Review <ArrowRight className='w-4 h-4' />
          </Button>
        </div>
      </form>
    </Form>
  );
};
