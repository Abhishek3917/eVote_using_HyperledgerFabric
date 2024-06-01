import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-results.component.html',
  styleUrl: './view-results.component.css'
})
export class ViewResultsComponent implements OnInit{
  constructor(private dataService: DataService, private _router: Router){}
  item: any;
  elecName: any;

  back(){
    this._router.navigateByUrl("/college-dash/landing");
  }

  async ngOnInit(): Promise<void> {
    const elec = this.dataService.getElecName();
    this.elecName = elec
    console.log(elec);
    const res = await fetch("http://localhost:5000/api/auth/getResults", {
      method: 'POST',
      body: JSON.stringify({
        elecName: elec,
      }),
      headers: {'Content-type': 'application/json'},
    });
    const resResp = await res.json();
    this.item = resResp.result;
    console.log(this.item);
  }
}
