import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, catchError, map } from 'rxjs';
import { Job } from '../models/job.model';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private http = inject(HttpClient);
  private readonly JOBS_STORAGE_KEY = 'cpms_jobs_list';

  private defaultJobs: Job[] = [
    {
      id: 1,
      company: 'TCS',
      title: 'Software Developer',
      location: 'Mumbai',
      salary: '₹4.5 LPA',
      minCgpa: 6.5,
      skills: ['Java', 'SQL', 'Git'],
      description: 'Responsible for developing enterprise software solutions and maintaining scalable database applications.'
    },
    {
      id: 2,
      company: 'Infosys',
      title: 'Java Developer',
      location: 'Bangalore',
      salary: '₹5.0 LPA',
      minCgpa: 7.0,
      skills: ['Java', 'Spring Boot', 'MySQL'],
      description: 'Develop and support backend microservices, REST APIs, and enterprise cloud applications.'
    },
    {
      id: 3,
      company: 'Accenture',
      title: 'Frontend Developer',
      location: 'Hyderabad',
      salary: '₹5.5 LPA',
      minCgpa: 6.8,
      skills: ['HTML', 'CSS', 'JavaScript', 'Angular'],
      description: 'Design and build responsive web user interfaces adhering to modern web development standards.'
    },
    {
      id: 4,
      company: 'Wipro',
      title: 'Python Developer',
      location: 'Pune',
      salary: '₹4.8 LPA',
      minCgpa: 6.5,
      skills: ['Python', 'Django', 'REST API'],
      description: 'Build high-performance web backends and data automation pipelines for clients.'
    },
    {
      id: 5,
      company: 'Deloitte',
      title: 'Data Analyst',
      location: 'Gurgaon',
      salary: '₹7.0 LPA',
      minCgpa: 7.5,
      skills: ['Python', 'SQL', 'PowerBI', 'Excel'],
      description: 'Analyze complex business datasets, create executive dashboards, and derive strategic insights.'
    },
    {
      id: 6,
      company: 'Cognizant',
      title: 'QA Engineer',
      location: 'Chennai',
      salary: '₹4.2 LPA',
      minCgpa: 6.0,
      skills: ['Manual Testing', 'Selenium', 'Java'],
      description: 'Execute automated and manual test scripts to ensure product quality and defect tracking.'
    }
  ];

  constructor() {
    if (!localStorage.getItem(this.JOBS_STORAGE_KEY)) {
      localStorage.setItem(this.JOBS_STORAGE_KEY, JSON.stringify(this.defaultJobs));
    }
  }

  /**
   * Fetches jobs via Angular HttpClient from assets/data/jobs.json
   * Demonstrates AJAX / asynchronous communication in EWP
   */
  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>('assets/data/jobs.json').pipe(
      tap(jobs => {
        if (jobs && jobs.length > 0) {
          localStorage.setItem(this.JOBS_STORAGE_KEY, JSON.stringify(jobs));
        }
      }),
      catchError(() => {
        // Fallback to localStorage or default dataset if fetch fails
        const local = localStorage.getItem(this.JOBS_STORAGE_KEY);
        const data = local ? JSON.parse(local) : this.defaultJobs;
        return of(data as Job[]);
      })
    );
  }

  getJobById(id: number): Job | undefined {
    const local = localStorage.getItem(this.JOBS_STORAGE_KEY);
    const jobs: Job[] = local ? JSON.parse(local) : this.defaultJobs;
    return jobs.find(j => j.id === id);
  }

  /**
   * Fetches companies.xml via HttpClient and parses with DOMParser
   * Demonstrates XML handling in EWP syllabus
   */
  getCompaniesFromXml(): Observable<Company[]> {
    return this.http.get('assets/data/companies.xml', { responseType: 'text' }).pipe(
      map(xmlText => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        const companyNodes = xmlDoc.getElementsByTagName('company');
        const companies: Company[] = [];

        for (let i = 0; i < companyNodes.length; i++) {
          const node = companyNodes[i];
          const id = parseInt(node.getAttribute('id') || `${i + 1}`, 10);
          const name = node.getElementsByTagName('name')[0]?.textContent || '';
          const industry = node.getElementsByTagName('industry')[0]?.textContent || '';
          const location = node.getElementsByTagName('headquarters')[0]?.textContent || '';
          const tier = node.getElementsByTagName('tier')[0]?.textContent || 'Recruiter';

          companies.push({ id, name, industry, location, tier });
        }
        return companies;
      }),
      catchError(() => {
        // Fallback default companies if file loading fails
        return of([
          { id: 1, name: 'Tata Consultancy Services (TCS)', industry: 'IT Services', location: 'Mumbai', tier: 'Tier 1' },
          { id: 2, name: 'Infosys Technologies', industry: 'IT Consulting', location: 'Bengaluru', tier: 'Tier 1' },
          { id: 3, name: 'Accenture Solutions', industry: 'Management & Tech Consulting', location: 'Hyderabad', tier: 'Tier 1' }
        ]);
      })
    );
  }
}
