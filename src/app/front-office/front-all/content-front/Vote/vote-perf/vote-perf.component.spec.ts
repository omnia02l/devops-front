import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotePerfComponent } from './vote-perf.component';

describe('VotePerfComponent', () => {
  let component: VotePerfComponent;
  let fixture: ComponentFixture<VotePerfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotePerfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotePerfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
