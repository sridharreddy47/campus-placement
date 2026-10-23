# Campus Placement Management System (CPMS)

An academic laboratory project developed for the **Enterprise Web Programming (EWP)** course demonstration.

---

## 📌 Project Purpose

The **Campus Placement Management System (CPMS)** streamlines on-campus recruitment by connecting final-year university students with visiting corporate recruiters. The system provides automated CGPA-based eligibility verification, instant job application processing, real-time status tracking, and administrative placement drive monitoring without requiring complex backend servers or database installations.

---

## 🚀 Technologies Used

- **Framework:** Angular 19+ (Standalone Components, Routing, Services, Pipes)
- **Language:** TypeScript (Interfaces, Strong Typing, ES6+ Features)
- **Markup & Styling:** HTML5 (Semantic Structure) & CSS3 (Custom Responsive Layout, Modern Flexbox & Grid)
- **State & Data Storage:** Browser `localStorage` (Client-side persistence for sessions, applications, and student profiles)
- **Asynchronous Communication:** Angular `HttpClient` & RxJS Observables (`assets/data/jobs.json`)
- **XML Demonstration:** `assets/data/companies.xml` parsed asynchronously with browser `DOMParser`
- **Forms:** Angular Reactive Forms with real-time validation

---

## 🔑 Demo Login Credentials

| Role | Email | Password | Landing Page |
| :--- | :--- | :--- | :--- |
| **Student** | `student@campus.com` | `student123` | Student Dashboard (`/student-dashboard`) |
| **Admin (Placement Officer)** | `admin@campus.com` | `admin123` | Admin Portal (`/admin-dashboard`) |

> **Tip:** The login page includes convenient **1-Click Autofill Buttons** (`Student Demo` / `Admin Demo`) for rapid lab evaluation.

---

## ✨ Key Features

1. **Professional Landing Page:**
   - Institutional banner, drive highlights, and key placement metrics.
   - Featured recruiter showcase loaded dynamically from `companies.xml`.
2. **Role-Based Authentication:**
   - Lightweight authentication using `localStorage` without external server requirements.
3. **Student Placement Dashboard:**
   - Live metrics summary: *Available Jobs*, *Applied Jobs*, *Shortlisted*, *Selected*.
   - Academic profile viewer showing Name, Roll Number, Branch, CGPA, and technical skills.
   - **Student Profile Editor:** Reactive Form with validation (CGPA 0–10 range, email, mandatory fields).
4. **Campus Job Openings (6 Leading Recruiters):**
   - Listings for **TCS, Infosys, Accenture, Wipro, Deloitte, and Cognizant**.
   - Real-time search by company, title, or skills.
   - Filter by minimum required CGPA cutoffs and locations.
   - **Automated Eligibility Engine:** Blocks application submission if student CGPA is lower than the recruiter's cutoff.
   - Duplicate prevention (disables re-application for already applied positions).
5. **My Applications Tracker:**
   - Table displaying applied company, job profile, submission date, and colored status badges (`Applied`, `Shortlisted`, `Selected`, `Rejected`).
6. **Placement Officer / Admin Dashboard:**
   - Summary statistics: Total Registered Students, Total Drives, Total Applications, and Total Selections.
   - Interactive Candidate Roster table allowing the officer to update any applicant's status via a dropdown in real-time.
   - **EWP XML Integration Box** demonstrating parsed XML data.

---

## 📚 EWP Syllabus Topics Demonstrated

| Syllabus Concept | Implementation in Project |
| :--- | :--- |
| **HTML5 & Semantic Elements** | `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<form>`, `<table>` |
| **CSS3 & Responsive Design** | CSS Variables, Flexbox, CSS Grid, media queries, status badges, modern buttons |
| **JavaScript / TypeScript Core** | Types, Interfaces (`Student`, `Job`, `Company`, `Application`), Arrow functions, Arrays (`filter`, `map`, `some`, `find`), Objects |
| **DOM & Event Handling** | Angular Event Binding (`(click)`, `(change)`, `(input)`, `(ngSubmit)`) |
| **Angular Components & Routing** | Standalone Components, `RouterOutlet`, `RouterLink`, `routerLinkActive`, `provideRouter` |
| **Angular Reactive Forms** | `FormBuilder`, `FormGroup`, `Validators.required`, `Validators.email`, `Validators.min`, `Validators.max` |
| **AJAX / Asynchronous Communication** | Angular `HttpClient.get<Job[]>('assets/data/jobs.json')` with RxJS Observable pipeline |
| **XML Processing** | Loading `companies.xml` via `HttpClient` and parsing DOM nodes with `DOMParser` |
| **Data Binding & Directives** | Property binding `[value]`, Two-way binding `[(ngModel)]`, `@if`, `@for` control flow |
| **Services & Dependency Injection** | `AuthService`, `JobService`, `ApplicationService` injected via modern Angular `inject()` |

---

## 💻 How to Run the Project

### Prerequisites
- Node.js (v18+)
- npm

### Steps:

1. **Open terminal and navigate to the project folder:**
   ```bash
   cd campus-placement
   ```

2. **Start the Angular development server:**
   ```bash
   npm start
   ```
   *(or `npx ng serve`)*

3. **Open in your web browser:**
   ```
   http://localhost:4200
   ```

---

## 📂 Project Directory Structure

```text
campus-placement/
├── public/
│   ├── assets/
│   │   └── data/
│   │       ├── jobs.json            <-- Sample jobs data (demonstrates AJAX / JSON)
│   │       └── companies.xml        <-- 3 Companies XML (demonstrates XML requirement)
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   ├── student.model.ts     <-- Student TypeScript interface
│   │   │   ├── company.model.ts     <-- Company interface
│   │   │   ├── job.model.ts         <-- Job interface
│   │   │   ├── application.model.ts <-- Application interface
│   │   │   └── user.model.ts        <-- User interface
│   │   ├── services/
│   │   │   ├── auth.service.ts      <-- Authentication & Student profile service
│   │   │   ├── job.service.ts       <-- JSON loading & XML parsing service
│   │   │   └── application.service.ts <-- Application management & eligibility engine
│   │   ├── pages/
│   │   │   ├── home/                <-- Landing page with hero & XML recruiter display
│   │   │   ├── login/               <-- Login with Reactive Form & demo autofill
│   │   │   ├── student-dashboard/   <-- Student portal & profile editor
│   │   │   ├── jobs/                <-- Job openings with search, filter & eligibility check
│   │   │   ├── my-applications/     <-- Application status table & colored badges
│   │   │   └── admin-dashboard/     <-- Admin metrics & status change dropdown
│   │   ├── app.ts / app.html / app.css <-- Root component with responsive navbar & footer
│   │   ├── app.routes.ts            <-- Angular routes
│   │   └── app.config.ts            <-- App providers (provideHttpClient, provideRouter)
│   ├── index.html
│   ├── main.ts
│   └── styles.css                   <-- Global CSS design system & typography
└── README.md
```

---

## 🎯 Important Files for Viva Voce

- **`src/app/services/job.service.ts`**: Viva question on how AJAX/JSON is fetched and how XML is parsed with `DOMParser`.
- **`src/app/pages/login/login.component.ts`**: Viva question on Angular Reactive Forms and custom validation.
- **`src/app/services/application.service.ts`**: Viva question on CGPA eligibility logic and data persistence in `localStorage`.
- **`public/assets/data/companies.xml`**: Viva question on XML tags and schema representation.
- **`src/app/models/*.ts`**: Viva question on TypeScript interface benefits over plain JavaScript.
