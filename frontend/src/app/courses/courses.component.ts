import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})

export class CoursesComponent {
  constructor(private dataService: DataService, private _router: Router){}
  displayed = false;
  admin = this.dataService.getLoggedAdmin();
  courseForm = {
    course: '',
    branch: '',
    years: '',
  }
  coursesArray: any [] = [];
  // [{
  //   course: "B.Tech",
  //   branch: "Electronics & Communication Engineering",
  //   years: 4
  // }];

  addCard(): void{
    const data = {
      course: this.courseForm.course, 
      branch: this.courseForm.branch,
      years: this.courseForm.years
    }
    this.coursesArray.push(data);
  }

  async setData(){
    const set = await fetch("http://localhost:5000/api/auth/setCourse",{
      method: 'POST',
      body: JSON.stringify({
        collegeName: this.admin.college_name,
        data: this.coursesArray,
      }),
      headers: {'Content-type': 'application/json'}
    }) 

    const setResp = await set.json();
    if(setResp.courseCreated == true){
      const setFlag = await fetch("http://localhost:5000/api/auth/setCourseUpdated", {
        method: 'POST',
        body: JSON.stringify({
          email: this.admin.email,
        }),
        headers: {'Content-type' : 'application/json'}
      })
      console.log(await setFlag.json());
      this._router.navigateByUrl('college-dash/landing');
    }else{
      Swal.fire({
        title: 'Server error',
        text: 'Courses not updated',
        timer: 2000,
      });
    }
  }
}
function tranistion(arg0: string, arg1: any[]): import("@angular/animations").AnimationMetadata {
  throw new Error('Function not implemented.');
}

