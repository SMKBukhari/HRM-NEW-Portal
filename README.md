# RMSTTI - HRM & Project Management Portal

This is a comprehensive Human Resource Management (HRM) and Project Management System (PMS) built with modern web technologies. It features role-based access control, employee management, attendance tracking, leave management, recruitment, and a full-fledged project management suite with Kanban boards.

## 🛠 Tech Stack & Libraries

This project is built using the following core technologies and libraries. Versions specified are as of the current build.

### Core Framework
- **[Next.js](https://nextjs.org/) (v16.1.1)**: The React framework for the web, utilizing the App Router for routing and Server Actions for backend logic.
- **[React](https://react.dev/) (v19.2.3)**: The library for web and native user interfaces.
- **[TypeScript](https://www.typescriptlang.org/) (v5)**: Strongly typed JavaScript for better developer experience and code quality.

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/) (v4)**: A utility-first CSS framework for rapid UI development.
- **[Radix UI](https://www.radix-ui.com/)**: Unstyled, accessible components for building high-quality design systems. Used for Dialogs, Popovers, Selects, Tabs, Tooltips, etc.
- **[Framer Motion](https://www.framer.com/motion/) (v12.23.26)**: A production-ready motion library for React, used for animations and transitions.
- **[Lucide React](https://lucide.dev/) (v0.562.0)**: Beautiful & consistent icon toolkit.
- **[Sonner](https://sonner.emilkowal.ski/) (v2.0.7)**: An opinionated toast component for React.
- **[Class Variance Authority (CVA)](https://cva.style/)**: For creating type-safe UI component variants.

### Database & Backend
- **[Prisma](https://www.prisma.io/) (v7.2.0)**: Next-generation ORM for Node.js and TypeScript. Configured with `@prisma/adapter-mariadb` for optimal performance and compatibility with self-hosted MariaDB instances.
- **[MariaDB](https://mariadb.org/)**: The open-source relational database used for data storage. The application uses the `mariadb` driver via the Prisma adapter.
- **[Zod](https://zod.dev/) (v4.3.4)**: TypeScript-first schema declaration and validation library.

### State Management & Forms
- **[Zustand](https://zustand-demo.pmnd.rs/) (v5.0.9)**: A small, fast, and scalable bearbones state-management solution.
- **[React Hook Form](https://react-hook-form.com/) (v7.69.0)**: Performant, flexible and extensible forms with easy validation.

### Utilities
- **[date-fns](https://date-fns.org/) (v4.1.0)**: Modern JavaScript date utility library.
- **[Axios](https://axios-http.com/) (v1.13.2)**: Promise based HTTP client for the browser and node.js.
- **[Mammoth](https://github.com/mwilliamson/mammoth.js) (v1.11.0)**: For converting .docx files to HTML (used in resume parsing/viewing).
- **[PDF2JSON](https://github.com/modesty/pdf2json) (v4.0.0)**: For parsing PDF files.

---

## 📂 Source Code Explanation

The project follows a standard Next.js App Router structure. Here is a detailed breakdown of the key directories and files:

### 1. `/src/app` (Application Routes)
This directory contains all the routes of the application.
- **`(auth)`**: Contains authentication-related pages like Login, Register, Forgot Password. These are grouped to share a common layout if needed.
- **`(protected)`**: Contains routes that require user authentication (Dashboard, Projects, Employees, etc.). Protected by middleware.
- **`api`**: Contains Next.js API Routes / Route Handlers for backend logic that isn't handled by Server Actions.
- **`globals.css`**: Global CSS styles and Tailwind directives.
- **`layout.tsx`**: The root layout file that wraps the entire application.
- **`page.tsx`**: The entry point (Landing page or redirect logic).

### 2. `/src/components` (UI Components)
Reusable UI components are organized here.
- **`ui`**: Generic, reusable UI elements (Buttons, Inputs, Cards, Dialogs) mostly built on top of Radix UI.
- **`global`**: Components used across the app, like the `Sidebar`, `Header`, or `Navbar`.
- **`projects`**: Components specific to the Project Management module (e.g., `KanbanBoard`, `TaskDetail`).
- **`forms`**: Reusable form components and complex form layouts.

### 3. `/src/lib` (Utilities & Configuration)
- **`db.ts`**: Initializes and exports the singleton Prisma Client instance to prevent multiple connections in development.
- **`utils.ts`**: Helper functions, including the `cn` utility for merging Tailwind classes.
- **`constants.ts`**: Application-wide constants.

### 4. `/prisma` (Database Schema)
- **`schema.prisma`**: The single source of truth for the database schema. It defines all models (tables) and their relationships.
    - **User Management**: `UserProfile`, `Role`, `Department`.
    - **Attendance**: `Attendence`, `CheckLog`, `TimeTable`.
    - **Leaves**: `LeaveRequest`, `LeaveType`.
    - **Projects**: `Project`, `Task`, `ProjectMember`.
    - **Recruitment**: `Job`, `JobApplications`.

### 5. `/src/store` (State Management)
- Contains Zustand stores for managing global client-side state, such as UI toggles or cached data that doesn't require a re-fetch.

### 6. `/src/schemas` (Validation)
- Zod schemas used for form validation and API request validation. Ensures data integrity across the application.

---

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Scripts

- `dev`: Runs the app in development mode.
- `build`: Builds the app for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint to check for code quality issues.
