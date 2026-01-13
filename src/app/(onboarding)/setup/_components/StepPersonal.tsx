"use client";
import React from "react";
import { useSetupStore } from "@/store/useSetupStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProgressSteps } from "@/components/global/progress-steps/ProgressStepsContext";

const StepPersonal = () => {
  const { personalDetails, setPersonalDetails } = useSetupStore();
  const { goNext, goPrev } = useProgressSteps();

  const handleChange = (field: string, value: string) => {
    setPersonalDetails({ [field]: value });
  };

  const handleNext = () => {
    // Basic validation could go here
    goNext();
  };

  return (
    <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-2'>
          <Label htmlFor='fullName'>Full Name</Label>
          <Input
            id='fullName'
            placeholder='John Doe'
            value={personalDetails.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='email'>Email Address</Label>
          <Input
            id='email'
            type='email'
            placeholder='john@example.com'
            value={personalDetails.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='contactNumber'>Contact Number</Label>
          <Input
            id='contactNumber'
            placeholder='+1 234 567 890'
            value={personalDetails.contactNumber}
            onChange={(e) => handleChange("contactNumber", e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='gender'>Gender</Label>
          <Select
            value={personalDetails.gender}
            onValueChange={(val) => handleChange("gender", val)}
          >
            <SelectTrigger id='gender'>
              <SelectValue placeholder='Select Gender' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Male'>Male</SelectItem>
              <SelectItem value='Female'>Female</SelectItem>
              <SelectItem value='Other'>Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='dob'>Date of Birth</Label>
          <Input
            id='dob'
            type='date'
            value={personalDetails.dob}
            onChange={(e) => handleChange("dob", e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='cnic'>CNIC / ID Number</Label>
          <Input
            id='cnic'
            placeholder='ID Number'
            value={personalDetails.cnic}
            onChange={(e) => handleChange("cnic", e.target.value)}
          />
        </div>

        <div className='space-y-2 md:col-span-2'>
          <Label htmlFor='address'>Address</Label>
          <Input
            id='address'
            placeholder='123 Main St, Apt 4B'
            value={personalDetails.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='city'>City</Label>
          <Input
            id='city'
            placeholder='New York'
            value={personalDetails.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='country'>Country</Label>
          <Input
            id='country'
            placeholder='USA'
            value={personalDetails.country}
            onChange={(e) => handleChange("country", e.target.value)}
          />
        </div>
      </div>

      <div className='flex justify-between pt-4'>
        <Button variant='outline' onClick={goPrev} size='lg'>
          Previous
        </Button>
        <Button onClick={handleNext} size='lg'>
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default StepPersonal;
