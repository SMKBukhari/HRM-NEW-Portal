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
import { ArrowLeft, ArrowRight } from "lucide-react";

// Partial schema for this step
const PersonalDetailsSchema = SignUpSchema.pick({
  fullName: true,
  gender: true,
  contactNumber: true,
  city: true,
  country: true,
  DOB: true,
});

export const PersonalDetailsStep = () => {
  const { formData, setFormData, setStep } = useSignUpStore();

  const form = useForm<z.infer<typeof PersonalDetailsSchema>>({
    resolver: zodResolver(PersonalDetailsSchema),
    defaultValues: {
      fullName: formData.fullName || "",
      gender: (formData.gender as any) || undefined,
      contactNumber: formData.contactNumber || "",
      city: formData.city || "",
      country: formData.country || "",
      DOB: formData.DOB ? new Date(formData.DOB) : undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof PersonalDetailsSchema>) => {
    setFormData(values);
    setStep(3);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='grid gap-6 md:grid-cols-2'>
          <CustomFormField
            control={form.control}
            name='fullName'
            label='Full Name'
            isRequired
            placeholder='John Doe'
            fieldType={FormFieldType.INPUT}
          />
          <CustomFormField
            control={form.control}
            name='contactNumber'
            label='Phone Number'
            isRequired
            placeholder='03001234567'
            fieldType={FormFieldType.INPUT}
          />
          <CustomFormField
            control={form.control}
            name='gender'
            label='Gender'
            isRequired
            fieldType={FormFieldType.SELECT}
            placeholder='Select Gender'
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Other", label: "Other" },
            ]}
          />
          <CustomFormField
            control={form.control}
            name='DOB'
            label='Date of Birth'
            placeholder='Select Date'
            fieldType={FormFieldType.DATE_PICKER}
          />
          <CustomFormField
            control={form.control}
            name='city'
            label='City'
            placeholder='New York'
            fieldType={FormFieldType.INPUT}
          />
          <CustomFormField
            control={form.control}
            name='country'
            label='Country'
            placeholder='USA'
            fieldType={FormFieldType.INPUT}
          />
        </div>

        <div className='flex justify-between pt-4'>
          <Button
            type='button'
            variant='outline'
            onClick={() => setStep(1)}
            className='flex items-center gap-2'
          >
            <ArrowLeft className='w-4 h-4' /> Back
          </Button>
          <Button type='submit' className='flex items-center gap-2'>
            Next <ArrowRight className='w-4 h-4' />
          </Button>
        </div>
      </form>
    </Form>
  );
};
