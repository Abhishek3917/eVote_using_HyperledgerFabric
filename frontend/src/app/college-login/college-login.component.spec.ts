import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeLoginComponent } from './college-login.component';

describe('CollegeLoginComponent', () => {
  let component: CollegeLoginComponent;
  let fixture: ComponentFixture<CollegeLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollegeLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollegeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
