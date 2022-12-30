import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehziProductComponent } from './behzi-product.component';

describe('BehziProductComponent', () => {
  let component: BehziProductComponent;
  let fixture: ComponentFixture<BehziProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BehziProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BehziProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
