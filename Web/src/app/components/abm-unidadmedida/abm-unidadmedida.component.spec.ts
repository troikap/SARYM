import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmUnidadmedidaComponent } from './abm-unidadmedida.component';

describe('AbmUnidadmedidaComponent', () => {
  let component: AbmUnidadmedidaComponent;
  let fixture: ComponentFixture<AbmUnidadmedidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmUnidadmedidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmUnidadmedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
