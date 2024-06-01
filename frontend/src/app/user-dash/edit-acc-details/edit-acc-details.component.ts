import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import { FormControl, FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-acc-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './edit-acc-details.component.html',
  styleUrl: './edit-acc-details.component.css'
})
export class EditAccDetailsComponent {
  constructor(private dataService: DataService){}
  userObj = this.dataService.getLoggedUser();
  dupObj = this.dataService.getLoggedUser();

  EditAccDetailsForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    id: new FormControl(''),
  })

  isEdit: boolean = false;

  toggle(){
    console.log('started');
    this.isEdit = !this.isEdit;
  }

  async saveEdit(newUserName: string, id: string){
    const userData = this.dataService.getLoggedUser();
    this.dataService.updateLoggedUserAcc(newUserName);
    console.log(this.dataService.getLoggedUser());
    await fetch('http://localhost:5000/api/auth/updateUserName',{
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newUserName: newUserName, id: id}),
    }).catch((err)=>{
      console.log(err);
    })
  }
}
