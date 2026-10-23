import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';
import { ApplicationService } from '../../services/application.service';
import { Job } from '../../models/job.model';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit {
  private jobService = inject(JobService);
  authService = inject(AuthService);
  private applicationService = inject(ApplicationService);
  private router = inject(Router);

  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  searchQuery = '';
  selectedCgpaFilter = 'all';
  selectedLocationFilter = 'all';

  alertMessage = '';
  alertType: 'success' | 'danger' | 'info' = 'info';

  currentStudent: Student | null = null;

  ngOnInit(): void {
    if (this.authService.isStudent()) {
      this.currentStudent = this.authService.getStudentProfile();
    }

    this.jobService.getJobs().subscribe({
      next: (data) => {
        this.jobs = data;
        this.applyFilter();
      },
      error: () => {
        this.showAlert('Could not load jobs from server. Using local fallback.', 'danger');
      }
    });
  }

  applyFilter(): void {
    let result = [...this.jobs];

    // Search filter (Title, Company, Skills)
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      result = result.filter(job =>
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.skills.some(skill => skill.toLowerCase().includes(q))
      );
    }

    // CGPA requirement filter
    if (this.selectedCgpaFilter !== 'all') {
      const maxRequired = parseFloat(this.selectedCgpaFilter);
      result = result.filter(job => job.minCgpa <= maxRequired);
    }

    // Location filter
    if (this.selectedLocationFilter !== 'all') {
      result = result.filter(job => job.location.toLowerCase() === this.selectedLocationFilter.toLowerCase());
    }

    this.filteredJobs = result;
  }

  isAlreadyApplied(jobId: number): boolean {
    if (!this.currentStudent) return false;
    return this.applicationService.hasApplied(this.currentStudent.id, jobId);
  }

  isEligible(job: Job): boolean {
    if (!this.currentStudent) return true;
    return this.currentStudent.cgpa >= job.minCgpa;
  }

  handleApply(job: Job): void {
    // 1. Check if user is logged in
    if (!this.authService.isLoggedIn()) {
      this.showAlert('Please log in with your student account to apply for campus jobs.', 'info');
      setTimeout(() => this.router.navigate(['/login']), 1200);
      return;
    }

    // 2. Check if user is student
    if (!this.authService.isStudent()) {
      this.showAlert('Admin accounts cannot submit job applications.', 'danger');
      return;
    }

    this.currentStudent = this.authService.getStudentProfile();

    // 3. Delegate to ApplicationService for validation (CGPA check + duplicate check)
    const result = this.applicationService.apply(job, this.currentStudent);

    if (result.success) {
      this.showAlert(result.message, 'success');
    } else {
      this.showAlert(result.message, 'danger');
    }
  }

  showAlert(msg: string, type: 'success' | 'danger' | 'info'): void {
    this.alertMessage = msg;
    this.alertType = type;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  dismissAlert(): void {
    this.alertMessage = '';
  }
}
