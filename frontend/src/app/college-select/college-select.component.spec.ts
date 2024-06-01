import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeSelectComponent } from './college-select.component';

describe('CollegeSelectComponent', () => {
  let component: CollegeSelectComponent;
  let fixture: ComponentFixture<CollegeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollegeSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollegeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
