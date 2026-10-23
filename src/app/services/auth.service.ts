import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'cpms_current_user';
  private readonly STUDENT_PROFILE_KEY = 'cpms_student_profile';
  private readonly ALL_STUDENTS_KEY = 'cpms_all_students';

  private defaultStudents: Student[] = [
    {
      id: 101,
      name: 'Rahul Sharma',
      email: 'student@campus.com',
      rollNo: '21CS042',
      branch: 'Computer Science & Engineering',
      cgpa: 8.2,
      skills: ['Java', 'Angular', 'TypeScript', 'SQL', 'HTML/CSS'],
      graduationYear: 2025
    },
    {
      id: 102,
      name: 'Priya Patel',
      email: 'priya.patel@campus.com',
      rollNo: '21IT018',
      branch: 'Information Technology',
      cgpa: 8.7,
      skills: ['Python', 'Django', 'Machine Learning', 'SQL'],
      graduationYear: 2025
    },
    {
      id: 103,
      name: 'Aman Verma',
      email: 'aman.verma@campus.com',
      rollNo: '21EC012',
      branch: 'Electronics & Communication',
      cgpa: 7.1,
      skills: ['C++', 'Embedded Systems', 'IoT'],
      graduationYear: 2025
    },
    {
      id: 104,
      name: 'Sneha Kulkarni',
      email: 'sneha.k@campus.com',
      rollNo: '21CS088',
      branch: 'Computer Science & Engineering',
      cgpa: 9.1,
      skills: ['React', 'Angular', 'Node.js', 'PostgreSQL'],
      graduationYear: 2025
    },
    {
      id: 105,
      name: 'Rohan Gupta',
      email: 'rohan.g@campus.com',
      rollNo: '21ME035',
      branch: 'Mechanical Engineering',
      cgpa: 6.4,
      skills: ['AutoCAD', 'SolidWorks', 'Python'],
      graduationYear: 2025
    }
  ];

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    if (!localStorage.getItem(this.ALL_STUDENTS_KEY)) {
      localStorage.setItem(this.ALL_STUDENTS_KEY, JSON.stringify(this.defaultStudents));
    }
    if (!localStorage.getItem(this.STUDENT_PROFILE_KEY)) {
      localStorage.setItem(this.STUDENT_PROFILE_KEY, JSON.stringify(this.defaultStudents[0]));
    }
  }

  login(email: string, password: string): { success: boolean; message: string; role?: 'student' | 'admin' } {
    const cleanEmail = email.trim().toLowerCase();

    // Student demo login
    if (cleanEmail === 'student@campus.com' && password === 'student123') {
      const user: User = {
        id: 101,
        name: 'Rahul Sharma',
        email: cleanEmail,
        role: 'student'
      };
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      return { success: true, message: 'Student login successful!', role: 'student' };
    }

    // Admin demo login
    if (cleanEmail === 'admin@campus.com' && password === 'admin123') {
      const user: User = {
        id: 1,
        name: 'Placement Officer',
        email: cleanEmail,
        role: 'admin'
      };
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      return { success: true, message: 'Admin login successful!', role: 'admin' };
    }

    return { success: false, message: 'Invalid email or password. Please use demo credentials.' };
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  getCurrentUser(): User | null {
    const data = localStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  isStudent(): boolean {
    const user = this.getCurrentUser();
    return user !== null && user.role === 'student';
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user !== null && user.role === 'admin';
  }

  getStudentProfile(): Student {
    const data = localStorage.getItem(this.STUDENT_PROFILE_KEY);
    return data ? JSON.parse(data) : this.defaultStudents[0];
  }

  updateStudentProfile(profile: Partial<Student>): Student {
    const current = this.getStudentProfile();
    const updated: Student = { ...current, ...profile };
    localStorage.setItem(this.STUDENT_PROFILE_KEY, JSON.stringify(updated));

    // Also update in all students list if id matches
    const allStudents = this.getAllStudents();
    const idx = allStudents.findIndex(s => s.id === updated.id);
    if (idx !== -1) {
      allStudents[idx] = updated;
      localStorage.setItem(this.ALL_STUDENTS_KEY, JSON.stringify(allStudents));
    }

    return updated;
  }

  getAllStudents(): Student[] {
    const data = localStorage.getItem(this.ALL_STUDENTS_KEY);
    return data ? JSON.parse(data) : this.defaultStudents;
  }
}
