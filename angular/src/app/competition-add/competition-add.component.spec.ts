import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionAddComponent } from './competition-add.component';

describe('CompetitionAddComponent', () => {
  let component: CompetitionAddComponent;
  let fixture: ComponentFixture<CompetitionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
