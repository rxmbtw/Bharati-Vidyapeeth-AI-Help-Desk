# Bharati Vidyapeeth AI Help Desk

A comprehensive university management system with AI-powered assistance for students, administrators, and super admins.

## Features

- **Role-Based Access Control**: Secure portals for Students, Admin/Clerks, and Super Admins
- **Examination Module**: Complete workflow for exam forms, grade cards, results, and redressal
- **AI-Powered Help Desk**: Intelligent query validation and academic assistance
- **Notifications System**: Activity journal and notification publishing
- **Professional UI/UX**: Clean, academic-themed responsive design

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI Integration**: Gemini API

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
├── components/          # Reusable UI components
├── pages/              # Application pages
├── Public/             # Static assets
├── types.ts            # TypeScript type definitions
├── constants.tsx       # Application constants
└── App.tsx            # Main application component
```

## User Roles

- **Student (Candidate)**: Access to examination forms, results, grade cards, and help desk
- **Admin/Clerk**: Management of student requests, notifications, and administrative tasks  
- **Super Admin**: System-wide oversight, analytics, and university-level controls

## License

This project is developed for Bharati Vidyapeeth University.
