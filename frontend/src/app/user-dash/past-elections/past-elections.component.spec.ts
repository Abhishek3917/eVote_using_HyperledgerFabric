import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastElectionsComponent } from './past-elections.component';

describe('PastElectionsComponent', () => {
  let component: PastElectionsComponent;
  let fixture: ComponentFixture<PastElectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastElectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PastElectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
