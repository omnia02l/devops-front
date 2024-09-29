import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupancyDialogComponent } from './occupancy-dialog.component';

describe('OccupancyDialogComponent', () => {
  let component: OccupancyDialogComponent;
  let fixture: ComponentFixture<OccupancyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccupancyDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccupancyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
