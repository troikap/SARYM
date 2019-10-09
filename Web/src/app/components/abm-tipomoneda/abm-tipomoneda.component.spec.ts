import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmTipomonedaComponent } from './abm-tipomoneda.component';

describe('AbmTipomonedaComponent', () => {
  let component: AbmTipomonedaComponent;
  let fixture: ComponentFixture<AbmTipomonedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmTipomonedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmTipomonedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
