"use client";

import React from "react";
import { useSetupStore } from "@/store/useSetupStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useProgressSteps } from "@/components/global/progress-steps/ProgressStepsContext";

const StepEmployment = () => {
  const { employmentDetails, setEmploymentDetails } = useSetupStore();
  const { goNext, goPrev } = useProgressSteps();

  const handleChange = (field: string, value: string) => {
    setEmploymentDetails({ [field]: value });
  };

  return (
    <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-2'>
          <Label htmlFor='department'>Department</Label>
          <Input
            id='department'
            placeholder='Engineering'
            value={employmentDetails.department}
            onChange={(e) => handleChange("department", e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='designation'>Designation</Label>
          <Input
            id='designation'
            placeholder='Senior Developer'
            value={employmentDetails.designation}
            onChange={(e) => handleChange("designation", e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='doj'>Date of Joining</Label>
          <Input
            id='doj'
            type='date'
            value={employmentDetails.doj}
            onChange={(e) => handleChange("doj", e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='salary'>Salary</Label>
          <Input
            id='salary'
            placeholder='50000'
            value={employmentDetails.salary}
            onChange={(e) => handleChange("salary", e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='contractStartDate'>Contract Start Date</Label>
          <Input
            id='contractStartDate'
            type='date'
            value={employmentDetails.contractStartDate}
            onChange={(e) => handleChange("contractStartDate", e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='contractEndDate'>Contract End Date</Label>
          <Input
            id='contractEndDate'
            type='date'
            value={employmentDetails.contractEndDate}
            onChange={(e) => handleChange("contractEndDate", e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='officeTimingIn'>Office Timing In</Label>
          <Input
            id='officeTimingIn'
            type='time'
            value={employmentDetails.officeTimingIn}
            onChange={(e) => handleChange("officeTimingIn", e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='officeTimingOut'>Office Timing Out</Label>
          <Input
            id='officeTimingOut'
            type='time'
            value={employmentDetails.officeTimingOut}
            onChange={(e) => handleChange("officeTimingOut", e.target.value)}
          />
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

export default StepEmployment;
