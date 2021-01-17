import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchBrnoComponent } from './branch-brno.component';

describe('BranchBrnoComponent', () => {
  let component: BranchBrnoComponent;
  let fixture: ComponentFixture<BranchBrnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchBrnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchBrnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
