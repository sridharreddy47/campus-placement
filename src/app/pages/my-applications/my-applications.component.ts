import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { AuthService } from '../../services/auth.service';
import { Application } from '../../models/application.model';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-applications.component.html',
  styleUrl: './my-applications.component.css'
})
export class MyApplicationsComponent implements OnInit {
  private applicationService = inject(ApplicationService);
  private authService = inject(AuthService);
  private router = inject(Router);

  applications: Application[] = [];
  student: Student | null = null;

  stats = {
    total: 0,
    applied: 0,
    shortlisted: 0,
    selected: 0,
    rejected: 0
  };

  ngOnInit(): void {
    if (!this.authService.isLoggedIn() || !this.authService.isStudent()) {
      this.router.navigate(['/login']);
      return;
    }

    this.student = this.authService.getStudentProfile();
    this.loadApplications();
  }

  loadApplications(): void {
    if (!this.student) return;
    this.applications = this.applicationService.getStudentApplications(this.student.id);

    this.stats.total = this.applications.length;
    this.stats.applied = this.applications.filter(a => a.status === 'Applied').length;
    this.stats.shortlisted = this.applications.filter(a => a.status === 'Shortlisted').length;
    this.stats.selected = this.applications.filter(a => a.status === 'Selected').length;
    this.stats.rejected = this.applications.filter(a => a.status === 'Rejected').length;
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Selected':
        return 'badge-status-selected';
      case 'Shortlisted':
        return 'badge-status-shortlisted';
      case 'Rejected':
        return 'badge-status-rejected';
      case 'Applied':
      default:
        return 'badge-status-applied';
    }
  }
}
