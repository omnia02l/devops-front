import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueDanceStylePerMonthComponent } from './statistique-dance-style-per-month.component';

describe('StatistiqueDanceStylePerMonthComponent', () => {
  let component: StatistiqueDanceStylePerMonthComponent;
  let fixture: ComponentFixture<StatistiqueDanceStylePerMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatistiqueDanceStylePerMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatistiqueDanceStylePerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
