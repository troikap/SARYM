import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaGestionarEstadiaPage } from './consulta-gestionar-estadia.page';

describe('ConsultaGestionarEstadiaPage', () => {
  let component: ConsultaGestionarEstadiaPage;
  let fixture: ComponentFixture<ConsultaGestionarEstadiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaGestionarEstadiaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaGestionarEstadiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
