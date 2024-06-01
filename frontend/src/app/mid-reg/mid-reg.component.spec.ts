import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidRegComponent } from './mid-reg.component';

describe('MidRegComponent', () => {
  let component: MidRegComponent;
  let fixture: ComponentFixture<MidRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MidRegComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MidRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
