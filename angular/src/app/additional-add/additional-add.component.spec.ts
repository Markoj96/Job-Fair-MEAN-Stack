import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalAddComponent } from './additional-add.component';

describe('AdditionalAddComponent', () => {
  let component: AdditionalAddComponent;
  let fixture: ComponentFixture<AdditionalAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
