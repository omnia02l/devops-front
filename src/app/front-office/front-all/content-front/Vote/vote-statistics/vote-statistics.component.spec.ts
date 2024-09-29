import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteStatisticsComponent } from './vote-statistics.component';

describe('VoteStatisticsComponent', () => {
  let component: VoteStatisticsComponent;
  let fixture: ComponentFixture<VoteStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
