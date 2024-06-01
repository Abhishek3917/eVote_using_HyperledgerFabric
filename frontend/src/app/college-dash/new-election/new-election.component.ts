import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-election',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-election.component.html',
  styleUrl: './new-election.component.css'
})
export class NewElectionComponent {
  constructor(private _router: Router, private dataService: DataService){}
  admin = this.dataService.getLoggedAdmin();
  async start(elecName: string, deadline: string){
    this.dataService.setElecName(elecName);
    const newElec = await fetch("http://localhost:5000/api/auth/newElection", {
      method: 'POST',
      body: JSON.stringify({
        collegeName: this.admin.college_name,
        electionName: elecName,
        deadline: deadline,
      }),
      headers: {'Content-type': 'application/json'},
    });
    const newElecResp = await newElec.json();
    console.log(newElecResp);
    this._router.navigateByUrl('/college-dash/candidates');
  }
}
