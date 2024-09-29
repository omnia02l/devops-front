import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuePlanDialogComponent } from './venue-plan-dialog.component';

describe('VenuePlanDialogComponent', () => {
  let component: VenuePlanDialogComponent;
  let fixture: ComponentFixture<VenuePlanDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenuePlanDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenuePlanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
