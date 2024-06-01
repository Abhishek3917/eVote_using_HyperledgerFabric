import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminDetailsComponent } from './admin-details/admin-details.component';

@Component({
  selector: 'app-college-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, RouterOutlet, AdminDetailsComponent],
  templateUrl: './college-signup.component.html',
  styleUrl: './college-signup.component.css'
})
export class CollegeSignupComponent {}
