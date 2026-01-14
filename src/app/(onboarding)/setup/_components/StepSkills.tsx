"use client";

import React, { useEffect } from "react";
import { useSetupStore } from "@/store/useSetupStore";
import { Button } from "@/components/ui/button";
import { useProgressSteps } from "@/components/global/progress-steps/ProgressStepsContext";
import {
  Plus,
  Trash2,
  Cpu,
  Globe,
  Link as LinkIcon,
  Award,
} from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SkillsStepSchema } from "@/schemas";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/global/CustomFormField";
import { FormFieldType } from "@/lib/enums";
import { Separator } from "@/components/ui/separator";

const StepSkills = () => {
  const { skills, socialLinks, setSkills, setSocialLinks } = useSetupStore();
  const { goNext, goPrev } = useProgressSteps();

  const form = useForm<z.infer<typeof SkillsStepSchema>>({
    resolver: zodResolver(SkillsStepSchema),
    defaultValues: {
      skills: skills.length
        ? skills
        : [
            {
              name: "",
              level: "",
            },
          ],
      socialLinks: socialLinks.length
        ? socialLinks
        : [
            {
              platform: "",
              url: "",
            },
          ],
    },
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    control: form.control,
    name: "socialLinks",
  });

  const onSubmit = (values: z.infer<typeof SkillsStepSchema>) => {
    const skillsWithIds = values.skills.map((skill: any) => ({
      ...skill,
      id: skill.id || crypto.randomUUID(),
    }));

    const linksWithIds = values.socialLinks.map((link: any) => ({
      ...link,
      id: link.id || crypto.randomUUID(),
    }));

    setSkills(skillsWithIds);
    setSocialLinks(linksWithIds);
    goNext();
  };

  return (
    <div className='md:h-full h-auto flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500'>
      <div className='shrink-0 md:mb-5 mb-2'>
        <h3 className='md:font-semibold font-bold md:text-2xl text-lg'>
          Skills & Social Links
        </h3>
        <p className='font-medium md:text-base text-sm text-muted-foreground'>
          Highlight your expertise and online presence
        </p>
        <Separator className='my-5 shrink-0' />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col flex-1 md:min-h-0 h-full'
        >
          <div className='flex-1 md:overflow-y-auto pr-2'>
            {/* --- Skills Section --- */}
            <div className='space-y-4 mb-8'>
              <div className='flex md:flex-row flex-col md:items-center justify-between w-full gap-2'>
                <h3 className='text-lg font-semibold flex items-center gap-2'>
                  <Cpu className='h-5 w-5 text-primary' /> Professional Skills
                </h3>
              </div>

              {skillFields.map((field, index) => (
                <div
                  key={field.id}
                  className='relative p-6 rounded-xl border-primary-border border space-y-4'
                >
                  {skillFields.length > 1 && (
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      className='absolute top-2 right-2 text-destructive hover:text-destructive/80'
                      onClick={() => removeSkill(index)}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  )}

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <CustomFormField
                      control={form.control}
                      name={`skills.${index}.name`}
                      label='Skill Name'
                      placeholder='React.js'
                      isRequired
                      fieldType={FormFieldType.INPUT}
                      icon={Award}
                    />
                    <CustomFormField
                      control={form.control}
                      name={`skills.${index}.level`}
                      label='Proficiency Level'
                      placeholder='Expert'
                      isRequired
                      fieldType={FormFieldType.SELECT}
                      options={[
                        { label: "Beginner", value: "Beginner" },
                        { label: "Intermediate", value: "Intermediate" },
                        { label: "Expert", value: "Expert" },
                      ]}
                    />
                  </div>
                </div>
              ))}
              <Button
                type='button'
                onClick={() =>
                  appendSkill({
                    name: "",
                    level: "",
                  } as any)
                }
                variant='outline'
                className='w-full border-dashed border-primary text-primary hover:bg-primary/5'
              >
                <Plus className='h-4 w-4 mr-2' /> Add Skill
              </Button>
            </div>

            <div className='h-px bg-border mb-8' />

            {/* --- Social Links Section --- */}
            <div className='space-y-4'>
              <div className='flex md:flex-row flex-col md:items-center justify-between w-full gap-2'>
                <h3 className='text-lg font-semibold flex items-center gap-2'>
                  <Globe className='h-5 w-5 text-primary' /> Social Profiles
                </h3>
              </div>

              {linkFields.map((field, index) => (
                <div
                  key={field.id}
                  className='relative p-6 rounded-xl border-primary-border border space-y-4'
                >
                  {linkFields.length > 1 && (
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      className='absolute top-2 right-2 text-destructive hover:text-destructive/80'
                      onClick={() => removeLink(index)}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  )}

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <CustomFormField
                      control={form.control}
                      name={`socialLinks.${index}.platform`}
                      label='Platform'
                      placeholder='LinkedIn'
                      isRequired
                      fieldType={FormFieldType.INPUT}
                      icon={Globe}
                    />
                    <CustomFormField
                      control={form.control}
                      name={`socialLinks.${index}.url`}
                      label='Profile URL'
                      placeholder='https://linkedin.com/in/johndoe'
                      isRequired
                      fieldType={FormFieldType.INPUT}
                      icon={LinkIcon}
                    />
                  </div>
                </div>
              ))}
              <Button
                type='button'
                onClick={() =>
                  appendLink({
                    platform: "",
                    url: "",
                  } as any)
                }
                variant='outline'
                className='w-full border-dashed border-primary text-primary hover:bg-primary/5'
              >
                <Plus className='h-4 w-4 mr-2' /> Add Social Link
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

export default StepSkills;
