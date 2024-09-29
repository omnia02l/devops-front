import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DancehallComponent } from './dancehall.component';

describe('DancehallComponent', () => {
  let component: DancehallComponent;
  let fixture: ComponentFixture<DancehallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DancehallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DancehallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
