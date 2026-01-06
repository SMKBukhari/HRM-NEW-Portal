import { GoogleGenerativeAI } from "@google/generative-ai";
// import { db } from "@/lib/db";
import { prisma } from "@/lib/prisma";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI("AIzaSyACThcmJesW8hVaVQ0TQBD7w7T_e70QJZg");

// Professional HR-focused system prompt
const HRM_SYSTEM_PROMPT = `
You are "Aria" - a professional HR assistant for our company's Human Resource Management System.

**YOUR IDENTITY:**
- Name: Aria (HR Assistant)
- Tone: Professional, friendly, and helpful
- Style: Conversational but business-appropriate
- Knowledge: Complete HRMS database and policies

**KEY GUIDELINES:**
1. Always address employees by their real name when available
2. Provide accurate, specific answers based on actual company data
3. Keep responses concise and actionable
4. Use natural human language - no markdown, no asterisks, no robotic formatting
5. Focus on practical HR matters employees actually ask about
6. If you don't have specific data, guide them to the right resource
7. Maintain complete professionalism while being approachable

**AREAS YOU CAN HELP WITH:**
- Attendance and time tracking
- Leave balances and applications
- Contract and employment details
- Payroll and compensation
- Performance reviews
- Company policies
- Benefits information
- Training opportunities
- Work schedules
- Document requests

**RESPONSE FORMAT:**
- Greet by name when known
- Answer directly and specifically
- Provide next steps when applicable
- Keep it conversational but professional
- Use natural paragraph breaks
`;

