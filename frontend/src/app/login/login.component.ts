import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { DataService } from '../data.service';
import { UserDashComponent } from '../user-dash/user-dash.component';
import { client, server } from "@passwordless-id/webauthn";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor(private dataService: DataService, private _router: Router){}

  async login(username: string, password: string){
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username: username, password: password }),
        headers: { 'Content-Type': 'application/json' }
        })
      const data = await res.json()

      if (res.status === 400 || res.status === 401) {
        console.log(data.message);
      }else{
        const resData = await fetch('http://localhost:5000/api/auth/getUser',{
          method: 'POST',
          body: JSON.stringify({ username: username }),
          headers: { 'Content-Type': 'application/json' }
        })
        const userData = await resData.json();
        console.log(userData.user);
        //need to pass data of logged in user to userDashComponent
        //redirect user to userDashComponent with above data
        this.dataService.setLoggedUser(userData);
        
          const challenge = "56535b13-5d93-4194-a282-f234c1c24500"
          const authentication = await client.authenticate([userData.credentialID], challenge, {
            "authenticatorType": "roaming",
            "userVerification": "required",
            "timeout": 60000
          })
        try{
          const getCred = await fetch('http://localhost:5000/api/auth/getCredential', {
            method: 'POST',
            body: JSON.stringify({ username: username }),
            headers: { 'Content-Type': 'application/json' }
          })
          const credData = await getCred.json()
          const credentialKey = {
            id: credData.credentialID,
            publicKey: credData.publicKey,
            algorithm: credData.algorithm
          } as const

          const expected = {
            challenge: challenge,
            origin: "http://localhost:4200",
            userVerified: true,
            counter: 0
          }
          const authenticationParsed = await server.verifyAuthentication(authentication, credentialKey, expected).then(() => {
            console.log(userData.user.college + ' ' + userData.user.collegeRequested);
            if(userData.user.collegeRequested == false){
              this._router.navigateByUrl('/photo-select')
            }else{
              this._router.navigateByUrl('user-dash/profile');
            }
          });
          console.log(authenticationParsed);
        }catch(err){
          console.log("webauthn error");
          console.log(err);
        }
      }
    } catch (err) {
        console.log(err)
      }
  }
} 