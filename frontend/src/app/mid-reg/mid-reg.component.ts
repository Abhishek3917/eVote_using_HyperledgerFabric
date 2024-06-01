import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mid-reg',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './mid-reg.component.html',
  styleUrl: './mid-reg.component.css'
})
export class MidRegComponent {
  ImagePath: String;

  constructor(private router: Router, private route: ActivatedRoute){
    this.ImagePath = '/assets/images/lg-img.png';
  } 

  get currentUrl(){
    return this.router.url;
  }
}
