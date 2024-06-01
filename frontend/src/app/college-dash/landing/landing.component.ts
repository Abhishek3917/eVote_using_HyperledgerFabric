import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit{
  constructor(private dataService: DataService, private _router: Router){}
  loggedAdmin = this.dataService.getLoggedAdmin();
  requests: any [] = [];
  courses: any [] = [];
  curRequest = {
    first_name: "fname",
    last_name: "lname",
    email: "em",
    mob: "mob",
    college: "college",
    course: "course",
    branch: "branch",
    year: 0,
    pos: 0,
  }

  elections: any [] = [];

  async getRequests(){
    const requests = await fetch('http://localhost:5000/api/auth/getRequests', {
      method: 'GET',
    })
    const resData = await requests.json();
    console.log(resData);
    this.requests = resData.data;

    const course = await fetch('http://localhost:5000/api/auth/getCourses', {
      method: 'GET',
    })
    const courseResp = await course.json();
      for(const item of courseResp.data){
        if(item.college == this.loggedAdmin.college_name){
          this.courses.push(item);
        }
      }
      console.log(this.courses);
  }

  viewRequest(mail: string){
    for(var val of this.requests){
      if(val.email == mail){
        this.curRequest.first_name = val.first_name;
        this.curRequest.last_name = val.last_name;
        this.curRequest.email = val.email;
        this.curRequest.mob = val.mob_no;
        this.curRequest.college = val.college;
        this.curRequest.course = val.course;
        this.curRequest.branch = val.branch;
        this.curRequest.year = val.year;
        this.curRequest.pos = this.requests.indexOf(val);
      }
    }

    Swal.fire({
      title: this.curRequest.first_name + ' ' + this.curRequest.last_name,
      text: 'Mobile: ' + this.curRequest.mob+ ', '+ 'E-Mail: '+ this.curRequest.email
            + 'Course: ' + this.curRequest.course+ ',' + 'Branch: '+this.curRequest.branch+
            'Year of study: '+this.curRequest.year,
      icon: 'info',
      width: '40%',
      confirmButtonText: 'Authorize'
    }).then(async (result) => {
      if(result.isConfirmed){
        const req3 = await fetch('http://localhost:5000/api/auth/authRequest',{
          method: 'POST',
          body: JSON.stringify({
            email: this.curRequest.email,
            college: this.curRequest.college,
            course: this.curRequest.course,
            branch: this.curRequest.branch,
            year: this.curRequest.year,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        const req3Text = req3.json();
        console.log(req3Text);
        console.log("should remove request");
        this.requests.splice(this.curRequest.pos,1);
      }
    })
  }

  openElection(elecName: string){
    this.dataService.setElecName(elecName);
    this._router.navigateByUrl("/college-dash/view-status");
  }

  viewResults(elecName: string){
    this.dataService.setElecName(elecName);
    this._router.navigateByUrl("/college-dash/view-results");
  }

  async ngOnInit(): Promise<void> {
    this.getRequests();
    const getElecs = await fetch("http://localhost:5000/api/auth/getElections", {
      method: 'POST',
      body: JSON.stringify({
        collegeName: this.loggedAdmin.college_name,
      }),
      headers: {'Content-type':'application/json'},
    }) 

    const getElecsRes = await getElecs.json();
    console.log(getElecsRes);
    this.elections = getElecsRes.data;
  }
}
