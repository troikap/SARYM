import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmCajaComponent } from './abm-caja.component';

describe('AbmCajaComponent', () => {
  let component: AbmCajaComponent;
  let fixture: ComponentFixture<AbmCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
