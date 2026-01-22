"use client";

import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function ProfileWidgets() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const documents = [
    { name: "Performance Evaluations.pdf", size: "1.24 MB", type: "PDF" },
    { name: "Contract Agreement.pdf", size: "895 KB", type: "PDF" },
    { name: "Curriculum Vitae.pdf", size: "1.27 MB", type: "PDF" },
    { name: "Portfolio.pdf", size: "3.68 MB", type: "PDF" },
  ];

  const payrollItems = [
    { label: "Base Salary", value: "$3,200", isBold: true },
    { label: "Transportation", value: "$120" },
    { label: "Meal", value: "$110" },
    { label: "Internet (Hybrid)", value: "$70" },
    { label: "Health Insurance", value: "$120" },
    { label: "Life Insurance", value: "$40" },
    { label: "Company Device", value: "$65" },
    { label: "Training Program", value: "$80" },
    { label: "Fitness Membership", value: "$50" },
  ];

  return (
    <div className='space-y-8'>
      {/* Calendar */}
      <div className='bg-transparent'>
        <div className='flex items-center justify-between mb-4 px-2'>
          <h3 className='font-semibold text-lg'>
            June 2035{" "}
            <span className='text-muted-foreground text-sm ml-1'>▼</span>
          </h3>
          <div className='flex gap-1'>
            <Button
              variant='outline'
              size='icon'
              className='h-8 w-8 rounded-lg bg-gray-100 border-none'
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              className='h-8 w-8 rounded-lg bg-gray-100 border-none'
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          className='rounded-md border-none w-full p-0'
          classNames={{
            head_cell: "text-muted-foreground font-normal text-[0.8rem] w-9",
            cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 rounded-md",
            day_selected:
              "bg-[#114a42] text-white hover:bg-[#114a42] hover:text-white focus:bg-[#114a42] focus:text-white rounded-md",
            day_today: "bg-accent text-accent-foreground",
          }}
        />
        <div className='flex justify-between mt-4 px-2'>
          <div className='flex items-center gap-2'>
            <div className='w-1 h-4 bg-green-200'></div>
            <div className='flex flex-col'>
              <span className='text-[10px] text-muted-foreground'>Present</span>
              <span className='text-xs font-bold'>13</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-1 h-4 bg-teal-500'></div>
            <div className='flex flex-col'>
              <span className='text-[10px] text-muted-foreground'>Late</span>
              <span className='text-xs font-bold'>5</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-1 h-4 bg-[#114a42]'></div>
            <div className='flex flex-col'>
              <span className='text-[10px] text-muted-foreground'>
                On Leave
              </span>
              <span className='text-xs font-bold'>2</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-1 h-4 bg-gray-200'></div>
            <div className='flex flex-col'>
              <span className='text-[10px] text-muted-foreground'>Absent</span>
              <span className='text-xs font-bold'>1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payroll Summary */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='font-semibold text-lg'>Payroll Summary</h3>
          <Button variant='ghost' size='icon' className='h-8 w-8'>
            <MoreHorizontal className='h-5 w-5 text-muted-foreground' />
          </Button>
        </div>
        <Card className='border-none shadow-none bg-transparent'>
          <CardContent className='p-0'>
            <div className='flex justify-between items-center py-2 px-4 bg-gray-50 dark:bg-card rounded-t-xl mb-4'>
              <span className='text-xs text-muted-foreground'>Description</span>
              <div className='text-right'>
                <span className='text-xs text-muted-foreground block'>
                  Amount
                </span>
                <span className='text-[10px] text-muted-foreground block'>
                  USD/month
                </span>
              </div>
            </div>

            <div className='space-y-3 px-2'>
              {payrollItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center ${
                    item.label === "Base Salary" ? "mb-6" : ""
                  }`}
                >
                  <span
                    className={`text-sm ${
                      item.isBold ? "font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`text-sm ${
                      item.isBold ? "font-bold" : "font-semibold"
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
              <div className='h-px bg-gray-100 my-4'></div>
              <div className='flex justify-between items-center pt-2'>
                <span className='text-sm font-medium'>Total Monthly Value</span>
                <span className='text-sm font-bold'>$3,855</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='font-semibold text-lg'>Documents</h3>
          <Button variant='ghost' size='icon' className='h-8 w-8'>
            <MoreHorizontal className='h-5 w-5 text-muted-foreground' />
          </Button>
        </div>
        <div className='space-y-3'>
          {documents.map((doc, index) => (
            <div key={index} className='flex items-center gap-3'>
              <div className='h-10 w-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400'>
                <FileText className='h-5 w-5' />
              </div>
              <div>
                <p className='text-sm font-medium'>{doc.name}</p>
                <p className='text-xs text-muted-foreground'>
                  {doc.type} &middot; {doc.size}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
