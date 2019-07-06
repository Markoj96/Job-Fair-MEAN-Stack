import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumVitaeShowComponent } from './curriculum-vitae-show.component';

describe('CurriculumVitaeShowComponent', () => {
  let component: CurriculumVitaeShowComponent;
  let fixture: ComponentFixture<CurriculumVitaeShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumVitaeShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumVitaeShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
