"use client";

import React from "react";
import { useSetupStore, Education, JobExperience } from "@/store/useSetupStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useProgressSteps } from "@/components/global/progress-steps/ProgressStepsContext";
import { Plus, Trash2, Briefcase, GraduationCap } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const StepExperience = () => {
  const { education, jobExperience, setEducation, setJobExperience } =
    useSetupStore();
  const { goNext, goPrev } = useProgressSteps();

  // --- Education Handlers ---
  const addEducation = () => {
    setEducation([
      ...education,
      {
        id: crypto.randomUUID(),
        university: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        grade: "",
      },
    ]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id));
  };

  const updateEducation = (
    id: string,
    field: keyof Education,
    value: string
  ) => {
    setEducation(
      education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  // --- Experience Handlers ---
  const addExperience = () => {
    setJobExperience([
      ...jobExperience,
      {
        id: crypto.randomUUID(),
        jobTitle: "",
        companyName: "",
        employmentType: "",
        location: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
      },
    ]);
  };

  const removeExperience = (id: string) => {
    setJobExperience(jobExperience.filter((exp) => exp.id !== id));
  };

  const updateExperience = (
    id: string,
    field: keyof JobExperience,
    value: any
  ) => {
    setJobExperience(
      jobExperience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  return (
    <div className='space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500'>
      {/* --- Education Section --- */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-semibold flex items-center gap-2'>
            <GraduationCap className='h-5 w-5 text-primary' /> Education
          </h3>
          <Button onClick={addEducation} variant='outline' size='sm'>
            <Plus className='h-4 w-4 mr-2' /> Add Education
          </Button>
        </div>

        {education.length === 0 && (
          <div className='text-center py-8 border-2 border-dashed rounded-xl text-muted-foreground text-sm'>
            No education details added yet.
          </div>
        )}

        <div className='space-y-6'>
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className='relative p-6 rounded-xl border bg-card/50 space-y-4'
            >
              <Button
                variant='ghost'
                size='icon'
                className='absolute top-2 right-2 text-destructive hover:text-destructive/80'
                onClick={() => removeEducation(edu.id)}
              >
                <Trash2 className='h-4 w-4' />
              </Button>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label>University / Institute</Label>
                  <Input
                    value={edu.university}
                    onChange={(e) =>
                      updateEducation(edu.id, "university", e.target.value)
                    }
                    placeholder='Harvard University'
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(edu.id, "degree", e.target.value)
                    }
                    placeholder='Bachelor of Science'
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Field of Study</Label>
                  <Input
                    value={edu.fieldOfStudy}
                    onChange={(e) =>
                      updateEducation(edu.id, "fieldOfStudy", e.target.value)
                    }
                    placeholder='Computer Science'
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Grade / GPA</Label>
                  <Input
                    value={edu.grade}
                    onChange={(e) =>
                      updateEducation(edu.id, "grade", e.target.value)
                    }
                    placeholder='3.8'
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Start Date</Label>
                  <Input
                    type='date'
                    value={edu.startDate}
                    onChange={(e) =>
                      updateEducation(edu.id, "startDate", e.target.value)
                    }
                  />
                </div>
                <div className='space-y-2'>
                  <Label>End Date</Label>
                  <Input
                    type='date'
                    value={edu.endDate}
                    onChange={(e) =>
                      updateEducation(edu.id, "endDate", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='h-px bg-border' />

      {/* --- Experience Section --- */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-semibold flex items-center gap-2'>
            <Briefcase className='h-5 w-5 text-primary' /> Job Experience
          </h3>
          <Button onClick={addExperience} variant='outline' size='sm'>
            <Plus className='h-4 w-4 mr-2' /> Add Experience
          </Button>
        </div>

        {jobExperience.length === 0 && (
          <div className='text-center py-8 border-2 border-dashed rounded-xl text-muted-foreground text-sm'>
            No job experience added yet.
          </div>
        )}

        <div className='space-y-6'>
          {jobExperience.map((exp, index) => (
            <div
              key={exp.id}
              className='relative p-6 rounded-xl border bg-card/50 space-y-4'
            >
              <Button
                variant='ghost'
                size='icon'
                className='absolute top-2 right-2 text-destructive hover:text-destructive/80'
                onClick={() => removeExperience(exp.id)}
              >
                <Trash2 className='h-4 w-4' />
              </Button>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label>Job Title</Label>
                  <Input
                    value={exp.jobTitle}
                    onChange={(e) =>
                      updateExperience(exp.id, "jobTitle", e.target.value)
                    }
                    placeholder='Software Engineer'
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Company Name</Label>
                  <Input
                    value={exp.companyName}
                    onChange={(e) =>
                      updateExperience(exp.id, "companyName", e.target.value)
                    }
                    placeholder='Tech Corp'
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Location</Label>
                  <Input
                    value={exp.location}
                    onChange={(e) =>
                      updateExperience(exp.id, "location", e.target.value)
                    }
                    placeholder='San Francisco, CA'
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Employment Type</Label>
                  <Input
                    value={exp.employmentType}
                    onChange={(e) =>
                      updateExperience(exp.id, "employmentType", e.target.value)
                    }
                    placeholder='Full-time'
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Start Date</Label>
                  <Input
                    type='date'
                    value={exp.startDate}
                    onChange={(e) =>
                      updateExperience(exp.id, "startDate", e.target.value)
                    }
                  />
                </div>
                <div className='space-y-2'>
                  <Label>End Date</Label>
                  <Input
                    type='date'
                    disabled={exp.currentlyWorking}
                    value={exp.endDate}
                    onChange={(e) =>
                      updateExperience(exp.id, "endDate", e.target.value)
                    }
                  />
                </div>
                <div className='flex items-center space-x-2 md:col-span-2'>
                  <Checkbox
                    id={`current-${exp.id}`}
                    checked={exp.currentlyWorking}
                    onCheckedChange={(checked) =>
                      updateExperience(exp.id, "currentlyWorking", checked)
                    }
                  />
                  <Label htmlFor={`current-${exp.id}`}>
                    I am currently working here
                  </Label>
                </div>
                <div className='space-y-2 md:col-span-2'>
                  <Label>Description</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) =>
                      updateExperience(exp.id, "description", e.target.value)
                    }
                    placeholder='Describe your responsibilities...'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-between pt-4'>
        <Button variant='outline' onClick={goPrev} size='lg'>
          Previous
        </Button>
        <Button onClick={goNext} size='lg'>
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default StepExperience;
