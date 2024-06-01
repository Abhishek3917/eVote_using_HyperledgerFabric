import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeHomeComponent } from './college-home.component';

describe('CollegeHomeComponent', () => {
  let component: CollegeHomeComponent;
  let fixture: ComponentFixture<CollegeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollegeHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollegeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
