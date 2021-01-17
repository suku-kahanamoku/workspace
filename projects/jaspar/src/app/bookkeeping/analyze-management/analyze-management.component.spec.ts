import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeManagementComponent } from './analyze-management.component';

describe('AnalyzeManagementComponent', () => {
  let component: AnalyzeManagementComponent;
  let fixture: ComponentFixture<AnalyzeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyzeManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
