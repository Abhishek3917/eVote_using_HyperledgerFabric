import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { CollegeDashComponent } from '../college-dash/college-dash.component';
import { startAuthentication } from '@simplewebauthn/browser';
import { client, server } from "@passwordless-id/webauthn";
import { Router } from '@angular/router';


@Component({
  selector: 'app-college-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './college-login.component.html',
  styleUrl: './college-login.component.css'
})
export class CollegeLoginComponent {
  constructor(private dataService: DataService, private _router: Router){}

  async login(email: string, password: string){
    try {
      const res = await fetch('http://localhost:5000/api/auth/loginAdmin', {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
        headers: { 'Content-Type': 'application/json' }
        })
      const data = await res.json()

      if (res.status === 400 || res.status === 401) {
        console.log(data.message);
      }else{
        const resData = await fetch('http://localhost:5000/api/auth/getAdmin',{
          method: 'POST',
          body: JSON.stringify({ email: email }),
          headers: { 'Content-Type': 'application/json' }
        })
        const userData = await resData.json();
        console.log(userData.user);
        //need to pass data of logged in user to userDashComponent
        //redirect user to userDashComponent with above data
        this.dataService.setLoggedAdmin(userData.user);
        console.log(this.dataService.getLoggedAdmin());
        //webauthn
          const challenge = "56535b13-5d93-4194-a282-f234c1c24500"
          const authentication = await client.authenticate([userData.user.credentialID], challenge, {
            "authenticatorType": "roaming",
            "userVerification": "required",
            "timeout": 60000
          })
        try{
          const getCred = await fetch('http://localhost:5000/api/auth/getAdminCredential', {
            method: 'POST',
            body: JSON.stringify({ email: email }),
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
          const authenticationParsed = await server.verifyAuthentication(authentication, credentialKey, expected);
          console.log(authenticationParsed);
          if(userData.user.coursesUpdated == true){
            this._router.navigateByUrl('/college-dash/landing');
          }else{
            this._router.navigateByUrl('/courses');
          }
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
