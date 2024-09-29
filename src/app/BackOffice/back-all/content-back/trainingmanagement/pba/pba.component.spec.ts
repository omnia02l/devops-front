import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PbaComponent } from './pba.component';

describe('PbaComponent', () => {
  let component: PbaComponent;
  let fixture: ComponentFixture<PbaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PbaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
