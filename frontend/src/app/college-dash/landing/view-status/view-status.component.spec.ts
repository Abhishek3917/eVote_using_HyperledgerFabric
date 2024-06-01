import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStatusComponent } from './view-status.component';

describe('ViewStatusComponent', () => {
  let component: ViewStatusComponent;
  let fixture: ComponentFixture<ViewStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
