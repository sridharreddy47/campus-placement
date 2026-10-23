export type ApplicationStatus = 'Applied' | 'Shortlisted' | 'Selected' | 'Rejected';

export interface Application {
  id: number;
  studentId: number;
  studentName: string;
  company: string;
  jobId: number;
  jobTitle: string;
  appliedDate: string;
  status: ApplicationStatus;
}
