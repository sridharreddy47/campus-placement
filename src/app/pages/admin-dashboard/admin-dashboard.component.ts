import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApplicationService } from '../../services/application.service';
import { JobService } from '../../services/job.service';
import { Application, ApplicationStatus } from '../../models/application.model';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  authService = inject(AuthService);
  private applicationService = inject(ApplicationService);
  private jobService = inject(JobService);
  private router = inject(Router);

  applications: Application[] = [];
  xmlCompanies: Company[] = [];
  statusOptions: ApplicationStatus[] = ['Applied', 'Shortlisted', 'Selected', 'Rejected'];

  stats = {
    totalStudents: 5,
    totalJobs: 6,
    totalApplications: 0,
    selectedStudents: 0
  };

  notification = '';

  ngOnInit(): void {
    if (!this.authService.isLoggedIn() || !this.authService.isAdmin()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadData();
  }

  loadData(): void {
    this.applications = this.applicationService.getAllApplications();
    const students = this.authService.getAllStudents();

    this.jobService.getJobs().subscribe(jobs => {
      this.stats.totalJobs = jobs.length;
    });

    this.stats.totalStudents = students.length;
    this.stats.totalApplications = this.applications.length;
    this.stats.selectedStudents = this.applications.filter(a => a.status === 'Selected').length;

    // Load XML companies for EWP Demonstration
    this.jobService.getCompaniesFromXml().subscribe(comps => {
      this.xmlCompanies = comps;
    });
  }

  onStatusChange(app: Application, event: Event): void {
    const selectElem = event.target as HTMLSelectElement;
    const newStatus = selectElem.value as ApplicationStatus;

    const success = this.applicationService.updateStatus(app.id, newStatus);
    if (success) {
      app.status = newStatus;
      this.stats.selectedStudents = this.applications.filter(a => a.status === 'Selected').length;
      this.showToast(`Updated status of ${app.studentName}'s application (${app.company}) to "${newStatus}".`);
    }
  }

  showToast(msg: string): void {
    this.notification = msg;
    setTimeout(() => {
      this.notification = '';
    }, 3000);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
