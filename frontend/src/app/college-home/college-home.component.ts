import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-college-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './college-home.component.html',
  styleUrl: './college-home.component.css'
})
export class CollegeHomeComponent implements OnInit{
  ImagePath: String;

  constructor(){
    this.ImagePath = '/assets/images/college-home-card.png';
  }

  ngOnInit(): void {

  }
}
