import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewElectionComponent } from './new-election.component';

describe('NewElectionComponent', () => {
  let component: NewElectionComponent;
  let fixture: ComponentFixture<NewElectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewElectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
