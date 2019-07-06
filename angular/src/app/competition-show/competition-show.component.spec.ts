import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionShowComponent } from './competition-show.component';

describe('CompetitionShowComponent', () => {
  let component: CompetitionShowComponent;
  let fixture: ComponentFixture<CompetitionShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
