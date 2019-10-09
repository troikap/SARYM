import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmMesaComponent } from './abm-mesa.component';

describe('AbmMesaComponent', () => {
  let component: AbmMesaComponent;
  let fixture: ComponentFixture<AbmMesaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmMesaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
