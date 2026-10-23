import { Injectable } from '@angular/core';
import { Application, ApplicationStatus } from '../models/application.model';
import { Job } from '../models/job.model';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private readonly APPS_KEY = 'cpms_applications';

  private defaultApplications: Application[] = [
    {
      id: 1,
      studentId: 101,
      studentName: 'Rahul Sharma',
      company: 'TCS',
      jobId: 1,
      jobTitle: 'Software Developer',
      appliedDate: '2025-01-10',
      status: 'Shortlisted'
    },
    {
      id: 2,
      studentId: 101,
      studentName: 'Rahul Sharma',
      company: 'Accenture',
      jobId: 3,
      jobTitle: 'Frontend Developer',
      appliedDate: '2025-01-14',
      status: 'Selected'
    },
    {
      id: 3,
      studentId: 101,
      studentName: 'Rahul Sharma',
      company: 'Wipro',
      jobId: 4,
      jobTitle: 'Python Developer',
      appliedDate: '2025-01-18',
      status: 'Applied'
    },
    {
      id: 4,
      studentId: 102,
      studentName: 'Priya Patel',
      company: 'Deloitte',
      jobId: 5,
      jobTitle: 'Data Analyst',
      appliedDate: '2025-01-12',
      status: 'Selected'
    },
    {
      id: 5,
      studentId: 102,
      studentName: 'Priya Patel',
      company: 'Infosys',
      jobId: 2,
      jobTitle: 'Java Developer',
      appliedDate: '2025-01-15',
      status: 'Shortlisted'
    },
    {
      id: 6,
      studentId: 103,
      studentName: 'Aman Verma',
      company: 'Cognizant',
      jobId: 6,
      jobTitle: 'QA Engineer',
      appliedDate: '2025-01-16',
      status: 'Applied'
    },
    {
      id: 7,
      studentId: 104,
      studentName: 'Sneha Kulkarni',
      company: 'Infosys',
      jobId: 2,
      jobTitle: 'Java Developer',
      appliedDate: '2025-01-11',
      status: 'Selected'
    },
    {
      id: 8,
      studentId: 105,
      studentName: 'Rohan Gupta',
      company: 'TCS',
      jobId: 1,
      jobTitle: 'Software Developer',
      appliedDate: '2025-01-09',
      status: 'Rejected'
    }
  ];

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    if (!localStorage.getItem(this.APPS_KEY)) {
      localStorage.setItem(this.APPS_KEY, JSON.stringify(this.defaultApplications));
    }
  }

  getAllApplications(): Application[] {
    const data = localStorage.getItem(this.APPS_KEY);
    return data ? JSON.parse(data) : this.defaultApplications;
  }

  getStudentApplications(studentId: number): Application[] {
    const all = this.getAllApplications();
    return all.filter(app => app.studentId === studentId);
  }

  hasApplied(studentId: number, jobId: number): boolean {
    const all = this.getAllApplications();
    return all.some(app => app.studentId === studentId && app.jobId === jobId);
  }

  apply(job: Job, student: Student): { success: boolean; message: string } {
    // 1. Eligibility Check
    if (student.cgpa < job.minCgpa) {
      return {
        success: false,
        message: `Eligibility criteria not met. Required CGPA is ${job.minCgpa}, but your CGPA is ${student.cgpa}.`
      };
    }

    // 2. Prevent duplicate application
    if (this.hasApplied(student.id, job.id)) {
      return {
        success: false,
        message: `You have already applied for ${job.title} at ${job.company}.`
      };
    }

    const all = this.getAllApplications();
    const newApp: Application = {
      id: Date.now(),
      studentId: student.id,
      studentName: student.name,
      company: job.company,
      jobId: job.id,
      jobTitle: job.title,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Applied'
    };

    all.unshift(newApp);
    localStorage.setItem(this.APPS_KEY, JSON.stringify(all));

    return {
      success: true,
      message: `Successfully applied for ${job.title} at ${job.company}!`
    };
  }

  updateStatus(applicationId: number, newStatus: ApplicationStatus): boolean {
    const all = this.getAllApplications();
    const idx = all.findIndex(app => app.id === applicationId);
    if (idx !== -1) {
      all[idx].status = newStatus;
      localStorage.setItem(this.APPS_KEY, JSON.stringify(all));
      return true;
    }
    return false;
  }

  getStatsForStudent(studentId: number) {
    const studentApps = this.getStudentApplications(studentId);
    return {
      applied: studentApps.length,
      shortlisted: studentApps.filter(a => a.status === 'Shortlisted').length,
      selected: studentApps.filter(a => a.status === 'Selected').length,
      rejected: studentApps.filter(a => a.status === 'Rejected').length
    };
  }

  getAdminStats(totalJobsCount = 6, totalStudentsCount = 5) {
    const all = this.getAllApplications();
    return {
      totalStudents: totalStudentsCount,
      totalJobs: totalJobsCount,
      totalApplications: all.length,
      selectedStudents: all.filter(a => a.status === 'Selected').length
    };
  }
}
