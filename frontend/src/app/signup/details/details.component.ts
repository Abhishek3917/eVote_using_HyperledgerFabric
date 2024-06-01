import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { AccDetailsComponent } from '../acc-details/acc-details.component';
import { DataService } from '../../data.service';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})

export class DetailsComponent{
  fileName = '';
  constructor(private dataService: DataService) {}

  detailsForm: FormGroup = new FormGroup({
    mob_no: new FormControl('', [Validators.required]),
  });

  test() {
    console.log(this.detailsForm.value);
    let mob_no = this.detailsForm.value.mob_no;
    console.log(mob_no);
    this.dataService.setSharedMob(mob_no);
    console.log(this.dataService.getSharedData());
  }

}