export class GeminiAIService {
  private model;
  private currentUser: any = null;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  }

  setCurrentUser(user: any) {
    this.currentUser = user;
  }

  async generateResponse(
    userMessage: string,
    conversationHistory: Array<{ role: string; content: string }> = []
  ): Promise<string> {
    try {
      if (!this.currentUser) {
        throw new Error("User context not available");
      }

      // Fetch real data from database based on user query
      const userData = await this.fetchUserDataFromDatabase(userMessage);

      // Build personalized context with real data
      let personalizedPrompt = HRM_SYSTEM_PROMPT;
      personalizedPrompt += `\n\nCurrent Employee: ${
        this.currentUser.fullName
      }\nEmployee ID: ${this.currentUser.userId}\nDepartment: ${
        this.currentUser.department?.name || "Not specified"
      }\n\n`;

      // Add real user data to context
      personalizedPrompt += `EMPLOYEE DATA FROM DATABASE:\n${JSON.stringify(
        userData,
        null,
        2
      )}\n\n`;
      personalizedPrompt += `IMPORTANT: Use the above real data from our HR database to answer questions accurately. Do not make up or invent data.\n\n`;

      // Build conversation context
      let conversationContext =
        personalizedPrompt + "\n\nConversation Context:\n";

      if (conversationHistory.length > 0) {
        conversationHistory.slice(-6).forEach((message) => {
          conversationContext += `${
            message.role === "user" ? "Employee" : "Aria"
          }: ${message.content}\n`;
        });
        conversationContext += "\n";
      }

      conversationContext += `Employee: ${userMessage}\n\nAria:`;

      const result = await this.model.generateContent(conversationContext);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error generating AI response:", error);
      throw new Error(
        "I'm having trouble accessing your HR data right now. Please try again in a moment."
      );
    }
  }

  async parseResume(fileBuffer: Buffer, mimeType: string): Promise<any> {
    try {
      const prompt = `
        You are an expert HR resume parser. 
        Extract the following details from the uploaded resume document and return ONLY valid JSON.
        Do not include markdown formatting (like \`\`\`json). Just the raw JSON object.
        
        Fields to extract:
        - fullName (string)
        - email (string)
        - contactNumber (string)
        - gender (string: "Male", "Female", or "Other" - guess based on context if obvious, else null)
        - city (string)
        - country (string)
        - DOB (string: YYYY-MM-DD format if found, else null)
      `;

      const imagePart = {
        inlineData: {
          data: fileBuffer.toString("base64"),
          mimeType: mimeType,
        },
      };

      const result = await this.model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();

      // Clean up markdown code blocks if AI adds them despite instruction
      const jsonString = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Error parsing resume with AI:", error);
      throw new Error("Failed to parse resume with AI");
    }
  }

  private async fetchUserDataFromDatabase(userMessage: string): Promise<any> {
    const userId = this.currentUser.userId;
    const data: any = {};

    try {
      // Check what type of data the user is asking for and fetch accordingly
      const message = userMessage.toLowerCase();

      // Fetch basic user profile
      data.userProfile = await prisma.userProfile.findUnique({
        where: { userId },
        select: {
          fullName: true,
          email: true,
          department: { select: { name: true } },
          designation: true,
          DOJ: true,
          salary: true,
          contractStartDate: true,
          contractEndDate: true,
          totalYearlyLeaves: true,
          totalMonthlyLeaves: true,
          totalLeavesTaken: true,
          totalLeavesBalance: true,
          officeTimingIn: true,
          OfficeTimingOut: true,
        },
      });

      // Attendance data
      if (
        message.includes("attendance") ||
        message.includes("present") ||
        message.includes("absent")
      ) {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        data.attendance = await prisma.attendence.findMany({
          where: {
            userId,
            date: {
              gte: startOfMonth,
              lte: today,
            },
          },
          include: {
            workStatus: true,
            checkLog: true,
          },
          orderBy: { date: "desc" },
          take: 10,
        });

        data.todayAttendance = await prisma.attendence.findFirst({
          where: {
            userId,
            date: {
              equals: new Date(today.setHours(0, 0, 0, 0)),
            },
          },
          include: {
            workStatus: true,
            checkLog: true,
          },
        });
      }

      // Leave data
      if (
        message.includes("leave") ||
        message.includes("vacation") ||
        message.includes("holiday")
      ) {
        data.leaveBalance = {
          yearly: data.userProfile?.totalYearlyLeaves,
          monthly: data.userProfile?.totalMonthlyLeaves,
          taken: data.userProfile?.totalLeavesTaken,
          balance: data.userProfile?.totalLeavesBalance,
        };

        data.recentLeaveRequests = await prisma.leaveRequest.findMany({
          where: { userId },
          include: { leaveType: true },
          orderBy: { createdAt: "desc" },
          take: 5,
        });

        data.publicHolidays = await prisma.publicHoliday.findMany({
          where: {
            OR: [{ isForAll: true }, { employees: { some: { userId } } }],
            date: { gte: new Date() },
          },
          orderBy: { date: "asc" },
          take: 10,
        });
      }

      // Payroll data
      if (
        message.includes("salary") ||
        message.includes("pay") ||
        message.includes("payment")
      ) {
        data.salaryInfo = {
          currentSalary: data.userProfile?.salary,
          nextPayday: this.calculateNextPayday(), // You can implement this based on your payroll schedule
        };
      }

      // Contract data
      if (
        message.includes("contract") ||
        message.includes("renew") ||
        message.includes("expire")
      ) {
        data.contractInfo = {
          startDate: data.userProfile?.contractStartDate,
          endDate: data.userProfile?.contractEndDate,
          renewals: await prisma.contractRenewal.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
          }),
        };
      }

      // Performance data
      if (
        message.includes("performance") ||
        message.includes("review") ||
        message.includes("appraisal")
      ) {
        data.performanceReviews = await prisma.appraisal.findMany({
          where: { userId },
          orderBy: { appraisalDate: "desc" },
          take: 3,
        });
      }

      // Work schedule data
      if (
        message.includes("schedule") ||
        message.includes("timing") ||
        message.includes("shift")
      ) {
        data.workSchedule = await prisma.timeTable.findMany({
          where: { userId },
          orderBy: { date: "desc" },
          take: 7,
        });

        data.officeTimings = {
          in: data.userProfile?.officeTimingIn,
          out: data.userProfile?.OfficeTimingOut,
        };
      }

      // Recent notifications
      data.recentNotifications = await prisma.notifications.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
      });

      // Pending requests
      data.pendingRequests = await prisma.requests.findMany({
        where: {
          userId,
          status: "Pending",
        },
        include: { RequestCategory: true },
        take: 5,
      });
    } catch (error) {
      console.error("Error fetching user data from database:", error);
      data.fetchError = "Unable to fetch some data from database";
    }

    return data;
  }

  private calculateNextPayday(): string {
    // Implement your payday calculation logic here
    // For example, if payday is every 1st of the month:
    const today = new Date();
    const nextPayday = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    return nextPayday.toISOString().split("T")[0];
  }

  // Realistic quick responses based on actual employee needs
  getQuickResponses(): Array<{ id: string; text: string; category: string }> {
    return [
      {
        id: "attendance-today",
        text: "What's my attendance status today?",
        category: "Attendance",
      },
      {
        id: "leave-balance",
        text: "How many leaves do I have left?",
        category: "Leave",
      },
      {
        id: "payroll-date",
        text: "When is the next payday?",
        category: "Payroll",
      },
      {
        id: "contract-details",
        text: "When does my contract expire?",
        category: "Employment",
      },
      {
        id: "upcoming-review",
        text: "When is my next performance review?",
        category: "Performance",
      },
      {
        id: "benefits-info",
        text: "What benefits am I eligible for?",
        category: "Benefits",
      },
      {
        id: "wfh-policy",
        text: "What's the work from home policy?",
        category: "Policies",
      },
      {
        id: "overtime-query",
        text: "How is overtime calculated?",
        category: "Compensation",
      },
    ];
  }

  // Generate contextual suggestions based on actual HR queries
  async generateSuggestions(userInput: string): Promise<string[]> {
    const input = userInput.toLowerCase();
    const suggestions: string[] = [];

    // Attendance related
    if (
      input.includes("attendance") ||
      input.includes("present") ||
      input.includes("absent")
    ) {
      suggestions.push(
        "Show my attendance for this month",
        "How to mark my attendance?",
        "Attendance policy explanation"
      );
    }

    // Leave related
    if (
      input.includes("leave") ||
      input.includes("vacation") ||
      input.includes("holiday")
    ) {
      suggestions.push(
        "Apply for leave",
        "Check my leave balance",
        "Leave application status"
      );
    }

    // Contract related
    if (
      input.includes("contract") ||
      input.includes("renew") ||
      input.includes("expire")
    ) {
      suggestions.push(
        "My contract end date",
        "Contract renewal process",
        "Employment terms"
      );
    }

    // Payroll related
    if (
      input.includes("salary") ||
      input.includes("pay") ||
      input.includes("payment")
    ) {
      suggestions.push(
        "Salary slip for last month",
        "Payroll schedule",
        "Deduction details"
      );
    }

    // Performance related
    if (
      input.includes("performance") ||
      input.includes("review") ||
      input.includes("appraisal")
    ) {
      suggestions.push(
        "My performance review schedule",
        "Performance feedback",
        "Goal setting process"
      );
    }

    // Default suggestions
    if (suggestions.length === 0) {
      suggestions.push(
        "My current work schedule",
        "Upcoming public holidays",
        "Team meeting schedule"
      );
    }

    return suggestions.slice(0, 3);
  }

  // Cleanup Prisma connection
  // async disconnect() {
  //   await db.$disconnect();
  // }
}

export const geminiAI = new GeminiAIService();
