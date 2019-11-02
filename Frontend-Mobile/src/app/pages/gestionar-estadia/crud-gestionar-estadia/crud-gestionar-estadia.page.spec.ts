import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudGestionarEstadiaPage } from './crud-gestionar-estadia.page';

describe('CrudGestionarEstadiaPage', () => {
  let component: CrudGestionarEstadiaPage;
  let fixture: ComponentFixture<CrudGestionarEstadiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudGestionarEstadiaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudGestionarEstadiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
