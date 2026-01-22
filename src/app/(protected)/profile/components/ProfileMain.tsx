"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpRight } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
} from "recharts";

// Mock Data
const performanceData = [
  { month: "Jan", score: 65 },
  { month: "Feb", score: 70 },
  { month: "Mar", score: 68 },
  { month: "Apr", score: 75 },
  { month: "May", score: 72 },
  { month: "Jun", score: 80 },
  { month: "Jul", score: 78 },
  { month: "Aug", score: 85 },
  { month: "Sep", score: 82 },
  { month: "Oct", score: 88 },
  { month: "Nov", score: 86 },
  { month: "Dec", score: 90 },
];

const hoursData = [
  { day: "M", hours: 8.5, fill: "#31b099" }, // primary-green
  { day: "T", hours: 7.5, fill: "#31b099" },
  { day: "W", hours: 4.0, fill: "#31b099" },
  { day: "T", hours: 9.0, fill: "#114a42" }, // dark green
  { day: "F", hours: 7.0, fill: "#31b099" },
  { day: "S", hours: 0, fill: "#e2e8f0" },
  { day: "S", hours: 0, fill: "#e2e8f0" },
];

const leavesData = [
  {
    label: "All Leaves",
    value: 14,
    total: 20,
    color: "#114a42",
    subtext: "Days",
  },
  {
    label: "Annual Leaves",
    value: 10,
    total: 15,
    color: "#31b099",
    subtext: "Days",
  },
  {
    label: "Casual Leaves",
    value: 8,
    total: 24,
    color: "#31b099",
    subtext: "Hours",
  },
  {
    label: "Sick Leaves",
    value: 3,
    total: 4,
    color: "#31b099",
    subtext: "Days",
  },
];

const LeafCard = ({
  label,
  value,
  total,
  color,
  subtext,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
  subtext: string;
}) => {
  const percentage = (value / total) * 100;
  const data = [
    { name: "used", value: value, fill: color },
    { name: "remaining", value: total - value, fill: "#e2e8f0" },
  ];

  return (
    <Card className='flex flex-col items-center justify-center p-6 border-none shadow-sm bg-[#f0fdf4] dark:bg-card'>
      <h3 className='text-sm font-medium text-muted-foreground mb-4'>
        {label}
      </h3>
      <div className='relative h-32 w-32'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              innerRadius={45}
              outerRadius={55}
              startAngle={90}
              endAngle={-270}
              dataKey='value'
              stroke='none'
              cornerRadius={10}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className='absolute inset-0 flex flex-col items-center justify-center'>
          <span className='text-2xl font-bold text-foreground'>
            {value}
            <span className='text-sm text-muted-foreground'>/{total}</span>
          </span>
          <span className='text-xs text-muted-foreground'>{subtext}</span>
        </div>
      </div>
    </Card>
  );
};

export function ProfileMain() {
  return (
    <div className='space-y-6'>
      {/* Leaves Summary */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {leavesData.map((leaf, index) => (
          <LeafCard key={index} {...leaf} />
        ))}
      </div>

      {/* Performance Overview */}
      <Card className='border-none shadow-sm'>
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <div>
            <CardTitle className='text-lg font-semibold'>
              Performance Overview
            </CardTitle>
          </div>
          <Button
            variant='outline'
            size='sm'
            className='h-8 text-xs bg-gray-100 border-none'
          >
            Last Year <span className='ml-1'>▼</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className='mb-6'>
            <div className='text-4xl font-bold text-foreground'>86.75%</div>
            <div className='flex items-center gap-2 mt-1'>
              <span className='bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium flex items-center'>
                <ArrowUpRight className='h-3 w-3 mr-1' /> +2.05%
              </span>
              <span className='text-sm text-muted-foreground'>
                Increased by last year
              </span>
            </div>
          </div>
          <div className='h-[200px] w-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id='colorScore' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#31b099' stopOpacity={0.1} />
                    <stop offset='95%' stopColor='#31b099' stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray='3 3'
                  stroke='#f0f0f0'
                />
                <XAxis
                  dataKey='month'
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  dy={10}
                />
                <YAxis hide domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  cursor={{
                    stroke: "#31b099",
                    strokeWidth: 1,
                    strokeDasharray: "4 4",
                  }}
                />
                <Area
                  type='monotone'
                  dataKey='score'
                  stroke='#114a42'
                  strokeWidth={3}
                  fillOpacity={1}
                  fill='url(#colorScore)'
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Hours Logged & Internal Notes Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Hours Logged */}
        <Card className='border-none shadow-sm'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-lg font-semibold'>
              Hours Logged
            </CardTitle>
            <Button
              variant='outline'
              size='sm'
              className='h-8 text-xs bg-gray-100 border-none'
            >
              This Week <span className='ml-1'>▼</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className='mb-6'>
              <span className='text-3xl font-bold text-foreground'>34</span>
              <span className='text-sm text-muted-foreground ml-1'>h</span>
              <span className='text-3xl font-bold text-foreground ml-2'>
                30
              </span>
              <span className='text-sm text-muted-foreground ml-1'>m</span>
            </div>
            <div className='h-[200px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={hoursData} barSize={32}>
                  <XAxis
                    dataKey='day'
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#9ca3af" }}
                    dy={10}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar dataKey='hours' radius={[4, 4, 4, 4]}>
                    {hoursData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Internal Notes */}
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h3 className='font-semibold text-lg'>Internal Notes</h3>
            <Button variant='ghost' size='icon' className='h-8 w-8'>
              <MoreHorizontal className='h-5 w-5 text-muted-foreground' />
            </Button>
          </div>

          <Card className='border-none shadow-sm bg-[#fcfcfc] dark:bg-card'>
            <CardContent className='p-5'>
              <div className='flex justify-between items-start mb-2'>
                <h4 className='font-semibold text-sm'>Promotion Feedback</h4>
                <span className='text-xs text-muted-foreground'>
                  10 January 2035
                </span>
              </div>
              <p className='text-xs text-muted-foreground leading-relaxed'>
                Promoted from HR Assistant to HR Officer due to consistent
                performance and leadership in onboarding initiatives.
              </p>
            </CardContent>
          </Card>

          <Card className='border-none shadow-sm bg-[#fcfcfc] dark:bg-card'>
            <CardContent className='p-5'>
              <div className='flex justify-between items-start mb-2'>
                <h4 className='font-semibold text-sm'>Employee Appreciation</h4>
                <span className='text-xs text-muted-foreground'>
                  02 May 2035
                </span>
              </div>
              <p className='text-xs text-muted-foreground leading-relaxed'>
                Recognized by the Head of HR for successfully leading the Q2
                training rollout with a 98% participation rate.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
