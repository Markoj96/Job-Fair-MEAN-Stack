import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalShowComponent } from './additional-show.component';

describe('AdditionalShowComponent', () => {
  let component: AdditionalShowComponent;
  let fixture: ComponentFixture<AdditionalShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
