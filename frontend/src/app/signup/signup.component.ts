import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, } from '@angular/forms';
import { NameComponent } from './name/name.component';
import { DetailsComponent } from './details/details.component';
import { AccDetailsComponent } from './acc-details/acc-details.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, NameComponent, 
            DetailsComponent, AccDetailsComponent, RouterOutlet],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {}

