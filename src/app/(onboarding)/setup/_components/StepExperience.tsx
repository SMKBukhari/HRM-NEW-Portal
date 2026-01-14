"use client";

import React, { useEffect } from "react";
import { useSetupStore } from "@/store/useSetupStore";
import { Button } from "@/components/ui/button";
import { useProgressSteps } from "@/components/global/progress-steps/ProgressStepsContext";
import {
  Plus,
  Trash2,
  Briefcase,
  GraduationCap,
  University,
  Book,
  Medal,
  BriefcaseBusiness,
  Building2,
  MapPin,
  Clock,
} from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ExperienceStepSchema } from "@/schemas";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/global/CustomFormField";
import { FormFieldType } from "@/lib/enums";
import { Separator } from "@/components/ui/separator";

const StepExperience = () => {
  const { education, jobExperience, setEducation, setJobExperience } =
    useSetupStore();
  const { goNext, goPrev } = useProgressSteps();

  console.log("jobExperience", jobExperience);
  console.log("education", education);

  const form = useForm<z.infer<typeof ExperienceStepSchema>>({
    resolver: zodResolver(ExperienceStepSchema),
    defaultValues: {
      education: education.length
        ? education.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          }))
        : [
            {
              university: "",
              degree: "",
              fieldOfStudy: "",
              grade: "",
              startDate: undefined,
              currentlyStudying: false,
              endDate: undefined,
              description: "",
            },
          ],
      jobExperience: jobExperience.length
        ? jobExperience.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          }))
        : [
            {
              jobTitle: "",
              companyName: "",
              employmentType: "",
              location: "",
              startDate: undefined,
              currentlyWorking: false,
              endDate: undefined,
              description: "",
            },
          ],
    },
  });

  const {
    fields: eduFields,
    append: appendEdu,
    remove: removeEdu,
  } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const {
    fields: expFields,
    append: appendExp,
    remove: removeExp,
  } = useFieldArray({
    control: form.control,
    name: "jobExperience",
  });

  // Helper to safely parse Date to YYYY-MM-DD string for HTML input
  const formatDateForInput = (date: Date | undefined | string) => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split("T")[0];
  };

  const onSubmit = (values: z.infer<typeof ExperienceStepSchema>) => {
    // 1. Generate IDs for new items
    // 2. Ensure booleans are strict booleans (handle undefined -> false)

    const educationWithIds = values.education.map((edu: any) => ({
      ...edu,
      id: edu.id || crypto.randomUUID(),
      currentlyStudying: !!edu.currentlyStudying, // Force boolean
    }));

    const experienceWithIds = values.jobExperience.map((exp: any) => ({
      ...exp,
      id: exp.id || crypto.randomUUID(),
      currentlyWorking: !!exp.currentlyWorking, // Force boolean
    }));

    setEducation(educationWithIds);
    setJobExperience(experienceWithIds);
    goNext();
  };

  return (
    <div className='md:h-full h-auto flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500'>
      <div className='shrink-0 md:mb-5 mb-2'>
        <h3 className='md:font-semibold font-bold md:text-2xl text-lg'>
          Education & Experience
        </h3>
        <p className='font-medium md:text-base text-sm text-muted-foreground'>
          Share your academic and professional journey
        </p>
        <Separator className='my-5 shrink-0' />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col flex-1 md:min-h-0 h-full'
        >
          <div className='flex-1 md:overflow-y-auto pr-2'>
            {/* --- Education Section --- */}
            <div className='space-y-4 mb-8'>
              <div className='flex md:flex-row flex-col md:items-center justify-between w-full gap-2'>
                <h3 className='text-lg font-semibold flex items-center gap-2'>
                  <GraduationCap className='h-5 w-5 text-primary' /> Education
                </h3>
                <Button
                  type='button'
                  onClick={() =>
                    appendEdu({
                      university: "",
                      degree: "",
                      fieldOfStudy: "",
                      grade: "",
                      startDate: undefined, // undefined works fine with z.coerce
                      currentlyStudying: false,
                      endDate: undefined,
                      description: "",
                    } as any)
                  }
                  variant='outline'
                  size='sm'
                >
                  <Plus className='h-4 w-4 mr-2' /> Add Education
                </Button>
              </div>

              {eduFields.map((field, index) => (
                <div
                  key={field.id}
                  className='relative p-6 rounded-xl border-primary-border border space-y-4'
                >
                  {eduFields.length > 1 && (
                    <Button
                      type='button'
                      variant='ghosted'
                      size='icon'
                      className='absolute top-2 right-2 text-destructive hover:text-destructive/80'
                      onClick={() => removeEdu(index)}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  )}

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <CustomFormField
                      control={form.control}
                      name={`education.${index}.university`}
                      label='University / Institute'
                      placeholder='Harvard University'
                      isRequired
                      fieldType={FormFieldType.INPUT}
                      icon={University}
                    />
                    <CustomFormField
                      control={form.control}
                      name={`education.${index}.degree`}
                      label='Degree'
                      placeholder='Bachelor of Science'
                      isRequired
                      fieldType={FormFieldType.INPUT}
                      icon={GraduationCap}
                    />
                    <CustomFormField
                      control={form.control}
                      name={`education.${index}.fieldOfStudy`}
                      label='Field of Study'
                      placeholder='Computer Science'
                      isRequired
                      fieldType={FormFieldType.INPUT}
                      icon={Book}
                    />
                    <CustomFormField
                      control={form.control}
                      name={`education.${index}.grade`}
                      label='Grade / GPA'
                      placeholder='3.8'
                      fieldType={FormFieldType.INPUT}
                      icon={Medal}
                    />

                    {/* START DATE */}
                    <CustomFormField
                      control={form.control}
                      name={`education.${index}.startDate`}
                      label='Start Date'
                      placeholder='Select Start Date'
                      isRequired
                      fieldType={FormFieldType.DATE_PICKER}
                    />

                    {/* END DATE */}
                    <CustomFormField
                      control={form.control}
                      name={`education.${index}.endDate`}
                      label='End Date'
                      placeholder='Select End Date'
                      fieldType={FormFieldType.DATE_PICKER}
                    />

                    <div className='md:col-span-2'>
                      <CustomFormField
                        control={form.control}
                        name={`education.${index}.currentlyStudying`}
                        label='I am currently studying here'
                        fieldType={FormFieldType.CHECKBOX}
                      />
                    </div>
                    <div className='md:col-span-2'>
                      <CustomFormField
                        control={form.control}
                        name={`education.${index}.description`}
                        label='Description'
                        placeholder='Describe your achievements...'
                        fieldType={FormFieldType.TEXTAREA}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type='button'
                onClick={() =>
                  appendEdu({
                    university: "",
                    degree: "",
                    fieldOfStudy: "",
                    grade: "",
                    startDate: undefined,
                    currentlyStudying: false,
                    endDate: undefined,
                    description: "",
                  } as any)
                }
                variant='outline'
                className='w-full border-dashed border-primary text-primary hover:bg-primary/5'
              >
                <Plus className='h-4 w-4 mr-2' /> Add Education
              </Button>
            </div>

            <div className='h-px bg-border mb-8' />

            {/* --- Experience Section --- */}
            <div className='space-y-4'>
              <div className='flex md:flex-row flex-col md:items-center justify-between w-full gap-2'>
                <h3 className='text-lg font-semibold flex items-center gap-2'>
                  <Briefcase className='h-5 w-5 text-primary' /> Job Experience
                </h3>
                <Button
                  type='button'
                  onClick={() =>
                    appendExp({
                      jobTitle: "",
                      companyName: "",
                      employmentType: "",
                      location: "",
                      startDate: undefined,
                      endDate: undefined,
                      currentlyWorking: false,
                      description: "",
                    } as any)
                  }
                  variant='outline'
                  size='sm'
                >
                  <Plus className='h-4 w-4 mr-2' /> Add Experience
                </Button>
              </div>

              {expFields.map((field, index) => (
                <div
                  key={field.id}
                  className='relative p-6 rounded-xl border-primary-border border space-y-4'
                >
                  {expFields.length > 1 && (
                    <Button
                      type='button'
                      variant='ghosted'
                      size='icon'
                      className='absolute top-2 right-2 text-destructive hover:text-destructive/80'
                      onClick={() => removeExp(index)}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  )}

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <CustomFormField
                      control={form.control}
                      name={`jobExperience.${index}.jobTitle`}
                      label='Job Title'
                      placeholder='Software Engineer'
                      isRequired
                      fieldType={FormFieldType.INPUT}
                      icon={BriefcaseBusiness}
                    />
                    <CustomFormField
                      control={form.control}
                      name={`jobExperience.${index}.companyName`}
                      label='Company Name'
                      placeholder='Tech Corp'
                      isRequired
                      fieldType={FormFieldType.INPUT}
                      icon={Building2}
                    />
                    <CustomFormField
                      control={form.control}
                      name={`jobExperience.${index}.location`}
                      label='Location'
                      placeholder='San Francisco, CA'
                      isRequired
                      fieldType={FormFieldType.INPUT}
                      icon={MapPin}
                    />
                    <CustomFormField
                      control={form.control}
                      name={`jobExperience.${index}.employmentType`}
                      label='Employment Type'
                      placeholder='Full-time'
                      isRequired
                      fieldType={FormFieldType.INPUT}
                      icon={Clock}
                    />

                    {/* START DATE */}
                    <CustomFormField
                      control={form.control}
                      name={`jobExperience.${index}.startDate`}
                      label='Start Date'
                      placeholder='Select Start Date'
                      isRequired
                      fieldType={FormFieldType.DATE_PICKER}
                    />

                    {/* END DATE */}
                    <CustomFormField
                      control={form.control}
                      name={`jobExperience.${index}.endDate`}
                      label='End Date'
                      placeholder='Select End Date'
                      fieldType={FormFieldType.DATE_PICKER}
                    />

                    <div className='md:col-span-2'>
                      <CustomFormField
                        control={form.control}
                        name={`jobExperience.${index}.currentlyWorking`}
                        label='I am currently working here'
                        fieldType={FormFieldType.CHECKBOX}
                      />
                    </div>
                    <div className='md:col-span-2'>
                      <CustomFormField
                        control={form.control}
                        name={`jobExperience.${index}.description`}
                        label='Description'
                        placeholder='Describe your responsibilities...'
                        fieldType={FormFieldType.TEXTAREA}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type='button'
                onClick={() =>
                  appendExp({
                    jobTitle: "",
                    companyName: "",
                    employmentType: "",
                    location: "",
                    startDate: undefined,
                    endDate: undefined,
                    currentlyWorking: false,
                    description: "",
                  } as any)
                }
                variant='outline'
                className='w-full border-dashed border-primary text-primary hover:bg-primary/5'
              >
                <Plus className='h-4 w-4 mr-2' /> Add Experience
              </Button>
            </div>
          </div>

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

export default StepExperience;
