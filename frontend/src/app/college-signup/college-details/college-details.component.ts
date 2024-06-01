import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { passwordValidator } from '../../validators/passValidator';
import { DataService } from '../../data.service';
import { client } from '@passwordless-id/webauthn' 
import { server } from '@passwordless-id/webauthn' 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-college-details',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './college-details.component.html',
  styleUrl: './college-details.component.css'
})
export class CollegeDetailsComponent {
  collegeDetailsForm: FormGroup = new FormGroup({
    college_name: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required]),
  })

  constructor(private dataService: DataService, private _router: Router){}

  async test(){
    let college_name = this.collegeDetailsForm.value.college_name;
    let city = this.collegeDetailsForm.value.city;
    let district = this.collegeDetailsForm.value.district;
    let country = this.collegeDetailsForm.value.country;
    let pincode = this.collegeDetailsForm.value.pincode;

    this.dataService.setCollege(college_name, city, district, country, pincode);
    const electionAdmin = this.dataService.getAdmin();
    let f_name = electionAdmin.first_name;
    let l_name = electionAdmin.last_name;
    let phone_no = electionAdmin.phone_no;
    let email = electionAdmin.email;
    let password = electionAdmin.password;
    let c_name = electionAdmin.college_name;
    let ci = electionAdmin.city;
    let dist = electionAdmin.district;
    let count = electionAdmin.country;
    let pin = electionAdmin.pincode;
    console.log(password);
    //api endpoint for admin registration.
    try{
      const regRes = await fetch('http://localhost:5000/api/auth/electionAdminRegister', {
        method: "POST",
        body: JSON.stringify({
          first_name: f_name,
          last_name: l_name,
          phone_no: phone_no,
          email: email,
          password: password,
          college_name: c_name,
          city: ci,
          district: dist,
          country: count,
          pincode: pin,
        }),
        headers: { 'Content-Type': 'application/json' }
      })

      const resText = regRes.json();
      console.log(resText);

      //webauthn
      if(client.isAvailable() == true){
        const challenge = "a7c61ef9-dc23-4806-b486-2428938a547e";
        const registration = await client.register(electionAdmin.email, challenge, {
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

        const res2 = await fetch("http://localhost:5000/api/auth/setAdminCredential", {
          method: 'POST',
          body: JSON.stringify({
            email: electionAdmin.email,
            credentialID: registrationParsed.credential.id,
            publicKey: registrationParsed.credential.publicKey,
            algorithm: registrationParsed.credential.algorithm,
          }),
          headers: { 'Content-Type': 'application/json' }
        });
        let respText = await res2.json();
        console.log(respText);
        this._router.navigateByUrl('/college-login');
      }
    }catch(err){
      console.log(err);
      Swal.fire({
        title: "Registration failed!",
        text: "Server error",
        icon: "error",
        width: "40%",
        confirmButtonText: "Okay"
      })
    }
  }
}
