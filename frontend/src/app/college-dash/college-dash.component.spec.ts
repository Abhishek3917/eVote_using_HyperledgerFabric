import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeDashComponent } from './college-dash.component';

describe('CollegeDashComponent', () => {
  let component: CollegeDashComponent;
  let fixture: ComponentFixture<CollegeDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollegeDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollegeDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
