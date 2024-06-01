import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResultsComponent } from './view-results.component';

describe('ViewResultsComponent', () => {
  let component: ViewResultsComponent;
  let fixture: ComponentFixture<ViewResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
