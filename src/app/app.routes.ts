import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { MyApplicationsComponent } from './pages/my-applications/my-applications.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home - Campus Placement Management System' },
  { path: 'login', component: LoginComponent, title: 'Login - Campus Placement' },
  { path: 'student-dashboard', component: StudentDashboardComponent, title: 'Student Dashboard - CPMS' },
  { path: 'jobs', component: JobsComponent, title: 'Job Openings - CPMS' },
  { path: 'my-applications', component: MyApplicationsComponent, title: 'My Applications - CPMS' },
  { path: 'admin-dashboard', component: AdminDashboardComponent, title: 'Admin Dashboard - CPMS' },
  { path: '**', redirectTo: '' }
];
