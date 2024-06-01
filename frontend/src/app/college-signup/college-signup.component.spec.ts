import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeSignupComponent } from './college-signup.component';

describe('CollegeSignupComponent', () => {
  let component: CollegeSignupComponent;
  let fixture: ComponentFixture<CollegeSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollegeSignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollegeSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
