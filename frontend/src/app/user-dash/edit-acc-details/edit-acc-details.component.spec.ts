import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccDetailsComponent } from './edit-acc-details.component';

describe('EditAccDetailsComponent', () => {
  let component: EditAccDetailsComponent;
  let fixture: ComponentFixture<EditAccDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAccDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAccDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
