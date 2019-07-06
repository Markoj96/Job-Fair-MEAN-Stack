import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FairAddComponent } from './fair-add.component';

describe('FairAddComponent', () => {
  let component: FairAddComponent;
  let fixture: ComponentFixture<FairAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FairAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FairAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
