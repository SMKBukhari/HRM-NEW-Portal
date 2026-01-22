import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Linkedin,
  Twitter,
  Instagram,
  User,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Building2,
  Clock,
} from "lucide-react";

export function ProfileSidebar() {
  return (
    <div className='space-y-6'>
      {/* Profile Card */}
      <Card className='flex flex-col items-center p-6 text-center border-none shadow-sm bg-white dark:bg-card'>
        <div className='relative mb-4'>
          <Avatar className='h-24 w-24 rounded-2xl'>
            <AvatarImage src='https://github.com/shadcn.png' alt='Mia Torres' />
            <AvatarFallback className='rounded-2xl'>MT</AvatarFallback>
          </Avatar>
        </div>
        <h2 className='text-xl font-bold text-foreground'>Mia Torres</h2>
        <p className='text-sm text-muted-foreground mb-3'>
          HR Officer &middot; Human Resources
        </p>
        <div className='flex items-center gap-2 mb-6'>
          <Badge
            variant='secondary'
            className='px-3 py-1 text-xs font-normal bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-100'
          >
            EMP-0289
          </Badge>
          <Badge className='px-3 py-1 text-xs font-normal bg-emerald-500 hover:bg-emerald-600 text-white border-none'>
            Active
          </Badge>
        </div>

        <div className='w-full space-y-4'>
          <div className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl'>
            <span className='text-sm text-muted-foreground'>
              Employment Type
            </span>
            <span className='text-sm font-semibold'>Full-Time</span>
          </div>
          <div className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl'>
            <span className='text-sm text-muted-foreground'>Work Model</span>
            <span className='text-sm font-semibold'>Hybrid</span>
          </div>
          <div className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl'>
            <span className='text-sm text-muted-foreground'>Join Date</span>
            <span className='text-sm font-semibold'>14 February 2033</span>
          </div>
        </div>

        <div className='flex gap-2 mt-6'>
          <Button
            size='icon'
            variant='ghost'
            className='h-8 w-8 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-primary hover:bg-blue-50'
          >
            <Linkedin className='h-4 w-4' />
          </Button>
          <Button
            size='icon'
            variant='ghost'
            className='h-8 w-8 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-primary hover:bg-blue-50'
          >
            <Twitter className='h-4 w-4' />
          </Button>
          <Button
            size='icon'
            variant='ghost'
            className='h-8 w-8 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-primary hover:bg-blue-50'
          >
            <Instagram className='h-4 w-4' />
          </Button>
        </div>
      </Card>

      {/* Personal Info */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='font-semibold text-lg'>Personal Info</h3>
          <Button variant='ghost' size='icon' className='h-8 w-8'>
            <span className='sr-only'>More</span>
            <svg
              width='15'
              height='3'
              viewBox='0 0 15 3'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='fill-muted-foreground'
            >
              <circle cx='1.5' cy='1.5' r='1.5' />
              <circle cx='7.5' cy='1.5' r='1.5' />
              <circle cx='13.5' cy='1.5' r='1.5' />
            </svg>
          </Button>
        </div>

        <Card className='border-none shadow-none bg-transparent'>
          <CardContent className='p-0 space-y-6'>
            <div className='flex items-start gap-4'>
              <div className='p-2.5 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-600 dark:text-green-400'>
                <User className='h-5 w-5' />
              </div>
              <div>
                <p className='text-xs text-muted-foreground'>Gender</p>
                <p className='text-sm font-semibold mt-0.5'>Female</p>
              </div>
            </div>
            <div className='flex items-start gap-4'>
              <div className='p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400'>
                <Calendar className='h-5 w-5' />
              </div>
              <div>
                <p className='text-xs text-muted-foreground'>Date of Birth</p>
                <p className='text-sm font-semibold mt-0.5'>28 March 1993</p>
              </div>
            </div>
            <div className='flex items-start gap-4'>
              <div className='p-2.5 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600 dark:text-purple-400'>
                <Mail className='h-5 w-5' />
              </div>
              <div>
                <p className='text-xs text-muted-foreground'>Email Address</p>
                <p className='text-sm font-semibold mt-0.5 break-all'>
                  mia.torres@company.com
                </p>
              </div>
            </div>
            <div className='flex items-start gap-4'>
              <div className='p-2.5 bg-orange-50 dark:bg-orange-900/20 rounded-xl text-orange-600 dark:text-orange-400'>
                <Phone className='h-5 w-5' />
              </div>
              <div>
                <p className='text-xs text-muted-foreground'>Phone</p>
                <p className='text-sm font-semibold mt-0.5'>
                  +62 812-3456-7890
                </p>
              </div>
            </div>
            <div className='flex items-start gap-4'>
              <div className='p-2.5 bg-teal-50 dark:bg-teal-900/20 rounded-xl text-teal-600 dark:text-teal-400'>
                <MapPin className='h-5 w-5' />
              </div>
              <div>
                <p className='text-xs text-muted-foreground'>Address</p>
                <p className='text-sm font-semibold mt-0.5'>
                  Jl. Melati No. 45, Sleman, Yogyakarta, Indonesia
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
