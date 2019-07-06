import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalListComponent } from './additional-list.component';

describe('AdditionalListComponent', () => {
  let component: AdditionalListComponent;
  let fixture: ComponentFixture<AdditionalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
