"use client";
import React, { useEffect } from "react";
import { useSetupStore } from "@/store/useSetupStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProgressSteps } from "@/components/global/progress-steps/ProgressStepsContext";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PersonalDetailsSchema } from "@/schemas";
import CustomFormField from "@/components/global/CustomFormField";
import { FormFieldType } from "@/lib/enums";
import { Form } from "@/components/ui/form";
import { Globe, IdCard, Mail, MapPin, User } from "lucide-react";

const StepPersonal = () => {
  const { personalDetails, setPersonalDetails } = useSetupStore();
  const { goNext, goPrev } = useProgressSteps();

  const form = useForm<z.infer<typeof PersonalDetailsSchema>>({
    resolver: zodResolver(PersonalDetailsSchema),
    defaultValues: {
      fullName: personalDetails.fullName || "",
      email: personalDetails.email || "",
      contactNumber: personalDetails.contactNumber || "",
      gender: personalDetails.gender || "",
      dob: personalDetails.dob ?? undefined,
      cnic: personalDetails.cnic || "",
      address: personalDetails.address || "",
      city: personalDetails.city || "",
      country: personalDetails.country || "",
    },
  });

  // Sync with store on mount to ensure default values are set if store has data
  useEffect(() => {
    form.reset({
      fullName: personalDetails.fullName || "",
      email: personalDetails.email || "",
      contactNumber: personalDetails.contactNumber || "",
      gender: personalDetails.gender || "",
      dob: personalDetails.dob ?? undefined,
      cnic: personalDetails.cnic || "",
      address: personalDetails.address || "",
      city: personalDetails.city || "",
      country: personalDetails.country || "",
    });
  }, [personalDetails, form]);

  const onSubmit = (values: z.infer<typeof PersonalDetailsSchema>) => {
    setPersonalDetails(values);
    goNext();
  };

  return (
    <div className='md:h-full h-auto flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500'>
      {/* Header (Fixed) */}
      <div className='shrink-0 md:mb-5 mb-2'>
        <h3 className='md:font-semibold font-bold md:text-2xl text-lg'>
          Personal & Contact Information
        </h3>
        <p className='font-medium md:text-base text-sm text-muted-foreground'>
          Enter your personal details and primary contact information to
          initiate your HR record
        </p>
        <Separator className='my-5 shrink-0' />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col flex-1 md:min-h-0 h-full'
        >
          <div className='flex-1 md:overflow-y-auto pr-2'>
            <div className='space-y-4 mb-5'>
              <p className='md:font-semibold font-bold text-lg'>
                Personal Info
              </p>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-1'>
                <CustomFormField
                  control={form.control}
                  name='fullName'
                  label='Full Name'
                  placeholder='Enter your full name'
                  isRequired
                  fieldType={FormFieldType.INPUT}
                  icon={User}
                />{" "}
                <CustomFormField
                  control={form.control}
                  name='dob'
                  label='Date of Birth'
                  placeholder='Select your DOB'
                  isRequired
                  fieldType={FormFieldType.DATE_PICKER}
                  icon={User}
                />
              </div>
              <CustomFormField
                control={form.control}
                name='gender'
                label='Gender'
                isRequired
                fieldType={FormFieldType.RADIO_GROUP}
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "PreferNotToSay", label: "Prefer not to say" },
                ]}
              />
            </div>
            <div className='space-y-4 mb-5'>
              <p className='md:font-semibold font-bold text-lg'>Contact Info</p>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-1'>
                <CustomFormField
                  control={form.control}
                  name='email'
                  label='Email Address'
                  placeholder='Enter your email'
                  isRequired
                  fieldType={FormFieldType.INPUT}
                  disabled
                  icon={Mail}
                />
                <CustomFormField
                  control={form.control}
                  name='contactNumber'
                  label='Contact Number'
                  isRequired
                  fieldType={FormFieldType.PHONE}
                  placeholder='3012345678'
                />
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1 mb-5'>
              <CustomFormField
                control={form.control}
                name='cnic'
                label='CNIC'
                isRequired
                fieldType={FormFieldType.CNIC}
                placeholder='12345-1234567-1'
                icon={IdCard}
              />
              <CustomFormField
                control={form.control}
                name='city'
                label='City'
                placeholder='Enter your city'
                isRequired
                fieldType={FormFieldType.INPUT}
                icon={MapPin}
              />
              <CustomFormField
                control={form.control}
                name='country'
                label='Country'
                placeholder='Enter your country'
                isRequired
                fieldType={FormFieldType.INPUT}
                icon={Globe}
              />
            </div>
            <CustomFormField
              control={form.control}
              name='address'
              label='Address'
              placeholder='Enter your address'
              isRequired
              fieldType={FormFieldType.TEXTAREA}
            />
          </div>

          {/* Footer fixed */}
          <div className='shrink-0 flex justify-between pt-4 bg-background'>
            <Button type='button' variant='outline' onClick={goPrev} size='lg'>
              Previous
            </Button>
            <Button type='submit' size='lg'>
              Next Step
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StepPersonal;
