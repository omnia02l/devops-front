import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListresultComponent } from './listresultF.component';

describe('ListresultComponent', () => {
  let component: ListresultComponent;
  let fixture: ComponentFixture<ListresultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListresultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
