import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import axios, { AxiosResponse, AxiosError } from 'axios';
// import {v2 as cloudinary} from 'cloudinary';

@Component({
  selector: 'app-photo-select',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './photo-select.component.html',
  styleUrl: './photo-select.component.css'
})
export class PhotoSelectComponent{
  constructor(private _router: Router, private dataService: DataService, private http: HttpClient){}
  user = this.dataService.getLoggedUser();
  file: any;
  async updatePhoto(){
    const formData = new FormData();
    formData.append('data', this.file);
    console.log(this.file);
    this.http.post("http://localhost:5000/api/savePhoto", formData).subscribe(async (res: any) => {
      console.log(res.file);
      const resp = await fetch("http://localhost:5000/api/auth/updatePhoto", {
        method: 'POST',
        body: JSON.stringify({
          file: res.file,
          username: this.user.username,
        }),
        headers: {'Content-type' : 'application/json'},
      })
      const updateRes = resp.json();
      console.log(updateRes);
    })
    // // Configuration
    // cloudinary.config({ 
    //   cloud_name: "dwlwpqhta", 
    //   api_key: "193241841372562", 
    //   api_secret: "1_PA-2OTTAWa-JWVWIo4noSRO5g"
    // });
  
    // // Upload an image
    // const uploadResult = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg", {
    //     public_id: "shoes"
    // }).catch((error)=>{console.log(error)});
  
    // console.log(uploadResult);  

    this._router.navigateByUrl('/college-select');
  }

  async select(event: any){
    if(event.target.files.length > 0){}
    this.file = event.target.files[0];
    const photoData = new FormData();
    this.file.originalname = this.user.username;
    photoData.append("file", this.file);
    photoData.append("upload_preset", "profiles");

    const resource_type = 'image';
    const cloudName = 'dwlwpqhta';
    const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resource_type}/upload`;
    const res = await axios.post<any>(api, photoData);
    const p = res.data.secure_url;
    console.log(p);

    const imageUpdate = await fetch("http://localhost:5000/api/auth/updatePhoto", {
      method: 'POST',
      body: JSON.stringify({
        file: p,
        username: this.user.username,
      }),
      headers: {'Content-type':'application/json'},
    });
    const updateRes = await imageUpdate.json();
    console.log(updateRes);
  } 
}
