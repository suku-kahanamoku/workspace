import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxAdviceComponent } from './tax-advice.component';

describe('TaxAdviceComponent', () => {
  let component: TaxAdviceComponent;
  let fixture: ComponentFixture<TaxAdviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxAdviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
