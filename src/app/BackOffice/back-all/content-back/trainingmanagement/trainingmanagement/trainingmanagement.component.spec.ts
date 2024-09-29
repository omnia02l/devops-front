import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingmanagementComponent } from './trainingmanagement.component';

describe('TrainingmanagementComponent', () => {
  let component: TrainingmanagementComponent;
  let fixture: ComponentFixture<TrainingmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingmanagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
