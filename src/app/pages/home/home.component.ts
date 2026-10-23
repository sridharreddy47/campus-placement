import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  authService = inject(AuthService);
  private jobService = inject(JobService);

  xmlCompanies: Company[] = [];
  loadingXml = true;

  features = [
    {
      icon: '💼',
      title: 'Top Recruitment Drives',
      description: 'Access premier hiring opportunities from top Fortune 500 and tech giants visiting our campus.'
    },
    {
      icon: '🎯',
      title: 'Automated Eligibility Check',
      description: 'Smart criteria matching ensures you only apply for roles matching your CGPA and branch qualifications.'
    },
    {
      icon: '📊',
      title: 'Real-time Tracking',
      description: 'Monitor your interview progress, shortlists, and placement selection status in real-time.'
    },
    {
      icon: '👨‍🎓',
      title: 'Centralized Student Profile',
      description: 'Manage academic records, technical skills, and resume details in one secure institutional portal.'
    }
  ];

  stats = [
    { value: '94%', label: 'Placement Rate' },
    { value: '120+', label: 'Partner Companies' },
    { value: '₹14 LPA', label: 'Highest Package' },
    { value: '₹5.5 LPA', label: 'Average CTC' }
  ];

  ngOnInit(): void {
    // Load companies from XML to demonstrate XML syllabus requirement
    this.jobService.getCompaniesFromXml().subscribe({
      next: (companies) => {
        this.xmlCompanies = companies;
        this.loadingXml = false;
      },
      error: () => {
        this.loadingXml = false;
      }
    });
  }
}
