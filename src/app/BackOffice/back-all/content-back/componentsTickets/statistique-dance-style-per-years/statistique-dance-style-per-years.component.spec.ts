import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueDanceStylePerYearsComponent } from './statistique-dance-style-per-years.component';

describe('StatistiqueDanceStylePerYearsComponent', () => {
  let component: StatistiqueDanceStylePerYearsComponent;
  let fixture: ComponentFixture<StatistiqueDanceStylePerYearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatistiqueDanceStylePerYearsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatistiqueDanceStylePerYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
