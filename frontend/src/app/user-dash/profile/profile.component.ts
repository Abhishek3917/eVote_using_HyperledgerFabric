import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import { RouterLink } from '@angular/router';
import axios, { AxiosResponse, AxiosError } from 'axios';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  constructor(private dataService: DataService){}
  collegeUpdated = false;

  userObj = this.dataService.getLoggedUser();
  
  button1 = document.getElementsByClassName('check')[0];
  button2 = document.getElementsByClassName('check')[1];

  photoValue: any;
  async check(){
    console.log(this.userObj.image);
    if(this.userObj.college != "NU"){
      this.button1.removeAttribute("disabled");
      this.button2.removeAttribute("disabled");
    }
  }

  async ngOnInit(): Promise<void> {
    this.check();
    if(this.userObj.college == "NU"){
      this.collegeUpdated = false;
    } else {
      this.collegeUpdated = true;
    } 
    console.log(this.userObj.college);
    console.log(this.collegeUpdated);

    const image = await fetch("http://localhost:5000/api/auth/getUser", {
      method: 'POST',
      body: JSON.stringify({
        username: this.userObj.username,
      }),
      headers: {'Content-type':'application/json'},
    });
    const imageResp = await image.json();
    this.photoValue = imageResp.image;
    console.log(imageResp.image);
  }
}
