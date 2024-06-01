import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { passwordValidator } from '../../validators/passValidator';
import { DataService } from '../../data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-details',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './admin-details.component.html',
  styleUrl: './admin-details.component.css'
})
export class AdminDetailsComponent {
  adminForm: FormGroup = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    phone_no: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, passwordValidator]),
    confPassword: new FormControl('')
  })

  constructor(private elementRef: ElementRef, private dataService: DataService, private _router: Router){}

  test(){
    let first_name = this.adminForm.value.first_name;
    let last_name = this.adminForm.value.last_name;
    let phone_no = this.adminForm.value.phone_no;
    let email = this.adminForm.value.email;
    let password = this.adminForm.value.password;
    let confPassword = this.adminForm.value.confPassword;
    if(password == confPassword){
      this.dataService.setAdmin(first_name, last_name, phone_no, email, password);
    }else{
      Swal.fire({
        title: 'Error!',
        text: `Passwords don't match!`,
        icon: 'warning',
        width: '40%',
        confirmButtonText: 'Okay'
      })
    }
  }
}
