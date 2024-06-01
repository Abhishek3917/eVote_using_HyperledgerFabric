import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import Swal from 'sweetalert2';
import axios from 'axios';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.css'
})
export class CandidatesComponent {
  constructor(private _router: Router, private dataService: DataService){}
  displayed = false;
  elecName = this.dataService.getElecName();
  candForm = {
    cand_name: '',
    promise: '',
    video: '',
  }
  candArray: any [] = [];

  addCand(){
    const data = {
      cand_name: this.candForm.cand_name, 
      promise: this.candForm.promise,
    }
    this.candArray.push(data);
    console.log(this.candArray);
    this.candForm.cand_name = '';
    this.candForm.promise = '';
  }

  async setCands(){
    const set = await fetch("http://localhost:5000/api/auth/newCandidate",{
      method: 'POST',
      body: JSON.stringify({
        election_name: this.elecName,
        data: this.candArray,
      }),
      headers: {'Content-type': 'application/json'}
    }) 

    const setResp = await set.json();
    if(setResp.added == true){
      Swal.fire({
        title: 'Election created!',
        text: this.elecName,
        icon: 'success',
        width: '40%',
        confirmButtonText: 'Done'
      }).then((result) => {
        if(result.isConfirmed){
          this._router.navigateByUrl("college-dash/landing");
        }
      })
    }else{
      Swal.fire({
        title: 'Server error',
        text: 'Candidates not updated',
        timer: 2000,
      });
    }
  }
}
