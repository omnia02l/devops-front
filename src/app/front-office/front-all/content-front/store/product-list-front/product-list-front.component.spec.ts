import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListFrontComponent } from './product-list-front.component';

describe('ProductListFrontComponent', () => {
  let component: ProductListFrontComponent;
  let fixture: ComponentFixture<ProductListFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
