import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-elections',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './elections.component.html',
  styleUrl: './elections.component.css'
})

export class ElectionsComponent implements OnInit{
  constructor(private dataService: DataService){}
  candsArray: any [] = [];
  elections: any [] = [];
  elecsMid: any [] = [];
  elecsFil: any [] = [];
  candsFil: any [] = [];
  curCands: any [] = [];
  curElection: any = "cur";
  user = this.dataService.getLoggedUser();

  async showCands(electionName: string){
    this.curElection = electionName;
    let card = document.getElementById("relative");
    if(card?.classList.contains("hide")){
      card?.classList.remove("hide");
    }else{
      card?.classList.add("hide");
    }

    const candidates = await fetch("http://localhost:5000/api/auth/getCandidates", {
      method: 'GET',
    });
    const candidatesResp = await candidates.json();
    console.log(candidatesResp.data);
    this.candsArray = candidatesResp.data;
    for(let item of this.candsArray){
      if(item.election_name == electionName){
        this.candsFil.push(item);
      }
    }
  }

  async vote(candName: string){
    console.log(candName);
    Swal.fire({
      title: 'Confirm your vote',
      text: `Confirm your vote for: `+candName,
      icon: 'info',
      width: '40%',
      confirmButtonText: 'Okay'
    }).then(async (result) => {
      if(result.isConfirmed){
        console.log(this.curElection);
        const voted = await fetch("http://localhost:5000/api/auth/setVote", {
          method: 'POST',
          body: JSON.stringify({
            cand_name: candName,
            username: this.user.username,
            election_name: this.curElection,
          }),
          headers: {'Content-type':'application/json'},
        }) 
        const response = await voted.json();
        for(let i of this.elecsFil){
          if(i.election_name == response.candidate.election_name){
            const index = this.elecsFil.indexOf(i);
            if (index > -1) {
              this.elecsFil.splice(index, 1);
            }
          }
        }
        this.close();
      }
    })
  }

  close(){
    let card = document.getElementById("relative");
    if(!card?.classList.contains("hide")){
      card?.classList.add("hide");
    } 
    this.candsFil.length = 0;
  }

  async ngOnInit(): Promise<void> {
    console.log(this.user);
    let collegeName = this.dataService.getLoggedUser().college;
    const elections = await  fetch("http://localhost:5000/api/auth/getElections", {
      method: 'POST',
      body: JSON.stringify({
        collegeName: collegeName
      }),
      headers: {'Content-type':'application/json'}
    });
    const electionsResp = await elections.json();
    this.elections = electionsResp.data;
    console.log(this.elections);
    for(let e of this.elections){
      if(!this.user.votedElections.includes(e)){
        this.elecsMid.push(e)
      }
    }
    console.log(this.elecsMid);
    for(let i of this.elecsMid){
      if(i.finished == false){
        this.elecsFil.push(i);
      }
    }
  }
}
