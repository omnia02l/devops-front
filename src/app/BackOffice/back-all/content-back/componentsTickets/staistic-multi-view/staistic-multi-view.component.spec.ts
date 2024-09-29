import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaisticMultiViewComponent } from './staistic-multi-view.component';

describe('StaisticMultiViewComponent', () => {
  let component: StaisticMultiViewComponent;
  let fixture: ComponentFixture<StaisticMultiViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaisticMultiViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaisticMultiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
