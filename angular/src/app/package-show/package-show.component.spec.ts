import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageShowComponent } from './package-show.component';

describe('PackageShowComponent', () => {
  let component: PackageShowComponent;
  let fixture: ComponentFixture<PackageShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
