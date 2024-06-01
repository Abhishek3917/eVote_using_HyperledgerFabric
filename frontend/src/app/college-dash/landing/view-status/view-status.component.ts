import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-status.component.html',
  styleUrl: './view-status.component.css'
})
export class ViewStatusComponent implements OnInit{
  constructor(private dataService: DataService, private _router: Router){}
  candsArray: any [] = [];
  candsFil: any [] = [];
  winner: any;
  elecName = this.dataService.getElecName();
  back(){
    window.history.back();
  }

  async stopElec(){
    Swal.fire({
      title: 'Do you want to stop this election?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(this.elecName);
        const stop = await fetch("http://localhost:5000/api/auth/stopElec", {
          method: 'POST',
          body: JSON.stringify({
            elec_Name: this.elecName
          }),
          headers: {'Content-type':'application/json'},
        });
        const stopRes = await stop.json();
        console.log(stopRes);
        console.log(this.candsFil);
        console.log(this.candsFil.length);

        this.winner = this.candsFil[0];
        console.log("Initial winner value set "+this.winner);
        for(let i=1; i<this.candsFil.length; i++){
          if(this.candsFil[i].votes > this.winner.votes){
            this.winner = this.candsFil[i];
          }
          console.log(this.winner);
        }
        const result = await fetch("http://localhost:5000/api/auth/pubResults", {
          method: 'POST',
          body: JSON.stringify({
            election_name: this.elecName,
            cand_name: this.winner.cand_name,
            election_promise: this.winner.election_promise,
            votes: this.winner.votes,
          }),
          headers: {'Content-type':'application/json'}
        })
        console.log(await result.json());

        this._router.navigateByUrl("/college-dash/landing");
      } else if (result.isDenied) {
        console.log("Denied");
      }
    })
  }

  async ngOnInit(): Promise<void> {
    const cands = await fetch("http://localhost:5000/api/auth/getCandidates", {
      method: 'GET',
    }) 
    const candsResp = await cands.json();
    this.candsArray = candsResp.data;

    for(let item of this.candsArray){
      if(item.election_name == this.elecName){
        this.candsFil.push(item);
      }
    }
  }
}
