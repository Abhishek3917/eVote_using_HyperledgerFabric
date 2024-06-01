import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-past-elections',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './past-elections.component.html',
  styleUrl: './past-elections.component.css'
})
export class PastElectionsComponent implements OnInit{
  constructor(private dataService: DataService){}
  curElection: any;
  college = this.dataService.getLoggedUser().college;
  result: any;
  elections: any [] = [];
  pastElecs: any [] = [];
  resultsLoaded: Promise<boolean> = Promise.resolve(false);
  
  async showResult(electionName: string){
    this.curElection = electionName;

    const result = await fetch("http://localhost:5000/api/auth/getResults", {
      method: 'POST',
      body: JSON.stringify({
        elecName: electionName,
      }),
      headers: {'Content-type':'application/json'},
    });
    const resultResp = await result.json();
    this.result = resultResp.result;
    console.log(this.result);

    let card = document.getElementById("relative");
    if(card?.classList.contains("hide")){
      card?.classList.remove("hide");
    }else{
      card?.classList.add("hide");
    }
  } 

  close(){
    let card = document.getElementById("relative");
    if(!card?.classList.contains("hide")){
      card?.classList.add("hide");
    } 
    this.result = 0;
  }

  async ngOnInit(): Promise<void> {
    const elections = await fetch("http://localhost:5000/api/auth/getElections", {
      method: 'POST',
      body: JSON.stringify({
        collegeName: this.college,
      }),
      headers: {'Content-type':'application/json'},
    });
    const electionsResp = await elections.json();
    this.elections = electionsResp.data;
    for(let item of this.elections){
      if(item.finished == true){
        this.pastElecs.push(item);
      }
    }
    console.log(this.pastElecs);
    this.resultsLoaded = Promise.resolve(true);
  }
}
