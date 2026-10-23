export interface Job {
  id: number;
  company: string;
  title: string;
  location: string;
  salary: string;
  minCgpa: number;
  skills: string[];
  description?: string;
}
