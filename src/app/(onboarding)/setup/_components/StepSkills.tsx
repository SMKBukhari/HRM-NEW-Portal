"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useSetupStore } from "@/store/useSetupStore";
import { Button } from "@/components/ui/button";
import { useProgressSteps } from "@/components/global/progress-steps/ProgressStepsContext";
import {
  Cpu,
  Globe,
  Link as LinkIcon,
  X,
  Linkedin,
  Github,
  Twitter,
  Facebook,
  Instagram,
  Video,
  MessageCircle,
  Search,
  Plus,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SkillsStepSchema } from "@/schemas";
import { uploadResumeAction } from "../actions";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/global/CustomFormField";
import { FormFieldType } from "@/lib/enums";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const POPULAR_SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
  "PHP",
  "Laravel",
  "Django",
  "Spring Boot",
  "AWS",
  "Docker",
  "Kubernetes",
  "GraphQL",
  "SQL",
  "MongoDB",
  "PostgreSQL",
  "Figma",
  "Adobe XD",
  "UI/UX Design",
  "Product Management",
  "Agile",
  "Scrum",
  "Jira",
  "Git",
  "CI/CD",
  "Flutter",
  "React Native",
  "Swift",
  "Kotlin",
  "Vue.js",
  "Angular",
  "Svelte",
  "Tailwind CSS",
  "Bootstrap",
  "Sass",
  "Redux",
  "Zustand",
  "Prisma",
  "Mongoose",
];

