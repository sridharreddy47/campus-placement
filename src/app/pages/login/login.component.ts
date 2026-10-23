import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  errorMessage = '';
  successMessage = '';
  isSubmitted = false;

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  fillStudentCredentials(): void {
    this.loginForm.setValue({
      email: 'student@campus.com',
      password: 'student123'
    });
    this.errorMessage = '';
  }

  fillAdminCredentials(): void {
    this.loginForm.setValue({
      email: 'admin@campus.com',
      password: 'admin123'
    });
    this.errorMessage = '';
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.loginForm.invalid) {
      this.errorMessage = 'Please correct form validation errors before proceeding.';
      return;
    }

    const { email, password } = this.loginForm.value;
    const result = this.authService.login(email, password);

    if (result.success) {
      this.successMessage = result.message;
      setTimeout(() => {
        if (result.role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/student-dashboard']);
        }
      }, 500);
    } else {
      this.errorMessage = result.message;
    }
  }
}
