import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeDetailsComponent } from './college-details.component';

describe('CollegeDetailsComponent', () => {
  let component: CollegeDetailsComponent;
  let fixture: ComponentFixture<CollegeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollegeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollegeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