const StepSkills = () => {
  const {
    skills,
    setSkills,
    setSocialLinks,
    linkedin,
    github,
    twitter,
    facebook,
    instagram,
    behance,
    skype,
    zoomId,
    googleMeetId,
    personalDetails,
    employmentDetails,
    education,
    jobExperience,
    resumeUrl,
    resumeName,
    resumePublicId,
    resumeFile,
  } = useSetupStore();
  const { goNext, goPrev } = useProgressSteps();
  const [skillInput, setSkillInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof SkillsStepSchema>>({
    resolver: zodResolver(SkillsStepSchema),
    defaultValues: {
      skills: skills || [],
      linkedin: linkedin || "",
      github: github || "",
      twitter: twitter || "",
      facebook: facebook || "",
      instagram: instagram || "",
      behance: behance || "",
      skype: skype || "",
      zoomId: zoomId || "",
      googleMeetId: googleMeetId || "",
    },
  });

  // Handle outside click to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const currentSkills = form.watch("skills") || [];

  const filteredSkills = POPULAR_SKILLS.filter(
    (skill) =>
      skill.toLowerCase().includes(skillInput.toLowerCase()) &&
      !currentSkills.some((s) => s.name.toLowerCase() === skill.toLowerCase())
  );

  const handleAddSkill = (skillName: string) => {
    if (currentSkills.length >= 15) return;

    const trimmedName = skillName.trim();
    if (!trimmedName) return;

    if (
      currentSkills.some(
        (s) => s.name.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      setSkillInput("");
      setShowSuggestions(false);
      return;
    }

    const newSkill = {
      id: crypto.randomUUID(),
      name: trimmedName,
    };

    const updatedSkills = [...currentSkills, newSkill];
    form.setValue("skills", updatedSkills);
    setSkillInput("");
    setShowSuggestions(false);
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = [...currentSkills];
    updatedSkills.splice(index, 1);
    form.setValue("skills", updatedSkills);
  };

  const onSubmit = async (values: z.infer<typeof SkillsStepSchema>) => {
    try {
      setIsLoading(true);

      // 1. Update Store
      setSkills(values.skills);
      setSocialLinks({
        linkedin: values.linkedin,
        github: values.github,
        twitter: values.twitter,
        facebook: values.facebook,
        instagram: values.instagram,
        behance: values.behance,
        skype: values.skype,
        zoomId: values.zoomId,
        googleMeetId: values.googleMeetId,
      });

      // 2. Upload Resume if exists
      let finalResumeUrl = resumeUrl;
      let finalResumeName = resumeName;
      let finalResumePublicId = resumePublicId;

      if (resumeFile) {
        const formData = new FormData();
        formData.append("resume", resumeFile);

        const uploadResult = await uploadResumeAction(formData);

        if (uploadResult.success && uploadResult.url) {
          finalResumeUrl = uploadResult.url;
          finalResumeName = uploadResult.name || resumeFile.name;
          finalResumePublicId = uploadResult.publicId || "";
        } else {
          toast.error("Failed to upload resume. Please try again.");
          setIsLoading(false);
          return;
        }
      }

      // 3. Prepare Data Payload
      const userId = Cookies.get("userId");
      if (!userId) {
        toast.error("User session not found. Please login again.");
        return;
      }

      const payload = {
        userId,
        personalDetails,
        employmentDetails,
        education,
        jobExperience,
        skills: values.skills,
        socialLinks: {
          linkedin: values.linkedin,
          github: values.github,
          twitter: values.twitter,
          facebook: values.facebook,
          instagram: values.instagram,
          behance: values.behance,
          skype: values.skype,
          zoomId: values.zoomId,
          googleMeetId: values.googleMeetId,
        },
        resumeUrl: finalResumeUrl,
        resumeName: finalResumeName,
        resumePublicId: finalResumePublicId,
      };

      // 4. Send to API
      await axios.post("/api/user/complete-profile", payload);

      toast.success("Profile completed successfully!");

      // 4. Redirect
      router.push("/dashboard"); // Or wherever the user should go next
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Failed to complete profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
          <div className='flex-1 md:overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent'>
            {/* --- Skills Section --- */}
            <div className='space-y-4 mb-8'>
              <div className='flex md:flex-row flex-col md:items-center justify-between w-full gap-2'>
                <h3 className='text-lg font-semibold flex items-center gap-2'>
                  <Cpu className='h-5 w-5 text-primary' /> Professional Skills
                </h3>
                <span className='text-xs text-muted-foreground'>
                  {currentSkills.length}/15 skills selected
                </span>
              </div>

              <div className='relative space-y-3' ref={wrapperRef}>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                  <Input
                    placeholder='Search or add a skill...'
                    value={skillInput}
                    onChange={(e) => {
                      setSkillInput(e.target.value);
                      setShowSuggestions(true);
                    }}
                    required
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill(skillInput);
                      }
                    }}
                    className='pl-9 input'
                    disabled={currentSkills.length >= 15}
                  />
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && skillInput && (
                  <div className='absolute z-10 w-full bg-popover border rounded-md shadow-md mt-1 overflow-hidden'>
                    <ScrollArea className='h-auto max-h-[200px]'>
                      <div className='p-1'>
                        {filteredSkills.map((skill) => (
                          <button
                            key={skill}
                            type='button'
                            onClick={() => handleAddSkill(skill)}
                            className='w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm flex items-center gap-2 transition-colors'
                          >
                            <Plus className='h-3 w-3' />
                            {skill}
                          </button>
                        ))}
                        {filteredSkills.length === 0 && (
                          <button
                            type='button'
                            onClick={() => handleAddSkill(skillInput)}
                            className='w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm flex items-center gap-2 text-primary font-medium transition-colors'
                          >
                            <Plus className='h-3 w-3' />
                            Create "{skillInput}"
                          </button>
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                )}

                {/* Selected Skills Chips */}
                <div className='flex flex-wrap gap-2 min-h-[40px] p-4 bg-muted/30 rounded-xl border border-dashed'>
                  {currentSkills.length === 0 && (
                    <p className='text-sm text-muted-foreground w-full text-center py-2'>
                      No skills added yet. Search or type above to add.
                    </p>
                  )}
                  {currentSkills.map((skill, index) => (
                    <Badge
                      key={skill.name || index}
                      variant='secondary'
                      className='pl-3 pr-1 py-1 text-sm font-medium hover:bg-secondary/80 transition-colors flex items-center gap-1'
                    >
                      {skill.name}
                      <button
                        type='button'
                        onClick={() => handleRemoveSkill(index)}
                        className='ml-1 hover:bg-background/50 rounded-full p-0.5 transition-colors'
                      >
                        <X className='h-3 w-3' />
                      </button>
                    </Badge>
                  ))}
                </div>
                {form.formState.errors.skills && (
                  <p className='text-sm text-destructive font-medium'>
                    {form.formState.errors.skills.message}
                  </p>
                )}
              </div>
            </div>

            <div className='h-px bg-border mb-8' />

            {/* --- Social Links Section --- */}
            <div className='space-y-6'>
              <div className='flex md:flex-row flex-col md:items-center justify-between w-full gap-2'>
                <h3 className='text-lg font-semibold flex items-center gap-2'>
                  <Globe className='h-5 w-5 text-primary' /> Social Profiles
                </h3>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <CustomFormField
                  control={form.control}
                  name='linkedin'
                  label='LinkedIn'
                  placeholder='https://linkedin.com/in/username'
                  fieldType={FormFieldType.INPUT}
                  icon={Linkedin}
                />
                <CustomFormField
                  control={form.control}
                  name='github'
                  label='GitHub'
                  placeholder='https://github.com/username'
                  fieldType={FormFieldType.INPUT}
                  icon={Github}
                />
                <CustomFormField
                  control={form.control}
                  name='twitter'
                  label='Twitter / X'
                  placeholder='https://twitter.com/username'
                  fieldType={FormFieldType.INPUT}
                  icon={Twitter}
                />
                <CustomFormField
                  control={form.control}
                  name='facebook'
                  label='Facebook'
                  placeholder='https://facebook.com/username'
                  fieldType={FormFieldType.INPUT}
                  icon={Facebook}
                />
                <CustomFormField
                  control={form.control}
                  name='instagram'
                  label='Instagram'
                  placeholder='https://instagram.com/username'
                  fieldType={FormFieldType.INPUT}
                  icon={Instagram}
                />
                <CustomFormField
                  control={form.control}
                  name='behance'
                  label='Behance'
                  placeholder='https://behance.net/username'
                  fieldType={FormFieldType.INPUT}
                  icon={Globe}
                />
                <CustomFormField
                  control={form.control}
                  name='skype'
                  label='Skype ID'
                  placeholder='live:username'
                  fieldType={FormFieldType.INPUT}
                  icon={MessageCircle}
                />
                <CustomFormField
                  control={form.control}
                  name='zoomId'
                  label='Zoom ID'
                  placeholder='Personal Meeting ID'
                  fieldType={FormFieldType.INPUT}
                  icon={Video}
                />
                <CustomFormField
                  control={form.control}
                  name='googleMeetId'
                  label='Google Meet ID'
                  placeholder='meet.google.com/abc-defg-hij'
                  fieldType={FormFieldType.INPUT}
                  icon={Video}
                />
              </div>
            </div>
          </div>

          <div className='shrink-0 flex justify-between pt-4 bg-background mt-4 border-t'>
            <Button type='button' variant='outline' onClick={goPrev} size='lg'>
              Previous
            </Button>
            <Button type='submit' size='lg' disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StepSkills;
