import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-college-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './college-select.component.html',
  styleUrl: './college-select.component.css'
})
export class CollegeSelectComponent implements OnInit{
  colleges: any [] = [];
  courses: any [] = [];
  courses2: any [] = [];
  coursesFil: any [] = [];
  branches: any [] = [];
  branchesFil: any [] = [];
  maxYear: number = 0;
  year: any [] = [];
  collegeValue?: string;
  courseValue?: string;
  branchValue?: string;
  yearValue?: string;


  constructor(private dataService: DataService, private _router: Router){}
  ngOnInit(){
    this.getColleges();
  }
  async getColleges(){
    const Colleges = await fetch("http://localhost:5000/api/auth/getColleges", {
      method: 'GET',
    });
    const resData = await Colleges.json();
    console.log(resData.data);
    this.colleges = resData.data;
  } 

  getCollegeValue(event: Event){
    this.collegeValue = (event.target as HTMLSelectElement).value;
    console.log(this.collegeValue);
    this.getCourses();
  }

  async getCourses(){
    const courses = await fetch("http://localhost:5000/api/auth/getCourses",  {
      method: 'POST',
      body: JSON.stringify({
        college: this.collegeValue
      }),
      headers: {'Content-type': 'application/json'}
    })
    const courseResp = await courses.json();
    this.courses2 = courseResp.data;
    for(let c of courseResp.data){
      this.courses.push(c.course);
    }
    this.coursesFil = [...new Set(this.courses)];
    console.log(this.coursesFil);
  }

  getCourseValue(event: Event){
    this.courseValue = (event.target as HTMLSelectElement).value;
    console.log(this.courseValue);
    console.log(this.courses2);
    for(let item of this.courses2){
      if(item.course == this.courseValue){
        this.branches.push(item);
      }
    }
    console.log(this.branches);
    for(let c of this.branches){
      this.branchesFil.push(c.branch);
    }
    console.log(this.branchesFil);
  }

  getBranchValue(event: Event){
    this.branchValue = (event.target as HTMLSelectElement).value;
    console.log(this.branchValue);
    this.maxYear = this.branches[0].years;
    for(let i=1; i<=this.maxYear; i++){
      this.year.push(i);
    }
  }

  getYearValue(event: Event){
    this.yearValue = (event.target as HTMLSelectElement).value;
    console.log(this.yearValue);
  }
  
  async sendRequest(){
    const userData = this.dataService.getLoggedUser();
    const reqResp = await fetch("http://localhost:5000/api/auth/sendRequest", {
      method: 'POST',
      body: JSON.stringify({
        college: this.collegeValue,
        username: userData.username,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        mob_no: userData.mob_no,
        course: this.courseValue,
        branch: this.branchValue,
        year: this.yearValue,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const response = await reqResp.json().then(() => { 
      Swal.fire({
        title: 'Request sent!',
        text: `You will be notified via E-Mail upon authorization`,
        icon: 'success',
        width: '40%',
        confirmButtonText: 'Okay'
      }).then((result) => {
        if(result.isConfirmed){
          this._router.navigateByUrl("user-dash/profile");
        }
      })
    });
  };
}
