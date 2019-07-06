import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FairShowComponent } from './fair-show.component';

describe('FairShowComponent', () => {
  let component: FairShowComponent;
  let fixture: ComponentFixture<FairShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FairShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FairShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
