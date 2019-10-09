import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmRubroComponent } from './abm-rubro.component';

describe('AbmRubroComponent', () => {
  let component: AbmRubroComponent;
  let fixture: ComponentFixture<AbmRubroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmRubroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmRubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
