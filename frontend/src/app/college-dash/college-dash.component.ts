import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-college-dash',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './college-dash.component.html',
  styleUrl: './college-dash.component.css'
})
export class CollegeDashComponent{
  constructor(private dataService: DataService){}
  loggedAdmin = this.dataService.getLoggedAdmin();
}
