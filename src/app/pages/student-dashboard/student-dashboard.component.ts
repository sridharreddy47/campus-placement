import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ApplicationService } from '../../services/application.service';
import { JobService } from '../../services/job.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {
  authService = inject(AuthService);
  private applicationService = inject(ApplicationService);
  private jobService = inject(JobService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  student!: Student;
  stats = {
    availableJobs: 6,
    applied: 0,
    shortlisted: 0,
    selected: 0
  };

  showEditProfile = false;
  profileForm!: FormGroup;
  profileSuccess = '';
  profileError = '';
  profileSubmitted = false;

  ngOnInit(): void {
    if (!this.authService.isLoggedIn() || !this.authService.isStudent()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadStudentData();
    this.initProfileForm();
  }

  loadStudentData(): void {
    this.student = this.authService.getStudentProfile();
    const appStats = this.applicationService.getStatsForStudent(this.student.id);

    this.jobService.getJobs().subscribe(jobs => {
      this.stats.availableJobs = jobs.length;
    });

    this.stats.applied = appStats.applied;
    this.stats.shortlisted = appStats.shortlisted;
    this.stats.selected = appStats.selected;
  }

  initProfileForm(): void {
    this.profileForm = this.fb.group({
      name: [this.student.name, [Validators.required, Validators.minLength(2)]],
      email: [this.student.email, [Validators.required, Validators.email]],
      rollNo: [this.student.rollNo, [Validators.required]],
      branch: [this.student.branch, [Validators.required]],
      cgpa: [this.student.cgpa, [Validators.required, Validators.min(0), Validators.max(10)]],
      skills: [this.student.skills.join(', '), [Validators.required]],
      graduationYear: [this.student.graduationYear || 2025, [Validators.required, Validators.min(2024), Validators.max(2030)]]
    });
  }

  toggleEditProfile(): void {
    this.showEditProfile = !this.showEditProfile;
    this.profileSuccess = '';
    this.profileError = '';
    if (this.showEditProfile) {
      this.initProfileForm();
    }
  }

  saveProfile(): void {
    this.profileSubmitted = true;
    this.profileSuccess = '';
    this.profileError = '';

    if (this.profileForm.invalid) {
      this.profileError = 'Please check the entered values and fix errors.';
      return;
    }

    const formValues = this.profileForm.value;
    const skillsArray = formValues.skills
      .split(',')
      .map((s: string) => s.trim())
      .filter((s: string) => s.length > 0);

    const updatedData: Partial<Student> = {
      name: formValues.name,
      email: formValues.email,
      rollNo: formValues.rollNo,
      branch: formValues.branch,
      cgpa: parseFloat(formValues.cgpa),
      skills: skillsArray,
      graduationYear: parseInt(formValues.graduationYear, 10)
    };

    this.student = this.authService.updateStudentProfile(updatedData);
    this.profileSuccess = 'Profile successfully updated!';
    this.profileSubmitted = false;

    // Auto close after 1.5s
    setTimeout(() => {
      this.showEditProfile = false;
      this.profileSuccess = '';
    }, 1500);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
