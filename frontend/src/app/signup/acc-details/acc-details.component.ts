import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../../data.service';
import { client } from '@passwordless-id/webauthn' 
import { server } from '@passwordless-id/webauthn' 
import { ElementRef } from '@angular/core';
import { passwordValidator } from '../../validators/passValidator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acc-details',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './acc-details.component.html',
  styleUrl: './acc-details.component.css'
})
export class AccDetailsComponent {
  accountDetailsForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, passwordValidator]),
    confPassword: new FormControl(''),
  }
  )

  constructor(private elementRef: ElementRef, private dataService: DataService, private _router: Router){}

  async register(){
      console.log(this.accountDetailsForm.value);
      let username = this.accountDetailsForm.value.username;
      let email = this.accountDetailsForm.value.email;
      let password = this.accountDetailsForm.value.password;
      let confPass = this.accountDetailsForm.value.confPassword;
      if(password == confPass){
        this.dataService.setSharedCreds(username, password, email);
        console.log(this.dataService.getSharedData());
        let user = this.dataService.getSharedData();
        console.log(user);
        try{
          const res = await fetch("http://localhost:5000/api/auth/register", {
            method: 'POST',
            body: JSON.stringify({
              username : username,
              password : password,
              first_name : user.first_name,
              last_name : user.last_name,
              email : email,
              mob_no : user.mob_no,
            }),
            headers: { 'Content-Type': 'application/json' }
          });

          //webauthn
          if(client.isAvailable()==true){
            const challenge = "a7c61ef9-dc23-4806-b486-2428938a547e";
            const registration = await client.register(username, challenge, {
              authenticatorType: "roaming",
              userVerification: "required",
              timeout: 60000,
              attestation: true,
              debug: false
            })

            let jsonReg = JSON.stringify(registration);
            const expected = {
              challenge: challenge,
              origin: "http://localhost:4200",
            }
            const registrationParsed = await server.verifyRegistration(registration, expected);
            console.log("Credential");
            console.log(registrationParsed.credential.publicKey);
            const res2 = await fetch("http://localhost:5000/api/auth/setCredential", {
              method: 'POST',
              body: JSON.stringify({
                username: username,
                credentialID: registrationParsed.credential.id,
                publicKey: registrationParsed.credential.publicKey,
                algorithm: registrationParsed.credential.algorithm,
              }),
              headers: { 'Content-Type': 'application/json' }
            });
            let respText = await res2.json();
            console.log(respText);
          }
          
          let text = await res.json();
          console.log(text);
          if(text.status == 201){
            this._router.navigateByUrl("/mid-reg");
          }
        }catch(err) {
          console.log(err);
        }
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
