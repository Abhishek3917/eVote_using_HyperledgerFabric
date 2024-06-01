import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MidRegComponent } from './mid-reg/mid-reg.component';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent, LoginComponent, MidRegComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'e-vote'; 
  constructor(private router: Router, private dataService: DataService){

  } 

  get urlCheck(){
    let curUrl = this.router.url;
    if(curUrl == '/mid-reg' || 
       curUrl == '/signup/name' ||
       curUrl == '/signup/details' ||
       curUrl == '/signup/acc-details' ||
       curUrl == '/user-dash/profile' ||
       curUrl == '/user-dash/editAcc' ||
       curUrl == '/user-dash/elections' ||
       curUrl == '/college-home' ||
       curUrl == '/college-login' ||
       curUrl == '/college-signup/admin-details' ||
       curUrl == '/college-signup/college-details' ||
       curUrl == '/college-dash/landing' ||
       curUrl == '/college-dash/new-election' ||
       curUrl == '/college-select' ||
       curUrl == '/courses' ||
       curUrl == '/college-dash/new-election' ||
       curUrl == '/college-dash/candidates' ||
       curUrl == '/college-dash/view-status' ||
       curUrl == '/college-dash/view-results' ||
       curUrl == '/user-dash/past-elections'){
        return false;
    }else {
      return true;
    }
  }

  get urlCheck2(){
    let curUrl = this.router.url;
    if(curUrl == '/user-dash/profile' ||
       curUrl == '/user-dash/editAcc' ||
       curUrl == '/user-dash/elections' ||
       curUrl == '/user-dash/past-elections' ||
       curUrl == '/college-dash/landing' ||
       curUrl == '/college-dash/new-election' ||
       curUrl == '/college-select' ||
       curUrl == '/courses' ||
       curUrl == '/college-dash/view-status' ||
       curUrl == '/college-dash/view-results'){
      return true;
    }else{
      return false;
    }
  }

  get urlCheck3(){
    let curUrl = this.router.url;
    if(curUrl == '/college-home'){
        return true;
    }else {
      return false;
    }
  }

  get urlCheck4(){
    let curUrl = this.router.url;
    if(curUrl == '/college-home'){
        return true;
    }else {
      return false;
    }
  }

  logout(){
    let curUrl = this.router.url;
    if(curUrl == '/college-dash/landing' ||
      curUrl == '/college-dash/new-election'){
        this.dataService.removeLoggedAdmin();
        this.router.navigateByUrl("/college-home");
    }else {
      this.dataService.removeLoggedUser();
      this.router.navigateByUrl("/");
    }
    console.log("logged out");
  }
} 
