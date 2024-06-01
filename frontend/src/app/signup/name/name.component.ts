import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { DetailsComponent } from '../details/details.component';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-name',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, DetailsComponent],
  templateUrl: './name.component.html',
  styleUrl: './name.component.css'
})
export class NameComponent {
  nameForm: FormGroup = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
  })
  isFormSubmitted: boolean = false;

  constructor(private dataService: DataService) {}

  test() {
    console.log(this.nameForm.value);
    let first_name = this.nameForm.value.first_name;
    let last_name = this.nameForm.value.last_name;
    console.log(first_name + ' ' + last_name);
    this.dataService.setSharedName(first_name, last_name);
    console.log(this.dataService.getSharedData());
  }
}
